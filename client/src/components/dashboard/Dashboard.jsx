import React, { useState } from 'react';
import './Dashboard.scss';

const initialSpeakers = [
  { id: 1, name: 'Carla Brown', location: 'California', image: '/IMG_2698_edited (8).webp' },
  { id: 2, name: 'Tiffany Caudill', location: 'Sacramento, California', image: '/IMG_2698_edited (4).webp' },
  { id: 3, name: 'Tamar Cohen', location: 'Richmond, BC', image: '/IMG_2698_edited (5).webp' },
  { id: 4, name: 'Albert Nerenberg', location: 'Kingston, Ontario', image: '/IMG_2698_edited.webp' },
  { id: 5, name: 'Pearl Wintonlow', location: 'Steinbach, Manitoba', image: '/IMG_2698_edited (7).webp' },
  { id: 6, name: 'Marin McCue', location: 'Calgary, Alberta', image: '/IMG_2698_edited (6).webp' },
  { id: 7, name: 'Dean Estrella', location: 'Calgary, Alberta', image: '/IMG_2698_edited (2).webp' },
  { id: 8, name: 'Rolande Kirouac', location: 'Winnipeg, Manitoba', image: '/IMG_2698_edited (3).webp' },
  { id: 9, name: 'Angelique Dougle', location: 'Medicine Hat, Alberta', image: '/IMG_2698_edited (1).webp' }
];

const ManageSpeakers = () => {
  const [speakers, setSpeakers] = useState(initialSpeakers);
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [newSpeaker, setNewSpeaker] = useState({ name: '', location: '', image: '' });
  const [isAddingNewSpeaker, setIsAddingNewSpeaker] = useState(false);

  const deleteSpeaker = (id) => {
    setSpeakers(speakers.filter(speaker => speaker.id !== id));
  };

  const startEditing = (speaker) => {
    setEditingSpeaker({ ...speaker });
  };

  const cancelEditing = () => {
    setEditingSpeaker(null);
  };

  const saveEditedSpeaker = () => {
    setSpeakers(speakers.map(speaker => 
      speaker.id === editingSpeaker.id ? editingSpeaker : speaker
    ));
    setEditingSpeaker(null);
  };

  const handleEditChange = (e) => {
    setEditingSpeaker({ ...editingSpeaker, [e.target.name]: e.target.value });
  };

  const handleNewSpeakerChange = (e) => {
    setNewSpeaker({ ...newSpeaker, [e.target.name]: e.target.value });
  };

  const addNewSpeaker = () => {
    const id = Math.max(...speakers.map(s => s.id)) + 1;
    setSpeakers([...speakers, { ...newSpeaker, id }]);
    setNewSpeaker({ name: '', location: '', image: '' });
    setIsAddingNewSpeaker(false);
  };

  return (
    <div className="manage-speakers">
      <h1 className="manage-speakers__heading">Manage Speakers</h1>
      <button className="manage-speakers__add-button" onClick={() => setIsAddingNewSpeaker(true)}>
        Add New Speaker
      </button>
      {isAddingNewSpeaker && (
        <div className="manage-speakers__new-speaker-form">
          <input
            type="text"
            name="name"
            value={newSpeaker.name}
            onChange={handleNewSpeakerChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="location"
            value={newSpeaker.location}
            onChange={handleNewSpeakerChange}
            placeholder="Location"
          />
          <input
            type="text"
            name="image"
            value={newSpeaker.image}
            onChange={handleNewSpeakerChange}
            placeholder="Image URL"
          />
          <button onClick={addNewSpeaker}>Add Speaker</button>
          <button onClick={() => setIsAddingNewSpeaker(false)}>Cancel</button>
        </div>
      )}
      <div className="manage-speakers__list">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="manage-speakers__card">
            <img src={speaker.image} alt={speaker.name} className="manage-speakers__image" />
            {editingSpeaker && editingSpeaker.id === speaker.id ? (
              <div className="manage-speakers__edit-form">
                <input
                  type="text"
                  name="name"
                  value={editingSpeaker.name}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="location"
                  value={editingSpeaker.location}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="image"
                  value={editingSpeaker.image}
                  onChange={handleEditChange}
                />
                <button onClick={saveEditedSpeaker}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <>
                <h3 className="manage-speakers__name">{speaker.name}</h3>
                <p className="manage-speakers__location">{speaker.location}</p>
                <div className="manage-speakers__actions">
                  <button onClick={() => startEditing(speaker)}>Edit</button>
                  <button onClick={() => deleteSpeaker(speaker.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSpeakers;