import React from 'react';

function TutorDescription({ tutor }) {
  return (
    <div className="tutor-profile__description-container">
      <h1 className="tutor-profile__title">About me</h1>
      <p className="tutor-profile__text">{tutor.description}</p>
    </div>
  );
}

export { TutorDescription };
