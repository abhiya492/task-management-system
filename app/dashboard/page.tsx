// app/dashboard/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import TaskList from "@/components/TaskList";
import TaskCalendar from "@/components/TaskCalendar";
import StatCard from "@/components/StatCard";
import { useTaskStore } from "@/store/taskStore";

export default function Dashboard() {
  const { tasks, setTasks } = useTaskStore();
  
  const { data: stats } = useQuery({
    queryKey: ["taskStats"],
    queryFn: async () => {
      const res = await fetch("/api/tasks/stats");
      return res.json();
    },
  });

  useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
      return data;
    },
  });

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* ... existing layout ... */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Tasks" 
            value={tasks.length}
            trend={stats?.totalTasks || 0}
          />
          {/* Add other stat cards */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <TaskList tasks={tasks} />
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <TaskCalendar tasks={tasks} />
          </div>
        </div>
      </main>
    </div>
  );
}