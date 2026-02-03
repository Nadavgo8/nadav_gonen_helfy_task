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

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <TaskForm onCreate={handleCreate} disabled={loading} />
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <TaskList tasks={tasks} />}
    </div>
  );
}
