import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';

// A comprehensive selection of the skills
const skillsList = [
  "TypeScript", "JavaScript", "Python", "C", "C++", "Java", "HTML", "CSS",
  "React.js", "Node.js", "Express.js", "Django", "OpenCV", "NumPy", "Pandas", 
  "Scikit-learn", "SciPy", "Matplotlib", "Seaborn", "PyTorch", "Bootstrap", "Tailwind CSS", "Figma",
  "MongoDB", "MySQL", "PostgreSQL", "SQLite", "Firebase",
  "Git", "GitHub", "VS Code", "Ubuntu", "Jupyter", "Colab",
  "AWS", "Docker", "Kubernetes", "Jenkins", "Ansible"
];

const SkillNode = ({ position, skill, index }) => {
  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={0.5}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshPhysicalMaterial 
            color="#00e5ff" 
            emissive="#00e5ff" 
            emissiveIntensity={0.15} 
            wireframe={true} 
            transparent={true} 
            opacity={0.1} 
          />
        </mesh>
        <Html center distanceFactor={10} zIndexRange={[100, 0]} className="pointer-events-none">
          <div className="font-space text-neonCyan/40 font-medium text-lg tracking-widest whitespace-nowrap drop-shadow-[0_0_4px_rgba(0,229,255,0.2)]">
            {skill}
          </div>
        </Html>
      </group>
    </Float>
  );
};

const SkillCloud = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.2;
    }
  });

  const nodes = useMemo(() => {
    const items = [];
    const radius = 6; // Increased radius to accommodate 39 skills
    const count = skillsList.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      
      items.push({ position: [x, y, z], skill: skillsList[i] });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <SkillNode key={i} position={node.position} skill={node.skill} index={i} />
      ))}
    </group>
  );
};

const SkillsSphere = () => {
  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 60 }} className="w-full h-full cursor-grab active:cursor-grabbing">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00e5ff" />
      <SkillCloud />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
    </Canvas>
  );
};

export default SkillsSphere;
