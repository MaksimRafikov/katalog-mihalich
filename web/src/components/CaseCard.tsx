import Image from "next/image";
import Link from "next/link";
import { isImageCover } from "@/data/cases";

type CaseCardProps = {
  href: string;
  title: string;
  meta: string;
  plate: string;
  cover: string;
  secondary?: string;
};

export function CaseCard({
  href,
  title,
  meta,
  plate,
  cover,
  secondary,
}: CaseCardProps) {
  const image = isImageCover(cover);

  return (
    <Link href={href} className="group block">
      <article>
        <div className="relative aspect-[4/3] overflow-hidden bg-line transition-opacity duration-300 group-hover:opacity-90">
          {image ? (
            <Image
              src={cover}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: cover }}
              aria-hidden
            />
          )}
        </div>
        <div className="border-t border-line pt-3">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl text-ink">{title}</h3>
            {plate ? (
              <span className="title-block shrink-0">{plate}</span>
            ) : null}
          </div>
          {meta || secondary ? (
            <p className="mt-1 text-sm text-mute">
              {meta}
              {secondary ? `${meta ? " · " : ""}${secondary}` : null}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
