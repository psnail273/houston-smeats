"use client";

// A taped polaroid. Tap to shake it and watch the picture develop again.

import { useState } from "react";
import { cx } from "@/lib/cx";
import { useReducedMotion } from "@/lib/hooks";
import s from "./Polaroid.module.css";

export function Polaroid({ caption, className, children }: { caption: string; className?: string; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [shakes, setShakes] = useState(0);
  return (
    <button
      type="button"
      className={cx(s.polaroid, "z-reveal", className)}
      data-cursor="SHAKE IT"
      aria-label={`${caption} — shake the polaroid`}
      onClick={(e) => {
        setShakes((n) => n + 1);
        if (!reduced)
          e.currentTarget.animate({ rotate: ["-4deg", "5deg", "-9deg", "6deg", "-4deg"] }, { duration: 520, easing: "ease-in-out" });
      }}
    >
      <span key={shakes} className={cx(s.picture, shakes > 0 && s.developing)}>
        {children}
      </span>
      <span className={cx(s.caption, "z-hand")}>{caption}</span>
    </button>
  );
}
