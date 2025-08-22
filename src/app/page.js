import Header from "@/components/Header";
import Hero from "@/sections/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        {/* Additional sections will be added here */}
      </main>
    </div>
  );
}
