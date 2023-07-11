import "../styles/pages/rentElement.scss";
import HeaderName1 from "../components/HeaderComps";
import HeaderSections1 from "../components/HeaderSections1";
import ImgContainer1 from "../components/ImgContainer1";
import General from "../components/General";
import StickyContainer from "../components/StickyContainer";
import RentReviews from "../components/RentReviews";
import Header from "../components/Header";
import HeaderTouh from "../components/HeaderTouch";
import RentMap from "../components/RentMap";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import RentLocation from "../components/RentLocation";
import HostInfo from "../components/HostInfo";
import FooterRent from "../components/FooterRent";

const RentElement = () => {
  let params = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location, userId } = item;
  const [randomNumber,setRandomNumber]= useState(0)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AIRBACK}/homes/${params.id}`)
      .then((response) => {
        setItem(response.data.data);
        setRandomNumber(Math.floor(Math.random() * 5 + 1))
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <HeaderTouh />
      <main className="rentMain">
        <div className="rentElement">
          {loading ? (
            <p>Loading</p>
          ) : (
            <div className="rentElementContainer">
              <HeaderName1 children={location.city} />
              <HeaderSections1
                rating={item.totalScore}
                reviews={`${item.totalreviews} evaluaciones`}
                location={location.city}
              />
              <ImgContainer1 imgs={item.images} />
              <div className="rentInfoContainer">
                <General
                  profileImg={userId.profileimg}
                  host={userId.name}
                  guest={`${item.capacity} huespedes`}
                  bedrooms={`${item.rooms} habitaciones`}
                  beds={`${item.rooms} camas`}
                  baths={`${item.rooms} baños`}
                  cancel={"8 noviembre"}
                  randomNumber={randomNumber}
                  amenities={item.amenities}
                />
                <StickyContainer
                  item={item}
                  price={item.price}
                  rating={item.totalScore}
                  reviews={`${item.totalreviews} evaluaciones`}
                />
              </div>
              <hr className="hr1" />
              <RentReviews
                item={item}
                rating={item.totalScore}
                reviews={`${item.totalreviews} evaluaciones`}
                comments={item.comments}
              />
              <hr className="hr1" />
              <RentLocation randonNumber={randomNumber}location={location} />
              <hr className="hr1" />
              <HostInfo userHost={userId} />
              <FooterRent/>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default RentElement;

//si realizo un componente para ser container RentElement, no funciona asignarle propiedades en sass.
