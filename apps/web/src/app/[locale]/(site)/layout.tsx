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

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const [rawSettings, rawServices] = await Promise.all([api.settings(), api.services()]);
  const settings = localizeSettings(rawSettings, locale);
  const services = rawServices.map((s) => localizeService(s, locale));
  return (
    <LenisProvider>
      <ScrollProgress />
      <Navbar settings={settings} />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <Footer settings={settings} services={services} locale={locale} />
    </LenisProvider>
  );
}
