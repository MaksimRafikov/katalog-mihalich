import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты",
};

export default function ContactsPage() {
  return (
    <div className="page-enter mx-auto max-w-[var(--max)] px-[var(--page-pad)] py-10 md:py-14">
      <p className="title-block">Связь</p>
      <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
        Контакты
      </h1>
      <p className="mt-3 max-w-xl text-sm text-mute md:text-base">
        Заявка и расчёт — на основном сайте. Здесь — прямые каналы.
      </p>

      <dl className="mt-10 grid max-w-lg gap-6 text-sm">
        <div>
          <dt className="title-block">Телефон</dt>
          <dd className="mt-2">
            <a href={`tel:${site.phoneHref}`} className="text-lg text-ink">
              {site.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="title-block">Мессенджеры</dt>
          <dd className="mt-2 flex flex-wrap gap-4">
            <a
              href={site.whatsapp}
              className="underline underline-offset-2 hover:text-mute"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              href={site.telegram}
              className="underline underline-offset-2 hover:text-mute"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
          </dd>
        </div>
        <div>
          <dt className="title-block">Почта</dt>
          <dd className="mt-2">
            <a href={`mailto:${site.email}`} className="hover:text-mute">
              {site.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="title-block">Адрес</dt>
          <dd className="mt-2 text-mute">{site.legal.address}</dd>
        </div>
        <div>
          <dt className="title-block">Основной сайт</dt>
          <dd className="mt-2">
            <a
              href={site.mainSite}
              className="underline underline-offset-2 hover:text-mute"
              target="_blank"
              rel="noopener noreferrer"
            >
              remont-mihalich.ru
            </a>
          </dd>
        </div>
      </dl>

      <a
        href={site.mainSite}
        className="mt-10 inline-flex border border-accent bg-accent px-5 py-3 text-sm font-medium text-ink"
        target="_blank"
        rel="noopener noreferrer"
      >
        Рассчитать стоимость на сайте
      </a>
    </div>
  );
}
