import { Task, TaskStatus } from "../types";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const COLUMNS: TaskStatus[] = ["Todo", "In Progress", "Done"];

export default function TaskBoard({ tasks, onStatusChange }: Props) {
  return (
    <div className="task-board">
      {COLUMNS.map((col) => (
        <div key={col} className="board-column">
          <div className="column-header">
            <h3>{col}</h3>
            <span className="task-count">
              {tasks.filter((t) => t.status === col).length}
            </span>
          </div>
          <div className="column-tasks">
            {tasks
              .filter((t) => t.status === col)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={onStatusChange}
                />
              ))}
            {tasks.filter((t) => t.status === col).length === 0 && (
              <p className="empty-col">No tasks here</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}