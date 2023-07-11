import Header from '../components/Header';
import CardHomeClientContainer from '../components/CardHomeClientContainer';
import '../styles/pages/ClientTrips.scss';
const ClientTrips = () => {
  return (
    <div>
      <Header></Header>
      <div className="clientTripContainer">
        <h1>mis viajes</h1>
        <CardHomeClientContainer></CardHomeClientContainer>
      </div>
    </div>
  );
};

export default ClientTrips;
