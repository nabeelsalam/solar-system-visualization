import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Sun from "./components/Sun";
import Planet from "./components/Planet";

function App() {
  const [speedScale, setSpeedScale] = useState(1);
  const orbitControlsRef = useRef();
  const [targetPlanet, setTargetPlanet] = useState(null);

  const levelToSunPlane = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.object.position.set(0, 50, 0);
      orbitControlsRef.current.target.set(0, 0, 0);
      orbitControlsRef.current.update();
      setTargetPlanet(null);
    }
  };

  return (
    <>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
        <label htmlFor="speedScale">Speed Scale: {speedScale}x</label>
        <input
          id="speedScale"
          type="range"
          min="1"
          max="1000"
          value={speedScale}
          onChange={(e) => setSpeedScale(Number(e.target.value))}
        />
        <button onClick={levelToSunPlane}>Reset</button>
      </div>
      <Canvas style={{ background: "black" }}>
        <Scene
          speedScale={speedScale}
          orbitControlsRef={orbitControlsRef}
          targetPlanet={targetPlanet}
          setTargetPlanet={setTargetPlanet}
        />
      </Canvas>
    </>
  );
}

function Scene({
  speedScale,
  orbitControlsRef,
  targetPlanet,
  setTargetPlanet,
}) {
  const moveToPlanet = (planetRef) => {
    setTargetPlanet(planetRef);
  };

  useFrame(({ camera }) => {
    if (targetPlanet && targetPlanet.current) {
      const { x, y, z } = targetPlanet.current.position;

      // Calculate position slightly above and behind the planet
      const distanceFromPlanet = 50;
      const heightAbovePlanet = 30;

      // Get direction from sun to planet
      const directionFromSun = new THREE.Vector3(x, y, z).normalize();

      // Calculate camera position
      const cameraPosition = new THREE.Vector3(x, y, z)
        .add(directionFromSun.multiplyScalar(distanceFromPlanet))
        .add(new THREE.Vector3(0, heightAbovePlanet, 0));

      // Smoothly move camera
      camera.position.lerp(cameraPosition, 0.1);

      // Look at sun
      camera.lookAt(0, 0, 0);

      // Disable controls while following
      orbitControlsRef.current.enabled = false;
    } else {
      // Re-enable OrbitControls when not following a planet
      orbitControlsRef.current.enabled = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sun />
      <Planet
        name="Mercury"
        color="gray"
        semiMajorAxis={5.79}
        eccentricity={0.205}
        inclination={7.005}
        longitudeOfAscendingNode={48.331}
        argumentOfPeriapsis={29.124}
        radius={0.38}
        speed={0.04}
        speedScale={speedScale}
        onClick={moveToPlanet}
      />
      <Planet
        name="Venus"
        color="yellow"
        semiMajorAxis={10.82}
        eccentricity={0.007}
        inclination={3.394}
        longitudeOfAscendingNode={76.68}
        argumentOfPeriapsis={54.884}
        radius={0.95}
        speed={0.015}
        speedScale={speedScale}
        onClick={moveToPlanet}
      />
      <Planet
        name="Earth"
        color="blue"
        semiMajorAxis={15}
        eccentricity={0.017}
        inclination={0.0}
        longitudeOfAscendingNode={0.0}
        argumentOfPeriapsis={102.947}
        radius={1}
        speed={0.01}
        speedScale={speedScale}
        onClick={moveToPlanet}
      />
      <Planet
        name="Mars"
        color="red"
        semiMajorAxis={22.79}
        eccentricity={0.093}
        inclination={1.85}
        longitudeOfAscendingNode={49.558}
        argumentOfPeriapsis={286.502}
        radius={0.53}
        speed={0.008}
        speedScale={speedScale}
        onClick={moveToPlanet}
      />
      <Planet
        name="Jupiter"
        color="orange"
        semiMajorAxis={77.84}
        eccentricity={0.049}
        inclination={1.305}
        longitudeOfAscendingNode={100.464}
        argumentOfPeriapsis={273.867}
        radius={11.21}
        speed={0.002}
        speedScale={speedScale}
        onClick={moveToPlanet}
      />
      <Planet
        name="Saturn"
        color="goldenrod"
        semiMajorAxis={143.35}
        eccentricity={0.056}
        inclination={2.485}
        longitudeOfAscendingNode={113.665}
        argumentOfPeriapsis={339.392}
        radius={9.45}
        speed={0.0009}
        speedScale={speedScale}
        onClick={moveToPlanet}
        rings={{
          color: "#A68A5B",
          inclination: 26.7, // Saturn's rings tilted 26.7° to its orbital plane
          opacity: 0.8,
        }}
      />
      <Planet
        name="Uranus"
        color="lightblue"
        semiMajorAxis={287.25}
        eccentricity={0.046}
        inclination={0.772}
        longitudeOfAscendingNode={74.006}
        argumentOfPeriapsis={96.998}
        radius={4.01}
        speed={0.0004}
        speedScale={speedScale}
        onClick={moveToPlanet}
        rings={{
          color: "#87CEEB",
          inclination: 97.77, // Uranus's rings tilted 97.77° to its orbital plane
          opacity: 0.2,
        }}
      />
      <Planet
        name="Neptune"
        color="blue"
        semiMajorAxis={449.51}
        eccentricity={0.01}
        inclination={1.77}
        longitudeOfAscendingNode={131.784}
        argumentOfPeriapsis={273.187}
        radius={3.88}
        speed={0.0002}
        speedScale={speedScale}
        onClick={moveToPlanet}
        rings={{
          color: "#4169E1",
          inclination: 29.56, // Neptune's rings tilted 29.56° to its orbital plane
          opacity: 0.15,
        }}
      />
      <OrbitControls ref={orbitControlsRef} />
    </>
  );
}

export default App;
