import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Globe size={20} />
        <span>{languages.find(l => l.code === currentLanguage)?.name}</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg
                    border border-gray-200 dark:border-gray-700 py-1">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`
              w-full px-4 py-2 text-left text-sm
              ${currentLanguage === language.code
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
};