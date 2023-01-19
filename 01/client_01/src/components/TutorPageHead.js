import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function TutorPageHead({ tutor, tutorId }) {
  const starNodes = [];
  const [price, setPrice] = useState(' ');
  const [priceDefined, setPriceDefined] = useState(true);

  useEffect(() => {
    if (tutor.price) {
      setPrice(tutor.price.toLocaleString());
    } else {
      setPrice(`Tutorship fee has not been defined`);
      setPriceDefined(false);
    }
  }, [tutor.price]);

  for (let i = 1; i <= tutor.rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} key={i} title="tutor-rating-star" />);
  }

  return (
    <main className="tutor-profile__profile-container">
      <img src={tutor.profile_photo} alt="tutor profile" className="tutor-profile__photo" />
      <div className="tutor-profile__profile-container-text">
        <h1 className="tutor-profile__title">{tutor.name}</h1>
        <h2 className="tutor-profile__subtitle">{tutor.profession}</h2>
        <h2 className="tutor-profile__subtitle">Area: {tutor.focus}</h2>
        <p className="tutor-profile__subtitle">{priceDefined ? `Tutorship Fee: COP ${price}` : price}</p>
        <div className="tutor-profile__stars">{starNodes}</div>
      </div>
      <div className="tutor-profile__schedule-container">
        <h2 className="tutor-profile__subtitle">Availability</h2>
        <h3 className="tutor-profile__availability">{tutor.schedule}</h3>
        <Link to={`/tutor/${tutorId}/schedule`} className="tutor-profile__schedule-button">
          Schedule Appointment
        </Link>
      </div>
    </main>
  );
}

export { TutorPageHead };
