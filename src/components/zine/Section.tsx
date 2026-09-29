import { cx } from "@/lib/cx";
import { Riso } from "./text";
import s from "./Section.module.css";

/** A page section with a riso heading and a handwritten kicker. */
export function Section({
  id,
  title,
  kicker,
  width = 1200,
  className,
  children,
}: {
  id?: string;
  title: string;
  kicker?: string;
  width?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cx(s.section, className)} style={{ maxWidth: width }}>
      <h2 className={cx(s.title, "z-display")}>
        <Riso text={title} />
      </h2>
      {kicker && <p className={cx(s.kicker, "z-script")}>{kicker}</p>}
      {children}
    </section>
  );
}
