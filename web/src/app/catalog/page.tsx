import type { Metadata } from "next";
import { CatalogView } from "@/components/CatalogView";

export const metadata: Metadata = {
  title: "Каталог ремонтов",
  description:
    "Реализованные ремонты квартир, домов и коммерческих помещений в Уфе.",
};

export default function CatalogPage() {
  return (
    <div className="page-enter mx-auto max-w-[var(--max)] px-[var(--page-pad)] py-10 md:py-14">
      <header className="mb-8 max-w-2xl">
        <p className="title-block">Работы</p>
        <h1 className="mt-2 font-display text-3xl text-ink md:text-4xl">
          Каталог ремонтов
        </h1>
        <p className="mt-3 text-sm text-mute md:text-base">
          Объекты с фото и видео. Список пополняется.
        </p>
      </header>
      <CatalogView />
    </div>
  );
}
