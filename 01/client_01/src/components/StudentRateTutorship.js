import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import axios from '../utils/axios';

function StudentRateTutorship({ swal, student, tutor, tutorship, setState }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hover, setHover] = useState(0);
  const [error, setError] = useState(false);

  const sendRatingController = () => {
    setError(false);
    if (review === '' || rating === 0) {
      setError(true);
      return;
    }
    axios
      .post('/rateTutorship', {
        rating,
        tutor,
        tutorship,
        student,
        review,
        token: localStorage.getItem('token'),
      })
      .then((result) => {
        const confirmSwal = swal.mixin({
          customClass: {
            confirmButton: "cancel-tutorship-button green"
          },
          buttonsStyling: false,
        });
        confirmSwal.fire({
          icon: 'success',
          html: <h1 style={{ fontFamily: 'open sans' }}>Tutorship rated successfully</h1>,
          showConfirmButton: true,
        });
        setState((prevState) => ({ ...prevState, renderSwitch: !prevState.renderSwitch }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="StudentRateTutorship-container">
      <div className="swal2-icon swal2-warning swal2-icon-show" style={{ display: 'flex' }}>
        <div className="swal2-icon-content">
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>
      <h1>Rate this tutorship</h1>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? 'on' : 'off'}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
        <h2>Leave a Review</h2>
        <textarea
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave a short review"
          className="StudentRateTutorship-textarea"
          cols="30"
          rows="5"
        ></textarea>
        {error && <span style={{ color: 'red' }}>All fields are required</span>}
      </div>
      <div className="StudentRateTutorship-buttons-container">
        <button onClick={sendRatingController} className="StudentRateTutorship-submit-button green">
          Submit
        </button>
        <button onClick={() => swal.close()} className="StudentRateTutorship-submit-button red">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default StudentRateTutorship;
