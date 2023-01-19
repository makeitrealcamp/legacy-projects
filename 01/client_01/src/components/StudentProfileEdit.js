import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import history from '../utils/history';
import axios from '../utils/axios';
import Swal from 'sweetalert2';

const StudentProfileEdit = () => {
  const state = useSelector((state) => state.currentUser);
  const token = useSelector((state) => state.token);
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    email: true,
    password: true,
    submit: true,
  });
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    visible: false,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (inputs.name !== '' || inputs.email !== '' || inputs.password !== '') {
      setIsDisabled((prevState) => ({ ...prevState, submit: false }));
    } else {
      setIsDisabled((prevState) => ({ ...prevState, submit: true }));
    }
  }, [inputs, state]);
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
    }
  };

  const validateInputs = (name, email, password) => {
    if (name && (name.length < 4 || name.match(/[0-9]/))) {
      setErrors((prevState) => ({
        ...prevState,
        name: 'Invalid name, the name must be at least 4 characters in length and contain only letters',
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: undefined,
      }));
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || re.test(String(email).toLowerCase())) {
      setErrors((prevState) => ({
        ...prevState,
        email: undefined,
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: 'Invalid email, please enter a valid email and try again.',
      }));
      return false;
    }

    if (password && password.length < 4) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Invalid password, the password is too short',
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        password: undefined,
      }));
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    if (validateInputs(inputs.name, inputs.email, inputs.password)) {
      updateStudentProfile(inputs, formData, token);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async (e) => {
    setImage(e.target.files[0]);
    setIsDisabled((prevState) => ({ ...prevState, submit: false }));
  };

  const updateStudentProfile = async (inputs, formData, token) => {
    try {
      const { data: url } = await axios.patch('/uploadProfileImage', formData);
      const response = await axios.patch('/update', {
        formData,
        inputs,
        url,
        token,
        type: 'student',
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
      setErrors((prevState) => ({
        ...prevState,
        email: 'Email is taken, please use a different email',
      }));
    }
  };

  return (
    <>
      <section className="student-profile__photo-container">
        <img
          className="student-profile__photo"
          src={image ? URL.createObjectURL(image) : state.profile_photo}
          alt={state.name}
        />
        <label htmlFor="student-profile__photo__input" className="student-profile__photo__button">
          Upload photo
        </label>
        <input
          onChange={handleUpload}
          id="student-profile__photo__input"
          className="student-profile__photo__input"
          type="file"
          accept="image/png, image/jpeg"
        />
      </section>
      <section className="student-profile__credentials">
        <div className="student-profile__credentials__name-container">
          <label
            className="student-profile__credentials__name-label"
            htmlFor="student-profile__credentials__name-input"
          >
            Name
          </label>
          <div className="student-profile__credentials__name-input-container">
            <input
              onChange={handleChange}
              name="name"
              disabled={isDisabled.name}
              placeholder="name"
              id="student-profile__credentials__name-input"
              className="student-profile__credentials__name-input"
              defaultValue={state.name}
              type="name"
            />
            <button onClick={handleClick} className="student-profile__credentials__name-input-button" type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className="student-profile__error-message">{errors.name}</span>
        </div>

        <div className="student-profile__credentials__email-container">
          <label
            className="student-profile__credentials__email-label"
            htmlFor="student-profile__credentials__email-input"
          >
            Email
          </label>
          <div className="student-profile__credentials__email-input-container">
            <input
              onChange={handleChange}
              name="email"
              disabled={isDisabled.email}
              placeholder="Email"
              id="student-profile__credentials__email-input"
              className="student-profile__credentials__email-input"
              defaultValue={state.email}
              type="email"
            />
            <button onClick={handleClick} className="student-profile__credentials__email-input-button" type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className="student-profile__error-message">{errors.email}</span>
        </div>

        <div className="student-profile__credentials__password-container">
          <label
            className="student-profile__credentials__password-label"
            htmlFor="student-profile__credentials__password-input"
          >
            Password
          </label>
          <div className="student-profile__credentials__password-input-container">
            <input
              onChange={handleChange}
              name="password"
              disabled={isDisabled.password}
              placeholder="Password"
              id="student-profile__credentials__password-input"
              className="student-profile__credentials__password-input"
              defaultValue="**********"
              type="password"
            />
            <button onClick={handleClick} className="student-profile__credentials__password-input-button" type="button">
              <FontAwesomeIcon icon={faPencilAlt} />
            </button>
          </div>
          <span className="student-profile__error-message">{errors.password}</span>
        </div>
        <div className="student-profile__credentials__submit-button-container">
          <button
            disabled={isDisabled.submit}
            onClick={handleSubmit}
            className={`student-profile__submit-button ${isDisabled.submit && 'disabled'}`}
            type="submit"
          >
            Submit changes
          </button>
        </div>
      </section>
    </>
  );
};

export default StudentProfileEdit;
