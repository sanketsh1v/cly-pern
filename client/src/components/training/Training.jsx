import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Training.scss';

const Training = () => {
  const [trainingEvents, setTrainingEvents] = useState([]);

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
              <button className="training__button">Register</button>
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




// import React from 'react';
// import './Training.scss';

// const Training = () => {
//   return (
//     <div className="training">
//       <h1 className="training__heading">Upcoming Training</h1>
//       <h2 className="training__subheading">Fall-2024</h2>

//       <div className="training__content">
//         <img src="/training.jpg" alt="Training" className="training__image" />

//         <h3 className="training__title">Certified Laughter Yoga Leader Training</h3>

//         <p className="training__description">
//         Enrich your life with laughter! Join us for this unique weekend training program that may change the way you live with joy through laughter! After the completion of the training, you will be qualified as a Certified Laughter Yoga Leader (CLYL) with the Laughter Yoga International University; this is an internationally recognized certification. As CLYL, you can lead Laughter Yoga sessions with corporate clients, seniors and healthcare facilities, schools, colleges and universities, yoga and fitness centres, community groups and not for profit organizations, or integrate Laughter Yoga into your own business practice, instruction, or healing modality.
//         </p>

//         {/* Box for Date, Price, and Register Button */}
//         <div className="training__details-box">
//           <p className="training__schedule">
//             October 25-27, 2024 | Friday 6:30-8:30pm | Saturday 9:00-5:00pm | Sunday 9:00am-3:00pm
//           </p>
//           <p className="training__fee">
//             Fee: $395 early bird by Sept 25; $495 regular price
//           </p>
//           <button className="training__button">Register</button>
//         </div>

//         {/* Separate Box for "Please Inquire" Message */}
//         <div className="training__inquire-box">
//           <p className="training__note">
//             Partial scholarships may be available if you are facing financial barriers – please inquire.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Training;
