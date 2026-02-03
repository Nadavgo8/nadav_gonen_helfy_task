import TaskItem from "./TaskItem";
import "../styles/TaskList.css"

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  // duplicate tasks for seamless looping
  const loopTasks = [...tasks, ...tasks];

  return (
    <div className="carousel">
      <div className="track">
        {loopTasks.map((task, idx) => (
          <TaskItem
            key={`${task.id}-${idx}`}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
