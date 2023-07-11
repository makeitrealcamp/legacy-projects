import "../styles/components/imgModal.scss";

const ImgModal = ({ setOpened, imgs }) => {
  return (
    <div className="modalContainer">
      <div className="headerSections">
        <div className="rentSection">
          <button className="descriptionBtn" onClick={() => setOpened(false)}>
            <svg
              className="descSvg"
              viewBox="0 0 18 18"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
            </svg>
          </button>
        </div>
        <div className="rentSection">
          <button className="hove">
            <svg
              className="nFill"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <g fill="none">
                <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"></path>
                <path d="M16 3v23V3z"></path>
                <path d="M6 13l9.293-9.293a1 1 0 0 1 1.414 0L26 13"></path>
              </g>
            </svg>

            <u>Compartir</u>
          </button>
          <button className="hove">
            <svg
              className="nFill"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>

            <u>Guardar</u>
          </button>
        </div>
      </div>
      <div className="imgsContainer">
                
        {imgs.map((item) => {
        return (
          <div className="houseImg" key={item}>
            
              <img src={item} alt={"cargando"}></img>
            
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default ImgModal;
