import { Router } from "express";
import { validateCreateTask, validateUpdateTask } from "../middleware/validateTask.js";

const router = Router();

let tasks = [];//tasks array
let numOfTasks = 0;//used for id count

//helper functions
function findTask(id) {
  return tasks.find((t) => t.id === id);
}

function parseId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <=0) {
    res.status(400).json({ message: "Invalid id" });
    return null;
  }
  return id;
}


router.get("/", (req, res) => {
    res.json(tasks);
})
router.post("/",validateCreateTask, (req, res) => {
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
router.put("/:id",validateUpdateTask, (req, res) => {
    const id = parseId(req, res);
    if (id === null) return;

    const task = findTask(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { title, description, priority, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
})
router.delete("/:id", (req, res) => {
    const id = parseId(req, res);
    if (id === null) return;

    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ message: "Task not found" });

    tasks.splice(idx, 1);
    res.status(204).send();
})
router.patch("/:id/toggle", (req, res) => {
    const id = parseId(req, res);
    if (id === null) return;

    const t = findTask(id);
    if (!t) return res.status(404).json({ message: "Task not found" });

    t.completed = !t.completed;
    res.json(t);
})
export default router;