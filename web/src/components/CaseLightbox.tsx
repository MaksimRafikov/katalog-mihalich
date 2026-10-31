"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useLightboxGestures } from "@/components/useLightboxGestures";

export type LightboxImage = {
  src: string;
  alt?: string;
};

type CaseLightboxProps = {
  images: readonly LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const subscribeToHydration = () => () => {};

function isVisible(el: HTMLElement) {
  return el.getClientRects().length > 0;
}

export function CaseLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: CaseLightboxProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const current = images[index];
  const multi = images.length > 1;

  const { transform, backdropOpacity, resetZoom } = useLightboxGestures({
    surfaceRef,
    enabled: mounted,
    multi,
    onPrev,
    onNext,
    onClose,
  });

  useEffect(() => {
    resetZoom();
  }, [index, resetZoom]);

  useEffect(() => {
    if (!mounted) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function focusables() {
      if (!surfaceRef.current) return [] as HTMLElement[];
      return Array.from(
        surfaceRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter(isVisible);
    }

    function onKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (multi) onPrev();
          break;
        case "ArrowRight":
          if (multi) onNext();
          break;
        case "Tab": {
          const items = focusables();
          if (items.length === 0) {
            event.preventDefault();
            break;
          }

          const first = items[0];
          const last = items[items.length - 1];
          const active = document.activeElement;

          if (event.shiftKey) {
            if (active === first || !surfaceRef.current?.contains(active)) {
              event.preventDefault();
              last.focus();
            }
            break;
          }

          if (active === last || !surfaceRef.current?.contains(active)) {
            event.preventDefault();
            first.focus();
          }
          break;
        }
        default:
          break;
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [mounted, multi, onClose, onNext, onPrev]);

  if (!current || !mounted) {
    return null;
  }

  const zoomed = transform.scale > 1.02;
  const imageStyle = {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
    transition: transform.dragging ? "none" : "transform 180ms ease-out",
  };

  return createPortal(
    <div
      ref={surfaceRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lightbox="true"
      className="fixed inset-0 z-[100] flex touch-none items-center justify-center px-[var(--page-pad)] py-16"
      onClick={(event) => {
        if (event.target === event.currentTarget && !zoomed) onClose();
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-night"
        style={{ opacity: 0.92 * backdropOpacity }}
      />

      <p id={titleId} className="sr-only">
        Фото в полном размере. Свайп влево или вправо — листать, вниз —
        закрыть, щипок — увеличить.
      </p>

      <button
        ref={closeRef}
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-10 flex h-11 w-11 items-center justify-center text-2xl text-paper transition-opacity duration-200 hover:opacity-70"
      >
        ×
      </button>

      {multi && !zoomed ? (
        <button
          type="button"
          aria-label="Предыдущее фото"
          onClick={onPrev}
          className="absolute left-[max(0.5rem,env(safe-area-inset-left))] top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-paper transition-opacity duration-200 hover:opacity-70"
        >
          ‹
        </button>
      ) : null}

      <div
        className="relative z-[1] h-[min(80vh,44rem)] w-full max-w-5xl will-change-transform"
        style={imageStyle}
      >
        <Image
          src={withBasePath(current.src)}
          alt={current.alt ?? ""}
          fill
          sizes="(max-width: 1280px) 100vw, 64rem"
          quality={80}
          className="pointer-events-none object-contain select-none"
          draggable={false}
          priority
        />
      </div>

      {multi && !zoomed ? (
        <button
          type="button"
          aria-label="Следующее фото"
          onClick={onNext}
          className="absolute right-[max(0.5rem,env(safe-area-inset-right))] top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-paper transition-opacity duration-200 hover:opacity-70"
        >
          ›
        </button>
      ) : null}

      {multi ? (
        <p
          className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 title-block text-paper/80"
          aria-live="polite"
        >
          {index + 1} / {images.length}
        </p>
      ) : null}
    </div>,
    document.body,
  );
}
