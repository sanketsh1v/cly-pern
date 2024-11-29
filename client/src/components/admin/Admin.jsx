import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.scss';

const Admin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      // Handle successful login
      localStorage.setItem('token', data.token);
      navigate('/console');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__profile">
          <img
            src="/avatar.png"
            alt="Admin Profile"
            className="admin-login__profile-image"
          />
        </div>
        <h1 className="admin-login__title">Admin Login</h1>
        {error && <p className="admin-login__error">{error}</p>}
        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-login__input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="admin-login__input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="admin-login__button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;