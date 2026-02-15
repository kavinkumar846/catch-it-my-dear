import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Generate random points in a sphere/cloud
function generateRosePetals(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  const color1 = new THREE.Color('#e11d48'); // Rose red
  const color2 = new THREE.Color('#881337'); // Deep burgundy

  for (let i = 0; i < count; i++) {
    const r = (Math.random() * 10) + 2; // Radius spread
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Mix colors
    const mixedColor = color1.clone().lerp(color2, Math.random());
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }
  return { positions, colors };
}

const FloatingPetals = ({ speed = 0.1 }) => {
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => generateRosePetals(2000), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * speed;
      ref.current.rotation.y -= delta * (speed * 0.5);
      
      // Gentle floating wave
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

interface IntroSceneProps {
  onStart: () => void;
}

const IntroScene: React.FC<IntroSceneProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-slate-950 via-rose-950/20 to-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <FloatingPetals />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center pointer-events-auto"
        >
          <h1 className="font-cursive text-6xl md:text-8xl text-rose-500 mb-8 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]">
            HLOOO MY DEAR!!!!!!
          </h1>
          
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px 5px rgba(225, 29, 72, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="px-8 py-4 bg-rose-600/20 border border-rose-500/50 backdrop-blur-sm rounded-full 
                       text-rose-100 font-serif-display text-xl tracking-widest uppercase shadow-[0_0_15px_rgba(225,29,72,0.3)]
                       transition-all duration-300 hover:bg-rose-600/40 hover:text-white group"
          >
            <span className="mr-2">💌</span> Click to Begin
          </motion.button>
        </motion.div>
      </div>
      
      {/* Scroll indicator hint if needed, though button is primary action */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 0.5 }}
         transition={{ delay: 2, duration: 1 }}
         className="absolute bottom-10 w-full text-center text-rose-200/50 text-sm font-light tracking-widest pointer-events-none"
      >
        Designed for You
      </motion.div>
    </div>
  );
};

export default IntroScene;