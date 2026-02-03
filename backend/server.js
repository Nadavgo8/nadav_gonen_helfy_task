import express from "express";
import cors from "cors";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFound, errorHandler } from "./middleware/errorhandler.js";

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(requestLogger);
import tasksRouter from "./routes/tasks.js"
app.use("/api/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
