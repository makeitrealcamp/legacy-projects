import HostGradient from "../components/HostGradient";
import HomeHostFilter from "../components/HomeHostFilter";
import CardHomeContainer from "../components/CardHomeContainer";
import "../styles/pages/HomeHost.scss";
import { useJwt } from "react-jwt";
import { Navigate } from "react-router";

const HomeHost = () => {
  const { isExpired } = useJwt(localStorage.getItem("token"));

  if (isExpired) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="gradienthome">
        <HostGradient>Hoy</HostGradient>
      </div>
      <div className="h1_host">
        <h1 className="h1_host__h">Tus reservaciones</h1>
      </div>
      <HomeHostFilter />
      <CardHomeContainer />
    </div>
  );
};

export default HomeHost;
