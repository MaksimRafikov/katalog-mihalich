# Деплой каталога

Целевой формат: **static export** Next.js (`web/out/`), как у Ellis на shared hosting.

## Временное превью (GitHub Pages)

Как у «За комфортом»: Actions → Pages, без Vercel.

- Workflow: `.github/workflows/deploy-pages.yml`
- URL: https://maksimrafikov.github.io/katalog-mihalich/
- Сборка с `BASE_PATH=/katalog-mihalich` (подпуть project Pages)
- После push в `main` сайт обновляется сам

Локальная проверка той же сборки:

```powershell
cd web
npm ci
$env:MIHALYCH_STATIC_EXPORT = '1'
$env:BASE_PATH = '/katalog-mihalich'
$env:NEXT_PUBLIC_BASE_PATH = '/katalog-mihalich'
npm run build
npx --yes serve out -p 8080
```

## Финальный хостинг заказчика

Поддомен и доступы — уточняются (черновик: `katalog.remont-mihalich.ru` или аналог).

### Сборка (корень сайта, без basePath)

```powershell
cd web
npm ci
$env:MIHALYCH_STATIC_EXPORT = '1'
npm run build
Remove-Item Env:MIHALYCH_STATIC_EXPORT
```

Результат: `web/out/` (`index.html`, `_next/`, `cases/`, …).

### Выкладка (общий план)

1. Создать поддомен у заказчика, SSL (Let's Encrypt).
2. Загрузить содержимое `out/` в корень поддомена (SFTP).
3. Если родительский сайт на Passenger/PHP — отключить Passenger для поддомена и прописать rewrite на каталог (эталон правил: Ellis `docs/deploy-sprinthost.md`).
4. Проверить: главная, каталог, один кейс, контакты, картинки, видео.

## Пока не делать

- Менять DNS/NS основного `remont-mihalich.ru` без ТЗ заказчика.
- Класть на сервер `inbox/`, `Проекты/`, исходники агента.
