import React, { useEffect, useState } from 'react';
import { TutorPageHead } from '../components/TutorPageHead';
import { TutorDescription } from '../components/TutorDescription';
import { ReviewsContainer } from '../components/ReviewsContainer';
import '../assets/styles/pages/TutorViewProfile.scss';
import axios from '../utils/axios';
import Loader from '../components/Loader';
import history from '../utils/history';

function TutorDetailsPage(props) {
  const [tutor, setTutor] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = props.match.params.id;

  useEffect(() => {
    async function tutorDetailsData(id) {
      try {
        const tutorData = await axios.get(`/tutor/${id}`);
        const data = tutorData.data;
        const reviewData = tutorData.data.reviews;
        setTutor(data);
        setReviews(reviewData);
        setLoading(false);
      } catch (err) {
        history.replace('/home');
      }
    }
    tutorDetailsData(id);
  }, [id]);

  return (
    <>
      <div className="tutor-profile__body">
        {loading ? (
          <Loader />
        ) : (
          <>
            <TutorPageHead tutor={tutor} tutorId={id} />
            <TutorDescription tutor={tutor} />
            <ReviewsContainer reviews={reviews} />
          </>
        )}
      </div>
    </>
  );
}

export default TutorDetailsPage;
