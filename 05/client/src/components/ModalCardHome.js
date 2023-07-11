import "../styles/components/ModalCardHome.scss";
 
const ModalCardHome = ({
  name,
  date,
  img,
  huespedes,
  llegada,
  salida,
  codigo,
  price
}) => {

  const llegadaShow = new Date(llegada);
  const salidaShow = new Date(salida);
  const generatedShow = new Date(date);

  return (
    <div className="ModalCardHome">
      <h1>Detalles de la reservacion</h1>
      <hr></hr>
      <div className="ModalCardHome__row">
        <div className="ModalCardHome__row__img">
          <img src={img} alt="profile logo"></img>
        </div>
        <div className="ModalCardHome__column">
          <span className="ModalCardHome__column__bold">{name}</span>
          <span>{`${llegadaShow.toDateString()} - ${salidaShow.toDateString()}`}</span>
          <span>{`Huespedes: ${huespedes.adults}  ·  $${new Intl.NumberFormat('de-DE').format(price)} COP`}</span>
        </div>
      </div>
      <hr className="ModalCardHome__hr__middle"></hr>
      <h2>Mas detalles</h2>
      <div className="ModalCardHome__details">
        <span className="ModalCardHome__details__bold">Nombre</span>
        <span className="ModalCardHome__details__light">{name}</span>
        <span className="ModalCardHome__details__line"></span>
      </div>
      <div className="ModalCardHome__details">
        <span className="ModalCardHome__details__bold">Fecha reserva</span>
        <span className="ModalCardHome__details__light">{generatedShow.toDateString()}</span>
        <span className="ModalCardHome__details__line"></span>
      </div>
      <div className="ModalCardHome__details">
        <span className="ModalCardHome__details__bold">Fecha llegada</span>
        <span className="ModalCardHome__details__light">{llegadaShow.toDateString()}</span>
        <span className="ModalCardHome__details__line"></span>
      </div>
      <div className="ModalCardHome__details">
        <span className="ModalCardHome__details__bold">Fecha salida</span>
        <span className="ModalCardHome__details__light">{salidaShow.toDateString()}</span>
        <span className="ModalCardHome__details__line"></span>
      </div>
      <div className="ModalCardHome__details">
        <span className="ModalCardHome__details__bold">Codigo</span>
        <span className="ModalCardHome__details__light">{codigo}</span>
        <span className="ModalCardHome__details__line"></span>
      </div>
      <div className="ModalCardHome__details">
        <span className="ModalCardHome__details__bold">Huespedes</span>
        <span className="ModalCardHome__details__light">{huespedes.adults}</span>
        <span className="ModalCardHome__details__line"></span>
      </div>
    </div>
  );
};

export default ModalCardHome;
