import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const GridPlane = () => {
  const gridRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (gridRef.current) {
      gridRef.current.position.z = (time * 0.5) % 1;
      // Breathing effect
      gridRef.current.material.opacity = 0.2 + Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.2} />
    </mesh>
  );
};

const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-deepBlack">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <fog attach="fog" args={['#0a0a0a', 2, 15]} />
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <GridPlane />
      </Canvas>
    </div>
  );
};

export default BackgroundGrid;
