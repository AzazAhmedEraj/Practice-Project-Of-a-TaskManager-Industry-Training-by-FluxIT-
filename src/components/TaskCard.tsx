import { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "../types";
import "./TaskCard.css";

interface Props {
  task: Task;
  isAdmin?: boolean;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit?: (id: string, title: string, desc: string, priority: TaskPriority) => void;
  onDelete?: (id: string) => void;
}

export default function TaskCard({
  task,
  isAdmin = false,
  onStatusChange,
  onEdit,
  onDelete,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [editPriority, setEditPriority] = useState<TaskPriority>(task.priority);

  function confirmEdit() {
    if (editTitle.trim() && onEdit) {
      onEdit(task.id, editTitle.trim(), editDesc.trim(), editPriority);
    }
    setEditing(false);
  }

  // ── EDIT MODE ──────────────────────────────────────────────
  if (editing) {
    return (
      <div className={`task-card priority-${task.priority}`}>
        <div className="task-edit-form">
          <input
            autoFocus
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title..."
          />
          <input
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Description..."
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as TaskPriority)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <div className="task-edit-actions">
            <button className="btn-save" onClick={confirmEdit}>✓ Save</button>
            <button className="btn-cancel-sm" onClick={() => setEditing(false)}>✕</button>
          </div>
        </div>
      </div>
    );
  }

  // ── VIEW MODE ──────────────────────────────────────────────
  return (
    <div className={`task-card priority-${task.priority}`}>

      {/* Top row: priority badge + admin edit/delete buttons */}
      <div className="task-card-header">
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
        {isAdmin && (
          <div className="task-card-actions">
            <button
              className="icon-btn edit"
              title="Edit task"
              onClick={() => setEditing(true)}
            >
              ✎
            </button>
            <button
              className="icon-btn delete"
              title="Delete task"
              onClick={() => onDelete && onDelete(task.id)}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Task title */}
      <div className="task-title">{task.title}</div>

      {/* Task description */}
      {task.description && (
        <div className="task-description">{task.description}</div>
      )}

      {/* Footer: date + status (dropdown in admin, badge in view) */}
      <div className="task-footer">
        <span className="task-date">{task.createdAt}</span>

        {/* ADMIN: show dropdown to change status */}
        {isAdmin ? (
          <select
            className="status-select"
            value={task.status}
            onChange={(e) =>
              onStatusChange(task.id, e.target.value as TaskStatus)
            }
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        ) : (
          /* VIEW ONLY: show a static colored badge — no interaction */
          <span className={`status-badge status-${task.status.replace(" ", "")}`}>
            {task.status}
          </span>
        )}
      </div>
    </div>
  );
}
