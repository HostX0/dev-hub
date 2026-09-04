import { api } from "@/lib/api";
import { resolveLocale } from "@/i18n";
import { localizeProject, localizeService, localizeSettings } from "@/lib/localize";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Services } from "@/components/site/Services";
import { Capabilities } from "@/components/site/Capabilities";
import { FeaturedProjects } from "@/components/site/FeaturedProjects";
import { Process } from "@/components/site/Process";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const [rawSettings, rawServices, rawFeatured] = await Promise.all([api.settings(), api.services(), api.projects(true)]);
  const settings = localizeSettings(rawSettings, locale);
  const services = rawServices.map((s) => localizeService(s, locale));
  const featured = rawFeatured.map((p) => localizeProject(p, locale));

  return (
    <>
      <Hero settings={settings} projects={featured} />
      <TrustStrip clients={settings.clients} stack={settings.stack} locale={locale} />
      <Services services={services} locale={locale} />
      <Capabilities locale={locale} />
      <FeaturedProjects projects={featured} locale={locale} />
      <Process locale={locale} />
      <About settings={settings} locale={locale} />
      <Testimonials items={settings.testimonials} locale={locale} />
      <Faq />
      <Contact settings={settings} locale={locale} />
    </>
  );
}
