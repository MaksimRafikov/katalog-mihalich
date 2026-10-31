import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseGallery } from "@/components/CaseGallery";
import { CasePlan } from "@/components/CasePlan";
import { CaseReviewVideo } from "@/components/CaseReviewVideo";
import {
  gallerySrc,
  getCaseBySlug,
  isImageCover,
  objectTypeLabel,
  publishedCases,
  type CaseGalleryItem,
  type CaseVideo,
} from "@/data/cases";
import { site } from "@/data/site";
import { withBasePath } from "@/lib/paths";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Static export forbids an empty generateStaticParams — keep a throwaway slug until first case. */
const EMPTY_EXPORT_SLUG = "_";

export function generateStaticParams() {
  const list = publishedCases().map((item) => ({ slug: item.slug }));
  return list.length > 0 ? list : [{ slug: EMPTY_EXPORT_SLUG }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === EMPTY_EXPORT_SLUG) return { title: "Объект" };
  const item = getCaseBySlug(slug);
  if (!item) return { title: "Объект" };
  return {
    title: item.title,
    description: item.summary ?? `${item.title} — ремонт от «Михалыч»`,
  };
}

function resolveVideos(item: {
  videos?: CaseVideo[];
  reviewVideo?: string;
  reviewPoster?: string;
}): CaseVideo[] {
  if (item.videos && item.videos.length > 0) return item.videos;
  if (item.reviewVideo) {
    return [{ src: item.reviewVideo, poster: item.reviewPoster }];
  }
  return [];
}

function galleryItems(
  gallery: (string | CaseGalleryItem)[] | undefined,
  title: string,
): CaseGalleryItem[] {
  if (!gallery) return [];
  return gallery.map((entry, index) => {
    if (typeof entry === "string") {
      return {
        src: withBasePath(entry),
        alt: `${title} — фото ${index + 1}`,
      };
    }
    return {
      src: gallerySrc(entry),
      alt: entry.alt ?? `${title} — фото ${index + 1}`,
      caption: entry.caption,
    };
  });
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === EMPTY_EXPORT_SLUG) notFound();
  const item = getCaseBySlug(slug);
  if (!item) notFound();

  const gallery = galleryItems(item.gallery, item.title);
  const galleryBefore = galleryItems(item.galleryBefore, `${item.title} — до`);
  const videos = resolveVideos(item);
  const hasGallery = gallery.length > 0;
  const hasGalleryBefore = galleryBefore.length > 0;
  const hasVideos = videos.length > 0;
  const hasPlan = Boolean(item.plan);
  const typeLabel = objectTypeLabel(item.objectType);
  const plate = item.complex || typeLabel;
  const metaParts = [typeLabel];
  const photoHref = hasGallery
    ? "#gallery"
    : hasGalleryBefore
      ? "#gallery-before"
      : null;

  return (
    <div className="page-enter">
      <div className="relative h-[min(62vh,32rem)] w-full bg-line">
        {isImageCover(item.cover) ? (
          <Image
            src={withBasePath(item.cover)}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: item.cover }}
            aria-hidden
          />
        )}
      </div>

      <div className="mx-auto max-w-[var(--max)] px-[var(--page-pad)]">
        <nav className="pt-8 text-sm text-mute" aria-label="Хлебные крошки">
          <Link
            href="/catalog"
            className="transition-opacity duration-200 hover:opacity-70"
          >
            Каталог
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{item.title}</span>
        </nav>

        <header className="border-b border-line pb-8 pt-6">
          {item.complex ? (
            <p className="title-block mb-2">{item.complex}</p>
          ) : null}
          <h1 className="font-display text-4xl text-ink md:text-5xl">
            {item.title}
          </h1>
          {metaParts.length > 0 ? (
            <p className="title-block mt-4">{metaParts.join(" · ")}</p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {photoHref ? (
              <a
                href={photoHref}
                className="inline-flex min-h-11 items-center border border-ink bg-ink px-5 py-3 text-sm text-paper transition-opacity duration-200 hover:opacity-80"
              >
                Смотреть фото
              </a>
            ) : null}
            {hasGallery && hasGalleryBefore ? (
              <a
                href="#gallery-before"
                className="inline-flex min-h-11 items-center border border-line px-5 py-3 text-sm text-ink transition-colors duration-200 hover:border-ink"
              >
                Фото до
              </a>
            ) : null}
            {hasPlan ? (
              <a
                href="#plan"
                className="inline-flex min-h-11 items-center border border-ink bg-ink px-5 py-3 text-sm text-paper transition-opacity duration-200 hover:opacity-80"
              >
                Смотреть план
              </a>
            ) : null}
            {hasVideos ? (
              <a
                href="#review"
                className="inline-flex min-h-11 items-center border border-ink bg-ink px-5 py-3 text-sm text-paper transition-opacity duration-200 hover:opacity-80"
              >
                Смотреть видео
              </a>
            ) : null}
            {item.projectPdf ? (
              <a
                href={withBasePath(item.projectPdf)}
                className="inline-flex min-h-11 items-center border border-line px-5 py-3 text-sm text-ink transition-colors duration-200 hover:border-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть проект PDF
              </a>
            ) : null}
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-flex min-h-11 items-center border border-accent bg-accent px-5 py-3 text-sm font-medium text-ink transition-opacity duration-200 hover:opacity-90"
            >
              Позвонить
            </a>
            <Link
              href="/contacts"
              className="inline-flex min-h-11 items-center border border-line px-5 py-3 text-sm text-ink transition-colors duration-200 hover:border-ink"
            >
              Контакты
            </Link>
          </div>
        </header>

        <section className="border-b border-line py-10">
          <h2 className="font-display text-2xl text-ink">Паспорт объекта</h2>
          <p className="mt-4 max-w-prose text-mute text-pretty">
            {item.area != null ? (
              <>
                <span className="text-ink">Площадь:</span> {item.area} м²
                <span className="mx-2 text-line">·</span>
              </>
            ) : null}
            <span className="text-ink">Тип:</span> {typeLabel}
            {item.complex ? (
              <>
                <span className="mx-2 text-line">·</span>
                <span className="text-ink">Объект:</span> {item.complex}
              </>
            ) : null}
          </p>
        </section>

        {item.summary ? (
          <section className="border-b border-line py-10">
            <h2 className="font-display text-2xl text-ink">О работах</h2>
            <p className="mt-4 max-w-prose text-mute text-pretty">{item.summary}</p>
          </section>
        ) : null}

        {hasPlan && item.plan ? (
          <CasePlan
            src={item.plan}
            alt={`Планировка · ${item.title}`}
            plate={plate}
          />
        ) : null}

        {hasGallery ? <CaseGallery images={gallery} plate={plate} /> : null}

        {hasVideos ? <CaseReviewVideo videos={videos} plate={plate} /> : null}

        {hasGalleryBefore ? (
          <CaseGallery
            images={galleryBefore}
            plate={plate}
            heading="До ремонта"
            id="gallery-before"
          />
        ) : null}

        <section className="flex flex-wrap gap-3 py-10">
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex min-h-11 items-center border border-accent bg-accent px-5 py-3 text-sm font-medium text-ink"
          >
            Позвонить {site.phone}
          </a>
          <a
            href={site.whatsapp}
            className="inline-flex min-h-11 items-center border border-ink px-5 py-3 text-sm text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            href={site.telegram}
            className="inline-flex min-h-11 items-center border border-ink px-5 py-3 text-sm text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
          <Link
            href="/catalog"
            className="inline-flex min-h-11 items-center px-5 py-3 text-sm text-mute transition-colors duration-200 hover:text-ink"
          >
            ← К каталогу
          </Link>
        </section>
      </div>
    </div>
  );
}
