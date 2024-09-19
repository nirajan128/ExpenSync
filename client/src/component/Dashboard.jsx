import { useState, useEffect } from "react";
import ExpenseTracker from "./ExpenseTracker";
import MonthlyExpenses from "./MonthlyExpenses";

function Dashboard(props) {
  const [userName, setName] = useState("");
  const [shouldRefetchMonthly, setShouldRefetchMonthly] = useState(false); //state to update total amount when an expense is added

  async function getName() {
    try {
      const apiURL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiURL}/dashboard`, {
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

  const handleExpenseAdded = () => {
    setShouldRefetchMonthly(prev => !prev); // Toggle to trigger re-fetch
  };

  //logout - removes the token from local storage and sets the authorization to false
  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.setAuth(false);
  };
  return (
    <>
      <h1>Dashboard {userName}</h1>
      <ExpenseTracker onExpenseAdded={handleExpenseAdded} />
      <MonthlyExpenses shouldRefetch={shouldRefetchMonthly}/>
      <button className="btn btn-warning" onClick={logOut}>
        logout
      </button>
    </>
  );
}

export default Dashboard;
