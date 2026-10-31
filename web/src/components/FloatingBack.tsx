"use client";

import { usePathname, useRouter } from "next/navigation";

function canUseHistoryBack() {
  if (typeof window === "undefined") return false;
  const state = window.history.state as { idx?: number } | null;
  if (typeof state?.idx === "number") return state.idx > 0;
  return window.history.length > 1;
}

/** Sensible parent when history has no in-app previous entry. */
function fallbackHref(pathname: string): string {
  if (pathname === "/catalog" || pathname === "/contacts") return "/";
  if (pathname.startsWith("/catalog/")) return "/catalog";
  return "/";
}

export function FloatingBack() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  function handleBack() {
    if (canUseHistoryBack()) {
      router.back();
      return;
    }
    router.push(fallbackHref(pathname));
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Назад"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] left-[var(--page-pad)] z-40 inline-flex h-11 w-11 items-center justify-center border border-line bg-paper text-ink transition-[border-color,opacity] duration-200 ease-out hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden
        className="-translate-x-px"
      >
        <path
          d="M11.25 3.75 6 9l5.25 5.25"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </button>
  );
}
