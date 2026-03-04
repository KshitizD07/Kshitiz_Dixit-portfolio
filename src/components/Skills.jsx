/* ============================================
   SKILLS COMPONENT
   Fifth section - Technical Capabilities
   ============================================ */

import React from 'react';
import './Skills.css';

/**
 * Skills Component
 * 
 * Purpose: Show technical capability clearly
 * Divided into categories for easy scanning
 * 
 * Contains:
 * - Skill categories (Languages, Tools, Concepts)
 * - Skills displayed as nodes/cards
 * 
 * In later phases:
 * - Skills will appear as glowing nodes
 * - Nodes connected by faint lines (constellation style)
 * - Represents systems thinking
 * 
 * Design note: Visual layout hints at future constellation effect
 */
function Skills() {
  
  // Skill categories - easily modify or add more
  const skillCategories = [
    {
      id: 1,
      category: "Programming Languages",
      skills: [
        { name: "C++", level: "Advanced" },
        { name: "Python", level: "Advanced" },
        { name: "JavaScript", level: "Intermediate" },
        { name: "Bash", level: "Intermediate" },
        { name: "SQL", level: "Intermediate" }
      ]
    },
    {
      id: 2,
      category: "Tools & Frameworks",
      skills: [
        { name: "Git", level: "Advanced" },
        { name: "Linux", level: "Advanced" },
        { name: "React", level: "Intermediate" },
        { name: "Three.js", level: "Learning" },
        { name: "Docker", level: "Intermediate" },
        { name: "TensorFlow", level: "Learning" }
      ]
    },
    {
      id: 3,
      category: "Concepts & Knowledge",
      skills: [
        { name: "Algorithms", level: "Advanced" },
        { name: "Data Structures", level: "Advanced" },
        { name: "Reinforcement Learning", level: "Learning" },
        { name: "Computer Graphics", level: "Intermediate" },
        { name: "Automation", level: "Intermediate" },
        { name: "System Design", level: "Intermediate" }
      ]
    }
  ];
  
  return (
    <section className="skills section" id="skills">
      <div className="container">
        
        {/* Section Header */}
        <div className="skills-header">
          <h2 className="section-title">Skills</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Technical capabilities and areas of expertise
          </p>
        </div>
        
        {/* Skills Grid */}
        <div className="skills-content">
          
          {skillCategories.map((category) => (
            <div key={category.id} className="skill-category">
              
              {/* Category Title */}
              <h3 className="category-title">{category.category}</h3>
              
              {/* Skills in this category */}
              <div className="skills-grid">
                
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-node">
                    
                    {/* Skill Name */}
                    <div className="skill-name">{skill.name}</div>
                    
                    {/* Skill Level Badge */}
                    <div className={`skill-level level-${skill.level.toLowerCase()}`}>
                      {skill.level}
                    </div>
                    
                    {/* Decorative dot (will become node in Phase 3+) */}
                    <div className="skill-dot"></div>
                    
                  </div>
                ))}
                
              </div>
              
            </div>
          ))}
          
        </div>
        
      </div>
    </section>
  );
}

export default Skills;