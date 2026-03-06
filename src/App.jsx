import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import BigBangTree from './scenes/BigBangTree';
import Home from './pages/Home';
import './App.css';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="app" style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* BULLETPROOF WRAPPER:
        Using inline styles to guarantee it takes exactly 100% of your screen width and height.
      */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0, 
        pointerEvents: 'none' 
      }}>
        <Canvas 
          camera={{ position: [0, -2, 15], fov: 50 }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          {/* A visual grid on the floor (y = -5) to help us debug 3D space */}
          <gridHelper args={[50, 50, '#FF2E63', '#444444']} position={[0, -5, 0]} />
          
          <BigBangTree count={2000} />
        </Canvas>
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        <Home />
      </div>
      
    </div>
  );
}

export default App;