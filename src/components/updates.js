// src/components/Updates.js
import React, { useRef, useEffect } from 'react';
import './updates.css';

// Global scroll function
let scrollToUpdatesSection = () => {};

const Updates = () => {
  const updatesRef = useRef(null);

  useEffect(() => {
    scrollToUpdatesSection = () => {
      updatesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  }, []);

  return (
    <section className="updates-section" ref={updatesRef}>
      <h2>Latest Updates</h2>
      <div className="updates-list">
        <div className="update-card">
          <h4>NO UPDATES!!!!</h4>
          <p>COME LATER </p>
        </div>
      </div>
    </section>
  );
};

export { scrollToUpdatesSection };
export default Updates;
