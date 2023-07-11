import { Modal } from "@mantine/core";
import { useState } from "react";
import "../styles/components/imgContainer.scss";
import ImgModal from "./ImgModal";

const ImgContainer = ({ imgs }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="rentContainerImg">
      <div className="ContainerImgStyle">
        <div className="mainImg">
          <img
            src={imgs[0]}
            alt={"cargando"}
            id="rentImg1"
            className="rentImg"
          ></img>
        </div>
        <div className="secondaryImg">
          <img
            src={imgs[1]}
            alt={"cargando"}
            id="rentImg2"
            className="rentImg"
          ></img>
          <img
            src={imgs[2]}
            alt={"cargando"}
            id="rentImg3"
            className="rentImg"
          ></img>
          <img
            src={imgs[3]}
            alt={"cargando"}
            id="rentImg4"
            className="rentImg"
          ></img>
          <img
            src={imgs[4]}
            alt={"cargando"}
            id="rentImg5"
            className="rentImg"
          ></img>
          <div className="moreImg">
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              overflow="outside"
              withCloseButton={false}
              fullScreen
            >
              <ImgModal setOpened={setOpened} imgs={imgs} />
            </Modal>
            <button className="moreBtn" onClick={() => setOpened(true)}>
              <div className="morediv">
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="m3 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-10-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"></path>
                </svg>
                <div className="moretext">Mostrar Más</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgContainer;
