

import { useEffect, useRef, useState } from 'react';
import { ParticleSystem } from '../animations/ParticleSystem';
import './IntroAnimation.css';

/**
 * IntroAnimation Component
 * 
 * Animation sequence:
 * 1. Big Bang explosion from center (0-1s)
 * 2. Particles disperse outward (1-2s)
 * 3. Particles reconstruct into UI grid (2-4s)
 * 4. Fade out canvas, reveal actual website (4s)
 * 
 * Props:
 * @param {function} onComplete - Callback when animation finishes
 */
function IntroAnimation({ onComplete }) {
  const canvasRef = useRef(null);
  const particleSystemRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  const [animationPhase, setAnimationPhase] = useState('loading'); // 'loading', 'bigbang', 'disperse', 'reconstruct', 'complete'
  
  useEffect(() => {
    console.log('🎬 Intro animation initializing...');
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particle system
    const particleSystem = new ParticleSystem(canvas);
    particleSystemRef.current = particleSystem;
    
    // Create particles (500 for good balance of visual impact and performance)
    particleSystem.createParticles(500);
    
    // Start animation sequence
    startAnimationSequence(particleSystem);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particleSystem.resize();
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  /**
   * Start the smooth flowing animation
   * Explode → Smooth return → Form website
   */
  const startAnimationSequence = (particleSystem) => {
    const canvas = canvasRef.current;
    
    // Phase 1: Explosion (immediate start)
    setTimeout(() => {
      console.log('💥 Smooth circular explosion!');
      setAnimationPhase('exploding');
      particleSystem.explode(7);
    }, 100);
    
    // Phase 2: Start returning to form (after 1.2 seconds - while still exploding!)
    setTimeout(() => {
      console.log('🔄 Particles smoothly returning...');
      setAnimationPhase('returning');
      
      // Generate positions for Hero section layout
      const targets = generateHeroLayoutTargets(500, canvas.width, canvas.height);
      particleSystem.reconstruct(targets);
    }, 1200);
    
    // Phase 3: Complete (after 3.5 seconds)
    setTimeout(() => {
      console.log('✅ Animation complete - revealing website');
      setAnimationPhase('complete');
      particleSystem.complete();
      
      // Call onComplete callback
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 800);
    }, 3500);
    
    // Start smooth animation loop
    animate(particleSystem);
  };
  
  /**
   * Generate target positions that roughly match Hero section layout
   * Creates a centered rectangular area where Hero content would be
   */
  const generateHeroLayoutTargets = (count, width, height) => {
    const targets = [];
    
    // Hero section is typically centered
    const heroWidth = Math.min(800, width * 0.8);
    const heroHeight = Math.min(400, height * 0.5);
    const startX = (width - heroWidth) / 2;
    const startY = (height - heroHeight) / 2;
    
    // Distribute particles across Hero area
    for (let i = 0; i < count; i++) {
      targets.push({
        x: startX + Math.random() * heroWidth,
        y: startY + Math.random() * heroHeight
      });
    }
    
    return targets;
  };
  
  /**
   * Animation loop - updates and draws particles every frame
   */
  const animate = (particleSystem) => {
    // Update particle positions
    particleSystem.update();
    
    // Draw particles
    particleSystem.draw();
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(() => animate(particleSystem));
  };
  
  /**
   * Skip button handler
   */
  const handleSkip = () => {
    console.log('⏭️ Animation skipped');
    setAnimationPhase('complete');
    if (particleSystemRef.current) {
      particleSystemRef.current.complete();
    }
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <div className={`intro-animation ${animationPhase}`}>
      {/* Canvas for particle rendering */}
      <canvas 
        ref={canvasRef}
        className="intro-canvas"
      />
      
      {/* Skip button */}
      {animationPhase !== 'complete' && (
        <button 
          className="skip-button"
          onClick={handleSkip}
          aria-label="Skip intro animation"
        >
          Skip Intro →
        </button>
      )}
      
      {/* Loading text (optional) */}
      {animationPhase === 'loading' && (
        <div className="intro-text">
          <p>Initializing...</p>
        </div>
      )}
    </div>
  );
}

export default IntroAnimation;