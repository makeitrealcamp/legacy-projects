import axios from "axios";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../components/ModalLogin";
import "../styles/pages/ConfirmationPay.scss";

const ConfirmationPay = () => {
  const navigate = useNavigate();
  const reserve = JSON.parse(localStorage.getItem("reserve"));
  const city = localStorage.getItem("location");
  const { date, guests, price } = reserve;
  let date1 = new Date(date[0])
  let date2 = new Date(date[1])
  const nights = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
  
  const token = localStorage.getItem("token");
  const { isExpired } = useJwt(token);
  const [expired, setExpired] = useState(true);
  console.log('reserva antes del click',reserve)
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log('reserva despues del click',reserve)
      const res = await axios.post(
        `${process.env.REACT_APP_AIRBACK}/reservations/create`,
        reserve,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('reserve despues del axios', reserve)
        localStorage.removeItem('reserve')
        localStorage.removeItem('location')
        console.log('res', res.data.data)
        navigate(`/trips`)
    } catch (err) {
      alert("Something went wrong, please review your information");
      console.log(err.toJSON());
    }
  };

  useEffect(() => {
    setExpired(isExpired);
  }, [expired]);
  return (
    <div className="confirmationContainer">
      <div className="headerSections">
        <div className="rentSection">
          <button type="button" className="descriptionBtn" onClick={() => navigate(-1)}>
            <svg
              className="descSvg"
              viewBox="0 0 18 18"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="modalReserveContainer">
        {expired ? (
          <ModalLogin setExpired={setExpired} />
        ) : (
          <div  className="reserveContainer">
            <div className="title">
              <h1>Falta poco para Reservar</h1>
            </div>
            <div className="subTitle">
              <h2>Tu viaje</h2>
            </div>
            <div className="dates">
              <div className="flexContainer">
                <span>Fechas</span>
                <span>{`${nights} noches`}</span>
              </div>

              <div className="flexContainer">
                <span>{`${date1.toDateString()}`}</span>
                <span>a</span>
                <span>{`${date2.toDateString()}`}</span>
              </div>
            </div>

            <div className="guests flexContainer">
              <span>Huespedes</span>
              <div className="guestsFlex">
                <span>{`${guests.adults + guests.childs}`}</span>
              </div>
            </div>

            <div className="">
              <div className="home flexContainer">
                <span>Lugar</span>
                <div className="homeName">
                  <span>{`${city}`}</span>
                </div>
              </div>
            </div>

            <div className="reserver">
              <div className="reserve">
                <button type="button" className={"reserveBtn"} onClick={handleSubmit}>
                  <span className="reserveIt">reservar</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPay;
