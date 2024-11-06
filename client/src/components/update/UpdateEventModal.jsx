import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateEventModal.scss';

const UpdateEventModal = ({ onClose }) => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // New state for search input
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectEvent = (eventId) => {
    const selectedEvent = events.find(event => event.event_id === parseInt(eventId));
    if (!selectedEvent) {
      console.error(`Event with ID ${eventId} not found.`);
      return;
    }

    setSelectedEventId(eventId);
    setFormData({
      event_name: selectedEvent.event_name || '',
      event_date: selectedEvent.event_date ? selectedEvent.event_date.split('T')[0] : '',
      start_time: selectedEvent.start_time || '',
      end_time: selectedEvent.end_time || '',
      event_location: selectedEvent.event_location || '',
      zoom_link: selectedEvent.zoom_link || '',
      event_description: selectedEvent.event_description || '',
      event_type: selectedEvent.event_type || '',
      price: selectedEvent.price || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        `http://localhost:4000/updateEvent/${selectedEventId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 'Success') {
        alert('Event updated successfully!');
        onClose();
      } else {
        alert('Error updating event.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event');
    }
  };

  const filteredEvents = events.filter((event) =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Update Event</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for an event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            className="search-input"
          />

          <select onChange={(e) => handleSelectEvent(e.target.value)} required>
            <option value="">Select an Event to Update</option>
            {filteredEvents.map((event) => (
              <option key={event.event_id} value={event.event_id}>
                {event.event_name} (ID: {event.event_id})
              </option>
            ))}
          </select>

          <input type="text" name="event_name" placeholder="Event Name" onChange={handleChange} value={formData.event_name} required />
          <input type="date" name="event_date" onChange={handleChange} value={formData.event_date} required />
          <input type="time" name="start_time" onChange={handleChange} value={formData.start_time} />
          <input type="time" name="end_time" onChange={handleChange} value={formData.end_time} />
          <input type="text" name="event_location" placeholder="Event Location" onChange={handleChange} value={formData.event_location} required />
          <input type="url" name="zoom_link" placeholder="Zoom Link (Optional)" onChange={handleChange} value={formData.zoom_link} />
          <textarea name="event_description" placeholder="Event Description" onChange={handleChange} value={formData.event_description} />
          <input type="text" name="event_type" placeholder="Event Type" onChange={handleChange} value={formData.event_type} required />
          <input type="number" name="price" placeholder="Price (Optional)" onChange={handleChange} value={formData.price} />

          <button type="submit">Update Event</button>
        </form>

        <button className="close-btn" onClick={onClose}>Close</button>

        <div className="events-list">
          <h4>Available Events</h4>
          <ul>
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event.event_id}>
                  <strong>ID:</strong> {event.event_id} - <strong>Name:</strong> {event.event_name}
                </li>
              ))
            ) : (
              <li>No events available.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventModal;
