import axios from 'axios';
import React, { useEffect, useState } from 'react';

function WeeklyEvents() {
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
        <div>
            <h2>Weekly Events</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.title} - {event.date}</li>
                ))}
            </ul>
        </div>
    );
}

export default WeeklyEvents;
