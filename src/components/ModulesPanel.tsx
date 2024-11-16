import React, { useEffect } from 'react';
import { X, Download, Lock, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

interface ModulesPanelProps {
  isOpen: boolean;
  setModulesPanelOpen: (open: boolean) => void;
}

const ModulesPanel: React.FC<ModulesPanelProps> = ({ isOpen, setModulesPanelOpen }) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModulesPanelOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [setModulesPanelOpen]);

  const modules = [
    {
      id: 'pos',
      name: 'Point of Sale',
      description: 'Complete retail management system',
      status: 'available',
      price: '$49/month',
    },
    {
      id: 'inventory',
      name: 'Inventory Management',
      description: 'Track and manage your stock efficiently',
      status: 'installed',
    },
    {
      id: 'crm',
      name: 'CRM',
      description: 'Customer relationship management',
      status: 'locked',
      requirements: ['Basic Plan'],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'installed':
        return <Check className="text-green-500" size={20} />;
      case 'available':
        return <Download className="text-blue-500" size={20} />;
      case 'locked':
        return <Lock className="text-gray-400" size={20} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setModulesPanelOpen(false)}
      />
      
      <div className={`
        fixed right-0 top-0 h-full w-96 z-50
        ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
        border-l ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
        shadow-xl
      `}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('modules.title')}
            </h2>
            <button
              onClick={() => setModulesPanelOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                       text-gray-500 dark:text-gray-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('modules.description')}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`
                p-4 rounded-lg border
                ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
                ${module.status === 'locked' ? 'opacity-75' : ''}
              `}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {module.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {module.description}
                  </p>
                </div>
                {getStatusIcon(module.status)}
              </div>

              {module.status === 'available' && module.price && (
                <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white
                               rounded-lg hover:bg-blue-600 transition-colors">
                  {t('modules.actions.install')} - {module.price}
                </button>
              )}

              {module.status === 'locked' && module.requirements && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('modules.requirements')}: {module.requirements.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ModulesPanel;