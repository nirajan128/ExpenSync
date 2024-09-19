import React, { useState, useEffect } from "react";
import LabelInput from "./form/LabelInput";

// API URL from environment variables
const apiURL = process.env.REACT_APP_API_URL;

const ExpenseManager = (props) => {
  // State for individual expenses
  const [expenses, setExpenses] = useState([]);
  // State for new expense form
  const [newExpense, setNewExpense] = useState({
    date: "",
    expense_type: "",
    amount: "",
  });
  // State for monthly expense totals
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  // Loading state for async operations
  const [isLoading, setIsLoading] = useState(true);

  // Effect hook to fetch data on component mount and when shouldRefetch changes
  useEffect(() => {
    fetchExpenses();
    fetchMonthlyExpenses();
  }, [props.shouldRefetch]);

  // Function to fetch individual expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${apiURL}/dashboard/getExpenses`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseResponse = await response.json();
      setExpenses(parseResponse);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Function to fetch monthly expense totals
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

  // Handler for form input changes
  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  // Handler for form submission
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

      // Reset form and update data
      setNewExpense({ date: "", expense_type: "", amount: "" });
      fetchExpenses();
      fetchMonthlyExpenses();
      props.onExpenseAdded(); // Notify parent component if needed
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  // Helper function to format date for display
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="p-2">
      <div className="row">
        {/* Expense Input Form */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="shadow p-3 bg-white">
            <p className="roboto fw-bold">Add expenses</p>
            <LabelInput
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
            />
            <LabelInput
              type="text"
              name="expense_type"
              value={newExpense.expense_type}
              onChange={handleInputChange}
              placeholder="Expense Type"
            />
            <LabelInput
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
            <button type="submit" className="btn bgAccent">
              Add Expense
            </button>
          </form>
        </div>

          {/* Monthly Expenses Summary Section */}
      <div className="col-md-6">
        <h3>Monthly Expenses</h3>
        
        {isLoading ? (
          <div>Loading monthly expenses...</div>
        ) : monthlyExpenses.length > 0 ? (
          <div className="row gap-3">
          <div className="col-3 border border-black text-black openSans d-flex flex-column justify-content-center align-items-center">
            {monthlyExpenses.map((expense, index) => (
              <p key={index} className="p-3">
                {formatMonth(expense.month)}: $
                {parseFloat(expense.total).toFixed(2)}
              </p>
            ))}
          
          </div>
          <div className="col-3 bg-black text-white openSans d-flex flex-column justify-content-center align-items-center"><p>Groceries</p></div>
          <div className="col-3 bg-black text-white openSans d-flex flex-column justify-content-center align-items-center"><p>Rent</p></div>
          <div className="col-3 bg-black text-white openSans d-flex flex-column justify-content-center align-items-center"><p className="p-2">Entertainment</p></div>
        </div>
         
        ) : (
          <p>No monthly expenses data available.</p>
        )}
      </div>
      
        {/* Expense List Table */}
        <div className="mt-3">
          {expenses && expenses.length > 0 ? (
            <table className="table table-striped table-responsive">
              <thead>
                <tr className="openSans">
                  <th>Date</th>
                  <th>Expense Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="openSans">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.expense_type}</td>
                    <td>${expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No expenses found.</p>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default ExpenseManager;