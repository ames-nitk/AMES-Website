import React, { useEffect } from 'react';
import { useFadeUpOnScroll } from '../../animation/useFadeUpOnScroll';
import './AboutSection-ASHUTOSH.css';

function AboutSection() {
  const fadeRefs = useFadeUpOnScroll();

  useEffect(() => {
    if (window.location && window.history && window.history.state && window.history.state.usr && window.history.state.usr.scrollToTeams) {
      const section = document.getElementById('as-teams-backbone-section');
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, []);

  return (
    <section className="as-main-container">
      <div className="as-content-wrapper">
        <h2 className="as-heading-title as-premium-gradient as-zoom-in as-shimmer" ref={el => fadeRefs.current[0] = el}>
          About Us
        </h2>
        <div className="as-heading-underline"></div>

        <div className="as-cards-stack">
          {/* About NITK */}
          <div className="as-info-card as-info-row" ref={el => fadeRefs.current[1] = el}>
            <div className="as-img-column">
              <div className="as-media-box as-img-nitk" />
            </div>
            <div className="as-text-column">
              <h3 className="as-card-sub-title">About NITK</h3>
              <div className="as-card-description">
                Cultivate a culture of engineering excellence through shared knowledge and collaborative initiatives.<br />
                Bridge the academia-industry gap via projects & mentoring.<br />
                Promote interdisciplinary research & social innovation
              </div>
            </div>
          </div>

          {/* About AMES */}
          <div className="as-info-card as-info-row as-reverse" ref={el => fadeRefs.current[2] = el}>
            <div className="as-img-column">
              <div className="as-media-box as-img-ames" />
            </div>
            <div className="as-text-column">
              <h3 className="as-card-sub-title">About AMES</h3>
              <div className="as-card-description">
                Cultivate a culture of engineering excellence through shared knowledge and collaborative initiatives.<br />
                Bridge the academia-industry gap via projects & mentoring.<br />
                Promote interdisciplinary research & social innovation
              </div>
            </div>
          </div>
        </div>

        {/* Team Backbone Section */}
        <div className="as-section-divider">
          <span className="as-teams-label">Teams Backbone</span>
        </div>
        <div className="as-teams-container" id="as-teams-backbone-section">
          <div className="as-backbone-top-row">
            {[1, 2].map((i) => (
              <div className="as-member-card as-large" key={i}>
                <div className="as-member-img-box as-large" />
                <div className="as-member-name">Name</div>
                <div className="as-member-role">Position</div>
              </div>
            ))}
          </div>
          <div className="as-members-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="as-member-card" key={i}>
                <div className="as-member-img-box" />
                <div className="as-member-name">Name</div>
                <div className="as-member-role">Position</div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Teams */}
        {['Core Team', 'Web Team'].map((teamName) => (
          <React.Fragment key={teamName}>
            <div className="as-section-divider">
              <span className="as-teams-label">{teamName}</span>
            </div>
            <div className="as-members-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="as-member-card" key={i}>
                  <div className="as-member-img-box" />
                  <div className="as-member-name">Name</div>
                  <div className="as-member-role">Position</div>
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default AboutSection;