import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Hero.scss';

function Hero() {
    const [weeklyEvents, setWeeklyEvents] = useState([]);

    // Fetch weekly events from the backend
    useEffect(() => {
        const fetchWeeklyEvents = async () => {
            try {
                const response = await axios.get("http://localhost:4000/weeklyEvents"); // Ensure correct API URL and port
                setWeeklyEvents(response.data.events); // Assuming the response contains `events` array
            } catch (error) {
                console.error("Error fetching weekly events:", error);
            }
        };
    
        fetchWeeklyEvents();
    }, []);

    return (
        <main className="main-container">
            <div className="box-container">
                <h1 className="heading-title">
                    Welcome to Calgary Laughter Yoga and Adventures
                </h1>
                <p className="subheading-text">
                    Join our inclusive community, embrace playfulness & transform your life through intentional laughter.
                </p>

                <div className="image-container">
                    <img src="./first.png" alt="Laughing Image 1" className="event-image" />
                    <img src="./second.png" alt="Laughing Image 2" className="event-image" />
                    <img src="./third.png" alt="Laughing Image 3" className="event-image" />
                </div>
            </div>
            <hr className="styled-separator" />

            <section className="upcoming-event-section">
                <h2 className="event-section-title">Upcoming In-Person Event</h2>
                <div className="event-details-card">
                    <img src="./upcomingevent.png" alt="Laughter Event" className="event-image-large" />
                    <div className="event-info">
                        <h3 className="event-title">Laughter Adventures Conference</h3>
                        <p className="event-date">Fri, May 03, 2024</p>
                        <p className="event-location">Pocaterra Inn, Canmore</p>
                        <a href="/events" className="event-button">Event Details</a>
                    </div>
                </div>
            </section>
            <hr className="styled-separator" />

            <section className="weekly-events-section">
                <h2 className="weekly-events-title">Weekly Events Calendar</h2>
                <div className="weekly-events-container">
                    {weeklyEvents.length > 0 ? (
                        weeklyEvents.map((event) => (
                            <div className="weekly-event-card" key={event.event_id}>
                                <h3 className="weekly-event-title">{event.event_name}</h3>
                                
                                <p className="weekly-event-time">{event.start_time} - {event.end_time}</p>
                            </div>
                        ))
                    ) : (
                        <p>No weekly events available at the moment.</p>
                    )}
                </div>
                <p className="weekly-events-info">
                    Join us every Sunday from 5:00–5:40 PM Mountain time on Zoom. We also have in-person gatherings sporadically.
                </p>
            </section>
        </main>
    );
}

export default Hero;

// import React, { useEffect, useState } from 'react';
// import './Hero.scss';

// function Hero() {
//     const [weeklyEvents, setWeeklyEvents] = useState([]);

//     useEffect(() => {
//         const fetchWeeklyEvents = async () => {
//             try {
//                 const response = await fetch("http://localhost:3001/weeklyEvents"); // Ensure correct API URL
//                 const data = await response.json();
//                 console.log(data); // Log the data to check if it's being fetched correctly
//                 if (data.status === "Success") {
//                     setWeeklyEvents(data.events);
//                 }
//             } catch (error) {
//                 console.error("Error fetching weekly events:", error);
//             }
//         };
    
//         fetchWeeklyEvents();
//     }, []);

//     return (
//         <main className="main-container">
//             <div className="box-container">
//                 <h1 className="heading-title">
//                     Welcome to Calgary Laughter Yoga and Adventures
//                 </h1>
//                 <p className="subheading-text">
//                     Join our inclusive community, embrace playfulness & transform your life through intentional laughter.
//                 </p>

//                 <div className="image-container">
//                     <img src="./first.png" alt="Laughing Image 1" className="event-image" />
//                     <img src="./second.png" alt="Laughing Image 2" className="event-image" />
//                     <img src="./third.png" alt="Laughing Image 3" className="event-image" />
//                 </div>
//             </div>
//             <hr className="styled-separator" />

//             <section className="upcoming-event-section">
//                 <h2 className="event-section-title">Upcoming In-Person Event</h2>
//                 <div className="event-details-card">
//                     <img src="./upcomingevent.png" alt="Laughter Event" className="event-image-large" />
//                     <div className="event-info">
//                         <h3 className="event-title">Laughter Adventures Conference</h3>
//                         <p className="event-date">Fri, May 03, 2024</p>
//                         <p className="event-location">Pocaterra Inn, Canmore</p>
//                         <a href="/events" className="event-button">Event Details</a>
//                     </div>
//                 </div>
//             </section>
//             <hr className="styled-separator" />

//             <section className="weekly-events-section">
//                 <h2 className="weekly-events-title">Weekly Events Calendar</h2>
//                 <div className="weekly-events-container">
//                     {weeklyEvents.length > 0 ? (
//                         weeklyEvents.map((event) => (
//                             <div className="weekly-event-card" key={event.event_id}>
//                                 <h3 className="weekly-event-title">{event.event_name}</h3>
//                                 <p className="weekly-event-date">{new Date(event.event_date).toLocaleDateString()}</p>
//                                 <p className="weekly-event-time">{event.start_time} - {event.end_time}</p>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No weekly events available at the moment.</p>
//                     )}
//                 </div>
//                 <p className="weekly-events-info">
//                     Join us every Sunday from 5:00–5:40 PM Mountain time on Zoom. We also have in-person gatherings sporadically.
//                 </p>
//             </section>
//         </main>
//     );
// }

// export default Hero;
