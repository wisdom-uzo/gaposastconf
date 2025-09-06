import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Subthemes from "@/sections/Subthemes";
import Speakers from "@/sections/Speakers";
import Schedule from "@/sections/Schedule";
import Registration from "@/sections/Registration";
import Contact from "@/sections/Contact";
import ConstructionBanner from "@/components/ConstructionBanner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ConstructionBanner />
      <Header />
      <main>
        <Hero />
        <About />
        <Subthemes />
        <Speakers />
        <Schedule />
        <Registration />
        <Contact />
      </main>
    </div>
  );
}
