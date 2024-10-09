import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <div className="navbar__logo-container">
          <img src="/logo.png" alt="Logo" className="navbar__logo-image" />
        </div>
        <div className="navbar__links">
          <Link to="/" className="navbar__link">Home</Link>
          <Link to="/events" className="navbar__link">Upcoming Events</Link>
          <Link to="/training" className="navbar__link">Training</Link>
          <Link to="/speakers" className="navbar__link">Speakers</Link>
          <Link to="/about" className="navbar__link">About</Link>
        </div>
      </div>
      <hr className="navbar__separator" />
    </nav>
  );
};

export default Navbar;
