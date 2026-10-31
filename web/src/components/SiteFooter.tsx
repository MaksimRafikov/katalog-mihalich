"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { site } from "@/data/site";

export function SiteFooter() {
  const isHome = usePathname() === "/";

  return (
    <footer className={`${isHome ? "" : "mt-auto"} border-t border-line`}>
      <div className="mx-auto flex max-w-[var(--max)] flex-col gap-4 px-[var(--page-pad)] py-10 md:flex-row md:items-end md:justify-between">
        <div>
          {isHome ? null : (
            <Link
              href="/"
              className="inline-flex"
              aria-label={`${site.siteName} — на главную`}
            >
              <BrandLogo size="footer" />
            </Link>
          )}
          <p className={`max-w-sm text-sm text-mute ${isHome ? "" : "mt-2"}`}>
            {site.tagline}
          </p>
          <p className="mt-1 text-sm text-mute">{site.legal.name}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
          <Link href="/catalog" className="hover:text-ink">
            Каталог
          </Link>
          <Link href="/contacts" className="hover:text-ink">
            Контакты
          </Link>
          <a
            href={site.mainSite}
            className="hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            remont-mihalich.ru
          </a>
        </div>
      </div>
    </footer>
  );
}
