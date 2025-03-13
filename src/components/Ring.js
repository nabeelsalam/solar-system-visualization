import React from "react";
import * as THREE from "three";

function Ring({ innerRadius, outerRadius, color, inclination = 0 }) {
  const ringGeometry = React.useMemo(() => {
    const segments = 128;
    const vertices = [];
    const indices = [];
    const uvs = [];

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      vertices.push(cos * innerRadius, 0, sin * innerRadius);
      vertices.push(cos * outerRadius, 0, sin * outerRadius);
      uvs.push(0, i / segments);
      uvs.push(1, i / segments);

      if (i < segments) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2);
        indices.push(base + 1, base + 3, base + 2);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    return geometry;
  }, [innerRadius, outerRadius]);

  return (
    <mesh
      geometry={ringGeometry}
      rotation={[
        Math.PI / 2, // Base rotation for horizontal rings
        0,
        THREE.MathUtils.degToRad(inclination), // Ring system tilt
      ]}
    >
      <meshBasicMaterial
        attach="material"
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export default Ring;
