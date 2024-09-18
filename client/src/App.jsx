import "./App.css";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import dotenv from "dotenv";
//components

import LoginForm from "./component/form/LoginForm";
import RegisterForm from "./component/form/Registerform";
import Dashboard from "./component/Dashboard";

dotenv.config();
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //A method that will set isAuthenticated taking boolean parameter as value
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //A session
  //Function isAuthenticated makes a request to is-auth route(JWtroute) in backend and passes the token to check if its still verified by authorization
  //Useeffect for when the user refreshes the backend check if the token is still valid
  async function stillAuthenticated() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/is_verify`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parsedResponse = await response.json(); //return either tru or false
      console.log(parsedResponse);

      //if true means authenticaed and user cacn still acess their data, if not they need to log in again
      parsedResponse === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (error) {
      console.error("Token expired, please log in again");
    }
  }

  useEffect(() => {
    stillAuthenticated();
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Route render the dashboard based on isAuthenticated value and passses setAuth as props to be able to set the auth value in each comp  */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <LoginForm setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <RegisterForm setAuth={setAuth} />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
