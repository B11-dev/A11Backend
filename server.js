import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js";
import carRoutes from "./src/routes/carRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";

dotenv.config();

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Enable Helmet for security headers
app.use(helmet());

// CORS configuration - update origin to your frontend URL
app.use(
  cors({
    origin: "http://localhost:5173", // <-- Replace with your frontend URL
    credentials: true,               // Allow cookies to be sent
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
