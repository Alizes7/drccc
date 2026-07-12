"use client";

import { motion } from "framer-motion";

// Full-bleed section com fundo escuro — quebra o ritmo das seções claras
export default function HistoriaSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-ink" aria-label="Nossa história">
      {/* Linhas douradas decorativas */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,400 C300,280 700,440 1100,320 C1300,260 1400,340 1600,300"
            fill="none" stroke="rgba(184,137,59,0.12)" strokeWidth="1" />
          <path d="M200,80 C450,30 700,130 1000,60 C1200,10 1350,90 1600,50"
            fill="none" stroke="rgba(184,137,59,0.08)" strokeWidth="1" />
        </svg>
        {/* Marcas de canto */}
        <div className="absolute top-10 left-10 w-10 h-10 border-t border-l border-gold/25" />
        <div className="absolute bottom-10 right-10 w-10 h-10 border-b border-r border-gold/25" />
      </div>

      {/* Onda top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C360,80 1080,0 1440,50 L1440,0 L0,0 Z" fill="#F1EBE0" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Layout: texto à esquerda, casos à direita */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-start">

          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-mono text-[10px] tracking-[0.32em] text-gold/70 uppercase mb-6">
              Valores que nos guiam
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-light text-white leading-[1.1] mb-8">
              O trabalho que<br/>
              <em className="text-gold-gradient not-italic">não aparece no contrato.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/60 text-[17px] leading-[1.85] mb-6">
              Há casos que a gente não pode citar — confidencialidade é sagrada aqui.
              Mas podemos dizer o que eles têm em comum: chegaram quando a situação
              já parecia sem saída.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-white/60 text-[17px] leading-[1.85] mb-12">
              Uma empresa de médio porte, bloqueada por uma liminar que ameaçava
              paralisar a operação. Um fundador que descobriu que o sócio havia
              transferido ativos de forma irregular. Um grupo internacional que
              entrou no Brasil sem entender as peculiaridades do direito do trabalho
              daqui. Cada um desses casos foi resolvido. Não sempre da forma mais
              rápida — mas sempre da forma certa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-8 pt-10"
              style={{ borderTop: "1px solid rgba(184,137,59,0.2)" }}>
              {[
                { n: "R$ 400M+", l: "em operações assessoradas" },
                { n: "92%", l: "de taxa de sucesso em contencioso" },
                { n: "< 48h", l: "para primeiro retorno em urgências" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-serif text-2xl sm:text-3xl font-light text-gold mb-1">{s.n}</div>
                  <div className="font-mono text-[9px] tracking-wider text-white/40 uppercase leading-snug">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bloco de valores — lista com traço lateral */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="space-y-0 lg:pt-16"
          >
            {[
              { titulo: "Honestidade sobre otimismo.", body: "Se o caso é difícil, a gente fala. Preferimos perder um cliente por sinceridade a ganhar um por ilusão." },
              { titulo: "Clareza na comunicação.", body: "Jurídico em português. Sempre. A lei é nossa, o entendimento é seu." },
              { titulo: "Comprometimento real.", body: "Quando assumimos um caso, ele vai conosco para o fim de semana se precisar." },
              { titulo: "Respeito pelo tempo do cliente.", body: "Reunião de 1h termina em 1h. Resposta esperada até sexta chega na sexta." },
            ].map((v, i) => (
              <div key={v.titulo}
                className="py-7 border-l-2 border-gold/30 pl-6 hover:border-gold transition-colors duration-300"
                style={{ borderBottom: i < 3 ? "1px solid rgba(184,137,59,0.1)" : "none" }}>
                <h3 className="font-serif text-lg font-medium text-white mb-2">{v.titulo}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
