/* eslint-disable no-unused-vars */
import LabelInput from "./LabelInput";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = { email, password };
      const response = await fetch(
        "https://expensync.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userCredentials), //converts the user credentials to json objects
        }
      );

      const parseResponse = await response.json(); //returns a toke

      if (parseResponse.token) {
        //if token exists
        localStorage.setItem("token", parseResponse.token); //token from backend
        props.setAuth(true);
      } else {
        props.setAuth(false);
      }
    } catch (error) {
      console.error("You are not authorized");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-cente align-items-center">
      <h2 className="text-center">Log in</h2>
      <form onSubmit={handleLogin} className="p-3 border border-dark">
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
          className="btn bgAccent"
          /*  onClick={() => {
            props.setAuth(true);
          }} */
        >
          LogIN
        </button>

        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register here
          </button>
        </p>
      </form>
      {/* Modal code remains the same */}
    </div>
  );
}

export default LoginForm;
