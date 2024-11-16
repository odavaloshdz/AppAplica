import React, { useState } from 'react';
import { Settings, Building2, Palette } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import AppearanceSettings from './AppearanceSettings';
import CompanySettings from './CompanySettings';

const SettingsPage = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    {
      id: 'company',
      label: 'Company',
      icon: <Building2 className="w-5 h-5" />,
      component: <CompanySettings />
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: <Palette className="w-5 h-5" />,
      component: <AppearanceSettings />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Settings className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your application settings
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>
        {tabs.find(tab => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default SettingsPage;