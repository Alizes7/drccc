// ATENÇÃO: O briefing menciona "as 10 áreas confirmadas do escritório (usar os
// nomes reais já definidos no projeto)", mas esses nomes não foram fornecidos
// nos arquivos enviados. A lista abaixo é um placeholder de áreas típicas de
// um escritório de advocacia corporativa em São Paulo — SUBSTITUA pelos nomes
// reais e definitivos antes de publicar, para não violar o Código de Ética da OAB
// com informação imprecisa sobre atuação.

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
}

export const practiceAreas: PracticeArea[] = [
  {
    id: "societario",
    title: "Direito Societário",
    description:
      "Estruturação, governança e operações societárias para empresas em todas as fases de maturidade.",
  },
  {
    id: "ma",
    title: "Fusões e Aquisições",
    description:
      "Assessoria em operações de M&A, due diligence e reorganizações corporativas.",
  },
  {
    id: "contratos",
    title: "Contratos Empresariais",
    description:
      "Elaboração, revisão e negociação de contratos comerciais e civis.",
  },
  {
    id: "tributario",
    title: "Direito Tributário",
    description:
      "Planejamento tributário e assessoria em obrigações fiscais empresariais.",
  },
  {
    id: "trabalhista",
    title: "Direito Trabalhista Empresarial",
    description:
      "Consultoria preventiva e representação em relações de trabalho corporativas.",
  },
  {
    id: "contencioso",
    title: "Contencioso Cível Empresarial",
    description:
      "Representação em disputas cíveis e comerciais complexas.",
  },
  {
    id: "compliance",
    title: "Compliance e Governança",
    description:
      "Estruturação de programas de integridade e conformidade regulatória.",
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade Intelectual",
    description:
      "Proteção de marcas, patentes e ativos intangíveis.",
  },
  {
    id: "imobiliario",
    title: "Direito Imobiliário Empresarial",
    description:
      "Assessoria em operações imobiliárias e incorporações.",
  },
  {
    id: "familia-empresarial",
    title: "Planejamento Patrimonial e Sucessório",
    description:
      "Estruturação patrimonial e sucessória para empresários e famílias empresárias.",
  },
];
