import React from "react";
import { Link } from 'react-router-dom'; // Added for the buttons
import { useFadeUpOnScroll } from '../../animation/useFadeUpOnScroll';
import useTypewriter from '../../animation/useTypewriter';
import './ProjectsSection.css';
import project from "../../data/project.js";
import ImageCarousel from "../ImageCarousel/ImageCarousel.js";

function ProjectsSection() {
  // No automatic carousel state needed here; ImageCarousel handles its own state

  const fadeRefs = useFadeUpOnScroll();
  const typewriter = useTypewriter();

  return (
    <section className="ps-main-container">
      <div className="ps-top-content">
        <h2
          className={`ps-main-title typewriter-title zoom-in shimmer ${fadeRefs.current[0]?.classList.contains('fade-up') ? 'fade-up' : ''}`}
          ref={el => fadeRefs.current[0] = el}
        >
          {typewriter}
          <span className="typewriter-cursor">|</span>
        </h2>
        <div
          className={`ps-carousel-container ${fadeRefs.current[1]?.classList.contains('fade-up') ? 'fade-up' : ''}`}
          ref={el => fadeRefs.current[1] = el}
        >
          <ImageCarousel />
        </div>
      </div>

      <div className="ps-list-wrapper">
        {project.map((project, index) => (
          <div
            key={index}
            className={`ps-row ${index % 2 === 1 ? 'ps-reverse' : ''} ${fadeRefs.current[index + 2]?.classList.contains('fade-up') ? 'fade-up' : ''}`}
            ref={el => fadeRefs.current[index + 2] = el}
          >
            <div className="ps-text-block">
              <span className="ps-label">Project {index + 1}</span>
              <div className="ps-accent-line" />
              <h2 className="ps-project-name">{project.title}</h2>
              <p className="ps-description">{project.details}</p>
              {/* <Link to="/about-details" className="ps-btn">Know More</Link> */}
            </div>
            <div className="ps-image-block">
              <img src={project.image} alt={project.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;