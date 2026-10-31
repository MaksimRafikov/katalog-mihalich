/** Corner cue for tap-to-open media. Mobile only — desktop keeps hover/cursor. */
export function MobileOpenAffordance({ label = "Открыть" }: { label?: string }) {
  return (
    <span
      className="pointer-events-none absolute bottom-2 right-2 z-[1] inline-flex items-center gap-1.5 border border-line bg-paper px-2 py-1.5 text-ink md:hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
      </svg>
      <span className="title-block leading-none">{label}</span>
    </span>
  );
}
