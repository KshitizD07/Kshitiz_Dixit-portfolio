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
    <main className="home">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Research />
      <Skills />
      <Ideas />
      <Contact />
    </main>
  );
}

export default Home;