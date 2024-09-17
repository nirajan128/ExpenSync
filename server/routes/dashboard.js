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

export default router;
