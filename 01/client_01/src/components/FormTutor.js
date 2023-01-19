const FormTutor = ({ handleChange, validateInputs, errors, categories }) => {
  return (
    <>
      <div className="register-form__inputs">
        <input onBlur={validateInputs} type="text" placeholder="Profession" name="profession" onChange={handleChange} />
      </div>
      <span className="register-form__errors">{errors.profession}</span>

      <div className="register-form__inputs">
        <select
          onBlur={validateInputs}
          type="text"
          placeholder="Focus"
          name="focus"
          onChange={handleChange}
          defaultValue={0}
          className="register-form__select-focus"
        >
          <option value={0} hidden disabled>
            Choose your area of expertise
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.subject}>
              {category.subject}
            </option>
          ))}
        </select>
      </div>
      <span className="register-form__errors">{errors.focus}</span>
    </>
  );
};

export default FormTutor;
