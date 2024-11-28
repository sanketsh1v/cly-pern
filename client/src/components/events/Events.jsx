import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.scss';
import { Link } from 'react-router-dom';

const Events = () => {
  const gstRate = 0.05;
  const serviceFeeRate = 0.02625;

  const [ticketCounts, setTicketCounts] = useState({});
  const [sponsorshipAmounts, setSponsorshipAmounts] = useState({});
  const [customAmount, setCustomAmount] = useState('');
  const [quarterlyEvents, setQuarterlyEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchQuarterlyEvents = async () => {
      try {
        const response = await axios.get("cly-pern-server.vercel.app/quarterlyEvents");
        setQuarterlyEvents(response.data.events);
        // Initialize ticket counts and sponsorship amounts for each event
        const initialCounts = response.data.events.reduce((acc, event) => {
          acc[event.event_id] = 0;
          return acc;
        }, {});
        setTicketCounts(initialCounts);
        setSponsorshipAmounts(initialCounts);
      } catch (error) {
        console.error("Error fetching quarterly events!", error);
      }
    };
    fetchQuarterlyEvents();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const ticketTotal = quarterlyEvents.reduce((acc, event) => {
        const eventPrice = Number(event.price) || 0;
        const gst = eventPrice * gstRate;
        const serviceFee = eventPrice * serviceFeeRate;
        const singleTicketTotal = eventPrice + gst + serviceFee;
        const count = ticketCounts[event.event_id] || 0;
        return acc + count * singleTicketTotal;
      }, 0);

      const sponsorshipTotal = Object.values(sponsorshipAmounts).reduce((acc, amount) => acc + amount, 0);
      const finalTotal = ticketTotal + sponsorshipTotal;

      setTotalAmount(isNaN(finalTotal) ? 0 : finalTotal);
    };
    calculateTotal();
  }, [ticketCounts, sponsorshipAmounts, quarterlyEvents, gstRate, serviceFeeRate]);

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

  const handleSponsorshipIncrement = (eventId) => {
    setSponsorshipAmounts((prevAmounts) => ({
      ...prevAmounts,
      [eventId]: (prevAmounts[eventId] || 0) + 1,
    }));
  };

  const handleSponsorshipDecrement = (eventId) => {
    setSponsorshipAmounts((prevAmounts) => ({
      ...prevAmounts,
      [eventId]: Math.max((prevAmounts[eventId] || 0) - 1, 0),
    }));
  };

  const handleCustomAmountChange = (event) => setCustomAmount(event.target.value);
  const handleSetCustomAmount = (eventId) => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount >= 0) {
      setSponsorshipAmounts((prevAmounts) => ({
        ...prevAmounts,
        [eventId]: amount,
      }));
      setCustomAmount('');
    }
  };

  const filteredEvents = quarterlyEvents.filter((event) => {
    const searchString = searchTerm.toLowerCase();
    return (
      event.event_name.toLowerCase().includes(searchString) ||
      event.event_description?.toLowerCase().includes(searchString) ||
      event.event_location?.toLowerCase().includes(searchString) ||
      new Date(event.event_date).toLocaleDateString().includes(searchString) ||
      event.start_time.includes(searchString) ||
      event.end_time.includes(searchString)
    );
  });

  return (
    <div className="events">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events by Name, Description, Date, or Location.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredEvents.length > 0 ? (
        filteredEvents.map((eventItem) => (
          <div className="events__container" key={eventItem.event_id}>
            <div className="events__hero">
              <h3>Play, grow and shine in the life with the help of laughter yoga and adventures.</h3>
              <h1>{eventItem.event_name}</h1>
              <h2>{eventItem.event_description}</h2>
              <div className="events__date">
                {new Date(eventItem.event_date).toLocaleDateString()} | {eventItem.event_location || "Online"}
              </div>
              <div className="events__image">
                <img
                  src={eventItem.image_url || '/upcomingevent.png'}
                  alt={eventItem.event_name}
                />
              </div>
            </div>

            <div className="events__details">
              <h2>Time & Location</h2>
              <p>{new Date(eventItem.event_date).toLocaleDateString()} | {eventItem.start_time} - {eventItem.end_time}</p>
              <p>{eventItem.event_location || "Online"}</p>
            </div>

            <div className="events__tickets">
              <h1>Tickets</h1>
              <div className="ticket-section">
                <div className="ticket-type">
                  <h2>Regular Ticket</h2>
                </div>
                <div className="ticket-price">
                  <h3>Price</h3>
                  <p className="price-amount">${eventItem.price}</p>
                  <p>+${(eventItem.price * gstRate).toFixed(2)} GST</p>
                  <p>+${(eventItem.price * serviceFeeRate).toFixed(2)} service fee</p>
                  <div className="quantity-selector">
                    <button onClick={() => handleTicketDecrement(eventItem.event_id)}>-</button>
                    <span>{ticketCounts[eventItem.event_id] || 0}</span>
                    <button onClick={() => handleTicketIncrement(eventItem.event_id)}>+</button>
                  </div>
                </div>
              </div>

              <div className="ticket-section sponsorship">
                <div className="ticket-type">
                  <h2>Sponsorship Donation</h2>
                  <p>This "ticket" is to contribute financially to support the conference for things such as:</p>
                  <ul>
                    <li>Scholarships for people facing financial barriers</li>
                    <li>Sponsoring a Presenter or a particular session</li>
                    <li>Contributing to an activity</li>
                    <li>Anything else you would like to support</li>
                  </ul>
                </div>
                <div className="ticket-price">
                  <h3>Pay What You Want</h3>
                  <div className="quantity-selector">
                    <button onClick={() => handleSponsorshipDecrement(eventItem.event_id)}>-</button>
                    <span>${sponsorshipAmounts[eventItem.event_id]?.toFixed(2) || 0}</span>
                    <button onClick={() => handleSponsorshipIncrement(eventItem.event_id)}>+</button>
                  </div>
                  <div className="custom-amount">
                    <label>Enter Amount:</label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                    <button onClick={() => handleSetCustomAmount(eventItem.event_id)}>Set Amount</button>
                  </div>
                </div>
              </div>
            </div>
            <hr className="styled-separator" />  
          </div>
        ))
      ) : (
        <p>No quarterly events available at the moment.</p>
      )}

      <div className="events__checkout">
        <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
        <Link 
          to={{
            pathname: '/Pform',
            search: `?amount=${totalAmount}`
          }}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Events;
