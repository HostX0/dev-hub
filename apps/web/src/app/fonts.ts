import { IBM_Plex_Sans_Arabic, Inter, Space_Grotesk } from "next/font/google";

/** Arabic body/display font */
export const fontArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Latin body font (English locale) */
export const fontLatin = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/** Display / numeric font used for headings in EN and for numbers, code, and tags everywhere */
export const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const fontVars = `${fontArabic.variable} ${fontLatin.variable} ${fontDisplay.variable}`;
