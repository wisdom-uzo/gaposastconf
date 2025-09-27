import Header from "@/components/Header";
import Speakers from "@/sections/Speakers";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Speakers - ICONFST'25",
  description: "Meet our distinguished speakers and keynote presenters at the International Conference on Science and Technology.",
};

export default function SpeakersPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Speakers />
      </main>
      <Footer />
    </div>
  );
}