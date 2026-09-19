import { memo } from 'react';

interface HeroProps {
  hasScrolled?: boolean;
}

function HeroBase({ hasScrolled }: HeroProps) {
  return (
    <section className="section section-hero section-active">
      <h1 className="hero-title">Kshitiz Dixit</h1>
      <p className="hero-subtitle">Architect of Cloud Infrastructure & Scalable Systems</p>
      <p className="hero-lore">
        — In the expanse between bare metal and the cloud, he carves order from chaos —
      </p>
    </section>
  );
}

export const Hero = memo(HeroBase);
