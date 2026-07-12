"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const depoimentos = [
  {
    texto: "Já passei por três escritórios antes de chegar no DRC. A diferença é simples: aqui eles realmente leem o contrato. Todo ele. E quando identificam um problema, explicam em português — sem enrolação.",
    autor: "Ricardo Motta",
    cargo: "Diretor de Operações",
    empresa: "Logtech Brasil",
    segmento: "Tecnologia",
  },
  {
    texto: "A Karla nos salvou de uma autuação fiscal de R$ 4,3 milhões. Não é exagero dizer que o planejamento tributário que ela estruturou mudou o nosso caixa para sempre. Contratamos o escritório para uma questão pontual — cinco anos depois, ainda estamos juntos.",
    autor: "Fernanda Kishimoto",
    cargo: "CFO",
    empresa: "Grupo Inovare",
    segmento: "Varejo · São Paulo",
  },
  {
    texto: "Quando a empresa entrou em recuperação judicial, eu estava convicto de que era o fim. O André me fez entender que era um recomeço. E assim foi. Dois anos depois, zeramos as dívidas e voltamos a crescer. Esse escritório trabalha com você, não para você.",
    autor: "Paulo Salave'a",
    cargo: "Fundador e CEO",
    empresa: "Construtora Meridiano",
    segmento: "Construção Civil",
  },
  {
    texto: "Contratamos a Daniela para adequação à LGPD. Ela entregou o trabalho no prazo, dentro do orçamento e — o mais raro — sem criar burocracia desnecessária. Meu time passou a entender a lei, não só a cumprir formulários. Isso tem valor real.",
    autor: "Ana Beatriz Carvalho",
    cargo: "Sócia-fundadora",
    empresa: "Carvalho & Menezes Consultores",
    segmento: "Consultoria · RJ",
  },
];

export default function DepoimentosSection() {
  const [cur, setCur] = useState(0);
  const next = useCallback(() => setCur((p) => (p + 1) % depoimentos.length), []);
  const prev = useCallback(() => setCur((p) => (p - 1 + depoimentos.length) % depoimentos.length), []);
  useEffect(() => { const t = setInterval(next, 7000); return () => clearInterval(t); }, [next]);

  const d = depoimentos[cur];

  return (
    <section id="depoimentos" className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#F8F4EC" }}>
      {/* Ondas */}
      {[false, true].map((bottom) => (
        <div key={String(bottom)} className={`absolute ${bottom ? "bottom-0" : "top-0"} left-0 right-0 pointer-events-none overflow-hidden ${bottom ? "" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 1440 80" className={`w-full ${bottom ? "rotate-180" : ""}`} preserveAspectRatio="none">
            <path d="M0,40 C360,0 1080,80 1440,30 L1440,0 L0,0 Z" fill="white" />
          </svg>
          <svg viewBox="0 0 1440 80" className={`absolute ${bottom ? "bottom-0 rotate-180" : "top-0"} w-full`} preserveAspectRatio="none">
            <path d="M0,40 C360,0 1080,80 1440,30" fill="none" stroke="rgba(184,137,59,0.14)" strokeWidth="1" />
          </svg>
        </div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        {/* Label */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.32em] text-gold uppercase mb-5 text-center">
          O que dizem nossos clientes
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl sm:text-5xl font-light text-ink mb-14 leading-[1.1] text-center">
          Resultados que<br/><em className="text-gold-gradient not-italic">falam por nós.</em>
        </motion.h2>

        {/* Carrossel */}
        <div className="relative">
          <div className="font-serif text-[96px] leading-none text-gold/12 select-none text-center mb-0">&ldquo;</div>

          <AnimatePresence mode="wait">
            <motion.div key={cur}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
              className="text-center px-4"
            >
              <p className="font-serif text-xl sm:text-[22px] font-light text-ink/80 leading-[1.65] mb-10 italic">
                &ldquo;{d.texto}&rdquo;
              </p>

              {/* Atribuição */}
              <div className="inline-flex flex-col items-center gap-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-px w-8" style={{ background: "rgba(184,137,59,0.35)" }} />
                  <div className="h-1 w-1 rounded-full bg-gold/40" />
                  <div className="h-px w-8" style={{ background: "rgba(184,137,59,0.35)" }} />
                </div>
                <p className="font-serif text-lg font-medium text-ink">{d.autor}</p>
                <p className="text-muted text-sm">{d.cargo} · <span className="text-ink/60">{d.empresa}</span></p>
                <p className="font-mono text-[9px] tracking-wider text-gold/70 uppercase mt-1">{d.segmento}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles */}
          <div className="flex items-center justify-center gap-5 mt-12">
            <button onClick={prev}
              className="w-10 h-10 flex items-center justify-center border border-gold/30 text-muted hover:border-gold hover:text-gold transition-all duration-250 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Depoimento anterior">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {depoimentos.map((_, i) => (
                <button key={i} onClick={() => setCur(i)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${i === cur ? "bg-gold w-7" : "bg-gold/22 w-4"}`}
                  aria-label={`Depoimento ${i + 1}`} aria-current={i === cur ? "true" : undefined} />
              ))}
            </div>
            <button onClick={next}
              className="w-10 h-10 flex items-center justify-center border border-gold/30 text-muted hover:border-gold hover:text-gold transition-all duration-250 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="Próximo depoimento">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
