import { useState, useEffect } from "react";
import { Project, Task, TaskStatus, TaskPriority, Filters, ProjectStats } from "../types";
import projectsData from "../data/projects.json";
import tasksData from "../data/tasks.json";

const TASKS_KEY = "eraj_tasks";
const PROJECTS_KEY = "eraj_projects";

export function useProjectData() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(PROJECTS_KEY);
    return saved ? JSON.parse(saved) : (projectsData as Project[]);
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(TASKS_KEY);
    return saved ? JSON.parse(saved) : (tasksData as Task[]);
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    () => (JSON.parse(localStorage.getItem(PROJECTS_KEY) || "[]")[0]?.id || projectsData[0]?.id || "")
  );

  const [filters, setFilters] = useState<Filters>({ search: "", status: "All", priority: "All" });

  useEffect(() => { localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects)); }, [projects]);

  const projectTasks = tasks.filter((t) => t.projectId === selectedProjectId);

  const filteredTasks = projectTasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = filters.status === "All" || t.status === filters.status;
    const matchPriority = filters.priority === "All" || t.priority === filters.priority;
    return matchSearch && matchStatus && matchPriority;
  });

  const stats: ProjectStats = {
    total: projectTasks.length,
    completed: projectTasks.filter((t) => t.status === "Done").length,
    inProgress: projectTasks.filter((t) => t.status === "In Progress").length,
    todo: projectTasks.filter((t) => t.status === "Todo").length,
    percentage: projectTasks.length === 0 ? 0 : Math.round((projectTasks.filter((t) => t.status === "Done").length / projectTasks.length) * 100),
    highPriority: projectTasks.filter((t) => t.priority === "High").length,
  };

  function generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function addProject(name: string, description: string) {
    const newProject: Project = { id: generateId("p"), name, description, createdAt: new Date().toISOString().split("T")[0] };
    setProjects((prev) => [...prev, newProject]);
    setSelectedProjectId(newProject.id);
  }

  function editProject(id: string, name: string, description: string) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, name, description } : p)));
  }

  function deleteProject(id: string) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTasks((prev) => prev.filter((t) => t.projectId !== id));
    const remaining = projects.filter((p) => p.id !== id);
    setSelectedProjectId(remaining[0]?.id || "");
  }

  function addTask(title: string, description: string, priority: TaskPriority) {
    if (!selectedProjectId) return;
    const newTask: Task = { id: generateId("t"), projectId: selectedProjectId, title, description, status: "Todo", priority, createdAt: new Date().toISOString().split("T")[0] };
    setTasks((prev) => [...prev, newTask]);
  }

  function editTask(id: string, title: string, description: string, priority: TaskPriority) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title, description, priority } : t)));
  }

  function updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return { projects, tasks, filteredTasks, selectedProjectId, setSelectedProjectId, filters, setFilters, stats, addProject, editProject, deleteProject, addTask, editTask, updateTaskStatus, deleteTask };
}
