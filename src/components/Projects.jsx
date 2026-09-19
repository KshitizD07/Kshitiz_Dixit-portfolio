import { useState } from 'react';
import './Projects.css';

function Projects() {
  
  // Track which projects are expanded
  const [expandedProjects, setExpandedProjects] = useState({});

  // Toggle expand/collapse for a specific project
  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const projects = [
    {
      id: 1,
      title: "SkillSphere - Full-Stack Skill Verification & Squad Platform",
      description: "An open-source collaboration platform that analyzes developer GitHub repositories to verify technical skills and match students into project squads.",
      problem: "CS/IT students lack empirical proof of their skills, struggle to find optimized learning paths, and rely on inefficient, manual networking to form project teams.",
      approach: "Implemented a single-port architecture by wrapping Express in the native Node.js HTTP server to handle both REST APIs and real-time bidirectional WebSocket communication using Socket.IO. Built a tiered rate-limiting layer to protect authentication routes from brute-force attacks and reduce repetitive PostgreSQL read queries. Integrated Google Gemini AI to analyze profile repositories and dynamically generate personalized, non-redundant engineering learning roadmaps based on users' skill gaps.",
      technologies: ["React (Feature-Sliced)", "Node.js", "Express.js", "PostgreSQL", "Socket.IO", "Google Gemini AI", "Prisma ORM", "Redis"],
      status: "Proprietary v1.1.0",
      link: "https://github.com/KshitizD07/Skill-Sphere"
    },
    {
      id: 2,
      title: "Intelli-Light",
      description: "Reinforcement-learning system that dynamically optimizes traffic signals to reduce congestion and prioritize emergency vehicles in simulated urban intersections.",
      problem: "Urban intersections suffer from inefficient fixed-time traffic signals, causing congestion, long wait times, and poor emergency vehicle prioritization. Traditional systems cannot adapt to dynamic traffic patterns or unexpected traffic surges.",
      approach: "Developed a SUMO-based reinforcement learning environment where a PPO agent controls traffic signals dynamically.",
      technologies: ["Python", "TensorFlow", "SUMO", "OpenAI Gym","TraCI","PPO"],
      status: "Experimental",
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
          
          {projects.map((project) => {
            const isExpanded = expandedProjects[project.id] || false;

            return (
            <div key={project.id} className="project-card">
              
              {/* Status Badge */}
              <div className="project-status">
                <span className={`status-badge status-${project.status.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  {project.status}
                </span>
              </div>
              
              {/* Project Title */}
              <h3 className="project-title">{project.title}</h3>
              
              {/* Description */}
              <p className="project-description">{project.description}</p>
              
              {/* Problem Section (Always visible) */}
              <div className="project-section">
                <h4 className="project-label">Problem</h4>
                <p className="project-text">{project.problem}</p>
              </div>

              {/* Expand/Collapse Button */}
              <button 
                className="expand-button" 
                onClick={() => toggleProject(project.id)}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  width: '100%',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                {isExpanded ? 'Hide Architecture Details ↑' : 'View Architecture & Approach ↓'}
              </button>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="project-expanded-content" style={{
                  animation: 'fadeIn 0.3s ease-in-out',
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem'
                }}>
                  {/* Approach Section */}
                  <div className="project-section">
                    <h4 className="project-label">Approach & Architecture</h4>
                    <p className="project-text" style={{ lineHeight: '1.6' }}>{project.approach}</p>
                  </div>
                  
                  {/* Technologies */}
                  <div className="project-section" style={{ marginTop: '1rem' }}>
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
                  {project.link !== "#" && (
                    <a href={project.link} className="project-link" style={{ marginTop: '1.5rem', display: 'inline-block' }} target="_blank" rel="noopener noreferrer">
                      View Repository →
                    </a>
                  )}
                </div>
              )}
              
            </div>
            );
          })}
          
        </div>
        
      </div>
    </section>
  );
}

export default Projects;