import type { DemoSlug } from "./config";
import {
  amiri,
  cairo,
  cormorant,
  fraunces,
  inter,
  lalezar,
  manrope,
  playfair,
  plex,
  reem,
  rubik,
  tajawal,
} from "./fonts.local";

// Each template gets its own typographic voice; the CSS in app/demos/demos.css maps
// these variables onto --font-d-body / --font-d-display per site and language.
// Faces are self-hosted (scripts/fetch-demo-fonts.mjs) so builds never depend on
// fonts.gstatic.com being reachable.
export const demoFontVars: Record<DemoSlug, string> = {
  company: plex.variable,
  lawyer: `${playfair.variable} ${amiri.variable} ${inter.variable} ${tajawal.variable}`,
  photographer: `${cormorant.variable} ${reem.variable} ${inter.variable} ${plex.variable}`,
  restaurant: `${fraunces.variable} ${lalezar.variable} ${rubik.variable}`,
  clinic: cairo.variable,
  realestate: `${manrope.variable} ${cairo.variable}`,
};
