import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config.js";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// Middleware para configurar el encabezado Cache-Control en todas las respuestas
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store"); // Establece el valor no-store para evitar el almacenamiento en caché
  next();
});

app.use(
  cors({
    origin: process.env.LOCAL_CORS,
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;
