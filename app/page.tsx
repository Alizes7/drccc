import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
