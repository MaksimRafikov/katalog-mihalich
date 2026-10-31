"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { site } from "@/data/site";

const nav = [
  { href: "/catalog", label: "Каталог" },
  { href: "/contacts", label: "Контакты" },
] as const;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isVisible(el: HTMLElement) {
  return el.getClientRects().length > 0;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef(true);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    returnFocusRef.current = true;

    const firstInPanel =
      panelRef.current?.querySelector<HTMLElement>("a[href]");
    firstInPanel?.focus();

    function focusables() {
      if (!headerRef.current) return [] as HTMLElement[];
      return Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter(isVisible);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        returnFocusRef.current = true;
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !headerRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || !headerRef.current?.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (headerRef.current?.contains(target)) return;
      returnFocusRef.current = false;
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    const menuButton = menuButtonRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      if (returnFocusRef.current) {
        menuButton?.focus();
      }
    };
  }, [open]);

  return (
    <header ref={headerRef} className="border-b border-line bg-field/95">
      <div className="mx-auto flex max-w-[var(--max)] items-center justify-between gap-4 px-[var(--page-pad)] py-2.5 md:py-3">
        {isHome ? (
          <span className="block w-[min(10rem,40vw)] shrink-0" aria-hidden />
        ) : (
          <Link
            href="/"
            className="inline-flex max-w-[calc(100%-3.25rem)] shrink-0 items-center sm:max-w-[calc(100%-8rem)]"
            aria-label={`${site.siteName} — на главную`}
          >
            <BrandLogo size="header" priority />
          </Link>
        )}

        <nav className="hidden items-center gap-7 md:flex" aria-label="Основная">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-mute transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.mainSite}
            className="text-sm text-mute transition-colors duration-200 hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Основной сайт
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden border border-ink bg-ink px-4 py-2 text-sm text-paper transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-ink sm:inline-flex"
          >
            Позвонить
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Меню</span>
            <span aria-hidden className="flex w-4 flex-col gap-1">
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          ref={panelRef}
          id={panelId}
          className="border-t border-line px-[var(--page-pad)] py-4 md:hidden"
          aria-label="Мобильная"
        >
          <ul className="space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-base text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.mainSite}
                className="block text-base text-ink"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Основной сайт
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phoneHref}`}
                className="block text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {site.phone}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
