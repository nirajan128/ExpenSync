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
    const { date, expense_type, amount } = req.body;

    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      req.user,
    ]);
    const user_id = user.rows[0].id; // Get user ID from authenticated request

    const newExpense = await db.query(
      "INSERT INTO expensesData (user_id, date, expense_type, amount) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, date, expense_type, amount]
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
    const expenses = await db.query(
      "SELECT * FROM expensesData WHERE user_id = $1 ORDER BY date DESC",
      [user_id]
    );
    res.json(expenses.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
