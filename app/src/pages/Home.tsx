import { useEffect } from "react";
import Nav from "../sections/Nav";
import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import Workbench from "../sections/Workbench";
import LibraryPromo from "../sections/LibraryPromo";
import DayNight from "../sections/DayNight";
import Sanger from "../sections/Sanger";
import NgsPromo from "../sections/NgsPromo";
import Toolbox from "../sections/Toolbox";
import Download from "../sections/Download";
import Footer from "../sections/Footer";
import { LightboxProvider } from "../lightbox";
import { dismissBoot } from "../boot";
import { usePageTitle } from "../i18n";

export default function Home() {
  usePageTitle("title.home");
  useEffect(() => dismissBoot(), []);
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <LightboxProvider>
        <Nav />
        <main>
          <Hero />
          <Marquee
            items={[
              "PLASMID MAP",
              "RESTRICTION SITES",
              "PRIMER DESIGN",
              "SANGER TRACE",
              "NGS FASTQ VIEWER",
              "CRISPR SGRNA",
              "ELECTROPHORESIS",
              "CODON OPTIMIZATION",
              "AI ASSISTANT",
              "GENE FILE LIBRARY",
            ]}
          />
          <Workbench />
          <LibraryPromo />
          <Sanger />
          <NgsPromo />
          <DayNight />
          <Toolbox />
          <Download index="07" />
          <Footer />
        </main>
      </LightboxProvider>
    </div>
  );
}
