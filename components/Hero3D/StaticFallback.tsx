import Image from "next/image";

/**
 * Accessible, static equivalent of the 3D scene: the final assembled frame
 * as an image. Used for prefers-reduced-motion, no-WebGL, low-end mobile,
 * and as the visually-hidden text alternative for screen readers.
 */
export default function StaticFallback() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/emblem-poster.jpg"
        alt="Emblema dourado DRC sobre base de mármore branco, representando a identidade da DRC Advogados"
        fill
        priority
        className="object-cover object-right"
        sizes="100vw"
      />
    </div>
  );
}
