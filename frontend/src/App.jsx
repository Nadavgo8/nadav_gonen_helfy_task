import { useEffect, useMemo, useState } from "react";
import { tasksApi } from "./services/tasksApi";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
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

  const visibleTasks = useMemo(() => {
    if (filter === "pending") return tasks.filter(t => !t.completed);
    if (filter === "completed") return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  async function handleCreate(task) {
    setError("");
    try {
      const created = await tasksApi.create(task);
      setTasks(prev => [created, ...prev]);
    } catch (err) {
      setError(err.message || "Failed to create task");
    }
  }

  async function handleToggle(task) {
    setError("");
    try {
      const updated = await tasksApi.toggle(task.id);
      setTasks(prev =>
        prev.map(t => (t.id === task.id ? updated : t))
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
      setTasks(prev => prev.filter(t => t.id !== task.id));
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  }

  async function handleEdit(id, updates) {
    setError("");
    try {
      const updated = await tasksApi.update(id, updates);
      setTasks(prev =>
        prev.map(t => (t.id === id ? updated : t))
      );
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>

      <TaskForm onCreate={handleCreate} disabled={loading} />

      <TaskFilter value={filter} onChange={setFilter} />

      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
