import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import { errorMiddleware } from "./src/middleware/error.middleware.js";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CivicSense backend is running"
    });
});


app.use("/api/auth", authRoutes);
app.use(errorMiddleware);

export default app;