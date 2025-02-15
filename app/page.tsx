// app/page.tsx
import Link from 'next/link';
import Card from '@/components/Card';
import CreateTaskForm from '@/components/CreateTaskForm';
import TaskCalendar from '@/components/TaskCalendar';
import TaskList from '@/components/TaskList';
import { PlusIcon, CalendarIcon, ClipboardIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="py-24 bg-white dark:bg-gray-900 text-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-12">
          <h1 className="text-5xl font-extrabold leading-tight">
            Streamline Your <span className="text-blue-600">Project Management</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Organize tasks, collaborate with your team, and boost productivity with ease.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/auth/signup"
              className="rounded-full bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-500 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <h2 className="text-3xl font-bold text-center mb-10">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card title="Create Task" icon={<PlusIcon className="h-10 w-10" />}>
              <CreateTaskForm />
            </Card>
            <Card title="Task List" icon={<ClipboardIcon className="h-10 w-10" />}>
              <TaskList />
            </Card>
            <Card title="Task Calendar" icon={<CalendarIcon className="h-10 w-10" />}>
              <TaskCalendar />
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
