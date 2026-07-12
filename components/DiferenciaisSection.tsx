"use client";

import { motion } from "framer-motion";

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// Seção "Valores" — substitui o grid genérico 01-04
export default function DiferenciaisSection() {
  return (
    <section id="diferenciais" className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#F1EBE0" }}>
      {/* Ondas top/bottom */}
      {[false, true].map((bottom) => (
        <div key={String(bottom)} className={`absolute ${bottom ? "bottom-0 rotate-180" : "top-0"} left-0 right-0 pointer-events-none overflow-hidden`} aria-hidden="true">
          <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
            <path d={bottom ? "M0,60 C480,0 960,80 1440,20 L1440,0 L0,0 Z" : "M0,60 C480,0 960,80 1440,20 L1440,0 L0,0 Z"} fill="white" />
          </svg>
          <svg viewBox="0 0 1440 80" className={`absolute ${bottom ? "bottom-0" : "top-0"} w-full`} preserveAspectRatio="none">
            <path d="M0,60 C480,0 960,80 1440,20" fill="none" stroke="rgba(184,137,59,0.15)" strokeWidth="1" />
          </svg>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header — alinhado à esquerda, menos centrado que o padrão */}
        <div className="max-w-xl mb-16">
          <motion.p {...v(0)} className="font-mono text-[10px] tracking-[0.32em] text-gold uppercase mb-5">
            Por que o DRC
          </motion.p>
          <motion.h2 {...v(0.1)} className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-light text-ink leading-[1.08]">
            Pergunta honesta:<br/>
            <em className="text-gold-gradient not-italic">o que nos diferencia?</em>
          </motion.h2>
          <motion.p {...v(0.18)} className="mt-5 text-muted text-[16px] leading-relaxed">
            Não é a localização. Não é o tamanho. É a forma como encaramos cada caso.
          </motion.p>
        </div>

        {/* Layout em L — grande à esquerda + lista à direita, quebra simetria */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-px bg-gold/10 border border-gold/10">

          {/* Card destaque — ocupa mais espaço visualmente */}
          <motion.div {...v(0)} className="bg-ivory p-10 lg:p-14 relative group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="font-serif text-[56px] font-light text-gold/15 leading-none mb-6 select-none">01</div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink mb-4">
              Atendemos você,<br/>não o seu processo.
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              No DRC, o sócio que assina a proposta é o mesmo que aparece na audiência.
              Não tem repasse para júnior sem aviso. Não tem cliente que &quot;vira pasta&quot;.
              Parece básico — mas no mercado de SP, é raro.
            </p>
            <p className="text-sm text-muted/80 leading-relaxed italic">
              &quot;Fui cliente de escritório grande antes. Aqui é diferente — tenho
              o celular da Karla salvo. Isso tem valor.&quot; — cliente do setor de tecnologia, SP.
            </p>
          </motion.div>

          {/* Grid 3 cards menores à direita */}
          <div className="grid grid-rows-3 gap-px">
            {[
              {
                n: "02",
                title: "Velocidade sem descuido.",
                body: "Ambiente corporativo exige respostas rápidas. Desenvolvemos processos internos para isso. Pareceres urgentes em 24h. Contratos revisados no dia. Sem cobrar extra por isso."
              },
              {
                n: "03",
                title: "Prevenção primeiro.",
                body: "80% dos casos complexos que chegam até nós poderiam ter sido evitados. Parte do nosso trabalho é mudar essa lógica: atuar antes do problema virar crise."
              },
              {
                n: "04",
                title: "Resultados que fecham o ciclo.",
                body: "Não entregamos parecer e somimos. Acompanhamos a implementação, revisamos conforme o cenário muda, e ficamos disponíveis quando algo inesperado acontece."
              },
            ].map((item) => (
              <motion.div key={item.n} {...v(0.1)} className="bg-white p-7 lg:p-8 group relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-gold/50 pt-1 flex-shrink-0">{item.n}</span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-ink mb-2 group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
