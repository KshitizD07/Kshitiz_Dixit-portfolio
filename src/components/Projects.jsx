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
      link: "https://github.com/KshitizD07/Skill-Sphere",
      liveUrl: "https://skill-sphere-v1.vercel.app/"
    },
    {
      id: 2,
      title: "Intelli-Light 3.0 & Sentinel — MARL Traffic Grid & Autonomous ANPR Intercept",
      description: "Spatio-temporal multi-agent RL for coordinated traffic signal control coupled with city-wide multi-camera ANPR tracking and tactical red-wall intercept orchestration.",
      problem: "Static signal timers create compounding urban gridlock and delay emergency responders, while municipal surveillance lacks closed-loop coordination between vehicle recognition, anomaly detection, and signal control.",
      approach: "Engineered a topology-agnostic MARL system with GAT+LSTM networks in PyTorch/SUMO with NTCIP 1202 failsafes. Developed Sentinel: a tactical surveillance platform featuring a multi-frame RapidFuzz OCR consensus voter (0/D, 1/I confusion tolerance), kinematic road-snapping, GNN congestion-aware anomaly scoring, Markovian escape forecasting, and SHA-256 hash-chained intercept audit logging.",
      technologies: ["Python", "FastAPI", "PyTorch", "GAT+LSTM", "SUMO", "TraCI", "WebSockets", "RapidFuzz", "SQLite", "Leaflet"],
      status: "Research / Prototype",
      link: "https://github.com/KshitizD07/Intelli_Light"
    },
    {
      id: 3,
      title: "Pinaka — Studio & Project Ledger Platform",
      description: "A sovereign project studio and editorial portfolio registry bridging ambitious engineering ideas with verified squad collaboration.",
      problem: "High-potential engineering projects often die in isolated GitHub repositories without visibility, structured peer review, or cross-functional team formation.",
      approach: "Built a full-stack Next.js 14 App Router portal with cryptographic session authorization (HMAC-SHA256, timing-safe evaluation, origin CSRF guards) and sliding-window rate limiting. Implemented a dual-tier persistence layer (Supabase cloud registry with automatic local fallback) and direct squad collaboration integrations with SkillSphere.",
      technologies: ["Next.js 14", "React 18", "Tailwind CSS", "Supabase", "Node.js", "Cryptographic Auth", "SWR"],
      status: "Active Studio Hub",
      link: "https://github.com/KshitizD07/pinaka",
      liveUrl: "https://pinaka-v1.vercel.app/"
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
                  
                  {/* Project Action Links */}
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="project-link"
                        style={{
                          background: 'rgba(0, 240, 255, 0.1)',
                          border: '1px solid rgba(0, 240, 255, 0.3)',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🚀 Live Demo ↗
                      </a>
                    )}
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        className="project-link"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.4rem 0'
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Repository →
                      </a>
                    )}
                  </div>
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