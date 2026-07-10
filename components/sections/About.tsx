export default function About() {
  return (
    <section id="sobre" className="border-t border-charcoal/10 bg-white py-28">
      <div className="container-editorial">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Sobre o escritório</p>
            <h2 className="text-3xl text-charcoal md:text-4xl">
              Uma prática construída sobre técnica e discrição.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="font-sans text-base leading-relaxed text-charcoal/75 md:text-lg">
              A DRC Advogados é um escritório de advocacia corporativa sediado
              em São Paulo, dedicado a assessorar empresas e empresários em
              questões jurídicas de natureza societária, contratual,
              tributária e regulatória. Nossa atuação é orientada por rigor
              técnico, atenção aos detalhes e compromisso com a relação de
              confiança estabelecida com cada cliente.
            </p>
            <p className="mt-6 font-sans text-base leading-relaxed text-charcoal/75 md:text-lg">
              Acreditamos que a advocacia empresarial de qualidade se
              constrói por meio de escuta atenta, análise criteriosa do
              contexto de cada operação e comunicação clara — sem promessas
              de resultado, em respeito às normas que regem o exercício da
              profissão.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
