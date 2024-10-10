import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.scss';


function Hero() {
    const events = [
        { id: 1, title: 'Laughter Yoga Workshop', date: 'April 25, 2024' },
        { id: 2, title: 'Laughter Adventures Conference', date: 'May 03, 2024' },
        { id: 3, title: 'Mindfulness & Laughter Retreat', date: 'June 15, 2024' },
    ];

    const weeklyEvents = [
        { id: 1, title: 'Zoom Meet-Up', date: 'Sun Jul 14th', time: '5:00pm - 5:40pm' },
        { id: 2, title: 'Zoom Meet-Up', date: 'Sun Jul 21st', time: '5:00pm - 5:40pm' },
        { id: 3, title: 'Zoom Meet-Up', date: 'Sun Jul 28th', time: '5:00pm - 5:40pm' }
    ];

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
                    {weeklyEvents.map((event) => (
                        <div className="weekly-event-card" key={event.id}>
                            <h3 className="weekly-event-title">{event.title}</h3>
                            <p className="weekly-event-date">{event.date}</p>
                            <p className="weekly-event-time">{event.time}</p>
                        </div>
                    ))}
                </div>
                <p className="weekly-events-info">
                    Join us every Sunday from 5:00–5:40 PM Mountain time on Zoom. We also have in-person gatherings sporadically.
                </p>
            </section>
        </main>
    );
}

export default Hero;
