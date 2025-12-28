import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

interface BookProps {
  coverUrl: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  thickness?: number;
}

const Book = ({ coverUrl, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, thickness = 0.15 }: BookProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(coverUrl);
  
  // Book dimensions (aspect ratio similar to A4/ebook)
  const width = 1.4;
  const height = 2;
  const depth = thickness;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group position={position} scale={scale}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh ref={meshRef} rotation={rotation as unknown as THREE.Euler}>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial attach="material-0" color="#1a1a1a" /> {/* Right */}
          <meshStandardMaterial attach="material-1" color="#f5f5f5" /> {/* Left (pages) */}
          <meshStandardMaterial attach="material-2" color="#1a1a1a" /> {/* Top */}
          <meshStandardMaterial attach="material-3" color="#1a1a1a" /> {/* Bottom */}
          <meshStandardMaterial attach="material-4" map={texture} /> {/* Front cover */}
          <meshStandardMaterial attach="material-5" color="#2a2a2a" /> {/* Back */}
        </mesh>
      </Float>
    </group>
  );
};

interface Book3DSceneProps {
  mainCover: string;
  bonusCover: string;
}

export const Book3DScene = ({ mainCover, bonusCover }: Book3DSceneProps) => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        
        {/* Main book */}
        <Book 
          coverUrl={mainCover} 
          position={[-0.5, 0, 0]} 
          rotation={[0.1, -0.3, 0]} 
          scale={1.1}
          thickness={0.25}
        />
        
        {/* Bonus book */}
        <Book 
          coverUrl={bonusCover} 
          position={[1.3, -0.3, -0.5]} 
          rotation={[0.1, -0.5, 0]} 
          scale={0.85}
          thickness={0.1}
        />
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};
