import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import InfoList from "@/components/InfoList";
import ChordReader from "@/components/ChordReader";
import ToolCards from "@/components/ToolCards";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <InfoList />
      <ChordReader />
      <ToolCards />
      <Footer />
    </main>
  );
}
