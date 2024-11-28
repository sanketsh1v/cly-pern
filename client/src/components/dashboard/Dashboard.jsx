import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.scss';

const ManageSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingNewSpeaker, setIsAddingNewSpeaker] = useState(false);
  const [isEditingSpeaker, setIsEditingSpeaker] = useState(null);
  const [newSpeaker, setNewSpeaker] = useState({
    first_name: '',
    last_name: '',
    email: '',
    speaker_location: '',
    expertise: '',
    image: null,
    image_path: '',
  });

  // Fetch speakers from the backend
  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await axios.get('cly-pern-server.vercel.app/Speakers');
        setSpeakers(response.data.events);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  // Handle input changes for each field
  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setNewSpeaker({
        ...newSpeaker,
        image: e.target.files[0],
      });
    } else {
      setNewSpeaker({
        ...newSpeaker,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle form submission to add or edit a speaker
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditingSpeaker) {
        // Update an existing speaker without including the image
        const response = await axios.put(`cly-pern-server.vercel.app/updateSpeaker/${isEditingSpeaker}`, {
          first_name: newSpeaker.first_name,
          last_name: newSpeaker.last_name,
          email: newSpeaker.email,
          speaker_location: newSpeaker.speaker_location,
          expertise: newSpeaker.expertise,
        });
        
        // Update the speaker in the local state
        setSpeakers(speakers.map((s) => (s.speaker_id === isEditingSpeaker ? response.data : s)));
        setIsEditingSpeaker(null);
      } else {
        const formData = new FormData();
        formData.append('first_name', newSpeaker.first_name);
        formData.append('last_name', newSpeaker.last_name);
        formData.append('email', newSpeaker.email);
        formData.append('speaker_location', newSpeaker.speaker_location);
        formData.append('expertise', newSpeaker.expertise);
        
        // Only append the image if we are adding a new speaker
        if (newSpeaker.image) {
          formData.append('image', newSpeaker.image);
        }

        const response = await axios.post('cly-pern-server.vercel.app/Speakers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        // Add the new speaker to the speakers state
        setSpeakers([...speakers, response.data.speaker]);
      }

      // Reset the form fields
      setNewSpeaker({
        first_name: '',
        last_name: '',
        email: '',
        speaker_location: '',
        expertise: '',
        image: null,
        image_path: '',
      });
      setIsAddingNewSpeaker(false);
    } catch (err) {
      console.error('Error adding or updating speaker:', err);
    }
  };

  // Handle deleting a speaker
  const handleDelete = async (id) => {
    try {
      await axios.delete(`cly-pern-server.vercel.app/Speakers/${id}`);
      setSpeakers(speakers.filter((s) => s.speaker_id !== id));
    } catch (err) {
      console.error('Error deleting speaker:', err);
    }
  };

  // Start editing a speaker
  const startEditing = (speaker) => {
    setNewSpeaker({
      first_name: speaker.first_name,
      last_name: speaker.last_name,
      email: speaker.email,
      speaker_location: speaker.speaker_location,
      expertise: speaker.expertise,
      image: null, 
      image_path: speaker.image_path, 
    });
    setIsEditingSpeaker(speaker.speaker_id);
    setIsAddingNewSpeaker(true); 
  };

  if (loading) return <p>Loading speakers...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="manage-speakers">
      <h1 className="manage-speakers__heading">Manage Speakers</h1>
      <button className="manage-speakers__add-button" onClick={() => setIsAddingNewSpeaker(true)}>
        {isEditingSpeaker ? 'Edit Speaker' : 'Add New Speaker'}
      </button>
      {isAddingNewSpeaker && (
        <form className="manage-speakers__new-speaker-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            value={newSpeaker.first_name}
            onChange={handleInputChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={newSpeaker.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={newSpeaker.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="speaker_location"
            value={newSpeaker.speaker_location}
            onChange={handleInputChange}
            placeholder="Location"
            required
          />
          <input
            type="text"
            name="expertise"
            value={newSpeaker.expertise}
            onChange={handleInputChange}
            placeholder="Expertise"
          />
          {!isEditingSpeaker && (
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
            />
          )}
          <button type="submit">{isEditingSpeaker ? 'Update Speaker' : 'Add Speaker'}</button>
          <button type="button" onClick={() => setIsAddingNewSpeaker(false)}>Cancel</button>
        </form>
      )}

      <div className="manage-speakers__list">
        {speakers.map((speaker) => (
          <div key={speaker.speaker_id} className="manage-speakers__card">
            {speaker.image_path && (
              <img
                src={speaker.image_path}
                alt={`${speaker.first_name} ${speaker.last_name}`}
                className="manage-speakers__image"
              />
            )}
            <h3 className="manage-speakers__name">{`${speaker.first_name} ${speaker.last_name}`}</h3>
            <p className="manage-speakers__location">{speaker.speaker_location}</p>
            <p className="manage-speakers__expertise">{speaker.expertise || 'N/A'}</p>
            <p className="manage-speakers__email">{speaker.email}</p>
            <div className="manage-speakers__actions">
              <button onClick={() => startEditing(speaker)}>Edit</button>
              <button onClick={() => handleDelete(speaker.speaker_id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSpeakers;
