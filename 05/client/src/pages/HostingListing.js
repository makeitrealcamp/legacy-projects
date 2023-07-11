import "../styles/components/HostingListing.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListingContainer from "../components/ListingContainer";

const HostingListing = () => {
  const [loading, setLoading] = useState(true);
  const [homes, setHomes] = useState("");
  const token = localStorage.getItem("token");

  const getHomes = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_AIRBACK}/homes/listings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHomes(data.data.homes);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {    
    getHomes();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="hostlistings">
      <div className="hostlistings__title">
        <h1>{`${homes.length} anuncios`}</h1>
        <Link to="/becomehost">+ Crea un anuncio</Link>
      </div>
      <div className="listingcontainer" style={{color:'grey', borderTop:'none'}}>
        <div className="listingcontainer__img">Anuncio</div>
        <div>Ubicacion</div>
        <div>Capacidad</div>
        <div>Cuartos</div>
        <div>Calificacion</div>
        <div>Precio</div>
      </div>
      {homes.length === 0 ? (
        <h1>No homes found</h1>
      ) : (
        homes.map((item,index) => {
          return (
            <>
              <ListingContainer
                key={index}
                img={item.images[0]}
                location={item.location.city}
                capacity={item.capacity}
                rooms={item.rooms}
                score={item.scorevalue}
                price={item.price}
                id={item._id}
              />
            </>
          );
        })
      )}
    </div>
  );
};

export default HostingListing;
