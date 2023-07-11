import '../styles/components/CardHomeContainer.scss';
import CardHomeClient from './CardHomeClient';
import axios from 'axios';
import { useState, useEffect } from 'react';

const CardHomeClientContainer = () => {
  const [reservations, setReservations] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const getReservations = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_AIRBACK}/user/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setReservations(data.data.reservations);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getReservations();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>loading</p>;
  }
  return (
    <div className="CardHomeContainer">
      {reservations.length === 0 ? (
        <h1>
          No se encontraron reservas, que esperar para programar tu primer
          viaje!
        </h1>
      ) : (
        reservations.map((item, index) => {
          return (
            <div key={item._id}>
              <CardHomeClient
                name={item.home.userId.name}
                date={item.createdAt}
                img={item.home.userId.profileimg}
                huespedes={item.guests}
                llegada={item.initialDdate}
                salida={item.finalDate}
                codigo={item._id}
                price={item.price}
                location={item.home.location.city}
                HomeId={item.home._id}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default CardHomeClientContainer;
