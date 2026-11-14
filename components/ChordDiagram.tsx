import { shapes } from "@/lib/song";

export type Instrument = "guitar" | "piano" | "ukulele" | "words";

const UKE: Record<string, number[]> = {
  C: [0, 0, 0, 3], Cm: [0, 3, 3, 3], D: [2, 2, 2, 0], Dm: [2, 2, 1, 0], E: [4, 4, 4, 2], Em: [0, 4, 3, 2],
  F: [2, 0, 1, 0], Fm: [1, 0, 1, 3], G: [0, 2, 3, 2], Gm: [0, 2, 3, 1], A: [2, 1, 0, 0], Am: [2, 0, 0, 0],
  Bb: [3, 2, 1, 1], Eb: [0, 3, 3, 1], Ab: [5, 3, 4, 3], B: [4, 3, 2, 2],
};
const NOTES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const SHARPS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function parseGuitar(code: string) {
  const m = new Map<number, { f: number; e: string }>();
  code.split("`").forEach((p) => {
    const r = p.match(/S(\d)F(\d+)E(\w)/);
    if (r) m.set(+r[1], { f: +r[2], e: r[3] });
  });
  return m;
}

function Grid({ strings, frets, dots, base, muted }: { strings: number; frets: number; dots: { s: number; f: number; e?: string }[]; base: number; muted: number[] }) {
  const w = 14 * (strings - 1);
  return (
    <svg viewBox={`0 0 ${w + 36} 84`} className="h-24 w-auto" aria-hidden>
      <g transform="translate(18 20)">
        {Array.from({ length: strings }, (_, i) => <line key={i} x1={i * 14} x2={i * 14} y1="0" y2={frets * 11} stroke="#9aa3b5" strokeWidth="1" />)}
        {Array.from({ length: frets + 1 }, (_, i) => <line key={i} x1="0" x2={w} y1={i * 11} y2={i * 11} stroke={i === 0 && base === 1 ? "#0b0b0f" : "#9aa3b5"} strokeWidth={i === 0 && base === 1 ? 2.5 : 1} />)}
        {muted.map((s) => <text key={s} x={s * 14} y="-5" fontSize="8" textAnchor="middle" fill="#6b6b76">×</text>)}
        {dots.map((d, i) => (
          <g key={i}>
            <circle cx={d.s * 14} cy={(d.f - 0.5) * 11} r="4.6" fill="#2e7cf6" />
            {d.e && d.e !== "0" && d.e !== "u" && <text x={d.s * 14} y={(d.f - 0.5) * 11 + 2.6} fontSize="6.5" textAnchor="middle" fill="#fff">{d.e}</text>}
          </g>
        ))}
        {base > 1 && <text x={w + 5} y="9" fontSize="7" fill="#6b6b76">{base}</text>}
      </g>
    </svg>
  );
}

function Guitar({ code }: { code: string }) {
  const m = parseGuitar(code);
  const frets = [...m.values()].map((v) => v.f).filter((f) => f > 0);
  const base = frets.length && Math.max(...frets) > 4 ? Math.min(...frets) : 1;
  const dots = [...m.entries()].filter(([, v]) => v.f > 0).map(([s, v]) => ({ s: 6 - s, f: v.f - base + 1, e: v.e }));
  const muted = [1, 2, 3, 4, 5, 6].filter((s) => !m.has(s)).map((s) => 6 - s);
  return <Grid strings={6} frets={4} dots={dots} base={base} muted={muted} />;
}

function Ukulele({ f }: { f: number[] }) {
  const pos = f.filter((x) => x > 0);
  const base = pos.length && Math.max(...pos) > 4 ? Math.min(...pos) : 1;
  const dots = f.map((x, i) => ({ s: i, f: x - base + 1, x })).filter((d) => d.x > 0);
  return <Grid strings={4} frets={4} dots={dots} base={base} muted={[]} />;
}

function Piano({ chord }: { chord: string }) {
  const m = chord.split("/")[0].match(/^([A-G][#b]?)(m(?!aj))?/);
  if (!m) return null;
  const root = Math.max(NOTES.indexOf(m[1]), SHARPS.indexOf(m[1]));
  if (root < 0) return null;
  const iv = m[2] ? [0, 3, 7] : [0, 4, 7];
  const on = new Set(iv.map((i) => root + i));
  const white = [0, 2, 4, 5, 7, 9, 11];
  const keys: number[] = [];
  for (let o = 0; o < 2; o++) white.forEach((w) => keys.push(o * 12 + w));
  const blacks: [number, number][] = [];
  for (let o = 0; o < 2; o++) [[1, 0], [3, 1], [6, 3], [8, 4], [10, 5]].forEach(([n, wi]) => blacks.push([o * 12 + n, o * 7 + wi]));
  return (
    <svg viewBox="0 0 112 56" className="h-16 w-auto" aria-hidden>
      {keys.map((k, i) => <rect key={k} x={i * 8} y="4" width="8" height="48" rx="1.5" fill={on.has(k) ? "#2e7cf6" : "#fff"} stroke="#9aa3b5" strokeWidth=".8" />)}
      {blacks.map(([k, wi]) => <rect key={k} x={wi * 8 + 5.4} y="4" width="5.2" height="29" rx="1" fill={on.has(k) ? "#1d5fd1" : "#16161c"} />)}
    </svg>
  );
}

/** דיאגרמת אקורד לפי הכלי. מחזיר null כשאין נתונים לאקורד */
export function hasDiagram(chord: string, inst: Instrument) {
  if (inst === "guitar") return !!shapes[chord];
  if (inst === "ukulele") return !!UKE[chord];
  if (inst === "piano") return /^[A-G]/.test(chord);
  return false;
}

export default function ChordDiagram({ chord, inst }: { chord: string; inst: Instrument }) {
  if (!hasDiagram(chord, inst)) return null;
  return (
    <span dir="ltr" className="flex flex-col items-center gap-0.5">
      <span className="font-mono text-xs text-ink">{chord}</span>
      {inst === "guitar" && <Guitar code={shapes[chord]} />}
      {inst === "ukulele" && <Ukulele f={UKE[chord]} />}
      {inst === "piano" && <Piano chord={chord} />}
    </span>
  );
}
