import { cx } from "@/lib/cx";
import s from "./Tape.module.css";

export type TapeTone = "gold" | "blue" | "red" | "ink";

/** A tilted tape banner with a seamless marquee: two identical halves, each wider than any screen. */
export function Tape({
  text,
  tone = "gold",
  reverse,
  seconds = 64,
  className,
}: {
  text: string;
  tone?: TapeTone;
  reverse?: boolean;
  seconds?: number;
  className?: string;
}) {
  const half = (
    <span className={s.half}>
      <span>{text}</span>
      <span>{text}</span>
      <span>{text}</span>
    </span>
  );
  return (
    <div className={cx(s.tape, s[tone], "z-display", className)} aria-hidden>
      <div className={cx(s.track, reverse && s.reverse)} style={{ animationDuration: `${seconds}s` }}>
        {half}
        {half}
      </div>
    </div>
  );
}
