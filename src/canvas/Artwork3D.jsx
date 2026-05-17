import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';

/* ─── Paintbrush ─── */
const Brush = ({ position, rotation }) => (
  <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
    <group position={position} rotation={rotation}>
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.055, 0.04, 2.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.07, 0.055, 0.28, 16]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.28, 0]}>
        <cylinderGeometry args={[0.055, 0.006, 0.8, 16]} />
        <meshStandardMaterial color="#c8b89a" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.68, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#1a0a00" roughness={1} />
      </mesh>
    </group>
  </Float>
);

/* ─── Graphite Pencil ─── */
const GraphitePencil = ({ position, rotation }) => (
  <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
    <group position={position} rotation={rotation}>
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 2.5, 6]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.35, 0]}>
        <coneGeometry args={[0.065, 0.4, 6]} />
        <meshStandardMaterial color="#5a4030" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <coneGeometry args={[0.02, 0.15, 6]} />
        <meshStandardMaterial color="#888" roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.18, 16]} />
        <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  </Float>
);

/* ─── Sketchbook ─── */
const Sketchbook = ({ position, rotation }) => (
  <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.9}>
    <group position={position} rotation={rotation}>
      {/* Cover */}
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[1.2, 1.6, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Pages block */}
      <mesh>
        <boxGeometry args={[1.16, 1.56, 0.14]} />
        <meshStandardMaterial color="#f0ede8" roughness={0.95} />
      </mesh>
      {/* Spiral binding */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-0.56, -0.65 + i * 0.14, 0]}>
          <torusGeometry args={[0.055, 0.015, 8, 16]} />
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  </Float>
);

/* ─── Main Scene ─── */
const ArtToolsScene = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <Brush          position={[-2.2,  0.5,  0.3]} rotation={[0.2, 0, -0.3]} />
      <GraphitePencil position={[ 2.0,  0.8, -0.2]} rotation={[-0.1, 0.2, 0.4]} />
      <Sketchbook     position={[ 0.0, -1.8,  0.0]} rotation={[0.2, -0.3, 0.05]} />

      {/* Ambient floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4]}
        >
          <boxGeometry args={[0.025, 0.025, 0.025]} />
          <meshBasicMaterial
            color={['#00e5ff', '#9d00ff', '#ffffff', '#888'][Math.floor(Math.random() * 4)]}
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
};

const Artwork3D = () => (
  <Canvas camera={{ position: [0, 0, 9], fov: 50 }} className="w-full h-full cursor-grab active:cursor-grabbing">
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 10, 8]} intensity={2} color="#ffffff" />
    <spotLight position={[-6,  6, 6]} intensity={4} color="#00e5ff" />
    <spotLight position={[ 6, -6, 4]} intensity={3} color="#9d00ff" />

    <Suspense fallback={null}>
      <ArtToolsScene />
    </Suspense>

    <ContactShadows position={[0, -4, 0]} opacity={0.35} scale={15} blur={3} far={6} />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
  </Canvas>
);

export default Artwork3D;
