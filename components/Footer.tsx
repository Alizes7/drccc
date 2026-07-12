"use client";

import Image from "next/image";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { name: "Áreas de Atuação", href: "#areas" },
  { name: "Quem Somos",       href: "#sobre" },
  { name: "Nossa Equipe",     href: "#equipe" },
  { name: "Depoimentos",      href: "#depoimentos" },
  { name: "Contato",          href: "#contato" },
];
const areas = [
  "Direito Empresarial",
  "Direito Societário",
  "Contratos",
  "Contencioso Estratégico",
  "Direito Tributário",
  "LGPD e Proteção de Dados",
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-ivory border-t overflow-hidden" style={{ borderColor: "rgba(184,137,59,0.18)" }}>
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(184,137,59,0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.1fr] gap-10 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 flex-shrink-0">
                <Image src="/logo.png" alt="DRC Advogados" fill className="object-contain" sizes="44px" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[14px] tracking-[0.22em] text-ink">DRC</span>
                <span className="font-mono text-[8px] tracking-[0.28em] text-muted uppercase mt-0.5">Advogados</span>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4 max-w-xs">
              Advocacia empresarial de alto padrão desde 2004.
              Escritório em São Paulo — atendimento nacional.
            </p>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 border border-gold/30 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-[7px] text-gold font-medium">OAB</span>
              </div>
              <span className="font-mono text-[9px] text-muted tracking-wide">OAB/SP · Sociedade de Advogados</span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { href: "https://www.instagram.com/drc.advogados/", label: "Instagram DRC Advogados", Icon: Instagram },
                { href: "https://www.linkedin.com/",                label: "LinkedIn DRC Advogados",  Icon: Linkedin },
                { href: "mailto:contato@drcadvogados.com.br",       label: "E-mail DRC Advogados",    Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 flex items-center justify-center border border-gold/22 text-muted hover:border-gold hover:text-gold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                  aria-label={label}>
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase mb-5">Navegação</h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="text-sm text-muted hover:text-gold transition-colors duration-250">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase mb-5">Especialidades</h3>
            <ul className="space-y-3">
              {areas.map((a) => (
                <li key={a}>
                  <a href="#areas" className="text-sm text-muted hover:text-gold transition-colors duration-250">{a}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase mb-5">Fale Conosco</h3>
            <ul className="space-y-4 mb-6">
              <li>
                <a href="https://wa.me/5511912252450" target="_blank" rel="noopener noreferrer"
                  className="group flex gap-3 text-sm text-muted hover:text-gold transition-colors" aria-label="WhatsApp DRC Advogados">
                  <Phone className="w-4 h-4 text-gold/60 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>+55 11 91225-2450<br/><span className="font-mono text-[9px] tracking-wider text-gold/60 group-hover:text-gold uppercase">WhatsApp disponível</span></span>
                </a>
              </li>
              <li className="flex gap-3 text-sm text-muted">
                <Mail className="w-4 h-4 text-gold/60 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <a href="mailto:contato@drcadvogados.com.br" className="hover:text-gold transition-colors break-all">contato@drcadvogados.com.br</a>
              </li>
              <li className="flex gap-3 text-sm text-muted">
                <MapPin className="w-4 h-4 text-gold/60 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>R. Dr. Geraldo Campos Moreira, 164, Cj 134<br/>Cidade Monções · São Paulo/SP</span>
              </li>
            </ul>
            {/* WhatsApp CTA destacado */}
            <a href="https://wa.me/5511912252450" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-[10px] tracking-wider font-medium uppercase hover:bg-[#1da851] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#25D366] focus-visible:outline-offset-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.562 4.137 1.537 5.872L0 24l6.323-1.522A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.031-1.383l-.36-.215-3.754.904.946-3.659-.235-.374A9.819 9.819 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-7 border-t flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(184,137,59,0.14)" }}>
          <p className="text-xs text-faint">© {year} DRC Advogados. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-faint hover:text-gold transition-colors">Política de Privacidade</a>
            <a href="#" className="text-xs text-faint hover:text-gold transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
