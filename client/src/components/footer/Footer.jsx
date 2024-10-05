import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Footer.scss'; 

function Footer() {
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
            <hr className="parting"/>
        </main>
    );
}

export default Footer;
