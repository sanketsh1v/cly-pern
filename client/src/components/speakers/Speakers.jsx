import React from 'react';
import './Speakers.scss';

const speakersData = [
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

const Speakers = () => {
  return (
    <div className="speakers">
      <h1 className="speakers__heading">Speakers</h1>
      <div className="speakers__list">
        {speakersData.map((speaker) => (
          <div key={speaker.id} className="speakers__card">
            <img src={speaker.image} alt={speaker.name} className="speakers__image" />
            <h3 className="speakers__name">{speaker.name}</h3>
            <p className="speakers__location">{speaker.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
