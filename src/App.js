import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sun from "./components/Sun";
import Planet from "./components/Planet";

function App() {
  return (
    <Canvas style={{ background: "black" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sun />
      <Planet
        name="Mercury"
        color="gray"
        distance={5.79}
        radius={0.38}
        speed={0.04}
      />
      <Planet
        name="Venus"
        color="yellow"
        distance={10.82}
        radius={0.95}
        speed={0.015}
      />
      <Planet name="Earth" color="blue" distance={15} radius={1} speed={0.01} />
      <Planet
        name="Mars"
        color="red"
        distance={22.79}
        radius={0.53}
        speed={0.008}
      />
      <Planet
        name="Jupiter"
        color="orange"
        distance={77.84}
        radius={11.21}
        speed={0.002}
      />
      <Planet
        name="Saturn"
        color="goldenrod"
        distance={143.35}
        radius={9.45}
        speed={0.0009}
      />
      <Planet
        name="Uranus"
        color="lightblue"
        distance={287.25}
        radius={4.01}
        speed={0.0004}
      />
      <Planet
        name="Neptune"
        color="blue"
        distance={449.51}
        radius={3.88}
        speed={0.0002}
      />
      <OrbitControls />
    </Canvas>
  );
}

export default App;
