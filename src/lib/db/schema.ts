import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be positive'),
  minStockLevel: z.number().int().min(0).optional(),
  maxStockLevel: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;