"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The DRC emblem is built entirely from primitive box "bars" — no GLTF
 * import needed. Each bar is one entry below: a final position/rotation
 * plus a randomized scattered starting pose. On mount, every bar animates
 * from its scattered pose into its final pose with a staggered delay
 * (power3-out easing), producing the "precision jewel assembly" effect
 * described in the brief. A short emissive flash marks each bar's landing.
 */

interface BarSpec {
  id: string;
  size: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  delay: number; // seconds, stagger offset
}

const DURATION = 0.9; // seconds per-bar travel time
const TOTAL_STAGGER_SPAN = 2.2; // seconds across which delays are spread

// Shield outline (a hexagonal/shield silhouette made of 6 straight bars)
// plus interior bars forming an abstract, angular "R" glyph — echoing the
// reference emblem's interlocking geometric monogram.
const barSpecs: BarSpec[] = [
  // --- Outer shield outline ---
  { id: "top", size: [1.6, 0.09, 0.09], position: [0, 1.35, 0], rotation: [0, 0, 0], delay: 0 },
  { id: "upper-left", size: [0.95, 0.09, 0.09], position: [-0.78, 0.95, 0], rotation: [0, 0, Math.PI / 2.55], delay: 0.08 },
  { id: "upper-right", size: [0.95, 0.09, 0.09], position: [0.78, 0.95, 0], rotation: [0, 0, -Math.PI / 2.55], delay: 0.16 },
  { id: "left", size: [1.15, 0.09, 0.09], position: [-1.1, 0.15, 0], rotation: [0, 0, Math.PI / 2], delay: 0.24 },
  { id: "right", size: [1.15, 0.09, 0.09], position: [1.1, 0.15, 0], rotation: [0, 0, Math.PI / 2], delay: 0.32 },
  { id: "lower-left", size: [1.05, 0.09, 0.09], position: [-0.55, -0.75, 0], rotation: [0, 0, -Math.PI / 3.6], delay: 0.4 },
  { id: "lower-right", size: [1.05, 0.09, 0.09], position: [0.55, -0.75, 0], rotation: [0, 0, Math.PI / 3.6], delay: 0.48 },
  { id: "point", size: [0.55, 0.09, 0.09], position: [0, -1.42, 0], rotation: [0, 0, Math.PI / 2], delay: 0.56 },

  // --- Nested inner frame ---
  { id: "inner-top", size: [1.05, 0.07, 0.07], position: [0, 0.95, 0.02], rotation: [0, 0, 0], delay: 0.68 },
  { id: "inner-left", size: [1.55, 0.07, 0.07], position: [-0.55, 0.15, 0.02], rotation: [0, 0, Math.PI / 2], delay: 0.76 },

  // --- Abstract "R" glyph bars (diagonal stroke + leg) ---
  { id: "r-spine", size: [1.5, 0.09, 0.07], position: [-0.05, 0.15, 0.05], rotation: [0, 0, Math.PI / 2], delay: 0.9 },
  { id: "r-bowl-top", size: [0.68, 0.08, 0.07], position: [0.25, 0.72, 0.05], rotation: [0, 0, -0.55], delay: 1.0 },
  { id: "r-bowl-bottom", size: [0.62, 0.08, 0.07], position: [0.25, 0.32, 0.05], rotation: [0, 0, 0.6], delay: 1.1 },
  { id: "r-leg", size: [0.85, 0.08, 0.07], position: [0.32, -0.55, 0.05], rotation: [0, 0, -0.78], delay: 1.2 },

  // --- "C" arc suggestion, right side ---
  { id: "c-arc-top", size: [0.7, 0.08, 0.06], position: [0.55, 0.68, -0.02], rotation: [0, 0, -0.9], delay: 1.32 },
  { id: "c-arc-bottom", size: [0.7, 0.08, 0.06], position: [0.55, -0.38, -0.02], rotation: [0, 0, 0.9], delay: 1.44 },
];

function powerOut3(t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  return 1 - Math.pow(1 - clamped, 3);
}

function randomScatterOffset(seed: number): THREE.Vector3 {
  // Deterministic-ish scatter so SSR/CSR don't mismatch violently; seed varies per bar.
  const angle = seed * 2.399963; // golden-angle-ish spread
  const radius = 2.4 + (seed % 3) * 0.6;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle * 1.3) * radius * 0.6 + 0.5,
    Math.sin(angle) * radius * 0.8 - 1.2
  );
}

interface EmblemProps {
  onAssembled?: () => void;
}

export default function Emblem({ onAssembled }: EmblemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const startTime = useRef<number | null>(null);
  const firedComplete = useRef(false);

  const bars = useMemo(
    () =>
      barSpecs.map((spec, i) => ({
        ...spec,
        scatterOffset: randomScatterOffset(i + 1),
        scatterRotation: new THREE.Euler(
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 2.4
        ),
      })),
    []
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const materialRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);

  useFrame((state) => {
    if (startTime.current === null) startTime.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startTime.current;

    let allDone = true;

    bars.forEach((bar, i) => {
      const mesh = meshRefs.current[i];
      const mat = materialRefs.current[i];
      if (!mesh) return;

      const localT = (elapsed - bar.delay) / DURATION;
      const eased = powerOut3(localT);

      if (localT < 1) allDone = false;

      const finalPos = new THREE.Vector3(...bar.position);
      const startPos = finalPos.clone().add(bar.scatterOffset);
      mesh.position.lerpVectors(startPos, finalPos, eased);

      const finalRot = new THREE.Euler(...bar.rotation);
      mesh.rotation.set(
        THREE.MathUtils.lerp(bar.scatterRotation.x, finalRot.x, eased),
        THREE.MathUtils.lerp(bar.scatterRotation.y, finalRot.y, eased),
        THREE.MathUtils.lerp(bar.scatterRotation.z, finalRot.z, eased)
      );

      const opacity = THREE.MathUtils.lerp(0.15, 1, Math.min(eased * 1.4, 1));
      if (mat) {
        mat.opacity = opacity;
        // Landing flash: brief emissive spike right as the bar reaches ~95%+.
        const flash = localT > 0.92 && localT < 1.3 ? Math.sin(((localT - 0.92) / 0.38) * Math.PI) : 0;
        mat.emissiveIntensity = 0.15 + flash * 1.4;
      }
    });

    if (allDone && !firedComplete.current) {
      firedComplete.current = true;
      onAssembled?.();
    }

    // Slow continuous idle rotation once assembled (also gently rotates while assembling, subtly).
    if (groupRef.current) {
      const idleSpeed = allDone ? (Math.PI * 2) / 50 : (Math.PI * 2) / 400;
      groupRef.current.rotation.y += idleSpeed * (1 / 60);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.45, 0]} scale={0.62}>
      {bars.map((bar, i) => (
        <mesh
          key={bar.id}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          castShadow
          receiveShadow
        >
          <boxGeometry args={bar.size} />
          <meshStandardMaterial
            ref={(el) => {
              materialRefs.current[i] = el;
            }}
            color="#C9A94F"
            metalness={1}
            roughness={0.15}
            emissive="#C9A94F"
            emissiveIntensity={0.15}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}
