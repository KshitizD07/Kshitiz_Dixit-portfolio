import { useState } from 'react';
import './Showcase.css';

const feedbackItems = [
  {
    id: 1,
    name: 'Harshit Kasaundhan',
    role: 'Student',
    tag: 'UI/UX Experience',
    rating: '★★★★★',
    comment:
      'My experience with SkillSphere has been excellent. The platform is smooth, intuitive, and thoughtfully designed. I really appreciate the clean interface and the way everything is organized, which makes it easy and enjoyable to use.',
    teamResponse: null
  },
  {
    id: 2,
    name: 'Aman Singh',
    role: 'Student & Volunteer Contributor',
    institution: 'Babu Banarasi Das University, Lucknow',
    tag: 'Feature Suggestion • NEXUS',
    rating: '★★★★★',
    comment:
      "The UI is unique and good. The quick intro helped me understand the features better. What I liked the most was NEXUS, it'd be extremely useful in finding new members during hackathons and other events.",
    teamResponse:
      'Enhanced AI diagnostic prompt synthesis engine and initiated planning for dedicated mobile PWA workflows.'
  },
  {
    id: 3,
    name: 'Harsh Gupta',
    role: 'Student & Volunteer Contributor',
    institution: 'Babu Banarasi Das University, Lucknow',
    tag: 'Roadmap & Usability',
    rating: '★★★★★',
    comment:
      'The ui/ux is so smooth not facing any bugs or something and loved it using it!! The roadmap feature is very valuable!!',
    teamResponse:
      'Acknowledged user feedback shaping the platform iterations and optimized roadmap delivery.'
  },
  {
    id: 4,
    name: 'Himanshu Mishra',
    role: 'Student',
    institution: 'AKTU',
    tag: 'Proof-of-Work Verification',
    rating: '★★★★★',
    comment:
      'GitHub-based skill verification and proof-of-work makes SkillSphere much more meaningful than a traditional resume or networking platform. Real data gives authentic validation.',
    teamResponse:
      'Shipped standardized vertical page layouts, added Data Analyst/Engineer catalogues, and automated Jupyter notebook parsing directly from repos.'
  },
  {
    id: 5,
    name: 'Ashutosh Shukla',
    role: 'Student',
    tag: 'General Feedback',
    rating: '★★★★★',
    comment:
      'Clean, modern, and easy to navigate. The GitHub-based skill verification adds real value. Proof-of-work is the core pillar of verified portfolios.',
    teamResponse:
      'Continuous feature updates: team squad tools and live progress trackers to make verified skill building rewarding.'
  }
];

function Showcase() {
  const [activeTab, setActiveTab] = useState('platform'); // 'platform' | 'feedback'
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="showcase section" id="showcase">
      <div className="container">
        
        {/* Section Header */}
        <div className="showcase-header">
          <div className="showcase-badge">Live Platform & Impact</div>
          <h2 className="section-title">Product Spotlight</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            SkillSphere — Verified Skill Intelligence, Automated Cloud Deployments & Real User Traction
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="showcase-tabs">
          <button
            className={`tab-btn ${activeTab === 'platform' ? 'active' : ''}`}
            onClick={() => setActiveTab('platform')}
          >
            <span className="tab-icon">💻</span> Platform Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            <span className="tab-icon">💬</span> User Feedback & Iterations
          </button>
        </div>

        {/* TAB 1: Platform Overview */}
        {activeTab === 'platform' && (
          <div className="showcase-platform-view">
            <div className="platform-mockup-card">
              {/* Window Chrome Header */}
              <div className="mockup-header">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="mockup-url-bar">
                  <span className="url-lock">🔒</span>
                  <span className="url-text">https://skillsphere.app — Cloud Deployed</span>
                </div>
                <div className="status-pill online">
                  <span className="pulse-dot"></span> Platform Online
                </div>
              </div>

              {/* Landing Page Image Preview */}
              <div className="mockup-image-container">
                <img
                  src="/images/skillsphere/landing-page.png"
                  alt="SkillSphere Landing Page"
                  className="mockup-image"
                  loading="lazy"
                />
                <div className="image-overlay-gradient"></div>
              </div>

              {/* Details & Architecture Specs */}
              <div className="mockup-footer-details">
                <div className="details-col main-info">
                  <h3 className="platform-title">SkillSphere</h3>
                  <p className="platform-tagline">
                    Build your verified skill profile. Prove what you know, identify your skill gaps, and form hackathon squads—backed by real GitHub telemetry.
                  </p>
                  
                  {/* Architecture & Infrastructure Pills */}
                  <div className="infra-pills">
                    <span className="infra-pill">AWS EC2 (Ubuntu)</span>
                    <span className="infra-pill">Docker Compose</span>
                    <span className="infra-pill">Nginx Reverse Proxy</span>
                    <span className="infra-pill">GitHub Actions CI/CD</span>
                    <span className="infra-pill">PostgreSQL 16 & Redis 7</span>
                    <span className="infra-pill">Multi-Stage Alpine Builds</span>
                  </div>
                </div>

                <div className="details-col actions">
                  <a
                    href="https://github.com/KshitizD07/Skill-Sphere"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary showcase-action-btn"
                  >
                    View on GitHub ↗
                  </a>
                  <button
                    className="btn btn-secondary showcase-action-btn"
                    onClick={() => setActiveTab('feedback')}
                  >
                    Read User Reviews ({feedbackItems.length}) →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: User Feedback & Iterations */}
        {activeTab === 'feedback' && (
          <div className="showcase-feedback-view">
            
            {/* Banner with board preview trigger */}
            <div className="feedback-hero-banner">
              <div className="banner-left">
                <div className="rating-highlight">
                  <span className="rating-stars">★★★★★</span>
                  <span className="rating-score">5.0 / 5.0</span>
                </div>
                <h3 className="banner-title">Authentic Community Feedback</h3>
                <p className="banner-desc">
                  Real feedback collected from engineering students and contributors at Babu Banarasi Das University and AKTU. Every review triggers continuous platform iterations.
                </p>
              </div>

              <div className="banner-right">
                <button
                  className="btn btn-secondary view-board-btn"
                  onClick={() => setIsModalOpen(true)}
                >
                  🔍 View Full Feedback Board
                </button>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="testimonials-grid">
              {feedbackItems.map((item) => (
                <div key={item.id} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="user-avatar-circle">
                      {item.name.charAt(0)}
                    </div>
                    <div className="user-meta">
                      <h4 className="user-name">{item.name}</h4>
                      <div className="user-role-line">
                        <span className="user-role">{item.role}</span>
                        {item.institution && (
                          <span className="user-institution">• {item.institution}</span>
                        )}
                      </div>
                    </div>
                    <div className="testimonial-stars">{item.rating}</div>
                  </div>

                  <div className="testimonial-tag-row">
                    <span className="feedback-tag">{item.tag}</span>
                  </div>

                  <p className="testimonial-comment">"{item.comment}"</p>

                  {item.teamResponse && (
                    <div className="team-response-box">
                      <div className="response-badge">✓ Shipped to Production</div>
                      <p className="response-text">{item.teamResponse}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Embedded Board Snapshot Card */}
            <div className="board-preview-card" onClick={() => setIsModalOpen(true)}>
              <div className="preview-label">
                <span>📷 Full Verified Feedback Collage (Click to Expand)</span>
              </div>
              <img
                src="/images/skillsphere/feedback-board.jpg"
                alt="SkillSphere Feedback Board Collage"
                className="board-preview-img"
                loading="lazy"
              />
            </div>

          </div>
        )}

      </div>

      {/* Lightbox / Modal for Full Feedback Board */}
      {isModalOpen && (
        <div className="feedback-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="feedback-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
              ✕ Close
            </button>
            <div className="modal-header">
              <h3>SkillSphere — Verified Feedback & Response Board</h3>
              <p>Collage of real user interactions, suggestions, and resolved platform updates.</p>
            </div>
            <div className="modal-img-wrapper">
              <img
                src="/images/skillsphere/feedback-board.jpg"
                alt="SkillSphere Feedback Board Full View"
                className="modal-full-img"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

export default Showcase;
