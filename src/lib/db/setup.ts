import { db } from './index';

export function setupDatabase() {
  db.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      description TEXT,
      barcode TEXT,
      barcodeType TEXT DEFAULT 'CODE128',
      category TEXT,
      brand TEXT,
      unit TEXT NOT NULL,
      location TEXT,
      purchasePrice DECIMAL(10,2) NOT NULL,
      salePrice DECIMAL(10,2) NOT NULL,
      profitMargin DECIMAL(5,2),
      stockQuantity INTEGER DEFAULT 0,
      minStockLevel INTEGER DEFAULT 0,
      maxStockLevel INTEGER DEFAULT 0,
      weight DECIMAL(10,3),
      status TEXT DEFAULT 'active',
      hideFromCatalog INTEGER DEFAULT 0,
      hideFromSales INTEGER DEFAULT 0,
      enableImei INTEGER DEFAULT 0,
      taxRate DECIMAL(5,2) DEFAULT 0,
      seoTitle TEXT,
      seoDescription TEXT,
      seoKeywords TEXT,
      seoUrl TEXT,
      mainImage TEXT,
      gallery TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      parentId TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (parentId) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS brands (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS units (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      abbreviation TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  // Insert sample data if tables are empty
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
  
  if (productCount.count === 0) {
    const sampleProduct = {
      id: crypto.randomUUID(),
      name: 'Sample Product',
      sku: 'SAMPLE-001',
      description: 'This is a sample product',
      unit: 'unit',
      purchasePrice: 10.00,
      salePrice: 15.00,
      stockQuantity: 100,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.prepare(`
      INSERT INTO products (
        id, name, sku, description, unit, purchasePrice, salePrice,
        stockQuantity, status, createdAt, updatedAt
      ) VALUES (
        @id, @name, @sku, @description, @unit, @purchasePrice, @salePrice,
        @stockQuantity, @status, @createdAt, @updatedAt
      )
    `).run(sampleProduct);
  }
}