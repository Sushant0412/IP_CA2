import express from "express";
import cors from "cors";
import { connectDB } from "./schemas/db.js";
import allRoutes from "./routes/All_routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/home", allRoutes);

app.listen(5000, () => {
  console.log("Listening on port 3000");
});
