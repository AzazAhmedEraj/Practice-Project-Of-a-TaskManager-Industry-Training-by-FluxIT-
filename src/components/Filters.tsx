import { TaskStatus, TaskPriority } from "../types";

interface FiltersState {
  search: string;
  status: TaskStatus | "All";
  priority: TaskPriority | "All";
}

interface Props {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

export default function Filters({ filters, onChange }: Props) {
  return (
    <div className="filters-panel">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        className="search-input"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />
      <select
        className="filter-select"
        value={filters.status}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value as TaskStatus | "All" })
        }
      >
        <option value="All">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <select
        className="filter-select"
        value={filters.priority}
        onChange={(e) =>
          onChange({
            ...filters,
            priority: e.target.value as TaskPriority | "All",
          })
        }
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}