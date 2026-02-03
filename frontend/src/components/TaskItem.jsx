export default function TaskItem({ task }) {
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
        {task.completed && " done"}
      </div>

      <div style={{ fontSize: 14 }}>
        {task.description}
      </div>

      <div style={{ marginTop: 6, fontSize: 12 }}>
        Priority: {task.priority}
      </div>
    </li>
  );
}
