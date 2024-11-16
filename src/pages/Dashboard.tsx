import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome to ERP System
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Select a module from the sidebar to get started.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;