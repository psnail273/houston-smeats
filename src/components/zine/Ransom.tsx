"use client";

// A word cut out of mismatched paper, one letter per scrap. Click a letter to
// re-cut it from the next paper in `cuts` (with a burst of confetti scraps).

import { useState } from "react";
import { cx } from "@/lib/cx";
import s from "./Ransom.module.css";

/** One paper: font, colors, torn outline (clip-path) and size relative to the word. */
export type Cut = { font: string; bg: string; fg: string; clip: string; scale: number; newsprint?: boolean };

const TILT = [-7, 4, -3, 7, -6, 5, -4, 6];
const DROP = [8, -12, 14, -6, 10, -4, 6, -8];
const SCRAPS = [0, 1, 2, 3, 4, 5, 6, 7];

export function Ransom({ word, cuts, className }: { word: string; cuts: Cut[]; className?: string }) {
  const letters = [...word];
  const [paper, setPaper] = useState(() => letters.map((_, i) => i % cuts.length));
  const [recuts, setRecuts] = useState(() => letters.map(() => 0));
  const recut = (i: number) => {
    setPaper((p) => p.map((v, j) => (j === i ? (v + 1) % cuts.length : v)));
    setRecuts((r) => r.map((v, j) => (j === i ? v + 1 : v)));
  };

  return (
    <div className={cx(s.ransom, className)}>
      {letters.map((letter, i) => {
        const cut = cuts[paper[i]];
        return (
          <button
            key={i}
            type="button"
            className={cx(s.letter, "z-pop")}
            data-cursor="RE-CUT"
            aria-label={`Re-cut the letter ${letter}`}
            onClick={() => recut(i)}
            style={{ ["--tilt" as string]: TILT[i % 8], ["--drop" as string]: DROP[i % 8], ["--pop-delay" as string]: `${i * 95 + 120}ms` }}
          >
            <span
              key={recuts[i]}
              className={cx(s.paper, recuts[i] > 0 && s.recut, cut.newsprint && s.newsprint)}
              style={{ ["--bg" as string]: cut.bg, ["--fg" as string]: cut.fg, ["--clip" as string]: cut.clip, ["--scale" as string]: cut.scale, fontFamily: cut.font }}
            >
              {letter}
            </span>
            {recuts[i] > 0 && (
              <span key={`scraps${recuts[i]}`} className={s.scraps} aria-hidden>
                {SCRAPS.map((k) => (
                  <i key={k} style={{ ["--k" as string]: k }} />
                ))}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
