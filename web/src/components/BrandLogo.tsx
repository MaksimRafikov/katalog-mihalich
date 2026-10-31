import Image from "next/image";
import { site } from "@/data/site";

export type BrandTaglineTone = "paper" | "mute" | "accent" | "ink" | "night";

export type BrandLogoSize = "header" | "hero" | "footer";

const taglineToneClass: Record<BrandTaglineTone, string> = {
  paper: "text-paper/90",
  mute: "text-mute",
  accent: "text-accent",
  ink: "text-ink/85",
  night: "text-night/70",
};

const sizeClass: Record<
  BrandLogoSize,
  {
    root: string;
    mascot: string;
    wordmark: string;
    service: string;
    extra: string;
  }
> = {
  /** Шапка: только медведь + МИХАЛЫЧ, компактная высота */
  header: {
    root: "gap-2 md:gap-2.5",
    mascot: "h-9 w-auto md:h-10 lg:h-11",
    wordmark: "h-6 w-auto md:h-7 lg:h-[1.875rem]",
    service: "hidden",
    extra: "hidden",
  },
  hero: {
    root: "gap-3 md:gap-4",
    mascot: "h-16 w-auto md:h-20 lg:h-24",
    wordmark: "h-auto w-40 md:w-52 lg:w-60",
    service:
      "block text-xs leading-snug font-semibold tracking-wide md:text-sm",
    extra: "block text-[11px] leading-snug font-medium tracking-wide md:text-xs",
  },
  footer: {
    root: "gap-2",
    mascot: "h-8 w-auto",
    wordmark: "h-auto w-28",
    service: "hidden",
    extra: "hidden",
  },
};

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /**
   * Подпись услуг HTML (не в PNG).
   * false — только медведь + wordmark
   */
  showTagline?: boolean;
  /** Цвет подписи под конкретный фон */
  taglineTone?: BrandTaglineTone;
  /** Предустановленные размеры (шапка / hero / футер) */
  size?: BrandLogoSize;
};

export function BrandLogo({
  className = "",
  priority,
  showTagline = false,
  taglineTone = "paper",
  size = "header",
}: BrandLogoProps) {
  const styles = sizeClass[size];
  const [serviceLine, extraLine] = site.logoLines;
  const tone = taglineToneClass[taglineTone];

  return (
    <span
      className={`inline-flex min-w-0 items-center ${styles.root} ${className}`}
    >
      <Image
        src={site.logoMascot}
        alt=""
        width={711}
        height={766}
        priority={priority}
        unoptimized
        className={`shrink-0 object-contain object-left ${styles.mascot}`}
        aria-hidden
      />
      <span
        className={`flex min-w-0 flex-col items-start ${showTagline ? "justify-center gap-0.5" : "justify-center"}`}
      >
        <Image
          src={site.logoWordmark}
          alt=""
          width={1000}
          height={202}
          priority={priority}
          unoptimized
          className={`max-w-full shrink-0 object-contain object-left object-center ${styles.wordmark}`}
          aria-hidden
        />
        {showTagline ? (
          <>
            <span className={`w-full text-left ${styles.service} ${tone}`}>
              {serviceLine}
            </span>
            <span
              className={`w-full text-left ${styles.extra} ${tone} opacity-90`}
            >
              {extraLine}
            </span>
          </>
        ) : null}
      </span>
    </span>
  );
}
