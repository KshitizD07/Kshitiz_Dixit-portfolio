import './Skills.css';

function Skills() {
  
  // 1. CLEANED DATA STRUCTURE
  // Removed all "level" tags. Now it's just a clean array of strings.
  const skillCategories = [
    {
      id: 1,
      category: "Programming Languages",
      skills: ["C++", "Python", "JavaScript", "Bash", "SQL"]
    },
    {
      id: 2,
      category: "Tools & Frameworks",
      skills: ["Git & GitHub", "Linux", "React", "Three.js", "Node.js", "Express"]
    },
    {
      id: 3,
      category: "Concepts & Knowledge",
      skills: ["Algorithms", "Data Structures", "Reinforcement Learning", "System Design Fundamentals"]
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