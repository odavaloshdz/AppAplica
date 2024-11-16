import React, { useState } from 'react';
import { 
  Package,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Users,
  Database,
  HardDrive,
  Check,
  X
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PackageList = () => {
  const { isDarkMode } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - replace with actual API calls
  const packages = [
    {
      id: 1,
      name: 'Starter',
      price: 49,
      interval: 'month',
      features: {
        users: 5,
        storage: '5 GB',
        products: 1000,
        locations: 1
      },
      active: true
    },
    {
      id: 2,
      name: 'Professional',
      price: 99,
      interval: 'month',
      features: {
        users: 10,
        storage: '20 GB',
        products: 5000,
        locations: 3
      },
      active: true
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 199,
      interval: 'month',
      features: {
        users: 'Unlimited',
        storage: '100 GB',
        products: 'Unlimited',
        locations: 'Unlimited'
      },
      active: true
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subscription Packages
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your subscription packages and pricing
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                   flex items-center gap-2"
        >
          <Plus size={20} />
          Add Package
        </button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {pkg.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${pkg.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /{pkg.interval}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <Edit size={20} />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-500">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {pkg.features.users} users
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <HardDrive className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {pkg.features.storage} storage
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {pkg.features.products} products
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {pkg.features.locations} locations
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full px-4 py-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20
                               rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
                  Edit Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;