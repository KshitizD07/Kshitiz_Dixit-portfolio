/* ============================================
   STARFIELD COMPONENT - Phase 3 (DEBUG VERSION)
   Making stars VERY visible for testing
   ============================================ */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Helper function to generate star data
 */
function generateStarData(count) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Positions - spread in a smaller area so they're more concentrated
    positions[i3]     = (Math.random() - 0.5) * 60; // x (smaller range)
    positions[i3 + 1] = (Math.random() - 0.5) * 60; // y (smaller range)
    positions[i3 + 2] = (Math.random() - 0.5) * 60; // z (smaller range)
    
    // MUCH BIGGER sizes so we can see them
    sizes[i] = Math.random() * 5 + 2; // Size between 2 and 7 (much bigger!)
  }
  
  return { positions, sizes };
}

/**
 * StarField Component - DEBUG VERSION
 * 
 * Stars are now:
 * - MUCH BIGGER (2-7 units instead of 0.5-2.5)
 * - BRIGHTER (white color)
 * - MORE VISIBLE (higher opacity)
 * - CLOSER TOGETHER (smaller spread)
 */
export default function StarField({ count = 1500 }) {
  const points = useRef();
  
  // Generate star data once
  const { positions, sizes } = useMemo(() => generateStarData(count), [count]);
  
  // Slow rotation animation
  useFrame((state) => {
    if (points.current) {
      const time = state.clock.elapsedTime;
      points.current.rotation.y = time * 0.02;
      points.current.rotation.x = time * 0.01;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      
      {/* 
        MUCH MORE VISIBLE SETTINGS:
        - size: 1.0 (was 0.15) - HUGE increase
        - color: pure white (#FFFFFF)
        - opacity: 1.0 (fully opaque)
      */}
      <pointsMaterial
        size={1.0}
        color="#FFFFFF"
        sizeAttenuation={true}
        transparent={true}
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}