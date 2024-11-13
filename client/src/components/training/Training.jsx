import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Training.scss';

const Training = () => {
  const gstRate = 0.05;
  const serviceFeeRate = 0.02625;

  const [trainingEvents, setTrainingEvents] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  // Fetch training events from the backend
  useEffect(() => {
    const fetchTrainingEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/trainingCourses');
        setTrainingEvents(response.data.events);

        // Initialize ticket counts for each event
        const initialCounts = response.data.events.reduce((acc, event) => {
          acc[event.event_id] = 0;
          return acc;
        }, {});
        setTicketCounts(initialCounts);
      } catch (error) {
        console.error('Error fetching training events!', error);
      }
    };

    fetchTrainingEvents();
  }, []);

  // Calculate the total amount whenever ticket counts change
  useEffect(() => {
    const calculateTotal = () => {
      const ticketTotal = trainingEvents.reduce((acc, event) => {
        const eventPrice = Number(event.price) || 0;
        const gst = eventPrice * gstRate;
        const serviceFee = eventPrice * serviceFeeRate;
        const singleTicketTotal = eventPrice + gst + serviceFee;
        const count = ticketCounts[event.event_id] || 0;
        return acc + count * singleTicketTotal;
      }, 0);

      setTotalAmount(ticketTotal);
    };

    calculateTotal();
  }, [ticketCounts, trainingEvents, gstRate, serviceFeeRate]);

  const handleTicketIncrement = (eventId) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [eventId]: (prevCounts[eventId] || 0) + 1,
    }));
  };

  const handleTicketDecrement = (eventId) => {
    setTicketCounts((prevCounts) => ({
      ...prevCounts,
      [eventId]: Math.max((prevCounts[eventId] || 0) - 1, 0),
    }));
  };

  return (
    <div className="training">
      <h1 className="training__heading">Upcoming Training</h1>

      {trainingEvents.length > 0 ? (
        trainingEvents.map((eventItem) => (
          <div className="training__content" key={eventItem.event_id}>
            <img 
              src={eventItem.image_url ? eventItem.image_url : "/training.jpg"} 
              alt="Training" 
              className="training__image" 
            />
            <h3 className="training__title">{eventItem.event_name}</h3>
            <h2 className="training__description">{eventItem.event_description}</h2>

            <div className="training__details-box">
              <p className="training__schedule">
                {new Date(eventItem.event_date).toLocaleDateString()} | {eventItem.start_time} - {eventItem.end_time}
              </p>
              <p className="training__schedule">{eventItem.event_location}</p>
              <p className="training__fee">Fee: ${eventItem.price ? eventItem.price : 'TBD'}</p>

              <div className="ticket-counter">
                <button onClick={() => handleTicketDecrement(eventItem.event_id)}>-</button>
                <span>{ticketCounts[eventItem.event_id] || 0}</span>
                <button onClick={() => handleTicketIncrement(eventItem.event_id)}>+</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No upcoming training events available at the moment.</p>
      )}

      <div className="training__checkout">
        <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
        <button
          className="checkout-button"
          onClick={() =>
            navigate(`/Pform?amount=${totalAmount}`)
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Training;
