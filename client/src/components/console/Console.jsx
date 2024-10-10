import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Console.scss';

const Console = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin');
    } else {
      // Here you would typically verify the token with your backend
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="console">
      <h1 className="console__title">Admin Dashboard</h1>
      <div className="console__grid">
        <button className="console__button" onClick={() => navigate('/')}>View as User</button>
        <button className="console__button">Manage Dashboard</button>
        <button className="console__button">Update Schedule</button>
        <button className="console__button">Manage User Info</button>
        <button className="console__button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Console;