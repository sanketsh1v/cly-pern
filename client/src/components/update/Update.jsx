import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Using react-router-dom for navigation
import './Update.scss';
import CreateEventModal from './CreateEventModal';
import UpdateEventModal from './UpdateEventModal';
import DeleteEventModal from './DeleteEventModal';

const Update = () => {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  // Function to check if the admin is logged in
  const checkAdminAuth = () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored as 'token' in localStorage
    if (!token) {
      navigate('/admin'); // Redirect to login page if not authenticated
    }
  };

  useEffect(() => {
    checkAdminAuth(); // Check if admin is authenticated on component load
  }, []);

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="admin-console">
      <div className="admin-sidebar">
        <ul>
          <li onClick={() => openModal('create')}>Create Event</li>
          <li onClick={() => openModal('update')}>Update Event</li>
          <li onClick={() => openModal('delete')}>Delete Event</li>
        </ul>
      </div>

      <div className="admin-content">
        {activeModal === 'create' && <CreateEventModal onClose={closeModal} />}
        {activeModal === 'update' && <UpdateEventModal onClose={closeModal} />}
        {activeModal === 'delete' && <DeleteEventModal onClose={closeModal} />}
      </div>
    </div>
  );
};

export default Update;

