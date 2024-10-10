import React from 'react';
import './About.scss';

const Training = () => {
  return (
    <main className='main'>

      <div className='title-container'>
        <p className='title'>Calgary Laughter Yoga and Adventures</p>
      </div>

      <div className='quote-section'>
        <p className='quote'>
          The greatness of a community is most accurately measured by the compassionate action of its members.
        </p>
        <p className='author'>- Coretta Scott King</p>
      </div>

      <div className="image-text-container">
        <img src="./about.webp" alt="about" className="about-image" />
        
        <div className="text-content">
          <p>Hello there!</p>
          <p>
            We are Calgary Laughter Yoga, an inclusive group of folks from different walks of life with a passion for laughter and wellbeing. We want to ensure you feel welcome here and connect with our vibe!
          </p>
          <p>
            Our club has been running since 2013 in various spaces around Calgary. We started when three of us met at a laughter conference in Vancouver. Knowing that we all bring different strengths to the team, with a shared vision for joy, health and community, we joined forces and are building something stronger and better together than what we could have done on our own.
          </p>
        </div>
      </div>

      <div className='mission-vision-section'>
        <div>
          <p className='heading'>Our Vision</p>
          <p>All Calgarians and our extended neighbors feel joyful, are free from pain and are connected to their communities.</p>
        </div>
        <div>
          <p className='heading'>Our Mission</p>
          <p>We are a supportive, inclusive and empowering community transforming lives for the better through intentional laughter.</p>
        </div>
        <div>
          <p className='heading'>Our Values</p>
          <p>​• Connection, Belonging and Inclusivity</p>
          <p>​• Compassion and Wellbeing</p>
          <p>​• Authenticity and Empowerment</p>
        </div>
        <div>
          <p className='heading'>Our Club</p>
          <p>We have a free Laughter Club open to all ages and abilities and we meet on Sundays at 5pm Mountain Time, currently on Zoom. That's right - you can join us, for free, from the comfort of your own home!</p>
          <p>
            When we meet in-person, we rent out space that is accessible so whether you are in a wheelchair, walk fast or slow, a marathon runner, a billionaire, or barely getting by, you are welcome to join us. Our favourite venue is the <a href="https://www.insideouttheatre.com/" target="_blank" class="underline">Inside Out Theatre</a> as it aligns with our values and is a fabulous space in the heart of downtown. You may find us around the city filling other spaces with joy and laughter as well! Please check the Events Calendar on the <a href="../hero.js" class="underline" target="_blank">Home Page</a> or <a href="https://www.facebook.com/calgarylaughteryoga" class="underline" target="_blank">Facebook</a> for updated in-person events.
          </p>
          <p>
            In the spirit of respect, reciprocity and truth, we honour those who have come before us and acknowledge the traditional territories and oral practices of the Blackfoot (Siksika, Piikani, and Kainai), the Tsuut’ina (Sarcee), the Stoney Nakoda First Nations, the Métis Nation (Region 3), and all people who make their homes in the Treaty 7 region of Southern Alberta.
          </p>
        </div>
      </div>

      <div className='donation-box'>
        <div className='text-content'>
          <p className='heading'>Calgary Laughter Club Online</p>
          <p className='heading-2'>Every Sunday 5:00-5:40 PM Mountain Time</p>
          <p className='heading-2'>Join Us On Zoom</p>
        </div>
        <div className='text-content'>
          <p className='heading-2'>
            Every week, a fantastic team of unpaid facilitators hosts these free seminars for the local community.
          </p>
          <p className='heading-2'>Come through, introduce yourself, and laugh with us and other visitors from across the globe.</p>
          <p className='heading-2'>You could quickly discover that you're returning often!</p>
        </div>
        <div className='text-content'>
          <p className='heading-2'>Calgary Laughter Club Sunday Brunch Potlucks</p>
          <p className='heading-2'>Sundays Quarterly 11:00am-1:00pm</p>
          <p className='heading-2'>
            Join us in-person at the{' '}
            <a href='https://www.insideouttheatre.com/' target='_blank' className='underline'>
              Inside Out Theatre
            </a>{' '}
            & check{' '}
            <a href='https://www.facebook.com/calgarylaughteryoga' className='underline' target='_blank'>
              Facebook
            </a>{' '}
            for dates
          </p>
        </div>
        <div className='text-content'>
          <p className='heading-2'>
            These sessions are offered to our community by a fantastic collection of volunteer Facilitators, much like our
            online club.
          </p>
          <p className='heading-2'>
            They take turns. Nothing compares to a good laugh—well, except for a good laugh shared with delicious food and
            wonderful company!
          </p>
          <p className='heading-2'>
            Please bring a dish to share and a recommended $10 donation to help cover the costs of marketing and venue
            rental.
          </p>
        </div>
        <div className='text-content'>
          <p className='heading-2'>No cash? No problem! Please use the link to contribute below. 😊 </p>
        </div>
        <div className='heading-2'>
          <button className='bg-black text-white px-8 py-2 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors duration-300'>
            Make A Donation
          </button>
        </div>
        </div>
        <hr className='mb-10 mt-10 border-black' />
        <div className='first-nation'>
          <p className='mb-3'>
            In the spirit of respect, reciprocity and truth, we honour those who have come before us and acknowledge the
            traditional territories and oral practices of
          </p>
          <p className='mb-3'>
            the Blackfoot (Siksika, Piikani, and Kainai), the Tsuut’ina (Sarcee), the Stoney Nakoda First Nations, the
            Métis Nation (Region 3), and all people who make
          </p>
          <p className='mb-3'>their homes in the Treaty 7 region of Southern Alberta.</p>
        </div>
    
    </main>
  );
};

export default Training;
