import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Speakers.scss';

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch speakers from the backend when the component mounts
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get('cly-pern-server.vercel.app/Speakers'); // Make sure the backend route is correct
        setSpeakers(response.data.events); // Update state with the fetched speakers
        setLoading(false); // Turn off loading spinner
      } catch (error) {
        console.error('Error fetching speakers:', error);
        setError('Error fetching speakers');
        setLoading(false); // Turn off loading spinner even in case of error
      }
    };

    fetchSpeakers();
  }, []);

  if (loading) {
    return <div className="speakers__loading">Loading speakers...</div>;
  }

  if (error) {
    return <div className="speakers__error">{error}</div>;
  }

  return (
    <div className="speakers">
      <h1 className="speakers__heading">Speakers</h1>
      <div className="speakers__list">
        {speakers.map((speaker) => (
          <div key={speaker.speaker_id} className="speakers__card">
            {speaker.image_path && (
              <img
                src={speaker.image_path} // Use Cloudinary image URL from image_path
                alt={`${speaker.first_name} ${speaker.last_name}`}
                className="speakers__image"
              />
            )}
            <h3 className="speakers__name">
              {speaker.first_name} {speaker.last_name}
            </h3>
            <p className="speakers__location">{speaker.speaker_location}</p>
            <p className="speakers__expertise">{speaker.expertise || 'N/A'}</p>
            <p className="speakers__email">{speaker.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
