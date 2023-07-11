import "../styles/pages/HostingListingEditing.scss";
import { useParams } from "react-router";
import { useState, useEffect, useRef} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditingFotos from "../components/EditingFotos";
import useOnScreen from "../components/UseonScreen";

const basic = ["Fotos", "Precio", "Capacidad", "Cuartos"];

const HostingListingEditing = () => {
  const params = useParams();
  const [home, setHome] = useState({});
  const [loading, setLoading] = useState(true);
  const fotos = useRef();
  const visible = useOnScreen(fotos)

  const getHome = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_AIRBACK}/homes/${params.id}`
      );
      setHome(data.data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getHome();
    // eslint-disable-next-line
  }, []);

  const handleScroll = (ref) => {
    window.scroll({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="editing__main">
      <div className="editing__main__header">
        <h1>{loading?'Searching':`Villa para diversion y descanso en ${home.location.city}`}</h1>
        <Link to={`/rent/${params.id}`}>Vista previa del anuncio</Link>
      </div>
      <div className="editing__main__body">
        <div className="editing__main__body__sticky">
          <span>Detalles del anuncio</span>
          {basic.map((item, index) => {
            return (
              <button
                key={index}
                className={visible?  "sticky__selected__ok":"sticky__selected__no"}
                onClick={() => handleScroll(fotos.current)}
              >
                {item}
              </button>
            );
          })}
          <div>
          </div>
        </div>
        <div className="editing__main__body__info">
          <div ref={fotos} className="editing__main__body__info__foto">  
            <EditingFotos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingListingEditing;
