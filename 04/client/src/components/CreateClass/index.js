import ModalClass from "./ModalClass"; /* create class */
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import FormCreateCourse from "./FormCreateCourse";
import { useState } from "react";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function CreateClass() {
  const handleVisible = (value) => {
    setIsVisible(value);
  };

  document.addEventListener('click', function(event) {
    if(event.target.className === "btn-edit-class-close" || event.target.className === "opacity-manage" || event.target.className ===  "btn-save-edit-class" ){
      handleVisible(false)
    }
  });
  const [isVisible, setIsVisible] = useState(false);




  return (
    <div className="main-container-create-class">
      {isVisible ? <div className="opacity-manage"></div> : null}
      {isVisible ? <FormCreateCourse  isDelete={false} isNew={true} /> : null}

      <div className="container-btn-title-create-course">
        <h3 className="create-class-title">Your classes</h3>
        <button
          onClick={()=> handleVisible(true)}
          type="button"
          className="create-class-btn"
        >
          Create class
        </button>
      </div>
      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }

          if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
          ) {
            return;
          }
          // const items = reorder(
          //   classesFromCourse,
          //   source.index,
          //   destination.index
          // );

          // dispatch(Reorder({ items, seccion: "class" }));
        }}
      >
        <Droppable droppableId="class">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              className="container-class-edit"
              ref={droppableProvided.innerRef}
            >
              {/* {classesFromCourse.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(draggableProvided) => (
                    <div
                      className="main-container-class-edit-modal"
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                    >
                      <ModalClass
                        titleClass={item.classTitle}
                        id={item._id}
                        description={item.classDescription}
                        urlVideo={item.classVideo}
                        isActive={item.classIsActive}
                      />
                      <span
                        className="btn-class-edit-modal"
                        {...draggableProvided.dragHandleProps}
                      >
                        <FaBars />
                      </span>
                    </div>
                  )}
                </Draggable>
              ))} */}

              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default CreateClass;
