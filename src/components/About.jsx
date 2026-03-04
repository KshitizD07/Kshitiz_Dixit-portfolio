/* ============================================
   ABOUT COMPONENT
   Second section - Motivation & Interests
   ============================================ */

import React from 'react';
import './About.css';

/**
 * About Component
 * 
 * Purpose: Explain motivation and intellectual interests
 * Focus on thinking and curiosity, not just biography
 * 
 * Contains:
 * - Section header
 * - Interest areas
 * - Narrative about your curiosity and approach
 * 
 * In later phases:
 * - Animated constellation lines in background
 * - Lines slowly connect and disconnect
 * - Represents ideas forming connections
 */
function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        
        {/* Section Header */}
        <div className="about-header">
          <h2 className="section-title">About</h2>
          <div className="section-divider"></div>
        </div>
        
        {/* Main Content */}
        <div className="about-content">
          
          {/* Introduction paragraph */}
          <div className="about-intro">
            <p className="about-text highlight">
              Curiosity about how complex behavior emerges from simple rules.
            </p>
          </div>
          
          {/* Interest Areas */}
          <div className="about-interests">
            
            <div className="interest-item">
              <h3 className="interest-title">Complex Systems</h3>
              <p className="interest-description">
                Fascinated by how simple rules create emergent complexity. 
                From cellular automata to swarm intelligence, exploring patterns 
                that arise from local interactions.
              </p>
            </div>
            
            <div className="interest-item">
              <h3 className="interest-title">Artificial Intelligence</h3>
              <p className="interest-description">
                Exploring AI systems and automation. Particularly interested in 
                how intelligent behavior can emerge through structured feedback loops 
                and reinforcement learning.
              </p>
            </div>
            
            <div className="interest-item">
              <h3 className="interest-title">Cognitive Models</h3>
              <p className="interest-description">
                Curious about connections between computer science and human thinking. 
                How do we structure knowledge? How do ideas form connections? 
                What can computation teach us about cognition?
              </p>
            </div>
            
          </div>
          
          {/* Closing statement */}
          <div className="about-approach">
            <p className="about-text">
              My approach combines technical implementation with conceptual exploration. 
              Every project is an opportunity to understand systems at a deeper level — 
              not just building tools, but exploring the principles that make them work.
            </p>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}

export default About;