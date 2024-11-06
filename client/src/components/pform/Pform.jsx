import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Pform.scss';

const PaymentForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const amountFromQuery = queryParams.get('amount');
  const eventName = queryParams.get('eventName');
  const ticketCount = queryParams.get('ticketCount');
  const ticketPrice = queryParams.get('ticketPrice');
  const donation = queryParams.get('donation');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(amountFromQuery ? parseFloat(amountFromQuery) : 0);

  useEffect(() => {
    // Calculate total amount based on query params
    const baseTicketTotal = ticketCount * ticketPrice;
    const ticketTotalWithTaxes = baseTicketTotal * 1.07625;
    const donationAmount = donation ? parseFloat(donation) : 0;
    const finalAmount = ticketTotalWithTaxes + donationAmount;
    setTotalAmount(finalAmount);
  }, [ticketCount, ticketPrice, donation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: totalAmount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment link');
      }

      const data = await response.json();

      if (data.status === 'Success' && data.paymentLink) {
        window.location.href = data.paymentLink; // Redirect to Square payment link
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-form">
      <div className="payment-form__container">
        <h1 className="payment-form__title">Payment Details</h1>

        <div className="payment-form__event-details">
          <h2>Event Summary</h2>
          <p className="event-name">{decodeURIComponent(eventName)}</p>
          <div className="summary-line">
            <span>Tickets Total (inc. taxes):</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

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
