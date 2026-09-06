import {
  Amiri,
  Cormorant,
  Fraunces,
  IBM_Plex_Sans_Arabic,
  Lalezar,
  Playfair_Display,
  Reem_Kufi,
  Rubik,
} from "next/font/google";
import { fontArabic, fontLatin } from "@/app/fonts";
import type { DemoSlug } from "./config";

// Each template gets its own typographic voice; the CSS in app/demos/demos.css maps
// these variables onto --font-d-body / --font-d-display per site and language.
const plex = IBM_Plex_Sans_Arabic({
  variable: "--font-plex",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});
const reemKufi = Reem_Kufi({
  variable: "--font-reem",
  subsets: ["arabic", "latin"],
  display: "swap",
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});
const lalezar = Lalezar({
  variable: "--font-lalezar",
  subsets: ["arabic", "latin"],
  weight: "400",
  display: "swap",
});
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const demoFontVars: Record<DemoSlug, string> = {
  company: plex.variable,
  lawyer: `${playfair.variable} ${amiri.variable} ${fontLatin.variable} ${fontArabic.variable}`,
  photographer: `${cormorant.variable} ${reemKufi.variable} ${fontLatin.variable} ${plex.variable}`,
  restaurant: `${fraunces.variable} ${lalezar.variable} ${rubik.variable}`,
};
