import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateTreeTargets } from '../three/treeAlgorithm';

export default function BigBangTree({ count = 2500 }) {
  const pointsRef = useRef();
  const [phase, setPhase] = useState('explosion');
  
  // FIXED: Start scroll logic near zero (0.01) so the trunk doesn't appear all at once
  const scrollRef = useRef({ current: 0.01, target: 0.01 });

  const leafTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // A softer, wider gradient to make the leaves look lush and full
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  const initialData = useMemo(() => {
    const treeData = generateTreeTargets(count); 

    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = treeData.colors; 

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = 0;
      positions[i3 + 1] = 4; 
      positions[i3 + 2] = 0;

      const explosionForce = Math.random() * 0.2 + 0.05; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      velocities[i3] = explosionForce * Math.sin(phi) * Math.cos(theta);
      velocities[i3 + 1] = explosionForce * Math.sin(phi) * Math.sin(theta);
      velocities[i3 + 2] = explosionForce * Math.cos(phi);
    }

    return { positions, velocities, colors, treeTargets: treeData.positions };
  }, [count]);

  const velocitiesRef = useRef(initialData.velocities);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const geom = pointsRef.current.geometry;
    const posAttribute = geom.attributes.position;
    const velocities = velocitiesRef.current;
    const time = state.clock.elapsedTime;
    
    const targetRotationX = -(state.pointer.y * 0.1); 
    const targetRotationY = (state.pointer.x * 0.2);  
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotationX, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotationY, 0.05);

    if (phase === 'explosion') {
      let movingParticles = 0;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posAttribute.array[i3] += velocities[i3];
        posAttribute.array[i3 + 1] += velocities[i3 + 1];
        posAttribute.array[i3 + 2] += velocities[i3 + 2];

        velocities[i3 + 1] -= 0.002; 
        velocities[i3] *= 0.99;      
        velocities[i3 + 2] *= 0.99;  

        if (posAttribute.array[i3 + 1] < -8) {
          posAttribute.array[i3 + 1] = -8;
          velocities[i3 + 1] *= -0.3; 
          velocities[i3] *= 0.85;     
          velocities[i3 + 2] *= 0.85;
        }

        if (Math.abs(velocities[i3 + 1]) > 0.01) movingParticles++;
      }

      if (movingParticles < 50) setPhase('scroll_growth'); 

    } else if (phase === 'scroll_growth') {
      const rawScrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      
      // FIXED: Min value is now 0.01, so the trunk requires scrolling to fully form
      scrollRef.current.target = maxScroll > 0 ? Math.max(0.01, rawScrollY / maxScroll) : 0.01;
      scrollRef.current.current = THREE.MathUtils.lerp(scrollRef.current.current, scrollRef.current.target, 0.05);

      const activeParticleLimit = Math.floor(count * scrollRef.current.current);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        if (i < activeParticleLimit) {
          const targetX = initialData.treeTargets[i3];
          const targetY = initialData.treeTargets[i3 + 1];
          const targetZ = initialData.treeTargets[i3 + 2];

          const isVine = i > count * 0.3; 
          let windX = 0;
          let windZ = 0;

          if (isVine) {
            const heightMultiplier = Math.max(0, (2 - targetY) * 0.15); 
            windX = Math.sin(time * 0.8 + (targetX * 0.5)) * heightMultiplier;
            windZ = Math.cos(time * 0.6 + (targetZ * 0.5)) * heightMultiplier * 0.5;
          }

          posAttribute.array[i3] += ((targetX + windX) - posAttribute.array[i3]) * 0.06;
          posAttribute.array[i3 + 1] += (targetY - posAttribute.array[i3 + 1]) * 0.06;
          posAttribute.array[i3 + 2] += ((targetZ + windZ) - posAttribute.array[i3 + 2]) * 0.06;
        } else {
          if (posAttribute.array[i3 + 1] > -7.9) {
            posAttribute.array[i3 + 1] -= 0.08; 
          }
        }
      }
    }

    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, -2, -6]} scale={[1.1, 1.1, 1.1]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={initialData.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={initialData.colors} itemSize={3} />
      </bufferGeometry>
      
      {/* FIXED LEAF RENDERING: 
        1. Size is massively increased (0.45) so particles overlap and create volume.
        2. NormalBlending replaces AdditiveBlending so they look like solid, painted leaves instead of neon lights.
      */}
      <pointsMaterial 
        size={0.45}          
        map={leafTexture}    
        alphaTest={0.05}     
        vertexColors={true} 
        transparent={true} 
        opacity={0.9} 
        depthWrite={false}
        blending={THREE.NormalBlending} 
      />
    </points>
  );
}