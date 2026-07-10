import ContactForm from "@/components/ContactForm";

const WHATSAPP_NUMBER = "5511000000000"; // TODO: substituir pelo número real
const ADDRESS_LINES = [
  "Av. [Endereço a confirmar], [nº]",
  "[Bairro] — São Paulo, SP",
  "[CEP]",
]; // TODO: substituir pelo endereço real do escritório

export default function Contact() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <section id="contato" className="border-t border-charcoal/10 bg-ivory-soft py-28">
      <div className="container-editorial">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Contato</p>
            <h2 className="text-3xl text-charcoal md:text-4xl">
              Agende uma conversa.
            </h2>

            <div className="mt-10 space-y-1 font-sans text-sm text-charcoal/70">
              {ADDRESS_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex font-sans text-sm uppercase tracking-widest2 text-gold-dark underline underline-offset-8"
            >
              WhatsApp
            </a>
          </div>

          <div className="md:col-span-6 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
