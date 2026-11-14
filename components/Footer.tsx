import Reveal from "./Reveal";
import Pill from "./Pill";
import ScrollWords from "./ScrollWords";

export default function Footer() {
  return (
    <>
      <section className="px-5 py-24 text-center">
        <Reveal><Pill>הצטרפו</Pill></Reveal>
        <ScrollWords text="מוכנים לנגן?" className="mt-5 font-display text-4xl tracking-tight sm:text-6xl" />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-sm text-sm text-muted">התחברו כדי לשמור שירים, לשנות טון ולנגן בכל מקום.</p>
          <button className="mt-7 rounded-full bg-brand px-8 py-3 text-sm font-medium text-white shadow-[0_12px_24px_-8px_rgba(46,124,246,.7)] transition hover:brightness-110 active:scale-95">
            התחברות
          </button>
        </Reveal>
      </section>
      <footer className="mx-auto max-w-5xl px-5 pb-10">
        <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-5 text-xs text-muted">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-lime font-display text-[9px] text-ink">T4U</span>
            <span>Tab4U, דוגמת עיצוב. כל הזכויות שמורות לבעלים.</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-ink">תנאי שימוש</a>
            <a href="#" className="hover:text-ink">העדפות עוגיות</a>
          </div>
        </div>
      </footer>
    </>
  );
}
