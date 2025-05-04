export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  subRole: string | null;
}

export interface Activity {
  _id: string;
  type: string;
  activity?: string;
  by: User;
  date: string;
  __v: number;
}

export interface SubTask {
  _id: string;
  title: string;
  date: string;
  tag: string;
  status: string;
}
export interface createdByProject {
  _id: string;
  name: string;
  role: string;
  email: string;
}
export interface Project {
  _id: string;
  name: string;
  description: string;
  createdBy: createdByProject;
  teamMembers: string[];
  startDate: string;
  tasks: string[];
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  __v: number;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: User[];
  priority: string;
  stage: string;
  activities: Activity[];
  subTasks: SubTask[];
  assets: string[];
  project: Project;
  dueDate: string;
  logs: any[];
  comments: any[];
  createdAt: string;
  updatedAt: string;
  completedSubTasks: number;
  __v: number;
}

export const Task_Data: Task[] = [
]
export interface PriorityChartItem {
  name: 'high' | 'medium' | 'normal' | string;
  total: number;
}

export interface ProjectProgressItem {
  completed: number;
  inProgress: number;
  month: string;
}

export interface ProjectStatusTotal {
  Completed: number;
  'In Progress': number;
  'Not Started': number;
  Total: number;
}

export interface TaskCompletionByTeamItem {
  completed: number;
  team: string;
}

export interface TaskDueCompletedItem {
  completed: number;
  due: number;
  month: string;
}

export interface TaskStatusItem {
  name: 'todo' | 'in progress' | 'completed' | string;
  value: number;
}

export interface TaskStatusTotal {
  completed: number;
  'in progress': number;
  todo: number;
  total: number;
}

export interface SummaryData {
  PriorityChartData: PriorityChartItem[];
  ProjectProgressData: ProjectProgressItem[];
  ProjectStatusTotal: ProjectStatusTotal;
  TaskCompletionByTeamData: TaskCompletionByTeamItem[];
  TaskDueCompletedData: TaskDueCompletedItem[];
  TaskStatusData: TaskStatusItem[];
  TaskStatusTotal: TaskStatusTotal;
}
