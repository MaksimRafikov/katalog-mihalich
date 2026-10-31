import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <div className="page-enter">
      <section className="hero-grain relative overflow-hidden bg-night text-paper">
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          aria-hidden
        />
        <div className="relative z-[2] mx-auto flex min-h-[min(88vh,52rem)] max-w-[var(--max)] flex-col justify-end px-[var(--page-pad)] pb-14 pt-20 md:pb-16 md:pt-24">
          <BrandLogo
            size="hero"
            priority
            showTagline
            taglineTone="paper"
          />
          <h1 className="sr-only">{site.siteName}</h1>
          <p className="mt-7 max-w-xl font-display text-2xl leading-snug text-paper md:text-3xl">
            {site.heroHeadline}
          </p>
          <p className="mt-4 max-w-lg text-base text-paper/70 md:text-lg">
            {site.heroSupport}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="border border-accent bg-accent px-5 py-3 text-sm font-medium text-ink transition-opacity duration-200 hover:opacity-90"
            >
              Смотреть каталог
            </Link>
            <a
              href={site.mainSite}
              className="border border-paper/40 px-5 py-3 text-sm text-paper transition-colors duration-200 hover:border-paper"
              target="_blank"
              rel="noopener noreferrer"
            >
              На основной сайт
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
