import type { Metadata, Viewport } from "next";
import { fontVars } from "@/app/fonts";
import { I18nProvider } from "@/i18n/client";
import { dirOf, LOCALES } from "@/i18n/config";
import { getDict, resolveLocale } from "@/i18n";
import "@/app/globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getDict(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: t.meta.template },
    description: t.meta.description,
    alternates: { canonical: `/${locale}`, languages: { ar: "/ar", en: "/en" } },
    openGraph: { type: "website", locale: locale === "ar" ? "ar_SA" : "en_US", siteName: "Dev Hub", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#05050a",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const dict = getDict(locale);
  return (
    <html lang={locale} dir={dirOf(locale)} data-scroll-behavior="smooth" className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <I18nProvider locale={locale} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
