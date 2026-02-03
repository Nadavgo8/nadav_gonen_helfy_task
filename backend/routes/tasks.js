import { Router } from "express";
const router = Router();

let tasks = [];//tasks array
let numOfTasks = 0;//used for id count

//helper functions
function findTask(id) {
  return tasks.find((t) => t.id === id);
}

function parseId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ message: "Invalid id" });
    return null;
  }
  return id;
}


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
router.put("/:id", (req, res) => {
    console.log("update task");
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
    console.log("delete task with id");
    const id = parseId(req, res);
    if (id === null) return;

    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(404).json({ message: "Task not found" });

    tasks.splice(idx, 1);
    res.status(204).send();
})
router.patch("/:id/toggle", (req, res) => {
    console.log("toggle");
})
export default router;