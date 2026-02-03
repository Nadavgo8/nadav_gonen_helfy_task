export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
      }}
    >
      <div style={{ fontWeight: 600 }}>
        {task.title}
        {task.completed && " done "}
      </div>

      <div style={{ fontSize: 14}}>
        {task.description}
      </div>

      <div style={{ marginTop: 6, fontSize: 12 }}>
        Priority: {task.priority}
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button onClick={() => onToggle(task)} style={{ borderColor: "grey", background: "#d3d3d3ff" }}>
          {task.completed ? "Undo" : "Done"}
        </button>

        <button
          onClick={() => onDelete(task)}
          style={{ borderColor: "#ffb0b0", background: "#ffecec" }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
