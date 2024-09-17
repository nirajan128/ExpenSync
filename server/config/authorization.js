//Check the token passed from the frontend with the token provided by backend
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
  try {
    //1.destructrre the token , thats being sent by the frontend
    const jwtToken = req.header("token");

    //2.Check if the token exists if not dont give access
    if (!jwtToken) {
      return res.status(403).send("You are not authorized");
    }

    //3. if it does verify it and pass the user as payload user
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = payload.user;

    // 5. Move to the next middleware/route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(403).send("You are not authorized");
  }
};
