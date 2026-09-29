// Fonts for the zine, exposed as CSS variables (mapped to type roles in zine.css).

import {
  Abril_Fatface,
  Anybody,
  Bagel_Fat_One,
  Caveat,
  Chango,
  Dela_Gothic_One,
  Permanent_Marker,
  Rubik_Mono_One,
  Shrikhand,
  Space_Mono,
} from "next/font/google";

const bagel = Bagel_Fat_One({ weight: "400", subsets: ["latin"], variable: "--f-bagel" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--f-marker" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--f-spacemono" });
const anybody = Anybody({ weight: "variable", axes: ["wdth"], subsets: ["latin"], variable: "--f-anybody" });
const caveat = Caveat({ weight: "variable", subsets: ["latin"], variable: "--f-caveat" });
const shrikhand = Shrikhand({ weight: "400", subsets: ["latin"], variable: "--f-shrikhand" });
const dela = Dela_Gothic_One({ weight: "400", subsets: ["latin"], variable: "--f-dela" });
const rubikMono = Rubik_Mono_One({ weight: "400", subsets: ["latin"], variable: "--f-rubikmono" });
const abril = Abril_Fatface({ weight: "400", subsets: ["latin"], variable: "--f-abril" });
const chango = Chango({ weight: "400", subsets: ["latin"], variable: "--f-chango" });

/** Put on <html> so every zine font variable is defined. */
export const zineFonts = [bagel, marker, mono, anybody, caveat, shrikhand, dela, rubikMono, abril, chango]
  .map((f) => f.variable)
  .join(" ");
