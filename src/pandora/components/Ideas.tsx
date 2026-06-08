import { memo } from 'react';

interface SectionProps {
  isActive: boolean;
}

function IdeasBase({ isActive }: SectionProps) {
  return (
    <section className={`section ${isActive ? 'section-active' : ''}`}>
      <h2>Ideas</h2>
      <div className="content-card">
        <p style={{ textAlign: 'center' }}>Exploring the potential of Agentic Workflows and Governance-First AI.</p>
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>Many projects start as experiments testing architectures, algorithms, or workflows that challenge standard conventions.</p>
      </div>
    </section>
  );
}

export const Ideas = memo(IdeasBase);
