import './Hero.css';

function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          KSHITIZ DIXIT
        </h1>
        
        <p className="hero-subtitle">
          Software Engineer specializing in Cloud Infrastructure, DevOps & Scalable Backend Systems
        </p>
        
        <p className="hero-description">
          Focused on Linux, Docker containerization, CI/CD automation, AWS cloud deployment, and high-performance backend architectures.
        </p>
        
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in Touch
          </a>
        </div>
        
      </div>
    </section>
  );
}

export default Hero;