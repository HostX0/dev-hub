import { Inter, Tajawal, Noto_Sans_Arabic } from "next/font/google";
import localFont from "next/font/local";

export const fontArabic = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  display: "swap",
});
export const fontKurdish = Noto_Sans_Arabic({
  variable: "--font-kurdish",
  subsets: ["arabic"],
  weight: "variable",
  display: "swap",
  preload: false,
});
export const fontLatin = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});
export const fontDisplay = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ui",
  display: "swap",
  preload: false,
});
export const fontVars = `${fontArabic.variable} ${fontLatin.variable} ${fontDisplay.variable} ${fontKurdish.variable}`;
