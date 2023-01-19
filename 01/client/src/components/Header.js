import React, { useState, useRef, useEffect } from 'react';
import Logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/components/Header.scss';

import { useDispatch, useSelector } from 'react-redux';
import logout from '../actions/logout';
import toggleProfileTooltip from '../actions/toggleProfileTooltip';
import { AUTHORIZED } from '../actions/constants';
import history from '../utils/history';

function Header() {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    searchInput: '',
    isSearchCollapsed: true,
    isMenuCollapsed: true,
  });
  const desktopInput = useRef();
  const mobileInput = useRef();
  const signingOut = useRef(false);

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, searchInput: e.target.value }));
  };

  const toggleSearchCollapse = async () => {
    if (!state.isMenuCollapsed)
      setState((prevState) => ({
        ...prevState,
        isMenuCollapsed: !state.isMenuCollapsed,
      }));
    setState((prevState) => ({
      ...prevState,
      isSearchCollapsed: !state.isSearchCollapsed,
    }));
    setTimeout(() => {
      state.isSearchCollapsed && mobileInput.current.focus();
    }, 100);
  };

  const toggleMenuCollapse = () => {
    if (!state.isSearchCollapsed)
      setState((prevState) => ({
        ...prevState,
        isSearchCollapsed: !prevState.isSearchCollapsed,
      }));
    setState((prevState) => ({
      ...prevState,
      isMenuCollapsed: !prevState.isMenuCollapsed,
    }));
  };

  const profileTooltipCollapse = () => {
    setTimeout(() => {
      !signingOut.current && dispatch(toggleProfileTooltip());
    }, 100);
  };

  const SignOut = () => {
    signingOut.current = true;
    setState((prevState) => ({
      ...prevState,
      isMenuCollapsed: true,
    }));
  };
  useEffect(() => {
    if (signingOut.current) {
      dispatch(toggleProfileTooltip());
      setTimeout(() => {
        signingOut.current = false;
        dispatch(logout());
        history.push('/');
      }, 200);
    }
  }, [state, dispatch]);

  const search = (e) => {
    if (state.searchInput.length > 0) {
      desktopInput.current.value = '';
      mobileInput.current.value = '';
      !state.isSearchCollapsed && setState((prevState) => ({ ...prevState, isSearchCollapsed: true }));

      history.push({
        pathname: `/search/?query=${state.searchInput}&page=1`,
        state: state.searchInput,
      });
    }
  };
  return (
    <header className="header">
      <Link
        data-testid="logo-image"
        to={
          globalState.auth_status === AUTHORIZED && globalState.currentUser.type === 'student'
            ? '/home'
            : globalState.currentUser.type === 'tutor'
            ? '/profile/tutorships'
            : '/'
        }
      >
        <img className="header__logo" src={Logo} alt="Logo" />
      </Link>
      {globalState.currentUser.type === 'student' && (
        <div className="header__search-container">
          <input
            onChange={handleChange}
            className="search-container__input"
            type="text"
            placeholder="Search"
            onKeyDown={(e) => e.code === 'Enter' && search()}
            ref={desktopInput}
          />

          <div className="search-container__icon-container" onClick={search}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      )}

      <div className="mobile-nav-buttons-container">
        {globalState.currentUser.type === 'student' && (
          <FontAwesomeIcon onClick={toggleSearchCollapse} icon={faSearch} />
        )}
        <FontAwesomeIcon onClick={toggleMenuCollapse} icon={faBars} />
      </div>

      <div className={`mobile-search-input ${!state.isSearchCollapsed && 'active'}`}>
        <input
          onChange={handleChange}
          className="search-container__input"
          type="text"
          placeholder="Search"
          onKeyDown={(e) => e.code === 'Enter' && search()}
          ref={mobileInput}
        />
        <div className="search-container__icon-container" onClick={search}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      <div className={`mobile-menu ${!state.isMenuCollapsed && 'active'}`}>
        {!!globalState.token ? (
          <>
            <div className="mobile-menu__profile-photo-container">
              <img className="header__profile-photo" src={globalState.currentUser.profile_photo} alt="Profile" />
              <span className="header__profile-name">{globalState.currentUser.name}</span>
            </div>
            <div className="mobile-menu__buttons">
              <Link to="/profile/edit" className="mobile-menu__profile-button" onClick={toggleMenuCollapse}>
                Profile
              </Link>
              <div onClick={SignOut} className="mobile-menu__signout-button">
                Sign out
              </div>
            </div>
          </>
        ) : (
          <div className="mobile__buttons-container">
            <Link to="/login" onClick={toggleMenuCollapse} className="button-container__signin-button" type="button">
              Sign in
            </Link>
            <Link
              to="/register"
              onClick={toggleMenuCollapse}
              className="button-container__register-button"
              type="button"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {!!globalState.token ? (
        <div className="header__profile-photo-container">
          <img
            onClick={profileTooltipCollapse}
            onBlur={() => {
              setTimeout(() => {
                !globalState.isProfileTooltipCollapsed && profileTooltipCollapse();
              }, 100);
            }}
            className="header__profile-photo"
            src={globalState.currentUser.profile_photo}
            alt="Profile"
            tabIndex="1"
          />
          <div className={`header__profile-tooltip ${!globalState.isProfileTooltipCollapsed && 'active'}`}>
            <h3 className="profile-tooltip__name">{globalState.currentUser.name}</h3>
            <Link to="/profile/edit" className="profile-tooltip__profile">
              Profile
            </Link>
            <div data-testid="sign-out-button" onClick={SignOut} className="profile-tooltip__signout">
              Sign out
            </div>
          </div>
        </div>
      ) : (
        <div className="header__buttons-container">
          <Link to="/login" className="button-container__signin-button" type="button" data-testid="sign-in-button">
            Sign in
          </Link>
          <Link
            to="/register"
            className="button-container__register-button"
            type="button"
            data-testid="register-button"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
