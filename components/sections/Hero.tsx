import Hero3D from "@/components/Hero3D";

const WHATSAPP_NUMBER = "5511000000000"; // TODO: substituir pelo número real
const WHATSAPP_MESSAGE = "Olá, gostaria de agendar uma conversa com a DRC Advogados.";

export default function Hero() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-ivory">
      <div className="absolute inset-0">
        <Hero3D />
      </div>

      <div className="relative z-10 w-full">
        <div className="container-editorial">
          <div className="max-w-xl py-32 md:py-0">
            <p className="eyebrow mb-6">DRC Advogados</p>
            <h1 className="text-4xl leading-tight text-charcoal md:text-6xl">
              Advocacia corporativa com rigor e discrição.
            </h1>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-charcoal/70 md:text-lg">
              Assessoria jurídica empresarial pautada por técnica, clareza e
              compromisso com cada relação de confiança.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Fale conosco
              </a>
              <a href="#contato" className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest2 text-charcoal/80 underline decoration-gold underline-offset-8 transition-colors hover:text-charcoal">
                Agendar uma conversa
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
