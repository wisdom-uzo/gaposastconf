import Header from "@/components/Header";
import About from "@/sections/About";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About - ICONFST'25",
  description: "Learn about the International Conference on Science and Technology focusing on AI and Circular Economy solutions.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
}