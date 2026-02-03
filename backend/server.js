import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

import tasksRouter from "./routes/tasks.js"
app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
