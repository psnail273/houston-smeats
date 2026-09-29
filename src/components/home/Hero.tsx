"use client";

// The hero is the St. Louis flag: two rivers run in from the upper and lower
// left, meet under the gold coin (flip it for the other print) and flow out
// right. Hidden notes show under the pointer — on touch screens they drift in
// and out on their own. The first tape banner is the hero's bottom edge.

import { useRef } from "react";
import { Fleur, FleurPaths } from "@/components/illustrations";
import { Arrow } from "@/components/zine/Arrow";
import { KineticLine } from "@/components/zine/KineticLine";
import { Ransom } from "@/components/zine/Ransom";
import { Tape } from "@/components/zine/Tape";
import { DayNight } from "@/components/zine/text";
import { usePrint } from "@/components/zine/ZinePage";
import { cx } from "@/lib/cx";
import { useSpotlight } from "@/lib/hooks";
import { HEADLINE_INKS, RANSOM_CUTS, TAPES } from "./content";
import s from "./Hero.module.css";

// A wavy river centerline from the confluence (0,0) out along `deg`, in px.
// Quadratic half-waves; each `T` mirrors the previous control point, so it stays smooth.
const wavy = (deg: number, len = 3200, wave = 380, amp = 20) => {
  const a = (deg * Math.PI) / 180;
  const [ux, uy] = [Math.cos(a), Math.sin(a)];
  const at = (t: number, off = 0) => `${(ux * t - uy * off).toFixed(1)} ${(uy * t + ux * off).toFixed(1)}`;
  let d = `M0 0Q${at(wave / 4, amp * 2)} ${at(wave / 2)}`;
  for (let t = wave; t < len; t += wave / 2) d += `T${at(t)}`;
  return d;
};
// Arms in from the upper and lower left, the trunk out to the right.
const RIVERS = [212, 148, 0].map((deg) => wavy(deg)).join("");
const RIVER_LAYERS = [s.riverEdge, s.river, s.riverMis, s.riverGlow];

// Night stars and field fleurs, in a 1600×1000 box that covers the hero.
const STARS: [number, number, number][] = [
  [120, 60, 2.2], [300, 150, 1.5], [520, 70, 2.4], [880, 110, 1.6], [1040, 40, 2.2], [1250, 150, 1.4], [1510, 60, 2.6],
  [1560, 300, 1.6], [60, 420, 1.8], [980, 520, 1.3], [1380, 470, 2.1], [220, 890, 1.6], [760, 960, 2.2], [1120, 910, 1.4],
  [420, 330, 1.2], [1180, 300, 1.5],
];
const FLEURS: [number, number, number, number][] = [
  [230, 460, 0.8, 8],
  [640, 80, 0.55, 0],
  [1170, 150, 0.7, 12],
  [1470, 290, 0.5, -6],
  [1220, 810, 0.75, -8],
  [1470, 890, 0.5, 14],
];

export function Hero() {
  const hero = useRef<HTMLElement>(null);
  useSpotlight(hero);
  return (
    <>
      <section id="top" ref={hero} className={s.hero}>
        <svg className={s.deco} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {STARS.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} className={s.star} cx={x} cy={y} r={r} />
          ))}
          {FLEURS.map(([x, y, scale, r]) => (
            <FleurPaths key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${scale}) rotate(${r} 50 50)`} />
          ))}
        </svg>

        <div className={s.secrets} aria-hidden>
          <Secret className={cx(s.s1, "z-hand")} cycle={13} delay={-2}>
            psst — the bark is the best part
          </Secret>
          <Secret className={cx(s.s2, "z-script")} cycle={11} delay={-7}>
            314 represent ⚜
          </Secret>
          <Secret className={cx(s.s3, "z-script")} cycle={16} delay={-11}>
            this way to the brisket <Arrow />
          </Secret>
          <Secret className={cx(s.s4, "z-hand")} cycle={12} delay={-4}>
            ★ Houston was here ★
          </Secret>
          <Secret className={cx(s.s5, "z-hand")} cycle={17} delay={-9}>
            meet me in St. Louis
          </Secret>
          <Secret className={cx(s.s6, "z-hand")} cycle={14} delay={-12}>
            the Arch: 630 ft · the stall: 4 hrs
          </Secret>
          <Secret className={cx(s.s7, "z-script")} cycle={10} delay={-5}>
            <DayNight day="good morning, St. Louis ☀" night="still awake? same. ☾" />
          </Secret>
          <Secret className={cx(s.s8, "z-hand")} cycle={15} delay={-1}>
            <DayNight day="psst: the coin has a night side" night="psst: flip it back for daylight" />
          </Secret>
          <Secret className={s.s9} cycle={12} delay={-8}>
            <Fleur />
          </Secret>
        </div>

        <h1 className="z-sr">SMEATS — Houston&apos;s Smoked Meats, St. Louis</h1>
        <Ransom word="SMEATS" cuts={RANSOM_CUTS} className={s.ransom} />
        <p className={cx(s.sub, "z-hand")}>
          Houston&apos;s Smoked Meats <Fleur className={s.subFleur} /> St. Louis, MO
        </p>
        <div className={s.confluence}>
          <svg className={s.rivers} aria-hidden>
            {RIVER_LAYERS.map((layer) => (
              <path key={layer} className={layer} d={RIVERS} />
            ))}
          </svg>
          <Coin />
        </div>
        <div className={s.labelWrap}>
          <div className={s.label}>
            <KineticLine
              rows={["LOW & SLOW", "IN ST. LOUIS"]}
              inks={HEADLINE_INKS}
              label="Low and slow in St. Louis — click to reprint in new inks"
              className={s.kinetic}
            />
          </div>
        </div>
        <div className={s.cta}>
          <a href="#order" className={cx("z-btn z-display", s.btn)}>
            Pre-order brisket ↓
          </a>
          <p className={cx(s.note, "z-script")}>
            <Arrow draw className={s.noteArrow} />
            <DayNight day="claim your pounds before the Smoke's all spoken for" night="while you sleep, it smokes — 14 hours, all night long" />
          </p>
        </div>
        <p className={cx(s.hint, "z-hand")}>
          <Fleur className={s.hintFleur} />
          <span>
            <span className="z-hover-only">hover to find hidden notes</span>
            <span className="z-touch-only">hidden notes come and go</span> · flip the coin for <DayNight day="night" night="day" /> · tap
            anywhere for stickers
          </span>
          <Fleur className={s.hintFleur} />
        </p>
      </section>
      <Tape text={TAPES.hero} seconds={70} className={s.edge} />
    </>
  );
}

/** A hidden note. On touch screens it surfaces every `cycle` seconds, offset by `delay`. */
function Secret({ className, cycle, delay, children }: { className: string; cycle: number; delay: number; children: React.ReactNode }) {
  return (
    <span className={cx(s.secret, className)} style={{ ["--cycle" as string]: `${cycle}s`, ["--delay" as string]: `${delay}s` }}>
      {children}
    </span>
  );
}

/** The flag's gold coin: a gold fleur by day, a dark fleur by night. Flipping it floods the other print in. */
function Coin() {
  const { night, flip } = usePrint();
  return (
    <button
      type="button"
      className={s.coin}
      data-cursor={night ? "SUNRISE" : "NIGHTFALL"}
      aria-pressed={night}
      aria-label="Night print"
      onClick={(e) => flip(e.currentTarget)}
    >
      <span className={s.coinTurn}>
        <span className={cx(s.face, s.dayFace)}>
          <Fleur />
        </span>
        <span className={cx(s.face, s.nightFace)}>
          <Fleur />
        </span>
      </span>
    </button>
  );
}
