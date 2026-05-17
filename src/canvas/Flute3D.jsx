import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';

const FluteModel = () => {
  const group = useRef();
  
  return (
    <group ref={group} rotation={[0, 0, Math.PI / 6]}>
      {/* Main Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.15, 0.15, 7, 32]} />
        <meshStandardMaterial color="#e6c27a" metalness={0.9} roughness={0.15} />
      </mesh>
      
      {/* Mouthpiece / Headjoint */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.8, 32]} />
        <meshStandardMaterial color="#f0d399" metalness={0.95} roughness={0.1} />
      </mesh>
      
      {/* Lip Plate */}
      <group position={[0.15, 2.8, 0]}>
        <mesh rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
          <meshStandardMaterial color="#e6c27a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Embouchure Hole */}
        <mesh rotation={[0, 0, Math.PI/2]} position={[0.02, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.11, 16]} />
          <meshStandardMaterial color="#050505" metalness={0.1} roughness={0.9} />
        </mesh>
      </group>

      {/* Keys and Mechanics */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={i} position={[0.12, 1.8 - i * 0.4, 0]}>
          <mesh rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
            <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, Math.PI/2]}>
             <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
             <meshStandardMaterial color="#fcfcfc" metalness={0.3} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Crown (Top End) */}
      <mesh position={[0, 3.45, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#e6c27a" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Flute3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
      <spotLight position={[-10, -5, 5]} intensity={1.5} color="#9d00ff" />
      
      <Suspense fallback={null}>
        <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2.5}>
          <FluteModel />
        </Float>
      </Suspense>
      
      <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={15} blur={2.5} far={4} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} enablePan={false} />
    </Canvas>
  );
};

export default Flute3D;
