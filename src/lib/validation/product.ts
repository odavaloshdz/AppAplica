import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().optional(),
  barcode: z.string().optional(),
  barcodeType: z.enum(['CODE128', 'EAN13', 'UPC']).default('CODE128'),
  category: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  stockQuantity: z.number().int().min(0, 'Stock quantity must be positive'),
  minStockLevel: z.number().int().min(0).optional(),
  maxStockLevel: z.number().int().min(0).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  taxRate: z.number().min(0).max(100).default(0),
  weight: z.number().min(0).optional(),
  dimensions: z.object({
    length: z.number().min(0).optional(),
    width: z.number().min(0).optional(),
    height: z.number().min(0).optional()
  }).optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
  seoKeywords: z.array(z.string()).optional(),
  metaData: z.record(z.string(), z.any()).optional(),
  images: z.array(z.string()).optional(),
  hasVariants: z.boolean().default(false),
  variants: z.array(z.object({
    id: z.string(),
    name: z.string(),
    sku: z.string(),
    price: z.number(),
    stock: z.number()
  })).optional()
});

export type ProductFormData = z.infer<typeof productSchema>;