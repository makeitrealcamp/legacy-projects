import "../styles/components/ListingContainer.scss";
import { Link } from "react-router-dom";

const ListingContainer = ({ img, location, capacity, rooms, score, price,id,user }) => {
  return (
    <Link to={`/rent/${id}`} className="listingcontainer">
      <div className="listingcontainer__img">
        <div className="listingcontainer__img__cont">
          <img src={img} alt='imgdes'></img>
        </div>
        <span>{user?user:`Villa para descanso en ${location}`}</span>
      </div>
      <div>{`${location}`}</div>
      <div>{`${capacity}`}</div>
      <div>{`${rooms}`}</div>
      <div>{`${score}`}</div>
      <div>{`$ ${new Intl.NumberFormat('de-DE').format(price)} COP`}</div>
    </Link>
  );
};

export default ListingContainer;
