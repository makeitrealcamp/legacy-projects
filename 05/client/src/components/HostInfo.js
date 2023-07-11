import "../styles/components/hostInfo.scss";

const HostInfo = ({ userHost }) => {
  const toDate = new Date(userHost.createdAt);
  const date = toDate.toLocaleDateString("es-CO", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="hostInfoBox">
      <div className="hostInfoContainer">
        <div className="hostInfoFlex">
          <div className="profileImg">
            <img src={userHost.profileimg} alt="cargando"></img>
          </div>
          <div className="user">
            <div className="userName">
              <h3>{`Anfitrión: ${userHost.name}`}</h3>
            </div>
            <div className="userRegister">{`Se registró ${date}`}</div>
          </div>
        </div>
        <div className="hostInfoContact">
          <div className="contactTitle">
            <h3>Durante tu estancia</h3>
          </div>
          <div className="contactDesc">
            Puedes comunicarte conmigo en cualquier momento, tendrás a uno de
            los miembros de nuestro equipo a tu disposición en caso de que sea
            necesario.
          </div>
        </div>
      </div>
      <div className="payAdviceContainer">
        <div className="payAdviceIcon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/81/81566.png"
            alt="cargando"
          ></img>
        </div>
        <div className="payAdviceText">
          A fin de proteger tus pagos, te pedimos que nunca transfieras dinero
          ni te comuniques fuera de la página o la aplicación de Airbnb.
        </div>
      </div>
    </div>
  );
};

export default HostInfo;
