# Каталог «Михалыч» — status

Next.js static catalog (Ellis-shaped) + content discipline from За Комфортом. Brand: Михалыч.

## Handoff

- **Фаза сейчас:** 15 кейсов; `kommunisticheskaya-98` доведён до полного (cover+oblojka+gallery+galleryBefore)
- **Сделано:**
  - Полные: `kommunisticheskaya-98`, `entuziastov-12`, `novoselov-8`, `gran-familia`, `internatsionalnaya`, `chernikovka-stalinka` (title **ул. Ульяновых**)
  - Черновики «только до» (`galleryBefore`), cover `#070B14`: `bystro-lunch`, `yarkiy`, `pushkina`, `parhomenko-123`, `grani-sultanova-28`, `marmyleva`, `nagaevsky-park`, `cottage-2024-12`
  - Каталог: превью = `oblojka.webp` из **Обложка** (без медведя); страница кейса: hero = `cover.webp` из **Главное** (медведь ок)
  - Порядок медиа: `gallery` → `videos` → `galleryBefore`
  - Правила: `.cursor/rules/case-cover-images.mdc`, `.cursor/rules/case-titles-meta.mdc`, `.cursor/rules/case-gallery-before.mdc`
- **Отложено:** смена CSS героя (contain / сплит) — только по явному ТЗ
- **Не делать:** коммитить `Проекты/`; деплой без поддомена; портретный cover «как есть»; м² в title/превью; медведь в сетке каталога; дубль complex в подписи карточки; цены в summary
- **Следующий шаг:** добить Грани (`grani-sultanova-28` — сейчас только galleryBefore)

### entuziastov-12 (готово)

- Title **ул. Энтузиастов** · apartment · area 45
- `oblojka.webp` 1600×1200 ← `обложка.png`; `cover.webp` 3840×1366 ← Главное `-2.png`
- gallery 01–07; `after.mp4` (+ poster cover); без `galleryBefore`
- Summary: вторичка, «стандарт» под сдачу, ~45 м², ~50 раб. дней (без цены)
