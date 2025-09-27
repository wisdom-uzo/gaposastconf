import Header from "@/components/Header";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact - ICONFST'25",
  description: "Get in touch with the conference organizers and find contact information for ICONFST'25.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}