export default function TaskFilter({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
      <button
        onClick={() => onChange("all")}
        style={{ fontWeight: value === "all" ? "bold" : "normal" }}
      >
        All
      </button>
      <button
        onClick={() => onChange("pending")}
        style={{ fontWeight: value === "pending" ? "bold" : "normal" }}
      >
        Pending
      </button>
      <button
        onClick={() => onChange("completed")}
        style={{ fontWeight: value === "completed" ? "bold" : "normal" }}
      >
        Completed
      </button>
    </div>
  );
}
