export interface Task {
  id: string;
  title: string;
  description?: string;
  setReminder: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  deletedAt: string | null;
}

export const initialTaskState: Task = Object.freeze({
  title: '',
  description: '',
  dueDate: '',
  setReminder: false,
  completedAt: null,
  deletedAt: null,
} as Task);
