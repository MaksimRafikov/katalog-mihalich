"use client";

import Image from "next/image";
import { useState } from "react";
import { CaseLightbox } from "@/components/CaseLightbox";
import { MobileOpenAffordance } from "@/components/MobileOpenAffordance";

type CasePlanProps = {
  src: string;
  alt: string;
  plate: string;
  heading?: string;
};

export function CasePlan({
  src,
  alt,
  plate,
  heading = "Планировка",
}: CasePlanProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border-b border-line py-10" id="plan">
      <h2 className="font-display text-2xl text-ink">{heading}</h2>
      <div className="mt-3 border-t border-line pt-3">
        <p className="title-block">{plate}</p>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mt-6 block w-full max-w-3xl cursor-zoom-in bg-paper text-left outline outline-1 outline-black/10 outline-offset-[-1px] transition-opacity duration-200 hover:opacity-85 active:opacity-90 focus-visible:outline-ink"
        aria-label={`Открыть: ${alt}`}
      >
        <span className="relative block aspect-[4/3] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 48rem"
            className="object-contain p-2 md:p-4"
          />
          <MobileOpenAffordance label="Открыть план" />
        </span>
      </button>

      {open ? (
        <CaseLightbox
          images={[{ src, alt }]}
          index={0}
          onClose={() => setOpen(false)}
          onPrev={() => undefined}
          onNext={() => undefined}
        />
      ) : null}
    </section>
  );
}
