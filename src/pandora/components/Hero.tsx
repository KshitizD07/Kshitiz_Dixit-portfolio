import React from 'react';

interface HeroProps {
  hasScrolled: boolean;
}

export function Hero({ hasScrolled }: HeroProps) {
  return (
    <section className={`section-hero ${hasScrolled ? 'hero-visible' : ''}`}>
      <h1 className="hero-title">Kshitiz Dixit</h1>
      <p className="hero-subtitle">Architect of Intelligent Systems & Digital Artifacts</p>
    </section>
  );
}
