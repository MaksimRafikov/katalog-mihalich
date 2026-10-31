"use client";

import Image from "next/image";
import { useState } from "react";
import { CaseLightbox, type LightboxImage } from "@/components/CaseLightbox";
import { MobileOpenAffordance } from "@/components/MobileOpenAffordance";
import { withBasePath } from "@/lib/paths";

export type CaseGalleryImage = {
  src: string;
  alt?: string;
  caption?: string;
};

type CaseGalleryProps = {
  images: readonly (string | CaseGalleryImage)[];
  plate: string;
  heading?: string;
  id?: string;
};

const TILE_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

function normalize(
  images: readonly (string | CaseGalleryImage)[],
): CaseGalleryImage[] {
  return images.map((item) => {
    if (typeof item === "string") {
      return { src: withBasePath(item), alt: "" };
    }
    return { ...item, src: withBasePath(item.src) };
  });
}

export function CaseGallery({
  images,
  plate,
  heading = "Фото",
  id = "gallery",
}: CaseGalleryProps) {
  const items = normalize(images);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) {
    return null;
  }

  const lightboxImages: LightboxImage[] = items.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-line py-10 last:border-b-0"
    >
      <h2 className="font-display text-2xl text-ink">{heading}</h2>
      <div className="mt-3 border-t border-line pt-3">
        <p className="title-block">{plate}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <figure key={`${item.src}-${index}`} className="m-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-line outline outline-1 outline-black/10 outline-offset-[-1px]">
              <Image
                src={item.src}
                alt={item.alt ?? ""}
                fill
                sizes={TILE_SIZES}
                quality={75}
                priority={index < 3}
                className="object-cover transition-opacity duration-200 hover:opacity-85 active:opacity-90"
              />
              <MobileOpenAffordance />
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="absolute inset-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
                aria-label={item.alt || `Открыть фото ${index + 1}`}
              />
            </div>
            {item.caption ? (
              <figcaption className="mt-2 title-block">{item.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {openIndex !== null ? (
        <CaseLightbox
          images={lightboxImages}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() =>
            setOpenIndex((current) =>
              current === null
                ? null
                : (current - 1 + items.length) % items.length,
            )
          }
          onNext={() =>
            setOpenIndex((current) =>
              current === null ? null : (current + 1) % items.length,
            )
          }
        />
      ) : null}
    </section>
  );
}
