import { memo } from 'react';

interface SectionProps {
  isActive: boolean;
}

function AboutBase({ isActive }: SectionProps) {
  return (
    <section className={`section ${isActive ? 'section-active' : ''}`}>
      <h2>About</h2>
      <div className="content-card">
        <span className="highlight">Curiosity about how complex behavior emerges from simple rules.</span>
        <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          I build projects that explore the intersection of technology and structured thinking, with a focus on creating intelligent systems that solve real-world problems.
        </p>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-accent)', fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-title)' }}>Systems & Experimentation</h3>
          <p style={{ textAlign: 'center' }}>
            I enjoy building systems and prototypes to explore ideas in practice.
            Many of my projects start as experiments â€” testing architectures, algorithms, or workflows.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-accent)', fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-title)' }}>Artificial Intelligence</h3>
          <p style={{ textAlign: 'center' }}>
            Exploring AI systems and automation. Particularly interested in
            how intelligent behavior can emerge through structured feedback loops
            and reinforcement learning.
          </p>
        </div>

        <p style={{ marginTop: '1rem', borderTop: '1px solid rgba(212, 163, 115, 0.2)', paddingTop: '1rem', textAlign: 'center' }}>
          My approach combines technical implementation with conceptual exploration.
          Every project is an opportunity to understand systems at a deeper level â€” 
          not just building tools, but exploring the principles that make them work.
        </p>
      </div>
    </section>
  );
}

export const About = memo(AboutBase);
