# Михалыч — design tokens

Source: `web/src/app/globals.css`. Direction: **цеховой каталог** — сигнал-жёлтый с логотипа + тёмный navy, фото объекта в центре.

## Color

| Token | Value | Role |
|-------|-------|------|
| `--ink` | `#0B1220` | Текст, рамки CTA |
| `--field` | `#EEF0EA` | Фон страницы (холодный, не крем) |
| `--paper` | `#F7F8F4` | Поверхности |
| `--mute` | `#5A6270` | Вторичный текст |
| `--line` | `#D2D6CE` | Линии |
| `--accent` | `#E8B923` | Сигнал с логотипа — редкий акцент, CTA hover |
| `--night` | `#070B14` | Hero / тёмные плоскости |

## Typography

| Role | Family |
|------|--------|
| Display | Unbounded |
| Body | Manrope |

## Motion

| Token | Value |
|-------|-------|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--duration` | `0.35s` |
| `.page-enter` | Fade + 8px rise |

## Logo

- Шапка/hero: составной блок — `/brand/mihalych-mascot.png` + `/brand/mihalych-wordmark.png` + HTML-подпись (`site.logoLines`)
- Подпись — только HTML (`showTagline`, `taglineTone`), без обводки; `logo-full` в шапке не использовать
- Compact PNG: `/brand/mihalych-logo-compact.png` (без мелких строк)

## Do not

- Ellis stone/copper palette
- Warm cream `#F4F1EA` + terracotta
- Purple/indigo gradients, glass, glow, pill-spam
- Inter / Space Grotesk / Roboto as brand voice
- Wordmark-only без медведя как основной логотип
