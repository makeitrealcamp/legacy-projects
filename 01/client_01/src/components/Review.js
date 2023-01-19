import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Review({ comment, rating, studentName }) {
  const starNodes = [];

  for (let i = 1; i <= rating; i++) {
    starNodes.push(
      <FontAwesomeIcon icon={faStar} key={i} title="review-rating-star" />,
    );
  }

  return (
    <div className="tutor-profile__review-container">
      <p className="tutor-profile__review-name">{studentName}</p>
      <div className="tutor-profile__review-stars">{starNodes}</div>
      <p className="tutor-profile__text">{comment}</p>
    </div>
  );
}

export { Review };
