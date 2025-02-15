import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, icon, children }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {title && (
        <div className="flex items-center space-x-4 mb-4">
          {icon && <div className="text-blue-500 text-3xl">{icon}</div>}
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
        </div>
      )}
      {children ? (
        <div className="relative z-10">{children}</div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
    </div>
  );
};

export default Card;
