// store/taskStore.ts
import { create } from "zustand";

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  removeTask: (id: number) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
  })),
  removeTask: (id) => set((state) => ({ 
    tasks: state.tasks.filter(t => t.id !== id) 
  })),
}));