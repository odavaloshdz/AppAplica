import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../axios';
import type { Product, StockMovement } from '../types/inventory';

export const useInventory = () => {
  const queryClient = useQueryClient();

  const getProducts = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product[]>('/inventory/products');
      return data;
    },
  });

  const addProduct = useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const { data } = await axiosInstance.post('/inventory/products', product);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, ...product }: Product) => {
      const { data } = await axiosInstance.put(`/inventory/products/${id}`, product);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const updateStock = useMutation({
    mutationFn: async (movement: Omit<StockMovement, 'id' | 'date' | 'userId'>) => {
      const { data } = await axiosInstance.post('/inventory/stock-movements', movement);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    products: getProducts.data ?? [],
    isLoading: getProducts.isLoading,
    error: getProducts.error,
    addProduct,
    updateProduct,
    updateStock,
  };
};