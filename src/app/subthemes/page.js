import Header from "@/components/Header";
import Subthemes from "@/sections/Subthemes";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Subthemes - ICONFST'25",
  description: "Explore the conference subthemes covering AI, circular economy, and sustainable technology solutions.",
};

export default function SubthemesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Subthemes />
      </main>
      <Footer />
    </div>
  );
}