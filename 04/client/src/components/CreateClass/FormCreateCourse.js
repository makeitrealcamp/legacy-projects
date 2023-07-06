import ReactQuill from "react-quill";
import PromotionalSource from "../PromotionalSources/index";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { useParams } from "react-router-dom";

function FormCreateCourse({
  titleClass,
  id,
  description,
  urlVideo,
  isActive,
  isDelete,
  action,
  isNew,
}) {
  const dispatch = useDispatch();
  const [length, setLength] = useState(80);
  const courseId = useParams();

  const [newClass, setNewClass] = useState({
    classTitle: titleClass || "",
    classDescription: description || "",
    classIsActive: isActive || true,
    classVideo: urlVideo || "",
  });
  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const handleClick = (newClass, course) => {
    if (isNew) {
      // dispatch(postNewClassAxios(newClass, course));
    } else {
      // dispatch(updateClassAxios(newClass, id));
    }
  };

  const handleDeleteClass = (id) => {
    // dispatch(deleteClassAxios(id));
  };
  const handleLocalStateVideo = (url) => {
    setNewClass((prev) => ({ ...prev, classVideo: url }));
  };

  const handleEdit = (e, key) => {
    setNewClass((prev) => ({ ...prev, [key]: e }));
    if (key === "classTitle") {
      setLength(80 - e.length);
    }
  };

  return (
    <div className="main-container-form-create-course">
      <div className="container-form-create-course">
        <label htmlFor="titleClass" className="label-input-landing">
          Title Class
        </label>
        <div className="main-container-input-learn container-input-landing">
          <input
            value={newClass.classTitle}
            id="titleClass"
            className="input-input-learn"
            maxLength={80}
            type="text"
            placeholder="Enter a Title."
            onChange={(e) => handleEdit(e.target.value, "classTitle")}
          />

          <span className="num-length-input-learn">{length}</span>
        </div>
        <p className="label-input-landing">Class description</p>
        <ReactQuill
          // theme="snow"
          value={newClass.classDescription}
          placeholder="Add a description of your class."
          onChange={(e) => {
            handleEdit(e, "classDescription");
          }}
          modules={modules}
        />

        <p className="label-input-landing">Video Class</p>
        <PromotionalSource
          handleLocalStateVideo={handleLocalStateVideo}
          isCourse={false}
          accept="video/mp4,video/x-m4v,video/*"
          id="class-video"
          video={true}
        />
        <div className="container-form-create-course-btns">
          <button
            onClick={() => handleClick(newClass, courseId.course)}
            type="button"
            className="btn-save-edit-class"
          >
            Save
          </button>
          {isDelete ? (
            <button
              onClick={() => handleDeleteClass(id)}
              type="button"
              className="btn-save-edit-class-delete"
            >
              Delete
            </button>
          ) : null}
        </div>

        <button className="btn-edit-class-close">
          <MdClose />
        </button>
      </div>
    </div>
  );
}

export default FormCreateCourse;
