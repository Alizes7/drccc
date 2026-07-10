"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import StaticFallback from "./StaticFallback";
import Hero3DErrorBoundary from "./ErrorBoundary";

// Three.js is lazy-loaded and never server-rendered, so it doesn't affect
// the LCP of the rest of the page.
const Scene = dynamic(() => import("./Scene"), { ssr: false, loading: () => null });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
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

export default function Hero3D() {
  const [canRender3D, setCanRender3D] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ok = !prefersReducedMotion && supportsWebGL() && !isLikelyLowEndMobile();
    setCanRender3D(ok);
    setChecked(true);
  }, []);

  return (
    <div className="relative h-full w-full" role="img" aria-label="Emblema dourado DRC materializando-se sobre uma base de mármore branco">
      {checked && canRender3D ? (
        <Hero3DErrorBoundary>
          <Scene />
        </Hero3DErrorBoundary>
      ) : (
        <StaticFallback />
      )}
    </div>
  );
}
