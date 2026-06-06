import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { OuterBox, InnerArtifacts } from './PandoraBox';
import { Atmosphere } from './Atmosphere';
import { Overlay } from './Overlay';

// A component just to capture the scroll object and pass it up
function ScrollManager({ setScrollObj }: { setScrollObj: (scroll: any) => void }) {
  const scroll = useScroll();
  useEffect(() => {
    setScrollObj(scroll);
  }, [scroll, setScrollObj]);
  return null;
}

import { PORTFOLIO_SECTIONS, TOTAL_PAGES } from '../config';

function ScrollWatcher({ onScroll }: { onScroll: (progress: number) => void }) {
  const scroll = useScroll();
  useFrame(() => {
    onScroll(scroll.offset);
  });
  return null;
}

function InteractiveScene({ hasScrolled, activeSection, isProjectHovered, onProjectHover }: { hasScrolled: boolean, activeSection: number, isProjectHovered: boolean, onProjectHover: (val: boolean) => void }) {
    const lightRef = useRef<THREE.SpotLight>(null);
    
    useFrame((state) => {
        if (!lightRef.current) return;
        
        const targetX = state.mouse.x * 10;
        const targetY = state.mouse.y * 10;
        
        lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.1);
        lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.1);

        const targetIntensity = isProjectHovered ? 8 : 4;
        lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity, 0.1);
    });

    return (
        <>
            <color attach="background" args={['#0a0a0a']} />
            <fog attach="fog" args={['#0a0a0a', 5, 25]} />

            <ambientLight intensity={0.2} color="#f5e6d3" />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#c49a5b" castShadow />
            
            <spotLight 
                ref={lightRef}
                position={[0, 5, 10]} 
                intensity={4} 
                color="#ffaa00" 
                penumbra={1} 
                distance={25} 
                angle={0.4} 
                castShadow
            />
            
            <Atmosphere />
            <InnerArtifacts activeSection={activeSection} />

            <Scroll>
                <OuterBox />
            </Scroll>

            <Scroll html style={{ width: '100%', pointerEvents: 'none' }}>
                <div style={{ pointerEvents: 'auto' }}>
                  <Overlay hasScrolled={hasScrolled} activeSection={activeSection} onProjectHover={onProjectHover} />
                </div>
            </Scroll>
        </>
    );
}

export function Scene() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isProjectHovered, setIsProjectHovered] = useState(false);
  
  // Store the R3F scroll object so we can trigger jumps
  const [scrollObj, setScrollObj] = useState<any>(null);

  const handleScrollUpdate = (progress: number) => {
    if (progress > 0.01 && !hasScrolled) {
      setHasScrolled(true);
    } else if (progress <= 0.01 && hasScrolled) {
      setHasScrolled(false);
    }

    if (progress > 0.08 && !isNavVisible) {
      setIsNavVisible(true);
    } else if (progress <= 0.08 && isNavVisible) {
      setIsNavVisible(false);
    }

    // Dynamic math based on total pages
    const currentSection = Math.round(progress * (TOTAL_PAGES - 1));
    if (currentSection !== activeSection) {
        setActiveSection(currentSection);
    }
  };

  const scrollToSection = (index: number) => {
    if (scrollObj) {
      const targetOffset = index / (TOTAL_PAGES - 1);
      scrollObj.el.scrollTo({
        top: targetOffset * (scrollObj.el.scrollHeight - scrollObj.el.clientHeight),
        behavior: 'smooth'
      });
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="theme-pandora">
      <div className="canvas-container">
      {/* Top Navbar */}
      <nav className={`top-nav ${isNavVisible ? 'visible' : ''}`}>
        <div className="nav-brand" onClick={() => scrollToSection(0)}>
          Kshitiz Dixit
        </div>
        <div className="nav-links">
          {PORTFOLIO_SECTIONS.slice(1).map((section, idx) => {
            const sectionIdx = idx + 1;
            return (
              <button 
                key={sectionIdx} 
                className={`nav-link ${activeSection === sectionIdx ? 'active' : ''}`}
                onClick={() => scrollToSection(sectionIdx)}
              >
                {section.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Side Dots (Secondary Nav) */}
      <div className="fixed-nav">
        {PORTFOLIO_SECTIONS.map((section, idx) => (
          <div 
            key={idx} 
            className={`nav-dot ${activeSection === idx ? 'active' : ''}`} 
            title={section.name} 
            onClick={() => scrollToSection(idx)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* 
        dpr caps resolution on high-density mobile screens to save GPU 
        camera.position.z is moved back on mobile so the box fits inside the narrower viewport
      */}
      <Canvas 
        camera={{ position: [0, 0, isMobile ? 12 : 8], fov: 50 }} 
        shadows 
        dpr={[1, 1.5]}
      >
        <ScrollControls pages={TOTAL_PAGES} damping={0.25}>
          <ScrollManager setScrollObj={setScrollObj} />
          <ScrollWatcher onScroll={handleScrollUpdate} />
          <InteractiveScene hasScrolled={hasScrolled} activeSection={activeSection} isProjectHovered={isProjectHovered} onProjectHover={setIsProjectHovered} />
        </ScrollControls>
        <Environment preset="night" />
      </Canvas>
      </div>
    </div>
  );
}
