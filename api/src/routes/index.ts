import express from "express";
import authRoutes from "./auth";
import postsRoutes from "./posts";

const app = express();

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/posts", postsRoutes);

export default app;
