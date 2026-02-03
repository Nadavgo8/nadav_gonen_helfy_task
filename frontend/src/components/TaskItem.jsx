import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  function startEdit() {
    setDraft({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
    setEditing(true);
  }

  function save() {
    onEdit(task.id, draft);
    setEditing(false);
  }

  return (
    <li
      style={{
        width: 260, flex: "0 0 auto",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        opacity: task.completed ? 0.7 : 1,
      }}
    >
      {!editing ? (
        <>
          <div style={{ fontWeight: 600 }}>
            {task.title}
            {task.completed && " done "}
          </div>

          <div style={{ fontSize: 14 }}>
            {task.description}
          </div>

          <div style={{ marginTop: 6, fontSize: 12 }}>
            Priority: <strong>{task.priority}</strong>
          </div>

          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button onClick={() => onToggle(task)}>
              {task.completed ? "Undo" : "Done"}
            </button>
            <button onClick={startEdit}>Edit</button>
            <button
              onClick={() => onDelete(task)}
              style={{ borderColor: "#ffb0b0", background: "#ffecec" }}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
          <input
            value={draft.description}
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
          />
          <select
            value={draft.priority}
            onChange={(e) =>
              setDraft({ ...draft, priority: e.target.value })
            }
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      )}
    </li>
  );
}
