import { memo } from 'react';

interface SectionProps {
  isActive: boolean;
}

function SkillsBase({ isActive }: SectionProps) {
  const skillCategories = [
    {
      id: 1,
      category: "The Forge — Cloud & DevOps",
      skills: ["Docker", "K8s", "AWS", "OCI", "CI/CD Pipeline", "Git / GitHub", "Linux", "Bash"]
    },
    {
      id: 2,
      category: "The Conduit — Backend & Systems",
      skills: ["Node.js", "Express.js", "PostgreSQL", "Redis", "Prisma ORM", "RESTful APIs", "Socket.IO"]
    },
    {
      id: 3,
      category: "The Runes — Languages",
      skills: ["JavaScript", "Python", "C++", "SQL"]
    },
    {
      id: 4,
      category: "The Tomes — Foundations & Architecture",
      skills: ["Data Structures & Algorithms", "Operating Systems", "Networking & Security", "DBMS", "System Design Basics"]
    }
  ];

  return (
    <section className={`section ${isActive ? 'section-active' : ''}`}>
      <h2>The Disciplines</h2>
      <div className="content-card">
        <span className="highlight" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Armament of the Modern Engineer
        </span>
        {skillCategories.map((category) => (
          <div key={category.id} style={{ marginBottom: '1.5rem', textAlign: 'center', width: '100%' }}>
            <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.6rem', fontFamily: 'var(--font-title)', fontSize: '1.15rem' }}>
              {category.category}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {category.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: 'rgba(212, 163, 115, 0.08)',
                    border: '1px solid rgba(212, 163, 115, 0.3)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '2px',
                    fontSize: '0.88rem',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.02em',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
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

export const Skills = memo(SkillsBase);
