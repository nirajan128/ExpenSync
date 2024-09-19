import React, { useState, useEffect } from "react";

const apiURL = process.env.REACT_APP_API_URL;
const ExpenseTracker = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    expense_type: "",
    amount: "",
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${apiURL}/dashboard/getExpenses`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseResponse = await response.json();
      setExpenses(parseResponse);
    } catch (error) {
      console.error("Error fetching expenses:");
    }
  };

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/dashboard/postExpenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Expense added:", data);

      setNewExpense({ date: "", expense_type: "", amount: "" });
      fetchExpenses();
      props.onExpenseAdded(); //updates the total amount evertime posted
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={newExpense.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="expense_type"
          value={newExpense.expense_type}
          onChange={handleInputChange}
          placeholder="Expense Type"
          required
        />
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      {expenses && expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.date}: {expense.expense_type} - ${expense.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseTracker;
