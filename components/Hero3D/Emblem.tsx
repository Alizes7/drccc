"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The DRC emblem is built entirely from primitive box "bars" — no GLTF
 * import needed. Bars are generated from pairs of 2D points via
 * `prepareBar`, so every segment lines up exactly at its corners
 * (hand-tuned position/rotation values were the source of the earlier
 * misaligned, messy result).
 *
 * Shape: a symmetric shield/banner silhouette (flat top, angled shoulders,
 * near-vertical sides, pointed base) with a nested inner outline, plus an
 * abstract angular glyph (spine + two diagonals) suggesting an interlaced
 * monogram without needing to be literally legible — matching the brief's
 * "barras metálicas retas e diagonais entrelaçadas".
 */

type Pt = [number, number];

interface BarDef {
  id: string;
  p1: Pt;
  p2: Pt;
  thickness: number;
  depth: number;
  delay: number;
}

const DURATION = 0.85;
const OVERLAP = 0.05; // extends each bar slightly so corners visually miter instead of gapping

// --- Outer shield outline (7-point closed polygon, clockwise from top-left) ---
const outer: Pt[] = [
  [-0.6, 0.82], // A top-left
  [0.6, 0.82], // B top-right
  [0.92, 0.32], // C right shoulder
  [0.92, -0.32], // D right base of vertical
  [0.0, -1.1], // E bottom point
  [-0.92, -0.32], // F left base of vertical
  [-0.92, 0.32], // G left shoulder
];

// --- Inner nested outline: same polygon, scaled toward center ---
const inner: Pt[] = outer.map(([x, y]) => [x * 0.8, y * 0.8 - 0.03] as Pt);

function polygonEdges(
  points: Pt[],
  prefix: string,
  thickness: number,
  depth: number,
  delayStart: number,
  delayStep: number
): BarDef[] {
  return points.map((p1, i) => {
    const p2 = points[(i + 1) % points.length] as Pt;
    return {
      id: `${prefix}-${i}`,
      p1,
      p2,
      thickness,
      depth,
      delay: delayStart + i * delayStep,
    };
  });
}

const outerBars = polygonEdges(outer, "outer", 0.07, 0.075, 0, 0.07);
const innerBars = polygonEdges(inner, "inner", 0.05, 0.06, 0.55, 0.06);

// --- Abstract angular glyph: vertical spine + two diagonals radiating right ---
const glyphBars: BarDef[] = [
  { id: "glyph-spine", p1: [-0.02, 0.5], p2: [-0.02, -0.62], thickness: 0.075, depth: 0.09, delay: 1.05 },
  { id: "glyph-upper", p1: [-0.02, 0.14], p2: [0.48, 0.56], thickness: 0.075, depth: 0.09, delay: 1.18 },
  { id: "glyph-lower", p1: [-0.02, 0.02], p2: [0.48, -0.5], thickness: 0.075, depth: 0.09, delay: 1.3 },
];

const barSpecs: BarDef[] = [...outerBars, ...innerBars, ...glyphBars];

function powerOut3(t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  return 1 - Math.pow(1 - clamped, 3);
}

function randomScatterOffset(seed: number): THREE.Vector3 {
  const angle = seed * 2.399963; // golden-angle-ish spread
  const radius = 2.1 + (seed % 3) * 0.5;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    Math.sin(angle * 1.3) * radius * 0.6 + 0.4,
    Math.sin(angle) * radius * 0.7 - 1.0
  );
}

interface PreparedBar {
  id: string;
  size: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  delay: number;
  scatterOffset: THREE.Vector3;
  scatterRotation: THREE.Euler;
}

function prepareBar(spec: BarDef, seed: number): PreparedBar {
  const [x1, y1] = spec.p1;
  const [x2, y2] = spec.p2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy) + OVERLAP;
  const angle = Math.atan2(dy, dx);
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;

  return {
    id: spec.id,
    size: [length, spec.thickness, spec.depth],
    position: [cx, cy, 0],
    rotation: [0, 0, angle],
    delay: spec.delay,
    scatterOffset: randomScatterOffset(seed),
    scatterRotation: new THREE.Euler(
      (Math.random() - 0.5) * 2.2,
      (Math.random() - 0.5) * 2.2,
      (Math.random() - 0.5) * 2.2
    ),
  };
}

interface EmblemProps {
  onAssembled?: () => void;
}

export default function Emblem({ onAssembled }: EmblemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const startTime = useRef<number | null>(null);
  const firedComplete = useRef(false);

  const bars = useMemo(() => barSpecs.map((spec, i) => prepareBar(spec, i + 1)), []);

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

      const opacity = THREE.MathUtils.lerp(0.1, 1, Math.min(eased * 1.4, 1));
      if (mat) {
        mat.opacity = opacity;
        const flash = localT > 0.9 && localT < 1.35 ? Math.sin(((localT - 0.9) / 0.45) * Math.PI) : 0;
        mat.emissiveIntensity = 0.08 + flash * 1.1;
      }
    });

    if (allDone && !firedComplete.current) {
      firedComplete.current = true;
      onAssembled?.();
    }

    if (groupRef.current) {
      const idleSpeed = allDone ? (Math.PI * 2) / 55 : (Math.PI * 2) / 500;
      groupRef.current.rotation.y += idleSpeed * (1 / 60);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.15, 0]} scale={0.85}>
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
            color="#D4B25C"
            metalness={1}
            roughness={0.2}
            envMapIntensity={1.6}
            emissive="#C9A94F"
            emissiveIntensity={0.08}
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
