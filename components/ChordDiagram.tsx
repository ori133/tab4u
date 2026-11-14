import { shapes } from "@/lib/song";

export type Instrument = "guitar" | "piano" | "ukulele" | "words";

const NOTES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const SHARPS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

type Quality = "maj" | "min" | "7" | "m7" | "maj7";
function parse(chord: string): { root: number; q: Quality } | null {
  const m = chord.split("/")[0].match(/^([A-G][#b]?)(.*)$/);
  if (!m) return null;
  const root = NOTES.indexOf(m[1]) >= 0 ? NOTES.indexOf(m[1]) : SHARPS.indexOf(m[1]);
  if (root < 0) return null;
  const r = m[2];
  let q: Quality = "maj";
  if (/^maj7/.test(r)) q = "maj7";
  else if (/^m7/.test(r)) q = "m7";
  else if (/^m(?!aj)/.test(r) || /^dim/.test(r)) q = "min";
  else if (/^7/.test(r)) q = "7";
  return { root, q };
}

type Dot = { s: number; f: number; e?: string };
type Barre = { row: number; from: number; to: number };
type Shape = { dots: Dot[]; muted: number[]; strings: number; barre?: Barre; base: number };

/* ---------- גיטרה ---------- */
// צורות לפי מיתרים 6..1 (-1 = לא מנגנים), יחסית לסריג הבסיס
const E_FORM: Record<Quality, number[]> = { maj: [0, 2, 2, 1, 0, 0], min: [0, 2, 2, 0, 0, 0], "7": [0, 2, 0, 1, 0, 0], m7: [0, 2, 0, 0, 0, 0], maj7: [0, 2, 1, 1, 0, 0] };
const A_FORM: Record<Quality, number[]> = { maj: [-1, 0, 2, 2, 2, 0], min: [-1, 0, 2, 2, 1, 0], "7": [-1, 0, 2, 0, 2, 0], m7: [-1, 0, 2, 0, 1, 0], maj7: [-1, 0, 2, 1, 2, 0] };
const OPEN: Record<string, number[]> = {
  C: [-1, 3, 2, 0, 1, 0], D: [-1, -1, 0, 2, 3, 2], E: [0, 2, 2, 1, 0, 0], G: [3, 2, 0, 0, 0, 3], A: [-1, 0, 2, 2, 2, 0],
  Am: [-1, 0, 2, 2, 1, 0], Dm: [-1, -1, 0, 2, 3, 1], Em: [0, 2, 2, 0, 0, 0],
};


/** מציאת ברה ושיוך אצבעות: ברה = אצבע 1, השאר לפי סדר הסריגים */
function withFingers(dots: Dot[], strings: number, firstPlayed = 0): { dots: Dot[]; barre?: Barre } {
  if (!dots.length) return { dots };
  const low = Math.min(...dots.map((d) => d.f));
  const onLow = dots.filter((d) => d.f === low).sort((a, b) => a.s - b.s);
  // ברה: לפחות שלושה תווים באותו סריג, או שניים שפורשים מהמיתר הראשון שמנגנים ועד המיתר האחרון
  const spans = onLow[0].s === firstPlayed && onLow[onLow.length - 1].s === strings - 1;
  const barre = onLow.length >= 3 || (onLow.length >= 2 && spans) ? { row: low, from: onLow[0].s, to: onLow[onLow.length - 1].s } : undefined;
  let next = barre ? 2 : 1;
  const rest = (barre ? dots.filter((d) => d.f !== low) : dots).slice().sort((a, b) => a.f - b.f || a.s - b.s);
  const out = rest.map((d) => ({ ...d, e: String(Math.min(4, next++)) }));
  return { dots: out, barre };
}

function guitarFromFrets(frets: number[]): Shape {
  const played = frets.filter((f) => f > 0);
  const base = played.length && Math.max(...played) > 4 ? Math.min(...played) : 1;
  const raw: Dot[] = [];
  const muted: number[] = [];
  frets.forEach((f, i) => {
    if (f < 0) muted.push(i);
    else if (f > 0) raw.push({ s: i, f: f - base + 1 });
  });
  const { dots, barre } = withFingers(raw, 6, frets.findIndex((f) => f >= 0));
  return { dots, muted, strings: 6, barre, base };
}

function guitarShape(chord: string): Shape | null {
  const site = shapes[chord];
  if (site) {
    const m = new Map<number, { f: number; e: string }>();
    site.split("`").forEach((p) => {
      const r = p.match(/S(\d)F(\d+)E(\w)/);
      if (r) m.set(+r[1], { f: +r[2], e: r[3] });
    });
    const fr = [...m.values()].map((v) => v.f).filter((f) => f > 0);
    const base = fr.length && Math.max(...fr) > 4 ? Math.min(...fr) : 1;
    const dots = [...m.entries()].filter(([, v]) => v.f > 0).map(([s, v]) => ({ s: 6 - s, f: v.f - base + 1, e: v.e }));
    const muted = [1, 2, 3, 4, 5, 6].filter((s) => !m.has(s)).map((s) => 6 - s);
    // אם באתר חסרים מספרי אצבעות, משלימים אוטומטית
    if (dots.some((d) => !/^[1-4]$/.test(d.e ?? ""))) {
      const r = withFingers(dots.map((d) => ({ s: d.s, f: d.f })), 6, Math.min(...dots.map((d) => d.s)));
      return { strings: 6, base, dots: r.dots, muted, barre: r.barre };
    }
    return { strings: 6, base, dots, muted };
  }
  const p = parse(chord);
  if (!p) return null;
  const name = NOTES[p.root] + (p.q === "min" ? "m" : "");
  if (OPEN[name] && (p.q === "maj" || p.q === "min")) return guitarFromFrets(OPEN[name]);
  const eFret = (p.root - 4 + 12) % 12;
  const aFret = (p.root - 9 + 12) % 12;
  const useE = eFret <= aFret;
  const form = useE ? E_FORM[p.q] : A_FORM[p.q];
  const k = useE ? eFret : aFret;
  return guitarFromFrets(form.map((f) => (f < 0 ? -1 : f + k)));
}

/* ---------- יוקולילי (G C E A) ---------- */
const UKE_FORMS: Record<"maj" | "min", { f: number[]; root: number }[]> = {
  maj: [{ f: [2, 1, 0, 0], root: 9 }, { f: [0, 0, 0, 3], root: 0 }, { f: [0, 2, 3, 2], root: 7 }, { f: [2, 2, 2, 0], root: 2 }],
  min: [{ f: [2, 0, 0, 0], root: 9 }, { f: [0, 3, 3, 3], root: 0 }, { f: [0, 2, 3, 1], root: 7 }, { f: [2, 2, 1, 0], root: 2 }],
};
function ukeShape(chord: string): Shape | null {
  const p = parse(chord);
  if (!p) return null;
  const set = p.q === "min" || p.q === "m7" ? UKE_FORMS.min : UKE_FORMS.maj;
  let best: number[] | null = null;
  for (const c of set) {
    const k = (p.root - c.root + 12) % 12;
    const fr = c.f.map((x) => x + k);
    if (!best || Math.max(...fr) < Math.max(...best) || (Math.max(...fr) === Math.max(...best) && k < (best[0] - set[0].f[0]))) best = fr;
  }
  if (!best) return null;
  const played = best.filter((f) => f > 0);
  const base = played.length && Math.max(...played) > 4 ? Math.min(...played) : 1;
  const raw = best.map((x, i) => ({ s: i, f: x - base + 1, x })).filter((d) => d.x > 0).map(({ s, f }) => ({ s, f }));
  const { dots, barre } = withFingers(raw, 4);
  return { strings: 4, base, muted: [], dots, barre };
}

/* ---------- ציור ---------- */
const SG = 15; // רווח בין מיתרים
const FG = 17; // גובה סריג
const ROWS = 4;

function Grid({ shape }: { shape: Shape }) {
  const w = SG * (shape.strings - 1);
  const h = FG * ROWS;
  const pad = { l: 22, r: 34, t: 26, b: 8 };
  return (
    <svg viewBox={`0 0 ${w + pad.l + pad.r} ${h + pad.t + pad.b}`} className="h-24 w-auto overflow-visible sm:h-32" aria-hidden>
      <g transform={`translate(${pad.l} ${pad.t})`}>
        {Array.from({ length: shape.strings }, (_, i) => <line key={i} x1={i * SG} x2={i * SG} y1="0" y2={h} stroke="#9aa3b5" strokeWidth="1" />)}
        {Array.from({ length: ROWS + 1 }, (_, i) => (
          <line key={i} x1="0" x2={w} y1={i * FG} y2={i * FG} stroke={i === 0 && shape.base === 1 ? "#0b0b0f" : "#9aa3b5"} strokeWidth={i === 0 && shape.base === 1 ? 3 : 1} />
        ))}
        {shape.barre && (
          <g>
            <rect x={shape.barre.from * SG - 5.8} y={(shape.barre.row - 0.5) * FG - 5.8} width={(shape.barre.to - shape.barre.from) * SG + 11.6} height="11.6" rx="5.8" fill="#2e7cf6" stroke="#fff" strokeWidth="1" />
            <text x={shape.barre.from * SG} y={(shape.barre.row - 0.5) * FG + 3} fontSize="8.5" fontWeight="600" textAnchor="middle" fill="#fff">1</text>
          </g>
        )}
        {shape.muted.map((s) => <text key={s} x={s * SG} y="-8" fontSize="10" textAnchor="middle" fill="#6b6b76">×</text>)}
        {shape.dots.map((d, i) => (
          <g key={i}>
            <circle cx={d.s * SG} cy={(d.f - 0.5) * FG} r="5.8" fill="#2e7cf6" stroke="#fff" strokeWidth="1" />
            {d.e && d.e !== "0" && d.e !== "u" && <text x={d.s * SG} y={(d.f - 0.5) * FG + 3} fontSize="8.5" fontWeight="600" textAnchor="middle" fill="#fff">{d.e}</text>}
          </g>
        ))}
        {shape.base > 1 && (
          <text x={w + 10} y={FG / 2 + 4} fontSize="12" fontWeight="700" fill="#2e7cf6" fontFamily="ui-monospace, monospace">
            {shape.base}<tspan fontSize="8" fontWeight="500" dx="1">fr</tspan>
          </text>
        )}
      </g>
    </svg>
  );
}

function Piano({ chord }: { chord: string }) {
  const p = parse(chord);
  if (!p) return null;
  const iv = p.q === "min" || p.q === "m7" ? [0, 3, 7] : [0, 4, 7];
  if (p.q === "7") iv.push(10);
  if (p.q === "m7") iv.push(10);
  if (p.q === "maj7") iv.push(11);
  const on = new Set(iv.map((i) => p.root + i));
  const white = [0, 2, 4, 5, 7, 9, 11];
  const keys: number[] = [];
  for (let o = 0; o < 2; o++) white.forEach((w) => keys.push(o * 12 + w));
  const blacks: [number, number][] = [];
  for (let o = 0; o < 2; o++) [[1, 0], [3, 1], [6, 3], [8, 4], [10, 5]].forEach(([n, wi]) => blacks.push([o * 12 + n, o * 7 + wi]));
  return (
    <svg viewBox="0 0 112 56" className="h-14 w-auto sm:h-20" aria-hidden>
      {keys.map((k, i) => <rect key={k} x={i * 8} y="4" width="8" height="48" rx="1.5" fill={on.has(k) ? "#2e7cf6" : "#fff"} stroke="#9aa3b5" strokeWidth=".8" />)}
      {blacks.map(([k, wi]) => <rect key={k} x={wi * 8 + 5.4} y="4" width="5.2" height="29" rx="1" fill={on.has(k) ? "#1d5fd1" : "#16161c"} />)}
    </svg>
  );
}

function shapeFor(chord: string, inst: Instrument): Shape | null {
  if (inst === "guitar") return guitarShape(chord);
  if (inst === "ukulele") return ukeShape(chord);
  return null;
}

/** האם יש תרשים לאקורד בכלי הנבחר. עכשיו כל אקורד תקין מקבל תרשים */
export function hasDiagram(chord: string, inst: Instrument) {
  if (inst === "words") return false;
  return parse(chord) !== null;
}

export default function ChordDiagram({ chord, inst }: { chord: string; inst: Instrument }) {
  if (!hasDiagram(chord, inst)) return null;
  const shape = shapeFor(chord, inst);
  return (
    <span dir="ltr" className="flex flex-col items-center gap-1">
      <span className="font-mono text-sm font-medium text-ink">{chord}</span>
      {inst === "piano" ? <Piano chord={chord} /> : shape && <Grid shape={shape} />}
    </span>
  );
}
