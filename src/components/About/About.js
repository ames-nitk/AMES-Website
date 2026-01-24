import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import aboutImage from '../../assets/about.JPG';
import objectivesImage from '../../assets/department.png';
import alumniData from '../../data/alumniData';
import instaIcon from '../../assets/instaicon.png';
import Linkedin from '../../assets/linkedin.png'
import EventsSection from '../Events/EventsSection';
import Contact from '../Contact/contacts';
import AboutSection from '../About2/AboutSection-ASHUTOSH';

let scrollToAboutSection = () => { };


const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    scrollToAboutSection = () => {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  }, []);

  return (
    <div className="about-section" ref={aboutRef}>
      {/* First Row: About Us */}
      <div className="about-content-wrapper">
        <div className="about-text">
          <span className="about-us-label">About Us</span>
          <div style={{ height: '3px', width: '50px', background: '#f7842b', margin: '8px 0 16px 0', borderRadius: '2px' }} />
          <h2 className="about-title">Who are we?</h2>
          <div className="about-desc">
            AMES is a dynamic platform by and for Mechanical Engineering students at NITK. We empower each other with hands-on learning, industry insights, and lifelong connections.
          </div>
          <button className="about-btn">
            <Link to="/about-details" style={{ color: 'inherit', textDecoration: 'none' }}>
              Know More
            </Link>
          </button>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="Graduation" />
        </div>
      </div>
      {/* Second Row: Objectives */}
      <div className="about-content-wrapper" style={{ marginTop: "2.5rem" }}>
        <div className="about-image2">
          <img src={objectivesImage} alt="Classroom" />
        </div>
        <div className="about-text2">
          <span className="about-us-label">Objectives</span>
          <div style={{ height: '3px', width: '50px', background: '#f7842b', margin: '8px 0 16px 0', borderRadius: '2px' }} />
          <h2 className="about-title" >Objectives That Drives Us</h2>
          <ul className="about-desc" style={{ marginBottom: "1.5rem" }}>
            <li>Cultivate a culture of engineering excellence through shared knowledge and collaborative initiatives.</li>
            <li>Bridge the academia-industry gap via projects & mentorship.</li>
            <li>Promote interdisciplinary research & social innovation</li>
          </ul>
          <button className="about-btn" ><a href='https://mech.nitk.ac.in/' target='_blank' >Explore</a></button>
        </div>
      </div>
      <div className="alumni-section">
        <span className="about-us-label">ALUMNI</span>
        <div style={{
          height: '3px',
          width: '50px',
          background: '#f7842b',
          margin: '8px auto 16px auto',
          borderRadius: '2px'
        }} />
        <h3 className="alumni-title">Our Distinguished Alumni</h3>

        <div className="alumni-grid" >
          {alumniData.map((alumni, idx) => (
            <div
              className={'alumni-wrapper'}
              key={idx}
            >
              <div className={ 'alumni-card'}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${alumni.imagePath})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                <div className='alumni-intro' >
                  {alumni.intro}
                </div>

                {alumni.linkedinicon && alumni.linkedinlink && (
                  <div className='icon' >
                    <a href={alumni.linkedinlink} target="_blank" rel="noopener noreferrer">
                      <img src={alumni.linkedinicon} alt="LinkedIn icon" />
                    </a>
                  </div>
                )}
              </div>

              {alumni.name && (
                <div className= 'alumni-name'>
                  {alumni.name}
                </div>
              )}
              {alumni.role && (
                <div className='alumni-role'>
                  {alumni.role}
                </div>
              )}
            </div>


          ))}
        </div>
       
      </div>
    </div>

  );
}

export { scrollToAboutSection };
export default About;