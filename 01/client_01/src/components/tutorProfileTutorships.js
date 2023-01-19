import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "./Loader";
import TutorCancelTutorship from "./tutorCancelTutorship.js";
import TutorCompleteTutorship from "./TutorCompleteTutorship";

import "../assets/styles/components/tutorProfileTutorships.scss";
import { format } from "date-fns";
import { utcToZonedTime } from 'date-fns-tz';

function TutorProfileTutorships() {
  const id = useSelector((state) => state.currentUser._id);
  const [state, setState] = useState({
    tutorships: [],
    loading: false,
    renderSwitch: false,
    getStudents: false,
  });

  const handleClick = async (data, e) => {
    const button = e.target.innerText;
    const mySwal = withReactContent(Swal);
    const buttons = {
      Cancel: {
        component: (
          <TutorCancelTutorship
            swal={mySwal}
            tutorshipId={data.tutorshipId}
            setState={setState}
          />
        ),
      },
      Complete: {
        component: (
          <TutorCompleteTutorship
            swal={mySwal}
            tutorshipId={data.tutorshipId}
            setState={setState}
          />
        ),
      },
    };

    const action = buttons[button];

    await mySwal.fire({
      html: action.component,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    const getTutorships = async () => {
      const { data } = await axios.get(`/tutorships/${id}`);
      setState((prevState) => ({
        ...prevState,
        loading: true,
        tutorships: data,
      }));
    };

    getTutorships();
  }, [id, state.renderSwitch]);

  return (
    <div className="tutor__tutorships-container">
      {!state.loading ? (
        <Loader />
      ) : state.tutorships.length === 0 ? (
        <p className="tutor__tutorships__title">
          You don't have any pending tutorships
        </p>
      ) : (
        state.tutorships.map((tutorship, i) => {
          const { name, focus, email } = tutorship.tutor_id;
          const { status, _id: id } = tutorship;
          const studentName = tutorship.student_id.name;
          const studentPhoto = tutorship.student_id.profile_photo;
          const dateObject = new Date(tutorship.date);
          const zonedDate = utcToZonedTime(dateObject, 'America/Argentina');
          const date = format(zonedDate, 'dd/MM/yyyy');
          const time = format(zonedDate, 'K:mm a');

          return (
            <div key={id} className="tutor__tutorship-container">
              <div className="tutor__tutorship__image-container">
                <img
                  src={studentPhoto}
                  alt={name}
                  className="tutor__tutorship__image"
                />
              </div>
              <div className="tutor__tutorship__description-container">
                <h2 className="tutor__tutorship__description-title">
                  {focus} tutorship with {studentName}
                </h2>
                <p className="tutor__tutorship__date">
                  Tutorship scheduled for <strong>{date}</strong>{" "}
                  at{" "}
                  <strong>
                    {time}
                  </strong>
                </p>
                <div className="tutor__tutorship__status-and-buttons-container">
                  <div className="tutor__tutorship__status-container">
                    <span>STATUS: {status}</span>
                  </div>
                  <div className="tutor__tutorship__buttons-container">
                    {status === "pending" && (
                      <button
                        onClick={(e) =>
                          handleClick(
                            { tutor: tutorship.tutor_id._id, tutorshipId: id },
                            e
                          )
                        }
                        className="tutor__tutorship__buttons__cancel-button"
                      >
                        Cancel
                      </button>
                    )}
                    {status === "accepted" && (
                      <>
                        <a
                          href={`mailto:${email}`}
                          className="tutor__tutorship__buttons__contact-button"
                        >
                          Contact
                        </a>
                        <button
                          onClick={(e) =>
                            handleClick(
                              {
                                tutor: tutorship.tutor_id._id,
                                tutorshipId: id,
                              },
                              e
                            )
                          }
                          className="tutor__tutorship__buttons__complete-button"
                        >
                          Complete
                        </button>
                      </>
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

export default TutorProfileTutorships;
