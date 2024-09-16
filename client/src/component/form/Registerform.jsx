/* eslint-disable no-unused-vars */
import LabelInput from "./LabelInput";
import { useState } from "react";
import axios from "axios";
import AlertStatus from "../section/AlertStatus";
/* import { useNavigate } from "react-router-dom"; */

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  /* const navigate = useNavigate(); */

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(email, name, password);
  };

  return (
    <div>
      <form onSubmit={handleRegister} className="p-3 border border-dark">
        {/* Form inputs remain the same */}
        <LabelInput
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <LabelInput
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <LabelInput
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <LabelInput
          type="password"
          name="confirmpassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <button className="btn bgAccent">Register</button>
        {successMessage && (
          <AlertStatus
            message={successMessage}
            state="alert-success"
            icon="#check-circle-fill"
          />
        )}
        {errorMessage && (
          <AlertStatus
            message={errorMessage}
            state="alert-danger"
            icon="#exclamation-triangle-fill"
          />
        )}
      </form>
    </div>
  );
}

export default RegisterForm;
