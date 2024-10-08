import React from 'react';
import './Training.scss';

const Training = () => {
  return (
    <div className="training">
      <h1 className="training__heading">Upcoming Training</h1>
      <h2 className="training__subheading">Fall-2024</h2>

      <div className="training__content">
        <img src="/training.jpg" alt="Training" className="training__image" />

        <h3 className="training__title">Certified Laughter Yoga Leader Training</h3>
        
        <p className="training__description">
          Enrich your life with laughter! Join us for this unique weekend training program that may change the way you live with joy through laughter! After the completion of the training, you will be qualified as a Certified Laughter Yoga Leader (CLYL) with the Laughter Yoga International University; this is an internationally recognized certification. As CLYL, you can lead Laughter Yoga sessions with corporate clients, seniors and healthcare facilities, schools, colleges and universities, yoga and fitness centres, community groups and not for profit organizations, or integrate Laughter Yoga into your own business practice, instruction, or healing modality.
        </p>

        <div className="training__schedule">
          <p>October 25-27, 2024 | Friday 6:30-8:30pm | Saturday 9:00-5:00pm | Sunday 9:00am-3:00pm</p>
          <p>9:00am-3:00pm with a public event at 1:00pm</p>
        </div>

        <div className="training__fee">
          <p>$395 early bird (by Sept 25); $495 regular price</p>
        </div>

        <p className="training__note">
          <strong>Partial scholarships may be available if you are facing financial barriers – please inquire.</strong>
        </p>

        <button className="training__button">Register</button>
      </div>
    </div>
  );
};

export default Training;
