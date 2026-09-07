import type { DemoLang } from "@/demos/config";
import { RetailSite } from "@/demos/retail/RetailSite";
import { appliancesContent } from "./content";

export function AppliancesSite({ lang }: { lang: DemoLang }) {
  return (
    <RetailSite site="appliances" lang={lang} t={appliancesContent[lang]} />
  );
}
