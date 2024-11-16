import { getDB, transaction } from './index';
import type { Product } from '../types/product';

export async function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  const product = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await transaction(['products'], 'readwrite', async (db) => {
    await db.add('products', product);
  });

  return product;
}

export async function getProduct(id: string): Promise<Product | null> {
  const db = await getDB();
  return db.get('products', id);
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  return transaction(['products'], 'readwrite', async (db) => {
    const product = await db.get('products', id);
    if (!product) throw new Error('Product not found');

    const updatedProduct = {
      ...product,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    await db.put('products', updatedProduct);
    return updatedProduct;
  });
}

export async function deleteProduct(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('products', id);
}

export async function listProducts(filters: {
  search?: string;
  category?: string;
  brand?: string;
  status?: string;
  page?: number;
  limit?: number;
}): Promise<Product[]> {
  try {
    const db = await getDB();
    const products = await db.getAll('products') || [];

    // Apply filters
    let filteredProducts = [...products];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.sku.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search)
      );
    }

    if (filters.category) {
      filteredProducts = filteredProducts.filter((p) => p.category === filters.category);
    }

    if (filters.brand) {
      filteredProducts = filteredProducts.filter((p) => p.brand === filters.brand);
    }

    if (filters.status) {
      filteredProducts = filteredProducts.filter((p) => p.status === filters.status);
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 25;
    const start = (page - 1) * limit;
    
    return filteredProducts.slice(start, start + limit);
  } catch (error) {
    console.error('Error listing products:', error);
    return [];
  }
}