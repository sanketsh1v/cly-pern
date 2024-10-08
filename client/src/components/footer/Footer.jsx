import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaYoutube, FaGithub } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="footer__logo-section">
                    <img src="/logo.png" alt="Logo" className="footer__logo" />
                    <div className="footer__social">
                        <FaFacebook />
                        <FaTwitter />
                        <FaInstagram />
                        <FaYoutube />
                        <FaGithub />
                    </div>
                </div>
                
                <div className="footer__links">
                    <div className="footer__section">
                        <h4>Explore</h4>
                        <p className="footer__link">Our Club</p>
                        <p className="footer__link">Donations</p>
                    </div>
                    <div className="footer__section">
                        <h4>Service</h4>
                        <p className="footer__link">FAQ's</p>
                        <p className="footer__link">Contact Us</p>
                    </div>
                </div>

                <div className="footer__contact">
                    <p><FaPhoneAlt /> 403-995-9546</p>
                    <p><FaEnvelope /> <a href="mailto:laughteradventurescanada@gmail.com">laughteradventurescanada@gmail.com</a></p>
                </div>
            </div>

            <div className="footer__bottom">
                <hr className="footer__line" />
                <p className="footer__copyright">
                    @2023 by YYC Laughter Yoga and Adventures.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
