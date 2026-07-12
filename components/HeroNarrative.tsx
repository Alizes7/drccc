"use client";

import { ArrowDown, ArrowRight } from "lucide-react";

type HeroNarrativeProps = {
  progress: number;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export default function HeroNarrative({ progress }: HeroNarrativeProps) {
  const copyOpacity = 1 - clamp01((progress - 0.64) / 0.24);
  const copyOffset = `${Math.round(progress * -18)}px`;
  const finalOpacity = clamp01((progress - 0.72) / 0.2);

  return (
    <div className="pointer-events-none mx-auto flex h-full w-full max-w-7xl items-end px-5 pb-28 pt-28 sm:px-8 sm:pb-20 lg:px-12">
      <div
        className="max-w-xl transition-[opacity,transform] duration-300 ease-out"
        style={{ opacity: copyOpacity, transform: `translateY(${copyOffset})` }}
      >
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.34em] text-gold">
          Sao Paulo / Desde 2004
        </p>
        <h1 className="max-w-[12ch] font-serif text-[clamp(2.8rem,6vw,5.75rem)] font-light leading-[0.94] tracking-[-0.02em] text-ink">
          Decisoes que sustentam o que vem depois.
        </h1>
        <p className="mt-7 max-w-md text-base leading-7 text-ink/70 sm:text-lg">
          Advocacia empresarial para momentos em que clareza, velocidade e precisao fazem parte da estrategia.
        </p>
        <div className="pointer-events-auto mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/5511912252450"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-7 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            Falar com a equipe
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href="#areas"
            className="inline-flex min-h-12 items-center justify-center border border-gold/50 bg-marble/40 px-7 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:bg-marble/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          >
            Conhecer atuacao
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-3 lg:flex"
        style={{ opacity: finalOpacity }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold">Forma e criterio</span>
        <span className="h-px w-16 bg-gold/60" />
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gold/60">
        <span className="font-mono text-[9px] uppercase tracking-[0.28em]">Scroll para revelar</span>
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </div>
    </div>
  );
}
