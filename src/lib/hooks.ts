import { useCallback, useEffect, useSyncExternalStore, type RefObject } from "react";

/** Live `matchMedia` result. `false` during server render and hydration. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false);
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

/** Mirrors the pointer into `--mx`/`--my` on `ref` (px in its box; parked off-box when the pointer is elsewhere).
 *  Listens on window, so stickers or other layers on top never interrupt it. No-op on touch screens. */
export function useSpotlight(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(hover: none)").matches) return;
    let x = -1e4;
    let y = -1e4;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      const inside = x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
      el.style.setProperty("--mx", inside ? `${x - b.left}px` : "-999px");
      el.style.setProperty("--my", inside ? `${y - b.top}px` : "-999px");
    };
    const queue = () => {
      raf ||= requestAnimationFrame(paint);
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      queue();
    };
    const away = () => {
      x = y = -1e4;
      queue();
    };
    const root = document.documentElement;
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", queue, { passive: true });
    root.addEventListener("pointerleave", away);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", queue);
      root.removeEventListener("pointerleave", away);
    };
  }, [ref]);
}
