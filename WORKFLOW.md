# Обновление каталога Михалыч

## 1) Новый кейс

1. Добавь slug в `content/objects-matrix.md` (или обнови строку).
2. Положи исходники в `inbox/<slug>/` (фото, короткие mp4, постеры).
3. Скопируй отобранные файлы в `web/public/cases/<slug>/`:
   - `oblojka.webp` ← **Обложка** (без медведя, 4∶3) — превью каталога
   - `cover.webp` ← **Главное фото кейса** (медведь ок, ~21∶9…3∶1) — hero страницы кейса
   - `gallery/01…` после, `gallery-before/01…` до
4. Добавь объект в `web/src/data/cases.ts` **в начало** массива. Порядок на странице: `gallery` → `videos` → `galleryBefore` (см. `.cursor/rules/case-gallery-before.mdc`).
5. Проверь локально: `cd web && npm run dev`.

## 2) Правила медиа

- На сайт — только файлы из `web/public/cases/`.
- `Проекты/`, `ChatExport_*`, длинные `.MOV` — архив, не публичный путь.
- Без номеров квартир и ФИО в title/alt/summary.
- HEIC перед публикацией → JPEG/WebP.
- **Обложка vs главное:** `.cursor/rules/case-cover-images.mdc` — каталог = `card` без медведя; страница кейса = `cover` (медведь только там); не подставлять hero в сетку каталога.
- **Title / подпись карточки:** `.cursor/rules/case-titles-meta.mdc` — без м² в title и на превью; ул./д. с точкой; под карточкой только тип объекта, без дубля ЖК/улицы.

## 3) Перед выкладкой

```powershell
cd web
npm run lint
$env:MIHALYCH_STATIC_EXPORT = '1'
npm run build
Remove-Item Env:MIHALYCH_STATIC_EXPORT
```

Артефакт: `web/out/`. Дальше — `docs/deploy-hosting.md`.

## 4) Когда появятся PDF / короткие видео

- PDF → `web/public/cases/<slug>/project.pdf` + поле `projectPdf` в кейсе.
- Видео → `review.mp4` + `review-poster.jpg` (или массив `videos`).
