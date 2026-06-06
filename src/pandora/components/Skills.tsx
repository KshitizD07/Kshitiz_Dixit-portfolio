import React from 'react';

interface SectionProps {
  isActive: boolean;
}

export function Skills({ isActive }: SectionProps) {
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
    <section className={`section section-left ${isActive ? 'section-active' : ''}`}>
      <h2>Skills</h2>
      <div className="content-card">
        {skillCategories.map((category) => (
          <div key={category.id} style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', fontFamily: 'var(--font-title)', fontSize: '1.2rem' }}>
              {category.category}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {category.skills.map((skill, index) => (
                <span 
                  key={index} 
                  style={{ 
                    background: 'rgba(212, 163, 115, 0.1)', 
                    border: '1px solid rgba(212, 163, 115, 0.3)', 
                    padding: '0.3rem 0.8rem', 
                    borderRadius: '2px',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
