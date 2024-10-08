import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Hero.scss'; 

function Hero() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/getWeeklyEvents')
            .then(response => {
                setEvents(response.data.events);
            })
            .catch(error => {
                console.error('Error fetching weekly events:', error);
            });
    }, []);

    return (
        <main className="main-container">
            <div>
             <hr className="separator" />
             </div>
            <div className="box-container">
                <h1 className="heading-title">
                    Welcome to Calgary Laughter Yoga and Adventures
                </h1>
                <p className="subheading-text">
                    Join our inclusive community, embrace playfulness & transform your life through intentional laughter.
                </p>
                <ul className="event-list">
                    {events.map(event => (
                        <li key={event.id}>{event.title} - {event.date}</li>
                    ))}
                </ul>
            
                <div className="image-container">
                    <img
                        src="./first.png"
                        alt="Laughing Image 1"
                        className="event-image"
                    />
                    <img
                        src="./second.png"
                        alt="Laughing Image 2"
                        className="event-image"
                    />
                    <img
                        src="./third.png"
                        alt="Laughing Image 3"
                        className="event-image"
                    />
                </div>
            </div>
        </main>
        
    );
}

export default Hero;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './Hero.scss'; 

// function Hero() {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true); // Loading state
//     const [error, setError] = useState(null); // Error state

//     useEffect(() => {
//         axios.get('http://localhost:4000/getWeeklyEvents')
//             .then(response => {
//                 setEvents(response.data.events);
//                 setLoading(false); // Stop loading after data is fetched
//             })
//             .catch(error => {
//                 console.error('Error fetching weekly events:', error);
//                 setError('Failed to fetch events'); // Set error message if fetching fails
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div className="loading">Loading events...</div>; // Loading message
//     }

//     if (error) {
//         return <div className="error">{error}</div>; // Display error message
//     }

//     return (
//         <main className="main-container">
//             <div>
//                 <hr className="separator" />
//             </div>
//             <div className="box-container">
//                 <h1 className="heading-title">
//                     Welcome to Calgary Laughter Yoga and Adventures
//                 </h1>
//                 <p className="subheading-text">
//                     Join our inclusive community, embrace playfulness & transform your life through intentional laughter.
//                 </p>
//                 <ul className="event-list">
//                     {events.map(event => (
//                         <li key={event.id}>{event.title} - {event.date}</li>
//                     ))}
//                 </ul>
            
//                 <div className="image-container">
//                     <img
//                         src="./first.png"
//                         alt="Laughing Image 1"
//                         className="event-image"
//                     />
//                     <img
//                         src="./second.png"
//                         alt="Laughing Image 2"
//                         className="event-image"
//                     />
//                     <img
//                         src="./third.png"
//                         alt="Laughing Image 3"
//                         className="event-image"
//                     />
//                 </div>
//             </div>

//             {/* New Section for Upcoming Event Details */}
//             <div className="upcoming-event-section">
//                 <h2 className="upcoming-event-title">Upcoming Special Event</h2>
//                 <div className="upcoming-event-content">
//                     <img src="./specialevent.png" alt="Special Event" className="upcoming-event-image" />
//                     <div className="upcoming-event-details">
//                         <h3 className="upcoming-event-name">Laughter Yoga Retreat</h3>
//                         <p className="upcoming-event-date">Sat, June 15, 2024</p>
//                         <p className="upcoming-event-location">Banff Springs Hotel, Banff</p>
//                         <a href="#event-details" className="upcoming-event-link">Event Details</a>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default Hero;
