import { useState, useEffect } from "react";

function InputTitleLanding({
  keyObj,
  place,
  id,
  limitNum,
  children,
  action,
  value,
}) {
  const [length, setLegth] = useState(limitNum);

  useEffect(() => {
    setLegth(limitNum - value?.length);
  }, [value]);
  
  return (
    <>
      <label htmlFor={id} className="label-input-landing">
        {children}
      </label>
      <div className="main-container-input-learn container-input-landing">
        <input
          value={value || ""}
          id={id}
          className="input-input-learn"
          maxLength={limitNum}
          type="text"
          placeholder={place}
          onChange={(e) => {
            action(keyObj, e.target.value);
          }}
        />
        {limitNum > 0 ? (
          <span className="num-length-input-learn">{length}</span>
        ) : null}
      </div>
    </>
  );
}
export default InputTitleLanding;
