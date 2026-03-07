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
          content: "Agentic coding tools generate code rapidly, but without constraints they often produce drifting or inconsistent architectures."
        },
        {
          title: "Approach",
          content: "Designed a structured AI-assisted workflow using task boundaries, project context, and human approval checkpoints."
        },
        {
          title: "Workflow", // Changed from Observations
          content: [
            "Define task scope",
            "Load project context",
            "AI proposes plan",
            "Human reviews and approves",
            "AI implements changes",
            "Documentation and session state updated",
            <i>"Task → Context → Plan → Approval → Implementation → Documentation"</i>
          ]
        }
        // Notice: No Future Ideas here! The code will just skip it seamlessly.
      ]
    },
    {
      id: 2,
      title: "Governance-First Agentic Workflow",
      sections: [
        {
          title: "Existing Issue", // Custom title!
          content: "Most agentic AI systems allow the reasoning model to both propose and influence execution, coupling reasoning with execution authority.This creates structural risks such as prompt injection, unsafe command generation, and authority drift during autonomous loops."
        },
        // {
        //   title: "Proposed Approach",
        //   content: "A governance-first architecture that separates reasoning from execution authority.The LLM may generate action intent, but execution decisions are enforced by deterministic policy and risk validation layers."
        // },
        {
          title: "Architecture",
          content: [
            "Intent Proposal - LLM suggests an action",
            "Intent Freezing - convert proposal into immutable intent",
            "Risk Classification - engine assign risk level",
            "Authority Engine - policy rules determine approval requirements",
            "Sandboxed Execution - approved actions executed in sandbox",
            "Observation & Logging - results recorded for audit and iteration",
            <i>"Intent → Freeze → Risk → Authority → Execute → Log"</i>
          ]
        },
        {
          title: "Limitations",
          content: [
            "Added governance layers increase execution latency",
            "Risk classification policies require continuous refinement",
            "Policy misconfiguration may introduce new failure modes",
            "Architecture reduces autonomy compared to capability-driven agents"
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Reinforcement Learning for Adaptive Traffic Control",
      sections: [
        {
          title: "Experiment",
          content: "Explored reinforcement learning approaches for adaptive traffic signal control using simulation-based environments."
        },
        {
          title: "Architecture", // Another custom title
          content: [
            "Custom RL environment for traffic intersections",
            "SUMO simulation with TraCI integration",
            "PPO-based training for signal optimization",
            "Multi-objective rewards (throughput, fairness, wait time)",
            "Emergency vehicle prioritization",
            <i>"Simulation → State → RL Policy → Signal Action → Traffic Feedback"</i>
          ]
          
        },
        // {
        //   title: "Key Takeaways",
        //   content: [
        //     "Reward design critically impacts learning",
        //     "Exploration vs exploitation tradeoff is crucial",
        //     "Simple environments reveal fundamental principles",
        //     "Hyperparameters significantly affect convergence"
        //   ]
        // }
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