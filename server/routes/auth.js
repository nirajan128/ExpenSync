import db from "../config/db.js";
import express from "express";

const router = express.Router();

router.get("/register", async (req, res) => {
  res.send("Register request");
});

router.get("/login", async (req, res) => {
  res.send("login request");
});

export default router;
