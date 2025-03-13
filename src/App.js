import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sun from "./components/Sun";
import Planet from "./components/Planet";

function App() {
  const [speedScale, setSpeedScale] = useState(1);
  const orbitControlsRef = useRef();

  const levelToSunPlane = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.object.position.set(0, 50, 0);
      orbitControlsRef.current.target.set(0, 0, 0);
      orbitControlsRef.current.update();
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
        />
        <OrbitControls ref={orbitControlsRef} />
      </Canvas>
    </>
  );
}

export default App;
