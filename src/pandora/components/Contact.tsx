import { memo } from 'react';

interface SectionProps {
  isActive: boolean;
}

function ContactBase({ isActive }: SectionProps) {
  return (
    <section className={`section ${isActive ? 'section-active' : ''}`}>
      <h2>Leave a Rune</h2>
      <div className="content-card">
        <span className="highlight" style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>
          The Summoning Sign is Inscribed
        </span>
        <p style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '1.5rem' }}>
          Whether you seek to architect cloud infrastructure, deploy containerized platforms, 
          or discuss systems engineering and creative computation — leave a rune across the ether.
        </p>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/KshitizD07"
            className="highlight"
            style={{ textDecoration: 'none', marginBottom: 0, fontSize: '1.1rem' }}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/kshitiz-dixit"
            className="highlight"
            style={{ textDecoration: 'none', marginBottom: 0, fontSize: '1.1rem' }}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:kshitizd777@gmail.com"
            className="highlight"
            style={{ textDecoration: 'none', marginBottom: 0, fontSize: '1.1rem' }}
          >
            kshitizd777@gmail.com ↗
          </a>
        </div>
      </div>
    </section>
  );
}

export const Contact = memo(ContactBase);
