/* eslint-disable no-unused-vars */
import LabelInput from "./LabelInput";
import { useState } from "react";
import dotenv from "dotenv";
/* import { useNavigate } from "react-router-dom"; */

dotenv.config();

function RegisterForm(props) {
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
    try {
      const userCredentials = { email, password, name };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userCredentials), //converts the user credentials to json objects
        }
      );

      const parseResponse = await response.json(); //converts the response to JSON
      console.log(parseResponse);

      localStorage.setItem("token", parseResponse.token); //sets the localstorage for token

      props.setAuth(true);
    } catch (error) {
      console.error("Error registering");
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister} className="p-3 border border-dark">
        {/* Form inputs remain the same */}
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
          name="confirmpassword"
          value={confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        <button className="btn bgAccent">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
