import "../styles/components/CardHomeContainer.scss";
import CardHomeHost from "./CardHomeHost";
import {  useEffect } from "react";
import { getPosts } from "../store/actions/HostFilter.action";
import { useDispatch, useSelector } from "react-redux";

const CardHomeContainer = () => {
  const dispatch = useDispatch()
  const reservations = useSelector(state => state.reservationReducer.show);
  const loading = useSelector(state => state.reservationReducer.loading);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getPosts(token));
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div className="CardHomeContainer">
      {reservations.length === 0 ? (
        <h1>No reservations found, get ready to be the greatest host</h1>
      ) : (
        reservations.map((item, index) => {
          return (
            <div key={index}>
              <CardHomeHost
                name={item.user.name}
                date={item.createdAt}
                img={item.user.profileimg}
                huespedes={item.guests}
                llegada={item.initialDdate}
                salida={item.finalDate}
                codigo={item._id}
                price={item.price}
                location={item.home.location.city}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default CardHomeContainer;
