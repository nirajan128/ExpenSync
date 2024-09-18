import { useState, useEffect } from "react";

function Dashboard(props) {
  const [userName, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("https://expensync.onrender.com/dashboard", {
        method: "GET",
        headers: { token: localStorage.token }, //this token gets paased to authorization.js where it is verified if passed the user data is returned
      });

      const parseResponse = await response.json();
      setName(parseResponse.name);
    } catch (error) {
      console.error("Not authorized", error);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  //logout - removes the token from local storage and sets the authorization to false
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.setAuth(false);
  };
  return (
    <>
      <h1>Dashboard {userName}</h1>
      <button className="btn btn-warning" onClick={logOut}>
        Button
      </button>
    </>
  );
}

export default Dashboard;
