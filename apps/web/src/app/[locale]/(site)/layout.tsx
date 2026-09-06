import { SITE_URL, jsonLd } from "@/lib/seo";
import { api } from "@/lib/api";
import { resolveLocale } from "@/i18n";
import { localizeService, localizeSettings } from "@/lib/localize";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Render HTML per request (cheap) while API data stays in the tagged data cache.
// Prevents a cold-start failure (API not up yet) from being cached as an empty page.
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const [rawSettings, rawServices] = await Promise.all([
    api.settings(),
    api.services(),
  ]);
  const settings = localizeSettings(rawSettings, locale);
  const services = rawServices.map((s) => localizeService(s, locale));
  return (
    <LenisProvider>
      <a href="#main-content" className="skip-link">
        {locale === "ar"
          ? "انتقل إلى المحتوى"
          : locale === "ckb"
            ? "بڕۆ بۆ ناوەڕۆک"
            : "Skip to content"}
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: "DevsHub.cc",
            url: SITE_URL,
            logo: `${SITE_URL}/brand/mark.svg`,
            founder: rawSettings.team?.map((member) => ({
              "@type": "Person",
              name: member.name,
              jobTitle: member.roleEn,
              image: member.photo.startsWith("/")
                ? `${SITE_URL}${member.photo}`
                : member.photo,
            })),
            telephone: rawSettings.phone,
            email: rawSettings.email || undefined,
            address: {
              "@type": "PostalAddress",
              streetAddress: rawSettings.locationEn || rawSettings.location,
              addressLocality: "Baghdad",
              addressRegion: "Baghdad Governorate",
              postalCode: "10011",
              addressCountry: "IQ",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: rawSettings.phone,
              contactType: "customer service",
              availableLanguage: ["Arabic", "English", "Central Kurdish"],
            },
          }),
        }}
      />
      <ScrollProgress />
      <Navbar settings={settings} />
      <main id="main-content" tabIndex={-1} className="flex-1 overflow-x-clip">
        {children}
      </main>
      <Footer settings={settings} services={services} locale={locale} />
    </LenisProvider>
  );
}
