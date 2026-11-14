"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = ["שירים חדשים", "אמנים", "הכי נצפים", "אקורדים לגיטרה", "פסנתר", "יוקולילי", "שירי ילדים", "מילון אקורדים"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-3 z-50 px-3 sm:px-6 print:hidden">
      <nav className="glass mx-auto flex max-w-6xl items-center gap-2 rounded-full p-1.5 sm:gap-3" aria-label="ראשי">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="תפריט"
          aria-expanded={open}
          className="grid size-10 shrink-0 place-items-center rounded-full transition hover:bg-black/5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
        <a href="#" aria-label="Tab4U" className="flex h-10 shrink-0 items-center rounded-full bg-[#222] px-3.5 transition hover:bg-[#2c2c2c]">
          {/* הלוגו המקורי בנוי לרקע כהה, לכן הוא יושב על כמוסה כהה */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tab4u-logo.svg" alt="Tab4U" width={73} height={26} className="h-[26px] w-auto" />
        </a>

        <form onSubmit={(e) => e.preventDefault()} className="mx-1 flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-black/[.045] px-4 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/40">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-muted"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input aria-label="חיפוש" placeholder="שיר \ אמן" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" />
          <span className="hidden rounded-full bg-white px-3 py-1 text-xs text-muted shadow-sm sm:block">הכל</span>
        </form>

        <button className="hidden shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm text-ink/80 transition hover:bg-black/5 md:flex">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>
          השירים שלי
        </button>
        <button className="shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(46,124,246,.7)] transition hover:brightness-110 active:scale-95">
          התחברות
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="glass mx-auto mt-2 grid max-w-6xl grid-cols-2 gap-1 rounded-3xl p-3 sm:grid-cols-4"
          >
            {links.map((l) => (
              <a key={l} href="#" className="rounded-2xl px-4 py-3 text-sm transition hover:bg-white">{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
