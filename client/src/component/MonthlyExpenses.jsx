import React, { useState, useEffect } from "react";

const apiURL = process.env.REACT_APP_API_URL;

const MonthlyExpenses = (props) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [props.shouldRefetch]); //refetches the total sum evertime something is changed

  const fetchMonthlyExpenses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiURL}/dashboard/monthly-totals`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMonthlyExpenses(data);
    } catch (error) {
      console.error("Error fetching monthly expenses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  if (isLoading) {
    return <div>Loading monthly expenses...</div>;
  }

  return (
    <div>
      <h2>Monthly Expenses</h2>
      {monthlyExpenses.length > 0 ? (
        <ul>
          {monthlyExpenses.map((expense, index) => (
            <li key={index}>
              {formatMonth(expense.month)}: $
              {parseFloat(expense.total).toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No monthly expenses data available.</p>
      )}
    </div>
  );
};

export default MonthlyExpenses;
