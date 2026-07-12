"use client";

interface GoldenBackgroundProps {
  variant?: "white" | "ivory" | "beige" | "gold-section";
  showWaves?: boolean;
  showLines?: boolean;
}

export default function GoldenBackground({
  variant = "white",
  showWaves = true,
  showLines = true,
}: GoldenBackgroundProps) {
  const bgMap = {
    white:        "bg-white",
    ivory:        "bg-ivory",
    beige:        "bg-beige",
    "gold-section": "bg-ink",
  };

  return (
    <>
      {/* Base color */}
      <div className={`absolute inset-0 ${bgMap[variant]}`} aria-hidden="true" />

      {/* Organic wave shapes in CSS */}
      {showWaves && variant !== "gold-section" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Large background orb — ivory bleed */}
          <div
            className="absolute -top-[30%] -right-[20%] w-[70%] h-[90%] rounded-full opacity-40"
            style={{ background: "radial-gradient(ellipse, rgba(239,230,216,0.7) 0%, transparent 65%)" }}
          />
          {/* Subtle bottom-left orb */}
          <div
            className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[60%] rounded-full opacity-30"
            style={{ background: "radial-gradient(ellipse, rgba(239,230,216,0.6) 0%, transparent 65%)" }}
          />
        </div>
      )}

      {/* Gold decorative lines */}
      {showLines && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M-100,400 C200,300 400,500 700,350 C1000,200 1200,450 1600,380"
              fill="none"
              stroke="rgba(184,137,59,0.12)"
              strokeWidth="1"
            />
            <path
              d="M-100,450 C250,360 450,540 750,390 C1050,240 1250,490 1650,420"
              fill="none"
              stroke="rgba(184,137,59,0.07)"
              strokeWidth="1"
            />
            <path
              d="M200,100 C350,50 500,200 700,120 C900,40 1100,180 1400,100"
              fill="none"
              stroke="rgba(184,137,59,0.09)"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      )}

      {/* Corner accent marks */}
    </>
  );
}
