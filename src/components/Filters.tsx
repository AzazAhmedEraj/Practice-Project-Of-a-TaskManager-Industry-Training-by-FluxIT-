// Filters.tsx
// Fix #4: Removed "FILTER" label text. Search box fills the space naturally.

import { Filters } from "../types";
import "./Filters.css";

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export default function FiltersPanel({ filters, onChange }: Props) {
  const hasActive =
    filters.search !== "" ||
    filters.status !== "All" ||
    filters.priority !== "All";

  return (
    <div className="filters-panel">
      {/* Fix #4: No FILTER label — search box fills the row */}
      <input
        className="filter-input"
        type="text"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />

      <select
        className="filter-select"
        value={filters.status}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value as Filters["status"] })
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
          onChange({ ...filters, priority: e.target.value as Filters["priority"] })
        }
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {hasActive && (
        <button
          className="filter-reset-btn"
          onClick={() => onChange({ search: "", status: "All", priority: "All" })}
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}
