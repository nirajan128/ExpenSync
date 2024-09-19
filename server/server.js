import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoutes from "./routes/jwtAuth.js";
import dashboard from "./routes/dashboard.js";

dotenv.config();
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(
  cors({
    origin: "https://expensyncapp.onrender.com",
    credentials: true,
  })
);

//MIDDLE WARE
app.get("/", (req, res) => {
  res.send("Server connected");
});

app.use("/auth", authRoutes);
app.use("/dashboard", dashboard);

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
