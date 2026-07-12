"use client";

import { useEffect, useRef, useState } from "react";
import { frameFileName, progressToFrame, sequenceProgress } from "../lib/scroll-sequence.mjs";
import HeroNarrative from "./HeroNarrative";

type ScrollSequenceHeroProps = {
  frameCount: number;
  mobileFrameStep: number;
};

const MOBILE_BREAKPOINT = 768;
const MAX_DEVICE_PIXEL_RATIO = 2;

export default function ScrollSequenceHero({
  frameCount,
  mobileFrameStep,
}: ScrollSequenceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cacheRef = useRef(new Map<number, HTMLImageElement>());
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef(-1);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = (index: number) => new Promise<void>((resolve) => {
      if (cacheRef.current.has(index)) {
        resolve();
        return;
      }

      const image = new Image();
      image.decoding = "async";
      image.src = `/frames/${frameFileName(index)}`;
      image.onload = () => {
        if (!cancelled) cacheRef.current.set(index, image);
        resolve();
      };
      image.onerror = () => resolve();
    });

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const step = isMobile ? mobileFrameStep : 1;
    const requested = Array.from({ length: frameCount }, (_, index) => index)
      .filter((index) => index % step === 0 || index === frameCount - 1);
    const priorityIndices = Array.from(new Set([
      0,
      ...requested.slice(1, 11),
      frameCount - 1,
    ]));
    const firstBatch = priorityIndices.map(load);

    Promise.all(firstBatch).then(() => {
      if (cancelled) return;
      setReady(true);
      const remaining = requested.filter((index) => !priorityIndices.includes(index));
      for (let start = 0; start < remaining.length; start += 24) {
        const batch = remaining.slice(start, start + 24).map(load);
        Promise.all(batch);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [frameCount, mobileFrameStep]);

  useEffect(() => {
    const draw = (frameIndex: number) => {
      const canvas = canvasRef.current;
      const image = cacheRef.current.get(frameIndex);
      if (!canvas || !image || lastFrameRef.current === frameIndex) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const scale = Math.max(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight,
      );
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
        width,
        height,
      );
      lastFrameRef.current = frameIndex;
    };

    const update = () => {
      rafRef.current = null;
      const section = sectionRef.current;
      if (!section) return;

      const startY = section.offsetTop;
      const distance = section.offsetHeight - window.innerHeight;
      const nextProgress = reducedMotion
        ? 1
        : sequenceProgress(window.scrollY, startY, distance);
      const step = window.innerWidth < MOBILE_BREAKPOINT ? mobileFrameStep : 1;
      const sampledFrameCount = Math.ceil((frameCount - 1) / step) + 1;
      const sampledIndex = progressToFrame(nextProgress, sampledFrameCount) * step;
      const sourceIndex = Math.min(frameCount - 1, sampledIndex);

      setProgress(nextProgress);
      draw(sourceIndex);
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = window.requestAnimationFrame(update);
      }
    };

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      lastFrameRef.current = -1;
      update();
    };

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [frameCount, mobileFrameStep, reducedMotion, ready]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-[240vh] md:h-[320vh]"
      aria-label="Apresentacao DRC Advogados"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-marble">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
        {!ready && <div className="absolute inset-0 bg-marble" aria-hidden="true" />}
        <div className="relative z-10 h-full">
          <HeroNarrative progress={reducedMotion ? 0 : progress} />
        </div>
      </div>
    </section>
  );
}
