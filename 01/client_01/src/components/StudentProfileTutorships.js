import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import history from '../utils/history';
import StudentCancelTutorship from './StudentCancelTutorship';
import StudentRateTutorship from './StudentRateTutorship';
import Loader from './Loader';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import '../assets/styles/components/StudentProfileTutorships.scss';

function StudentProfileTutorships() {
  const id = useSelector((state) => state.currentUser._id);
  const [state, setState] = useState({
    tutorships: [],
    loading: true,
  });

  useEffect(() => {
    const getTutorships = async () => {
      const { data } = await axios.get(`/tutorships/${id}`);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        tutorships: data,
        renderSwitch: false,
      }));
    };
    getTutorships();
  }, [id, state.renderSwitch]);

  const handleClick = async (data, e) => {
    const button = e.target.innerText;
    const mySwal = withReactContent(Swal);
    const buttons = {
      Cancel: {
        component: <StudentCancelTutorship swal={mySwal} tutorshipId={data.tutorshipId} setState={setState} />,
        confirm: 'Yes, cancel',
        cancel: 'No, return',
      },
      Rate: {
        component: (
          <StudentRateTutorship
            swal={mySwal}
            student={id}
            tutor={data.tutor}
            tutorship={data.tutorshipId}
            setState={setState}
          />
        ),
        confirm: false,
        cancel: false,
      },
    };
    const action = buttons[button];

    await mySwal.fire({
      html: action.component,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  function handlePayment(data, e) {
    e.preventDefault();
    history.push(`/checkout/${data.tutorshipId}`, {
      state: { tutorship_id: data.tutorshipId, tutorship_price: data.tutorshipPrice },
    });
  }

  return (
    <div className="student__tutorships-container">
      {state.loading ? (
        <Loader />
      ) : state.tutorships.length === 0 ? (
        <p className="student__tutorships__title">You don't have any pending tutorships</p>
      ) : (
        state.tutorships.map((tutorship) => {
          const { name, focus, profile_photo, email } = tutorship.tutor_id;
          const { status, _id: id, isRated } = tutorship;
          const dateObject = new Date(tutorship.date);
          const zonedDate = utcToZonedTime(dateObject, 'America/Argentina');
          const date = format(zonedDate, 'dd/MM/yyyy');
          const time = format(zonedDate, 'K:mm a');
          return (
            <div key={id} className="student__tutorship-container">
              <div className="student__tutorship__image-container">
                <img src={profile_photo} alt={name} className="student__tutorship__image" />
              </div>
              <div className="student__tutorship__description-container">
                <h2 className="student__tutorship__description-title">
                  {focus} tutorship with {name}
                </h2>
                <p className="student__tutorship__date">
                  Tutorship scheduled for <strong>{date}</strong> at{' '}
                  <strong>{time}</strong>
                </p>
                <div className="student__tutorship__status-and-buttons-container">
                  <div className="student__tutorship__status-container">
                    <span>STATUS: {status}</span>
                  </div>
                  <div className="student__tutorship__buttons-container">
                    {status === 'pending' && (
                      <>
                        <button
                          onClick={(e) =>
                            handlePayment({ tutorshipPrice: tutorship.tutor_id.price, tutorshipId: id }, e)
                          }
                          className="student__tutorship__buttons__pay-button"
                        >
                          Pay
                        </button>
                        <button
                          onClick={(e) => handleClick({ tutor: tutorship.tutor_id._id, tutorshipId: id }, e)}
                          className="student__tutorship__buttons__cancel-button"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {status === 'accepted' && (
                      <a href={`mailto:${email}`} className="student__tutorship__buttons__contact-button">
                        Contact
                      </a>
                    )}
                    {status === 'completed' && !isRated && (
                      <button
                        onClick={(e) => handleClick({ tutor: tutorship.tutor_id._id, tutorshipId: id }, e)}
                        className="student__tutorship__buttons__rate-button"
                      >
                        Rate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default StudentProfileTutorships;
