import HeroSequence from "@/components/HeroSequence";

const WHATSAPP_NUMBER = "5511000000000"; // TODO: substituir pelo número real
const WHATSAPP_MESSAGE = "Olá, gostaria de agendar uma conversa com a DRC Advogados.";

export default function Hero() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <HeroSequence>
      <div className="flex h-full items-center">
        <div className="container-editorial">
          <div className="max-w-xl">
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
    </HeroSequence>
  );
}
