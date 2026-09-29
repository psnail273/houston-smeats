"use client";

// An ink dot that trails the mouse. It swells over interactive things and shows
// the nearest `data-cursor` label ("FLIP", "RE-CUT"…). Mouse only; off under reduced motion.

import { useEffect, useRef } from "react";
import s from "./InkCursor.module.css";

const INTERACTIVE = "button, a, [role=slider], [role=button]";

export function InkCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    const label = tag.current;
    if (!el || !label) return;
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let shown = false;
    let raf = 0;
    let scrollRaf = 0;
    const describe = (target: EventTarget | null) => {
      const t = target instanceof Element ? target : null;
      const labeled = t?.closest<HTMLElement>("[data-cursor]");
      const hot = t?.closest(INTERACTIVE);
      const text = labeled && (!hot || hot.contains(labeled)) ? (labeled.dataset.cursor ?? "") : "";
      if (label.textContent !== text) label.textContent = text;
      el.classList.toggle(s.labeled, text !== "");
      el.classList.toggle(s.hot, !!hot && text === "");
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        [x, y, shown] = [tx, ty, true];
        el.style.opacity = "1";
      }
      describe(e.target);
    };
    // Scrolling moves the page under a still pointer, so re-check what it's over.
    const scroll = () => {
      if (shown && !scrollRaf)
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0;
          describe(document.elementFromPoint(tx, ty));
        });
    };
    const leave = () => {
      el.style.opacity = "0";
      shown = false;
    };
    const loop = () => {
      x += (tx - x) * 0.28;
      y += (ty - y) * 0.28;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return (
    <div ref={dot} className={`${s.cursor} z-display`} aria-hidden>
      <span ref={tag} />
    </div>
  );
}
