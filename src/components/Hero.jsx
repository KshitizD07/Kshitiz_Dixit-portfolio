import './Hero.css';

function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          KSHITIZ DIXIT
        </h1>
        
        <p className="hero-subtitle">
          Building intelligent systems and exploring structured thinking
        </p>
        
        <p className="hero-description">
          Software Developer interested in AI, systems design, and Full Stack Development. 
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