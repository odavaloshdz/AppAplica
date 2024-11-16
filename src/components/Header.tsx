import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Search,
  Sun,
  Moon,
  Grid,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Menu as MenuIcon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../lib/auth';

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  modulesPanelOpen: boolean;
  setModulesPanelOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  collapsed,
  setCollapsed,
  modulesPanelOpen,
  setModulesPanelOpen,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('AplicaPos');

  useEffect(() => {
    // Load logo and company name from localStorage
    const savedLogo = localStorage.getItem('appLogo');
    const savedName = localStorage.getItem('companyName');
    
    if (savedLogo) setLogo(savedLogo);
    if (savedName) setCompanyName(savedName);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`
      fixed top-0 right-0 left-0 h-16 z-30
      ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}
      border-b transition-all duration-300
    `}>
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                     text-gray-500 dark:text-gray-400 transition-colors
                     border border-gray-200 dark:border-gray-700"
          >
            <MenuIcon size={24} className={`transform transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
          {logo ? (
            <img src={logo} alt={companyName} className="h-8" />
          ) : (
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              {companyName}
            </span>
          )}
        </div>

        {/* Rest of the header content remains the same */}
      </div>
    </header>
  );
};

export default Header;