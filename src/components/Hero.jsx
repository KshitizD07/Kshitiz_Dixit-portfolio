/* ============================================
   HERO COMPONENT
   First section - Identity & Introduction
   ============================================ */

import React from 'react';
import './Hero.css';

/**
 * Hero Component
 * 
 * Purpose: Immediately communicate identity
 * 
 * Contains:
 * - Name
 * - Identity statement
 * - Brief description
 * - Call-to-action buttons
 * 
 * In later phases:
 * - Particles will converge to form the text
 * - Background will have cosmic starfield
 * - Text will have subtle glow effects
 */
function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="container">
        <div className="hero-content">
          
          {/* Main heading - Your name */}
          <h1 className="hero-title">
            Your Name
          </h1>
          
          {/* Identity statement */}
          <p className="hero-subtitle">
            Building intelligent systems and exploring structured thinking
          </p>
          
          {/* Description */}
          <p className="hero-description">
            Computer Science student interested in AI, systems design, and cognitive models
          </p>
          
          {/* Call-to-action buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in Touch
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;