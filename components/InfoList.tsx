import Reveal from "./Reveal";
import Pill from "./Pill";
import ScrollWords from "./ScrollWords";
import { song } from "@/lib/song";

const items = [
  { t: "מחבר ומלחין", d: `${song.credits.join(" ו")}. הפריטה זמינה לפי בקשה.` },
  { t: "עריכה של הצוות", d: "כל האקורדים נבדקים ומתוקנים לפני פרסום, כדי שהנגינה תהיה נוחה." },
  { t: "גרסה קלה", d: "אקורדים בסיסיים בלי ברזים, בלחיצה אחת, למי שמתחיל." },
];

export default function InfoList() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-20">
      <div className="mb-12 text-center">
        <Reveal><Pill>על השיר</Pill></Reveal>
        <ScrollWords text="הכל על השיר, במבט אחד" className="mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl" />
      </div>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <ol className="space-y-8">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.1}>
              <li className="flex gap-5">
                <span className="pt-0.5 font-display text-sm text-muted">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg">{it.t}</h3>
                  <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">{it.d}</p>
                </div>
              </li>
              {i < items.length - 1 && <div className="mt-8 h-px bg-gradient-to-l from-black/10 to-transparent" />}
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.2}>
          <div className="glass relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl">
            <svg viewBox="0 0 400 300" className="w-[88%]" fill="none" aria-hidden>
              <g className="float-slow">
                <path d="M200 70 L290 120 L200 170 L110 120Z" fill="#fff" stroke="#cfe0ff" />
                <path d="M110 120 L200 170 L200 215 L110 165Z" fill="#e9f1ff" stroke="#cfe0ff" />
                <path d="M290 120 L200 170 L200 215 L290 165Z" fill="#dbe8ff" stroke="#cfe0ff" />
                <path d="M200 88 L262 122 L200 156 L138 122Z" fill="#2e7cf6" fillOpacity=".9" />
                <circle cx="200" cy="122" r="9" fill="#c8f67a" />
              </g>
              <path d="M60 235 L110 210 L160 235 L110 260Z" fill="#fff" stroke="#dfe6f5" />
              <path d="M290 235 L340 210 L390 235 L340 260Z" fill="#fff" stroke="#dfe6f5" />
              <path d="M110 165 V210 M290 165 V210" stroke="#aab4cc" strokeDasharray="4 5" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
