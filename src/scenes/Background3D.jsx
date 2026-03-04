/* ============================================
   BACKGROUND 3D COMPONENT - Phase 3
   Canvas wrapper for the Three.js scene
   ============================================ */

import { Canvas } from '@react-three/fiber';
import StarField from './StarField';
import './Background3D.css';

/**
 * Background3D Component
 * 
 * Sets up the React Three Fiber Canvas with proper configuration.
 * This component creates the WebGL context and renders the 3D scene.
 */
export default function Background3D() {
  return (
    <div className="background-3d">
      <Canvas
        // Camera setup - looking at the stars
        camera={{
          position: [0, 0, 50], // Moved back further to see more stars
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        
        // Rendering quality
        dpr={[1, 2]}
        
        // Performance monitoring
        performance={{ min: 0.5 }}
        
        // Set canvas background to transparent so we see the CSS background
        gl={{ 
          alpha: true,
          antialias: true 
        }}
      >
        {/* Brighter ambient light to make stars more visible */}
        <ambientLight intensity={1.0} />
        
        {/* Star Field - 1500 stars */}
        <StarField count={1500} />
      </Canvas>
    </div>
  );
}