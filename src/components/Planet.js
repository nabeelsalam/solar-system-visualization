import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text, Line } from "@react-three/drei";
import * as THREE from "three";

function Planet({
  name,
  color,
  semiMajorAxis,
  eccentricity,
  inclination,
  longitudeOfAscendingNode,
  argumentOfPeriapsis,
  radius,
  speed,
  speedScale,
}) {
  const planetRef = useRef();
  const textRef = useRef();
  const angleRef = useRef(0);

  useFrame(() => {
    angleRef.current += speed * speedScale;
    const a = semiMajorAxis; // semi-major axis
    const b = a * Math.sqrt(1 - eccentricity ** 2); // semi-minor axis
    const x = a * Math.cos(angleRef.current);
    const z = b * Math.sin(angleRef.current);

    // Apply orbital inclination and orientation
    const cosΩ = Math.cos(THREE.MathUtils.degToRad(longitudeOfAscendingNode));
    const sinΩ = Math.sin(THREE.MathUtils.degToRad(longitudeOfAscendingNode));
    const cosi = Math.cos(THREE.MathUtils.degToRad(inclination));
    const sini = Math.sin(THREE.MathUtils.degToRad(inclination));
    const cosω = Math.cos(THREE.MathUtils.degToRad(argumentOfPeriapsis));
    const sinω = Math.sin(THREE.MathUtils.degToRad(argumentOfPeriapsis));

    const X =
      (cosΩ * cosω - sinΩ * sinω * cosi) * x +
      (-cosΩ * sinω - sinΩ * cosω * cosi) * z;
    const Y =
      (sinΩ * cosω + cosΩ * sinω * cosi) * x +
      (-sinΩ * sinω + cosΩ * cosω * cosi) * z;
    const Z = sini * sinω * x + sini * cosω * z;

    if (planetRef.current) {
      planetRef.current.position.set(X, Z, Y);
    }
    if (textRef.current) {
      textRef.current.position.set(X, Z + radius + 0.5, Y);
    }
  });

  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const a = semiMajorAxis; // semi-major axis
    const b = a * Math.sqrt(1 - eccentricity ** 2); // semi-minor axis
    const x = Math.cos(angle) * a;
    const z = Math.sin(angle) * b;

    // Apply orbital inclination and orientation
    const cosΩ = Math.cos(THREE.MathUtils.degToRad(longitudeOfAscendingNode));
    const sinΩ = Math.sin(THREE.MathUtils.degToRad(longitudeOfAscendingNode));
    const cosi = Math.cos(THREE.MathUtils.degToRad(inclination));
    const sini = Math.sin(THREE.MathUtils.degToRad(inclination));
    const cosω = Math.cos(THREE.MathUtils.degToRad(argumentOfPeriapsis));
    const sinω = Math.sin(THREE.MathUtils.degToRad(argumentOfPeriapsis));

    const X =
      (cosΩ * cosω - sinΩ * sinω * cosi) * x +
      (-cosΩ * sinω - sinΩ * cosω * cosi) * z;
    const Y =
      (sinΩ * cosω + cosΩ * sinω * cosi) * x +
      (-sinΩ * sinω + cosΩ * cosω * cosi) * z;
    const Z = sini * sinω * x + sini * cosω * z;

    points.push(new THREE.Vector3(X, Z, Y));
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
