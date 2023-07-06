import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ResetUserInfo } from "../../store/UserInfo.Slice";

function HamburguerCoursesPerformance({ name }) {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.UserInfo);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(ResetUserInfo());
    navigate("/");
  };
  return (
    <>
      <div className="nav-opacity"></div>
      <div className="nav-hamburguer">
        <div className="container-nav-user-hamburguer">
          <div className="nav-user-hamburguer">
            <div className="nav-user nav-user-courses">
              {user.picture ? (
                <img src={user.picture} alt="user" loading="lazy" />
              ) : (
                user.fullName.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="info-user-nav">
            <div className="container-info-user-nav-name">
                  <p>Hi, </p>
                  <p className="info-user-nav-name">{`${user.fullName}`}</p>
                </div>
              <p>Welcome back</p>
            </div>
          </div>
          <div className="container-options-profile">
            <Link to="/">Home</Link>
            <Link to="/instructor/courses">Courses</Link>
            <p
              className="options-profile-performance"
              onClick={() => setIsVisible(true)}
            >
              Performance <MdKeyboardArrowRight />
            </p>
            <Link to="/">Account settings</Link>
            <p onClick={handleLogOut}>Log out</p>
          </div>
        </div>
        {isVisible ? (
          <div className="options-performance">
            <div
              className="btn-menu-options-peformance"
              onClick={() => setIsVisible(false)}
            >
              <MdKeyboardArrowLeft />
              Menu
            </div>
            <Link
              to="/instructor/performance/overview"
              className="links-options-peformance"
            >
              Overview
            </Link>
            <Link
              to="/instructor/performance/students"
              className="links-options-peformance"
            >
              Students
            </Link>
            <Link
              to="/instructor/performance/reviews"
              className="links-options-peformance"
            >
              Reviews
            </Link>
          </div>
        ) : null}
      </div>
      <div className="nav-close">
        <MdClose />
      </div>
    </>
  );
}
export default HamburguerCoursesPerformance;
