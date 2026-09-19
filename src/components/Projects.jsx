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
      title: "SkillSphere - Cloud Infrastructure & CI/CD Pipeline",
      description: "A hardened, multi-container production deployment on AWS EC2 featuring automated GitHub Actions CI/CD pipelines, multi-stage Alpine Docker containerization, and Redis caching.",
      problem: "Deploying high-performance web applications with real-time WebSockets and databases on cost-effective cloud instances often leads to Out-Of-Memory (OOM) crashes, slow manual deployments, and security exposure from unprivileged root containers.",
      approach: "Architected a 4-container production environment via Docker Compose (Nginx reverse proxy, Node.js API, PostgreSQL 16, Redis 7) using bridge networking and isolated volume persistence. Implemented multi-stage Docker builds with non-root Alpine users, reducing image footprints by >70%. Engineered an automated CI/CD pipeline with GitHub Actions executing linting, unit tests, Docker Buildx compilation, and automated SSH deployment to AWS EC2 with zero-downtime Prisma migrations. Hardened Ubuntu EC2 with 2GB Linux Swap and strict VPC Security Groups.",
      technologies: ["AWS (EC2, VPC)", "Docker & Compose", "CI/CD (GitHub Actions)", "Docker Hub", "Nginx", "Linux & Bash", "PostgreSQL 16", "Redis 7", "Node.js", "Prisma ORM"],
      status: "Production Deployed",
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