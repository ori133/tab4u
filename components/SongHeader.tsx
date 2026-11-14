import { song } from "@/lib/song";
import Pill from "./Pill";

export default function SongHeader() {
  return (
    <section className="glass relative overflow-hidden rounded-[2rem] p-5 sm:p-7 print:p-0">
      <div className="pointer-events-none absolute -start-20 -top-24 size-72 print:hidden rounded-full bg-gradient-to-br from-lime/40 to-transparent blur-2xl" />
      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <div className="mb-3 flex flex-wrap gap-2 print:hidden">
            {song.tags.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
          <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl print:text-[15pt] print:mb-2">
            אקורדים לשיר <span className="text-brand">{song.title}</span>
            <span className="block text-xl text-muted sm:text-2xl print:ms-2 print:inline print:text-[13pt]"> 
              של <a href="#" className="text-ink underline decoration-black/20 underline-offset-4 transition hover:decoration-brand">{song.artist}</a>
            </span>
          </h1>
          <dl className="mt-4 grid print:hidden grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted">מחבר ומלחין</dt>
            <dd>{song.credits.map((c, i) => (<span key={c}>{i > 0 && " ו"}<a href="#" className="underline decoration-black/20 underline-offset-4 hover:decoration-brand">{c}</a></span>))}</dd>
            <dt className="text-muted">פריטה</dt>
            <dd><a href="#" className="underline decoration-black/20 underline-offset-4 hover:decoration-brand">בקש פריטה</a></dd>
            <dt className="text-muted">דירוג</dt>
            <dd className="flex items-center gap-1.5"><span className="text-brand">★</span>{song.rating}<span className="text-muted">מהשירים האהובים</span></dd>
          </dl>
          <div className="mt-5 flex flex-wrap gap-3 print:hidden">
            <button className="rounded-full bg-brand px-7 py-3 text-sm font-medium text-white shadow-[0_12px_24px_-8px_rgba(46,124,246,.7)] transition hover:brightness-110 active:scale-95">
              גרסה קלה
            </button>
            <button className="rounded-full border border-black/10 bg-white/70 px-7 py-3 text-sm font-medium transition hover:bg-white active:scale-95">
              הוספה לשירים שלי
            </button>
          </div>
        </div>

        {/* תצוגה מקדימה של הקליפ, מחליפה את בלוק המודעה הריק בדף המקורי */}
        <a href="#" aria-label={`צפייה בקליפ ${song.title}`} className="group relative hidden w-72 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2440] via-[#27408b] to-brand shadow-[0_24px_40px_-24px_rgba(30,50,120,.7)] md:block print:hidden">
          <div className="aspect-video p-4">
            <div className="flex items-end gap-1" aria-hidden>
              {[10, 18, 12, 24, 16, 30, 20, 14, 26, 12, 18, 9].map((h, i) => (
                <span key={i} style={{ height: h }} className="w-1 rounded-full bg-white/35" />
              ))}
            </div>
          </div>
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-white/95 text-brand shadow-lg transition group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-8 text-sm text-white">
            {song.artist} - {song.title}
          </span>
        </a>
      </div>
    </section>
  );
}
