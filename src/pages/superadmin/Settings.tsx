import React from 'react';
import { 
  Settings,
  Mail,
  CreditCard,
  Globe,
  Bell,
  Shield,
  Database
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SuperadminSettings = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          System Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Configure your system-wide settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <div className={`rounded-lg border
                      ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-500" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                General Settings
              </h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                System Name
              </label>
              <input
                type="text"
                className={`mt-1 block w-full rounded-md shadow-sm
                         ${isDarkMode 
                           ? 'bg-gray-700 border-gray-600 text-white' 
                           : 'bg-white border-gray-300 text-gray-900'}
                         focus:border-blue-500 focus:ring-blue-500`}
                defaultValue="ERP System"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Default Language
              </label>
              <select
                className={`mt-1 block w-full rounded-md shadow-sm
                         ${isDarkMode 
                           ? 'bg-gray-700 border-gray-600 text-white' 
                           : 'bg-white border-gray-300 text-gray-900'}
                         focus:border-blue-500 focus:ring-blue-500`}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className={`rounded-lg border
                      ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-purple-500" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Email Settings
              </h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SMTP Host
              </label>
              <input
                type="text"
                className={`mt-1 block w-full rounded-md shadow-sm
                         ${isDarkMode 
                           ? 'bg-gray-700 border-gray-600 text-white' 
                           : 'bg-white border-gray-300 text-gray-900'}
                         focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SMTP Port
              </label>
              <input
                type="text"
                className={`mt <boltAction type="file" filePath="src/pages/superadmin/Settings.tsx">-1 block w-full rounded-md shadow-sm
                         ${isDarkMode 
                           ? 'bg-gray-700 border-gray-600 text-white' 
                           : 'bg-white border-gray-300 text-gray-900'}
                         focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className={`rounded-lg border
                      ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-green-500" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Payment Settings
              </h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stripe Public Key
              </label>
              <input
                type="text"
                className={`mt-1 block w-full rounded-md shadow-sm
                         ${isDarkMode 
                           ? 'bg-gray-700 border-gray-600 text-white' 
                           : 'bg-white border-gray-300 text-gray-900'}
                         focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stripe Secret Key
              </label>
              <input
                type="password"
                className={`mt-1 block w-full rounded-md shadow-sm
                         ${isDarkMode 
                           ? 'bg-gray-700 border-gray-600 text-white' 
                           : 'bg-white border-gray-300 text-gray-900'}
                         focus:border-blue-500 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={`rounded-lg border
                      ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-yellow-500" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Notification Settings
              </h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email notifications for important events
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer
                            dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                            after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                            after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  System Alerts
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified about system updates and maintenance
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer
                            dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                            after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                            after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SuperadminSettings;