import React from "react";
import { Sphere } from "@react-three/drei";

function Sun() {
  return (
    <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial attach="material" color="yellow" />
    </Sphere>
  );
}

export default Sun;
