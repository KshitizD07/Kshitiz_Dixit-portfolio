import { Canvas } from '@react-three/fiber';
import BigBangTree from './scenes/BigBangTree';
import Home from './pages/Home';
import './App.css';

// Determine particle count based on screen width for performance optimization
const getParticleCount = () => {
  const width = window.innerWidth;
  if (width < 768) return 1500;      // Mobile
  if (width < 1024) return 2500;     // Tablet
  return 4000;                        // Desktop
};

function App() {
  const particleCount = getParticleCount();

  return (
    <div className="app" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed 3D background visualization - decorative only */}
      <div
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: 0, 
          pointerEvents: 'none' 
        }}
        aria-hidden="true"
        role="presentation"
      >
        <Canvas 
          camera={{ position: [0, -7, 15], fov: 40 }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <BigBangTree count={particleCount} />
        </Canvas>
      </div>

      <main style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        <Home />
      </main>
    </div>
  );
}

export default App;