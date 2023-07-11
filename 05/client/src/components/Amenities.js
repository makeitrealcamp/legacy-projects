import { Modal } from "@mantine/core";
import { useState } from "react";
import "../styles/components/amenities.scss";
import AmenitiesModal from "./AmenitiesModal";
import AmenitieTag from "./AmenitieTag";
import ButtonModal from "./ButtonModal";

const Amenities = ({ amenities }) => {
  const [opened, setOpened] = useState(false);
  const amenitiesLenght = amenities.length;
  return (
    <div className="amenities">
      <div className="amenitiesTxt">
        <h2>Lo que ofrece este lugar</h2>
      </div>
      <div className="amenitiesFlex">
        {amenities.map((item) => {
          return (
            <div className="ameniti" key={item}>
              <AmenitieTag amenitie={item} />
            </div>
          );
        })}
      </div>
      <div className="ameBtn">
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          overflow="outside"
          withCloseButton={false}
          size="45%"
        >
          <AmenitiesModal amenities={amenities} setOpened={setOpened} />
        </Modal>
        <ButtonModal
          texto={`Mostrar las ${amenitiesLenght} amenidades`}
          clase={"ameButton"}
          setClick={() => setOpened(true)}
        />
      </div>
    </div>
  );
};

export default Amenities;
