import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { generateTreeTargets } from '../three/treeAlgorithm';

const tempVec = new THREE.Vector3();
const tempDir = new THREE.Vector3();
const mousePos3D = new THREE.Vector3();

export default function BigBangTree({ count = 10000, onAnimationComplete }) {
  const pointsRef = useRef();
  const [phase, setPhase] = useState('explosion');
  const [showSkipButton, setShowSkipButton] = useState(true);
  const scrollRef = useRef({ current: 0.01, target: 0.01 });
  const explosionTimerRef = useRef(0);

  const leafTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const initialData = useMemo(() => {
    const treeData = generateTreeTargets(count); 
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = treeData.colors; 

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = 0; positions[i3 + 1] = 4; positions[i3 + 2] = 0;
      const explosionForce = Math.random() * 0.25 + 0.1; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      velocities[i3] = explosionForce * Math.sin(phi) * Math.cos(theta);
      velocities[i3 + 1] = explosionForce * Math.sin(phi) * Math.sin(theta);
      velocities[i3 + 2] = explosionForce * Math.cos(phi);
    }
    return { positions, velocities, colors, treeTargets: treeData.positions };
  }, [count]);

  const velocitiesRef = useRef(initialData.velocities);

  const handleSkip = () => {
    setPhase('scroll_growth');
    setShowSkipButton(false);
    if (pointsRef.current) {
      const posAttribute = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posAttribute.array[i3] = (Math.random() - 0.5) * 5;
        posAttribute.array[i3 + 1] = -8;
        posAttribute.array[i3 + 2] = (Math.random() - 0.5) * 5;
        velocitiesRef.current[i3] = 0; velocitiesRef.current[i3 + 1] = 0; velocitiesRef.current[i3 + 2] = 0;
      }
      posAttribute.needsUpdate = true;
    }
    if (onAnimationComplete) onAnimationComplete();
  };

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const velocities = velocitiesRef.current;
    const time = state.clock.elapsedTime;
    const { camera, pointer } = state;

    tempVec.set(pointer.x, pointer.y, 0.5);
    tempVec.unproject(camera);
    tempDir.copy(tempVec).sub(camera.position).normalize();
    const distanceToPlane = (-6 - camera.position.z) / tempDir.z;
    mousePos3D.copy(camera.position).add(tempDir.multiplyScalar(distanceToPlane));

    const targetRotationX = -(state.pointer.y * 0.05); 
    const targetRotationY = (state.pointer.x * 0.1);  
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotationX, 0.05);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotationY, 0.05);

    if (phase === 'explosion') {
      let movingParticles = 0;
      explosionTimerRef.current += 0.016;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        posAttribute.array[i3] += velocities[i3];
        posAttribute.array[i3 + 1] += velocities[i3 + 1];
        posAttribute.array[i3 + 2] += velocities[i3 + 2];
        velocities[i3 + 1] -= 0.003; 
        velocities[i3] *= 0.985; velocities[i3 + 2] *= 0.985;  

        if (posAttribute.array[i3 + 1] < -8) {
          posAttribute.array[i3 + 1] = -8;
          velocities[i3 + 1] *= -0.3; velocities[i3] *= 0.85; velocities[i3 + 2] *= 0.85;
        }
        if (Math.abs(velocities[i3 + 1]) > 0.02) movingParticles++;
      }

      if (movingParticles < 100 || explosionTimerRef.current > 8) {
        setPhase('scroll_growth');
        setShowSkipButton(false);
        if (onAnimationComplete) onAnimationComplete();
      }

    } else if (phase === 'scroll_growth') {
      const rawScrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollRef.current.target = maxScroll > 0 ? Math.max(0.01, rawScrollY / maxScroll) : 0.01;
      scrollRef.current.current = THREE.MathUtils.lerp(scrollRef.current.current, scrollRef.current.target, 0.05);
      const activeParticleLimit = Math.floor(count * scrollRef.current.current);

      const repulsionRadius = 2.5; 
      const repulsionStrength = 1.5; 

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        if (i >= activeParticleLimit) {
            if (posAttribute.array[i3 + 1] > -7.9) {
                posAttribute.array[i3 + 1] -= 0.1; 
            }
            continue; 
        }

        let targetX = initialData.treeTargets[i3];
        let targetY = initialData.treeTargets[i3 + 1];
        let targetZ = initialData.treeTargets[i3 + 2]; 

        const isVine = i > count * 0.35; 
        if (isVine) {
          const heightMultiplier = Math.max(0, (2 - targetY) * 0.12); 
          targetX += Math.sin(time * 0.8 + (targetX * 0.5)) * heightMultiplier;
          targetZ += Math.cos(time * 0.6 + (targetZ * 0.5)) * heightMultiplier * 0.5;
        }

        const dx = posAttribute.array[i3] - mousePos3D.x;
        const dy = posAttribute.array[i3 + 1] - mousePos3D.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < repulsionRadius * repulsionRadius) {
          const dist = Math.sqrt(distSq);
          const force = (repulsionRadius - dist) / repulsionRadius;
          targetX += (dx / (dist + 0.01)) * force * repulsionStrength;
          targetY += (dy / (dist + 0.01)) * force * repulsionStrength;
        }

        posAttribute.array[i3] += (targetX - posAttribute.array[i3]) * 0.08;
        posAttribute.array[i3 + 1] += (targetY - posAttribute.array[i3 + 1]) * 0.08;
        posAttribute.array[i3 + 2] += (targetZ - posAttribute.array[i3 + 2]) * 0.08;
      }
    }
    posAttribute.needsUpdate = true;
  });

  return (
    <>
      {showSkipButton && phase === 'explosion' && (
        <Html fullscreen style={{ pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10000, pointerEvents: 'all' }}>
            <button onClick={handleSkip} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00F0FF', borderRadius: '4px', color: '#00F0FF', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: '500', letterSpacing: '0.5px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)' }}>
              Skip Animation →
            </button>
          </div>
        </Html>
      )}

      <points ref={pointsRef} position={[0, -2, -6]} scale={[1.1, 1.1, 1.1]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={initialData.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={initialData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.18} 
          map={leafTexture}    
          alphaTest={0.05}     
          vertexColors={true} 
          transparent={true} 
          opacity={0.9} 
          depthWrite={false}
          blending={THREE.AdditiveBlending} 
        />
      </points>
    </>
  );
}