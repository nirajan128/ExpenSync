import React, { useState, useEffect } from "react";
import LabelInput from "./form/LabelInput";
import EditExpenseModal from "./section/EditExpenseModal";

// API URL from environment variables
const apiURL = process.env.REACT_APP_API_URL;

const ExpenseManager = (props) => {
  // State for individual expenses
  const [expenses, setExpenses] = useState([]);
  // State for new expense form
  const [newExpense, setNewExpense] = useState({
    date: "",
    expense_type: "",
    category: "",
    amount: "",
  });
  // State for monthly expense totals
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  // Loading state for async operations
  const [isLoading, setIsLoading] = useState(true);
  //Loading state for coategories
  const [categories, setCategories] = useState([]);
  // State for monthly category totals
  const [monthlyCategoryTotals, setMonthlyCategoryTotals] = useState([]);
  //updateing expenses
  const [editingExpense, setEditingExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect hook to fetch data on component mount and when shouldRefetch changes
  useEffect(() => {
    fetchExpenses();
    fetchMonthlyExpenses();
    fetchCategories();
    fetchMonthlyCategoryTotals();
  }, [props.shouldRefetch]);

  // Function to fetch individual expenses
  const fetchExpenses = async (category = "") => {
    try {
      const url = category
        ? `${apiURL}/dashboard/getExpenses?category=${category}`
        : `${apiURL}/dashboard/getExpenses`;

      const response = await fetch(url, {
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

  // Function to fetch categories (this should be implemented on the backend)
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiURL}/dashboard/getCategories`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseResponse = await response.json();
      setCategories(parseResponse); // Assuming the response is an array of category strings
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // function to fetch monthly category totals
  const fetchMonthlyCategoryTotals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiURL}/dashboard/monthly-totals/categories`,
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMonthlyCategoryTotals(data.totalsByCategory);
    } catch (error) {
      console.error("Error fetching monthly category totals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //function to fetch updated expenses
  const handleUpdateExpense = async (updatedExpense) => {
    try {
      const response = await fetch(
        `${apiURL}/dashboard/updateExpense/${updatedExpense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(updatedExpense),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Expense updated:", data);

      // Refetch expenses and close modal
      fetchExpenses();
      fetchMonthlyExpenses();
      fetchMonthlyCategoryTotals();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // Handler for form input changes
  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };
  //Handler for select/option change
  const handleSelectChange = (e) => {
    setNewExpense({ ...newExpense, category: e.target.value });
  };

  const handleCategoryClick = (category) => {
    fetchExpenses(category === "all" ? "" : category); // Fetch expenses based on the clicked category
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
      setNewExpense({ date: "", expense_type: "", category: "", amount: "" });
      fetchExpenses();
      fetchMonthlyExpenses();
      fetchMonthlyCategoryTotals();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const response = await fetch(
          `${apiURL}/dashboard/deleteExpense/${id}`,
          {
            method: "DELETE",
            headers: { token: localStorage.token },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message); // Display success message

        // Refetch expenses or update the state
        fetchExpenses();
        fetchMonthlyExpenses();
        fetchCategories();
        fetchMonthlyCategoryTotals();
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
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
            <select
              className="form-select mb-3 mt-3"
              value={newExpense.category}
              onChange={handleSelectChange}
              required
            >
              <option value="" disabled>
                Select expense category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <LabelInput
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
            <button type="submit" className="btn bgAccent mt-3">
              Add Expense
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <p className="fw-bold roboto text-decoration-underline">
            Monthly Expenses
          </p>
          {isLoading ? (
            <div>Loading monthly expenses...</div>
          ) : (
            <div className="row">
              {monthlyExpenses.length > 0 ? (
                monthlyExpenses.map((expense, index) => (
                  <div key={index} className="col-6 col-md-4 mb-3">
                    <div className="border border-3 shadow p-3 text-center fw-bold openSans">
                      {formatMonth(expense.month)}: $
                      {parseFloat(expense.total).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <p>No monthly expenses data available.</p>
              )}
            </div>
          )}

          <p className="mt-4 fw-bold roboto text-decoration-underline">
            Monthly Expenses by Category
          </p>
          {isLoading ? (
            <div>Loading category totals...</div>
          ) : (
            <div className="row">
              {monthlyCategoryTotals.length > 0 ? (
                monthlyCategoryTotals.map((total, index) => (
                  <div key={index} className="col-6 col-md-4 mb-3">
                    <div className="border  border-3 p-3 fw-bold text-center openSans bold shadow">
                      {total.category} ${parseFloat(total.total).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <p>No monthly category totals available.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <div className="btn-group mb-3" role="group">
          <button
            className="btn btn-secondary"
            onClick={() => handleCategoryClick("all")}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              className="btn btn-secondary"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Expense List Table */}
      <div className="mt-3">
        {expenses && expenses.length > 0 ? (
          <div>
            <table className="table table-striped table-responsive">
              <thead>
                <tr className="openSans">
                  <th>Date</th>
                  <th>Expense Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="openSans">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.date}</td>
                    <td>{expense.expense_type}</td>
                    <td>{expense.category}</td>
                    <td>${expense.amount}</td>
                    <td>
                      <i
                        className="fas fa-edit text-primary me-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditClick(expense)}
                        title="Edit Expense"
                      ></i>
                      <i
                        className="fas fa-trash-alt text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(expense.id)}
                        title="Delete Expense"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
      {/* Edit Expense Modal */}
      <EditExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        expense={editingExpense}
        onUpdate={handleUpdateExpense}
        categories={categories}
      />
    </div>
  );
};

export default ExpenseManager;
