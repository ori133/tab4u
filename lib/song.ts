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
