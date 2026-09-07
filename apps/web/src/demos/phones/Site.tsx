import type { DemoLang } from "@/demos/config";
import { RetailSite } from "@/demos/retail/RetailSite";
import { phonesContent } from "./content";

export function PhonesSite({ lang }: { lang: DemoLang }) {
  return <RetailSite site="phones" lang={lang} t={phonesContent[lang]} />;
}
