// TaskBoard.tsx
// No "See More" — columns scroll freely showing all tasks.
// Cards are compact so 2 fit when title+description are short.

import { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "../types";
import TaskCard from "./TaskCard";
import "./TaskBoard.css";

const COLUMNS: { status: TaskStatus; dotClass: string }[] = [
  { status: "Todo",        dotClass: "Todo" },
  { status: "In Progress", dotClass: "InProgress" },
  { status: "Done",        dotClass: "Done" },
];

interface Props {
  tasks: Task[];
  isAdmin?: boolean;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onAddTask?: (title: string, desc: string, priority: TaskPriority) => void;
  onEditTask?: (id: string, title: string, desc: string, priority: TaskPriority) => void;
  onDeleteTask?: (id: string) => void;
}

export default function TaskBoard({
  tasks,
  isAdmin = false,
  onStatusChange,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: Props) {
  const [addingInCol, setAddingInCol] = useState<TaskStatus | null>(null);
  const [addTitle, setAddTitle] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [addPriority, setAddPriority] = useState<TaskPriority>("Medium");

  function openAddForm(status: TaskStatus) {
    setAddingInCol(status);
    setAddTitle("");
    setAddDesc("");
    setAddPriority("Medium");
  }

  function confirmAdd() {
    if (addTitle.trim() && onAddTask) {
      onAddTask(addTitle.trim(), addDesc.trim(), addPriority);
      setAddingInCol(null);
    }
  }

  return (
    <div className="task-board">
      {COLUMNS.map(({ status, dotClass }) => {
        const colTasks = tasks.filter((t) => t.status === status);

        return (
          <div key={status} className="board-column">
            {/* Column Header */}
            <div className="column-header">
              <div className="column-title-group">
                <div className={`column-dot ${dotClass}`} />
                <span className="column-title">{status}</span>
                <span className="task-count-badge">{colTasks.length}</span>
              </div>
              {isAdmin && (
                <button
                  className="column-add-btn"
                  onClick={() =>
                    addingInCol === status ? setAddingInCol(null) : openAddForm(status)
                  }
                  title="Add task"
                >
                  +
                </button>
              )}
            </div>

            {/* Column body — scrolls freely, no limit */}
            <div className="column-tasks">
              {/* Add task inline form */}
              {isAdmin && addingInCol === status && (
                <div className="add-task-form">
                  <input
                    autoFocus
                    placeholder="Task title..."
                    value={addTitle}
                    onChange={(e) => setAddTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && confirmAdd()}
                  />
                  <input
                    placeholder="Description (optional)..."
                    value={addDesc}
                    onChange={(e) => setAddDesc(e.target.value)}
                  />
                  <select
                    value={addPriority}
                    onChange={(e) => setAddPriority(e.target.value as TaskPriority)}
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                  <div className="add-task-actions">
                    <button className="btn-save" onClick={confirmAdd}>✓ Add Task</button>
                    <button className="btn-cancel-sm" onClick={() => setAddingInCol(null)}>✕</button>
                  </div>
                </div>
              )}

              {colTasks.length === 0 && addingInCol !== status && (
                <div className="empty-column">
                  <span className="empty-column-icon">◌</span>
                  <span>No tasks here</span>
                </div>
              )}

              {/* ALL tasks shown — no limit, column scrolls */}
              {colTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isAdmin={isAdmin}
                  onStatusChange={onStatusChange}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
