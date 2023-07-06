import { useState, useEffect } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaBars } from "react-icons/fa";



function InputLearn({
  limit,
  place,
  id,
  limitNum,
  value,
  deleteInput,
  updateInput
}) {
  const [length, setLegth] = useState(limitNum);
  useEffect(()=>{
    setLegth(limitNum - value?.length);
  },[value])

  return (
    <div className="main-container-input-learn">
      {limit ? (
        <>
          <input
            value={value}
            className="input-input-learn"
            maxLength={limitNum}
            type="text"
            placeholder={place}
            onChange={(e) => {
              updateInput(id,e.target.value)
            }}
          />
          <span className="num-length-input-learn">{length}</span>
        </>
      ) : (
        <input
          value={value}
          maxLength={limitNum}
          className="input-input-learn"
          type="text"
          placeholder={place}
          onChange={(e) => {
            setLegth(limitNum - e.target.value.length);
            updateInput(id,e.target.value)
          }}
        />
      )}
      <button
        type="button"
        className="btn-trash-input"
        onClick={() => deleteInput(id)}
      >
        <BiTrashAlt />
      </button>
      <button type="button" className="btn-bars-input">
        <FaBars />
      </button>
    </div>
  );
}
export default InputLearn;
