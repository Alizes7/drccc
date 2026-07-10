// Nomes reais fornecidos pelo cliente. Área de atuação e foto de cada sócio(a)
// são PLACEHOLDERS — substitua por dados reais e fotos oficiais antes de publicar.
// Não incluir números de OAB fictícios (conforme restrição de conformidade).

export interface TeamMember {
  id: string;
  name: string;
  role: string; // ex: "área de atuação" — placeholder, confirmar com o cliente
  photo: string;
}

export const team: TeamMember[] = [
  {
    id: "karla-ronqui",
    name: "Dra. Karla Ronqui",
    role: "Área de atuação a confirmar",
    photo: "/team/placeholder.jpg",
  },
  {
    id: "andre-coelho",
    name: "Dr. André Coelho",
    role: "Área de atuação a confirmar",
    photo: "/team/placeholder.jpg",
  },
  {
    id: "daniela-alves",
    name: "Dra. Daniela Alves",
    role: "Área de atuação a confirmar",
    photo: "/team/placeholder.jpg",
  },
  {
    id: "leonardo-landim",
    name: "Dr. Leonardo Landim",
    role: "Área de atuação a confirmar",
    photo: "/team/placeholder.jpg",
  },
];
