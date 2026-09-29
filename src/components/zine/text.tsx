import { Fragment } from "react";

/** Two-ink riso type (styles: .z-riso in zine.css). Each word is its own block, so headings wrap. */
export function Riso({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="z-riso" data-text={word}>
        {word}
      </span>
    </Fragment>
  ));
}

/** Content that differs between the day and night prints. CSS picks the one to show, so first paint is right. */
export function DayNight({ day, night }: { day: React.ReactNode; night: React.ReactNode }) {
  return (
    <>
      <span className="z-day">{day}</span>
      <span className="z-night">{night}</span>
    </>
  );
}
