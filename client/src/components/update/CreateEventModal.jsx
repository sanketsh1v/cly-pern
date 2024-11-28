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
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const eventFormData = new FormData();
    eventFormData.append('event_name', formData.event_name);
    eventFormData.append('event_date', formData.event_date);
    eventFormData.append('start_time', formData.start_time);
    eventFormData.append('end_time', formData.end_time);
    eventFormData.append('event_location', formData.event_location);
    eventFormData.append('zoom_link', formData.zoom_link);
    eventFormData.append('event_description', formData.event_description);
    eventFormData.append('event_type', formData.event_type);
    eventFormData.append('price', formData.price);

    if (formData.image) {
      eventFormData.append('image', formData.image);
    }

    try {
      const response = await axios.post(
        'cly-pern-server.vercel.app/createEvent',
        eventFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
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
          <select
            name="event_type"
            onChange={handleChange}
            value={formData.event_type}
            required
          >
            <option value="" disabled>Select event type</option>
            <option value="weekly">weekly</option>
            <option value="quarterly">quarterly</option>
            <option value="training">training</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price (Optional)"
            onChange={handleChange}
            value={formData.price}
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
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
