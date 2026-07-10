"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Pedestal from "./Pedestal";
import Emblem from "./Emblem";

const MAX_PARALLAX_DEG = 6;
// Rig sits offset to the right so the composition matches the reference:
// object compact and right-aligned, generous ivory negative space on the
// left for the headline.
const RIG_X_OFFSET = 1.7;

function RigWithParallax({ assembled }: { assembled: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useFrame(() => {
    if (!rig.current) return;

    const maxRad = THREE.MathUtils.degToRad(MAX_PARALLAX_DEG);
    const targetY = assembled ? target.current.x * maxRad : 0;
    const targetX = assembled ? target.current.y * maxRad * 0.5 : 0;

    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, targetY, 0.04);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, targetX, 0.04);
  });

  return (
    <group
      ref={rig}
      position={[RIG_X_OFFSET, -0.15, 0]}
      onPointerMove={(e) => {
        target.current.x = (e.clientX / size.width) * 2 - 1;
        target.current.y = (e.clientY / size.height) * 2 - 1;
      }}
    >
      <Pedestal />
      <Emblem onAssembled={() => {}} />
    </group>
  );
}

function CameraDolly({ assembled }: { assembled: boolean }) {
  useFrame((state) => {
    const targetZ = assembled ? 8.4 : 9.4;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.008);
    state.camera.lookAt(RIG_X_OFFSET * 0.35, 0, 0);
  });
  return null;
}

export default function Scene() {
  const [assembled, setAssembled] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      className="!absolute inset-0"
      onCreated={() => {
        // Assembly completion is also detected inside Emblem via onAssembled;
        // this timeout is a safety net matching the documented 2.5-3.5s window.
        window.setTimeout(() => setAssembled(true), 3200);
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.35, 9.4]} fov={28} />
      <color attach="background" args={["#F7F1E6"]} />

      <ambientLight intensity={0.18} />
      <directionalLight
        position={[3.5, 5, 4]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, 1]} intensity={0.7} color="#FFF6E5" />
      <directionalLight position={[1, 1.5, -4]} intensity={0.9} color="#E8C878" />

      {/*
        Studio-style gold reflections built entirely from procedural
        Lightformers instead of Environment's preset="studio" (which fetches
        an HDRI from an external CDN at runtime). That external fetch is
        blocked by the site's own CSP (connect-src 'self') and would
        otherwise throw an unhandled rejection during hydration — this
        version needs no network access at all.
      */}
      <Environment resolution={256}>
        <group rotation={[0, Math.PI / 2, 0]}>
          <Lightformer intensity={8} color="#FFFFFF" position={[0, 4, -2]} scale={[6, 3, 1]} form="rect" />
          <Lightformer intensity={4} color="#F3D98B" position={[-4, 1.5, 2]} scale={[3, 4, 1]} form="rect" />
          <Lightformer intensity={4} color="#FFF6E0" position={[4, 1.5, 2]} scale={[3, 4, 1]} form="rect" />
          <Lightformer intensity={2.5} color="#FFFFFF" position={[0, -4, 3]} scale={[6, 2, 1]} form="rect" />
        </group>
      </Environment>

      <RigWithParallax assembled={assembled} />

      <ContactShadows
        position={[RIG_X_OFFSET, -0.82, 0]}
        opacity={0.4}
        scale={5}
        blur={2.4}
        far={2}
        color="#1A1A1A"
      />

      <CameraDolly assembled={assembled} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.28}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
