/* ============================================
   PROJECTS COMPONENT
   Third section - Technical Work
   ============================================ */

import React from 'react';
import './Projects.css';

/**
 * Projects Component
 * 
 * Purpose: Demonstrate technical work and implementations
 * 
 * Contains:
 * - Project cards in a grid layout
 * - Each card shows: name, description, problem, approach, tech stack, status
 * 
 * In later phases:
 * - Cards will have subtle glow effects
 * - Hover will reveal more details
 * - Cards can dissolve into particles during transitions
 * 
 * Note: Even one well-presented project is better than many poorly explained ones
 */
function Projects() {
  
  // Project data - you can easily add/modify projects here
  const projects = [
    {
      id: 1,
      title: "Project Name 1",
      description: "A brief, compelling description of what this project does and why it matters.",
      problem: "What challenge or problem does this project address?",
      approach: "Key technical approach or methodology used to solve the problem.",
      technologies: ["React", "Node.js", "MongoDB", "WebGL"],
      status: "In Development",
      link: "#" // Add GitHub or live demo link
    },
    {
      id: 2,
      title: "Project Name 2",
      description: "Another project showcasing different skills or domain.",
      problem: "The core problem or opportunity this project tackles.",
      approach: "Technical strategy and implementation highlights.",
      technologies: ["Python", "TensorFlow", "FastAPI"],
      status: "Experimental",
      link: "#"
    },
    {
      id: 3,
      title: "Project Name 3",
      description: "Third project demonstrating breadth of technical capability.",
      problem: "What motivated this project?",
      approach: "How did you approach solving it?",
      technologies: ["C++", "OpenGL", "GLSL"],
      status: "Completed",
      link: "#"
    }
  ];
  
  return (
    <section className="projects section" id="projects">
      <div className="container">
        
        {/* Section Header */}
        <div className="projects-header">
          <h2 className="section-title">Projects</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Technical implementations and explorations
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="projects-grid">
          
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              
              {/* Status Badge */}
              <div className="project-status">
                <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              
              {/* Project Title */}
              <h3 className="project-title">{project.title}</h3>
              
              {/* Description */}
              <p className="project-description">{project.description}</p>
              
              {/* Problem Section */}
              <div className="project-section">
                <h4 className="project-label">Problem</h4>
                <p className="project-text">{project.problem}</p>
              </div>
              
              {/* Approach Section */}
              <div className="project-section">
                <h4 className="project-label">Approach</h4>
                <p className="project-text">{project.approach}</p>
              </div>
              
              {/* Technologies */}
              <div className="project-section">
                <h4 className="project-label">Technologies</h4>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* View Project Link */}
              <a href={project.link} className="project-link">
                View Project →
              </a>
              
            </div>
          ))}
          
        </div>
        
      </div>
    </section>
  );
}

export default Projects;