import "../styles/components/generalBeds.scss";
import BedCard from "./BedCard";

const GeneralBeds = () => {
  return (
    <div className="generalBeds">
      <div className="bedsText">
        <h2>Dónde vas a dormir</h2>
      </div>
      <div>
        <div className="bedsFlex">
          <BedCard bedroom={"Recamara 1"} bedDesc={"1 cama doble"} />
          <BedCard bedroom={"Recamara 2"} bedDesc={"3 cama sencilla"} />
          <BedCard bedroom={"Recamara 3"} bedDesc={"2 cama doble"} />
        </div>
      </div>
    </div>
  );
};
export default GeneralBeds;
