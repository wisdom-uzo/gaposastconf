import Header from "@/components/Header";
import Schedule from "@/sections/Schedule";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Schedule - ICONFST'25",
  description: "View the complete conference schedule for the 4-day International Conference on Science and Technology.",
};

export default function SchedulePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Schedule />
      </main>
      <Footer />
    </div>
  );
}