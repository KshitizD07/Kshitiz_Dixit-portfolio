import { memo } from 'react';

interface SectionProps {
  isActive: boolean;
}

function AboutBase({ isActive }: SectionProps) {
  return (
    <section className={`section ${isActive ? 'section-active' : ''}`}>
      <h2>The Genesis</h2>
      <div className="content-card">
        <span className="highlight">Complex architectures emerge from foundational discipline.</span>
        
        <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          "He who architects the unseen foundations determines whether the citadel stands or falls."
        </p>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-accent)', fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-title)' }}>
            The Forge & Infrastructure
          </h3>
          <p style={{ textAlign: 'center' }}>
            Dedicated to cloud resilience, containerized isolation, and automated pipelines. 
            He constructs production environments using Docker, Linux, and AWS — hardening instances 
            against memory exhaustion and ensuring zero-downtime continuous delivery.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--color-accent)', fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-title)' }}>
            Systems & Applied Intelligence
          </h3>
          <p style={{ textAlign: 'center' }}>
            Bridging distributed backend services with verified data telemetry. 
            Every system — from real-time WebSocket conduits to AI-driven skill diagnostics — 
            is engineered through deterministic boundaries and structured feedback loops.
          </p>
        </div>

        <p style={{ marginTop: '1rem', borderTop: '1px solid rgba(212, 163, 115, 0.2)', paddingTop: '1rem', textAlign: 'center', color: 'var(--color-accent)' }}>
          To build is ordinary. To architect systems that withstand adversity and scale gracefully — that is the true craft.
        </p>
      </div>
    </section>
  );
}

export const About = memo(AboutBase);
