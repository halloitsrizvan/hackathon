import React from 'react'
import { FaShieldAlt, FaHandsHelping, FaBookOpen, FaChartLine, FaUsers, FaHeart, FaGlobe, FaLightbulb } from 'react-icons/fa'
import './AboutUs.css'

function Aboutus() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Islamic Banking System",
      description: "Built on the principles of Sharia-compliant financial practices, ensuring ethical and halal transactions."
    },
    {
      icon: <FaHandsHelping />,
      title: "Non-Interest Transactions",
      description: "Eliminating Riba (interest) from all financial operations, promoting fair and just economic practices."
    },
    {
      icon: <FaBookOpen />,
      title: "Mahal System Integration",
      description: "Incorporating traditional Kerala Mahal community principles for mutual support and collective well-being."
    },
    {
      icon: <FaChartLine />,
      title: "Halal Investments",
      description: "All investments are directed exclusively into Sharia-compliant ventures and ethical business practices."
    },
    {
      icon: <FaUsers />,
      title: "Community Focus",
      description: "Fostering a transparent and self-sustaining economic ecosystem rooted in faith and collective prosperity."
    },
    {
      icon: <FaHeart />,
      title: "Social Impact",
      description: "Enabling direct donations to community projects and supporting charitable initiatives."
    }
  ]

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50+", label: "Halal Ventures" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            What is <span className="highlight">Sundooq</span>?
          </h1>
          <p className="hero-subtitle">
            A pioneering digital financial platform that revolutionizes personal finance by integrating 
            community-centric principles with the ethical framework of Islamic banking.
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="card-icon">
              <FaGlobe />
            </div>
            <h3>Digital Finance</h3>
            <p>Modern technology meets traditional values</p>
          </div>
        </div>
      </div>

      {/* Main Description */}
      <div className="description-section">
        <div className="description-content">
          <h2>Our Mission</h2>
          <p>
            <strong>Sundooq</strong> is a pioneering digital financial platform that revolutionizes
            personal finance by integrating the community-centric principles of the traditional 
            Kerala Mahal system with the ethical framework of Islamic banking. This innovative 
            service allows consumers to easily register and manage accounts, ensuring all 
            investments are directed exclusively into Halal, Sharia-compliant ventures.
          </p>
          <p>
            Moving away from the conventional banking model, Sundooq offers access to financing
            and loans based on Islamic restrictions, providing a crucial alternative to 
            interest-based (Riba) transactions. Furthermore, the platform embodies the spirit 
            of mutual support by enabling users to donate directly to community projects, 
            fostering a transparent and self-sustaining economic ecosystem rooted in faith 
            and collective well-being.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        <h2 className="section-title">Why Choose Sundooq?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <h2 className="section-title">Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <FaShieldAlt />
            </div>
            <h3>Trust & Transparency</h3>
            <p>Every transaction is built on trust, with complete transparency in all our operations.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FaHandsHelping />
            </div>
            <h3>Community First</h3>
            <p>We prioritize community welfare and mutual support in all our financial services.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <FaLightbulb />
            </div>
            <h3>Innovation</h3>
            <p>Combining modern technology with traditional Islamic banking principles for better financial solutions.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Ethical Banking?</h2>
          <p>Join thousands of users who have chosen Sundooq for their financial needs.</p>
          <div className="cta-buttons">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Aboutus