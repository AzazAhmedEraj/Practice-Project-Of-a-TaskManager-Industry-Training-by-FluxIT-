import { useState, useEffect } from "react";
import { Project, Task, TaskStatus, TaskPriority } from "../types";
import projectsData from "../data/projects.json";
import tasksData from "../data/tasks.json";

// Shape of our filter settings
interface Filters {
  search: string;
  status: TaskStatus | "All";
  priority: TaskPriority | "All";
}

export function useProjectData() {
  // --- STATE ---
  const [projects] = useState<Project[]>(projectsData);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : tasksData;
  });
  const [selectedProjectId, setSelectedProjectId] = useState<string>("p1");
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "All",
    priority: "All",
  });

  // --- PERSIST TO LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // --- DERIVED STATE ---
  const projectTasks = tasks.filter(
    (t) => t.projectId === selectedProjectId
  );

  const filteredTasks = projectTasks.filter((t) => {
    const matchSearch = t.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchStatus =
      filters.status === "All" || t.status === filters.status;
    const matchPriority =
      filters.priority === "All" || t.priority === filters.priority;
    return matchSearch && matchStatus && matchPriority;
  });

  const stats = {
    total: projectTasks.length,
    completed: projectTasks.filter((t) => t.status === "Done").length,
    percentage:
      projectTasks.length === 0
        ? 0
        : Math.round(
            (projectTasks.filter((t) => t.status === "Done").length /
              projectTasks.length) *
              100
          ),
    highPriority: projectTasks.filter((t) => t.priority === "High").length,
  };

  // --- ACTIONS ---
  function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  return {
    projects,
    filteredTasks,
    selectedProjectId,
    setSelectedProjectId,
    filters,
    setFilters,
    stats,
    updateTaskStatus,
  };
}