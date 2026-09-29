// Hand-built SVG illustrations standing in for photography. Decorative only.

const PEPPER: [number, number, number][] = [
  [14, 30, 2.2], [22, 20, 1.6], [34, 15, 2.4], [50, 13, 1.8], [66, 14, 2.2], [84, 15, 1.5], [100, 17, 2.4],
  [116, 16, 1.7], [132, 16, 2.2], [148, 15, 1.5], [164, 16, 2.3], [180, 18, 1.7], [196, 20, 2.2], [210, 23, 1.6],
  [224, 28, 2.2], [232, 38, 1.8], [234, 50, 2.3], [229, 62, 1.6], [216, 70, 2.2], [198, 73, 1.5], [180, 75, 2.3],
  [160, 77, 1.7], [140, 80, 2.2], [120, 84, 1.5], [100, 86, 2.3], [80, 88, 1.7], [60, 90, 2.2], [40, 90, 1.6],
  [24, 85, 2.3], [12, 76, 1.7], [8, 62, 2.2], [7, 48, 1.6], [58, 10, 1.3], [140, 12, 1.3], [206, 76, 1.3],
];
const CRUST: [number, number, number][] = [
  [40, 12, 3.2], [120, 15, 2.6], [190, 18, 3], [231, 44, 2.6], [150, 78, 3], [70, 90, 2.8], [8, 56, 2.6], [96, 16, 2.2],
];
const SLAB =
  "M6 40C6 22 22 12 46 12C76 12 96 18 128 16C160 14 196 20 222 26C234 30 238 42 234 54C230 66 218 72 196 74C164 76 136 82 104 86C72 90 36 92 18 82C6 74 6 56 6 40Z";

type Props = { className?: string };

export function BrisketSlice({ className }: Props) {
  return (
    <svg viewBox="0 0 240 100" className={className} aria-hidden>
      <path d={SLAB} fill="#22110a" />
      <path d={SLAB} fill="#cf4a3a" transform="translate(121 51) scale(.945 .86) translate(-121 -51)" />
      <path d={SLAB} fill="#a4553a" transform="translate(121 52) scale(.895 .74) translate(-121 -52)" />
      <path d={SLAB} fill="#8d4630" opacity=".55" transform="translate(121 60) scale(.8 .4) translate(-121 -60)" />
      <path d="M18 36C40 24 82 26 128 24C164 22 198 28 224 36L222 43C198 37 164 33 128 34C84 35 46 35 20 45Z" fill="#f4dcb0" />
      <path d="M40 30C80 26 120 28 150 26" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".45" fill="none" />
      <path d="M10 36C14 20 30 14 46 14C76 14 96 20 128 18C160 16 196 22 222 28" stroke="#22110a" strokeWidth="7" strokeLinecap="round" fill="none" />
      <g stroke="#5e2a18" strokeWidth="1.8" fill="none" opacity=".4" strokeLinecap="round">
        <path d="M30 52C70 48 110 56 150 52C180 49 200 52 214 51" />
        <path d="M26 61C66 57 110 65 150 61C178 58 198 61 212 61" />
        <path d="M32 70C70 68 110 74 150 70C170 68 186 69 202 68" />
        <path d="M44 79C80 78 110 82 146 79" />
      </g>
      <ellipse cx="152" cy="56" rx="18" ry="2.4" fill="#fff" opacity=".24" />
      <ellipse cx="82" cy="66" rx="12" ry="2" fill="#fff" opacity=".18" />
      {CRUST.map(([x, y, r]) => (
        <circle key={`c${x}-${y}`} cx={x} cy={y} r={r} fill="#22110a" />
      ))}
      {PEPPER.map(([x, y, r], i) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={i % 3 === 0 ? "#6b4a35" : "#080302"} />
      ))}
    </svg>
  );
}

export function Smoker({ className }: Props) {
  return (
    <svg viewBox="0 0 300 230" className={className} aria-hidden>
      <g fill="#efe7da" stroke="#140c0a" strokeWidth="3">
        <circle cx="62" cy="22" r="11" />
        <circle cx="62" cy="22" r="15" />
        <circle cx="62" cy="22" r="19" />
      </g>
      <ellipse cx="150" cy="214" rx="124" ry="9" fill="#140c0a" opacity=".16" />
      <rect x="52" y="34" width="20" height="58" fill="#140c0a" />
      <rect x="45" y="28" width="34" height="9" rx="2" fill="#140c0a" />
      <path d="M72 162 60 206M184 162 196 206M64 190H192" stroke="#140c0a" strokeWidth="6" strokeLinecap="round" />
      <circle cx="196" cy="204" r="11" fill="#fff3dc" stroke="#140c0a" strokeWidth="4" />
      <rect x="206" y="104" width="62" height="58" rx="8" fill="#140c0a" />
      <rect x="219" y="142" width="36" height="9" rx="3" fill="#ff5a1f" />
      <rect x="40" y="84" width="172" height="82" rx="41" fill="#e0115f" stroke="#140c0a" strokeWidth="5" />
      <path d="M44 124H208" stroke="#140c0a" strokeWidth="4" />
      <path d="M62 100C92 92 150 92 190 100" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".5" fill="none" />
      <rect x="104" y="104" width="44" height="9" rx="4.5" fill="#fff3dc" stroke="#140c0a" strokeWidth="3" />
      <circle cx="176" cy="106" r="10" fill="#fff3dc" stroke="#140c0a" strokeWidth="3" />
      <path d="M176 106 181 100" stroke="#e0115f" strokeWidth="2.5" strokeLinecap="round" />
      <text x="126" y="152" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffe600" letterSpacing="2">
        SMEATS
      </text>
    </svg>
  );
}

export function Arch({ className }: Props) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden fill="none" stroke="#140c0a" strokeLinecap="round">
      <path d="M22 188C40 64 90 14 120 14C150 14 200 64 218 188" strokeWidth="7" />
      <path d="M44 188C60 82 100 36 120 36C140 36 180 82 196 188" strokeWidth="4" />
      <path d="M4 190H236" strokeWidth="4" />
      <path d="M70 196l6-8M150 197l5-8M190 196l7-9M30 197l4-7" strokeWidth="3" />
    </svg>
  );
}

/** A sternwheeler; the art faces left (paddle wheel at the stern). */
export function Steamboat({ className }: Props) {
  return (
    <svg viewBox="0 0 170 110" className={className} aria-hidden>
      <g fill="#efe7da" stroke="#140c0a" strokeWidth="2.5">
        <circle cx="66" cy="10" r="7" />
        <circle cx="88" cy="10" r="9" />
        <circle cx="77" cy="6" r="11" />
      </g>
      <rect x="62" y="12" width="9" height="30" fill="#140c0a" />
      <rect x="84" y="12" width="9" height="30" fill="#140c0a" />
      <path d="M58 12h17M80 12h17" stroke="#140c0a" strokeWidth="5" strokeLinecap="round" />
      <circle cx="140" cy="70" r="20" fill="#e23b3b" stroke="#140c0a" strokeWidth="4" />
      <path d="M140 50v40M120 70h40M126 56l28 28M154 56l-28 28" stroke="#140c0a" strokeWidth="2.5" />
      <rect x="44" y="40" width="64" height="14" fill="#fff" stroke="#140c0a" strokeWidth="3" />
      <rect x="28" y="54" width="100" height="16" fill="#fff" stroke="#140c0a" strokeWidth="3" />
      <path d="M36 62h6M50 62h6M64 62h6M78 62h6M92 62h6M106 62h6" stroke="#1f3fbf" strokeWidth="5" />
      <path d="M8 70H150L138 90H22Z" fill="#e23b3b" stroke="#140c0a" strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 80H142" stroke="#ffc629" strokeWidth="4" />
      <path d="M108 40V26l14 5-14 5" fill="#ffc629" stroke="#140c0a" strokeWidth="2" />
    </svg>
  );
}

// Fleur-de-lis in a 100×100 box, drawn in currentColor.
const FLEUR = [
  "M50 3C58 14 64 26 62 40C61 48 56 56 50 62C44 56 39 48 38 40C36 26 42 14 50 3Z",
  "M56 58C60 46 70 36 82 34C94 32 100 42 96 52C93 60 84 62 80 56C86 56 90 50 87 45C84 40 76 42 70 48C64 54 60 60 58 64Z",
  "M44 58C40 46 30 36 18 34C6 32 0 42 4 52C7 60 16 62 20 56C14 56 10 50 13 45C16 40 24 42 30 48C36 54 40 60 42 64Z",
  "M30 60H70A3 3 0 0 1 73 63V66A3 3 0 0 1 70 69H30A3 3 0 0 1 27 66V63A3 3 0 0 1 30 60Z",
  "M45 69H55C55 78 58 86 62 93C56 93 52 89 50 85C48 89 44 93 38 93C42 86 45 78 45 69Z",
  "M40 69C36 74 30 77 23 77C27 81 34 81 40 75Z",
  "M60 69C64 74 70 77 77 77C73 81 66 81 60 75Z",
];

/** The fleur's paths, for placing inside another SVG. */
export function FleurPaths({ transform }: { transform?: string }) {
  return (
    <g transform={transform} fill="currentColor">
      {FLEUR.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

export function Fleur({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <FleurPaths />
    </svg>
  );
}
