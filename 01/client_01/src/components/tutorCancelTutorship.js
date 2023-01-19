import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from '../utils/axios';

function TutorCancelTutorship({ swal, tutorshipId, setState }) {
  const handleClick = (e) => {
    const buttonId = e.target.id;
    if (buttonId === "cancel") {
      swal.close();
      return;
    }

    axios
      .post("/cancelTutorship", {
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
                Tutorship cancelled successfully
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
      <div className="swal2-icon swal2-danger swal2-icon-show" style={{ display: 'flex' }}>
        <div className="swal2-icon-content">
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
      <h1>Are you sure you want to cancel this tutorship?</h1>
      <h2>This action cannot be undone</h2>
      <div className="tutorCancelTutorship-buttons-container">
        <button onClick={handleClick} id="confirm" className="green">
          Yes, cancel tutorship
        </button>
        <button onClick={handleClick} id="cancel" className="red">
          No, return
        </button>
      </div>
    </div>
  );
}

export default TutorCancelTutorship;
