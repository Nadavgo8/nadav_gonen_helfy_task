import { Router } from "express";

let tasks = [];
let numOfTasks = 0;
const router = Router();
router.get("/", (req, res) => {
    console.log("get tasks");
    res.json(tasks);
})
router.post("/", (req, res) => {
    console.log("post tasks");
    const { title, description, priority } = req.body;
    const task = {
        id: ++numOfTasks,
        title,
        description,
        completed: false,
        createdAt: new Date().toDateString(),
        priority,
  };

  tasks.push(task);
  res.status(201).json(task);
})
router.get("/:id", (req, res) => {
    console.log("get task with id");
})
router.delete("/:id", (req, res) => {
    console.log("delete task with id");
})
router.patch("/:id/toggle", (req, res) => {
    console.log("toggle");
})
export default router;