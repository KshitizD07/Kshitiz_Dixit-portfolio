import './Skills.css';

function Skills() {
  
  // 1. CLEANED DATA STRUCTURE
  // Removed all "level" tags. Now it's just a clean array of strings.
  const skillCategories = [
    {
      id: 1,
      category: "Cloud & DevOps",
      skills: ["Docker", "K8s", "AWS", "OCI", "CI/CD Pipeline", "Git / GitHub", "Linux", "Bash"]
    },
    {
      id: 2,
      category: "Backend & Databases",
      skills: ["Node.js", "Express.js", "PostgreSQL", "Redis", "Prisma ORM", "RESTful APIs", "Socket.IO"]
    },
    {
      id: 3,
      category: "Programming Languages",
      skills: ["JavaScript", "Python", "C++", "SQL"]
    },
    {
      id: 4,
      category: "Core CS & Fundamentals",
      skills: ["Data Structures & Algorithms", "Operating Systems", "Networking & Security", "DBMS", "System Design Basics"]
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
                
                {/* 2. CLEANED JSX */}
                {/* Now simply maps over the strings directly without rendering any badges */}
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-node">
                    
                    {/* Skill Name */}
                    <div className="skill-name">{skill}</div>
                    
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