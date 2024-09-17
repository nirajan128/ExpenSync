import db from "../config/db.js";
import express from "express";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";
import validinfo from "../midddleware/validinfo.js"; //valid info middleware to be used while logging in and regstering
import authorization from "../config/authorization.js";

const router = express.Router();

router.post("/register", validinfo, async (req, res) => {
  try {
    //1.Destructure req.body for user data input
    const { name, email, password } = req.body;

    //2. check if user exists
    const user = await db.query("SELECT * FROM users WHERE email =$1", [email]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User exists");
    }
    //3. Bycrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4.insert the user in db
    const newUser = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    //5. Generate jwt token
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//Login route
router.post("/login", validinfo, async (req, res) => {
  try {
    //1. Destrcture req.body
    const { email, password } = req.body;

    //2. Check if user doesent exist, if not throw error
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send("Credentials does not match");
    }

    //3. if exist, check if incoming and db password are same
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).send("Credentials don't match");
    }

    //4. if true, pass the jwt token
    const token = jwtGenerator(user.rows[0].id);
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//Route to verify if user is authenticated or not, uses authentication.js middleware to check the token, if it matches sends a JSON response as true
router.get("/is_verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
