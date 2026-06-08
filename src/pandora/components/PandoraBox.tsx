import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text } from '@react-three/drei';
import * as THREE from 'three';

// This component is the OUTER box that descends and expands (The "Shell")
export function OuterBox() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const coreMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  const topRef = useRef<THREE.Mesh>(null);
  const bottomRef = useRef<THREE.Mesh>(null);
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  const frontRef = useRef<THREE.Mesh>(null);
  const backRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    const progress = scroll.offset;
    
    // 1. Controlled Descent and Rotation
    groupRef.current.position.y = -progress * 8; // Further slowed for stability
    groupRef.current.rotation.y += delta * 0.15; 
    groupRef.current.rotation.x += delta * 0.05;
    groupRef.current.rotation.z = progress * Math.PI * 0.05;

    // 2. Expansion - Halted after first component
    // We cap the 'progress' used for expansion at 0.15 (the reveal of the first artifact)
    const expansionProgress = Math.min(0.2, progress);
    const expandFactor = expansionProgress * 40; // Reaches final size early
    const distance = 1 + expandFactor;
    const scale = 1 + expandFactor * 1.5;

    if (topRef.current) { topRef.current.position.y = distance; topRef.current.scale.set(scale, scale, 1); }
    if (bottomRef.current) { bottomRef.current.position.y = -distance; bottomRef.current.scale.set(scale, scale, 1); }
    if (leftRef.current) { leftRef.current.position.x = -distance; leftRef.current.scale.set(scale, scale, 1); }
    if (rightRef.current) { rightRef.current.position.x = distance; rightRef.current.scale.set(scale, scale, 1); }
    if (frontRef.current) { frontRef.current.position.z = distance; frontRef.current.scale.set(scale, scale, 1); }
    if (backRef.current) { backRef.current.position.z = -distance; backRef.current.scale.set(scale, scale, 1); }

    // Ensure it stays visible as a static frame after expanding
    if (coreMaterialRef.current) {
        coreMaterialRef.current.opacity = Math.max(0.1, 1 - progress * 5);
    }
    
    // Opacity also stabilizes after expansion
    const faceOpacity = Math.max(0.2, 0.8 - expansionProgress * 2);
    [topRef, bottomRef, leftRef, rightRef, frontRef, backRef].forEach(ref => {
        if (ref.current) {
            (ref.current.material as THREE.MeshStandardMaterial).opacity = faceOpacity;
        }
    });
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#3a2010',
    metalness: 0.9,
    roughness: 0.2,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  }), []);

  const geometry = new THREE.PlaneGeometry(2, 2);

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial ref={coreMaterialRef} color="#c49a5b" wireframe transparent />
      </mesh>

      <mesh ref={topRef} geometry={geometry} material={material} position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh ref={bottomRef} geometry={geometry} material={material} position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh ref={leftRef} geometry={geometry} material={material} position={[-1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <mesh ref={rightRef} geometry={geometry} material={material} position={[1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <mesh ref={frontRef} geometry={geometry} material={material} position={[0, 0, 1]} />
      <mesh ref={backRef} geometry={geometry} material={material} position={[0, 0, -1]} rotation={[0, Math.PI, 0]} />
      
      <boxHelper>
        <mesh geometry={new THREE.BoxGeometry(2, 2, 2)} />
        <lineBasicMaterial color="#c49a5b" transparent opacity={0.3} />
      </boxHelper>
    </group>
  );
}

import { PORTFOLIO_SECTIONS } from '../config';

export function InnerArtifacts({ activeSection }: { activeSection: number }) {
  const scroll = useScroll();
  const squareRef = useRef<THREE.Mesh>(null);
  const textGroupRef = useRef<THREE.Group>(null);

  // Drag interaction state
  const isDragging = useRef(false);
  const dragRotation = useRef({ x: 0, y: 0 });
  const previousPointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!squareRef.current || !textGroupRef.current) return;
    
    const progress = scroll.offset;
    const emergenceProgress = Math.min(1, progress / 0.15);
    const targetScale = emergenceProgress * 1.5;
    
    squareRef.current.scale.setScalar(targetScale);
    textGroupRef.current.scale.setScalar(targetScale);
    
    const mat = squareRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = emergenceProgress;

    squareRef.current.position.z = emergenceProgress * 2.5;
    textGroupRef.current.position.z = emergenceProgress * 2.5;

    // Automatic base rotation
    const baseRotY = state.clock.elapsedTime * 0.5;
    const baseRotX = state.clock.elapsedTime * 0.3;
    
    // Snap back if not dragging
    if (!isDragging.current) {
        dragRotation.current.x = THREE.MathUtils.lerp(dragRotation.current.x, 0, 0.05);
        dragRotation.current.y = THREE.MathUtils.lerp(dragRotation.current.y, 0, 0.05);
    }
    
    const finalRotY = baseRotY + dragRotation.current.y;
    const finalRotX = baseRotX + dragRotation.current.x;

    squareRef.current.rotation.y = finalRotY;
    squareRef.current.rotation.x = finalRotX;
    textGroupRef.current.rotation.y = finalRotY;
    textGroupRef.current.rotation.x = finalRotX;
  });

  const sectionName = PORTFOLIO_SECTIONS[activeSection]?.name.toUpperCase() || "";

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    previousPointer.current = { x: e.clientX, y: e.clientY };
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: any) => {
    if (isDragging.current) {
      e.stopPropagation();
      const deltaX = e.clientX - previousPointer.current.x;
      const deltaY = e.clientY - previousPointer.current.y;
      
      dragRotation.current.y += deltaX * 0.01;
      dragRotation.current.x += deltaY * 0.01;
      
      previousPointer.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = 'grab';
  };

  const handlePointerOver = () => {
    if (!isDragging.current) document.body.style.cursor = 'grab';
  };

  const handlePointerOut = () => {
    if (!isDragging.current) document.body.style.cursor = 'auto';
  };

  return (
    <group
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerOut}
      onPointerOver={handlePointerOver}
      onPointerMissed={handlePointerUp}
    >
      <mesh ref={squareRef} scale={0}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial 
          color="#c49a5b" 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#c49a5b" 
          emissiveIntensity={0.2} 
          transparent 
          opacity={0} 
        />
      </mesh>
      
      <group ref={textGroupRef} scale={0}>
        <Text position={[0, 0, 0.36]} fontSize={0.06} color="#f5e6d3" font="/fonts/IMFell.ttf" anchorX="center" anchorY="middle">
          {sectionName}
        </Text>
        <Text position={[0, 0, -0.36]} rotation={[0, Math.PI, 0]} fontSize={0.06} color="#f5e6d3" font="/fonts/IMFell.ttf" anchorX="center" anchorY="middle">
          {sectionName}
        </Text>
        <Text position={[0.36, 0, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.06} color="#f5e6d3" font="/fonts/IMFell.ttf" anchorX="center" anchorY="middle">
          {sectionName}
        </Text>
        <Text position={[-0.36, 0, 0]} rotation={[0, -Math.PI / 2, 0]} fontSize={0.06} color="#f5e6d3" font="/fonts/IMFell.ttf" anchorX="center" anchorY="middle">
          {sectionName}
        </Text>
        <Text position={[0, 0.36, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.06} color="#f5e6d3" font="/fonts/IMFell.ttf" anchorX="center" anchorY="middle">
          {sectionName}
        </Text>
        <Text position={[0, -0.36, 0]} rotation={[Math.PI / 2, 0, 0]} fontSize={0.06} color="#f5e6d3" font="/fonts/IMFell.ttf" anchorX="center" anchorY="middle">
          {sectionName}
        </Text>
      </group>
    </group>
  );
}
