// components/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  trend?: number;
  color?: "blue" | "green" | "red" | "purple";

}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400',
  },
};

export default function StatCard({ title, value, icon, color = 'blue' }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
        <div className={`p-3 ${colorClasses[color].bg} rounded-lg`}>
          <div className={colorClasses[color].text}>{icon}</div>
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
        {value}
      </p>
    </div>
  );
}