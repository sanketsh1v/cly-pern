import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__content">
        <div className="navbar__logo-container">
          <img src="/logo.png" alt="Logo" className="navbar__logo-image" />
          <h1 className="navbar__company-name">Calgary Laughter Yoga and Adventures</h1>
        </div>
        <div className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/" className="navbar__link">Home</Link>
          <Link to="/events" className="navbar__link">Upcoming Events</Link>
          <Link to="/training" className="navbar__link">Training</Link>
          <Link to="/speakers" className="navbar__link">Speakers</Link>
          <Link to="/about" className="navbar__link">About</Link>
        </div>
        <div className="navbar__hamburger" onClick={toggleMenu}>
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
