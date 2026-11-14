import data from "./songData.json";

export type Seg = { chord?: string; text?: string };
export type Block = { t: "label"; x: string } | { t: "line"; s: Seg[] } | { t: "gap" };

// נתוני השיר נשלפו מהדף המקורי ב-Tab4U לצורך הדגמה פרטית בלבד.
export const blocks = data.blocks as Block[];
export const shapes = data.shapes as Record<string, string>;

export const song = {
  title: "לב לבן",
  artist: "שולי רנד",
  credits: ["שולי רנד", "אבי אוחיון"],
  tags: ["פופ", "שירים חסידיים"],
  key: "Cm",
  rating: 4.69,
};

const SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

export function transposeChord(chord: string, steps: number, preferFlat: boolean): string {
  if (!steps) return chord;
  return chord.replace(/[A-G][#b]?/g, (note) => {
    const i = SHARP.indexOf(note) >= 0 ? SHARP.indexOf(note) : FLAT.indexOf(note);
    if (i < 0) return note;
    return (preferFlat ? FLAT : SHARP)[(((i + steps) % 12) + 12) % 12];
  });
}

export function simplifyChord(chord: string): string {
  const base = chord.split("/")[0];
  const m = base.match(/^([A-G][#b]?)(m(?!aj))?/);
  return m ? m[1] + (m[2] ?? "") : chord;
}

export function mapChord(c: string, steps: number, simple: boolean): string {
  if (c === "|") return c;
  const t = transposeChord(c, steps, true);
  return simple ? simplifyChord(t) : t;
}

export function uniqueChords(steps: number, simple = false): string[] {
  const set = new Set<string>();
  blocks.forEach((b) => b.t === "line" && b.s.forEach((g) => g.chord && g.chord !== "|" && set.add(mapChord(g.chord!, steps, simple))));
  return [...set];
}

// קושי נגינה בגיטרה: 0 פתוח וקל, 3 ברה או שחורות
const EASY: Record<string, number> = { C: 0, D: 0, E: 0, G: 0, A: 0, Am: 0, Em: 0, Dm: 0, F: 1, Bm: 2 };
function difficulty(chord: string): number {
  const m = chord.match(/^([A-G][#b]?)(m(?!aj))?/);
  return m ? EASY[m[1] + (m[2] ?? "")] ?? 3 : 3;
}

/** מציע סריג קאפו שמוריד את הקושי הכולל של האקורדים, לפי מספר הפעמים שכל אקורד מנוגן */
export function suggestCapo(steps: number, simple: boolean): { capo: number; shapes: string[]; before: number; after: number } | null {
  const counts = new Map<string, number>();
  blocks.forEach((b) => b.t === "line" && b.s.forEach((g) => {
    if (g.chord && g.chord !== "|") {
      const c = mapChord(g.chord, steps, simple);
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
  }));
  const score = (capo: number) => [...counts].reduce((a, [c, n]) => a + n * difficulty(transposeChord(c, -capo, true)), 0);
  const before = score(0);
  let best = 0, bestScore = before;
  for (let c = 1; c <= 7; c++) {
    const sc = score(c);
    if (sc < bestScore) { best = c; bestScore = sc; }
  }
  if (best === 0) return null;
  return { capo: best, shapes: [...counts.keys()].map((c) => transposeChord(c, -best, true)), before, after: bestScore };
}
