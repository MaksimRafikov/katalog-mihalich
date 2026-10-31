import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { FloatingBack } from "@/components/FloatingBack";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";
import "./globals.css";

const unbounded = Unbounded({
  weight: ["500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.siteName} — каталог ремонтов`,
    template: `%s · ${site.siteName}`,
  },
  description:
    "Каталог реализованных ремонтов квартир, домов и коммерции в Уфе. Компания «Михалыч».",
  metadataBase: new URL(site.mainSite),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingBack />
      </body>
    </html>
  );
}
