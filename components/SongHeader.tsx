import { song } from "@/lib/song";
import Pill from "./Pill";

export default function SongHeader() {
  return (
    <section className="glass relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
      <div className="pointer-events-none absolute -start-20 -top-24 size-72 rounded-full bg-gradient-to-br from-lime/40 to-transparent blur-2xl" />
      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {song.tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
          <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            אקורדים לשיר <span className="text-brand">{song.title}</span>
            <span className="block text-xl text-muted sm:text-2xl">
              של <a href="#" className="text-ink underline decoration-black/20 underline-offset-4 transition hover:decoration-brand">{song.artist}</a>
            </span>
          </h1>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted">מחבר ומלחין</dt>
            <dd>{song.credits.map((c, i) => (<span key={c}>{i > 0 && " ו"}<a href="#" className="underline decoration-black/20 underline-offset-4 hover:decoration-brand">{c}</a></span>))}</dd>
            <dt className="text-muted">פריטה</dt>
            <dd><a href="#" className="underline decoration-black/20 underline-offset-4 hover:decoration-brand">בקש פריטה</a></dd>
            <dt className="text-muted">דירוג</dt>
            <dd className="flex items-center gap-1.5"><span className="text-brand">★</span>{song.rating}<span className="text-muted">מהשירים האהובים</span></dd>
          </dl>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-full bg-brand px-7 py-3 text-sm font-medium text-white shadow-[0_12px_24px_-8px_rgba(46,124,246,.7)] transition hover:brightness-110 active:scale-95">
              גרסה קלה
            </button>
            <button className="rounded-full border border-black/10 bg-white/70 px-7 py-3 text-sm font-medium transition hover:bg-white active:scale-95">
              הוספה לשירים שלי
            </button>
          </div>
        </div>

        {/* אריח מצייר, מחליף את בלוק המודעה הריק בדף המקורי */}
        <div aria-hidden className="relative hidden size-40 md:block">
          <div className="float-slow absolute inset-0 grid place-items-center rounded-[1.75rem] bg-gradient-to-br from-brand-soft to-white shadow-[0_30px_50px_-25px_rgba(46,124,246,.5)]">
            <svg viewBox="0 0 200 200" className="w-4/5" fill="none">
              <path d="M100 40 L160 72 L100 104 L40 72Z" fill="#fff" stroke="#cfe0ff" />
              <path d="M40 72 L100 104 L100 140 L40 108Z" fill="#e9f1ff" stroke="#cfe0ff" />
              <path d="M160 72 L100 104 L100 140 L160 108Z" fill="#dbe8ff" stroke="#cfe0ff" />
              <path d="M100 54 L142 76 L100 98 L58 76Z" fill="#2e7cf6" />
              <circle cx="100" cy="76" r="8" fill="#c8f67a" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
