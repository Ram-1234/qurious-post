import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import postRoute from "./routes/post.route.js";
import userAuth from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import newsRoute from "./routes/news.route.js";
import {connectDB} from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({ origin: process.env.DATA_CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/post", postRoute);
app.use("/api/auth", userAuth);
app.use("/api/users", userRoute);
app.use("/api/test", testRoute);
app.use("/api/news", newsRoute);

// Catch-all 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// Global error handler — keeps error responses in JSON, matches your API style
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();