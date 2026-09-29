import { cx } from "@/lib/cx";
import { Riso } from "./text";
import s from "./Footer.module.css";

/** The giant riso wordmark and the small print. `extra` sits between them. */
export function ZineFooter({ extra }: { extra?: React.ReactNode }) {
  return (
    <footer className={s.footer}>
      <div className={cx(s.word, "z-display")}>
        <Riso text="SMEATS" />
      </div>
      {extra}
      <div className={s.row}>
        <span>© {new Date().getFullYear()} SMEATS</span>
        <span>Houston&apos;s Smoked Meats</span>
        <span>St. Louis, MO</span>
        <span>Pickup only</span>
      </div>
    </footer>
  );
}
