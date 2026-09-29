// Homepage words and content. Edit copy here; layout lives in the components.
// Colors are zine.css tokens: var(--c-…) inks stay the same in both prints.

import { Arch, BrisketSlice, Smoker } from "@/components/illustrations";
import type { OrderCopy } from "@/components/order/OrderSection";
import type { Step } from "@/components/zine/FlipCards";
import type { Note } from "@/components/zine/NoteBoard";
import type { Cut } from "@/components/zine/Ransom";
import type { StickerKind } from "@/components/zine/Sticker";

const TORN = ["polygon(3% 4%,98% 0,100% 96%,0 100%)", "polygon(0 2%,100% 5%,97% 100%,3% 95%)", "polygon(5% 0,100% 3%,95% 97%,0 100%)"];

/** The papers the SMEATS letters are cut from. */
export const RANSOM_CUTS: Cut[] = [
  { font: "var(--f-bagel)", bg: "#fff", fg: "var(--c-red)", scale: 1, clip: TORN[0] },
  { font: "var(--f-dela)", bg: "#efe6d2", fg: "var(--c-ink)", scale: 0.9, clip: TORN[1], newsprint: true },
  { font: "var(--f-shrikhand)", bg: "var(--c-gold)", fg: "var(--c-blue)", scale: 1.05, clip: TORN[2] },
  { font: "var(--f-rubikmono)", bg: "var(--c-blue)", fg: "#fff", scale: 0.82, clip: TORN[0] },
  { font: "var(--f-abril)", bg: "#fff", fg: "var(--c-ink)", scale: 1.04, clip: TORN[1] },
  { font: "var(--f-chango)", bg: "var(--c-ink)", fg: "var(--c-gold)", scale: 0.84, clip: TORN[2] },
  { font: "var(--f-bagel)", bg: "var(--c-gold)", fg: "var(--c-red)", scale: 0.96, clip: TORN[1] },
  { font: "var(--f-marker)", bg: "var(--c-blue)", fg: "var(--c-gold)", scale: 1.05, clip: TORN[0] },
  { font: "var(--f-caveat)", bg: "#fff", fg: "var(--c-blue)", scale: 1.2, clip: TORN[2] },
  { font: "var(--f-bagel)", bg: "var(--c-pink)", fg: "var(--c-nite)", scale: 1, clip: TORN[0] },
  { font: "var(--f-rubikmono)", bg: "var(--c-nite)", fg: "var(--c-green)", scale: 0.82, clip: TORN[1] },
];

/** Ink pairs the headline reprints in (each pair has a day and a night version in zine.css). */
export const HEADLINE_INKS: [string, string][] = [1, 2, 3, 4].map((i) => [`var(--kin-a${i})`, `var(--kin-b${i})`]);

/** Stickers slapped on the page, in turn. */
export const STICKERS: StickerKind[] = [
  { text: "", shape: "circle", bg: "var(--c-gold)", fg: "var(--c-blue)", icon: "fleur" },
  { text: "314", shape: "pill", bg: "#fff", fg: "var(--c-red)" },
  { text: "STL", shape: "circle", bg: "var(--c-red)", fg: "#fff" },
  { text: "meet me in St. Louis", shape: "tape", bg: "var(--c-paper)", fg: "var(--c-blue)" },
  { text: "GATEWAY TO BRISKET", shape: "burst", bg: "var(--c-gold)", fg: "var(--c-red)" },
  { text: "3 AM CLUB", shape: "pill", bg: "var(--c-pink)", fg: "var(--c-nite)" },
  { text: "", shape: "circle", bg: "#fff", fg: "var(--c-ink)", icon: "arch" },
  { text: "BARK", shape: "square", bg: "var(--c-blue)", fg: "var(--c-gold)" },
  { text: "☾", shape: "circle", bg: "var(--c-yellow)", fg: "var(--c-nite)" },
  { text: "LOW & SLOW", shape: "burst", bg: "#fff", fg: "var(--c-blue)" },
];

export const TAPES = {
  hero: "BRISKET ✦ BARK ✦ SMOKE RING ✦ POST OAK ✦ SALT & PEPPER ✦ HALF-POUND AT A TIME ✦",
  order: "HOUSTON'S SMOKED MEATS ✦ ST. LOUIS ✦ PRE-ORDER ✦ PICKUP ONLY ✦ 314 ✦",
  finePrint: "MEET ME IN ST. LOUIS ✦ LOW & SLOW ✦ 14 HOURS ✦ ONE SMOKE AT A TIME ✦ POST OAK ✦",
  footer: "THANKS FOR READING ✦ SEE YOU AT PICKUP ✦ COME HUNGRY ✦ BRING A COOLER ✦",
};

export const ROUTE = {
  title: "THE RIVER ROUTE",
  kicker: "three stops from the pit to your plate — tap a stop to flip it",
  tipLabel: "Captain Houston's tip",
  steps: [
    {
      n: "01",
      title: "Firebox Landing",
      body: "Houston fires up a Smoke. Each one has a Ready Time and a set number of pounds.",
      tip: "Hungry today? The Smoke that's already done is ready now — no waiting.",
      art: <Smoker />,
      paper: "#fff4cf",
      tilt: -1.5,
    },
    {
      n: "02",
      title: "Claim Junction",
      body: "You claim your pounds — half a pound at a time, up to 5 lb per item — and pay up front.",
      tip: "½ lb per grown-up. 1 lb if they swear they're “just having a little.”",
      art: <BrisketSlice />,
      paper: "#ffffff",
      tilt: 1.5,
    },
    {
      n: "03",
      title: "Pickup Point, STL",
      body: "Choose a pickup time. The exact address lands in your inbox the second you pay.",
      tip: "Driving from across the river? Bring a cooler. Brisket travels fine.",
      art: <Arch />,
      paper: "#e3e9ff",
      tilt: -1,
    },
  ] satisfies Step[],
};

export const ORDER: OrderCopy = {
  title: "THIS WEEK'S SMOKE",
  kicker: "one Smoke per order — pick your riverboat, claim your pounds",
  stub: "RIVERBOAT PASS",
};

export const FINE_PRINT = {
  title: "THE FINE PRINT",
  kicker: "(pinned with fleurs — tap one to read it up close)",
  notes: [
    {
      title: "CANCELLING",
      text: "Cancel within 1 hour of ordering → full refund. After that, the pounds are yours.",
      more: "You get a one-hour Cancellation Window from the moment you pay — the link is in your order email. After that, your pounds are already spoken for on the pit.",
      color: "var(--note-1)",
      tilt: -3,
    },
    {
      title: "RESCHEDULING",
      text: "Can't make your pickup time? Move it from your order email before it starts.",
      more: "Your order email has a private link. Pick any open time after the Smoke's Ready Time, as long as your current one hasn't started yet.",
      color: "var(--note-2)",
      tilt: 2.5,
    },
    {
      title: "DELAYS",
      text: "River rising? (Smoke running late.) You'll get an email to pick a new time — or a full refund.",
      more: "Brisket stalls. When it does, Houston moves the Ready Time and emails everyone affected. New time or full refund — your call.",
      color: "var(--note-3)",
      tilt: -1.5,
    },
    {
      title: "BIG ORDERS",
      text: "Need more than 5 lb? Email Houston. Feeding the whole block is the dream.",
      more: "Orders max out at 5 lb per item so everyone gets a shot. Throwing a party? Reply to any SMEATS email.",
      color: "var(--note-4)",
      tilt: 3,
    },
    {
      title: "NO-SHOWS",
      text: "Didn't make it? We hold your order till the end of that day's pickup hours.",
      more: "After that it's marked a no-show and isn't refunded automatically — but email Houston and you'll figure something out.",
      color: "var(--note-5)",
      tilt: -2,
    },
  ] satisfies Note[],
};
