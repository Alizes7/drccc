"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const equipe = [
  {
    nome: "Dra. Karla Ronqui",
    cargo: "Sócia Fundadora",
    area: "Direito Empresarial · Tributário",
    oab: "OAB/SP 234.891",
    img: "/karen.png",
    bio: "Formada pela PUC-SP, com especialização em Direito Tributário pela FGV. Antes de fundar o DRC em 2004, passou por dois dos maiores escritórios do país. Nos últimos cinco anos, liderou reestruturações societárias para grupos do setor de saúde e tecnologia. É palestrante frequente no CESA e no IBRADEMP.",
    detalhe: "Leitora compulsiva de contratos nas madrugadas de segunda.",
  },
  {
    nome: "Dr. André Coelho",
    cargo: "Sócio",
    area: "Contencioso Cível · Arbitragem",
    oab: "OAB/SP 278.340",
    img: "/andre.png",
    bio: "Especialista em litígios empresariais de alta complexidade. Foi assessor jurídico do TJSP por três anos antes de entrar para a advocacia privada. Hoje conduz casos na CAM-CCBC e no CAMARB. Responsável por reverter uma ação de R$ 28 milhões em favor de cliente do setor imobiliário em 2023.",
    detalhe: "Acredita que o maior ativo de um advogado é a reputação com o juiz adverso.",
  },
  {
    nome: "Dra. Daniela Alves",
    cargo: "Advogada Sênior",
    area: "Contratos · LGPD · Regulatório",
    oab: "OAB/SP 312.567",
    img: "/daniela.png",
    bio: "Especialista em proteção de dados desde antes da LGPD entrar em vigor. Certificada pela IAPP (CIPP/E). Conduziu o processo de adequação de mais de 40 empresas — de startups de fintech a redes varejistas com mais de 300 lojas. Palestrante no Data Privacy Brasil 2024.",
    detalhe: "Escreve contratos que as pessoas realmente conseguem entender.",
  },
  {
    nome: "Dr. Leonardo Landim",
    cargo: "Advogado",
    area: "Trabalhista · Direito do Consumidor",
    oab: "OAB/SP 389.214",
    img: "/leonardo.png",
    bio: "Especializado em relações coletivas de trabalho e contencioso trabalhista preventivo. Assessora RHs de empresas com mais de mil funcionários na criação de políticas que reduzem litígios. Redução comprovada de 60% em ações trabalhistas em clientes ativos por mais de dois anos.",
    detalhe: "Prefere resolver em mesa de negociação. Mas quando vai à audiência, ganha.",
  },
];

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function EquipeSection() {
  return (
    <section id="equipe" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,350 C300,250 700,420 1100,300 C1300,240 1400,310 1600,280"
            fill="none" stroke="rgba(184,137,59,0.06)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-14">
          <motion.p {...v(0)} className="font-mono text-[10px] tracking-[0.32em] text-gold uppercase mb-5">Nossa equipe</motion.p>
          <motion.h2 {...v(0.1)} className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-light text-ink leading-[1.06] max-w-2xl">
            Advogados de verdade.<br/>
            <em className="text-gold-gradient not-italic">Com nome e telefone.</em>
          </motion.h2>
          <motion.p {...v(0.18)} className="mt-5 text-muted max-w-lg text-[16px] leading-relaxed">
            Aqui você sempre sabe com quem está falando — e porque aquela pessoa foi escolhida para o seu caso.
          </motion.p>
        </div>

        {/* Layout editorial: 4 colunas em desktop, empilhado no mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-7">
          {equipe.map((m, i) => (
            <motion.article key={m.nome} {...v(i * 0.1)} className="group" aria-label={`Perfil: ${m.nome}`}>
              {/* Foto */}
              <div className="relative overflow-hidden mb-5" style={{ aspectRatio: "3/4" }}>
                <Image
                  src={m.img}
                  alt={`${m.nome}, ${m.cargo} — DRC Advogados`}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                {/* OAB badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm">
                  <span className="font-mono text-[8px] text-muted tracking-wider">{m.oab}</span>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-serif text-xl font-medium text-ink group-hover:text-gold transition-colors duration-300 mb-0.5">{m.nome}</h3>
              <p className="text-gold text-[12px] tracking-wide mb-1">{m.cargo}</p>
              <p className="font-mono text-[9px] text-muted/70 tracking-wider mb-4 uppercase">{m.area}</p>

              {/* Bio — aparece de forma discreta */}
              <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">{m.bio}</p>
              <p className="text-[12px] text-gold/70 italic font-serif">{m.detalhe}</p>
            </motion.article>
          ))}
        </div>

        <motion.div {...v(0.4)} className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <a href="https://www.instagram.com/drc.advogados/" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-3.5 border border-gold/40 text-gold text-[11px] tracking-[0.16em] uppercase hover:border-gold hover:bg-gold hover:text-white transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Siga no Instagram
          </a>
          <p className="text-muted text-[13px] font-serif italic">Atualizações semanais sobre o cenário jurídico empresarial.</p>
        </motion.div>
      </div>
    </section>
  );
}
