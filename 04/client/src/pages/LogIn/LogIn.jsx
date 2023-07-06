import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import React from "react";
import Nav from "../../components/Nav/index";
import Footer from "../../components/Footer";
import image1 from "../../images/facebook.png";
import image2 from "../../images/buscar.png";
import image3 from "../../images/logotipo-de-apple.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import FormRegisterAndLogin from "../../components/FormRegisterAndLogin";
import { useDispatch } from "react-redux";
import { SetUserInfo } from "../../store/UserInfo.Slice";
import { Ring } from "@uiball/loaders";


const FormularioLogIn = () => {
  const dispatch = useDispatch();
  const [loader,setLoader] = useState(false)
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  useEffect(() => {
    document.title = "Log In | Udemy";
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (dataForm) => {
    setLoader(true)
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_HEROKU_URL}/users/login`,
        dataForm
      );
      if (data.data.token) {
        localStorage.setItem("token", data.data.token)
        dispatch(SetUserInfo(data.data))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
    setLoader(false)
  };

  return (
    <>
      <Nav />
      <div className="loginformAndButtons">
        <div className="head_loginbox">Log in to your Udemy account</div>
        <div className="container-padding-login">
          <button
            onClick={() => loginWithRedirect({ connection: "facebook" })}
            className="fb-button"
          >
            <img alt="" id="fblogo" src={image1}></img>
            <strong>Continue with Facebook</strong>
          </button>
          <button
            onClick={() => loginWithRedirect({ connection: "google-oauth2" })}
            className="google-button"
          >
            <img alt="" id="glogo" src={image2}></img>
            <strong>Continue with Google</strong>
          </button>
          <button
            onClick={() => loginWithRedirect({ connection: "apple" })}
            className="apple-button"
          >
            <img alt="" id="glogo" src={image3}></img>
            <strong>Continue with Apple</strong>
          </button>
          {loader ? (
            <div className="container-loader-login-form">
              <Ring size={35} color="#231F20" />
            </div>
          ) : null}
          <FormRegisterAndLogin
            login={true}
            btn="Log In"
            Submit={handleSubmit}
          />
          <p className="redirect-signUp">
            Don't have an account? <Link to="/join/signup">Sign up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FormularioLogIn;
