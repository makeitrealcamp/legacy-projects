import React from "react";
import Nav from "../components/Nav/index";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormRegisterAndLogin from "../components/FormRegisterAndLogin";
import { useDispatch } from "react-redux";
import { SetUserInfo } from "../store/UserInfo.Slice";
import { useState } from "react";
import { Ring } from "@uiball/loaders";

function InstructorSignup() {
  const dispatch = useDispatch();
  const [loader,setLoader] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoader(true)
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HEROKU_URL}/instructors`,
        data
      );

      if (res.data.data.token) {
        localStorage.setItem("token", res.data.data.token);
        console.log(res.data.data);
        dispatch(SetUserInfo(res.data.data));
        navigate("/");
      }
    } catch (err) {
      console.log(`error on signup: ${err}`);
    }
    setLoader(false)
  };
  return (
    <>
      <Nav />
      <div className="signup">
        <div className="signup-container">
          <h2 className="signup__title">Sign up and start teaching</h2>
          {loader ? (
            <div className="container-loader-signup-form">
              <Ring size={35} color="#231F20" />
            </div>
          ) : null}
          <FormRegisterAndLogin
            btn="Teacher Sign up"
            login={false}
            Submit={handleSubmit}
          />
          <div className="redirect-login__container">
            <span className="redirect-login">
              Already have an account?{" "}
              <Link to="/join/login">
                <strong>Log in</strong>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InstructorSignup;
