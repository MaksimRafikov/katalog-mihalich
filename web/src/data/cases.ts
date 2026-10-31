import { withBasePath } from "@/lib/paths";

export type ObjectType = "apartment" | "house" | "commercial";

export type CaseGalleryItem = {
  src: string;
  alt?: string;
  caption?: string;
};

export type CaseVideo = {
  src: string;
  poster?: string;
  label?: string;
};

export type RenovationCase = {
  slug: string;
  title: string;
  objectType: ObjectType;
  area?: number;
  /** ЖК or district — public, no apartment number */
  complex?: string;
  /**
   * Hero on case page («Главное фото кейса»).
   * May include the bear in the interior. Path or color `#070B14`.
   */
  cover: string;
  /**
   * Catalog grid preview («Обложка»), 4∶3 — no bear.
   * Required whenever `cover` is an image with the mascot.
   */
  card?: string;
  summary?: string;
  /** Finished renovation photos — main gallery block */
  gallery?: (string | CaseGalleryItem)[];
  /** Before photos — separate block after gallery + videos */
  galleryBefore?: (string | CaseGalleryItem)[];
  plan?: string;
  projectPdf?: string;
  videos?: CaseVideo[];
  reviewVideo?: string;
  reviewPoster?: string;
  /** Hidden from catalog until ready */
  hidden?: boolean;
};

export const OBJECT_FILTERS = [
  { id: "all", label: "Все" },
  { id: "apartment", label: "Квартиры" },
  { id: "house", label: "Дома" },
  { id: "commercial", label: "Коммерция" },
] as const;

export const AREA_FILTERS = [
  { id: "all", label: "Все площади", min: 0, max: Infinity },
  { id: "to50", label: "до 50 м²", min: 0, max: 50 },
  { id: "50-80", label: "50–80 м²", min: 50, max: 80 },
  { id: "80-120", label: "80–120 м²", min: 80, max: 120 },
  { id: "120+", label: "120+ м²", min: 120, max: Infinity },
] as const;

/** Newest first. Add published cases at the top. */
export const cases: RenovationCase[] = [
  {
    slug: "petropavlovsky",
    title: "ЖК Петропавловский",
    objectType: "apartment",
    complex: "Петропавловский",
    cover: "#070B14",
    videos: [
      {
        src: "/cases/petropavlovsky/after.mp4",
        poster: "/cases/petropavlovsky/review-poster.webp",
        label: "После ремонта",
      },
    ],
  },
  {
    slug: "hart-development",
    title: "Офис Hart Development",
    objectType: "commercial",
    cover: "#070B14",
    videos: [
      {
        src: "/cases/hart-development/after.mp4",
        poster: "/cases/hart-development/review-poster.webp",
        label: "После ремонта",
      },
    ],
  },
  {
    slug: "cottage",
    title: "Коттедж",
    objectType: "house",
    cover: "#070B14",
    videos: [
      {
        src: "/cases/cottage/after.mp4",
        poster: "/cases/cottage/review-poster.webp",
        label: "После ремонта",
      },
    ],
  },
  {
    slug: "cottage-160",
    title: "Коттедж",
    objectType: "house",
    area: 160,
    cover: "#070B14",
    videos: [
      {
        src: "/cases/cottage-160/after.mp4",
        poster: "/cases/cottage-160/review-poster.webp",
        label: "После ремонта",
      },
    ],
  },
  {
    slug: "senator-2",
    title: "ЖК Сенатор 2",
    objectType: "apartment",
    complex: "Сенатор",
    cover: "#070B14",
    videos: [
      {
        src: "/cases/senator-2/after.mp4",
        poster: "/cases/senator-2/review-poster.webp",
        label: "После ремонта",
      },
    ],
  },
  {
    slug: "videneevsky",
    title: "ЖК Виденеевский 156-84",
    objectType: "apartment",
    area: 77,
    complex: "Виденеевский",
    cover: "#070B14",
    plan: "/cases/videneevsky/plan.webp",
    galleryBefore: [
      "/cases/videneevsky/gallery-before/01.webp",
      "/cases/videneevsky/gallery-before/02.webp",
      "/cases/videneevsky/gallery-before/03.webp",
      "/cases/videneevsky/gallery-before/04.webp",
      "/cases/videneevsky/gallery-before/05.webp",
    ],
  },
  {
    slug: "shmitdovo",
    title: "п. Шмидтово",
    objectType: "house",
    area: 91,
    cover: "#070B14",
    plan: "/cases/shmitdovo/plan.png",
  },
  {
    slug: "novoland",
    title: "ЖК Новолэнд 61-51",
    objectType: "apartment",
    area: 50,
    complex: "Новолэнд",
    cover: "#070B14",
    plan: "/cases/novoland/plan.png",
  },
  {
    slug: "ayskaya",
    title: "ул. Айская",
    objectType: "apartment",
    area: 46,
    cover: "#070B14",
    plan: "/cases/ayskaya/plan.png",
  },
  {
    slug: "gogolya",
    title: "ул. Гоголя",
    objectType: "apartment",
    area: 48,
    cover: "#070B14",
    plan: "/cases/gogolya/plan.webp",
  },
  {
    slug: "cheremushki",
    title: "ЖК Черемушки 12-247",
    objectType: "apartment",
    area: 48,
    complex: "Черемушки",
    cover: "#070B14",
    plan: "/cases/cheremushki/plan.webp",
  },
  {
    slug: "gubaydullina-12",
    title: "ЖК Черемушки 12-292",
    objectType: "apartment",
    area: 44,
    complex: "Черемушки",
    cover: "#070B14",
    plan: "/cases/gubaydullina-12/plan.webp",
  },
  {
    slug: "gubaydullina-10",
    title: "ЖК Черемушки 10-341",
    objectType: "apartment",
    area: 67,
    complex: "Черемушки",
    cover: "#070B14",
    plan: "/cases/gubaydullina-10/plan.webp",
  },
  {
    slug: "dostovalova",
    title: "ЖК Новолэнд 11-71",
    objectType: "apartment",
    area: 50,
    complex: "Новолэнд",
    cover: "#070B14",
    plan: "/cases/dostovalova/plan.webp",
  },
  {
    slug: "komsomolskaya",
    title: "ЖК Сапфир 8-59",
    objectType: "apartment",
    area: 50,
    complex: "Сапфир",
    cover: "#070B14",
    plan: "/cases/komsomolskaya/plan-8-59.webp",
  },
  {
    slug: "letchikov",
    title: "ул. Летчиков",
    objectType: "apartment",
    area: 40,
    cover: "#070B14",
    plan: "/cases/letchikov/plan-new.webp",
    galleryBefore: [
      "/cases/letchikov/gallery-before/01.webp",
      "/cases/letchikov/gallery-before/02.webp",
      "/cases/letchikov/gallery-before/03.webp",
      "/cases/letchikov/gallery-before/04.webp",
      "/cases/letchikov/gallery-before/05.webp",
      "/cases/letchikov/gallery-before/06.webp",
    ],
  },
  {
    slug: "murzina",
    title: "ЖК Цветы Башкирии 5-249",
    objectType: "apartment",
    area: 35,
    complex: "Цветы Башкирии",
    cover: "#070B14",
    plan: "/cases/murzina/plan-new.webp",
  },
  {
    slug: "nedoshvina",
    title: "ЖК Гринвич 7-163",
    objectType: "apartment",
    area: 83,
    complex: "Гринвич",
    cover: "#070B14",
    plan: "/cases/nedoshvina/plan-v2.webp",
  },
  {
    slug: "rylskogo",
    title: "ул. Рыльского",
    objectType: "apartment",
    area: 82,
    cover: "#070B14",
    plan: "/cases/rylskogo/plan-new.webp",
    videos: [
      {
        src: "/cases/rylskogo/after.mp4",
        poster: "/cases/rylskogo/review-poster.webp",
        label: "После ремонта",
      },
    ],
  },
  {
    slug: "spatara",
    title: "ЖК Город природы 12-71",
    objectType: "apartment",
    area: 58,
    complex: "Город природы",
    cover: "#070B14",
    plan: "/cases/spatara/plan-new.webp",
  },
  {
    slug: "entuziastov-7",
    title: "ЖК Туа Хаус 7-1159",
    objectType: "apartment",
    area: 44,
    complex: "Туа Хаус",
    cover: "#070B14",
    plan: "/cases/entuziastov-7/plan.webp",
  },
  {
    slug: "greenwich",
    title: "ЖК Гринвич 7-416",
    objectType: "apartment",
    area: 75,
    complex: "Гринвич",
    cover: "#070B14",
    plan: "/cases/greenwich/plan-new.webp",
  },
  {
    slug: "divo",
    title: "ЖК Диво",
    objectType: "apartment",
    area: 52,
    complex: "Диво",
    cover: "#070B14",
    plan: "/cases/divo/plan.webp",
  },
  {
    slug: "sapfir",
    title: "ЖК Сапфир 8-187",
    objectType: "apartment",
    area: 45,
    complex: "Сапфир",
    cover: "#070B14",
    plan: "/cases/sapfir/plan-new.webp",
  },
  {
    slug: "kommunisticheskaya-98",
    title: "ЖК Сенатор",
    objectType: "apartment",
    area: 36,
    complex: "Сенатор",
    cover: "/cases/kommunisticheskaya-98/cover.webp",
    card: "/cases/kommunisticheskaya-98/oblojka.webp",
    gallery: [
      "/cases/kommunisticheskaya-98/gallery/01.webp",
      "/cases/kommunisticheskaya-98/gallery/02.webp",
      "/cases/kommunisticheskaya-98/gallery/03.webp",
      "/cases/kommunisticheskaya-98/gallery/04.webp",
      "/cases/kommunisticheskaya-98/gallery/05.webp",
      "/cases/kommunisticheskaya-98/gallery/06.webp",
      "/cases/kommunisticheskaya-98/gallery/07.webp",
      "/cases/kommunisticheskaya-98/gallery/08.webp",
    ],
    videos: [
      {
        src: "/cases/kommunisticheskaya-98/after.mp4",
        poster: "/cases/kommunisticheskaya-98/cover.webp",
        label: "После ремонта",
      },
    ],
    galleryBefore: [
      "/cases/kommunisticheskaya-98/gallery-before/01.webp",
      "/cases/kommunisticheskaya-98/gallery-before/02.webp",
      "/cases/kommunisticheskaya-98/gallery-before/03.webp",
      "/cases/kommunisticheskaya-98/gallery-before/04.webp",
      "/cases/kommunisticheskaya-98/gallery-before/05.webp",
      "/cases/kommunisticheskaya-98/gallery-before/06.webp",
      "/cases/kommunisticheskaya-98/gallery-before/07.webp",
    ],
  },
  {
    slug: "bystro-lunch",
    title: "Кафе Быстро Ланч",
    objectType: "commercial",
    cover: "#070B14",
    galleryBefore: [
      "/cases/bystro-lunch/gallery-before/01.webp",
      "/cases/bystro-lunch/gallery-before/02.webp",
      "/cases/bystro-lunch/gallery-before/03.webp",
      "/cases/bystro-lunch/gallery-before/04.webp",
      "/cases/bystro-lunch/gallery-before/05.webp",
    ],
  },
  {
    slug: "yarkiy",
    title: "ЖК Яркий",
    objectType: "apartment",
    complex: "Яркий",
    cover: "#070B14",
    galleryBefore: [
      "/cases/yarkiy/gallery-before/01.webp",
      "/cases/yarkiy/gallery-before/02.webp",
      "/cases/yarkiy/gallery-before/03.webp",
      "/cases/yarkiy/gallery-before/04.webp",
      "/cases/yarkiy/gallery-before/05.webp",
      "/cases/yarkiy/gallery-before/06.webp",
      "/cases/yarkiy/gallery-before/07.webp",
    ],
  },
  {
    slug: "entuziastov-12",
    title: "ЖК Квартал энтузиастов 12",
    objectType: "apartment",
    area: 45,
    complex: "Квартал энтузиастов",
    cover: "/cases/entuziastov-12/cover.webp",
    card: "/cases/entuziastov-12/oblojka.webp",
    summary:
      "Вторичное жильё, ремонт «стандарт» под сдачу. Около 45 м², ориентировочно 50 рабочих дней.",
    gallery: [
      "/cases/entuziastov-12/gallery/01.webp",
      "/cases/entuziastov-12/gallery/02.webp",
      "/cases/entuziastov-12/gallery/03.webp",
      "/cases/entuziastov-12/gallery/04.webp",
      "/cases/entuziastov-12/gallery/05.webp",
      "/cases/entuziastov-12/gallery/06.webp",
      "/cases/entuziastov-12/gallery/07.webp",
    ],
    videos: [
      {
        src: "/cases/entuziastov-12/after.mp4",
        poster: "/cases/entuziastov-12/cover.webp",
        label: "После ремонта",
      },
    ],
  },
  {
    slug: "chernikovka-stalinka",
    title: "ул. Ульяновых",
    objectType: "apartment",
    cover: "/cases/chernikovka-stalinka/cover.webp",
    card: "/cases/chernikovka-stalinka/oblojka.webp",
    gallery: [
      "/cases/chernikovka-stalinka/gallery/01.webp",
      "/cases/chernikovka-stalinka/gallery/02.webp",
      "/cases/chernikovka-stalinka/gallery/03.webp",
      "/cases/chernikovka-stalinka/gallery/04.webp",
      "/cases/chernikovka-stalinka/gallery/05.webp",
      "/cases/chernikovka-stalinka/gallery/06.webp",
      "/cases/chernikovka-stalinka/gallery/07.webp",
      "/cases/chernikovka-stalinka/gallery/08.webp",
      "/cases/chernikovka-stalinka/gallery/09.webp",
      "/cases/chernikovka-stalinka/gallery/10.webp",
    ],
    videos: [
      {
        src: "/cases/chernikovka-stalinka/after.mp4",
        poster: "/cases/chernikovka-stalinka/cover.webp",
        label: "После ремонта",
      },
    ],
    galleryBefore: [
      "/cases/chernikovka-stalinka/gallery-before/01.webp",
      "/cases/chernikovka-stalinka/gallery-before/02.webp",
      "/cases/chernikovka-stalinka/gallery-before/03.webp",
      "/cases/chernikovka-stalinka/gallery-before/04.webp",
      "/cases/chernikovka-stalinka/gallery-before/05.webp",
      "/cases/chernikovka-stalinka/gallery-before/06.webp",
      "/cases/chernikovka-stalinka/gallery-before/07.webp",
    ],
  },
  {
    slug: "pushkina",
    title: "ул. Пушкина",
    objectType: "apartment",
    cover: "#070B14",
    galleryBefore: [
      "/cases/pushkina/gallery-before/01.webp",
      "/cases/pushkina/gallery-before/02.webp",
      "/cases/pushkina/gallery-before/03.webp",
      "/cases/pushkina/gallery-before/04.webp",
      "/cases/pushkina/gallery-before/05.webp",
      "/cases/pushkina/gallery-before/06.webp",
    ],
  },
  {
    slug: "novoselov-8",
    title: "ул. Новоселов",
    objectType: "apartment",
    area: 40,
    complex: "Инорс",
    cover: "/cases/novoselov-8/cover.webp",
    card: "/cases/novoselov-8/oblojka.webp",
    summary:
      "Новостройка. Около 40 м², ориентировочно 50 рабочих дней.",
    gallery: [
      "/cases/novoselov-8/gallery/01.webp",
      "/cases/novoselov-8/gallery/02.webp",
      "/cases/novoselov-8/gallery/magazine.webp",
      "/cases/novoselov-8/gallery/04.webp",
      "/cases/novoselov-8/gallery/05.webp",
      "/cases/novoselov-8/gallery/06.webp",
      "/cases/novoselov-8/gallery/07.webp",
      "/cases/novoselov-8/gallery/08.webp",
      "/cases/novoselov-8/gallery/09.webp",
      "/cases/novoselov-8/gallery/10.webp",
      "/cases/novoselov-8/gallery/11.webp",
    ],
  },
  {
    slug: "cottage-2024-12",
    title: "Коттедж",
    objectType: "house",
    cover: "#070B14",
    galleryBefore: [
      "/cases/cottage-2024-12/gallery-before/01.webp",
      "/cases/cottage-2024-12/gallery-before/02.webp",
      "/cases/cottage-2024-12/gallery-before/03.webp",
      "/cases/cottage-2024-12/gallery-before/04.webp",
      "/cases/cottage-2024-12/gallery-before/05.webp",
      "/cases/cottage-2024-12/gallery-before/06.webp",
    ],
  },
  {
    slug: "nagaevsky-park",
    title: "Коттедж Нагаевский парк",
    objectType: "house",
    cover: "#070B14",
    galleryBefore: [
      "/cases/nagaevsky-park/gallery-before/01.webp",
      "/cases/nagaevsky-park/gallery-before/02.webp",
      "/cases/nagaevsky-park/gallery-before/03.webp",
      "/cases/nagaevsky-park/gallery-before/04.webp",
      "/cases/nagaevsky-park/gallery-before/05.webp",
      "/cases/nagaevsky-park/gallery-before/06.webp",
    ],
  },
  {
    slug: "marmyleva",
    title: "Коттедж д. Мармылево",
    objectType: "house",
    area: 105,
    cover: "#070B14",
    videos: [
      {
        src: "/cases/marmyleva/after.mp4",
        poster: "/cases/marmyleva/video-poster.webp",
        label: "Видео",
      },
    ],
    galleryBefore: [
      "/cases/marmyleva/gallery-before/01.webp",
      "/cases/marmyleva/gallery-before/02.webp",
      "/cases/marmyleva/gallery-before/03.webp",
      "/cases/marmyleva/gallery-before/04.webp",
      "/cases/marmyleva/gallery-before/05.webp",
    ],
  },
  {
    slug: "internatsionalnaya",
    title: "ул. Интернациональная",
    objectType: "apartment",
    area: 43,
    complex: "Интернациональная",
    cover: "/cases/internatsionalnaya/cover.webp",
    card: "/cases/internatsionalnaya/oblojka.webp",
    summary:
      "Вторичное жильё. Около 43 м², ориентировочно 70 рабочих дней.",
    gallery: [
      "/cases/internatsionalnaya/gallery/01.webp",
      "/cases/internatsionalnaya/gallery/02.webp",
      "/cases/internatsionalnaya/gallery/03.webp",
      "/cases/internatsionalnaya/gallery/04.webp",
      "/cases/internatsionalnaya/gallery/05.webp",
      "/cases/internatsionalnaya/gallery/06.webp",
      "/cases/internatsionalnaya/gallery/07.webp",
      "/cases/internatsionalnaya/gallery/08.webp",
      "/cases/internatsionalnaya/gallery/09.webp",
      "/cases/internatsionalnaya/gallery/10.webp",
      "/cases/internatsionalnaya/gallery/11.webp",
      "/cases/internatsionalnaya/gallery/12.webp",
    ],
    videos: [
      {
        src: "/cases/internatsionalnaya/after.mp4",
        poster: "/cases/internatsionalnaya/cover.webp",
        label: "После ремонта",
      },
    ],
  },
  {
    slug: "grani-sultanova-28",
    title: "ЖК Грани",
    objectType: "apartment",
    complex: "Грани",
    cover: "#070B14",
    galleryBefore: [
      "/cases/grani-sultanova-28/gallery-before/01.webp",
      "/cases/grani-sultanova-28/gallery-before/02.webp",
      "/cases/grani-sultanova-28/gallery-before/03.webp",
      "/cases/grani-sultanova-28/gallery-before/04.webp",
      "/cases/grani-sultanova-28/gallery-before/05.webp",
      "/cases/grani-sultanova-28/gallery-before/06.webp",
      "/cases/grani-sultanova-28/gallery-before/07.webp",
    ],
  },
  {
    slug: "gran-familia",
    title: "ЖК Grand Family",
    objectType: "apartment",
    area: 50,
    complex: "Grand Family",
    cover: "/cases/gran-familia/cover.webp",
    card: "/cases/gran-familia/oblojka.webp",
    summary:
      "Новостройка, ремонт «стандарт». Около 50 м², ориентировочно 70 рабочих дней.",
    gallery: [
      "/cases/gran-familia/gallery/01.png",
      "/cases/gran-familia/gallery/02.png",
      "/cases/gran-familia/gallery/03.png",
      "/cases/gran-familia/gallery/04.png",
      "/cases/gran-familia/gallery/05.png",
      "/cases/gran-familia/gallery/06.png",
      "/cases/gran-familia/gallery/07.png",
      "/cases/gran-familia/gallery/08.png",
      "/cases/gran-familia/gallery/09.png",
    ],
    videos: [
      {
        src: "/cases/gran-familia/after.mp4",
        poster: "/cases/gran-familia/cover.webp",
        label: "После ремонта",
      },
    ],
  },
];

export function isImageCover(cover: string): boolean {
  return cover.startsWith("/") || cover.startsWith("http");
}

/** Catalog preview: обложка without bear — never fall back to hero image. */
export function catalogPreviewSrc(item: RenovationCase): string {
  if (item.card) return withBasePath(item.card);
  if (!isImageCover(item.cover)) return item.cover;
  return "#070B14";
}

export function publishedCases(): RenovationCase[] {
  return cases.filter((item) => !item.hidden);
}

/** Unique ЖК / complex names for catalog filter, sorted. */
export function catalogComplexes(): string[] {
  const names = new Set<string>();
  for (const item of publishedCases()) {
    if (item.complex) names.add(item.complex);
  }
  return [...names].sort((a, b) => a.localeCompare(b, "ru"));
}

export function getCaseBySlug(slug: string): RenovationCase | undefined {
  return publishedCases().find((item) => item.slug === slug);
}

export function objectTypeLabel(type: ObjectType): string {
  switch (type) {
    case "apartment":
      return "Квартира";
    case "house":
      return "Дом";
    case "commercial":
      return "Коммерция";
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

export function gallerySrc(item: string | CaseGalleryItem): string {
  const src = typeof item === "string" ? item : item.src;
  return withBasePath(src);
}
