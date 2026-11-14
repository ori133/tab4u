import { song } from "@/lib/song";

const rel = ["שיר לדוגמה א", "שיר לדוגמה ב", "שיר לדוגמה ג", "שיר לדוגמה ד"];

export default function RelatedSongs() {
  return (
    <section className="mt-12">
      <h2 className="mb-5 font-display text-2xl tracking-tight">עוד משירי {song.artist}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {rel.map((r, i) => (
          <a key={r} href="#" className="glass group rounded-3xl p-4 transition hover:-translate-y-1 hover:bg-white">
            <div className={`mb-4 grid aspect-[4/3] place-items-center rounded-2xl ${i % 2 ? "bg-lime/50" : "bg-brand-soft"}`}>
              <span dir="ltr" className="font-mono text-sm text-ink/60">{["Cm", "Fm", "Bb", "Eb"][i]}</span>
            </div>
            <div className="text-sm font-medium group-hover:text-brand">{r}</div>
            <div className="mt-0.5 text-xs text-muted">{song.artist}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
