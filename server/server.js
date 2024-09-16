import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server connected");
});

app.use("/request", authRoutes);

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
