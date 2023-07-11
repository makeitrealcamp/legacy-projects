import RentMap from "./RentMap";
import "../styles/components/rentLocation.scss";

const RentLocation = ({ randomNumber, location }) => {
  let textDesc = "";
  if (randomNumber === 1) {
    textDesc = {
      text1: `Hemos creado un espacio unico que te permitira vivir una
      experiencia única de inmersión en la naturaleza con excelente
      acceso vía asfaltada. armonía. Es una construcción única, una
      solución sustentable en armonía con la naturaleza. . Disfrutaras
      de conectividad excelente, 200 Megas de Velocidad vía fibra
      óptica. Es un espacio innovador que te invitara a descubrir el
      concepto de confort escencial de nuestra Tiny House con un paisaje
      inolvidable sobre la Cordillera de los Andes Colombianos...`,
      text2: `Ideal para aventureros, y personas con intencion de vivir de una experiencia única.`,
      text3: `Alquilaste toda la casa para ti. Se proporcionará un código único un día antes de la fecha de llegada.`,
    };
  } else if (randomNumber === 2) {
    textDesc = `Saltamontes esta ubicada en la vereda.
    Estamos rodeados de naturaleza, cultivos de flores ,huertas y de la autentica cultura.`;
  } else if (randomNumber === 3) {
    textDesc = `Santa Inés es un pequeño y pintoresco caserío a 15 minutos de Sasaima, cundinamarca. Tiene un clima templado y en la noche hace un poco menos frío que Bogotá.`;
  } else if (randomNumber === 4) {
    textDesc = `Ambiente natural, tranquilo y cercano a Sopó.
    Podemos organizar cabalgatas privadas, caminatas. Estamos cerca al parque natural Pionono donde puedes disfrutar de senderos y bellos paisajes ideales para observación de aves.`;
  } else {
    textDesc = `a 500 mts podras encontrar el rio, donde podras realizar picnic y darte un chapuzon. tambien podrás encontrar cafés rurales. Y en la avenida principal a 2.5 km podrás encontrar todo tipo de restaurantes`;
  }
  return (
    <div className="rentLocationContainer">
      <div className="rentLocationTitle">
        <h2>Dónde vas a estar</h2>
      </div>
      <RentMap location={location} />
      <div className="rentLocationInfo">
        <h3>{location.city}</h3>
        <div className="rentLocationDesc">
          <span>{textDesc}</span>
        </div>
      </div>
    </div>
  );
};

export default RentLocation;
