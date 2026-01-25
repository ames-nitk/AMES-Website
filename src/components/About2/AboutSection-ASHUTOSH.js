import React, { useEffect } from 'react';
import { useFadeUpOnScroll } from '../../animation/useFadeUpOnScroll';
import './AboutSection-ASHUTOSH.css';
import kvImage from '../../assets/KV.jpg';
import murgendrappaImage from '../../assets/Murigendrappa.jpg';
import nitkImage from '../../assets/nitk.jpg';
import amesImage from '../../assets/ames div.jpg';

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
              <img src={nitkImage} alt="NITK" className="as-media-box" />
            </div>
            <div className="as-text-column">
              <h3 className="as-card-sub-title">About NITK</h3>
              <div className="as-card-description">
               National Institute of Technology Karnataka (NITK), also known as NITK Surathkal, is a premier public technical university in Surathkal, Mangaluru, India, established in 1960 (originally as Karnataka Regional Engineering College (KREC)), renowned for its strong engineering programs, research, and a distinctive private beach on its campus by the Arabian Sea.
              </div>
            </div>
          </div>

          {/* About AMES */}
          <div className="as-info-card as-info-row as-reverse" ref={el => fadeRefs.current[2] = el}>
            <div className="as-img-column">
              <img src={amesImage} alt="AMES" className="as-media-box" />
            </div>
            <div className="as-text-column">
              <h3 className="as-card-sub-title">About AMES</h3>
              <div className="as-card-description">
               AMES is a dynamic platform by and for Mechanical Engineering students at NITK. We empower each other with hands-on learning, industry insights, and lifelong connections. The AMES Projects Team is dedicated to enabling hands-on engineering by tackling real-world problems and developing industry-inspired solutions
              </div>
            </div>
          </div>
        </div>

        <div className="as-section-divider">
          <span className="as-teams-label">Teams Backbone</span>
        </div>
        <div className="as-teams-container" id="as-teams-backbone-section">
          <div className="as-backbone-top-row">
            {[1, 2].map((i) => (
              <div className="as-member-card as-large" key={i}>
                <img src={i === 1 ? murgendrappaImage : kvImage} alt={i === 1 ? 'KV' : 'Murgendrappa'} className="as-member-img-box as-large" />
                <div className="as-member-name">{i === 1 ?  'Dr. S M Murigendrappa' : 'Dr. Khyati Verma'}</div>
                <div className="as-member-role">{i === 1 ?  'Head of the Department (HOD)' : 'Faculty Advisor'}</div>
              </div>
            ))}
          </div>
          {/* <div className="as-members-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="as-member-card" key={i}>
                <div className="as-member-img-box" />
                <div className="as-member-name">Name</div>
                <div className="as-member-role">Position</div>
              </div>
            ))}
          </div> */}
        </div>
        

        {/* Other Teams */}
        {/* {['Core Team', 'Web Team'].map((teamName) => (
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
        ))} */}
      </div>
    </section>
  );
}

export default AboutSection;