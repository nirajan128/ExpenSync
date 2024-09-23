import { useState, useEffect } from "react";
import ExpenseManager from "./ExpenseManager";

function Dashboard(props) {
  const [userName, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getName() {
    try {
      setIsLoading(true);
      const apiURL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiURL}/dashboard`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const parseResponse = await response.json();
      setName(parseResponse.name);
    } catch (error) {
      console.error("Not authorized", error);
      setError("Failed to load user data. Please try logging in again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.setAuth(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <nav className="navbar navbar-light">
        <h1 className="logoFont2 text-white bgPrimary p-2">ExpenSYNC</h1>

        <button className="btn customButton" onClick={logOut}>
          Logout
        </button>
      </nav>
      <h3 className=" Roboto">Welcome {userName}</h3>
      <div className="row mt-3">
        <div className="col-12">
          <ExpenseManager />
        </div>
      </div>
      <footer className="bgBackground">
        <p className="openSans text-center customP">
          Developed By:{" "}
          <span>
            <a
              href="https://github.com/nirajan128"
              className="onpenSans text-center mt-3 customP"
            >
              @Nirajan Shrestha 2024
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
