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
          Embark on a life-changing journey that will bring laughter into your life. During the training, you’ll dive into Laughter Yoga and the power of joyful practice.
        </p>

        {/* Box for Date, Price, and Register Button */}
        <div className="training__details-box">
          <p className="training__schedule">
            October 25-27, 2024 | Friday 6:30-8:30pm | Saturday 9:00-5:00pm | Sunday 9:00am-3:00pm
          </p>
          <p className="training__fee">
            Fee: $395 early bird by Sept 25; $495 regular price
          </p>
          <button className="training__button">Register</button>
        </div>

        {/* Separate Box for "Please Inquire" Message */}
        <div className="training__inquire-box">
          <p className="training__note">
            Partial scholarships may be available if you are facing financial barriers – please inquire.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Training;
