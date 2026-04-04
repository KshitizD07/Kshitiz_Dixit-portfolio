import './Ideas.css';

function Ideas() {
  
  const thoughts = [
    "Automation reduces cognitive load",
    "Systems become intelligent through stable feedback loops",
    "Structure enables creativity, chaos limits it"
  ];
  
  const interests = [
    "Philosophy",
    "Cognitive Science",
    "Human-Computer Interaction",
  ];
  
  return (
    <section className="ideas section" id="ideas">
      <div className="container">
        
        {/* Section Header */}
        <div className="ideas-header">
          <h2 className="section-title">Ideas & Interests</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Concepts, curiosities, and questions worth exploring
          </p>
        </div>
        
        {/* Ideas Content */}
        <div className="ideas-content">
          
          {/* Thoughts Section */}
          <div className="thoughts-section">
            <h3 className="subsection-title">Thoughts</h3>
            
            <div className="thoughts-grid">
              {thoughts.map((thought, index) => (
                <div key={index} className="thought-fragment">
                  <div className="fragment-dot"></div>
                  <p className="thought-text">{thought}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Divider */}
          <div className="ideas-divider"></div>
          
          {/* Interests Section */}
          <div className="interests-section">
            <h3 className="subsection-title">Intellectual Interest</h3>
            
            <div className="interests-cloud">
              {interests.map((interest, index) => (
                <span key={index} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          {/* Closing statement */}
          <div className="ideas-closing">
            <p className="closing-text">
              I enjoy reading philosophy and psychology books that explore how humans think, make decisions, and build systems of meaning. 
            </p>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}

export default Ideas;