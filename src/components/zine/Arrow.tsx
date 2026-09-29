import { cx } from "@/lib/cx";
import s from "./Arrow.module.css";

/** A hand-drawn arrow pointing right. `draw` inks it in on load. */
export function Arrow({ className, draw }: { className?: string; draw?: boolean }) {
  return (
    <svg viewBox="0 0 64 32" className={cx(s.arrow, draw && s.draw, className)} aria-hidden fill="none">
      <path pathLength={1} d="M2 18C20 6 40 28 58 14" />
      <path pathLength={1} d="M58 14 47 8M58 14 50 24" />
    </svg>
  );
}
