import { ar, type Dict } from "./dictionaries/ar";
import { en } from "./dictionaries/en";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

const dictionaries: Record<Locale, Dict> = { ar, en };

export const getDict = (locale: string): Dict => dictionaries[isLocale(locale) ? locale : DEFAULT_LOCALE];
export const resolveLocale = (locale: string): Locale => (isLocale(locale) ? locale : DEFAULT_LOCALE);
export type { Dict, Locale };
