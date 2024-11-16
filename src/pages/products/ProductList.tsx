import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  FileText
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../lib/db/schema';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';

const ProductList = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { products, loading, error, deleteProduct } = useProducts();
  
  // State
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'products' | 'stock'>('products');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    status: '',
  });

  // Filter products
  const filteredProducts = products?.filter(product => {
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.sku.toLowerCase().includes(filters.search.toLowerCase());
      
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesStatus = !filters.status || product.status === filters.status;
      
    return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm(t('products.confirmDelete'))) {
      try {
        await deleteProduct(id);
        toast.success(t('products.deleteSuccess'));
      } catch (error) {
        toast.error(t('products.deleteError'));
      }
    }
  };

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('products.title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('products.subtitle')}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            className={`
              px-4 py-2 rounded-lg border flex items-center gap-2
              ${isDarkMode 
                ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'}
            `}
          >
            <FileText size={20} />
            {t('common.export')}
          </button>
          
          <Link
            to="/inventory/products/new"
            className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark flex items-center gap-2"
          >
            <Plus size={20} />
            {t('products.add')}
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('common.search')}
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className={`
                w-full pl-10 pr-4 py-2 rounded-lg border
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'}
                focus:border-primary focus:ring-primary
              `}
            />
          </div>
        </div>
        
        <button
          onClick={() => setFilters(prev => ({ ...prev }))}
          className={`
            px-4 py-2 rounded-lg border flex items-center gap-2
            ${Object.values(filters).some(Boolean)
              ? 'border-primary bg-primary/10 text-primary'
              : isDarkMode
                ? 'border-gray-700 text-gray-300'
                : 'border-gray-300 text-gray-600'}
          `}
        >
          <Filter size={20} />
          {t('common.filters')}
          {Object.values(filters).filter(Boolean).length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Products Table */}
      <div className={`
        rounded-lg border overflow-hidden
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.product')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.sku')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.price')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.stock')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.status')}
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">{t('common.actions')}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    </div>
                  </td>
                </tr>
              ) : filteredProducts?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    {filters.search || Object.values(filters).some(Boolean)
                      ? t('products.noResults')
                      : t('products.noProducts')}
                  </td>
                </tr>
              ) : (
                filteredProducts?.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onDelete={() => handleDelete(product.id!)}
                    onEdit={() => navigate(`/inventory/products/${product.id}/edit`)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProductRow: React.FC<{
  product: Product;
  onDelete: () => void;
  onEdit: () => void;
}> = ({ product, onDelete, onEdit }) => {
  const [showActions, setShowActions] = useState(false);
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <tr className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className={`
              h-10 w-10 rounded-lg flex items-center justify-center
              ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
            `}>
              <FileText className="h-5 w-5 text-gray-500" />
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {product.name}
            </div>
            <div className="text-sm text-gray-500">
              {product.category}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        {product.sku}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
        ${product.price?.toFixed(2)}
      </td>
      <td className="px-6 py-4">
        <span className={`
          px-2 py-1 text-sm rounded-full
          ${product.stockQuantity > 10
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : product.stockQuantity > 0
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}
        `}>
          {product.stockQuantity} {t('common.units')}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`
          px-2 py-1 text-sm rounded-full
          ${product.status === 'active'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}
        `}>
          {product.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right text-sm font-medium">
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <MoreVertical size={20} />
          </button>

          {showActions && (
            <div className={`
              absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            `}>
              <div className="py-1">
                <button
                  onClick={onEdit}
                  className={`
                    flex items-center w-full px-4 py-2 text-sm
                    ${isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <Edit size={16} className="mr-3" />
                  {t('common.edit')}
                </button>
                <button
                  onClick={onDelete}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600
                           hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                  <Trash2 size={16} className="mr-3" />
                  {t('common.delete')}
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ProductList;