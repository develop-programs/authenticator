import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/config.js";

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(morgan("combined"));
app.use(cors(config.corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.stack}`);
  res.status(err.status || 500).json({
    status: "error",
    message:
      config.nodeEnv === "production" ? "Internal server error" : err.message,
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully.`);
  mongoose.connection.close(false).then(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
};

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      maxIdleTimeMS: 30000,
      maxPoolSize: 10,
      dbName: "testing",
    });
    console.log("Connected to MongoDB");

    const server = app.listen(config.port, () => {
      console.log(
        `Server running in ${config.nodeEnv} mode on port ${config.port}`
      );
    });

    // Handle shutdown signals
    ["SIGTERM", "SIGINT"].forEach((signal) => {
      process.on(signal, () => gracefulShutdown(signal));
    });

    // Handle unhandled rejections
    process.on("unhandledRejection", (err) => {
      console.error("[Unhandled Rejection]", err);
      server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
