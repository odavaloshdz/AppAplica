import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '../lib/db/schema';
import { createProduct, updateProduct, deleteProduct, listProducts } from '../lib/db/products';
import { useToast } from '../hooks/useToast';

interface ProductContextType {
  products: Product[];
  categories: Array<{ id: string; name: string }>;
  brands: Array<{ id: string; name: string }>;
  loading: boolean;
  error: Error | null;
  addProduct: (data: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
}

const defaultContext: ProductContextType = {
  products: [],
  categories: [],
  brands: [],
  loading: false,
  error: null,
  addProduct: async () => ({ id: '', name: '', sku: '', price: 0, stockQuantity: 0 } as Product),
  updateProduct: async () => ({ id: '', name: '', sku: '', price: 0, stockQuantity: 0 } as Product),
  deleteProduct: async () => {},
};

const ProductContext = createContext<ProductContextType>(defaultContext);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock categories and brands for now
  const mockCategories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Books' },
    { id: '4', name: 'Home & Garden' },
  ];

  const mockBrands = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Samsung' },
    { id: '3', name: 'Nike' },
    { id: '4', name: 'Adidas' },
  ];

  // Query for products
  const { 
    data: products = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const data = await listProducts({});
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.error('Error fetching products:', err);
        return [];
      }
    },
    initialData: [],
  });

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (data: Omit<Product, 'id'>) => {
      const newProduct = await createProduct(data);
      toast({
        title: 'Success',
        description: 'Product added successfully',
        type: 'success',
      });
      return newProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        type: 'error',
      });
    },
  });

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Product> }) => {
      const updatedProduct = await updateProduct(id, data);
      toast({
        title: 'Success',
        description: 'Product updated successfully',
        type: 'success',
      });
      return updatedProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        type: 'error',
      });
    },
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteProduct(id);
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
        type: 'success',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        type: 'error',
      });
    },
  });

  const value: ProductContextType = {
    products: Array.isArray(products) ? products : [],
    categories: mockCategories,
    brands: mockBrands,
    loading: isLoading,
    error: error as Error | null,
    addProduct: addProductMutation.mutateAsync,
    updateProduct: (id: string, data: Partial<Product>) =>
      updateProductMutation.mutateAsync({ id, data }),
    deleteProduct: deleteProductMutation.mutateAsync,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};