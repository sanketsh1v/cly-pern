import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.scss';

const Events = () => {
  const gstRate = 0.05; // GST rate as 5%
  const serviceFeeRate = 0.02625; // Service fee rate (as per your previous fee)

  // State variables
  const [regularTicketCount, setRegularTicketCount] = useState(0);
  const [sponsorshipAmount, setSponsorshipAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [quarterlyEvents, setQuarterlyEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  // Fetch quarterly events from the backend
  useEffect(() => {
    const fetchQuarterlyEvents = async () => {
      try {
        const response = await axios.get("http://localhost:4000/quarterlyEvents"); // Ensure correct backend port
        setQuarterlyEvents(response.data.events); // Assuming response contains `events`
      } catch (error) {
        console.error("Error fetching quarterly events!", error);
      }
    };

    fetchQuarterlyEvents();
  }, []);

  // Handler functions
  const handleRegularIncrement = () => {
    setRegularTicketCount(regularTicketCount + 1);
  };

  const handleRegularDecrement = () => {
    if (regularTicketCount > 0) {
      setRegularTicketCount(regularTicketCount - 1);
    }
  };

  const handleSponsorshipIncrement = () => {
    setSponsorshipAmount(sponsorshipAmount + 1);
  };

  const handleSponsorshipDecrement = () => {
    if (sponsorshipAmount > 0) {
      setSponsorshipAmount(sponsorshipAmount - 1);
    }
  };

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
  };

  const handleSetCustomAmount = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount >= 0) {
      setSponsorshipAmount(amount);
      setCustomAmount('');
    }
  };

  const handleCheckoutClick = (event) => {
    if (regularTicketCount === 0) {
      alert('You have to add at least one ticket');
    }
  };

  // Calculate totals dynamically based on each event's price
  const calculateTotalPrice = (eventPrice) => {
    const gst = eventPrice * gstRate;
    const serviceFee = eventPrice * serviceFeeRate;
    return regularTicketCount * (eventPrice + gst + serviceFee);
  };

  // Filter events based on the search term
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
      {/* Search Bar Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events by Name, Description, Date, or Location.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      {/* Display Filtered Quarterly Events */}
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => {
          const totalRegularTicketPrice = calculateTotalPrice(event.price);
          const totalAmount = totalRegularTicketPrice + sponsorshipAmount;

          return (
            <div className="events__container" key={event.event_id}>
              <div className="events__hero">
                <h3>Play, grow and shine in the Canadian Rockies!</h3>
                <h1>{event.event_name}</h1>
                <div className="events__date">
                  {new Date(event.event_date).toLocaleDateString()} | {event.event_location || "Online"}
                </div>
                <div className="events__image">
                  <img src="/upcomingevent.png" alt={event.event_name} />
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
                    <p>+${(event.price * gstRate)} GST</p>
                    <p>+${(event.price * serviceFeeRate)} service fee</p>
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
                <a href='/Pform'>Checkout</a>
              </div>
            </div>
          );
        })
      ) : (
        <p>No quarterly events available at the moment.</p>
      )}
    </div>
  );
};

export default Events;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Events.scss';

// const Events = () => {
//   // Define all price constants
//   const regularTicketPrice = 475.00;
//   const gst = 23.75;
//   const serviceFee = 12.47;

//   // State variables
//   const [regularTicketCount, setRegularTicketCount] = useState(0);
//   const [sponsorshipAmount, setSponsorshipAmount] = useState(0);
//   const [customAmount, setCustomAmount] = useState('');
//   const [quarterlyEvents, setQuarterlyEvents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(''); // Search term state

//   // Fetch quarterly events from the backend
//   useEffect(() => {
//     const fetchQuarterlyEvents = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/quarterlyEvents"); // Ensure correct backend port
//         setQuarterlyEvents(response.data.events); // Assuming response contains `events`
//       } catch (error) {
//         console.error("Error fetching quarterly events!", error);
//       }
//     };

//     fetchQuarterlyEvents();
//   }, []);

//   // Handler functions
//   const handleRegularIncrement = () => {
//     setRegularTicketCount(regularTicketCount + 1);
//   };

//   const handleRegularDecrement = () => {
//     if (regularTicketCount > 0) {
//       setRegularTicketCount(regularTicketCount - 1);
//     }
//   };

//   const handleSponsorshipIncrement = () => {
//     setSponsorshipAmount(sponsorshipAmount + 1);
//   };

//   const handleSponsorshipDecrement = () => {
//     if (sponsorshipAmount > 0) {
//       setSponsorshipAmount(sponsorshipAmount - 1);
//     }
//   };

//   const handleCustomAmountChange = (event) => {
//     setCustomAmount(event.target.value);
//   };

//   const handleSetCustomAmount = () => {
//     const amount = parseFloat(customAmount);
//     if (!isNaN(amount) && amount >= 0) {
//       setSponsorshipAmount(amount);
//       setCustomAmount('');
//     }
//   };

//   const handleCheckoutClick = (event) => {
//     if (regularTicketCount === 0) {
//       alert('You have to add at least one ticket');
//     }
//   };

//   // Calculate totals
//   const totalRegularTicketPrice = regularTicketCount * (regularTicketPrice + gst + serviceFee);
//   const totalAmount = totalRegularTicketPrice + sponsorshipAmount;

//   // Filter events based on the search term
//   const filteredEvents = quarterlyEvents.filter((event) => {
//     const searchString = searchTerm.toLowerCase();
//     return (
//       event.event_name.toLowerCase().includes(searchString) ||
//       event.event_description.toLowerCase().includes(searchString) ||
//       event.event_location?.toLowerCase().includes(searchString) ||
//       new Date(event.event_date).toLocaleDateString().includes(searchString) ||
//       event.start_time.includes(searchString) ||
//       event.end_time.includes(searchString)
//     );
//   });

//   return (
//     <div className="events">
//       {/* Search Bar Section */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search events by Name, Description, Date, or Location.."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//         />
//       </div>

//       {/* Display Filtered Quarterly Events */}
//       {filteredEvents.length > 0 ? (
//         filteredEvents.map((event) => (
//           <div className="events__container" key={event.event_id}>
//             <div className="events__hero">
//               <h3>Play, grow and shine in the Canadian Rockies!</h3>
//               <h1>{event.event_name}</h1>
//               <div className="events__date">
//                 {new Date(event.event_date).toLocaleDateString()} | {event.event_location || "Online"}
//               </div>
//               <div className="events__image">
//                 <img src="/upcomingevent.png" alt={event.event_name} />
//               </div>
//             </div>

//             <div className="events__details">
//               <h2>Time & Location</h2>
//               <p>{new Date(event.event_date).toLocaleDateString()} | {event.start_time} - {event.end_time}</p>
//               <p>{event.event_location || "Online"}</p>
//             </div>

//             <div className="events__tickets">
//               <h1>Tickets</h1>
              
//               <div className="ticket-section">
//                 <div className="ticket-type">
//                   <h2>Regular Ticket</h2>
//                 </div>
//                 <div className="ticket-price">
//                   <h3>Price</h3>
//                   <p className="price-amount">${regularTicketPrice.toFixed(2)}</p>
//                   <p>+${gst.toFixed(2)} GST</p>
//                   <p>+${serviceFee.toFixed(2)} service fee</p>
//                   <div className="quantity-selector">
//                     <button onClick={handleRegularDecrement}>-</button>
//                     <span>{regularTicketCount}</span>
//                     <button onClick={handleRegularIncrement}>+</button>
//                   </div>
//                 </div>
//               </div>

//               <div className="ticket-section sponsorship">
//                 <div className="ticket-type">
//                   <h2>Sponsorship Donation</h2>
//                   <p>This "ticket" is to contribute financially to support the conference for things such as:</p>
//                   <ul>
//                     <li>Scholarships for people facing financial barriers</li>
//                     <li>Sponsoring a Presenter or a particular session</li>
//                     <li>Contributing to an activity</li>
//                     <li>Anything else you would like to support</li>
//                   </ul>
//                 </div>
//                 <div className="ticket-price">
//                   <h3>Pay What You Want</h3>
//                   <div className="quantity-selector">
//                     <button onClick={handleSponsorshipDecrement}>-</button>
//                     <span>${sponsorshipAmount.toFixed(2)}</span>
//                     <button onClick={handleSponsorshipIncrement}>+</button>
//                   </div>
//                   <div className="custom-amount">
//                     <label>Enter Amount:</label>
//                     <input
//                       type="number"
//                       value={customAmount}
//                       onChange={handleCustomAmountChange}
//                     />
//                     <button onClick={handleSetCustomAmount}>Set Amount</button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="events__checkout">
//               <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
//               <a href='/Pform'>Checkout</a>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No quarterly events available at the moment.</p>
//       )}
//     </div>
//   );
// };

// export default Events;


// import React, { useState } from 'react';
// import './Events.scss';

 
// const Events = () => {
//   // Define all price constants
//   const regularTicketPrice = 475.00;
//   const gst = 23.75;
//   const serviceFee = 12.47;
 
//   // State variables
//   const [regularTicketCount, setRegularTicketCount] = useState(0);
//   const [sponsorshipAmount, setSponsorshipAmount] = useState(0);
//   const [customAmount, setCustomAmount] = useState('');
 
//   // Handler functions
//   const handleRegularIncrement = () => {
//     setRegularTicketCount(regularTicketCount + 1);
//   };
 
//   const handleRegularDecrement = () => {
//     if (regularTicketCount > 0) {
//       setRegularTicketCount(regularTicketCount - 1);
//     }
//   };
 
//   const handleSponsorshipIncrement = () => {
//     setSponsorshipAmount(sponsorshipAmount + 1);
//   };
 
//   const handleSponsorshipDecrement = () => {
//     if (sponsorshipAmount > 0) {
//       setSponsorshipAmount(sponsorshipAmount - 1);
//     }
//   };
 
//   const handleCustomAmountChange = (event) => {
//     setCustomAmount(event.target.value);
//   };
 
//   const handleSetCustomAmount = () => {
//     const amount = parseFloat(customAmount);
//     if (!isNaN(amount) && amount >= 0) {
//       setSponsorshipAmount(amount);
//       setCustomAmount('');
//     }
//   };
 
//   const handleCheckoutClick = (event) => {
//     if (regularTicketCount === 0) {
//       alert('You have to add at least one ticket');
//     }
//   };
 
//   // Calculate totals
//   const totalRegularTicketPrice = regularTicketCount * (regularTicketPrice + gst + serviceFee);
//   const totalAmount = totalRegularTicketPrice + sponsorshipAmount;
 
//   return (
//     <div className="events">
//       <div className="events__container">
//         <div className="events__hero">
//           <h3>Play, grow and shine in the Canadian Rockies!</h3>
//           <h1>Laughter Adventures Conference</h1>
//           <div className="events__date">
//             Fri, May 03, 2024 | Pocaterra Inn, Canmore
//           </div>
//           <div className="events__image">
//             <img src="/upcomingevent.png" alt="Laughing Adventures Conference" />
//           </div>
//         </div>
 
//         <div className="events__details">
//           <h2>Time & Location</h2>
//           <p>May 03, 2024, 3:00 p.m. MDT – May 05, 2024, 3:00 p.m. MDT</p>
//           <p>Pocaterra Inn, Canmore, 1725 Bow Valley Trail, Canmore, AB T1W 2W1, Canada</p>
//         </div>
 
//         <div className="events__tickets">
//           <h1>Tickets</h1>
         
//           <div className="ticket-section">
//             <div className="ticket-type">
//               <h2>Regular Ticket</h2>
//             </div>
//             <div className="ticket-price">
//               <h3>Price</h3>
//               <p className="price-amount">${regularTicketPrice.toFixed(2)}</p>
//               <p>+${gst.toFixed(2)} GST</p>
//               <p>+${serviceFee.toFixed(2)} service fee</p>
//               <div className="quantity-selector">
//                 <button onClick={handleRegularDecrement}>-</button>
//                 <span>{regularTicketCount}</span>
//                 <button onClick={handleRegularIncrement}>+</button>
//               </div>
//             </div>
//           </div>
 
//           <div className="ticket-section sponsorship">
//             <div className="ticket-type">
//               <h2>Sponsorship Donation</h2>
//               <p>This "ticket" is to contribute financially to support the conference for things such as:</p>
//               <ul>
//                 <li>Scholarships for people facing financial barriers</li>
//                 <li>Sponsoring a Presenter or a particular session</li>
//                 <li>Contributing to an activity</li>
//                 <li>Anything else you would like to support</li>
//               </ul>
//             </div>
//             <div className="ticket-price">
//               <h3>Pay What You Want</h3>
//               <div className="quantity-selector">
//                 <button onClick={handleSponsorshipDecrement}>-</button>
//                 <span>${sponsorshipAmount.toFixed(2)}</span>
//                 <button onClick={handleSponsorshipIncrement}>+</button>
//               </div>
//               <div className="custom-amount">
//                 <label>Enter Amount:</label>
//                 <input
//                   type="number"
//                   value={customAmount}
//                   onChange={handleCustomAmountChange}
//                 />
//                 <button onClick={handleSetCustomAmount}>Set Amount</button>
//               </div>
//             </div>
//           </div>
//         </div>
 
//         <div className="events__checkout">
//           <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
//           <a href='/Pform'>Checkout</a>
//         </div>
//       </div>
     
//     </div>
   
//   );
// };
 
// export default Events;