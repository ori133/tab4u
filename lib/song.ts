export type Seg = { chord?: string; text: string };
export type Line = Seg[];
export type Section = { label: string; lines: Line[] };

// טקסט דמה מקורי בלבד, כדי לא להעתיק מילים מוגנות בזכויות יוצרים.
export const song = {
  title: "לב לבן",
  artist: "שולי רנד",
  credits: ["שולי רנד", "אבי אוחיון"],
  tags: ["פופ", "שירים חסידיים"],
  key: "Cm",
  rating: 4.69,
  sections: [
    {
      label: "פתיחה",
      lines: [[{ chord: "Cm", text: "" }]],
    },
    {
      label: "בית",
      lines: [
        [{ chord: "Cm", text: "שורה " }, { chord: "Bb", text: "ראשונה " }, { chord: "Eb", text: "של " }, { chord: "Bb", text: "דוגמה" }],
        [{ chord: "Cm", text: "טקסט " }, { chord: "Bb", text: "זמני " }, { chord: "Gm", text: "לעיצוב" }],
        [{ chord: "Cm", text: "כאן " }, { chord: "Bb", text: "יבואו " }, { chord: "Eb", text: "המילים " }, { chord: "Bb", text: "האמיתיות" }],
        [{ chord: "Cm", text: "מהאתר " }, { chord: "Bb", text: "המקורי " }, { chord: "Eb", text: "בזמן " }, { chord: "Bb", text: "אמת" }],
      ],
    },
    {
      label: "פזמון",
      lines: [
        [{ chord: "Fm", text: "מילה " }, { chord: "Cm", text: "אחת " }, { chord: "Bb", text: "לכל " }, { chord: "Gm", text: "אקורד" }],
        [{ chord: "Fm", text: "ועוד " }, { chord: "Cm", text: "מילה " }, { chord: "Bb", text: "בין " }, { chord: "Eb", text: "שניים" }],
        [{ chord: "Fm", text: "קריאה " }, { chord: "Cm", text: "נוחה " }, { chord: "Bb", text: "בכל " }, { chord: "Gm", text: "גודל" }],
        [{ chord: "Ab", text: "וגלילה " }, { chord: "Bb", text: "אוטומטית " }, { chord: "Ab", text: "לכל " }, { chord: "Cm", text: "קצב" }],
      ],
    },
    {
      label: "גשר",
      lines: [
        [{ chord: "Eb", text: "מעבר " }, { chord: "Bb", text: "קצר " }, { chord: "Cm", text: "לפני " }, { chord: "Ab", text: "החזרה" }],
        [{ chord: "Fm", text: "ושוב " }, { chord: "Bb", text: "לפזמון " }, { chord: "Cm", text: "הגדול" }],
      ],
    },
  ] as Section[],
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

export function uniqueChords(steps: number): string[] {
  const set = new Set<string>();
  song.sections.forEach((s) => s.lines.forEach((l) => l.forEach((g) => g.chord && set.add(transposeChord(g.chord, steps, true)))));
  return [...set];
}
