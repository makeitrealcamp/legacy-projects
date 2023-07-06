import { useState } from "react";
import IsTeacherModal from "../Nav/IsTeacheModel";

function BecomeInstructorHome({ title, img, info, btn, imgMobile }) {
  const [modalTeacher, setModalTeacher] = useState(false);

  const handleModalTeacher = () => {
    setModalTeacher(!modalTeacher);
  };

  return (
    <div className="main-container-become-instructor">
        {
            modalTeacher 
            ?
            <IsTeacherModal
            handleIsTeacherModal={handleModalTeacher}
            />
            :
            null
        }
      <div className="container-img-become-instructor">
        <img src={img} alt={title} className="img-become-instructor" />
        <img
          src={imgMobile}
          alt={title}
          className="img-become-instructor-mobile"
        />
      </div>
      <div className="container-info-become-instructor">
        <h3 className="title-become-instructor">{title}</h3>
        <p className="info-become-instructor">{info}</p>
        <button onClick={handleModalTeacher} className="link-become-instructor">
          {btn}
        </button>
      </div>
    </div>
  );
}
export default BecomeInstructorHome;
