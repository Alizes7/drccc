import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import AreasSection from "@/components/AreasSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import HistoriaSection from "@/components/HistoriaSection";
import EquipeSection from "@/components/EquipeSection";
import DepoimentosSection from "@/components/DepoimentosSection";
import ArtigosSection from "@/components/ArtigosSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <AreasSection />
        <DiferenciaisSection />
        <HistoriaSection />
        <EquipeSection />
        <DepoimentosSection />
        <ArtigosSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
