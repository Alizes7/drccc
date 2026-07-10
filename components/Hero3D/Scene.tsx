"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import Pedestal from "./Pedestal";
import Emblem from "./Emblem";

const MAX_PARALLAX_DEG = 8;

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
    const targetZ = assembled ? 5.2 : 6.4;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.01);
    state.camera.lookAt(0, 0.1, 0);
  });
  return null;
}

export default function Scene() {
  const [assembled, setAssembled] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      onCreated={() => {
        // Assembly completion is also detected inside Emblem via onAssembled;
        // this timeout is a safety net matching the documented 2.5-3.5s window.
        window.setTimeout(() => setAssembled(true), 3600);
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.3, 6.4]} fov={38} />
      <color attach="background" args={["#F7F1E6"]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#FFF6E5" />
      <directionalLight position={[0, 1.5, -4]} intensity={0.6} color="#C9A94F" />

      <Environment preset="studio" />

      <RigWithParallax assembled={assembled} />

      <ContactShadows
        position={[0, -0.82, 0]}
        opacity={0.45}
        scale={6}
        blur={2.2}
        far={2}
        color="#1A1A1A"
      />

      <CameraDolly assembled={assembled} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.35}
          luminanceThreshold={0.65}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
