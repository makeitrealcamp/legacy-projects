import "../styles/components/footerRent.scss";
import DevInfo from "./DevInfo";

const FooterRent = () => {
  return (
    <div className="footerRentContainer">
      <div className="footerTitle">
        <h3>Desarrollado por:</h3>
      </div>
      <div className="footerFlex">
        <DevInfo
          profileImg={"https://avatars.githubusercontent.com/u/67343176?v=4"}
          name={"Ruben Castilla"}
          gitHub={"https://github.com/CastRome"}
          linkedIn={
            "https://www.linkedin.com/in/ruben-dario-castilla-romero-22559888/"
          }
        />
        <DevInfo
          profileImg={"https://avatars.githubusercontent.com/u/83352893?v=4"}
          name={"Diego Higuera"}
          gitHub={"https://github.com/diegohiguera9"}
          linkedIn={
            "https://www.linkedin.com/in/diego-ricardo-higuera-guerrero-a58782213/"
          }
        />
        <DevInfo
          profileImg={"https://avatars.githubusercontent.com/u/69739151?v=4"}
          name={"Jhon Vasquez"}
          gitHub={"https://github.com/Wintrhop"}
          linkedIn={"https://www.linkedin.com/in/jhon-vasquez-458b0b191/"}
        />
      </div>
    </div>
  );
};

export default FooterRent;
