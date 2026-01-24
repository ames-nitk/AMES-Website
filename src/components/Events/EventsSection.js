import React, { useEffect, useState,useRef } from "react";
import eventsData from "../../data/eventsData.js";
import "./EventsSection.css";

let scrollToEventSection = () => { };
const AUTO_NEXT_INTERVAL = 4000; // 4 seconds

const EventsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [barKey, setBarKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % eventsData.length);
      setBarKey((k) => k + 1);
    }, AUTO_NEXT_INTERVAL);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleClick = (idx) => {
    setActiveIndex(idx);
    setBarKey((k) => k + 1);
  };

  const eventRef = useRef(null);

  useEffect(() => {
    scrollToEventSection = () => {
      eventRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  }, []);

  return (
    <div className="featured-projects-nitk" ref={eventRef}>
      <div className="fp-content-left">
        <div className="fp-header" >Featured Events</div>
        <div className="fp-desc">
          NITK instituted the Alumni Awards to recognize the exemplary
          achievements of its former students.
        </div>
        <div className="fp-projects-list">
          {eventsData.map((project, idx) => (
            <div
              key={project.title}
              className={`fp-project-title${activeIndex === idx ? " active" : ""}`}
              onClick={() => handleClick(idx)}
              tabIndex={0}
              role="button"
            >
              <span className="fp-bullet">&#8226;</span>

              <div className="title-details">
                <div className="title"><span>{project.title}</span></div>

                {activeIndex === idx && (
                  <div className="fp-project-details">
                    <div className="fp-project-description">{project.details}</div>
                    <a
                      href="https://www.linkedin.com/company/association-of-mechanical-engineering-students-nitk/"
                      className="fp-read-more-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      READ MORE <span aria-hidden="true">↗</span>
                    </a>
                    <div className="fp-progress-bar-container">
                      <div className="fp-progress-label"></div>
                      <div className="fp-progress-bar">
                        <div
                          key={barKey}
                          className="fp-progress-bar-inner"
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fp-content-right">
        {eventsData[activeIndex].image ? (
          <img
            src={eventsData[activeIndex].image}
            alt={eventsData[activeIndex].title}
            className="fp-project-image"
          />
        ) : (
          <div className="fp-project-image fp-image-placeholder">
            No Image Available
          </div>
        )}
      </div>
    </div>
  );
};

export { scrollToEventSection };
export default EventsSection;
