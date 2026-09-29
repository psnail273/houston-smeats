"use client";

// Headline type that bulges (width + weight) around the pointer; touch screens
// get a slow wave instead. Letter centers are measured once at rest (no layout
// feedback loop), easing runs in JS (no CSS transitions to lag), and the loop
// sleeps when nothing moves. Click to reprint it in the next ink pair.

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { useReducedMotion } from "@/lib/hooks";
import s from "./KineticLine.module.css";

export function KineticLine({
  rows,
  inks,
  label,
  className,
}: {
  rows: string[];
  inks: [string, string][];
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const [ink, setInk] = useState(0);
  const key = rows.join("|");

  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = matchMedia("(pointer: fine)").matches;
    const chars = Array.from(root.querySelectorAll<HTMLElement>(`.${s.main} .${s.char}`));
    const n = chars.length;
    const cur = new Float32Array(n);
    const centerX = new Float32Array(n);
    const centerY = new Float32Array(n);
    let raf = 0;
    let px = -1e5;
    let py = -1e5;
    let touching = false;
    let visible = false;
    let last = 0;
    let alive = true;
    const t0 = performance.now();

    const measure = () => {
      for (let i = 0; i < n; i++) root.style.setProperty(`--p${i}`, "0");
      cur.fill(0);
      const box = root.getBoundingClientRect();
      chars.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        centerX[i] = r.left + r.width / 2 - box.left;
        centerY[i] = r.top + r.height / 2 - box.top;
      });
    };
    const frame = (now: number) => {
      raf = 0;
      const wave = !fine && !touching;
      if (wave && now - last < 33) {
        if (visible) raf = requestAnimationFrame(frame);
        return;
      }
      last = now;
      const box = root.getBoundingClientRect();
      let busy = false;
      for (let i = 0; i < n; i++) {
        let target = 0;
        if (wave) {
          const w = 0.5 + 0.5 * Math.sin(((now - t0) / 1000) * 2.2 - i * 0.5);
          target = visible ? w * w * 0.8 : 0;
        } else {
          const q = Math.max(0, 1 - Math.hypot(px - (box.left + centerX[i]), (py - (box.top + centerY[i])) * 1.25) / 300);
          target = q * q * (3 - 2 * q);
        }
        const next = cur[i] + (target - cur[i]) * (wave ? 0.3 : 0.24);
        if (Math.abs(next - cur[i]) > 0.0015) {
          cur[i] = next;
          root.style.setProperty(`--p${i}`, next.toFixed(3));
          busy = true;
        }
      }
      if (busy || (wave && visible)) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      raf ||= requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      [px, py] = [e.clientX, e.clientY];
      kick();
    };
    const onTouch = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      touching = true;
      onMove(e);
    };
    const offTouch = () => {
      touching = false;
      px = py = -1e5;
      kick();
    };
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measure();
        kick();
      }, 150);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });

    measure();
    document.fonts?.ready.then(() => {
      if (!alive) return;
      measure();
      kick();
    });
    io.observe(root);
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointermove", onTouch);
    root.addEventListener("pointerup", offTouch);
    root.addEventListener("pointercancel", offTouch);
    root.addEventListener("pointerleave", offTouch);
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointermove", onTouch);
      root.removeEventListener("pointerup", offTouch);
      root.removeEventListener("pointercancel", offTouch);
      root.removeEventListener("pointerleave", offTouch);
      window.removeEventListener("resize", onResize);
    };
  }, [key]);

  const reprint = () => {
    setInk((k) => (k + 1) % inks.length);
    if (!reduced)
      ref.current?.animate(
        [
          { transform: "translate(6px,-12px) skewX(-6deg)", filter: "blur(2px)" },
          { transform: "translate(-3px,4px)", filter: "blur(0)" },
          { transform: "none", filter: "none" },
        ],
        { duration: 420, easing: "steps(6)" },
      );
  };

  let index = 0;
  const letters = rows.map((row) => [...row].map((c) => ({ c, i: index++ })));
  const layer = (cls: string) => (
    <span className={cls} aria-hidden>
      {letters.map((row, r) => (
        <span key={r} className={s.row}>
          {row.map(({ c, i }) => (
            <span key={i} className={cx(s.char, c === " " && s.space)} style={{ ["--p" as string]: `var(--p${i}, 0)` }}>
              {c === " " ? " " : c}
            </span>
          ))}
        </span>
      ))}
    </span>
  );

  return (
    <button
      ref={ref}
      type="button"
      className={cx(s.line, className)}
      data-cursor="REPRINT"
      aria-label={label}
      onClick={reprint}
      style={{ ["--ink-a" as string]: inks[ink][0], ["--ink-b" as string]: inks[ink][1] }}
    >
      {layer(s.main)}
      {layer(s.echo)}
    </button>
  );
}
