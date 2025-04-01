import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = ({ onStyleGuideClick }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: "Track Your Climbs",
      description: "Log your completed routes, record grades, and see your progress over time.",
      icon: "📊",
      detailedContent: "Keep a digital logbook of every climb you conquer. Record important details like grade, style, attempts, and notes. MyBoulders automatically generates insights about your climbing patterns and helps you visualize your progress through clear charts and statistics.",
      stats: ["300+ climbing gyms in database", "Support for all grading systems", "Unlimited climb history"]
    },
    {
      title: "Set Personal Goals",
      description: "Challenge yourself with personalized climbing goals and watch as you surpass them.",
      icon: "🎯",
      detailedContent: "Create meaningful goals that push your limits. Whether you want to complete 50 V3s in a month, master a specific climbing skill, or project your first V7, our structured goal system helps break down ambitious targets into achievable steps.",
      stats: ["Weekly progress tracking", "Customizable goal categories", "Smart difficulty adaptation"]
    },
    {
      title: "Earn Achievements",
      description: "Unlock badges and achievements as you conquer new challenges and improve your skills.",
      icon: "🏆",
      detailedContent: "Stay motivated with our extensive achievement system. Get rewarded for consistency, trying new things, and pushing your limits. Share your badges with friends and the climbing community to showcase your climbing identity and milestones.",
      stats: ["50+ unique achievements", "Special seasonal challenges", "Community leaderboards"]
    },
    {
      title: "Build Your Profile",
      description: "Create a climbing profile that showcases your accomplishments and favorite routes.",
      icon: "👤",
      detailedContent: "Your profile is your climbing identity. Showcase your progression, favorite routes, climbing style, and achievements. Connect with other climbers, share beta on routes, and build your reputation in the climbing community.",
      stats: ["Customizable public profile", "Connection with climbing partners", "Route sharing and recommendations"]
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: "linear-gradient(rgba(18, 18, 18, 0.5), rgba(18, 18, 18, 0.8)), url('https://images.unsplash.com/photo-1516592673884-4a382d1124c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="hero-text">
            <h1>Elevate Your <span className="accent">Climbing</span> Journey</h1>
            <p>Track routes, set goals, and celebrate achievements as you become the climber you've always wanted to be.</p>
            <div className="cta-buttons">
              <Link to="/register" className="button button-primary">Get Started</Link>
              <Link to="/login" className="button button-secondary">Sign In</Link>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <h2>Everything you need to <span className="accent">master the wall</span></h2>
        <div className="features-container">
          <div className="features-tabs">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-tab ${activeFeature === index ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="features-display feature-text-display">
            <div className="feature-details">
              <h3 className="feature-details-title">
                {features[activeFeature].title}
              </h3>
              <p className="feature-details-description">
                {features[activeFeature].detailedContent}
              </p>
              <div className="feature-stat-list">
                {features[activeFeature].stats.map((stat, index) => (
                  <div key={index} className="feature-stat-item">
                    <svg className="feature-checkmark" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="var(--color-primary)" strokeWidth="2"/>
                    </svg>
                    <span>{stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>Join our growing <span className="accent">community</span></h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"MyBoulders helped me track my progress and push myself to climb harder routes. I've improved two grades since I started using it!"</p>
              </div>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex" className="testimonial-avatar" />
                <div className="author-info">
                  <h4>Alex D.</h4>
                  <span>Climbing for 2 years</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The achievement system keeps me motivated to try new styles of climbing. I'm now much more confident on overhangs!"</p>
              </div>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah" className="testimonial-avatar" />
                <div className="author-info">
                  <h4>Sarah L.</h4>
                  <span>Climbing for 5 years</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Setting goals through the app made a huge difference in my climbing. It helps me stay focused during each session."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Marco" className="testimonial-avatar" />
                <div className="author-info">
                  <h4>Marco T.</h4>
                  <span>Climbing for 1 year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to start your climbing journey?</h2>
            <p>Join thousands of climbers who are tracking their progress and reaching new heights with MyBoulders.</p>
            <div className="cta-buttons">
              <Link to="/register" className="button button-primary">Create Free Account</Link>
              <Link to="/login" className="button button-outline">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;