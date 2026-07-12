"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, Building2, FileText, Gavel, Landmark, Shield,
  TrendingUp, Users, Scale, Globe, Lock, X, ArrowUpRight,
} from "lucide-react";

interface Area {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  detalhes: string[];
  sinal?: string; // detalhe humano
}

const areas: Area[] = [
  {
    icon: Briefcase,
    title: "Direito Empresarial",
    tagline: "Do planejamento à crise — estamos aqui.",
    description: "Assessoria completa para empresas em todos os momentos: fundação, crescimento, conflitos societários e reorganizações. Conhecemos o ecossistema paulistano por dentro.",
    detalhes: ["Planejamento societário e holding", "Fusões, aquisições e due diligence", "Governança corporativa", "Contratos comerciais estratégicos", "Conflitos entre sócios"],
    sinal: "Caso mais comum: sócios com visões diferentes sobre o futuro da empresa.",
  },
  {
    icon: Building2,
    title: "Direito Tributário",
    tagline: "Pagar o justo — nem mais, nem menos.",
    description: "Planejamento tributário que funciona na prática. Revisão de passivos fiscais, defesa em autuações e estruturação de operações para máxima eficiência dentro da lei.",
    detalhes: ["Planejamento tributário preventivo", "Recuperação de créditos fiscais", "Defesa em autuações da Receita", "Compliance tributário", "Reestruturação de passivos fiscais"],
    sinal: "Já identificamos créditos não aproveitados em 70% dos novos clientes que auditamos.",
  },
  {
    icon: FileText,
    title: "Contratos",
    tagline: "Escrito para ser cumprido — e para proteger quando não for.",
    description: "Elaboração, revisão e negociação de contratos que antecipam conflitos. Redigimos em linguagem que os dois lados entendem, sem abrir mão da robustez jurídica.",
    detalhes: ["Contratos comerciais e de prestação de serviços", "Joint ventures e parcerias estratégicas", "Contratos internacionais", "Revisão de minutas de terceiros", "Renegociação e distrato"],
    sinal: "Problema mais caro que vemos: cláusula de rescisão mal redigida.",
  },
  {
    icon: Gavel,
    title: "Contencioso Estratégico",
    tagline: "Quando o litígio é inevitável, estratégia vence técnica.",
    description: "Representação judicial e arbitral com visão de longo prazo. Buscamos acordos quando fazem sentido — e lutamos quando não fazem. Sem teatro, sem promessas vazias.",
    detalhes: ["Ações cíveis e comerciais de alta complexidade", "Tutelas de urgência e liminares", "Arbitragem nacional e internacional", "Execuções e cobranças estratégicas", "Recursos em tribunais superiores"],
    sinal: "Taxa de sucesso de 92% em contencioso empresarial nos últimos 3 anos.",
  },
  {
    icon: Landmark,
    title: "Direito Tributário Estadual e Municipal",
    tagline: "ICMS, ISS e tudo mais que ninguém quer lidar.",
    description: "Especialidade dentro do tributário: obrigações estaduais e municipais, substituição tributária, benefícios fiscais e defesa em autuações de Fazendas Estaduais.",
    detalhes: ["ICMS e substituição tributária", "ISS e conflitos municipais", "Benefícios fiscais e incentivos", "Defesa em autos de infração", "Recuperação de créditos estaduais"],
    sinal: "São Paulo tem uma das legislações tributárias estaduais mais complexas do país.",
  },
  {
    icon: Shield,
    title: "Proteção de Dados e LGPD",
    tagline: "Adequação real — não só um checklist.",
    description: "Adequação completa à LGPD com foco em mudança cultural, não apenas documentação. Mapeamento, políticas, treinamentos e resposta a incidentes de segurança.",
    detalhes: ["Diagnóstico de maturidade em privacidade", "Mapeamento e inventário de dados pessoais", "Políticas internas e treinamento de times", "DPO as a Service", "Resposta a incidentes e comunicação à ANPD"],
    sinal: "A Daniela foi certificada pela IAPP antes da LGPD entrar em vigor.",
  },
  {
    icon: TrendingUp,
    title: "Recuperação Judicial e Falência",
    tagline: "Crise não é o fim — é uma negociação.",
    description: "Assessoria em processos de recuperação judicial e extrajudicial, do diagnóstico ao plano aprovado pelos credores. Também atuamos na aquisição de ativos em processos de falência.",
    detalhes: ["Diagnóstico de viabilidade econômica", "Elaboração e negociação do plano", "Assembleias de credores", "Recuperação extrajudicial", "Aquisição de ativos em processos falimentares"],
    sinal: "Já conduzimos recuperações com dívidas entre R$ 2M e R$ 120M.",
  },
  {
    icon: Users,
    title: "Direito do Trabalho",
    tagline: "Prevenir custa dez vezes menos que defender.",
    description: "Consultoria trabalhista preventiva para empresas que não querem descobrir a lei no banco dos réus. Quando o processo é inevitável, defendemos com profundidade técnica.",
    detalhes: ["Auditoria e compliance trabalhista", "Políticas de RH juridicamente seguras", "Reestruturações e demissões coletivas", "Negociação coletiva com sindicatos", "Defesa em reclamações e ações civis"],
    sinal: "Clientes ativos há mais de 2 anos reduziram ações trabalhistas em média 60%.",
  },
  {
    icon: Scale,
    title: "Arbitragem e Mediação",
    tagline: "Resolução de conflitos sem arrastar pela Justiça.",
    description: "Representação em câmaras arbitrais e processos de mediação. Mais rápido, mais confidencial, e frequentemente mais eficiente que o judiciário para conflitos empresariais.",
    detalhes: ["Arbitragem na CAM-CCBC, CAMARB e FGV", "Mediação comercial pré-processual", "Redação e revisão de cláusulas arbitrais", "Execução de sentenças arbitrais", "Mediação em conflitos societários"],
    sinal: "O André atuou como árbitro em 12 procedimentos — conhece os dois lados da mesa.",
  },
  {
    icon: Globe,
    title: "Direito Internacional e Cross-Border",
    tagline: "Brasil tem suas especificidades. A gente conhece todas.",
    description: "Assessoria em operações transnacionais, contratos com partes estrangeiras e investimentos de grupos internacionais no Brasil — ou de empresas brasileiras no exterior.",
    detalhes: ["Estruturação de investimento estrangeiro", "Contratos internacionais e governing law", "Compliance anticorrupção (FCPA, UK Bribery Act)", "Planejamento fiscal de estruturas internacionais", "Repatriação de recursos e câmbio"],
    sinal: "Atendemos grupos de 8 países diferentes nos últimos 5 anos.",
  },
  {
    icon: Lock,
    title: "Direito Digital e Startups",
    tagline: "Para quem cresce rápido e não pode travar por questões jurídicas.",
    description: "Suporte jurídico para empresas de tecnologia, marketplaces e startups em crescimento. Estrutura societária, contratos com usuários, termos de uso, LGPD e captação de investimento.",
    detalhes: ["Vesting e stock options", "Termos de uso e política de privacidade", "Contratos SaaS e licenciamento", "Rodadas de investimento (SAFEs e Debêntures)", "Regulatório de fintechs e marketplaces"],
    sinal: "Já assessoramos três startups do acelerador da USP.",
  },
];

const v = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AreasSection() {
  const [selected, setSelected] = useState<Area | null>(null);

  useEffect(() => {
    if (!selected) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="areas" className="relative py-24 md:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,600 C300,500 700,650 1100,550" fill="none" stroke="rgba(184,137,59,0.06)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl mb-14">
          <motion.p {...v(0)} className="font-mono text-[10px] tracking-[0.32em] text-gold uppercase mb-5">
            Áreas de atuação
          </motion.p>
          <motion.h2 {...v(0.1)} className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-light text-ink leading-[1.08] mb-5">
            11 especialidades.<br/>
            <em className="text-gold-gradient not-italic">Uma equipe integrada.</em>
          </motion.h2>
          <motion.p {...v(0.18)} className="text-muted text-[16px] leading-relaxed">
            Não trabalhamos em silos. Um caso tributário que evolui para litígio
            tem o mesmo time cuidando — sem repasse, sem perda de contexto.
          </motion.p>
        </div>

        {/* Grid assimétrico: 3 colunas em desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area, i) => (
            <motion.button
              key={area.title}
              {...v(Math.min(i, 5) * 0.06)}
              onClick={() => setSelected(area)}
              className="group relative text-left p-7 bg-white border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 overflow-hidden"
              style={{ borderColor: "rgba(184,137,59,0.18)" }}
              aria-label={`Ver detalhes: ${area.title}`}
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />

              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 flex items-center justify-center border transition-all duration-300 group-hover:border-gold/60 group-hover:bg-gold/5"
                  style={{ borderColor: "rgba(184,137,59,0.22)" }}>
                  <area.icon className="w-[18px] h-[18px] text-gold" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-faint group-hover:text-gold transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </div>

              <h3 className="font-serif text-xl font-medium text-ink mb-1 group-hover:text-gold transition-colors duration-300 leading-snug">
                {area.title}
              </h3>
              <p className="font-mono text-[9px] tracking-wider text-gold/60 mb-3 uppercase">{area.tagline}</p>
              <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">{area.description}</p>
              <span className="font-mono text-[9px] tracking-[0.2em] text-gold/60 uppercase">Ver detalhes →</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(26,23,20,0.55)", backdropFilter: "blur(5px)" }}
            onClick={() => setSelected(null)}
            role="dialog" aria-modal="true" aria-labelledby="modal-area-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-white p-8 sm:p-10 shadow-gold-lg"
              style={{ borderTop: "2px solid #B8893B" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)}
                className="absolute top-5 right-5 text-faint hover:text-gold transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                aria-label="Fechar">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 flex items-center justify-center border border-gold/30">
                  <selected.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 id="modal-area-title" className="font-serif text-2xl font-medium text-ink leading-tight">{selected.title}</h3>
                  <p className="font-mono text-[9px] tracking-wider text-gold/70 uppercase mt-0.5">{selected.tagline}</p>
                </div>
              </div>

              <p className="text-muted leading-relaxed mb-6">{selected.description}</p>

              <p className="font-mono text-[9px] tracking-[0.22em] text-gold uppercase mb-4">O que fazemos</p>
              <ul className="space-y-3 mb-6">
                {selected.detalhes.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-1.5" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>

              {selected.sinal && (
                <div className="mb-7 p-4 bg-ivory border-l-2 border-gold">
                  <p className="text-sm text-muted/80 italic font-serif">{selected.sinal}</p>
                </div>
              )}

              <a href="https://wa.me/5511912252450" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-white text-[11px] tracking-[0.16em] uppercase hover:bg-gold-deep transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2">
                Falar com especialista
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
