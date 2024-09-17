import express from "express";
import cors from "cors";
import authRoutes from "./routes/jwtAuth.js";

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());

//MIDDLE WARE
app.get("/", (req, res) => {
  res.send("Server connected");
});

app.use("/request", authRoutes);

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
