import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Building2, 
  CreditCard, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Settings,
  Bell
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const SuperadminDashboard = () => {
  const { isDarkMode } = useTheme();

  // Mock data - replace with actual API calls
  const stats = {
    totalBusinesses: 156,
    activeSubscriptions: 142,
    monthlyRevenue: 15600,
    yearlyRevenue: 187200,
    recentSubscriptions: [
      {
        id: 1,
        businessName: 'Tech Solutions Inc',
        package: 'Enterprise',
        amount: 199,
        date: '2024-02-15'
      },
      {
        id: 2,
        businessName: 'Global Retail Ltd',
        package: 'Professional',
        amount: 99,
        date: '2024-02-14'
      }
    ],
    pendingApprovals: [
      {
        id: 1,
        businessName: 'New Ventures Co',
        type: 'Business Registration',
        date: '2024-02-15'
      },
      {
        id: 2,
        businessName: 'Digital Services LLC',
        type: 'Subscription Payment',
        date: '2024-02-14'
      }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Superadmin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your system's performance and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Businesses */}
        <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Businesses
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalBusinesses}
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
              <Building2 className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12%</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Subscriptions
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.activeSubscriptions}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/20">
              <CreditCard className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">8%</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Monthly Revenue
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                ${stats.monthlyRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/20">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500 font-medium">3%</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
          </div>
        </div>

        {/* Yearly Revenue */}
        <div className={`p-6 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Yearly Revenue
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                ${stats.yearlyRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
              <DollarSign className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">15%</span>
            <span className="ml-2 text-gray-500 dark:text-gray-400">from last year</span>
          </div>
        </div>
      </div>

      {/* Recent Activity & Pending Approvals */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Subscriptions */}
        <div className={`rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Subscriptions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentSubscriptions.map((subscription) => (
                <div key={subscription.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                      <Package className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {subscription.businessName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {subscription.package} Package
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${subscription.amount}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(subscription.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className={`rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Pending Approvals
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-yellow-50 dark:bg-yellow-900/20">
                      <Bell className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {approval.businessName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {approval.type}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 dark:bg-blue-900/20 
                                   rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminDashboard;