import React from 'react';

interface SectionProps {
  isActive: boolean;
}

export function Contact({ isActive }: SectionProps) {
  return (
    <section className={`section section-left ${isActive ? 'section-active' : ''}`}>
      <h2>Connect</h2>
      <div className="content-card">
        <p>Let us forge new legends together. Reach out for collaborations or technical discussions regarding intelligent systems.</p>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
          <a href="https://github.com/KshitizD07" className="highlight" style={{ textDecoration: 'none', marginBottom: 0 }} target="_blank" rel="noreferrer">GitHub</a>
          <a href="#" className="highlight" style={{ textDecoration: 'none', marginBottom: 0 }}>LinkedIn</a>
          <a href="mailto:your.email@gmail.com" className="highlight" style={{ textDecoration: 'none', marginBottom: 0 }}>Email</a>
        </div>
      </div>
    </section>
  );
}
