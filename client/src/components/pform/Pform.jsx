import React, { useState } from 'react';
import './Pform.scss';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment form submission logic here
    console.log('Payment form submitted:', formData);
  };

  return (
    <div className="payment-form">
      <div className="payment-form__container">
        <h1 className="payment-form__title">Payment Details</h1>
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
          <button type="submit" className="payment-form__button">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
