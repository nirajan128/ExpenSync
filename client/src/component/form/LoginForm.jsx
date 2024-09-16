/* eslint-disable no-unused-vars */
import LabelInput from "./LabelInput";
import { useState } from "react";

import RegisterForm from "./Registerform";
/* import { useNavigate } from "react-router-dom"; */
import AlertStatus from "../section/AlertStatus";
import axios from "axios";

function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  /*   const navigate = useNavigate();
   */
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(userEmail, userPassword);
  };
  return (
    <div>
      <h2 className="text-center">Log in</h2>
      <form onSubmit={handleLogin} className="p-3 border border-dark">
        <LabelInput
          type="email"
          name="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Your email"
        />
        <LabelInput
          type="password"
          name="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button className="btn bgAccent">LogIN</button>

        {errorMessage && (
          <AlertStatus
            message={errorMessage}
            state="alert-danger"
            icon="#exclamation-triangle-fill"
          />
        )}
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            className="btn btn-link"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Register here
          </button>
        </p>
      </form>
      {/* Modal code remains the same */}
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">
                Register
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Embed the RegisterForm component here */}
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
