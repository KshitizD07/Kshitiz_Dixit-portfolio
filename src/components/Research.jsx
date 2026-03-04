/* ============================================
   RESEARCH COMPONENT
   Fourth section - Experiments & Exploration
   ============================================ */

import React from 'react';
import './Research.css';

/**
 * Research Component
 * 
 * Purpose: Demonstrate intellectual exploration and experimental work
 * This is where topics like agentic AI workflows, system design experiments,
 * and conceptual explorations can appear.
 * 
 * Contains:
 * - Research entries in terminal-style cards
 * - Each entry shows: problem, approach, observations, future ideas
 * 
 * In later phases:
 * - Terminal-style blinking cursor effect
 * - Cards can collapse into particles during transitions
 * 
 * Design note: More experimental/informal than Projects section
 */
function Research() {
  
  // Research entries - easily add/modify explorations
  const researchEntries = [
    {
      id: 1,
      title: "Designing a Structured Agentic Development Workflow",
      problem: "Agentic coding tools often create uncontrolled code generation when used without constraints. Autonomous prompts can degrade architecture over time.",
      approach: "Experimented with structured workflows using AI coding assistants. Breaking tasks into narrow, focused prompts. Maintaining human control over architectural decisions while delegating implementation details.",
      observations: [
        "Smaller iterative prompts produce better structured code",
        "Autonomous large prompts often degrade architecture",
        "Clear constraints improve AI output quality",
        "Human-in-the-loop validation prevents drift"
      ],
      futureIdeas: [
        "Design prompt pipelines for complex tasks",
        "Introduce validation loops at each stage",
        "Build architecture guardrails",
        "Create reusable prompt templates"
      ]
    },
    {
      id: 2,
      title: "Exploring Emergence in Cellular Automata",
      problem: "How do complex patterns emerge from simple local rules? Can we predict emergent behavior from rule specifications?",
      approach: "Implemented various cellular automata systems (Conway's Game of Life, Rule 30, etc.). Analyzed pattern formation, stability, and chaos across different rule sets.",
      observations: [
        "Simple rules can produce incredibly complex behavior",
        "Some rules lead to stable patterns, others to chaos",
        "Edge cases often reveal unexpected emergent properties",
        "Initial conditions dramatically affect outcomes"
      ],
      futureIdeas: [
        "Apply ML to predict emergent patterns",
        "Design custom rule sets for specific behaviors",
        "Explore 3D cellular automata",
        "Investigate applications in procedural generation"
      ]
    },
    {
      id: 3,
      title: "Reinforcement Learning in Simple Environments",
      problem: "Understanding how RL agents learn optimal policies through trial and error. What factors influence learning speed and stability?",
      approach: "Built simple grid-world environments. Implemented Q-learning and policy gradient methods. Experimented with reward shaping and exploration strategies.",
      observations: [
        "Reward design critically impacts learning",
        "Exploration vs exploitation tradeoff is crucial",
        "Simple environments reveal fundamental principles",
        "Hyperparameters significantly affect convergence"
      ],
      futureIdeas: [
        "Test on more complex environments",
        "Implement curiosity-driven exploration",
        "Compare different RL algorithms",
        "Visualize learned policies"
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
              
              {/* Problem Section */}
              <div className="entry-section">
                <h4 className="entry-label">
                  <span className="label-icon">▹</span> Problem
                </h4>
                <p className="entry-text">{entry.problem}</p>
              </div>
              
              {/* Approach Section */}
              <div className="entry-section">
                <h4 className="entry-label">
                  <span className="label-icon">▹</span> Approach
                </h4>
                <p className="entry-text">{entry.approach}</p>
              </div>
              
              {/* Observations Section */}
              <div className="entry-section">
                <h4 className="entry-label">
                  <span className="label-icon">▹</span> Observations
                </h4>
                <ul className="entry-list">
                  {entry.observations.map((obs, index) => (
                    <li key={index} className="list-item">{obs}</li>
                  ))}
                </ul>
              </div>
              
              {/* Future Ideas Section */}
              <div className="entry-section">
                <h4 className="entry-label">
                  <span className="label-icon">▹</span> Future Ideas
                </h4>
                <ul className="entry-list">
                  {entry.futureIdeas.map((idea, index) => (
                    <li key={index} className="list-item future-idea">{idea}</li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))}
          
        </div>
        
      </div>
    </section>
  );
}

export default Research;