/* ============================================
   COSMIC PORTFOLIO - HOME PAGE
   Phase 1: All sections in one page
   ============================================ */

import React from 'react';
import Navigation from '../components/Navigation';
//import Starfield from '../scenes/Starfield';
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
 * NOTE: Components are being added one by one during development
 */
function Home() {
  return (
    <main className="home">
      {/* Three.js Starfield Background */}
      {/* <Starfield /> */}
      
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