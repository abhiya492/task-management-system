// src/components/TaskCalendar.tsx
"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface Task {
  id: number;
  title: string;
  dueDate: string;
}

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function TaskCalendar() {
  const { data: tasks } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const events =
    tasks?.map((task) => ({
      title: task.title,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
    })) || [];

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="rounded-lg"
      />
    </div>
  );
}
