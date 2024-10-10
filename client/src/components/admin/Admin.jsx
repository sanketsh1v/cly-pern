import React, { useState } from 'react';
import './Admin.scss';

const Admin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    // Handle login logic
    console.log('Admin logged in:', formData);
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
        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-login__input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
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
