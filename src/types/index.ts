export type TaskStatus = "Todo" | "In Progress" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}

export interface Filters {
  search: string;
  status: TaskStatus | "All";
  priority: TaskPriority | "All";
}

export interface AuthUser {
  username: string;
  role: "admin";
}

export interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  percentage: number;
  highPriority: number;
}