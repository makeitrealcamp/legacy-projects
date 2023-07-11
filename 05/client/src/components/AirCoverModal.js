import "../styles/components/airCoverModal.scss";

const AirCoverModal = ({ setOpened }) => {
  return (
    <div className="modalContainer">
      <div className="headerSections">
        <div className="rentSection">
          <button className="closeBtn" onClick={() => setOpened(false)}>
            <svg
              className="closeSvg"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path d="m6 6 20 20"></path>
              <path d="m26 6-20 20"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="airCoverLogo"></div>
      <div className="airCoverDetails">
        <h2>
          <img
            className="airCoverImg"
            src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
            alt="AirCover"
          />
        </h2>
        <div className="airCoverText">
        AirCover es una protección completa que se incluye gratis en cada reservación.
        </div>
        <hr className="hr3" />
      </div>
      <div className="airCoverProtections">
        <div className="protection">
          <h3 className="protectionTitle">Garantía de protección de la reservación</h3>
          <div className="protectionText">
          En el improbable caso de que un anfitrión tenga que cancelar tu reservación en los 30 días previos a la llegada, te encontraremos un alojamiento similar o mejor, o te enviaremos un reembolso.
          </div>
        </div>
        <div className="protection">
          <h3 className="protectionTitle">Garantía de cambio de reservación</h3>
          <div className="protectionText">
          Si no puedes registrar la llegada en tu alojamiento y el anfitrión no logra resolver el problema, te encontraremos un alojamiento similar o mejor para la duración de tu estancia original, o te enviaremos un reembolso.
          </div>
        </div>
        <div className="protection">
          <h3 className="protectionTitle">Garantía de fidelidad al anuncio</h3>
          <div className="protectionText">
          Si durante tu estancia te das cuenta de que el alojamiento no coincide con lo que aparecía en el anuncio (p. ej.: si se daña el refrigerador y el anfitrión no puede arreglarlo o si el espacio tiene menos habitaciones que las que dice el anuncio), tendrás tres días para avisarnos. Una vez que lo hagas, buscaremos un alojamiento similar o mejor, o te enviaremos un reembolso.
          </div>
        </div>
        <div className="protection">
          <h3 className="protectionTitle">Línea de protección 24 horas</h3>
          <div className="protectionText">
          Si en algún momento te sientes en una situación insegura, tendrás acceso prioritario a agentes especializados en seguridad, sea la hora que sea.
          </div>
        </div>
      </div>
      <div className="coverHelpCenter">Encontrarás más información sobre qué protección te ofrece AirCover para tu reserva en nuestro <b><u>Centro de ayuda</u></b></div>
    </div>
  );
};

export default AirCoverModal;
