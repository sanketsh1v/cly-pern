import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { DollarSign } from 'lucide-react';
import './DonationPage.scss';

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle donation submission logic here
    console.log('Donation submitted:', { amount, name, email });
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
            <label>Select Amount:</label>
            <div className="amount-options">
              {['10', '25', '50', '100'].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`amount-button ${amount === value ? 'selected' : ''}`}
                  onClick={() => setAmount(value)}
                >
                  ${value}
                </button>
              ))}
              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            <DollarSign className="icon" />
            Donate Now
          </button>
        </form>

        {/* Place the Back to Home button at the end */}
        <div className="button-container">
          <button
            onClick={() => navigate('/')} // Navigate to home page on click
            className="bg-black text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300 mt-4"
          >
            Back to Home
          </button>
        </div>
      </div>

      <p className="thank-you-message">Thank you for supporting our community!</p>
    </div>
  );
};

export default DonationPage;
