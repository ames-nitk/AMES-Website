import React from 'react';
import About from '../About/About';
import Contact from '../Contact/contacts';
import './Homepage.css';
import bannerImage from '../../assets/bg1.png';
import visionIcon from '../../assets/vision.png';
import useTypewriter from '../../animation/useTypwriter2';

const HomePage = () => {
  const typewrite = useTypewriter(); 
  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <div className='page'>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="banner-container">
          <div className="hero-image-wrapper">
            <img src={bannerImage} alt="Banner" className="hero-image" />
          </div>

          <div className="gradient-overlay"></div>

          <div className="overlay-text">
            <div className="main-title">Association of Mechanical Engineering Students (AMES)</div>
            <div className="sub-title">National Institute of Technology, Karnataka (NITK)</div>
            {/* The variable is now available within the scope of the return */}
            <div className="moto">{typewrite}</div>
          </div>
        </div>
      </section>

      {/* ===== INFO CARDS ===== */}
      <section className="info-cards-section">
        <div
          className="info-card"
          onMouseEnter={() => setHoveredCard('vision')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="icon-wrapper">
            <img
              src={visionIcon}
              alt="Vision Icon"
              style={{
                width: '48px',
                height: '48px',
                transition: 'transform 0.3s',
                transform: hoveredCard === 'vision' ? 'scale(1.2) rotate(10deg)' : 'none'
              }}
            />
          </div>
          <h3>Our <span style={{ color: "#f7842b" }}>Vision</span></h3>
          <p>To empower students through technical knowledge and hands-on experience.</p>
        </div>

        <div
          className="info-card"
          onMouseEnter={() => setHoveredCard('mission')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="icon-wrapper">
            <img
              src={require('../../assets/mission.png')}
              alt="Mission Icon"
              style={{
                width: '48px',
                height: '48px',
                transition: 'transform 0.3s',
                transform: hoveredCard === 'mission' ? 'scale(1.2) rotate(-10deg)' : 'none'
              }}
            />
          </div>
          <h3>Our <span style={{ color: "#f7842b" }}>Mission</span></h3>
          <p>To provide a collaborative environment that fosters innovation and growth.</p>
        </div>
      </section>

      {/* ===== ABOUT, CONTACT ===== */}
      <div className="dashed-divider"></div>
      <About />
      <Contact />
    </div>
  );
};

export default HomePage;
