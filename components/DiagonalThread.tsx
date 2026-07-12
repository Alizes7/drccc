"use client";

/**
 * DiagonalThread — elemento de assinatura visual do site.
 * Uma linha fina e diagonal que atravessa cada seção em um ângulo levemente
 * diferente, como um "fio condutor" que costura o layout inteiro.
 * Nunca decorativa por decorativa: marca a transição entre blocos assimétricos
 * e evita que cada seção pareça um módulo isolado e intercambiável.
 */
export default function DiagonalThread({
  variant = "light",
  side = "right",
  className = "",
}: {
  variant?: "light" | "dark";
  side?: "left" | "right";
  className?: string;
}) {
  const stroke = variant === "dark" ? "rgba(201,166,72,0.35)" : "rgba(184,137,59,0.22)";
  const nodeFill = variant === "dark" ? "#C9A648" : "#B8893B";
  const flip = side === "left" ? -1 : 1;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1={flip === 1 ? "1180" : "260"}
        y1="-40"
        x2={flip === 1 ? "1380" : "60"}
        y2="940"
        stroke={stroke}
        strokeWidth="1"
      />
      <circle cx={flip === 1 ? "1244" : "196"} cy="220" r="2.5" fill={nodeFill} opacity="0.7" />
      <circle cx={flip === 1 ? "1300" : "140"} cy="620" r="2.5" fill={nodeFill} opacity="0.5" />
    </svg>
  );
}
