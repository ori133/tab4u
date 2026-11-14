"use client";
import { useEffect, useRef, useState } from "react";
import { blocks, mapChord, song, transposeChord, uniqueChords } from "@/lib/song";
import ChordDiagram, { hasDiagram, Instrument } from "./ChordDiagram";
import Reveal from "./Reveal";

const TONES = [-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3];

const I = ({ children }: { children: React.ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
const icons = {
  guitar: <I><path d="m14 10 6-6M17 3l4 4M12.5 11.5a3 3 0 0 0-4.2 0l-.9 1c-1.1 1.2-2.8.9-3.6 2-1.4 1.8-.7 4.3 1.2 5.4 1.9 1.1 4.2.8 5.3-.9.9-1.4.2-2.7 1.3-3.800l.9-.9a3 3 0 0 0 0-2.800Z" /></I>,
  piano: <I><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M9 5v14M15 5v14M7.5 5v8M12 5v8M16.5 5v8" /></I>,
  uke: <I><g transform="rotate(40 12 12)"><path d="M10.5 2h3v3h-3zM10.8 5v6.500M13.2 5v6.500M10.8 11.500C8.500 12 8 14.500 9.500 15.800 7 17 6.500 20 8.200 21.400c1.600 1.300 6 1.300 7.600 0 1.700-1.400 1.200-4.400-1.300-5.600 1.500-1.300 1-3.800-1.300-4.300" /><circle cx="12" cy="18.200" r="1.600" /><path d="M12 5v8" strokeWidth="1" /></g></I>,
  doc: <I><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" /></I>,
  print: <I><path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z" /></I>,
  simplify: <I><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5M9 9l-5-5M15 9l5-5M9 15l-5 5M15 15l5 5" /></I>,
  notes: <I><path d="M4 7h16M4 11h16M4 15h16M4 19h16M8 7v8" /></I>,
  jam: <I><path d="M9 18V6l10-2v12" /><circle cx="7" cy="18" r="2.5" /><circle cx="17" cy="16" r="2.5" /></I>,
  chev: <I><path d="m6 9 6 6 6-6" /></I>,
};

function Row({ icon, active, children, ...p }: { icon: React.ReactNode; active?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...p}
      className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition active:scale-[.98] ${
        active ? "border-brand bg-brand text-white shadow-[0_10px_20px_-8px_rgba(46,124,246,.8)]" : "border-black/10 bg-white/70 text-ink/80 hover:bg-white"
      }`}
    >
      <span>{children}</span>
      <span className={active ? "text-white" : "text-ink/60"}>{icon}</span>
    </button>
  );
}

export default function ChordReader() {
  const [tone, setTone] = useState(0);
  const [toneOpen, setToneOpen] = useState(false);
  const [size, setSize] = useState(20);
  const [showDiagrams, setShowDiagrams] = useState(false);
  const [simple, setSimple] = useState(false);
  const [inst, setInst] = useState<Instrument>("guitar");
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState(3);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const steps = Math.round(tone * 2);
  const chords = uniqueChords(steps, simple);
  const words = inst === "words";
  const diagInst: Instrument = inst === "words" ? "guitar" : inst;

  useEffect(() => {
    if (!auto) return;
    let raf = 0, acc = 0;
    const stop = () => setAuto(false);
    const tick = () => {
      acc += speedRef.current * 0.25;
      if (acc >= 1) { window.scrollBy(0, Math.floor(acc)); acc -= Math.floor(acc); }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) return stop();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("wheel", stop); window.removeEventListener("touchstart", stop); };
  }, [auto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") setSpeed((s) => Math.min(10, s + 1));
      else if (e.key === "-" || e.key === "_") setSpeed((s) => Math.max(1, s - 1));
      else if (e.key === "Escape") { setAuto(false); setToneOpen(false); }
    };
    window.addEventListener("keyup", onKey);
    return () => window.removeEventListener("keyup", onKey);
  }, []);

  const instBtn = (k: Instrument, label: string, icon: React.ReactNode) => (
    <button key={k} onClick={() => setInst(k)} aria-label={label} title={label} aria-pressed={inst === k}
      className={`grid h-11 flex-1 place-items-center rounded-xl transition ${inst === k ? "bg-white text-brand shadow-sm" : "text-ink/60 hover:text-ink"}`}>
      {icon}
    </button>
  );

  return (
    <section id="reader" className="mt-6">
      <div className="grid gap-5 lg:grid-cols-[1fr_360px] print:block">
        <Reveal>
          <article className="glass rounded-3xl p-6 sm:p-10" aria-label="אקורדים לשיר">
            <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-black/5 pb-6 print:hidden">
              <span className="text-xs text-muted">אקורדים בשיר:</span>
              {chords.map((c) => <span key={c} dir="ltr" className="rounded-lg bg-brand-soft px-2.5 py-1 font-mono text-xs text-brand">{c}</span>)}
            </div>

            {showDiagrams && !words && (
              <div className="mb-8 flex flex-wrap justify-center gap-5 rounded-2xl bg-white/60 p-5 print:mb-2 print:gap-2 print:p-0">
                {chords.some((c) => hasDiagram(c, diagInst))
                  ? chords.map((c) => <ChordDiagram key={c} chord={c} inst={diagInst} />)
                  : <p className="text-sm text-muted">אין תרשימי אקורדים למקשים שנבחרו.</p>}
              </div>
            )}

            <div className="no-select song-body" style={{ fontSize: size }}>
              {blocks.map((b, bi) => {
                if (b.t === "gap") return <div key={bi} className="h-[1.2em]" />;
                if (b.t === "label") return <span key={bi} className="mb-2 mt-1 inline-block rounded-lg bg-black/5 px-2.5 py-1 font-mono text-[0.6em] text-muted">{b.x}</span>;
                return (
                  <div key={bi} className="flex flex-wrap items-end leading-snug">
                    {b.s.map((g, gi) => {
                      const c = g.chord ? mapChord(g.chord, steps, simple) : undefined;
                      const bar = c === "|";
                      return (
                        <span key={gi} className="inline-flex flex-col">
                          {!words && (
                            <span dir="ltr" className="group relative h-[1.75em] text-start">
                              {c && (bar
                                ? <span className="px-1.5 font-mono text-[0.72em] text-black/25">|</span>
                                : <span className="cursor-default rounded-md bg-brand-soft px-1.5 py-0.5 font-mono text-[0.72em] text-brand transition group-hover:bg-brand group-hover:text-white">{c}</span>)}
                              {c && !bar && hasDiagram(c, diagInst) && (
                                <span className="glass pointer-events-none absolute start-0 top-full z-30 mt-1 hidden rounded-2xl p-3 group-hover:block">
                                  <ChordDiagram chord={c} inst={diagInst} />
                                </span>
                              )}
                            </span>
                          )}
                          <span className="whitespace-pre">{g.text || (g.chord ? " " : "")}</span>
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="top-24 flex gap-3 lg:sticky print:hidden">
            <aside className="glass min-w-0 flex-1 space-y-2.5 rounded-3xl p-3.5" aria-label="כלי נגינה">
              <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/70 p-1.5">
                <button onClick={() => setSize(20)} className="px-3 text-center text-[11px] leading-tight text-muted transition hover:text-ink">אפס גודל<br />פונט</button>
                <button onClick={() => setSize((s) => Math.min(36, s + 2))} aria-label="הגדל את הגופן" className="grid h-11 flex-1 place-items-center rounded-xl text-xl font-medium transition hover:bg-white">א</button>
                <button onClick={() => setSize((s) => Math.max(14, s - 2))} aria-label="הקטן את הגופן" className="grid h-11 flex-1 place-items-center rounded-xl text-xs font-medium transition hover:bg-white">א</button>
              </div>

              <Row icon={icons.guitar} active={showDiagrams} onClick={() => setShowDiagrams((v) => !v)}>{showDiagrams ? "הסתר אקורדים" : "הצג אקורדים"}</Row>
              <Row icon={icons.simplify} active={simple} onClick={() => setSimple((v) => !v)}>{simple ? "אקורדים מקוריים" : "פשט אקורדים"}</Row>

              <div className="relative">
                <Row icon={<span className={`block transition ${toneOpen ? "rotate-180" : ""}`}>{icons.chev}</span>} onClick={() => setToneOpen((v) => !v)} aria-expanded={toneOpen}>
                  שנה טון{tone !== 0 && <span dir="ltr" className="ms-2 inline-block rounded-md bg-brand-soft px-1.5 py-0.5 font-mono text-xs text-brand">{`${tone > 0 ? "+" : ""}${tone}`}</span>}
                </Row>
                {toneOpen && (
                  <div className="absolute start-0 top-full z-20 mt-2 w-[236px] max-w-full rounded-2xl border border-black/[.06] bg-white p-2 shadow-[0_10px_24px_-12px_rgba(30,40,80,.25)]">
                    <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] text-muted/80">
                      <span>טון</span>
                      <button onClick={() => { setTone(0); setToneOpen(false); }} className="text-brand hover:underline">איפוס</button>
                    </div>
                    <div dir="ltr" className="grid grid-cols-4 gap-1">
                      {TONES.map((t) => {
                        const on = t === tone;
                        return (
                          <button key={t} onClick={() => { setTone(t); setToneOpen(false); }} aria-pressed={on}
                            className={`flex flex-col items-center rounded-lg py-1.5 transition active:scale-95 ${on ? "bg-brand-soft text-brand" : "text-ink/70 hover:bg-black/[.04]"}`}>
                            <span className="font-mono text-xs">{t > 0 ? `+${t}` : t}</span>
                            <span className={`font-mono text-[10px] ${on ? "text-brand/70" : "text-muted/70"}`}>{transposeChord(song.key, Math.round(t * 2), true)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Row icon={icons.print} onClick={() => window.print()}>הדפסת השיר</Row>

              <div className="flex gap-1 rounded-2xl border border-black/10 bg-black/[.03] p-1" role="group" aria-label="תצוגת כלי">
                {instBtn("guitar", "תצוגה לגיטרה", icons.guitar)}
                {instBtn("piano", "תצוגה לפסנתר", icons.piano)}
                {instBtn("ukulele", "תצוגה ליוקולילי", icons.uke)}
                {instBtn("words", "הצג מילים בלבד", icons.doc)}
              </div>

              <Row icon={icons.notes}>תווים לשיר זה</Row>
              <Row icon={<span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white">{icons.jam}</span>}>התחל ג׳אם סשן</Row>
            </aside>

            <div className="glass flex h-fit w-[68px] flex-col items-center gap-1 rounded-full p-2" role="group" aria-label="גלילה אוטומטית">
              <button onClick={() => setAuto((v) => !v)} aria-label={auto ? "עצור גלילה אוטומטית" : "התחל גלילה אוטומטית"}
                className={`grid size-12 place-items-center rounded-full transition active:scale-95 ${auto ? "bg-brand text-white" : "bg-white text-ink shadow-sm"}`}>
                {auto
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
              </button>
              <button onClick={() => setSpeed((s) => Math.max(1, s - 1))} aria-label="גלול לאט יותר" className="grid size-12 place-items-center rounded-full text-2xl leading-none transition hover:bg-white">−</button>
              <span className="font-mono text-xs text-muted" aria-live="polite">{speed}</span>
              <button onClick={() => setSpeed((s) => Math.min(10, s + 1))} aria-label="גלול מהר יותר" className="grid size-12 place-items-center rounded-full text-2xl leading-none transition hover:bg-white">+</button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="glass fixed inset-x-3 bottom-3 z-40 print:hidden flex items-center justify-between gap-1 rounded-full p-1.5 lg:hidden" role="toolbar" aria-label="כלים מהירים">
        <button onClick={() => setAuto((v) => !v)} aria-label={auto ? "עצור גלילה אוטומטית" : "התחל גלילה אוטומטית"}
          className={`grid size-11 place-items-center rounded-full transition active:scale-95 ${auto ? "bg-brand text-white" : "bg-white shadow-sm"}`}>
          {auto
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>}
        </button>
        <button onClick={() => setSpeed((v) => Math.max(1, v - 1))} aria-label="גלול לאט יותר" className="grid size-11 place-items-center rounded-full text-xl">−</button>
        <span className="w-5 text-center font-mono text-xs text-muted">{speed}</span>
        <button onClick={() => setSpeed((v) => Math.min(10, v + 1))} aria-label="גלול מהר יותר" className="grid size-11 place-items-center rounded-full text-xl">+</button>
        <span className="h-6 w-px bg-black/10" />
        <button onClick={() => setSize((v) => Math.max(14, v - 2))} aria-label="הקטן את הגופן" className="grid size-11 place-items-center rounded-full text-xs font-medium">א</button>
        <button onClick={() => setSize((v) => Math.min(36, v + 2))} aria-label="הגדל את הגופן" className="grid size-11 place-items-center rounded-full text-xl font-medium">א</button>
        <span className="h-6 w-px bg-black/10" />
        <button onClick={() => setTone((t) => Math.max(-2.5, t - 0.5))} aria-label="הורד טון" className="grid size-11 place-items-center rounded-full text-xl">−</button>
        <span dir="ltr" className="w-9 text-center font-mono text-xs text-brand">{tone > 0 ? "+" : ""}{tone}</span>
        <button onClick={() => setTone((t) => Math.min(3, t + 0.5))} aria-label="העלה טון" className="grid size-11 place-items-center rounded-full text-xl">+</button>
      </div>
    </section>
  );
}
