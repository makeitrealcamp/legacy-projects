import React from "react";
import Nav from "../components/Nav/index";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormRegisterAndLogin from "../components/FormRegisterAndLogin";
import { useDispatch } from "react-redux";
import { SetUserInfo } from "../store/UserInfo.Slice";
import { Ring } from "@uiball/loaders";
import { useState } from "react";

function SignUp() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoader(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HEROKU_URL}/users`,
        data
      );
      if (res.data.data.token) {
        dispatch(SetUserInfo(res.data.data));
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  return (
    <>
      <Nav />
      <div className="signup">
        <div className="signup-container">
          <h2 className="signup__title">Sign up and start learning</h2>
          {loader ? (
            <div className="container-loader-signup-form">
              <Ring size={35} color="#231F20" />
            </div>
          ) : null}
          <FormRegisterAndLogin
            login={false}
            btn="Sign up"
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

export default SignUp;
