import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ERPDB extends DBSchema {
  products: {
    key: string;
    value: {
      id: string;
      name: string;
      sku: string;
      description?: string;
      barcode?: string;
      barcodeType: string;
      category?: string;
      brand?: string;
      unit: string;
      location?: string;
      purchasePrice: number;
      salePrice: number;
      profitMargin?: number;
      stockQuantity: number;
      minStockLevel?: number;
      maxStockLevel?: number;
      weight?: number;
      status: 'active' | 'inactive' | 'draft';
      hideFromCatalog: boolean;
      hideFromSales: boolean;
      enableImei: boolean;
      taxRate: number;
      seoTitle?: string;
      seoDescription?: string;
      seoKeywords?: string;
      seoUrl?: string;
      mainImage?: string;
      gallery?: string[];
      createdAt: string;
      updatedAt: string;
    };
    indexes: {
      'by-sku': string;
      'by-name': string;
      'by-category': string;
      'by-brand': string;
    };
  };
  categories: {
    key: string;
    value: {
      id: string;
      name: string;
      description?: string;
      parentId?: string;
      createdAt: string;
      updatedAt: string;
    };
    indexes: {
      'by-name': string;
      'by-parent': string;
    };
  };
  brands: {
    key: string;
    value: {
      id: string;
      name: string;
      description?: string;
      createdAt: string;
      updatedAt: string;
    };
    indexes: {
      'by-name': string;
    };
  };
  units: {
    key: string;
    value: {
      id: string;
      name: string;
      abbreviation?: string;
      createdAt: string;
      updatedAt: string;
    };
    indexes: {
      'by-name': string;
    };
  };
}

let db: IDBPDatabase<ERPDB>;

export async function getDB() {
  if (!db) {
    db = await openDB<ERPDB>('erp-db', 1, {
      upgrade(db) {
        // Products store
        const productStore = db.createObjectStore('products', {
          keyPath: 'id',
        });
        productStore.createIndex('by-sku', 'sku', { unique: true });
        productStore.createIndex('by-name', 'name');
        productStore.createIndex('by-category', 'category');
        productStore.createIndex('by-brand', 'brand');

        // Categories store
        const categoryStore = db.createObjectStore('categories', {
          keyPath: 'id',
        });
        categoryStore.createIndex('by-name', 'name');
        categoryStore.createIndex('by-parent', 'parentId');

        // Brands store
        const brandStore = db.createObjectStore('brands', {
          keyPath: 'id',
        });
        brandStore.createIndex('by-name', 'name');

        // Units store
        const unitStore = db.createObjectStore('units', {
          keyPath: 'id',
        });
        unitStore.createIndex('by-name', 'name');
      },
    });
  }
  return db;
}

export async function clearDB() {
  const db = await getDB();
  await Promise.all([
    db.clear('products'),
    db.clear('categories'),
    db.clear('brands'),
    db.clear('units'),
  ]);
}

// Transaction helper
export async function transaction<T>(
  stores: (keyof ERPDB)[],
  mode: 'readonly' | 'readwrite',
  callback: (tx: IDBPDatabase<ERPDB>) => Promise<T>
): Promise<T> {
  const db = await getDB();
  const tx = db.transaction(stores, mode);
  try {
    const result = await callback(db);
    await tx.done;
    return result;
  } catch (error) {
    tx.abort();
    throw error;
  }
}