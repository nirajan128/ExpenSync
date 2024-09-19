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
          <h1 className="logoFont text-dark bgAccent p-2">ExpenSYNC</h1>
          
        </div>
        <div className="col-sm-12 col-md-4 d-flex flex-column justify-content-center align-items-center bgBackground mb-3">
           <div className="container-fluid bg-dark border">
            <p className="p-3 openSans text-light">Welcome to <span className="fw-bold">ExpenSync</span>, an open source app that helps you manage your monthly expenses</p>  
           </div>
           

           <div className="p-2">
           <button
            className="btn mt-3  btn-block w-100 customButton roboto  fw-bold"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="btn  w-100 customButton mt-3 roboto  fw-bold"
            onClick={handleRegisterClick}
          >
            Register
          </button>
           </div>
          
        </div>
      </div>
    </div>
  );
}

export default HomePage;
