import React, { useRef, useEffect } from 'react';
import './contacts.css';
import mediaImage from '../../assets/nitk.jpg';


let scrollToContactSection = () => { };

const Contact = () => {
  const contactRef = useRef(null);

  useEffect(() => {
    scrollToContactSection = () => {
      contactRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  }, []);

  return (
    <div className="page1">
      {/* Media Section */}
      <section className="media-section">
        <div className="media-image-wrapper">
          <img src={mediaImage} alt="Media Banner" className="media-image" />
          <div className="media-overlay"></div>
          <div className="media-overlay-text">
            <div className="main-heading">MEDIA</div>
            {/* The horizontal line will be placed here now */}
            <div className="line"></div>
            <div className="below-part">Stay Tuned and Follow Us!!</div>
            <div className="handles">
              <div className="social-tag">
                <a href="https://www.instagram.com/ames.nitk?igsh=MXN0cjlxNmN5anE5cA==" target="_blank" rel="noopener noreferrer">@ames.nitk</a>
              </div>
              <div className="organization">
                <a href="https://www.linkedin.com/company/association-of-mechanical-engineering-students-nitk/" target="_blank" rel="noopener noreferrer">
                  Association of Mechanical Engineering Students, NITK
                </a>
              </div>
              <div className="social-tag1">
                <a href='https://www.youtube.com/@AMESNITK' target="_blank" rel="noopener noreferrer">@AMESNITK</a>
              </div>
            </div>
            <section className="media-links">
              <div className="media-link1">
                <a href="https://www.instagram.com/ames.nitk?igsh=MXN0cjlxNmN5anE5cA==" target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#f7842b"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                  > <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.8-2.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                  </svg></a>
              </div>
              <div className="media-link2">
                <a href="https://www.linkedin.com/company/association-of-mechanical-engineering-students-nitk/" target="_blank" rel="noopener noreferrer">  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f7842b"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <path d="M20.45 20.45h-3.55v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.5h-3.55v-11h3.4v1.5h.05c.47-.88 1.62-1.8 3.34-1.8 3.57 0 4.23 2.35 4.23 5.4v5.9zM5.34 7.94a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56v-11h3.56v11z" />
                </svg></a>
              </div>
              <div className="media-link3">
                <a href="https://www.youtube.com/@AMESNITK" target="_blank" rel="noopener noreferrer"><svg
                  fill="#f7842b"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"

                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 7H19C19.5523 7 20 7.44771 20 8V16C20 16.5523 19.5523 17 19 17H5C4.44772 17 4 16.5523 4 16V8C4 7.44772 4.44772 7 5 7ZM2 8C2 6.34315 3.34315 5 5 5H19C20.6569 5 22 6.34315 22 8V16C22 17.6569 20.6569 19 19 19H5C3.34315 19 2 17.6569 2 16V8ZM10 9L14 12L10 15V9Z"

                  />
                </svg></a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export { scrollToContactSection };
export default Contact;