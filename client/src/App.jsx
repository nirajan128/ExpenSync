import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//components

import LoginForm from "./component/form/LoginForm";
import RegisterForm from "./component/form/Registerform";
import Dashboard from "./component/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //A method that will set isAuthenticated taking boolean parameter as value
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
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
