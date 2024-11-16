import React from 'react';
import { Upload } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MediaUploaderProps {
  accept?: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
  description?: string;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  accept,
  multiple = false,
  onChange,
  description,
}) => {
  const { isDarkMode } = useTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onChange(files);
  };

  return (
    <label className="block">
      <div className={`
        border-2 border-dashed rounded-lg cursor-pointer
        ${isDarkMode 
          ? 'border-gray-700 hover:border-blue-500 bg-gray-800/50' 
          : 'border-gray-300 hover:border-blue-500 bg-gray-50'}
        transition-colors duration-200
      `}>
        <div className="p-6 flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Drop files here or click to upload
          </p>
          {description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
      <input
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
    </label>
  );
};