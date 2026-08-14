import Nav from "../sections/Nav";
import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import Workbench from "../sections/Workbench";
import DayNight from "../sections/DayNight";
import Sanger from "../sections/Sanger";
import Toolbox from "../sections/Toolbox";
import Download from "../sections/Download";
import Footer from "../sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <Nav />
      <main>
        <Hero />
        <Marquee
          items={[
            "PLASMID MAP",
            "RESTRICTION SITES",
            "PRIMER DESIGN",
            "SANGER TRACE",
            "CRISPR SGRNA",
            "ELECTROPHORESIS",
            "CODON OPTIMIZATION",
            "AI ASSISTANT",
            "GENE FILE LIBRARY",
          ]}
        />
        <Workbench />
        <DayNight />
        <Sanger />
        <Toolbox />
        <Download />
        <Footer />
      </main>
    </div>
  );
}
