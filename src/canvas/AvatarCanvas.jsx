import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';

const HologramShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 200, 32]} />
        <meshPhysicalMaterial 
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const AvatarCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00ffcc" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#9d00ff" />
      
      <HologramShape />
      
      <Environment preset="city" />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={20} blur={2.5} far={4} color="#00e5ff" />
    </Canvas>
  );
};

export default AvatarCanvas;
