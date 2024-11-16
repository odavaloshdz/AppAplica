import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProducts } from '../../context/ProductContext';
import { productSchema } from '../../lib/validation/product';
import { useToast } from 'react-toastify';
import { useTheme } from '../../context/ThemeContext';
import { 
  Save, 
  Plus, 
  FileText, 
  Image as ImageIcon, 
  DollarSign, 
  Link as LinkIcon,
  ChevronLeft
} from 'lucide-react';
import { MediaUploader } from '../../components/MediaUploader';
import Select from 'react-select';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const toast = useToast();
  const { addProduct, updateProduct, categories, brands } = useProducts();

  const [activeTab, setActiveTab] = useState('basic');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      sku: '',
      description: '',
      category: '',
      brand: '',
      price: 0,
      stockQuantity: 0,
      minStockLevel: 0,
      maxStockLevel: 0,
      status: 'active',
      taxRate: 0,
    }
  });

  const tabs = [
    {
      id: 'basic',
      label: 'Basic Information',
      icon: <FileText size={20} />
    },
    {
      id: 'media',
      label: 'Media',
      icon: <ImageIcon size={20} />
    },
    {
      id: 'pricing',
      label: 'Pricing',
      icon: <DollarSign size={20} />
    },
    {
      id: 'seo',
      label: 'SEO',
      icon: <LinkIcon size={20} />
    }
  ];

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      const productData = {
        ...data,
        images
      };

      if (id) {
        await updateProduct(id, productData);
        toast.success('Product updated successfully');
      } else {
        await addProduct(productData);
        toast.success('Product created successfully');
      }

      navigate('/inventory/products');
    } catch (error) {
      toast.error('Error saving product');
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name *
              </label>
              <input
                type="text"
                {...register('name')}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SKU *
              </label>
              <input
                type="text"
                {...register('sku')}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
              />
              {errors.sku && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.sku.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <Select
                options={categories.map(c => ({ value: c.id, label: c.name }))}
                onChange={(option) => setValue('category', option?.value)}
                className="mt-1"
                classNamePrefix="select"
                isClearable
                placeholder="Select category"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: 'var(--color-primary)',
                    primary75: 'var(--color-primary-light)',
                    primary50: 'var(--color-primary-light)',
                    primary25: 'var(--color-primary-light)',
                  },
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Brand
              </label>
              <Select
                options={brands.map(b => ({ value: b.id, label: b.name }))}
                onChange={(option) => setValue('brand', option?.value)}
                className="mt-1"
                classNamePrefix="select"
                isClearable
                placeholder="Select brand"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: 'var(--color-primary)',
                    primary75: 'var(--color-primary-light)',
                    primary50: 'var(--color-primary-light)',
                    primary25: 'var(--color-primary-light)',
                  },
                })}
              />
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="space-y-6">
            <MediaUploader
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              description="Drop images here or click to upload (PNG, JPG up to 5MB)"
            />

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'pricing':
        return (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price *
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className={`
                    pl-7 block w-full rounded-lg shadow-sm
                    ${isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'}
                    focus:ring-primary focus:border-primary
                  `}
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register('taxRate', { valueAsNumber: true })}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stock Quantity *
              </label>
              <input
                type="number"
                {...register('stockQuantity', { valueAsNumber: true })}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
              />
              {errors.stockQuantity && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Stock Level
              </label>
              <input
                type="number"
                {...register('minStockLevel', { valueAsNumber: true })}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
              />
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SEO Title
              </label>
              <input
                type="text"
                {...register('seoTitle')}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
              />
              <p className="mt-1 text-sm text-gray-500">
                Recommended length: 50-60 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SEO Description
              </label>
              <textarea
                {...register('seoDescription')}
                rows={3}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
              />
              <p className="mt-1 text-sm text-gray-500">
                Recommended length: 150-160 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SEO Keywords
              </label>
              <input
                type="text"
                {...register('seoKeywords')}
                className={`
                  mt-1 block w-full rounded-lg shadow-sm
                  ${isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'}
                  focus:ring-primary focus:border-primary
                `}
                placeholder="Separate keywords with commas"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {id ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {id ? 'Update product information' : 'Create a new product'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {renderTabContent()}

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/inventory/products')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Back to Products
            </button>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium
                  text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;