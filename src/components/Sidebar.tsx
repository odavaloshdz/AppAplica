import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  ShoppingCart,
  Package,
  BarChart2,
  ChevronDown,
  Settings,
  LogOut,
  CreditCard,
  Shield,
  Box,
  Grid,
  Palette,
  DollarSign,
  Truck,
  FileText,
  Clock,
  Tag,
  Boxes
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../lib/auth';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { isDarkMode } = useTheme();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      size: 24
    },
    {
      title: 'Sales',
      icon: ShoppingCart,
      path: '/sales',
      size: 24,
      submenu: [
        {
          title: 'New Sale',
          path: '/sales/new',
          icon: DollarSign,
          size: 20,
          highlight: true
        },
        {
          title: 'Sales History',
          path: '/sales/history',
          icon: Clock,
          size: 20
        },
        {
          title: 'Quotations',
          path: '/sales/quotations',
          icon: FileText,
          size: 20
        }
      ]
    },
    {
      title: 'Inventory',
      icon: Package,
      path: '/inventory',
      size: 24,
      submenu: [
        {
          title: 'Products',
          path: '/inventory/products',
          icon: Box,
          size: 20
        },
        {
          title: 'Categories',
          path: '/inventory/categories',
          icon: Grid,
          size: 20
        },
        {
          title: 'Stock Transfer',
          path: '/inventory/transfer',
          icon: Truck,
          size: 20
        }
      ]
    },
    {
      title: 'Customers',
      icon: Users,
      path: '/customers',
      size: 24
    },
    {
      title: 'Reports',
      icon: BarChart2,
      path: '/reports',
      size: 24
    }
  ];

  // Add superadmin menu items if user has superadmin role
  if (user?.roles?.includes('superadmin')) {
    menuItems.unshift({
      title: 'Superadmin',
      icon: Shield,
      path: '/superadmin',
      size: 24,
      submenu: [
        {
          title: 'Dashboard',
          path: '/superadmin',
          icon: Home,
          size: 20
        },
        {
          title: 'Businesses',
          path: '/superadmin/businesses',
          icon: Boxes,
          size: 20
        },
        {
          title: 'Packages',
          path: '/superadmin/packages',
          icon: Tag,
          size: 20
        }
      ]
    });
  }

  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] z-20
      ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}
      border-r transition-all duration-300
      ${collapsed ? 'w-20' : 'w-64'}
      overflow-hidden
    `}>
      <nav className="h-full flex flex-col">
        <div className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.path}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    setExpandedMenu(expandedMenu === item.path ? null : item.path);
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3
                  ${location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
                  ${collapsed ? 'justify-center' : 'justify-between'}
                  transition-colors duration-200
                `}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon size={item.size} />
                  {!collapsed && (
                    <span className="truncate text-sm">{item.title}</span>
                  )}
                </div>
                {!collapsed && item.submenu && (
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200
                            ${expandedMenu === item.path ? 'rotate-180' : ''}`}
                  />
                )}
              </button>

              {!collapsed && item.submenu && expandedMenu === item.path && (
                <div className="pl-12 py-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.path}
                      onClick={() => navigate(subItem.path)}
                      className={`
                        w-full text-left py-2 px-4 rounded-lg
                        flex items-center gap-2 text-sm
                        ${subItem.highlight ? 'bg-primary text-white hover:bg-primary-dark' : ''}
                        ${!subItem.highlight && location.pathname === subItem.path
                          ? 'bg-primary/10 text-primary'
                          : !subItem.highlight && 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
                        transition-colors duration-200
                      `}
                    >
                      <subItem.icon size={subItem.size} />
                      <span className="truncate">{subItem.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-3 px-4 py-2 text-gray-600
                     dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 
                     rounded-lg transition-colors duration-200"
          >
            <Settings size={24} />
            {!collapsed && <span className="text-sm">Settings</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600
                     hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg 
                     transition-colors duration-200 mt-2"
          >
            <LogOut size={24} />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;