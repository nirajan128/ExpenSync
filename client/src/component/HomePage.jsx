import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Change "/login" to the route path for your Login component
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Change "/register" to the route path for your Register component
  };

  return (
    <div className="container-fluid customHeight">
      <div className="row h-100">
        <div className="col-sm-12 col-md-8 d-flex justify-content-center align-items-center bgPrimary">
          <h1>ExpenSync</h1>
        </div>
        <div className="col-sm-12 col-md-4 d-flex flex-column justify-content-center align-items-center bgBackground">
          <button
            className="btn  btn-block w-100 bgAccent"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="btn  w-100 bgAccent mt-3"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
