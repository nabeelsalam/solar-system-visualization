import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text, Line } from "@react-three/drei";
import * as THREE from "three";

function Planet({ name, color, distance, radius, speed }) {
  const planetRef = useRef();
  const textRef = useRef();
  const angleRef = useRef(0);

  useFrame(() => {
    angleRef.current += speed;
    const x = distance * Math.cos(angleRef.current);
    const z = distance * Math.sin(angleRef.current);
    planetRef.current.position.set(x, 0, z);
    textRef.current.position.set(x, radius + 0.5, z);
  });

  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance
      )
    );
  }

  return (
    <>
      <Line points={points} color="gray" lineWidth={2} />
      <Sphere ref={planetRef} args={[radius, 32, 32]}>
        <meshStandardMaterial attach="material" color={color} />
      </Sphere>
      <Text
        ref={textRef}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </>
  );
}

export default Planet;
