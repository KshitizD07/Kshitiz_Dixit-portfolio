import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import BigBangTree from './scenes/BigBangTree';
import Home from './pages/Home';
import './App.css';

function App() {
  // State to track when the 3D intro is done (either settles or user skips)
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="app" style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* 3D Background Wrapper */}
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
          {/* We bumped the count to 10k and added the trigger! */}
          <BigBangTree 
            count={10000} 
            onAnimationComplete={() => setIntroFinished(true)} 
          />
        </Canvas>
      </div>

      {/* UI Foreground Wrapper */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        {/* We pass the introFinished signal down to your Home component */}
        <Home introFinished={introFinished} />
      </div>
      
    </div>
  );
}

export default App;