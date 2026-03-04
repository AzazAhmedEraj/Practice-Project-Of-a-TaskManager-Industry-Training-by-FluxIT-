export type TaskStatus = "Todo" | "In Progress" | "Done";

export type TaskPriority = "Low" | "Medium" | "High";

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}