"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const navLinks = [
  { name: "Areas de atuacao", href: "#areas" },
  { name: "Quem somos", href: "#sobre" },
  { name: "Diferenciais", href: "#diferenciais" },
  { name: "Equipe", href: "#equipe" },
  { name: "Contato", href: "#contato" },
];

const NAVBAR_HEIGHT = 80;

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");
  const raf = useRef<number | null>(null);

  const compute = useCallback(() => {
    const scrollY = window.scrollY + NAVBAR_HEIGHT + 24;
    let current = "";
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element && element.offsetTop <= scrollY) current = id;
    }
    setActive(current);
  }, [ids]);

  const onScroll = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(compute);
  }, [compute]);

  useEffect(() => {
    const initialFrame = requestAnimationFrame(compute);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [compute, onScroll]);

  return active;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionIds = navLinks.map((link) => link.href.slice(1));
  const active = useScrollSpy(sectionIds);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.72);
  }, []);

  useEffect(() => {
    const initialFrame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteudo
      </a>

      <nav
        role="navigation"
        aria-label="Navegacao principal"
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-marble/95 shadow-[0_1px_0_rgba(169,120,46,0.18),0_4px_24px_rgba(17,16,15,0.08)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex h-[72px] items-center justify-between sm:h-20">
            <a href="#inicio" aria-label="DRC Advogados - inicio" className="group flex shrink-0 items-center gap-3">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                <Image src="/logo.png" alt="DRC Advogados" fill priority sizes="48px" className="object-contain transition-opacity duration-300 group-hover:opacity-80" />
              </div>
              <div className="hidden select-none flex-col leading-none sm:flex">
                <span className="font-serif text-[15px] tracking-[0.22em] text-ink">DRC</span>
                <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.30em] text-muted">Advogados</span>
              </div>
            </a>

            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = active === id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative min-h-11 px-4 py-3 text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 ${isActive ? "text-gold" : "text-muted hover:text-ink"}`}
                  >
                    {link.name}
                    <span className={`absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300 ${isActive ? "w-4 opacity-100" : "w-0 opacity-0"}`} />
                  </a>
                );
              })}
            </div>

            <div className="hidden lg:block">
              <a
                href="https://wa.me/5511912252450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 border border-gold px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-gold transition-colors duration-300 hover:bg-gold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                Agendar consulta
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center text-gold lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div className={`h-px w-full bg-gold/25 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`} />
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-40 flex flex-col bg-marble" role="dialog" aria-modal="true" aria-label="Menu de navegacao">
          <div className="flex h-[72px] items-center border-b border-gold/20 px-5 sm:h-20">
            <div className="relative h-10 w-10">
              <Image src="/logo.png" alt="DRC Advogados" fill sizes="40px" className="object-contain" />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-14 items-center px-8 font-serif text-2xl font-light transition-colors duration-200 ${active === link.href.slice(1) ? "text-gold" : "text-ink hover:text-gold"}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/5511912252450"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-8 inline-flex min-h-12 items-center border border-gold px-10 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-gold transition-colors duration-300 hover:bg-gold hover:text-white"
            >
              Agendar consulta
            </a>
          </div>
        </div>
      )}
    </>
  );
}
