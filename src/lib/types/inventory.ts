export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  unit: string;
  taxRate: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  reference: string;
  date: string;
  userId: string;
}

export interface InventoryAlert {
  id: string;
  productId: string;
  type: 'low_stock' | 'overstock' | 'expiring';
  message: string;
  status: 'new' | 'read' | 'resolved';
  createdAt: string;
}