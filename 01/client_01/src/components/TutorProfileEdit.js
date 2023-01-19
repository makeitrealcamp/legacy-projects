import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import history from '../utils/history';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/pages/TutorEditProfile.scss';

function TutorProfilePage() {
  const globalUser = useSelector((state) => state.currentUser);
  const token = useSelector((state) => state.token);
  const [previewPhoto, setPreviewPhoto] = useState('');
  const [image, setImage] = useState('');
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    email: true,
    password: true,
    schedule: true,
    description: true,
    price: true,
  });
  const [previewData, setPreviewData] = useState({
    name: '',
    email: '',
    description: '',
    schedule: '',
    price: '',
    rating: '',
  });
  const [userData, setUserData] = useState({
    inputs: {
      name: '',
      email: '',
      password: '',
      description: '',
      schedule: '',
      price: '',
    },
    errors: {
      name: '',
      email: '',
      password: '',
      schedule: '',
      price: '',
    },
    isValid: { name: true, password: true, email: true, schedule: true, price: true, description: true },
    enableUpload: false,
  });
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
  const starNodes = [];
  for (let i = 1; i <= previewData.rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} key={i} title="tutor-rating-star" />);
  }

  useEffect(() => {
    axios.get(`/tutor/${globalUser._id}`).then((result) => {
      setPreviewData((state) => ({
        ...state,
        rating: result.data.rating || `You don't have any ratings yet`,
      }));
    });
    setPreviewData((state) => ({
      ...state,
      name: globalUser.name,
      email: globalUser.email,
      description: globalUser.description,
      schedule: globalUser.schedule,
      price: globalUser.price,
    }));
    setPreviewPhoto(globalUser.profile_photo);
  }, [globalUser]);

  function handleChange(e) {
    setUserData((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        [e.target.name]: e.target.value,
      },
    }));
  }

  function validateInput(e) {
    const input = e.target.name;
    const value = e.target.value;
    if (input === 'name') {
      const re = /^[a-zA-Z\s]*$/;
      if (value.length < 4) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: 'Name is too short',
          },
          isValid: { ...state.isValid, name: false },
          enableUpload: false,
        }));
      } else if (!re.test(String(e.target.value).toLowerCase())) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: 'Name must only contain letters',
          },
          isValid: { ...state.isValid, name: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: '',
          },
          isValid: { ...state.isValid, name: true },
          enableUpload: state.isValid.password && state.isValid.email && state.isValid.schedule && state.isValid.price,
        }));
      }
    }
    if (input === 'email') {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: 'Invalid email, please enter a valid email',
          },
          isValid: { ...state.isValid, email: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: '',
          },
          isValid: { ...state.isValid, email: true },
          enableUpload: state.isValid.name && state.isValid.password && state.isValid.schedule && state.isValid.price,
        }));
      }
    }
    if (input === 'password') {
      if (value.length < 4 || value.length === null) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            password: 'Password is too short',
          },
          isValid: { ...state.isValid, password: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            password: '',
          },
          isValid: { ...state.isValid, password: true },
          enableUpload: state.isValid.name && state.isValid.email && state.isValid.schedule && state.isValid.price,
        }));
      }
    }
    if (input === 'schedule') {
      if (!value.includes('from') && !value.includes('to')) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            schedule: 'Invalid format, please type from (day) to (day), from (hour) to (hour)',
          },
          isValid: { ...state.isValid, schedule: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            schedule: '',
          },
          isValid: { ...state.isValid, schedule: true },
          enableUpload: state.isValid.name && state.isValid.password && state.isValid.email && state.isValid.price,
        }));
      }
    }
    if (input === 'price') {
      if (value.length === 0) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            price: 'this field is mandatory',
          },
          isValid: { ...state.isValid, price: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            price: '',
          },
          isValid: { ...state.isValid, price: true },
          enableUpload: state.isValid.name && state.isValid.password && state.isValid.email && state.isValid.schedule,
        }));
      }
    }
    if (input === 'description') {
      setUserData((state) => ({
        ...state,
        enableUpload: true,
      }));
    }
  }

  const handleClick = (e) => {
    const buttonClass = e.currentTarget.className;
    if (buttonClass.match(/email/)) {
      setIsDisabled((prevState) => ({ ...prevState, email: !prevState.email }));
    } else if (buttonClass.match(/password/)) {
      setIsDisabled((prevState) => ({
        ...prevState,
        password: !prevState.password,
      }));
    } else if (buttonClass.match(/name/)) {
      setIsDisabled((prevState) => ({ ...prevState, name: !prevState.name }));
    } else if (buttonClass.match(/description/)) {
      setIsDisabled((prevState) => ({ ...prevState, description: !prevState.description }));
    } else if (buttonClass.match(/schedule/)) {
      setIsDisabled((prevState) => ({ ...prevState, schedule: !prevState.schedule }));
    } else if (buttonClass.match(/price/)) {
      setIsDisabled((prevState) => ({ ...prevState, price: !prevState.price }));
    }
  };

  function onChangeFile(e) {
    setImage(e.target.files[0]);
    setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
    setUserData((state) => ({
      ...state,
      enableUpload: true,
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    updateTutorProfile(userData.inputs, formData, token);
  };

  const updateTutorProfile = async (inputs, formData, token) => {
    try {
      const { data: url } = await axios.patch('/uploadProfileImage', formData);
      const response = await axios.patch('/update', {
        formData,
        inputs,
        url,
        token,
        type: 'tutor',
      });
      localStorage.setItem('token', response.data);
      swalStyled
        .fire({
          icon: 'success',
          title: 'Your data was updated successfully',
        })
        .then(() => {
          history.go(0);
        });
    } catch (error) {
      setUserData((state) => ({
        ...state,
        errors: {
          ...state.errors,
          email: 'Email is taken, please use a different email',
        },
      }));
    }
  };

  return (
    <>
      <div className="tutor-edit__photo-container">
        <img src={previewPhoto} className="tutor-edit__photo" alt="user" />
        <label htmlFor="upload" className="tutor-edit__button-photo">
          upload photo
        </label>
        <input type="file" id="upload" onChange={onChangeFile} hidden accept="image/png, image/jpeg" />
        <div className="tutor-edit__rating">
          <label>My Rating</label>
          {starNodes.length !== 0 ? <div className="tutor-edit__stars">{starNodes}</div> : <p>{previewData.rating}</p>}
        </div>
      </div>
      <form action="" className="tutor-edit__form" onSubmit={onSubmit}>
        <div className="tutor-edit__form-slot">
          <label>Name</label>
          <div className="tutor-edit__form-slot-container">
            <input
              onBlur={validateInput}
              type="text"
              name="name"
              defaultValue={previewData.name}
              onChange={handleChange}
              disabled={isDisabled.name}
            />
            <button onClick={handleClick} className="tutor-profile__credentials__name-input-button" type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className="tutor-edit__errors">{userData.errors.name}</span>
        </div>
        <div className="tutor-edit__form-slot">
          <label>Email</label>
          <div className="tutor-edit__form-slot-container">
            <input
              onBlur={validateInput}
              defaultValue={previewData.email}
              type="email"
              name="email"
              onChange={handleChange}
              disabled={isDisabled.email}
            />
            <button onClick={handleClick} className="tutor-profile__credentials__email-input-button" type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className="tutor-edit__errors">{userData.errors.email}</span>
        </div>
        <div className="tutor-edit__form-slot">
          <label>Password</label>
          <div className="tutor-edit__form-slot-container">
            <input
              onBlur={validateInput}
              defaultValue="12345"
              type="password"
              name="password"
              onChange={handleChange}
              disabled={isDisabled.password}
            />
            <button onClick={handleClick} className="tutor-profile__credentials__password-input-button" type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className="tutor-edit__errors">{userData.errors.password}</span>
        </div>
        <div className="tutor-edit__form-slot">
          <label>Tutorship Fee</label>
          <div className="tutor-edit__form-slot-container">
            <input
              defaultValue={previewData.price}
              onBlur={validateInput}
              type="number"
              name="price"
              onChange={handleChange}
              disabled={isDisabled.price}
            />
            <button onClick={handleClick} className="tutor-profile__credentials__price-input-button" type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className="tutor-edit__errors">{userData.errors.price}</span>
        </div>
        <div className="tutor-edit__form-slot">
          <label>Schedule</label>
          <div className="tutor-edit__form-slot-container">
            <input
              onBlur={validateInput}
              defaultValue={previewData.schedule}
              placeholder="please type your schedule, example from mondays to fridays, from 8:30am to 5:00pm"
              type="text"
              name="schedule"
              onChange={handleChange}
              disabled={isDisabled.schedule}
            />
            <button onClick={handleClick} className="tutor-profile__credentials__schedule-input-button" type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className="tutor-edit__errors">{userData.errors.schedule}</span>
        </div>
        <div className="tutor-edit__form-slot">
          <label>Description</label>
          <div className="tutor-edit__form-slot-container">
            <textarea
              id="form"
              name="description"
              onChange={handleChange}
              onBlur={validateInput}
              defaultValue={previewData.description}
              placeholder="Let our students know something about you"
              cols="30"
              rows="10"
              className="tutor-edit__form-description"
              disabled={isDisabled.description}
            ></textarea>
            <button
              onClick={handleClick}
              className="tutor-profile__credentials__description-input-button"
              type="button"
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
        </div>
        <div className="tutor-edit__button-container">
          <input
            type="submit"
            value="save changes"
            className={`tutor-edit__button-submit ${!userData.enableUpload && 'disabled'}`}
            disabled={!userData.enableUpload}
          />
        </div>
      </form>
    </>
  );
}

export default TutorProfilePage;
