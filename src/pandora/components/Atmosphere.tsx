import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export function Atmosphere() {
  const scroll = useScroll();
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Reduce particle count significantly on mobile devices for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 150 : 2000;

  // Create initial positions and random speeds for particles
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;     // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z
      speed[i] = Math.random() * 0.2 + 0.05;       // Speed factor
    }
    return [pos, speed];
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColor: { value: new THREE.Color('#c49a5b') }
  }), []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;
    
    // Smoothly interpolate scroll for shader
    uniforms.uScroll.value = THREE.MathUtils.lerp(uniforms.uScroll.value, scroll.offset, 0.1);
    uniforms.uTime.value = state.clock.elapsedTime;
    
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
        <bufferAttribute
          attach="attributes-aSpeed"
          count={count}
          array={speeds}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uScroll;
          attribute float aSpeed;
          varying float vAlpha;

          void main() {
            vec3 pos = position;
            
            // Move upwards over time and scroll
            float yOffset = uTime * aSpeed + uScroll * 10.0 * aSpeed;
            pos.y = mod(pos.y + yOffset + 10.0, 20.0) - 10.0;
            
            // Fade out at top and bottom
            vAlpha = smoothstep(10.0, 5.0, abs(pos.y));
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (100.0 / -mvPosition.z) * 0.05;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;

          void main() {
            // Create soft circle
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            
            float alpha = (0.5 - dist) * 2.0 * vAlpha * 0.4;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
}
