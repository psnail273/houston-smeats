import { Fleur } from "@/components/illustrations";
import { DayNight } from "@/components/zine/text";
import { cx } from "@/lib/cx";
import s from "./Masthead.module.css";

export function Masthead() {
  return (
    <header className={s.mast}>
      <a className={cx(s.logo, "z-display")} href="#top">
        <Fleur className={s.logoFleur} />
        SMEATS
      </a>
      <p className={s.line}>
        The Confluence Edition · <DayNight day="broad daylight" night="after dark" /> · St. Louis, MO · 314
      </p>
      <a className="z-btn z-btn-sm z-display" href="#order">
        Pre-order ↓
      </a>
    </header>
  );
}
