import React, { useState } from 'react';
import './Footer.scss';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      // Map form data to match EmailJS template variable names
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

    emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAIL_USER_ID
    )
    
    .then((result) => {
      console.log("Email sent successfully!", result);
      setFormStatus('Email sent successfully!'); 
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      setFormStatus('Error sending email, please try again.');
    });

    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__section footer__about">
            <h3>About Us</h3>
            <p>Calgary Laughter Yoga and Adventures brings joy and wellness through laughter. Join our community and transform your life through intentional laughter.</p>
            <div className="footer__social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </div>
          <div className="footer__section footer__links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/events">Upcoming Events</a></li>
              <li><a href="/training">Training Programs</a></li>
              <li><a href="/speakers">Our Speakers</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/admin">Admin Login</a></li>
            </ul>
          </div>
          <div className="footer__section footer__contact">
            <h3>Contact Us</h3>
            <form onSubmit={handleSubmit} className="footer__form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
            {formStatus && <p className="form-status">{formStatus}</p>}
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__info">
            <p>📍 1725 Bow Valley Trail, Canmore, AB T1W 2W1</p>
            <p>📞 (403) 555-0123</p>
            <p>📧 info@calgarylaughteryoga.com</p>
          </div>
          <div className="footer__copyright">
            <p>&copy; 2024 Calgary Laughter Yoga and Adventures. All rights reserved.</p>
            <div className="footer__legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
