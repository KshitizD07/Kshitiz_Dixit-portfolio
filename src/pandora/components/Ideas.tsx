import { memo } from 'react';

interface SectionProps {
  isActive: boolean;
}

function IdeasBase({ isActive }: SectionProps) {
  return (
    <section className={`section ${isActive ? 'section-active' : ''}`}>
      <h2>Philosophy & Inscriptions</h2>
      <div className="content-card">
        <span className="highlight">
          Emergent complexity is born from simple, unforgiving rules.
        </span>

        <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          "The tarnished blade is forged through trial; the resilient architecture is proved through load."
        </p>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-accent)', fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-title)' }}>
            Systems Design & Game Philosophy
          </h3>
          <p style={{ textAlign: 'center' }}>
            Beyond commercial pipelines, much of this engineer's design intuition draws inspiration from 
            the uncompromising worlds of <strong>FromSoftware</strong> and interactive game systems. 
            Titles like <em>Elden Ring</em> teach that great systems do not patronize with illusions of simplicity — 
            they establish strict, deterministic rules, trust the observer's curiosity, and reward mastery of constraints.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-accent)', fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-title)' }}>
            Governance-First Automation
          </h3>
          <p style={{ textAlign: 'center' }}>
            Just as game mechanics require unbreakable physics boundaries, agentic AI and automated workflows 
            demand strict separation between reasoning and execution authority. 
            Deterministic policy and isolated container sandboxes ensure that autonomy never drifts into catastrophe.
          </p>
        </div>

        <p style={{ marginTop: '1rem', borderTop: '1px solid rgba(212, 163, 115, 0.2)', paddingTop: '1rem', textAlign: 'center', color: 'var(--color-accent)' }}>
          The Pandora Artifact itself stands as a living testament — merging technical infrastructure with environmental world-building.
        </p>
      </div>
    </section>
  );
}

export const Ideas = memo(IdeasBase);
