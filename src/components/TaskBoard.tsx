// TaskBoard.tsx
// Fix #2: Show exactly 3 task cards, then "See More".
//         Column scrolls internally if content overflows.

import { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "../types";
import TaskCard from "./TaskCard";
import "./TaskBoard.css";

// Fix #2: changed from 4 to 3
const VISIBLE_LIMIT = 3;

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
  const [expandedCols, setExpandedCols] = useState<Set<TaskStatus>>(new Set());
  const [addingInCol, setAddingInCol] = useState<TaskStatus | null>(null);
  const [addTitle, setAddTitle] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [addPriority, setAddPriority] = useState<TaskPriority>("Medium");

  function toggleExpand(status: TaskStatus) {
    setExpandedCols((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  }

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
        const isExpanded = expandedCols.has(status);
        const hasMore = colTasks.length > VISIBLE_LIMIT;
        const visibleTasks = isExpanded ? colTasks : colTasks.slice(0, VISIBLE_LIMIT);

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
                >
                  +
                </button>
              )}
            </div>

            {/* Fix #2: column-tasks has overflow-y auto for internal scroll */}
            <div className="column-tasks">
              {/* Add task form */}
              {isAdmin && addingInCol === status && (
                <div className="add-task-form">
                  <input
                    autoFocus
                    placeholder="Task title..."
                    value={addTitle}
                    onChange={(e) => setAddTitle(e.target.value)}
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

              {colTasks.length === 0 && (
                <div className="empty-column">
                  <span className="empty-column-icon">◌</span>
                  <span>No tasks here</span>
                </div>
              )}

              {visibleTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isAdmin={isAdmin}
                  onStatusChange={onStatusChange}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}

              {hasMore && (
                <button className="see-more-btn" onClick={() => toggleExpand(status)}>
                  {isExpanded
                    ? "▲ COLLAPSE"
                    : `▼ SEE MORE (${colTasks.length - VISIBLE_LIMIT} more)`}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
