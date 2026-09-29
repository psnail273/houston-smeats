"use client";

// Taped index cards: a numbered step on the front, a tip on the back. Tap to flip.

import { useState } from "react";
import { cx } from "@/lib/cx";
import s from "./FlipCards.module.css";

export type Step = { n: string; title: string; body: string; tip: string; art: React.ReactNode; paper: string; tilt: number };

export function FlipCards({ steps, tipLabel, className }: { steps: Step[]; tipLabel: string; className?: string }) {
  const [flipped, setFlipped] = useState<boolean[]>(() => steps.map(() => false));
  const toggle = (i: number) => setFlipped((f) => f.map((v, j) => (j === i ? !v : v)));
  return (
    <ol className={cx(s.cards, className)}>
      {steps.map((step, i) => (
        <li key={step.n} className={cx(s.card, "z-reveal")} style={{ ["--r" as string]: step.tilt, ["--paper-color" as string]: step.paper }}>
          <button
            type="button"
            className={cx(s.flip, flipped[i] && s.flipped)}
            data-cursor="FLIP"
            aria-pressed={flipped[i]}
            aria-label={`${step.title} — flip for ${tipLabel}`}
            onClick={() => toggle(i)}
          >
            <span className={s.front}>
              <span className={cx(s.num, "z-display")}>{step.n}</span>
              <span className={s.art}>{step.art}</span>
              <span className={cx(s.title, "z-display")}>{step.title}</span>
              <span className={s.body}>{step.body}</span>
              <span className={cx(s.more, "z-hand")}>flip me ↻</span>
            </span>
            <span className={s.back}>
              <span className={cx(s.tipLabel, "z-hand")}>{tipLabel}</span>
              <span className={cx(s.tip, "z-script")}>{step.tip}</span>
              <span className={cx(s.more, "z-hand")}>↺ flip back</span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
