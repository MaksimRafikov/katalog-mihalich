# Каталог «Михалыч»

Каталог реализованных ремонтов для компании «Михалыч» (Уфа).  
Основной сайт: https://remont-mihalich.ru/

## Эталон (компиляция)

- **Каркас / UX / static export / хостинг:** `Каталог Ellis` (Next.js App Router).
- **Наполнение / валидация / inbox→assets:** дисциплина как у `Каталог работ ЗА КОМФОРТОМ`.
- **Бренд:** свой — жёлтый сигнал + тёмный navy, маскот/wordmark; не luxury Ellis и не «кремовый премиум».

## Stack

- Next.js App Router (`web/`)
- TypeScript + Tailwind CSS v4
- Токены: `web/src/app/globals.css`, `docs/design-tokens.md`
- Кейсы: `web/src/data/cases.ts` (новые сверху)
- Медиа на сайте: только `web/public/cases/<slug>/`
- Сырьё: `inbox/<slug>/` и локальные `Проекты/` (не в git)
- Обложки кейсов: правило `.cursor/rules/case-cover-images.mdc` (hero ≈ 21∶9…3∶1; карточка 4∶3; без горизонтали → `#070B14`)
- Названия / подписи: `.cursor/rules/case-titles-meta.mdc` (без м² в title/превью; ул./д.; под карточкой только тип, без дубля complex)

## IA

Главная → Каталог (фильтры: тип объекта) → Кейс → Контакты / CTA на основной сайт  
Дизайн-проекты — опциональное поле у кейса, без отдельного двойного каталога (пока).

## Деплой

Static export → поддомен на хостинге заказчика. См. `docs/deploy-hosting.md`.

## Do not

- Копировать визуал Ellis (stone/copper) или За Комфортом один в один
- Класть в git сырые гигабайты из `Проекты/`
- Публиковать номера квартир и ФИО клиентов
- Purple gradients / Inter–Space Grotesk / cream+terracotta AI-дефолты
