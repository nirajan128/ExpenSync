import express from "express";
import db from "../config/db.js";
import authorization from "../config/authorization.js";

const router = express.Router();

router.get("/", authorization, async (req, res) => {
  try {
    //req.user has the payload
    /*  res.json(req.user); */

    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(401).send("Not Authorized");
  }
});

//for posting expenses
router.post("/postExpenses", authorization, async (req, res) => {
  try {
    const { date, expense_type, category, amount } = req.body;

    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);

    const user_id = user.rows[0].id; // Get user ID from authenticated request

    const newExpense = await db.query(
      "INSERT INTO expensesData (user_id, date, expense_type, category, amount) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, date, expense_type, category, amount]
    );
    res.json(newExpense.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Get all expenses for a user
router.get("/getExpenses", authorization, async (req, res) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);
    const user_id = user.rows[0].id; // Get user ID from authenticated request

    // Get the category from query parameters
    const { category } = req.query; // Expects category as a query parameter

    let expenses;
    if (category) {
      // If a category is provided, filter by that category
      expenses = await db.query(
        "SELECT * FROM expensesData WHERE user_id = $1 AND category = $2 ORDER BY date DESC",
        [user_id, category]
      );
    } else {
      // If no category is provided, return all expenses
      expenses = await db.query(
        "SELECT * FROM expensesData WHERE user_id = $1 ORDER BY date DESC",
        [user_id]
      );
    }

    res.json(expenses.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get monthly totals for a specific user
router.get("/monthly-totals", authorization, async (req, res) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);
    const user_id = user.rows[0].id; // Get user ID from authenticated request
    const monthlyTotals = await db.query(
      `SELECT 
                DATE_TRUNC('month', date) AS month,
                SUM(amount) AS total
             FROM expensesData
             WHERE user_id = $1
             GROUP BY DATE_TRUNC('month', date)
             ORDER BY month DESC`,
      [user_id]
    );
    res.json(monthlyTotals.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// New route to get monthly totals by category
router.get("/monthly-totals/categories", authorization, async (req, res) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);
    const user_id = user.rows[0].id;

    const monthlyCategoryTotals = await db.query(
      `SELECT 
                DATE_TRUNC('month', date) AS month,
                category,
                SUM(amount) AS total
             FROM expensesData
             WHERE user_id = $1
             GROUP BY DATE_TRUNC('month', date), category
             ORDER BY month DESC, category`,
      [user_id]
    );

    res.json({ totalsByCategory: monthlyCategoryTotals.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// New route to get valid expense categories
router.get("/getCategories", authorization, (req, res) => {
  const validCategories = ["Groceries", "Entertainment", "Rent", "Other"];
  res.json(validCategories);
});

// Delete an expense by ID
router.delete("/deleteExpense/:id", authorization, async (req, res) => {
  try {
    const expenseId = req.params.id;

    // Check if the expense belongs to the user
    const expense = await db.query("SELECT * FROM expensesData WHERE id = $1", [
      expenseId,
    ]);

    if (expense.rows.length === 0) {
      return res.status(404).send("Expense not found");
    }

    // Delete the expense
    await db.query("DELETE FROM expensesData WHERE id = $1", [expenseId]);

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update an expense by ID
router.put("/updateExpense/:id", authorization, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { date, expense_type, category, amount } = req.body;

    // Check if the expense belongs to the user
    const expense = await db.query(
      "SELECT * FROM expensesData WHERE id = $1 AND user_id = $2",
      [expenseId, req.user]
    );

    if (expense.rows.length === 0) {
      return res.status(404).send("Expense not found or not authorized");
    }

    // Update the expense
    const updatedExpense = await db.query(
      "UPDATE expensesData SET date = $1, expense_type = $2, category = $3, amount = $4 WHERE id = $5 RETURNING *",
      [date, expense_type, category, amount, expenseId]
    );

    res.json(updatedExpense.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
