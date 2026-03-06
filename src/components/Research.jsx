/* ============================================
   RESEARCH COMPONENT
   Fourth section - Experiments & Exploration
   ============================================ */

import React from 'react';
import './Research.css';

function Research() {
  
  // 1. COMPLETELY DYNAMIC DATA STRUCTURE
  // You can now add, remove, or rename ANY section. 
  // - If 'content' is a string, it renders a paragraph.
  // - If 'content' is an array [...], it renders a bulleted list.
  const researchEntries = [
    {
      id: 1,
      title: "Designing a Structured Agentic Development Workflow",
      sections: [
        {
          title: "Problem",
          content: "Agentic coding tools can generate large amounts of code quickly, but without constraints they often produce unstructured or drifting architectures. Autonomous prompts may degrade code quality and consistency over time."
        },
        {
          title: "Approach",
          content: "Designed a structured AI-assisted workflow that constrains agent behavior through task boundaries, project context, and human approval checkpoints. Tested using \"Aider\" as the execution interface while maintaining human control over architectural decisions."
        },
        {
          title: "Workflow", // Changed from Observations
          content: [
            "Smaller iterative prompts produce better structured code",
            "Autonomous large prompts often degrade architecture",
            "Clear constraints improve AI output quality",
            "Human-in-the-loop validation prevents drift"
          ]
        }
        // Notice: No Future Ideas here! The code will just skip it seamlessly.
      ]
    },
    {
      id: 2,
      title: "Exploring Emergence in Cellular Automata",
      sections: [
        {
          title: "Core Question", // Custom title!
          content: "How do complex patterns emerge from simple local rules? Can we predict emergent behavior from rule specifications?"
        },
        {
          title: "Approach",
          content: "Implemented various cellular automata systems (Conway's Game of Life, Rule 30, etc.). Analyzed pattern formation, stability, and chaos across different rule sets."
        },
        {
          title: "Observations",
          content: [
            "Simple rules can produce incredibly complex behavior",
            "Some rules lead to stable patterns, others to chaos",
            "Edge cases often reveal unexpected emergent properties",
            "Initial conditions dramatically affect outcomes"
          ]
        },
        {
          title: "Future Ideas",
          content: [
            "Apply ML to predict emergent patterns",
            "Design custom rule sets for specific behaviors",
            "Explore 3D cellular automata",
            "Investigate applications in procedural generation"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Reinforcement Learning in Simple Environments",
      sections: [
        {
          title: "Problem",
          content: "Understanding how RL agents learn optimal policies through trial and error. What factors influence learning speed and stability?"
        },
        {
          title: "Methodology", // Another custom title
          content: "Built simple grid-world environments. Implemented Q-learning and policy gradient methods. Experimented with reward shaping and exploration strategies."
        },
        {
          title: "Key Takeaways",
          content: [
            "Reward design critically impacts learning",
            "Exploration vs exploitation tradeoff is crucial",
            "Simple environments reveal fundamental principles",
            "Hyperparameters significantly affect convergence"
          ]
        }
      ]
    }
  ];
  
  return (
    <section className="research section" id="research">
      <div className="container">
        
        {/* Section Header */}
        <div className="research-header">
          <h2 className="section-title">Research & Experiments</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Intellectual exploration and conceptual experiments
          </p>
        </div>
        
        {/* Research Entries */}
        <div className="research-content">
          
          {researchEntries.map((entry) => (
            <div key={entry.id} className="research-entry">
              
              {/* Terminal-style header */}
              <div className="entry-header">
                <span className="terminal-prompt">~/research/</span>
                <h3 className="entry-title">{entry.title}</h3>
              </div>
              
              {/* 2. DYNAMIC RENDERING ENGINE */}
              {/* This loops through whatever sections you defined above and renders them automatically */}
              {entry.sections.map((section, index) => (
                <div key={index} className="entry-section">
                  <h4 className="entry-label">
                    <span className="label-icon">▹</span> {section.title}
                  </h4>
                  
                  {/* Check if the content is an array (list) or a string (paragraph) */}
                  {Array.isArray(section.content) ? (
                    <ul className="entry-list">
                      {section.content.map((item, i) => (
                        <li key={i} className="list-item">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="entry-text">{section.content}</p>
                  )}
                </div>
              ))}
              
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

export default Research;