import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const features = [
    {
      title: 'Online Form Submission',
      description: 'Submit and track important PhD forms digitally without manual paperwork'
    },
    {
      title: 'Supervisor Management',
      description: 'Streamlined supervisor allocation and change request workflows'
    },
    {
      title: 'IRB Constitution',
      description: 'Institutional Review Board setup and related submission management'
    },
    {
      title: 'Progress Tracking',
      description: 'Real-time visibility of academic progress for students and supervisors'
    },
    {
      title: 'Synopsis & Thesis',
      description: 'Digital submission and approval workflow for synopsis and thesis'
    },
    {
      title: 'Centralized Communication',
      description: 'All academic documents and communication in one platform'
    }
  ];

  const workflow = [
    'Supervisor Allocation',
    'IRB Submission',
    'Revised IRB Submission',
    'Coursework / 6 Month Progress',
    'Synopsis Submission',
    'Thesis Submission'
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <img src="/images/tiet_logo.png" alt="University Logo" className="nav-logo" />
            <span className="nav-title">PhD Portal <span className="beta-badge">BETA</span></span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#workflow">Workflow</a>
            <Link to="/login" className="nav-login-btn">Login</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">PhD Monitoring & Management Portal</h1>
            <div className="beta-notice">
              <span className="beta-highlight">●</span>
              <span>Currently in Beta Testing Phase</span>
            </div>
            <p className="hero-subtitle">
              Platform to streamline and automate every stage of the PhD journey
            </p>
            <p className="hero-description">
              Bringing scholars, supervisors, doctoral committees, and administrative authorities together on a unified system
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary">Login to Portal</Link>
              <a href="#features" className="btn btn-secondary">Explore Features</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="graphic-circle"></div>
              <div className="graphic-dots"></div>
              <img src="/images/tiet_logo.png" alt="PhD Excellence" className="hero-logo" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About the Portal</h2>
          <div className="about-content">
            <p className="about-text">
              The PhD Portal is a comprehensive digital platform designed to streamline and automate every stage of the PhD journey. 
              It eliminates manual paperwork, miscommunication, and delays traditionally associated with the PhD lifecycle.
            </p>
            <p className="about-text">
              By digitizing forms, approvals, document management, communication, and progress monitoring, the PhD Portal ensures 
              accuracy, accountability, and real-time visibility for all stakeholders. It reduces dependency on physical files and 
              offline follow-ups, enabling a smooth and organized PhD experience.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <p className="section-subtitle">
            Comprehensive tools to manage every aspect of the PhD journey
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="workflow-section">
        <div className="container">
          <h2 className="section-title">PhD Workflow</h2>
          <p className="section-subtitle">
            Track your progress through the complete PhD lifecycle
          </p>
          <div className="workflow-timeline">
            {workflow.map((stage, index) => (
              <div key={index} className="workflow-stage">
                <div className="workflow-number">{index + 1}</div>
                <div className="workflow-content">
                  <h3>{stage}</h3>
                </div>
                {index < workflow.length - 1 && <div className="workflow-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Empowering Research Through Technology</h2>
            <p className="cta-subtitle">
              Simplifying processes. Enhancing collaboration. Supporting excellence in research.
            </p>
            <Link to="/login" className="btn btn-large">Login to Continue →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <img src="/images/tiet_logo.png" alt="University Logo" className="footer-logo" />
              <p className="footer-text">PhD Monitoring & Management Portal</p>
              <p className="footer-text">Thapar Institute of Engineering & Technology</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/team">Our Team</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p className="footer-text">Email: dordc@thapar.edu</p>
              <p className="footer-text">Office Hours: Mon-Fri, 9 AM - 5 PM</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Thapar Institute of Engineering & Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
