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
    <div>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row h-100 d-flex align-items-center justify-content-center">
          <button className="btn btn-primary me-2" onClick={handleLoginClick}>
            Login
          </button>
          <button className="btn btn-primary" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
