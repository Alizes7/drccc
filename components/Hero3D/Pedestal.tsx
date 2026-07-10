"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";

/**
 * Marble pedestal. Uses a RoundedBox for the soft bevel edges seen in the
 * reference frames, with a MeshPhysicalMaterial tuned for a honed marble
 * look (low roughness, subtle clearcoat). Gold veining is faked with a
 * cheap procedural canvas texture instead of an imported normal map, to
 * keep the bundle free of binary assets.
 */
function useVeinTexture() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#F2E9DD";
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = "rgba(201, 169, 79, 0.35)";
    ctx.lineWidth = 1.5;

    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      let x = Math.random() * size;
      let y = 0;
      ctx.moveTo(x, y);
      while (y < size) {
        x += (Math.random() - 0.5) * 60;
        y += size / 10;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);
}

export default function Pedestal() {
  const veinMap = useVeinTexture();

  return (
    <group position={[0, -0.55, 0]}>
      <RoundedBox args={[3.2, 0.55, 2.2]} radius={0.09} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#F2E9DD"
          map={veinMap ?? undefined}
          roughness={0.25}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          reflectivity={0.4}
        />
      </RoundedBox>
    </group>
  );
}
