import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Research from '../components/Research';
import Skills from '../components/Skills';
import Ideas from '../components/Ideas';
import Contact from '../components/Contact';
import './Home.css';

function Home() {
  return (
    <div className="home" id="main-content">
      <Navigation />
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="research">
        <Research />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="ideas">
        <Ideas />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default Home;