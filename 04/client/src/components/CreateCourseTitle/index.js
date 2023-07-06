import { useState } from "react";
import { createCourse } from "../../apis/createCourse";
import { Ring } from "@uiball/loaders";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NewCourse } from "../../store/UserInfo.Slice";

function CreateCourseTitle({ visible, handle }) {
  const [length, setLength] = useState(60);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [failPetition, setFailPetition] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateCourse = async () => {
    if (value.length === 0 || !/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]+$/.test(value)) {
      setError(true);
    } else {
      setLoader(true);
      const res = await createCourse({ title: value });
      setLoader(false);
      if (res === false) {
        setFailPetition(true);
        setTimeout(() => {
          setFailPetition(false);
        }, [6000]);
      } else {
        dispatch(
          NewCourse({ title: res.data.data.title, _id: res.data.data._id })
        );
        handle();
        navigate(`/instructor/courses/${res.data.data._id}/manage`);
      }
    }
  };

  return (
    <div
      className={`${"main-container-create-course"} ${
        visible ? "main-container-create-course-visible" : null
      }`}
    >
      <div
        onClick={() => {
          setValue("");
          handle();
        }}
        className="main-container-opacity-create-course-title"
      ></div>
      <div className="container-create-course-title">
        {loader ? (
          <div className="container-loader-createCourse-title">
            <Ring size={35} color="#231F20" />
          </div>
        ) : null}
        <h2 className="title-create-course-title">
          How about a working title?
        </h2>
        <p className="info-create-course-title">
          It's ok if you can't think of a good title now. You can change it
          later.
        </p>
        <label className="container-input-create-course-title" htmlFor="title">
          <input
            value={value}
            maxLength={60}
            onChange={(e) => {
              if (length !== 0) {
                setValue(e.target.value);
              }
              if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 ]+$/.test(e.target.value)) {
                setError(false);
              } else {
                setError(true);
              }
            }}
            id="title"
            type="text"
            placeholder="e.g Learn Photoshop CS6 from Scratch"
          />
          <span>{length - value.length}</span>
        </label>
        {error ? (
          <p className="error-create-course-title">
            Only letters and numbers, minimum length 1
          </p>
        ) : null}
        {failPetition ? (
          <p className="error-create-course-title">Could not create course</p>
        ) : null}
        <button
          onClick={handleCreateCourse}
          className="btn-create-course-title"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
export default CreateCourseTitle;
