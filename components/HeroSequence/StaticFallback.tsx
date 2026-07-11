import Image from "next/image";

/**
 * Accessible, static equivalent of the scroll sequence: the final assembled
 * frame as an image. Used for prefers-reduced-motion, save-data connections,
 * and low-end mobile — and doubles as the text alternative for the
 * scroll-driven animation for anyone who can't or shouldn't experience it.
 */
export default function StaticFallback() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/emblem-poster.webp"
        alt="Emblema dourado DRC sobre base de mármore branco, representando a identidade da DRC Advogados"
        fill
        priority
        className="object-cover object-right"
        sizes="100vw"
      />
    </div>
  );
}
