import React from 'react';
import axios from '../utils/axios';

import '../assets/styles/components/TutorCompleteTutorship.scss'

function TutorCancelTutorship({ swal, tutorshipId, setState }) {
  const handleClick = (e) => {
    const buttonId = e.target.id;
    if (buttonId === "cancel") {
      swal.close();
      return;
    }

    axios
      .post("/completeTutorship", {
        tutorship: tutorshipId,
        token: localStorage.getItem("token"),
      })
      .then(() => {
        const mySwal = swal.mixin({
          customClass: {
            confirmButton: "cancel-tutorship-button green",
            cancelButton: "cancel-tutorship-button red",
          },
          buttonsStyling: false,
        });

        mySwal
          .fire({
            icon: "success",
            html: (
              <h1 style={{ fontFamily: "open sans" }}>
                Tutorship completed successfully
              </h1>
            ),
            confirmButtonText: "OK",
          })
          .then(() =>
            setState((prevState) => ({
              ...prevState,
              renderSwitch: !prevState.renderSwitch,
            }))
          );
      });
  };

  return (
    <div className="tutorCancelTutorship-container">
      <h1 className="tutorCompleteTutorship-title">Are you sure you want to complete this tutorship?</h1>
      <h2>This action cannot be undone</h2>
      <div className="tutorCancelTutorship-buttons-container">
        <button onClick={handleClick} id="confirm" className="green">
          Yes, complete
        </button>
        <button onClick={handleClick} id="cancel" className="red">
          No, return
        </button>
      </div>
    </div>
  );
}

export default TutorCancelTutorship;
