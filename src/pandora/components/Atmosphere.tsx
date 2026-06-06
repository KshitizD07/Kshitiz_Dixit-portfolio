import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function Atmosphere() {
  const scroll = useScroll();
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  // Create initial positions and random speeds for particles
  const [positions, step] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const step = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z
      step[i] = Math.random() * 0.2 + 0.05;        // Vertical speed
    }
    return [pos, step];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const progress = scroll.offset;
    const scrollSpeed = delta * (1 + progress * 5); // Particles react to scroll speed

    for (let i = 0; i < count; i++) {
      // Move particles upwards
      pointsRef.current.geometry.attributes.position.array[i * 3 + 1] += step[i] * delta + scrollSpeed * 0.1;
      
      // Reset if they go too high
      if (pointsRef.current.geometry.attributes.position.array[i * 3 + 1] > 10) {
        pointsRef.current.geometry.attributes.position.array[i * 3 + 1] = -10;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Subtle drift
    pointsRef.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c49a5b"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
