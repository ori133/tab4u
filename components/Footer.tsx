export default function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-6xl px-3 pb-28 sm:px-6 lg:pb-10">
      <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-5 text-xs text-muted">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-lime font-display text-[9px] text-ink">T4U</span>
          <span>Tab4U, דוגמת עיצוב. כל הזכויות שמורות לבעלים.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-ink">תנאי שימוש</a>
          <a href="#" className="hover:text-ink">העדפות עוגיות</a>
          <a href="#" className="hover:text-ink">צור קשר</a>
        </div>
      </div>
    </footer>
  );
}
