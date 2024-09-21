/* eslint-disable no-unused-vars */
import LabelInput from "./LabelInput";
import { useState } from "react";
import AlertStatus from "../section/AlertStatus";
import LoadingSpinner from "../section/LoadingSpinner";

import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  //state for loading
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = inputs;

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setErrorMessage(null); // Clear any previous error messages
    try {
      const apiURL = process.env.REACT_APP_API_URL;
      const userCredentials = { email, password };
      const response = await fetch(`${apiURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials), //converts the user credentials to json objects
      });

      const parseResponse = await response.json(); //returns a toke

      if (parseResponse.token) {
        //if token exists
        localStorage.setItem("token", parseResponse.token); //token from backend
        props.setAuth(true);
      } else {
        props.setAuth(false);
        setErrorMessage("Try loggingIn");
      }
    } catch (error) {
      setErrorMessage("You are not authorized");
      console.error("You are not authorized");
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
        <form onSubmit={handleLogin} className="p-3 shadow bg-white roboto">
          <p className="text-center fw-bold">Log in</p>
          <LabelInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Your email"
          />
          <LabelInput
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <button
            className="btn bgAccent openSans fw-bold text-black mt-3"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          <p className="fw-bold mt-4 customPara">
            Don't have an account?{" "}
            <button
              type="button"
              className="btn customButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register here
            </button>
          </p>
          {errorMessage && (
            <AlertStatus message={errorMessage} state="alert-danger" />
          )}
        </form>
        {/* Modal code remains the same */}
      </div>
    </div>
  );
}

export default LoginForm;
