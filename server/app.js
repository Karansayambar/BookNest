import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import unitsRouters from "./routes/unitsRoutes.js";

dotenv.config();
const app = express();
const port = process.env.port || 3000;

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/units", unitsRouters);

connectDB().then(() => {
  app.listen(port, (err) => {
    if (err) {
      console.error("Error starting the server:", err);
    } else console.log(`App is running on http://localhost:${port}`);
  });
});
