import { useState } from "react";

export default function TaskForm({ onCreate, disabled }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  function handleSubmit(e) {
    e.preventDefault();
    onCreate({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h2>Create task</h2>

      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          minLength={2}
          required
          disabled={disabled}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          minLength={2}
          required
          disabled={disabled}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <select
          value={priority}
          disabled={disabled}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>

      <button type="submit" disabled={disabled}>
        Add task
      </button>
    </form>
  );
}
