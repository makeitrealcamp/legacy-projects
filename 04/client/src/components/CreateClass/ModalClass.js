import { useState } from "react";
import FormCreateCourse from "./FormCreateCourse";

function ModalClass({ titleClass, id, description, urlVideo, isActive }) {
  const [form, setForm] = useState(false);

  document.addEventListener("click", function (event) {
    if (
      event.target.className === "nav-close" ||
      event.target.className === "opacity-manage" ||
      event.target.className === "btn-save-edit-class" ||
      event.target.className === "btn-edit-class-close"
    ) {
      setForm(false);
    }
  });

  return (
    <>
      {form ? <div className="opacity-manage"></div> : null}
      <div className="main-container-class-edit">
        <p className="title-class-edit">{titleClass}</p>
        <button
          onClick={() => setForm(true)}
          className="btn-class-edit"
          type="button"
        >
          Edit Class
        </button>
      </div>
      {form ? (
          <FormCreateCourse
            id={id}
            titleClass={titleClass}
            description={description}
            urlVideo={urlVideo}
            isActive={isActive}
            isDelete={true}
          />
      ) : null}
    </>
  );
}

export default ModalClass;
