/* ============================================
   IDEAS COMPONENT
   Sixth section - Intellectual Curiosity
   ============================================ */

import React from 'react';
import './Ideas.css';

/**
 * Ideas Component
 * 
 * Purpose: Show intellectual curiosity and broader interests
 * This section is intentionally minimal and conceptual
 * 
 * Contains:
 * - Short thoughts or principles
 * - Topics of interest
 * - Floating fragments of ideas
 * 
 * In later phases:
 * - Text fragments will float and fade
 * - Particles drift in background
 * - Minimalist, contemplative feel
 * 
 * Design note: Most abstract section - focused on thinking, not doing
 */
function Ideas() {
  
  // Thought fragments - short conceptual statements
  const thoughts = [
    "Automation reduces cognitive load",
    "Systems become intelligent through stable feedback loops",
    "Software design often mirrors natural systems",
    "Emergence: complex behavior from simple rules",
    "Structure enables creativity, chaos limits it"
  ];
  
  // Areas of intellectual interest
  const interests = [
    "Artificial Intelligence",
    "Cognitive Science",
    "Systems Thinking",
    "Philosophy of Mind",
    "Complex Systems",
    "Computational Creativity",
    "Human-Computer Interaction",
    "Information Theory"
  ];
  
  return (
    <section className="ideas section" id="ideas">
      <div className="container">
        
        {/* Section Header */}
        <div className="ideas-header">
          <h2 className="section-title">Ideas & Interests</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Concepts, curiosities, and questions worth exploring
          </p>
        </div>
        
        {/* Ideas Content */}
        <div className="ideas-content">
          
          {/* Thoughts Section */}
          <div className="thoughts-section">
            <h3 className="subsection-title">Thoughts</h3>
            
            <div className="thoughts-grid">
              {thoughts.map((thought, index) => (
                <div key={index} className="thought-fragment">
                  <div className="fragment-dot"></div>
                  <p className="thought-text">{thought}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Divider */}
          <div className="ideas-divider"></div>
          
          {/* Interests Section */}
          <div className="interests-section">
            <h3 className="subsection-title">Topics of Interest</h3>
            
            <div className="interests-cloud">
              {interests.map((interest, index) => (
                <span key={index} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          {/* Closing statement */}
          <div className="ideas-closing">
            <p className="closing-text">
              Exploring the space where computation meets cognition, 
              structure meets emergence, and systems reveal their hidden patterns.
            </p>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}

export default Ideas;