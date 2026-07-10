"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      company: data.get("company"), // honeypot field
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg("Não foi possível enviar sua mensagem. Tente novamente.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Não foi possível enviar sua mensagem. Verifique sua conexão.");
    }
  }

  if (status === "success") {
    return (
      <p className="font-sans text-charcoal/80">
        Mensagem recebida. Retornaremos o contato em breve.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot field — hidden from real users, visible to bots that fill every field. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Empresa</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="eyebrow mb-2 block">Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="w-full border-b border-charcoal/20 bg-transparent py-3 font-sans text-charcoal outline-none transition-colors focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="email" className="eyebrow mb-2 block">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border-b border-charcoal/20 bg-transparent py-3 font-sans text-charcoal outline-none transition-colors focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="message" className="eyebrow mb-2 block">Mensagem</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={4}
          className="w-full border-b border-charcoal/20 bg-transparent py-3 font-sans text-charcoal outline-none transition-colors focus:border-gold"
        />
      </div>

      {status === "error" && errorMsg && (
        <p role="alert" className="font-sans text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold disabled:opacity-50"
      >
        {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
