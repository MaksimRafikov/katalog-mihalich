"""
Crop renovation plan PDFs: keep drawing + dimensions, drop frame/stamp/legends.
Writes web/public/cases/<slug>/plan.webp
"""
from __future__ import annotations

import re
from pathlib import Path

import fitz
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = ROOT / "Проекты"
OUT_CASES = ROOT / "web" / "public" / "cases"

# folder name -> slug
CASES: list[tuple[str, str]] = [
    ("ЖК Виденеевский", "videneevsky"),
    ("п Шмитдово", "shmitdovo"),
    ("пр Дружбы народов, 50 кв м", "druzhby-narodov"),
    ("ул Айская", "ayskaya"),
    ("ул Гоголя", "gogolya"),
    ("ул Губайдиллина", "gubaydullina"),
    ("ул Губайдулина 12", "gubaydullina-12"),
    ("ул Губайдуллина 10", "gubaydullina-10"),
    ("ул Достовалова", "dostovalova"),
    ("ул Комсомольская", "komsomolskaya"),
    ("ул Летчиков, 40 кв м", "letchikov"),
    ("ул Мурзина, 35 кв м", "murzina"),
    ("ул Подполковника Недошвина", "nedoshvina"),
    ("ул Рыльского", "rylskogo"),
    ("ул Спатара, 58 кв м", "spatara"),
    ("ул Энтузиастов 7, 44 кв м", "entuziastov-7"),
    ("ЖК Гринвич", "greenwich"),
    ("ЖК Диво, 52 кв м", "divo"),
    ("ЖК Сапфир, 45 кв м", "sapfir"),
]

BAD_RE = re.compile(
    r"(условн|экспликац|проект\s*№|исходный\s*план|существующ|помещения|"
    r"материал\s*:|вентиляц|электрощит|радиатор|стояк|михалыч|"
    r"светлова|мухаметшин|высоту\s*розеток|демонтировать|зашить|"
    r"дверное\s*полотно|открывани|порог|минват|"
    r"прихожая|спальня|кухня|ванн|санузел|лоджи|гостиная|коридор|"
    r"площадь\s+\d|лист\s*\d|лист\d)",
    re.I,
)

KEEP_SHORT = re.compile(
    r"^(S\s*=.*|H\s*=.*|H\s*под.*|H\s*потолка.*|Н\s*=.*|P\s*=.*|"
    r"\d([.,]\d+)?\s*(м²|кв\.?м\.?)?|[\d\s.,×xх/-]+)$",
    re.I,
)


def should_redact(text: str) -> bool:
    t = text.strip().replace("\xa0", " ")
    if not t:
        return False
    if KEEP_SHORT.match(t):
        return False
    digits = sum(ch.isdigit() for ch in t)
    if digits >= 1 and len(t) <= 18 and not re.search(r"[А-Яа-яA-Za-z]{4,}", t):
        return False
    if re.match(r"^[SHНРP]\s*=", t, re.I):
        return False
    if re.search(r"\d+[.,]\d+\s*(м²|кв\.?м)", t, re.I) and len(t) <= 22:
        return False
    if BAD_RE.search(t):
        return True
    if len(t) >= 20 and re.search(r"[А-Яа-я]", t):
        return True
    return False


def find_pdf(folder: Path) -> Path:
    pdfs = sorted(folder.glob("*.pdf"))
    if not pdfs:
        raise FileNotFoundError(f"No PDF in {folder}")
    return pdfs[0]


def redact_explanations(page: fitz.Page) -> list[fitz.Rect]:
    """Redact explanation spans; return stamp-like text rects for band wipe."""
    stamp_rects: list[fitz.Rect] = []
    stamp_keys = re.compile(
        r"(проект\s*№|условн|экспликац|существующ|исходный\s*план|помещения|"
        r"михалыч|светлова|мухаметшин|лист\s*\d|лист\d|высоту\s*розеток)",
        re.I,
    )
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                text = span.get("text", "")
                rect = fitz.Rect(span["bbox"])
                if stamp_keys.search(text):
                    stamp_rects.append(rect)
                if should_redact(text):
                    page.add_redact_annot(rect + (-1, -1, 1, 1), fill=(1, 1, 1))
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)
    return stamp_rects


def wipe_stamp_bands(page: fitz.Page, stamp_rects: list[fitz.Rect]) -> None:
    """White out bottom/side stamp regions based on known stamp text."""
    if not stamp_rects:
        return
    pr = page.rect
    shape = page.new_shape()
    for rect in stamp_rects:
        # Bottom title / sheet label
        if rect.y0 > pr.height * 0.72:
            band = fitz.Rect(0, min(rect.y0 - 8, pr.height * 0.78), pr.width, pr.height)
            shape.draw_rect(band)
            shape.finish(color=(1, 1, 1), fill=(1, 1, 1), width=0)
        # Top title
        if rect.y1 < pr.height * 0.12:
            band = fitz.Rect(0, 0, pr.width, max(rect.y1 + 10, pr.height * 0.07))
            shape.draw_rect(band)
            shape.finish(color=(1, 1, 1), fill=(1, 1, 1), width=0)
        # Left legend column
        if rect.x1 < pr.width * 0.28 and rect.y0 > pr.height * 0.55:
            band = fitz.Rect(0, rect.y0 - 40, pr.width * 0.22, pr.height)
            shape.draw_rect(band)
            shape.finish(color=(1, 1, 1), fill=(1, 1, 1), width=0)
        # Right title-block box
        if rect.x0 > pr.width * 0.55 and rect.y0 > pr.height * 0.75:
            band = fitz.Rect(rect.x0 - 20, rect.y0 - 12, pr.width, pr.height)
            shape.draw_rect(band)
            shape.finish(color=(1, 1, 1), fill=(1, 1, 1), width=0)
    shape.commit()


def drawing_heat(page: fitz.Page) -> tuple[np.ndarray, fitz.Rect]:
    pr = page.rect
    W, H = 200, max(90, int(200 * pr.height / pr.width))
    heat = np.zeros((H, W), dtype=np.float64)
    for d in page.get_drawings():
        r = d["rect"]
        if r.width <= 0 or r.height <= 0:
            continue
        area = r.width * r.height
        if r.width > pr.width * 0.80 and r.height > pr.height * 0.80:
            continue
        if r.width > pr.width * 0.95 or r.height > pr.height * 0.95:
            continue
        if area > pr.width * pr.height * 0.35:
            continue
        near_edge = (
            r.y0 < pr.height * 0.035
            or r.y1 > pr.height * 0.965
            or r.x0 < pr.width * 0.025
            or r.x1 > pr.width * 0.975
        )
        if near_edge and (r.width > pr.width * 0.65 or r.height > pr.height * 0.65):
            continue
        weight = 1.0 / max(1.0, area**0.25)
        x0 = max(0, int(r.x0 / pr.width * W))
        x1 = min(W, int(r.x1 / pr.width * W) + 1)
        y0 = max(0, int(r.y0 / pr.height * H))
        y1 = min(H, int(r.y1 / pr.height * H) + 1)
        heat[y0:y1, x0:x1] += weight

    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                t = span.get("text", "").strip()
                if not t:
                    continue
                digits = sum(ch.isdigit() for ch in t)
                if digits < 1 or len(t) > 20:
                    continue
                bb = span["bbox"]
                x0 = max(0, int(bb[0] / pr.width * W))
                x1 = min(W, int(bb[2] / pr.width * W) + 1)
                y0 = max(0, int(bb[1] / pr.height * H))
                y1 = min(H, int(bb[3] / pr.height * H) + 1)
                heat[y0:y1, x0:x1] += 0.45
    return heat, pr


def span_mass(v: np.ndarray, frac: float) -> tuple[int, int]:
    total = float(v.sum())
    if total <= 0:
        return 0, len(v) - 1
    lo = total * (1 - frac) / 2
    hi = total - lo
    c = np.cumsum(v)
    a = int(np.searchsorted(c, lo))
    b = int(np.searchsorted(c, hi))
    return a, min(len(v) - 1, max(a, b))


def heat_clip(heat: np.ndarray, pr: fitz.Rect, mass: float = 0.905) -> fitz.Rect:
    H, W = heat.shape
    y0, y1 = span_mass(heat.sum(axis=1), mass)
    x0, x1 = span_mass(heat.sum(axis=0), mass)
    pad = 5
    y0 = max(0, y0 - pad)
    y1 = min(H - 1, y1 + pad)
    x0 = max(0, x0 - pad)
    x1 = min(W - 1, x1 + pad)
    clip = fitz.Rect(
        x0 / W * pr.width,
        y0 / H * pr.height,
        (x1 + 1) / W * pr.width,
        (y1 + 1) / H * pr.height,
    )
    return clip & pr


def trim_white(img: Image.Image, pad: int = 12) -> Image.Image:
    arr = np.asarray(img)
    gray = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    ink = gray < 250
    if not ink.any():
        return img
    rows = np.any(ink, axis=1)
    cols = np.any(ink, axis=0)
    rr = np.where(rows)[0]
    cc = np.where(cols)[0]
    box = (
        max(0, int(cc[0]) - pad),
        max(0, int(rr[0]) - pad),
        min(img.width, int(cc[-1]) + 1 + pad),
        min(img.height, int(rr[-1]) + 1 + pad),
    )
    return img.crop(box)


def inset_frame(img: Image.Image) -> Image.Image:
    """If a near-edge black frame remains, crop a few px inside."""
    arr = np.asarray(img)
    gray = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    h, w = gray.shape
    edge = max(2, int(min(h, w) * 0.006))
    # Detect dark border lines near edges
    top = gray[: edge * 3].mean(axis=1)
    bot = gray[-edge * 3 :].mean(axis=1)
    left = gray[:, : edge * 3].mean(axis=0)
    right = gray[:, -edge * 3 :].mean(axis=0)

    def first_dark(v: np.ndarray) -> int | None:
        dark = np.where(v < 80)[0]
        return int(dark[0]) if len(dark) else None

    def last_dark(v: np.ndarray) -> int | None:
        dark = np.where(v < 80)[0]
        return int(dark[-1]) if len(dark) else None

    t = first_dark(top)
    b = last_dark(bot)
    l = first_dark(left)
    r = last_dark(right)
    x0, y0, x1, y1 = 0, 0, w, h
    if t is not None and t < edge * 2:
        y0 = t + edge
    if b is not None and b > len(bot) - edge * 2:
        y1 = h - (len(bot) - b) - edge
    if l is not None and l < edge * 2:
        x0 = l + edge
    if r is not None and r > len(right) - edge * 2:
        x1 = w - (len(right) - r) - edge
    if x1 - x0 < w * 0.7 or y1 - y0 < h * 0.7:
        return img
    return img.crop((x0, y0, x1, y1))


def process_one(pdf_path: Path, out_webp: Path, zoom: float = 2.6) -> tuple[int, int]:
    doc = fitz.open(pdf_path)
    page = doc[0]
    stamps = redact_explanations(page)
    wipe_stamp_bands(page, stamps)
    heat, pr = drawing_heat(page)
    clip = heat_clip(heat, pr)
    pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip, alpha=False)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    img = trim_white(img)
    img = inset_frame(img)
    img = trim_white(img, pad=8)
    out_webp.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_webp, "WEBP", quality=90, method=6)
    doc.close()
    return img.size


def main() -> None:
    for folder_name, slug in CASES:
        folder = PROJECTS / folder_name
        pdf = find_pdf(folder)
        out = OUT_CASES / slug / "plan.webp"
        size = process_one(pdf, out)
        print(f"{slug}: {size[0]}x{size[1]} <- {pdf.name}")


if __name__ == "__main__":
    main()
