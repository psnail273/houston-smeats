import { Arch, Fleur } from "@/components/illustrations";
import { cx } from "@/lib/cx";
import s from "./Sticker.module.css";

/** A kind of sticker the page can slap. Colors may be CSS colors or var(--token)s. */
export type StickerKind = {
  text: string;
  shape: "pill" | "circle" | "square" | "tape" | "burst";
  bg: string;
  fg: string;
  icon?: "fleur" | "arch";
};

const ICONS = { fleur: Fleur, arch: Arch };

export function Sticker({
  kind,
  style,
  peeling,
  onPeel,
  onPeeled,
}: {
  kind: StickerKind;
  style: React.CSSProperties;
  peeling?: boolean;
  onPeel: () => void;
  onPeeled: () => void;
}) {
  const Icon = kind.icon && ICONS[kind.icon];
  return (
    <button
      type="button"
      data-cursor="PEEL"
      className={cx(s.sticker, s[kind.shape], "z-pop", kind.shape === "tape" ? "z-hand" : "z-display", peeling && s.peeling)}
      style={{ ...style, ["--sticker-bg" as string]: kind.bg, ["--sticker-fg" as string]: kind.fg }}
      onClick={(e) => {
        e.stopPropagation();
        onPeel();
      }}
      onAnimationEnd={() => peeling && onPeeled()}
      aria-label={`Sticker “${kind.text || kind.icon}” — tap to peel it off`}
    >
      {Icon && <Icon className={s[`icon-${kind.icon}`]} />}
      {kind.text && <span>{kind.text}</span>}
    </button>
  );
}
