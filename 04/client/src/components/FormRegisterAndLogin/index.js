import { useState } from "react";
import { useForm } from "react-hook-form";

function FormRegisterAndLogin({ Submit, btn, login }) {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <form
      data-disable-loader="true"
      className="main-container-form-register-and-login"
      onSubmit={handleSubmit(Submit)}
    >
      {!login ? (
        <div className="container-form-register-and-login">
          <label
            htmlFor="fullName"
            className={`${"label-form-register-and-login"} ${
              dataForm.fullName ? "label-form-register-and-login-Active" : ""
            }`}
          >
            Full name
          </label>
          <input
            type="text"
            className="input-form-register-and-login"
            id="fullName"
            {...register("fullName", {
              onChange:(e) => setDataForm({ ...dataForm, fullName: e.target.value }),
              required: true,
              pattern:/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/
            })}
          />
        </div>
      ) : null}
      {errors.fullName?.type === "required" && (
        <p className="errors-form-register-and-login">Full name is required</p>
      )}
      {errors.fullName?.type === "pattern" && (
        <p className="errors-form-register-and-login">
          Full name is not validate
        </p>
      )}

      <div className="container-form-register-and-login">
        <label
          htmlFor="email"
          className={`${"label-form-register-and-login"} ${
            dataForm.email ? "label-form-register-and-login-Active" : ""
          }`}
        >
          Email
        </label>
        <input
          type="email"
          className="input-form-register-and-login"
          id="email"
          {...register("email", {
            onChange:(e) => setDataForm({ ...dataForm, email: e.target.value }),
            required: true,
            pattern: /\S+@\S+\.\S+/,
          })}
        />
      </div>
      {errors.email?.type === "required" && (
        <p className="errors-form-register-and-login">Email is required</p>
      )}
      {errors.email?.type === "pattern" && (
        <p className="errors-form-register-and-login">Email is not validate</p>
      )}

      <div className="container-form-register-and-login">
        <label
          htmlFor="password"
          className={`${"label-form-register-and-login"} ${
            dataForm.password ? "label-form-register-and-login-Active" : ""
          }`}
        >
          Password
        </label>
        <input
          type="password"
          className="input-form-register-and-login"
          id="password"
          {...register("password", {
            onChange:(e) => setDataForm({ ...dataForm, password: e.target.value }),
            required: true,
            minLength: 8,
            maxLength: 16,
            pattern:/^[a-zA-Z0-9]+$/
          })}
        />
      </div>
      {errors.password?.type === "pattern" && (
        <p className="errors-form-register-and-login">Only numbers and letters</p>
      )}
      {errors.password?.type === "required" && (
        <p className="errors-form-register-and-login">Password is required</p>
      )}
      {errors.password?.type === "minLength" && (
        <p className="errors-form-register-and-login">Min length 8</p>
      )}
      {errors.password?.type === "maxLength" && (
        <p className="errors-form-register-and-login">Max length 16</p>
      )}

      <button className="btn-submit-form-register-and-login" type="submit">{btn}</button>
    </form>
  );
}
export default FormRegisterAndLogin;
