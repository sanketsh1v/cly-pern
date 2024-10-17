import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Training.scss';

const Training = () => {
  const [trainingEvents, setTrainingEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch training events from the backend
  useEffect(() => {
    const fetchTrainingEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/trainingCourses'); // Adjust to your backend port
        setTrainingEvents(response.data.events); // Assuming the response contains `events` array
      } catch (error) {
        console.error('Error fetching training events!', error);
      }
    };

    fetchTrainingEvents();
  }, []);

  return (
    <div className="training">
      <h1 className="training__heading">Upcoming Training</h1>

      {trainingEvents.length > 0 ? (
        trainingEvents.map((event) => (
          <div className="training__content" key={event.event_id}>
            <img src="/training.jpg" alt="Training" className="training__image" />

            <h3 className="training__title">{event.event_name}</h3>

            <p className="training__description">{event.event_description}</p>

            {/* Box for Date, Price, and Register Button */}
            <div className="training__details-box">
              <p className="training__schedule">
                {new Date(event.event_date).toLocaleDateString()} | {event.start_time} - {event.end_time}
              </p>
              <p className="training__fee">Fee: ${event.price ? event.price : 'TBD'}</p>
              <button className="training__button" onClick={() => navigate('/Pform')}>Register</button>
            </div>

            {/* Separate Box for "Please Inquire" Message */}
            <div className="training__inquire-box">
              <p className="training__note">
                Partial scholarships may be available if you are facing financial barriers – please inquire.
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No upcoming training events available at the moment.</p>
      )}
    </div>
  );
};

export default Training;
