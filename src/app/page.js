import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import ConstructionBanner from "@/components/ConstructionBanner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ConstructionBanner />
      <Header />
      <main>
        <Hero />
        {/* Additional sections will be added here */}
      </main>
    </div>
  );
}
