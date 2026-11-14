"use client";
import { useEffect, useRef, useState } from "react";
import { song, transposeChord, uniqueChords } from "@/lib/song";
import Reveal from "./Reveal";
import Pill from "./Pill";
import ScrollWords from "./ScrollWords";

function Btn({ active, children, ...p }: { active?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...p}
      className={`rounded-2xl border px-4 py-3 text-sm transition active:scale-95 ${
        active ? "border-brand bg-brand text-white shadow-[0_10px_20px_-8px_rgba(46,124,246,.8)]" : "border-black/10 bg-white/70 text-ink hover:bg-white"
      } ${p.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export default function ChordReader() {
  const [steps, setSteps] = useState(0);
  const [size, setSize] = useState(20);
  const [showChords, setShowChords] = useState(true);
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    if (!auto) return;
    let raf = 0;
    let acc = 0;
    const stop = () => setAuto(false);
    const tick = () => {
      acc += speedRef.current * 0.6;
      if (acc >= 1) {
        window.scrollBy(0, Math.floor(acc));
        acc -= Math.floor(acc);
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) return stop();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, [auto]);

  const key = transposeChord(song.key, steps, true);
  const chords = uniqueChords(steps);

  return (
    <section id="reader" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-12 text-center">
        <Reveal><Pill>האקורדים</Pill></Reveal>
        <ScrollWords text="נגנו עם השיר, בקצב שלכם" className="mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Reveal>
          <article className="glass rounded-3xl p-6 sm:p-10" aria-label={`אקורדים ל${song.title}`}>
            <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-black/5 pb-6">
              <span className="text-xs text-muted">אקורדים בשיר:</span>
              {chords.map((c) => (
                <span key={c} dir="ltr" className="rounded-lg bg-brand-soft px-2.5 py-1 font-mono text-xs text-brand">{c}</span>
              ))}
            </div>
            <div className="no-select space-y-9" style={{ fontSize: size }}>
              {song.sections.map((sec) => (
                <div key={sec.label}>
                  <span className="mb-3 inline-block rounded-lg bg-black/5 px-2.5 py-1 font-mono text-[0.6em] text-muted">{sec.label}:</span>
                  <div className="space-y-1">
                    {sec.lines.map((line, li) => (
                      <p key={li} className="flex flex-wrap leading-snug">
                        {line.map((g, gi) => (
                          <span key={gi} className="inline-flex flex-col">
                            <span className={`chord-line h-[1.7em] text-start ${showChords ? "" : "invisible"}`}>
                              {g.chord && (
                                <span className="rounded-md bg-brand-soft px-1.5 py-0.5 font-mono text-[0.72em] text-brand">
                                  {transposeChord(g.chord, steps, true)}
                                </span>
                              )}
                            </span>
                            <span className="whitespace-pre">{g.text || " "}</span>
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <aside className="glass sticky top-24 space-y-3 rounded-3xl p-4" aria-label="כלי נגינה">
            <div className="grid grid-cols-3 items-center gap-2">
              <Btn onClick={() => setSize((s) => Math.max(14, s - 2))} aria-label="הקטן טקסט"><span className="text-xs">א</span></Btn>
              <span className="text-center font-mono text-xs text-muted">{size}px</span>
              <Btn onClick={() => setSize((s) => Math.min(34, s + 2))} aria-label="הגדל טקסט"><span className="text-lg leading-none">א</span></Btn>
            </div>
            <Btn className="w-full" active={showChords} onClick={() => setShowChords((v) => !v)}>
              {showChords ? "הסתר אקורדים" : "הצג אקורדים"}
            </Btn>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>שנה טון</span>
                <span dir="ltr" className="rounded-md bg-brand-soft px-2 py-0.5 font-mono text-xs text-brand">{key}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Btn onClick={() => setSteps((s) => s - 1)} aria-label="הורד חצי טון">−</Btn>
                <Btn onClick={() => setSteps((s) => s + 1)} aria-label="העלה חצי טון">+</Btn>
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white/70 p-3">
              <Btn className="w-full" active={auto} onClick={() => setAuto((v) => !v)}>
                {auto ? "עצור גלילה" : "גלילה אוטומטית"}
              </Btn>
              <label className="mt-3 flex items-center gap-3 text-xs text-muted">
                מהירות
                <input type="range" min={1} max={6} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-full accent-brand" />
              </label>
            </div>
            <Btn className="w-full" onClick={() => window.print()}>הדפסת השיר</Btn>
            <Btn className="w-full">התחל ג׳אם סשן</Btn>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
