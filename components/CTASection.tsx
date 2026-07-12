"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-ink" aria-label="Chamada para ação">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,300 C300,200 700,350 1100,240" fill="none" stroke="rgba(184,137,59,0.10)" strokeWidth="1" />
        </svg>
        <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-gold/22" />
        <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-gold/22" />
      </div>

      {/* Onda top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path d="M0,20 C240,70 600,0 960,60 C1200,90 1350,20 1440,45 L1440,0 L0,0 Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="font-mono text-[10px] tracking-[0.35em] text-gold/60 uppercase mb-6">
          Próximo passo
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-light text-white leading-[1.1] mb-6">
          Tem um problema jurídico<br/>que está incomodando?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="text-white/55 text-[17px] leading-relaxed mb-10 max-w-xl mx-auto">
          A primeira conversa é sem compromisso. Nos mande uma mensagem agora — um
          de nossos sócios responde pessoalmente em até 24 horas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://wa.me/5511912252450"
            target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-gold text-white text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-gold-light transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-light focus-visible:outline-offset-4"
          >
            Falar pelo WhatsApp
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center justify-center px-9 py-4 border border-white/20 text-white/80 text-[11px] tracking-[0.16em] uppercase hover:border-gold/60 hover:text-white transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40 focus-visible:outline-offset-4"
          >
            Enviar e-mail
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 font-mono text-[9px] tracking-wider text-white/30 uppercase">
          Atendimento confidencial · OAB/SP registrado · Sigilo garantido
        </motion.p>
      </div>
    </section>
  );
}
