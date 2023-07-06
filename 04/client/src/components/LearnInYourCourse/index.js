import InputLearn from "./InputLearn";
import { MdAdd } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function LearnInYourCourse({
  title,
  info,
  minInputs,
  limit,
  place,
  limitNum,
  action,
  keyObj,
}) {

  const deleteInput = (id) => {
    const newInputs = minInputs.filter((item) => item.id !== id);
    action(keyObj, newInputs);
  };
  const updateInput = (id,val) => {
    const newInputs = minInputs.map((item) => {
      if(item.id === id){
        item.val = val
      }
      return item
    })
    action(keyObj,newInputs)
  };
  return (
    <div className="main-container-learn-in-your-course">
      <h3 className="title-learn-in-your-course">{title}</h3>
      <p className="info-learn-in-your-course">{info}</p>
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
          const items = reorder(minInputs, source.index, destination.index);

          action(keyObj, items);
        }}
      >
        <Droppable droppableId="inputs">
          {(droppableProvided) => (
            <div
              className="container-learn-in-your-course"
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {minInputs.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={`${item.id}`}
                  index={index}
                >
                  {(draggableProvided) => (
                    <div
                      className="drag-drop-input"
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      ref={draggableProvided.innerRef}
                    >
                      <InputLearn
                        deleteInput={deleteInput}
                        updateInput={updateInput}
                        value={item.val}
                        limit={limit}
                        place={place}
                        id={item.id}
                        limitNum={limitNum}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        className="add-input-learn-in-your-course"
        onClick={(e) =>
          action(keyObj, [...minInputs,{ id: uuidv4(), val: ""} ])
        }
        type="button"
      >
        {" "}
        <MdAdd /> Add more to your response
      </button>
    </div>
  );
}
export default LearnInYourCourse;
