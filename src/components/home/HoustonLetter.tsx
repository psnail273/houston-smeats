import { Arch, Fleur, Smoker } from "@/components/illustrations";
import { Polaroid } from "@/components/zine/Polaroid";
import { cx } from "@/lib/cx";
import s from "./HoustonLetter.module.css";

/** A polaroid of the pit and a note from Houston on ruled paper. */
export function HoustonLetter() {
  return (
    <section className={s.section}>
      <Polaroid caption="Houston's pit · under the Arch" className={s.polaroid}>
        <Arch className={s.arch} />
        <Smoker />
      </Polaroid>
      <div className={cx(s.letter, "z-script z-reveal")}>
        <Fleur className={s.fleur} />
        <p>Hey — I&apos;m Houston.</p>
        <p>
          I smoke brisket the slow way, right here in the 314: post oak, salt, pepper, and way too much patience. Most of it happens
          overnight — small batches I call Smokes — so every pound is spoken for before the sun comes up.
        </p>
        <p>Meet me in St. Louis. (At the pickup spot. I&apos;ll email you.)</p>
        <p className={s.sig}>— H.</p>
      </div>
    </section>
  );
}
