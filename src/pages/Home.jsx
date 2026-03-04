/* ============================================
   COSMIC PORTFOLIO - HOME PAGE
   Phase 1: All sections in one page
   Phase 3: Added 3D starfield background
   ============================================ */

import React from 'react';
import Background3D from '../scenes/Background3D'; // ← ADD THIS LINE
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Skills from '../components/Skills';
import Ideas from '../components/Ideas';
import Contact from '../components/Contact';
import './Home.css';

/**
 * Home Component
 * 
 * Main portfolio page containing all sections.
 * Each section is a separate component for modularity.
 * 
 * Section order follows the narrative:
 * 1. Hero - Identity & introduction
 * 2. About - Motivation & interests
 * 3. Projects - Technical work
 * 4. Research - Experiments & exploration
 * 5. Skills - Technical capabilities
 * 6. Ideas - Intellectual curiosity
 * 7. Contact - Connection points
 * 
 * Phase 3 Addition:
 * - Background3D component renders WebGL starfield
 * - Fixed position, stays behind all content
 * - Slow cosmic drift animation
 */
function Home() {
  return (
    <main className="home">
      {/* Phase 3: 3D Starfield Background */}
      <Background3D /> {/* ← ADD THIS LINE */}
      
      {/* Fixed Navigation Bar */}
      <Navigation />
      
      {/* Hero Section - First impression */}
      <Hero />
      
      {/* About Section - Who you are */}
      <About />
      
      {/* Projects Section - What you've built */}
      <Projects />
      
      {/* Research Section - What you're exploring */}
      <Research />
      
      {/* Skills Section - Your capabilities */}
      <Skills />
      
      {/* Ideas Section - Your intellectual interests */}
      <Ideas />
      
      {/* Contact Section - How to reach you */}
      <Contact />
    </main>
  );
}

export default Home;