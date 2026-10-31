/** Public site + CTA config for Михалыч catalog */
export const site = {
  siteName: "Михалыч",
  companyName: "Компания «Михалыч»",
  city: "Уфа",
  region: "Республика Башкортостан",
  country: "RU",
  /** Короткая подпись (футер и т.п.) */
  tagline: "Дизайн и ремонт",
  /** Строки под wordmark — HTML, без обводки из PNG */
  logoLines: ["Ремонт и отделка квартир", "Дизайн интерьера"] as const,
  /**
   * Hero каталога. По мотивам основного сайта:
   * дизайн-проект + ремонт под ключ, фиксированная смета, реальные объекты.
   */
  heroHeadline:
    "Дизайн-проект и ремонт под ключ — смотрите реальные объекты",
  heroSupport:
    "Квартиры, дома и коммерция: фото и короткие обзоры с площадки, без постановочной съёмки.",
  phone: "+7 (937) 318-12-52",
  phoneHref: "+79373181252",
  email: "bulyukindm@gmail.com",
  mainSite: "https://remont-mihalich.ru/",
  whatsapp: "https://wa.me/79373181252",
  telegram: "https://t.me/denis_mihailovih",
  /** Составной логотип в шапке/hero: mascot + wordmark + HTML-подпись */
  logoMascot: "/brand/mihalych-mascot.png",
  logoWordmark: "/brand/mihalych-wordmark.png",
  /** Единый PNG без подписи — крупные/внешние места, не шапка */
  logoCompact: "/brand/mihalych-logo-compact.png",
  /** Полная композиция — только крупные форматы, не шапка */
  logoFull: "/brand/mihalych-logo-full.png",
  /** Alias на compact (legacy) */
  logo: "/brand/mihalych-logo-compact.png",
  /** Set when Metrika is ready for the catalog subdomain */
  metrikaId: null as number | null,
  legal: {
    name: "ИП Булюкин Д.М.",
    inn: "027200672284",
    ogrnip: "324028000157680",
    address: "Республика Башкортостан, г. Уфа, ул. Кировоградская, 33",
  },
} as const;
