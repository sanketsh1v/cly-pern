import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DonationPage.scss';

const DonationPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:4000/Donations', {
        first_name: firstName,
        last_name: lastName,
        email,
        donation_amount: donationAmount,
      });

      setMessage('Thank you for your donation!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setDonationAmount('');

      // Navigate to Pform with donation amount and user info in state
      navigate(`/pform?amount=${donationAmount}`, { 
        state: { 
          firstName, 
          lastName, 
          email 
        } 
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="donation-page">
      <h1>Support Our Laughter Community</h1>

      <div className="header-image-container">
        <img src="/image.png" alt="Person giving donation" className="header-image" />
      </div>

      <div className="donation-content">
        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Donation Amount:</label>
            <input
              type="number"
              placeholder="Donation Amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">
            <DollarSign className="icon" />
            Donate Now
          </button>
        </form>
      </div>

      <p className="thank-you-message">Thank you for supporting our community!</p>
    </div>
  );
};

export default DonationPage;
