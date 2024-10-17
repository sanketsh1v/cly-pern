import React, { useState } from 'react';
import axios from 'axios';
import './CreateEventModal.scss';

const CreateEventModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    start_time: '',
    end_time: '',
    event_location: '',
    zoom_link: '',
    event_description: '',
    event_type: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

    try {
      const response = await axios.post(
        'http://localhost:4000/createEvent', // Full URL to the backend server
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send the token in Authorization header
          },
        }
      );

      if (response.data.status === 'Success') {
        alert('Event created successfully!');
        onClose();
      } else {
        alert('Error creating event.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Create Event</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="event_name"
            placeholder="Event Name"
            onChange={handleChange}
            value={formData.event_name}
            required
          />
          <input
            type="date"
            name="event_date"
            onChange={handleChange}
            value={formData.event_date}
            required
          />
          <input
            type="time"
            name="start_time"
            onChange={handleChange}
            value={formData.start_time}
            required
          />
          <input
            type="time"
            name="end_time"
            onChange={handleChange}
            value={formData.end_time}
            required
          />
          <input
            type="text"
            name="event_location"
            placeholder="Event Location"
            onChange={handleChange}
            value={formData.event_location}
            required
          />
          <input
            type="url"
            name="zoom_link"
            placeholder="Zoom Link (Optional)"
            onChange={handleChange}
            value={formData.zoom_link}
          />
          <textarea
            name="event_description"
            placeholder="Event Description"
            onChange={handleChange}
            value={formData.event_description}
            required
          />
          <input
            type="text"
            name="event_type"
            placeholder="Event Type"
            onChange={handleChange}
            value={formData.event_type}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (Optional)"
            onChange={handleChange}
            value={formData.price}
          />

          <button type="submit">Create Event</button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateEventModal;
