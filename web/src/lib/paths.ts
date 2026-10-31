/**
 * Prefix absolute public paths for GitHub Pages project URL
 * (`/katalog-mihalich/...`). next/image and next/link honor basePath
 * themselves; raw <video>/<a href> do not.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base) return path;
  if (path === base || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
