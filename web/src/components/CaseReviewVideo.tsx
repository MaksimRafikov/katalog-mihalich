import type { CaseVideo } from "@/data/cases";
import { withBasePath } from "@/lib/paths";

type CaseReviewVideoProps = {
  videos: CaseVideo[];
  plate: string;
  heading?: string;
  note?: string;
};

export function CaseReviewVideo({
  videos,
  plate,
  heading = "Видео",
  note,
}: CaseReviewVideoProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <section
      id="review"
      className="scroll-mt-24 border-b border-line py-10 last:border-b-0"
    >
      <h2 className="font-display text-2xl text-ink">{heading}</h2>
      <div className="mt-3 border-t border-line pt-3">
        <p className="title-block">{plate}</p>
      </div>
      {note ? (
        <p className="mt-4 max-w-prose text-sm text-mute text-pretty">{note}</p>
      ) : null}

      <div className="mt-6 flex max-w-3xl flex-col gap-8">
        {videos.map((video) => {
          const src = withBasePath(video.src);
          const poster = video.poster
            ? withBasePath(video.poster)
            : undefined;
          return (
            <figure key={video.src} className="m-0">
              {video.label ? (
                <p className="title-block mb-3">{video.label}</p>
              ) : null}
              <div className="relative aspect-video bg-night outline outline-1 outline-black/10 outline-offset-[-1px]">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={poster}
                  className="h-full w-full bg-night object-contain"
                >
                  <source src={src} type="video/mp4" />
                  <a href={src}>Открыть видео</a>
                </video>
              </div>
              <figcaption className="mt-3 max-w-prose text-sm text-mute text-pretty">
                <a
                  href={src}
                  className="text-ink underline decoration-line underline-offset-4 transition-opacity duration-200 hover:opacity-70"
                >
                  Открыть видео отдельно
                </a>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
