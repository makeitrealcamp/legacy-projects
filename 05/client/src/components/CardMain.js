import "../styles/components/CardMain.scss";
import CardCarousel from "../components/CardCarousel";
import { useNavigate } from "react-router-dom";

const CardMain = ({item}) => {
    const navigate = useNavigate()
    const {location} = item

    
  return (
    <div className="main__list__button">
      <div className="main__list__button__heart">
        <CardCarousel imagesCard={item.images} linkto={item._id} />
        <svg
          className="heart"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            fill: "rgba(0, 0, 0, 0.5)",
            height: "24px",
            width: "24px",
            stroke: "white",
            strokeWidth: "2",
            overflow: "visible",
          }}
        >
          <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
        </svg>
      </div>
      <button className="main__list__button__link" onClick={()=>navigate(`/rent/${item._id}`)}>
        <div className="main__list__button__qualy">
          <span className="bold">{location.city}</span>
          <div className="main__list__button__qualy__star">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: "12px",
                width: "12px",
                fill: "currentcolor",
              }}
            >
              <path
                d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="light">{item.totalScore}</span>
          </div>
        </div>
        <span className="light">{`${item.totalreviews} Reviews`}</span>
        <span className="light">{item.dates}</span>
        <span className="bold">
          {`$ ${new Intl.NumberFormat('de-DE').format(item.price)} COP`} <span className="nBold">noche</span>
        </span>
      </button>
    </div>
  );
};

export default CardMain;
