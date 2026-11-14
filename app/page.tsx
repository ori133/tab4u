import Nav from "@/components/Nav";
import SongHeader from "@/components/SongHeader";
import ChordReader from "@/components/ChordReader";
import RelatedSongs from "@/components/RelatedSongs";
import Footer from "@/components/Footer";
import { song } from "@/lib/song";
import { SettingsProvider } from "@/lib/settings";

export default function Page() {
  return (
    <>
      <Nav />
      <SettingsProvider>
      <main className="mx-auto max-w-6xl px-3 pt-6 sm:px-6">
        <nav aria-label="פירורי לחם" className="mb-5 flex items-center gap-2 px-2 text-xs text-muted print:hidden">
          <a href="#" className="hover:text-ink">ראשי</a><span>‹</span>
          <a href="#" className="hover:text-ink">{song.artist}</a><span>‹</span>
          <span className="text-ink">{song.title}</span>
        </nav>
        <SongHeader />
        <ChordReader />
        <RelatedSongs />
      </main>
      </SettingsProvider>
      <Footer />
    </>
  );
}
