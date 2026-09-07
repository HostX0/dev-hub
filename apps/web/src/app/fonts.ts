import localFont from "next/font/local";

// All faces are self-hosted (OFL, see ./fonts/demos/LICENSE.md and scripts/fetch-demo-fonts.mjs)
// so production builds never depend on fonts.gstatic.com being reachable.
export const fontArabic = localFont({
  variable: "--font-arabic",
  display: "swap",
  src: [
    { path: "./fonts/demos/tajawal-400.woff", weight: "400", style: "normal" },
    { path: "./fonts/demos/tajawal-500.woff", weight: "500", style: "normal" },
    { path: "./fonts/demos/tajawal-700.woff", weight: "700", style: "normal" },
    { path: "./fonts/demos/tajawal-800.woff", weight: "800", style: "normal" },
  ],
});
export const fontKurdish = localFont({
  variable: "--font-kurdish",
  display: "swap",
  preload: false,
  src: [
    {
      path: "./fonts/demos/notoArabic-400.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/demos/notoArabic-500.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/demos/notoArabic-700.woff",
      weight: "700",
      style: "normal",
    },
  ],
});
export const fontLatin = localFont({
  variable: "--font-latin",
  display: "swap",
  src: [
    { path: "./fonts/demos/inter-400.woff", weight: "400", style: "normal" },
    { path: "./fonts/demos/inter-500.woff", weight: "500", style: "normal" },
    { path: "./fonts/demos/inter-600.woff", weight: "600", style: "normal" },
    { path: "./fonts/demos/inter-700.woff", weight: "700", style: "normal" },
    { path: "./fonts/demos/inter-800.woff", weight: "800", style: "normal" },
  ],
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
