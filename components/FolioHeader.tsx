"use client";

import { motion } from "framer-motion";

interface FolioHeaderProps {
  folio: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}

/**
 * Cabeçalho de seção usado em todo o site.
 * O número de fólio ("fls. 0X") referencia a paginação carimbada nos autos
 * de um processo jurídico brasileiro — o elemento de assinatura visual
 * que costura a identidade do site, fólio a fólio, do início ao fim.
 */
export default function FolioHeader({
  folio,
  eyebrow,
  title,
  description,
  align = "center",
}: FolioHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-14 sm:mb-16 ${isCenter ? "text-center" : "text-left"}`}
    >
      <div
        className={`flex items-center gap-3 mb-5 ${isCenter ? "justify-center" : "justify-start"}`}
      >
        <span className="folio-mark text-[11px] text-brass/50">{folio}</span>
        <span className="h-px w-8 bg-brass/30" aria-hidden="true" />
        <span className="text-brass text-[11px] tracking-[0.32em] uppercase">{eyebrow}</span>
      </div>
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-parchment font-serif leading-[1.05] ${
          isCenter ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 text-parchment-muted text-base sm:text-lg leading-relaxed ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
