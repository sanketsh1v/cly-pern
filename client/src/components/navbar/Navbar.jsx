import React from 'react';
import './Navbar.scss';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="./logo.png" alt="Logo" className="navbar__logo-image" />
        <span className="navbar__title">Calgary Laughter Yoga and Adventures</span>
      </div>

      <div className="navbar__links">
        <a href="#home" className="navbar__link">Home</a>
        <a href="#events" className="navbar__link">Events</a>
        <a href="#training" className="navbar__link">Training</a>
        <a href="#speakers" className="navbar__link">Speakers</a>
        <a href="#about" className="navbar__link">About</a>
      </div>
    <div>
      <hr className="navbar__separator" />
    </div>
    </nav>
  );
};

export default Navbar;
