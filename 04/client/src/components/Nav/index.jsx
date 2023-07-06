import React, { useEffect } from "react"; /* index de nav */
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../images/logoNav.svg";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Options from "./options";
import { useState } from "react";
import Hamburguer from "./Hamburguer";
import LanguageModal from "../LanguageModal";
import IsTeacherModal from "./IsTeacheModel";
import { useSelector, useDispatch } from "react-redux";
import { ResetUserInfo } from "../../store/UserInfo.Slice";
import { useAuth0 } from "@auth0/auth0-react";

function Nav({ userAuth0 }) {
  const { isAuthenticated, logout } = useAuth0();
  const [isVisible, setIsvisible] = useState(false);
  const [searchMovil, setSearchMovil] = useState(false);
  const [mainHamburguer, setMainHamburguer] = useState(false);
  const [langModal, setLangModal] = useState(false);
  const [isTeacherModal, setIsTeacherModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(null);
  const itemShopCourses = useSelector((state) => state.ShopCourses.itemShop);
  const user = useSelector((state) => state.UserInfo);

  const handleHamburguerMenu = (value) => {
    setMainHamburguer(value);
    document.body.styles.overflow = "hidden"
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToLogin = () => {
    navigate("/join/login/");
  };

  const navigateToSingup = () => {
    navigate("/join/signup");
  };

  const navigateToInstructorSignup = () => {
    navigate("/instructor/signup");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const handleLanguageModal = () => {
    setLangModal((langModal) => !langModal);
  };
  const handleIsTeacherModal = () => {
    setIsTeacherModal((isTeacherModal) => !isTeacherModal);
  };

  const handleNavigateMyCourses = () => {
    navigate("/home/my-courses/learning");
  };

  const handleLogOut = () => {
    localStorage.clear();
    if (isAuthenticated) logout();
    dispatch(ResetUserInfo());
    navigate("/");
  };

  const handleNavToCourses = () => {
    navigate("/instructor/courses");
  };

  return (
    <div className="main-nav">
      {langModal ? (
        <LanguageModal handleLanguageModal={handleLanguageModal} />
      ) : null}
      {isTeacherModal ? (
        <IsTeacherModal handleIsTeacherModal={handleIsTeacherModal} />
      ) : null}

      <div
        className="nav-btn-hamburguer-main"
        onClick={() => {
          setMainHamburguer(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <FaBars />
      </div>
      {mainHamburguer ? (
        <Hamburguer
          handleIsTeacherModal={handleIsTeacherModal}
          handleNavToCourses={handleNavToCourses}
          name={user.fullName}
          funcLogOut={handleLogOut}
          user={user}
          handler={handleHamburguerMenu}
        />
      ) : null}
      <div onClick={navigateToHome}>
        <img src={logo} alt="logo-udemy" className="nav-logo-udemy" />
      </div>
      <nav
        className="nav-btn-categories"
        onMouseOver={() => setIsvisible(true)}
        onMouseLeave={() => setIsvisible(false)}
      >
        Categories {isVisible ? <Options /> : null}
      </nav>
      <form className="nav-form">
        <button type="button">
          <AiOutlineSearch />
        </button>
        <input type="search" placeholder="Search for anything" />
      </form>
      {user.isInstructor ? (
        <button className="nav-btn-instructor" onClick={handleNavToCourses}>
          Instructor
        </button>
      ) : (
        <button
          className="nav-btn-tech"
          onClick={
            user.email
              ? () => setIsTeacherModal(true)
              : navigateToInstructorSignup
          }
        >
          Teach on Udemy
        </button>
      )}
      <button
        onClick={handleNavigateMyCourses}
        className={user.email ? "nav-btn-learning" : "displayNone"}
      >
        My learning
      </button>
      <button className={user.email ? "nav-btn-favorites" : "displayNone"}>
        <AiOutlineHeart />
      </button>
      {searchMovil ? (
        <div className="div-search-movil">
          <form>
            <button>
              <AiOutlineSearch />
            </button>
            <input type="search" placeholder="Search for anything" />
            <button
              type="button"
              onClick={() => {
                document.body.style = null;
                handleHamburguerMenu(false);
              }}
            >
              <MdClose />
            </button>
          </form>
        </div>
      ) : null}
      <button
        className="nav-btn-search-movil"
        onClick={() => {
          document.body.style.overflow = "hidden";
          setSearchMovil(true);
        }}
      >
        <AiOutlineSearch />
      </button>
      <button
        className="nav-btn-shopping"
        onClick={user.email ? navigateToCart : navigateToLogin}
      >
        <span className="nav-btn-shopping-num">{itemShopCourses.length}</span>
        <AiOutlineShoppingCart />
      </button>

      <div className={user.email ? "displayNone" : "container-btns"}>
        <button className="nav-login" onClick={navigateToLogin}>
          Log in
        </button>
        <button className="nav-sing-up" onClick={navigateToSingup}>
          Sign up
        </button>
        <button className="nav-btn-languages" onClick={handleLanguageModal}>
          <BsGlobe />
        </button>
      </div>

      <div className={user.fullName ? "nav-user" : "displayNone"}>
        {!isAuthenticated && user.picture ? (
          <img src={user.picture} alt="user" loading="lazy" />
        ) : (
          user.fullName.substring(0, 2).toUpperCase()
        )}
        <div className="nav-options-user">
          <span></span>
          <div className="nav-options">
            <Link to="/cart">
              <p>My Cart</p>
            </Link>
            {user.isInstructor ? (
              <p className="/cart" onClick={handleNavToCourses}>
                Instructor
              </p>
            ) : (
              <p
                className="/cart"
                onClick={
                  user.email
                    ? () => setIsTeacherModal(true)
                    : navigateToInstructorSignup
                }
              >
                Teach on Udemy
              </p>
            )}
            <Link to="./">
              <p>Account Settings</p>
            </Link>
            <p className="btn-log-out" onClick={handleLogOut}>
              Log Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
