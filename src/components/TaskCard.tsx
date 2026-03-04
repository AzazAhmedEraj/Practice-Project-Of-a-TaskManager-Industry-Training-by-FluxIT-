import { Task, TaskStatus } from "../types";

interface Props {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export default function TaskCard({ task, onStatusChange }: Props) {
  const priorityColors: Record<string, string> = {
    High: "#ff4d4f",
    Medium: "#faad14",
    Low: "#52c41a",
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span
          className="priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>
      <p className="task-title">{task.title}</p>
      <div className="task-footer">
        <span className="task-date">{task.createdAt}</span>
        <select
          className="status-select"
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
    </div>
  );
}