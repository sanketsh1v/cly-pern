import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Pform.scss';

const PaymentForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amount');
  const eventName = queryParams.get('eventName');
  const ticketCount = queryParams.get('ticketCount');
  const ticketPrice = queryParams.get('ticketPrice');
  const donation = queryParams.get('donation');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    amount: amount || '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const EventDetailsCard = () => {
    // Calculate totals
    const baseTicketTotal = Number(ticketCount) * Number(ticketPrice);
    const ticketTotalWithTaxes = baseTicketTotal * 1.07625; // Including GST (5%) and Service Fee (2.625%)
    const donationAmount = Number(donation);

    return (
      <div className="payment-form__event-details">
        <h2>Event Summary</h2>
        <div className="event-info">
          <p className="event-name">{decodeURIComponent(eventName)}</p>
          <div className="amount-breakdown">
            <div className="summary-line">
              <span>Tickets Total (inc. taxes):</span>
              <span>${ticketTotalWithTaxes.toFixed(2)}</span>
            </div>
            
            {donationAmount > 0 && (
              <div className="summary-line">
                <span>Donation:</span>
                <span>${donationAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="total-line">
              <span>Final Total:</span>
              <span>${Number(amount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('Sending data:', formData); // Debug log

      const response = await fetch('http://localhost:4000/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          amount: formData.amount
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment link');
      }

      const data = await response.json();
      console.log('Server response:', data); // Debug log
      
      if (data.status === "Success" && data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <div className="payment-form__container">
        <h1 className="payment-form__title">Payment Details</h1>
        
        <EventDetailsCard />

        <form onSubmit={handleSubmit} className="payment-form__form">
          <div className="payment-form__input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="payment-form__input-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="payment-form__input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="payment-form__input-group">
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number (Optional)"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          {/* <div className="payment-form__input-group">
            <input
              type="number"
              name="amount"
              placeholder="Amount ($)"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
            />
          </div> */}
          <button 
            type="submit" 
            className="payment-form__button"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </button>
          {error && <div className="payment-form__error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;