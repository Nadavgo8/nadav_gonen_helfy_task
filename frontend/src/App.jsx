import { useEffect, useState } from "react";
import { tasksApi } from "./services/tasksApi";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await tasksApi.getAll();
        setTasks(data);
      } catch (err) {
        setError(err.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleCreate(task) {
    setError("");
    try {
      const created = await tasksApi.create(task);
      setTasks((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.message || "Failed to create task");
    }
  }

  async function handleToggle(task) {
    setError("");
    try {
      const updated = await tasksApi.toggle(task.id);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? updated : t))
      );
    } catch (err) {
      setError(err.message || "Failed to toggle task");
    }
  }

  async function handleDelete(task) {
    const ok = window.confirm(`Delete "${task.title}"?`);
    if (!ok) return;

    setError("");
    try {
      await tasksApi.remove(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <TaskForm onCreate={handleCreate} disabled={loading} />
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
