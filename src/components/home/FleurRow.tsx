import { Fleur } from "@/components/illustrations";
import s from "./FleurRow.module.css";

/** A row of fleurs in alternating inks, for under the footer wordmark. */
export function FleurRow() {
  return (
    <div className={s.row} aria-hidden>
      {Array.from({ length: 11 }, (_, i) => (
        <Fleur key={i} />
      ))}
    </div>
  );
}
