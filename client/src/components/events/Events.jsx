import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.scss';
import { Link } from 'react-router-dom';

const Events = () => {
  const gstRate = 0.05;
  const serviceFeeRate = 0.02625;

  const [regularTicketCount, setRegularTicketCount] = useState(0);
  const [sponsorshipAmount, setSponsorshipAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [quarterlyEvents, setQuarterlyEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchQuarterlyEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/quarterlyEvents");
        setQuarterlyEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching quarterly events!", error);
      }
    };
    fetchQuarterlyEvents();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      if (quarterlyEvents.length > 0) {
        const eventPrice = Number(quarterlyEvents[0].price) || 0;
        const gst = eventPrice * gstRate;
        const serviceFee = eventPrice * serviceFeeRate;
        const singleTicketTotal = eventPrice + gst + serviceFee;
        
        const ticketTotal = Number(regularTicketCount) * singleTicketTotal;
        
        const sponsorshipValue = Number(sponsorshipAmount) || 0;
        
        const finalTotal = ticketTotal + sponsorshipValue;
        
        if (!isNaN(finalTotal)) {
          setTotalAmount(finalTotal);
        } else {
          setTotalAmount(0);
        }
      }
    };
    calculateTotal();
  }, [regularTicketCount, sponsorshipAmount, quarterlyEvents, gstRate, serviceFeeRate]);

  const handleRegularIncrement = () => setRegularTicketCount(regularTicketCount + 1);
  const handleRegularDecrement = () => regularTicketCount > 0 && setRegularTicketCount(regularTicketCount - 1);
  const handleSponsorshipIncrement = () => setSponsorshipAmount(Number(sponsorshipAmount) + 1);
  const handleSponsorshipDecrement = () => sponsorshipAmount > 0 && setSponsorshipAmount(Number(sponsorshipAmount) - 1);
  const handleCustomAmountChange = (event) => setCustomAmount(event.target.value);
  const handleSetCustomAmount = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount >= 0) {
      setSponsorshipAmount(Number(amount));
      setCustomAmount('');
    }
  };
  const handleCheckoutClick = () => {
    if (regularTicketCount === 0) alert('You have to add at least one ticket');
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
        filteredEvents.map((event) => (
          <div className="events__container" key={event.event_id}>
            <div className="events__hero">
              <h3>Play, grow and shine in the life with the help of laughter yoga and adventures.</h3>
              <h1>{event.event_name}</h1>
              <h2>{event.event_description}</h2>
              <div className="events__date">
                {new Date(event.event_date).toLocaleDateString()} | {event.event_location || "Online"}
              </div>
              <div className="events__image">
                <img
                  src={event.image_url || '/upcomingevent.png'} // Display event.image_url if available
                  alt={event.event_name}
                />
              </div>
            </div>

            <div className="events__details">
              <h2>Time & Location</h2>
              <p>{new Date(event.event_date).toLocaleDateString()} | {event.start_time} - {event.end_time}</p>
              <p>{event.event_location || "Online"}</p>
            </div>

            <div className="events__tickets">
              <h1>Tickets</h1>
              <div className="ticket-section">
                <div className="ticket-type">
                  <h2>Regular Ticket</h2>
                </div>
                <div className="ticket-price">
                  <h3>Price</h3>
                  <p className="price-amount">${event.price}</p>
                  <p>+${(event.price * gstRate).toFixed(2)} GST</p>
                  <p>+${(event.price * serviceFeeRate).toFixed(2)} service fee</p>
                  <div className="quantity-selector">
                    <button onClick={handleRegularDecrement}>-</button>
                    <span>{regularTicketCount}</span>
                    <button onClick={handleRegularIncrement}>+</button>
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
                    <button onClick={handleSponsorshipDecrement}>-</button>
                    <span>${sponsorshipAmount.toFixed(2)}</span>
                    <button onClick={handleSponsorshipIncrement}>+</button>
                  </div>
                  <div className="custom-amount">
                    <label>Enter Amount:</label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                    />
                    <button onClick={handleSetCustomAmount}>Set Amount</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="events__checkout">
              <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
              <Link 
                to={{
                  pathname: '/Pform',
                  search: `?amount=${totalAmount}&eventName=${encodeURIComponent(quarterlyEvents[0].event_name)}&ticketCount=${regularTicketCount}&ticketPrice=${quarterlyEvents[0].price}&donation=${sponsorshipAmount}`
                }}
              >
                Checkout
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No quarterly events available at the moment.</p>
      )}
    </div>
  );
};

export default Events;