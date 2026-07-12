"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, CheckCircle, AlertCircle, Loader } from "lucide-react";

// ─── Sanitize helper ─────────────────────────────────────────────────────────
// Strips HTML tags and trims whitespace — prevents stored XSS if backend ever
// echoes back user input.
function sanitize(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim().slice(0, 2000);
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
function validatePhone(phone: string): boolean {
  return phone === "" || /^[\d\s\-\+\(\)]{7,20}$/.test(phone);
}

// ─── Rate-limit: 1 submission per 30s (client-side guard) ────────────────────
const RATE_LIMIT_MS = 30_000;

const CONTACT_FORM_ENDPOINT = (() => {
  const configured = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim();
  if (!configured) return null;

  try {
    const endpoint = new URL(configured);
    if (endpoint.protocol !== "https:" || endpoint.hostname !== "formspree.io") return null;
    return endpoint.toString();
  } catch {
    return null;
  }
})();

// ─── Secure form component ────────────────────────────────────────────────────
function SecureContactForm() {
  const [status,  setStatus]  = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const lastSubmit = useRef<number>(0);

  const inputCls = (field: string) =>
    `w-full bg-ivory border px-4 py-3.5 text-ink text-sm focus:outline-none transition-colors placeholder:text-faint ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "focus:border-gold"
    }`;
  const borderStyle = (field: string) =>
    errors[field] ? {} : { borderColor: "rgba(184,137,59,0.2)" };

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ── Rate-limit guard ──────────────────────────────────────────────────────
    const now = Date.now();
    if (now - lastSubmit.current < RATE_LIMIT_MS) {
      setErrors({ _form: `Aguarde ${Math.ceil((RATE_LIMIT_MS - (now - lastSubmit.current)) / 1000)}s antes de reenviar.` });
      return;
    }

    const fd   = new FormData(e.currentTarget);
    const nome      = sanitize(fd.get("nome")      as string ?? "");
    const email     = sanitize(fd.get("email")     as string ?? "");
    const telefone  = sanitize(fd.get("telefone")  as string ?? "");
    const mensagem  = sanitize(fd.get("mensagem")  as string ?? "");
    const honeypot  = fd.get("_hp") as string ?? "";

    // ── Honeypot check (bot detection) ────────────────────────────────────────
    if (honeypot !== "") {
      // Bot filled hidden field — silently succeed to not reveal detection
      setStatus("success");
      return;
    }

    // ── Field validation ──────────────────────────────────────────────────────
    const errs: Record<string, string> = {};
    if (!nome || nome.length < 2)          errs.nome     = "Informe seu nome completo.";
    if (!email || !validateEmail(email))   errs.email    = "E-mail inválido.";
    if (!validatePhone(telefone))          errs.telefone = "Telefone inválido.";
    if (!mensagem || mensagem.length < 10) errs.mensagem = "Mensagem muito curta (mín. 10 caracteres).";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (!CONTACT_FORM_ENDPOINT) {
      setErrors({ _form: "O formulario online esta temporariamente indisponivel. Fale conosco pelo WhatsApp." });
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("loading");
    lastSubmit.current = Date.now();

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, mensagem }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      setStatus("error");
    }
  }, []);

  if (status === "success") {
    return (
      <div className="relative p-10 flex flex-col items-center justify-center text-center min-h-[400px]" style={{ borderTop: "2px solid #B8893B" }}>
        <CheckCircle className="w-12 h-12 text-gold mb-5" strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-ink mb-3">Mensagem enviada!</h3>
        <p className="text-muted text-sm max-w-xs">Em breve nossa equipe entrará em contato. Obrigado.</p>
        <button onClick={() => setStatus("idle")} className="mt-8 text-[10px] tracking-wider font-mono text-gold uppercase underline-offset-4 hover:underline cursor-pointer">
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      className="relative"
      aria-label="Formulário de contato"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />

      {/* Honeypot — oculto visualmente e de leitores de tela (anti-spam) */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label htmlFor="_hp">Deixe em branco</label>
        <input id="_hp" name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="pt-8 space-y-5 sm:space-y-6">
        {errors._form && (
          <div role="alert" className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {errors._form}
          </div>
        )}

        {!CONTACT_FORM_ENDPOINT && (
          <div role="status" className="border border-gold/20 bg-ivory p-3 text-xs leading-relaxed text-muted">
            O envio online sera ativado apos a configuracao segura do canal. Para atendimento imediato, use o WhatsApp ou o e-mail ao lado.
          </div>
        )}

        <div>
          <label htmlFor="nome" className="block font-mono text-[10px] tracking-[0.22em] text-muted uppercase mb-2">
            Nome <span className="text-gold" aria-hidden>*</span>
          </label>
          <input id="nome" name="nome" type="text" required autoComplete="name"
            aria-required="true" aria-describedby={errors.nome ? "nome-error" : undefined}
            className={inputCls("nome")} style={borderStyle("nome")}
            placeholder="Seu nome completo"
            maxLength={120}
          />
          {errors.nome && <p id="nome-error" role="alert" className="mt-1 text-red-500 text-[11px]">{errors.nome}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block font-mono text-[10px] tracking-[0.22em] text-muted uppercase mb-2">
            E-mail <span className="text-gold" aria-hidden>*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email"
            aria-required="true" aria-describedby={errors.email ? "email-error" : undefined}
            className={inputCls("email")} style={borderStyle("email")}
            placeholder="seu@email.com"
            maxLength={254}
          />
          {errors.email && <p id="email-error" role="alert" className="mt-1 text-red-500 text-[11px]">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="telefone" className="block font-mono text-[10px] tracking-[0.22em] text-muted uppercase mb-2">Telefone</label>
          <input id="telefone" name="telefone" type="tel" autoComplete="tel"
            aria-describedby={errors.telefone ? "tel-error" : undefined}
            className={inputCls("telefone")} style={borderStyle("telefone")}
            placeholder="(11) 99999-9999"
            maxLength={20}
          />
          {errors.telefone && <p id="tel-error" role="alert" className="mt-1 text-red-500 text-[11px]">{errors.telefone}</p>}
        </div>

        <div>
          <label htmlFor="mensagem" className="block font-mono text-[10px] tracking-[0.22em] text-muted uppercase mb-2">
            Mensagem <span className="text-gold" aria-hidden>*</span>
          </label>
          <textarea id="mensagem" name="mensagem" rows={4} required
            aria-required="true" aria-describedby={errors.mensagem ? "msg-error" : undefined}
            className={inputCls("mensagem")} style={borderStyle("mensagem")}
            placeholder="Descreva sua necessidade…"
            maxLength={2000}
          />
          {errors.mensagem && <p id="msg-error" role="alert" className="mt-1 text-red-500 text-[11px]">{errors.mensagem}</p>}
        </div>

          <button
            type="submit"
            disabled={status === "loading" || !CONTACT_FORM_ENDPOINT}
          className="w-full py-4 bg-gold text-white text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-gold-deep transition-colors duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <><Loader className="w-4 h-4 animate-spin" /> Enviando…</>
          ) : "Enviar Mensagem"}
        </button>

          {status === "error" && (
          <p role="alert" className="text-center text-red-500 text-xs flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Falha ao enviar. Tente via <a href="https://wa.me/5511912252450" className="underline text-gold ml-1" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
          </p>
        )}

        <p className="text-center text-faint text-[10px] leading-relaxed">
          Ao enviar, você concorda com nossa{" "}
          <a href="#privacidade" className="text-gold hover:underline">Política de Privacidade</a>.
          Seus dados são tratados com confidencialidade conforme a{" "}
          <abbr title="Lei Geral de Proteção de Dados">LGPD</abbr>.
        </p>
      </div>
    </form>
  );
}

const contatos = [
  { icon: Phone,   label: "Telefone",  valor: "+55 11 91225-2450",              href: "tel:+5511912252450" },
  { icon: Mail,    label: "E-mail",    valor: "contato@drcadvogados.com.br",     href: "mailto:contato@drcadvogados.com.br" },
  { icon: MapPin,  label: "Endereço",  valor: "R. Dr. Geraldo Campos Moreira, 164, Cj 134 — Cidade Monções, São Paulo/SP", href: "https://maps.app.goo.gl/r4WT8YNWsZGKSBeL8" },
  { icon: Clock,   label: "Horário",   valor: "Segunda a Sexta: 9h às 18h",     href: "#" },
];

const vUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ContactSection() {
  return (
    <section id="contato" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,550 C300,440 700,600 1100,480 C1300,420 1400,490 1600,460" fill="none" stroke="rgba(184,137,59,0.07)" strokeWidth="1" />
          <path d="M200,80 C450,30 700,130 1000,60 C1200,10 1350,90 1600,50" fill="none" stroke="rgba(184,137,59,0.06)" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-14">
          <motion.p {...vUp(0)} className="font-mono text-[10px] tracking-[0.32em] text-gold uppercase mb-5">Contato</motion.p>
          <motion.h2 {...vUp(0.1)} className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-light text-ink leading-[1.08] max-w-2xl">
            Entre em <em className="text-gold-gradient not-italic">contato.</em>
          </motion.h2>
          <motion.p {...vUp(0.18)} className="mt-4 text-muted max-w-lg leading-relaxed">
            Estamos prontos para atender suas necessidades jurídicas. Agende uma consulta com nossos especialistas.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {contatos.map((c, i) => (
                <motion.a
                  key={c.label}
                  {...vUp(i * 0.09)}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group p-5 bg-ivory border hover:border-gold/40 hover:shadow-card transition-all duration-300 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                  style={{ borderColor: "rgba(184,137,59,0.18)" }}
                  aria-label={`${c.label}: ${c.valor}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300 flex-shrink-0 mt-0.5">
                      <c.icon className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] tracking-wider text-faint uppercase mb-1">{c.label}</p>
                      <p className="text-sm text-ink/80 group-hover:text-gold transition-colors duration-300 leading-snug break-words">{c.valor}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Map */}
            <motion.div {...vUp(0.38)} className="relative border overflow-hidden" style={{ borderColor: "rgba(184,137,59,0.2)" }}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gold" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.080574905925!2d-46.695766423611765!3d-23.601443063067972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5763a80e948d%3A0xad297ab3eccff75f!2sDRC%20Advogados!5e0!3m2!1spt-BR!2sbr!4v1783386463738!5m2!1spt-BR!2sbr"
                width="100%" height="280" style={{ border: 0, filter: "grayscale(100%) contrast(90%)" }}
                allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
                title="Localização DRC Advogados"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
              <a
                href="https://maps.app.goo.gl/r4WT8YNWsZGKSBeL8"
                target="_blank" rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white border border-gold/30 text-gold text-[10px] tracking-wider uppercase hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                <ExternalLink className="w-3 h-3" />
                Ver no mapa
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div {...vUp(0.2)}>
            <SecureContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
