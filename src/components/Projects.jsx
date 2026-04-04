import './Projects.css';

function Projects() {
  
  // Project data - you can easily add/modify projects here
  const projects = [
    {
      id: 1,
      title: "Skill-Sphere",
      description: "Skill intelligence platform for CS/IT students: GitHub-verified skills, AI learning roadmaps, and skill-based team matching & networking.",
      problem: "CS/IT students lack credible skill proof for recruiters, struggle to find serious project teammates, and miss personalized, gap-based learning paths.",
      approach: "Full-stack API-first architecture: React + Vite (fast frontend), Express + Prisma (type-safe backend), GitHub + Gemini integrations for verification and AI.",
      technologies: ["React", "Node.js", "PostgreSQL","Prisma ORM", "Tailwind CSS","Express.js"],
      status: "In Development",
      link: "#" // Add GitHub or live demo link
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
    },
    {
      id: 3,
      title: "N.E.X.U.S.",
      description: "N.E.X.U.S. is SkillSphere's intelligent squad formation engine. It connects students with complementary skills, while always leaving final decisions to the squad leader.",
      problem: "I was tired of seeing great students miss out on meaningful projects just because team formation relied on self-reported skills, random Discords, or chance.",
      approach: "Used Two-layer antifragile matching, multiple independent strategies working in parallel — making recommendations more robust and adaptive over time.",
      technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS","Express.js"],
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
              {/* <a href={project.link} className="project-link">
                View Project →
              </a> */}
              
            </div>
          ))}
          
        </div>
        
      </div>
    </section>
  );
}

export default Projects;