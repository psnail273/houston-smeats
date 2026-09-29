"use client";

// Sticky notes pinned with fleurs. Tap one to zoom it up close for the full
// story: the big note flies out of the small one's spot (a FLIP transform
// animation, no view-transition snapshots) and flies back when closed.

import { useLayoutEffect, useRef, useState } from "react";
import { Fleur } from "@/components/illustrations";
import { cx } from "@/lib/cx";
import { useReducedMotion } from "@/lib/hooks";
import s from "./NoteBoard.module.css";

export type Note = { title: string; text: string; more: string; color: string; tilt: number };

/** The transform that makes `to` sit exactly over `from` (with transform-origin 0 0). */
const overlay = (from?: Element | null, to?: Element | null) => {
  const a = from?.getBoundingClientRect();
  const b = to?.getBoundingClientRect();
  return a && b ? `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})` : "none";
};

export function NoteBoard({ notes }: { notes: Note[] }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const small = useRef<(HTMLButtonElement | null)[]>([]);
  const modal = useRef<HTMLDivElement>(null);
  const big = useRef<HTMLDivElement>(null);
  const closer = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (open === null) return;
    closer.current?.focus();
    if (!reduced) big.current?.animate({ transform: [overlay(small.current[open], big.current), "none"] }, { duration: 420, easing: "cubic-bezier(.3,1.2,.4,1)" });
  }, [open, reduced]);

  const close = () => {
    if (open === null) return;
    if (reduced || !big.current) return setOpen(null);
    const timing = { duration: 280, easing: "ease-in", fill: "forwards" } as const;
    modal.current?.animate({ opacity: [1, 0] }, timing);
    big.current.animate({ transform: ["none", overlay(small.current[open], big.current)] }, timing).finished.then(() => setOpen(null));
  };

  const note = open === null ? null : notes[open];
  return (
    <>
      <div className={s.board}>
        {notes.map((n, i) => (
          <div key={n.title} className={cx(s.slot, "z-reveal")} style={{ ["--r" as string]: n.tilt }}>
            <button
              ref={(el) => {
                small.current[i] = el;
              }}
              type="button"
              className={cx(s.note, open === i && s.lifted)}
              data-cursor="ZOOM"
              style={{ ["--note" as string]: n.color }}
              onClick={() => setOpen(i)}
              aria-haspopup="dialog"
              aria-label={`${n.title}: ${n.text} — open`}
            >
              <span className={s.pin} aria-hidden>
                <Fleur />
              </span>
              <span className={cx(s.title, "z-hand")}>{n.title}</span>
              <span className={cx(s.text, "z-script")}>{n.text}</span>
            </button>
          </div>
        ))}
      </div>
      {note && (
        <div
          ref={modal}
          className={s.modal}
          role="dialog"
          aria-modal="true"
          aria-label={note.title}
          data-cursor="CLOSE"
          onClick={(e) => e.target === e.currentTarget && close()}
          onKeyDown={(e) => e.key === "Escape" && close()}
        >
          <div ref={big} className={cx(s.note, s.big)} style={{ ["--note" as string]: note.color }}>
            <span className={s.pin} aria-hidden>
              <Fleur />
            </span>
            <span className={cx(s.title, "z-hand")}>{note.title}</span>
            <span className={cx(s.text, "z-script")}>{note.text}</span>
            <span className={s.more}>{note.more}</span>
            <button ref={closer} type="button" className={cx(s.close, "z-hand")} onClick={close}>
              stick it back ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
