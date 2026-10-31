import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[var(--max)] px-[var(--page-pad)] py-20">
      <h1 className="font-display text-3xl text-ink">Страница не найдена</h1>
      <p className="mt-3 text-sm text-mute">Такого адреса в каталоге нет.</p>
      <Link
        href="/catalog"
        className="mt-8 inline-flex border border-ink px-5 py-3 text-sm text-ink"
      >
        В каталог
      </Link>
    </div>
  );
}
