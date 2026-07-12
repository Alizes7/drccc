"use client";

import { motion } from "framer-motion";
import SectionShell from "./SectionShell";

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutSection() {
  return (
    <SectionShell id="sobre" className="bg-ivory">
      {/* Onda top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path d="M0,0 C360,80 1080,0 1440,60 L1440,0 Z" fill="white" />
        </svg>
        <svg viewBox="0 0 1440 80" className="absolute top-0 w-full" preserveAspectRatio="none">
          <path d="M0,0 C360,80 1080,0 1440,60" fill="none" stroke="rgba(184,137,59,0.16)" strokeWidth="1" />
        </svg>
      </div>

      {/* Onda bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path d="M0,0 C360,80 1080,0 1440,60 L1440,0 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Layout assimétrico: copy + bloco visual grande à direita */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-start">

          {/* Esquerda */}
          <div>
            <motion.p {...v(0)} className="font-mono text-[10px] tracking-[0.32em] text-gold uppercase mb-6">
              Quem somos
            </motion.p>
            <motion.h2 {...v(0.1)} className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-light text-ink leading-[1.08] mb-10">
              Nascemos em São Paulo.<br/>
              Crescemos com<br/>
              <em className="text-gold-gradient not-italic">quem constrói aqui.</em>
            </motion.h2>

            <motion.p {...v(0.18)} className="text-muted text-[17px] leading-[1.85] mb-6">
              Em 2004, a Dra. Karla Ronqui deixou um dos maiores escritórios do país com uma
              convicção: empresas paulistanas precisavam de um advogado que entendesse
              de negócios antes de falar em lei. Que soubesse que prazo em contrato e
              prazo em M&A são coisas completamente diferentes.
            </motion.p>
            <motion.p {...v(0.24)} className="text-muted text-[17px] leading-[1.85] mb-6">
              Vinte anos depois, o DRC Advogados atendeu desde o empreendedor que
              estava abrindo sua primeira empresa até o grupo que negociava uma fusão
              de R$ 400 milhões. Cada caso, tratado como se fosse o único.
            </motion.p>
            <motion.p {...v(0.3)} className="text-muted text-[17px] leading-[1.85] mb-10">
              Nosso escritório fica no coração da Cidade Monções — não por acaso,
              no mesmo bairro onde habitam muitas das empresas que assessoramos.
              A proximidade é intencional.
            </motion.p>

            <motion.div {...v(0.38)} className="flex items-start gap-8 pt-8"
              style={{ borderTop: "1px solid rgba(184,137,59,0.15)" }}>
              <div>
                <div className="font-serif text-3xl font-light text-gold">2004</div>
                <div className="font-mono text-[9px] tracking-wider text-muted uppercase mt-1">Fundação</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-light text-gold">SP</div>
                <div className="font-mono text-[9px] tracking-wider text-muted uppercase mt-1">Cidade Monções</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-light text-gold">OAB</div>
                <div className="font-mono text-[9px] tracking-wider text-muted uppercase mt-1">Registrado</div>
              </div>
            </motion.div>
          </div>

          {/* Direita — três pilares empilhados com espaçamento variado */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="lg:pt-16 space-y-0 divide-y"
            style={{ borderColor: "rgba(184,137,59,0.14)" }}
          >
            {[
              {
                n: "01",
                title: "Atuação Nacional",
                body: "Escritório em São Paulo, clientes do Pará ao Rio Grande do Sul. Quando o caso exige presença fora de SP, a gente vai."
              },
              {
                n: "02",
                title: "Visão de Negócio",
                body: "Formação jurídica rigorosa somada a vivência real no mercado corporativo. Falamos a língua do CFO e a do CEO ao mesmo tempo."
              },
              {
                n: "03",
                title: "Ética sem negociação",
                body: "Já recusamos casos que não poderíamos defender com integridade. E recusaremos de novo. Isso define quem somos."
              },
            ].map((p) => (
              <div key={p.n} className="group py-8 first:pt-0 last:pb-0 flex gap-5 items-start cursor-default">
                <span className="font-mono text-[10px] text-gold/50 pt-1 flex-shrink-0">{p.n}</span>
                <div>
                  <h3 className="font-serif text-xl font-medium text-ink mb-2 group-hover:text-gold transition-colors duration-300">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}

            <div className="pt-8">
              <a href="#contato" className="inline-flex items-center gap-3 text-gold text-[11px] tracking-[0.18em] uppercase group focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                Fale diretamente conosco
                <span className="h-px w-7 bg-gold transition-all duration-300 group-hover:w-12" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
