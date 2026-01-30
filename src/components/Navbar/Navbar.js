import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/AMES_LOGO.png';
import { scrollToAboutSection } from '../About/About';
import { scrollToFooterSection } from '../Footer/footer';
import { scrollToEventSection } from '../Events/EventsSection';
import amesDayPdf from "../../assets/AMES-DAY.pdf";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleEventsClick = (e) => {
    e.preventDefault();
    navigate('/', { state: { scrollTo: 'events' } });
    closeMenu();
  };

  return (
    <nav className="navbar">
      {/* ===== Left: Logo ===== */}
      <div className="logo-section">
        <a href="/" onClick={closeMenu}>
          <img src={logo} alt="AMES Logo" className="logo-img" />
        </a>
      </div>

      {/* ===== Hamburger Toggle ===== */}
      <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* ===== Center: Navigation Links ===== */}
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><a href="/" onClick={closeMenu}>Home</a></li>
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/', { state: { scrollTo: 'about' } });
              closeMenu();
            }}
          >
            About
          </a>
        </li>
        <li><a href="/projects" onClick={closeMenu}>Projects</a></li>
        {/* <li><a href="#" onClick={closeMenu}>Teams</a></li> */}
        <li><a href="#" onClick={handleEventsClick}>Events</a></li>
        <li className="mobile-contact">
          <a
            href="/Footer"
            onClick={(e) => {
              e.preventDefault();
              scrollToFooterSection();
              closeMenu();
            }}
          >
            Contact
          </a>
        </li>
        <li>
  <a href={amesDayPdf} target="_blank" rel="noreferrer">
    AMES-DAY
  </a>
</li>
      </ul>

      {/* ===== Right: Contact Button (Desktop) ===== */}
      <div className="contact-button">
        <a
          href="/Footer"
          onClick={(e) => {
            e.preventDefault();
            scrollToFooterSection();
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;