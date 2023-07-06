import { useDispatch, useSelector } from "react-redux";
import ChangeIsInstructor from "./ChangeIsInstructor";
import { useNavigate } from "react-router-dom";
import { changeIsInstructor } from "../../store/UserInfo.Slice";

function IsTeacherModal({ handleIsTeacherModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickTeachOnUdemy = () => {
    ChangeIsInstructor();
    dispatch(changeIsInstructor());
    navigate("/instructor/courses");
  };

  const handleMaybeLater = () => {
    handleIsTeacherModal();
  };

  return (
    <>
      <div onClick={handleMaybeLater} className="opacity-manage"></div>
      <div className="main-container-isteacher-modal">
        <h5 className="title-class-edit">
          Do you want to become and instructor?
        </h5>
        <div className="isteacher-modal-butn-container">
          <button
            className="isteacher-modal-btn-yes"
            onClick={handleClickTeachOnUdemy}
            type="button"
          >
            Yes
          </button>
          <button
            className="isteacher-modal-btn-maybelater"
            onClick={handleMaybeLater}
            type="button"
          >
            Maybe later
          </button>
        </div>
      </div>
    </>
  );
}
export default IsTeacherModal;
