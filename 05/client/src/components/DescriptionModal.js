import "../styles/components/airCoverModal.scss";

const DescriptionModal = ({ textDesc, setOpened }) => {
  const {text1, text2, text3} = textDesc
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
      <div className="descriptionContainer">
        <div className="descTitle">
          <h2>Acerca del espacio</h2>
        </div>
        <div className="descText">
          <span>{text1}</span>
        </div>
        <div className="descSubTitle">
          <h3>El alojamiento</h3>
        </div>
        <div className="descText1">
          <span>{text2}</span>
        </div>
        <div className="descSubTitle">
          <h3>Acceso para huéspedes</h3>
        </div>
        <div className="descText1">
          <span>{text3}</span>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
