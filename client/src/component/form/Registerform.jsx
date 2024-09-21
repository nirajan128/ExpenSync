/* eslint-disable no-unused-vars */
import LabelInput from "./LabelInput";
import { useState } from "react";
import AlertStatus from "../section/AlertStatus";
import LoadingSpinner from "../section/LoadingSpinner";

/* import { useNavigate } from "react-router-dom"; */

function RegisterForm(props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, name, confirmPassword } = inputs;
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  /* const navigate = useNavigate(); */

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setErrorMessage(null); // Clear any previous error messages
    try {
      const apiURL = process.env.REACT_APP_API_URL;
      const userCredentials = { email, password, name };

      if (confirmPassword !== password) {
        setErrorMessage("Password Dont match");
        return;
      }
      const response = await fetch(`${apiURL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials), //converts the user credentials to json objects
      });

      const parseResponse = await response.json(); //converts the response to JSON
      if (response.ok) {
        localStorage.setItem("token", parseResponse.token);
        props.setAuth(true);
        setErrorMessage(null); // Clear error message on successful registration
      } else {
        setErrorMessage(parseResponse.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering");
      setErrorMessage("An error occurred during registration.");
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  if (isLoading) {
    return <LoadingSpinner />; // Show loading spinner when isLoading is true
  }

  return (
    <div className="customHeight d-flex justify-content-center align-items-center bgBackground">
      <div className="h-100 d-flex flex-column justify-content-center">
        <h1 className="logoFont text-white bgPrimary p-2">ExpenSYNC</h1>
        <form onSubmit={handleRegister} className="p-3 bg-white shadow">
          <p className="text-center fw-bold">Register</p>
          <LabelInput
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
          />
          <LabelInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
          />
          <LabelInput
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
          <LabelInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />

          <button className="btn bgAccent text-dark mt-3" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Register"}
          </button>
          {/* Conditionally render AlertStatus component */}
          {errorMessage && (
            <AlertStatus message={errorMessage} state="alert-danger" />
          )}
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
