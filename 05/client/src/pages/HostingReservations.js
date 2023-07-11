import '../styles/pages/HostingReservations.scss'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import ListingContainer from '../components/ListingContainer';

const HostingReservations = ()=>{
    const reservations = useSelector(state => state.reservationReducer.all)
    const loading = useSelector(state => state.reservationReducer.loading)

    if (loading){
        return <p> Loading... </p>
    }

    return(
        <div className="hostlistings">
        <div className="hostlistings__title">
          <h1>{`${reservations.length} reservas`}</h1>
          <Link to="/becomehost">+ Crea un anuncio</Link>
        </div>
        <div className="listingcontainer" style={{color:'grey', borderTop:'none'}}>
          <div className="listingcontainer__img">Huesped</div>
          <div>Ubicacion</div>
          <div>Huespedes</div>
          <div>Fecha llegada</div>
          <div>Fecha salida</div>
          <div>Precio</div>
        </div>
        {reservations.length === 0 ? (
          <h1>No homes found</h1>
        ) : (
            reservations.map((item,index) => {
            return (
              <>
                <ListingContainer
                  key={index}
                  img={item.user.profileimg}
                  location={item.home.location.city}
                  capacity={item.guests.adults}
                  rooms={new Date(item.initialDdate).toDateString()}
                  score={new Date(item.finalDate).toDateString()}
                  price={item.price}
                  id={item._id}
                  user={item.user.name?item.user.name:''}
                />
              </>
            );
          })
        )}
      </div>
    )
}

export default HostingReservations