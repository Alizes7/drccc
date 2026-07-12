import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
};

export default function SectionShell({
  id,
  tone = "light",
  className = "",
  children,
}: SectionShellProps) {
  const surface = tone === "dark" ? "bg-ink text-white" : "bg-marble text-ink";

  return (
    <section id={id} className={`relative overflow-hidden ${surface} ${className}`}>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-[var(--section-space)] sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}
