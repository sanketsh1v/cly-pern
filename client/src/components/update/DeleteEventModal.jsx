import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteEventModal.scss';

const DeleteEventModal = ({ onClose }) => {
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

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

  const handleChange = (e) => {
    setEventId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.delete(`cly-pern-server.vercel.app/deleteEvent/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
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

  const filteredEvents = events.filter((event) =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Delete Event</h3>
        <form onSubmit={handleSubmit}>
          {/* Search input for filtering events */}
          <input
            type="text"
            placeholder="Search for an event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          {/* Input for specifying the event ID */}
          <input
            type="text"
            name="event_id"
            placeholder="Enter Event ID to delete"
            onChange={handleChange}
            value={eventId}
            required
          />
          <button type="submit">Delete Event</button>
        </form>

        <button className="close-btn" onClick={onClose}>Close</button>

        {/* Display the filtered list of events */}
        <div className="events-list">
          <h4>Available Events</h4>
          <ul>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <li key={event.event_id}>
                  <strong>ID:</strong> {event.event_id} - <strong>Name:</strong> {event.event_name}
                </li>
              ))
            ) : (
              <li>No events found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
