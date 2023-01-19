import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import axios from '../utils/axios';
import history from '../utils/history';
import Swal from 'sweetalert2';

import '../assets/styles/pages/TutorsSchedule.scss';

function TutorsSchedule(props) {
  const student = useSelector((state) => state.currentUser);
  const swalStyled = Swal.mixin({
    customClass: {
      confirmButton: 'swal__confirm',
      cancelButton: 'swal__cancel',
      title: 'swal__title',
      container: 'swal__text',
      actions: 'swal__actions',
    },
    buttonsStyling: false,
  });
  const createDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth().toString().length < 2 ? `0${date.getMonth()}` : date.getMonth()}-${
      date.getDate().toString().length < 2 ? `0${date.getDate()}` : date.getDate()
    }`;
  };

  const [state, setState] = useState({
    tutor: {},
    loading: true,
    inputs: {
      subject: null,
      description: null,
      date: createDate(),
      time: null,
    },
    error: false,
  });

  useEffect(() => {
    async function getTutorData() {
      axios
        .get(`/tutor/${props.match.params.id}`)
        .then((query) => {
          setState((prevState) => ({ ...prevState, loading: false, tutor: query.data }));
        })
        .catch(() => {
          history.replace('/home');
        });
    }
    getTutorData();
  }, [props.match.params.id]);

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, inputs: { ...prevState.inputs, [e.target.id]: e.target.value } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, error: false }));
    const { subject, description, date, time } = state.inputs;
    if (subject && description && date && time) {
      const apponintment = {
        tutor: state.tutor,
        inputs: state.inputs,
        student: student,
      };

      axios
        .post('/sendAppointment', apponintment)
        .then((req, res) => {
          swalStyled
            .fire({
              icon: 'success',
              title: 'Tutorship request sent successfully!',
              text: `${state.tutor.name} will get in contact soon`,
            })
            .then(() => {
              history.replace('/home');
            });
        })
        .catch((error) => {
          swalStyled.fire({
            icon: 'error',
            title: 'Error sending your request',
            text: `${error}`,
          });
        });
    } else {
      setState((prevState) => ({ ...prevState, error: true }));
    }
  };

  return (
    <main className="tutorsschedule-main">
      {state.loading ? (
        <Loader />
      ) : (
        <>
          <h1>
            Ask {state.tutor.name} for a {state.tutor.focus} tutorship
          </h1>
          <img src={state.tutor.profile_photo} alt={state.tutor.name} />

          <form className="tutorsschedule-form">
            <label htmlFor="subject">Subject*</label>
            <input onChange={handleChange} id="subject" type="text" placeholder="" />

            <label htmlFor="description">Description*</label>
            <textarea
              onChange={handleChange}
              id="description"
              rows="20"
              type="text"
              placeholder="Give me a brief summary about the matter"
            />

            <label htmlFor="date">What day would be good for you?*</label>
            <input onChange={handleChange} value={createDate()} min={createDate()} id="date" type="date" />

            <label htmlFor="time">What time?*</label>
            <input
              onChange={handleChange}
              id="time"
              step="3600"
              defaultValue="00:00"
              min="06:00"
              max="23:00"
              type="time"
            />
            {state.error && <span>Please fill all the fields</span>}
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </main>
  );
}

export default TutorsSchedule;
