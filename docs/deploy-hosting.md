# Деплой каталога на хостинг заказчика

Целевой формат: **static export** Next.js (`web/out/`), как у Ellis на shared hosting.

Поддомен и доступы — уточняются (черновик: `katalog.remont-mihalich.ru` или аналог).

## Сборка

```powershell
cd web
npm ci
$env:MIHALYCH_STATIC_EXPORT = '1'
npm run build
Remove-Item Env:MIHALYCH_STATIC_EXPORT
```

Результат: `web/out/` (`index.html`, `_next/`, `cases/`, …).

## Выкладка (общий план)

1. Создать поддомен у заказчика, SSL (Let's Encrypt).
2. Загрузить содержимое `out/` в корень поддомена (SFTP).
3. Если родительский сайт на Passenger/PHP — отключить Passenger для поддомена и прописать rewrite на каталог (эталон правил: Ellis `docs/deploy-sprinthost.md`).
4. Проверить: главная, каталог, один кейс, контакты, картинки, видео.

## Пока не делать

- Менять DNS/NS основного `remont-mihalich.ru` без ТЗ заказчика.
- Класть на сервер `inbox/`, `Проекты/`, исходники агента.
