import "../styles/components/DropDownMenuHost.scss";
import { useNavigate } from "react-router";

const DropDownMenuHost = ({fun,setOpened}) => {
  const navigate = useNavigate()

  const firstText = [
    "Anuncio",
    "Reservaciones",
    "Crea un nuevo anuncio",
    "Historial de transacciones",
  ];

  const link = [
    "/hosting/listing",
    "/hosting/reservs",
    "/becomehost",
    "/hosting",
    "/hosting",
  ];

  const handleClick = (nav)=>{
    navigate(nav)
    setOpened((o) => !o)
    fun('5')
  }

  return (
    <div className="DropDownMenuHost">
      {firstText.map((item, index) => {
        return (
            <button onClick={()=>handleClick(link[index])} className='DropDownMenuHost__Link' key={index}>{item}</button>
          ) 
      })}
    </div>
  );
};

export default DropDownMenuHost;
