import React from 'react';
import { Review } from './Review';

function ReviewsContainer({ reviews }) {
  return (
    <div className="tutor-profile__reviews-container">
      <h1 className="tutor-profile__title">Student feedback</h1>
      <div>
        {reviews.map((props) => {
          return (
            <Review
              key={props._id}
              comment={props.comment}
              rating={props.rating}
              studentName={props.student_id.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export { ReviewsContainer };
