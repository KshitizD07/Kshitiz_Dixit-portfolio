/* ============================================
   STARFIELD - ULTIMATE DEBUG VERSION
   Colored background + Large visible spheres
   ============================================ */

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './Starfield.css';

/**
 * Generate star positions - close to camera for guaranteed visibility
 */
const generateStarPositions = () => {
  const positions = [];
  // Stars VERY close to camera in a grid pattern (easier to see)
  for (let x = -10; x <= 10; x += 5) {
    for (let y = -10; y <= 10; y += 5) {
      positions.push([x, y, -15]); // All at z=-15 (in front of camera at z=0)
    }
  }
  console.log('✨ Generated', positions.length, 'star positions in grid');
  return positions;
};

const starPositions = generateStarPositions();

/**
 * Single LARGE visible star
 */
function Star({ position, color }) {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      // Make it pulse so you KNOW it's animating
      meshRef.current.scale.setScalar(1 + Math.sin(Date.now() * 0.001) * 0.2);
    }
  });
  
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

/**
 * Stars group
 */
function Stars() {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];
  
  useEffect(() => {
    console.log('✨ Rendering', starPositions.length, 'colored spheres');
  }, []);
  
  return (
    <group>
      {starPositions.map((pos, i) => (
        <Star key={i} position={pos} color={colors[i % colors.length]} />
      ))}
    </group>
  );
}

/**
 * Test cube to verify rendering works
 */
function TestCube() {
  const cubeRef = useRef();
  
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={cubeRef} position={[0, 0, -10]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#FF0000" />
    </mesh>
  );
}

function Starfield() {
  useEffect(() => {
    console.log('✨ Starfield with colored background mounted');
  }, []);
  
  return (
    <div className="starfield-container">
      <Canvas
        camera={{ 
          position: [0, 0, 0], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
          backgroundColor: '#FF00FF' // BRIGHT MAGENTA - you MUST see this!
        }}
        onCreated={(state) => {
          console.log('✨ Canvas created');
          console.log('Camera position:', state.camera.position);
          console.log('Renderer:', state.gl.domElement);
        }}
      >
        {/* Bright background color */}
        <color attach="background" args={['#FF00FF']} />
        
        {/* Test cube - spinning red cube */}
        <TestCube />
        
        {/* Colored stars in grid */}
        <Stars />
      </Canvas>
    </div>
  );
}

export default Starfield;