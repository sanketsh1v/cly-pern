import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteEventModal.scss';

const DeleteEventModal = ({ onClose }) => {
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);

  // Fetch all events when the modal opens
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/events'); // Assuming your route to get events is /events
        setEvents(response.data.events); // Assuming the response structure is { events: [...] }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setEventId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming you store token in localStorage

    try {
      const response = await axios.delete(`http://localhost:4000/deleteEvent/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Add authorization token
        },
      });

      if (response.data.status === 'Success') {
        alert('Event deleted successfully!');
        onClose();
      } else {
        alert('Error deleting event.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Delete Event</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="event_id"
            placeholder="Event ID"
            onChange={handleChange}
            value={eventId}
            required
          />
          <button type="submit">Delete Event</button>
        </form>

        <button className="close-btn" onClick={onClose}>Close</button>

        {/* Display all events for reference */}
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

export default DeleteEventModal;
