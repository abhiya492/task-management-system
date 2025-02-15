// components/TaskList.tsx
"use client";

import { useTaskStore } from "@/store/taskStore";

export default function TaskList() {
  const { tasks } = useTaskStore();

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div key={`${task.id}-${index}`} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className={`badge ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </span>
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function getPriorityClass(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-green-100 text-green-800";
  }
}
