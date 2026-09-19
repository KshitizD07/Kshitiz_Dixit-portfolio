import { memo, useState } from 'react';

interface SectionProps {
  isActive: boolean;
  onProjectHover: (isHovering: boolean) => void;
}

function ProjectsBase({ isActive, onProjectHover }: SectionProps) {
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});

  const toggleProject = (projectId: number) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const projects = [
    {
      id: 1,
      title: "SkillSphere — Full-Stack Skill Verification & Squad Platform",
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
      technologies: ["Python", "TensorFlow", "SUMO", "OpenAI Gym", "TraCI", "PPO"],
      status: "Experimental",
      link: "#"
    }
  ];

  return (
    <section className={`section ${isActive ? 'section-active' : ''}`}>
      <h2>Projects</h2>
      <div className="content-card">
        <div className="projects-container">
          {projects.map((project) => {
            const isExpanded = expandedProjects[project.id] || false;

            return (
              <div
                key={project.id}
                className="project-item"
                onMouseEnter={() => onProjectHover(true)}
                onMouseLeave={() => onProjectHover(false)}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                  <h3>{project.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', border: '1px solid var(--color-accent)', padding: '2px 6px', borderRadius: '4px' }}>
                    {project.status}
                  </span>
                </div>

                <p style={{ marginBottom: '1rem', color: 'var(--color-text-primary)', textAlign: 'center' }}>{project.description}</p>

                <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Problem</h4>
                  <p style={{ fontSize: '1rem', textAlign: 'center' }}>{project.problem}</p>
                </div>

                <button
                  onClick={() => toggleProject(project.id)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(212, 163, 115, 0.4)',
                    color: 'var(--color-accent)',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-title)',
                    width: '100%',
                    maxWidth: '360px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    marginBottom: isExpanded ? '1rem' : '0'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(212, 163, 115, 0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                >
                  {isExpanded ? 'Hide Architecture ↑' : 'View Architecture ↓'}
                </button>

                {isExpanded && (
                  <div style={{ borderTop: '1px solid rgba(212, 163, 115, 0.2)', paddingTop: '1rem', animation: 'fadeIn 0.3s ease-in-out', textAlign: 'center' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <h4 style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Approach</h4>
                      <p style={{ fontSize: '1rem', textAlign: 'center' }}>{project.approach}</p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Forged With</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                        {project.technologies.map((tech, index) => (
                          <span key={index} style={{ background: 'rgba(212, 163, 115, 0.1)', border: '1px solid rgba(212, 163, 115, 0.3)', padding: '0.2rem 0.6rem', fontSize: '0.85rem' }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
                        Inspect Artifact →
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

export const Projects = memo(ProjectsBase);
