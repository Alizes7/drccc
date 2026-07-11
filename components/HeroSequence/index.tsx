"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import StaticFallback from "./StaticFallback";

const FRAME_COUNT = 81;
const FRAME_PATH = (i: number) => `/sequence/frame-${String(i + 1).padStart(3, "0")}.webp`;
// How much extra scroll distance (in viewport-heights) the sequence scrubs
// across before the page continues on to the "Sobre" section.
const SCROLL_LENGTH_VH = 280;

function supportsCanvas(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("2d");
  } catch {
    return false;
  }
}

function isLikelyLowEndMobile(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
  const saveData = !!nav.connection?.saveData;
  return isMobile && (lowMemory || saveData);
}

function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 transition-opacity duration-700 ${
        visible ? "opacity-60" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest2 text-charcoal/60">
        Role para revelar
      </span>
      <span className="h-8 w-px animate-pulse bg-charcoal/40" />
    </div>
  );
}

function SequenceHero({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Preload frames — first one at high priority for a fast first paint,
  // the rest trickle in behind it. Total payload is ~0.6MB across 81 frames.
  useEffect(() => {
    let cancelled = false;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.decoding = "async";
      if (i === 0) {
        img.fetchPriority = "high";
      } else {
        img.fetchPriority = "low";
      }
      img.onload = () => {
        if (cancelled) return;
        loadedCountRef.current += 1;
        if (i === 0) setReady(true);
      };
      img.src = FRAME_PATH(i);
      imagesRef.current[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Draw the frame matching current scroll progress, cover-fit into the canvas.
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    const pixelW = Math.round(cssW * dpr);
    const pixelH = Math.round(cssH * dpr);

    if (canvas.width !== pixelW || canvas.height !== pixelH) {
      canvas.width = pixelW;
      canvas.height = pixelH;
    }

    const scale = Math.max(pixelW / img.naturalWidth, pixelH / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const dx = (pixelW - drawW) / 2;
    const dy = (pixelH - drawH) / 2;

    ctx.clearRect(0, 0, pixelW, pixelH);
    ctx.drawImage(img, dx, dy, drawW, drawH);
  };

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;

      if (progress > 0.01 && !scrolled) setScrolled(true);

      const loaded = Math.max(loadedCountRef.current, 1);
      const maxIndex = Math.min(loaded, FRAME_COUNT) - 1;
      const frameIndex = Math.min(Math.round(progress * (FRAME_COUNT - 1)), maxIndex);

      currentFrameRef.current = frameIndex;
      drawFrame(frameIndex);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      drawFrame(currentFrameRef.current);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled]);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: `${SCROLL_LENGTH_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ivory">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
        {!ready && <StaticFallback />}
        <div className="relative z-10 h-full">{children}</div>
        <ScrollHint visible={ready && !scrolled} />
      </div>
    </div>
  );
}

interface HeroSequenceProps {
  children: ReactNode;
}

export default function HeroSequence({ children }: HeroSequenceProps) {
  const [mode, setMode] = useState<"static" | "sequence">("static");

  // Decide before first paint where possible, to minimize the flash between
  // the static shell and the enhanced scroll sequence.
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ok = !prefersReducedMotion && supportsCanvas() && !isLikelyLowEndMobile();
    setMode(ok ? "sequence" : "static");
  }, []);

  if (mode === "static") {
    return (
      <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-ivory">
        <StaticFallback />
        <div className="relative z-10 h-full w-full">{children}</div>
      </section>
    );
  }

  return <SequenceHero>{children}</SequenceHero>;
}
