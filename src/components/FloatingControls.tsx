import React, { useState } from 'react';
import { Settings, Plus, Minus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AppearanceSettings from '../pages/settings/AppearanceSettings';

const FloatingControls = () => {
  const { fontSize, setFontSize } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 flex items-center gap-2 z-50">
        {/* Font Size Controls */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setFontSize(fontSize - 1)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="Decrease font size"
          >
            <Minus size={18} />
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[2rem] text-center">
            {fontSize}
          </span>
          <button
            onClick={() => setFontSize(fontSize + 1)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            title="Increase font size"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Settings Button */}
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          title="Open settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowSettings(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Appearance Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                ×
              </button>
            </div>
            <AppearanceSettings />
          </div>
        </>
      )}
    </>
  );
};

export default FloatingControls;