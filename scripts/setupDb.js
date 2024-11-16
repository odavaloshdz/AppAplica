import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import sqlite3 from 'sqlite3';
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function setupDatabase() {
  // Ensure data directory exists
  const dataDir = join(__dirname, '..', 'data');
  await mkdir(dataDir, { recursive: true });
  
  const dbPath = join(dataDir, 'erp.db');
  
  // Enable verbose mode for debugging
  sqlite3.verbose();

  // Create database connection
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error creating database:', err);
      throw err;
    }
    console.log('Connected to SQLite database');
  });

  // Create tables
  const schema = `
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
  `;

  return new Promise((resolve, reject) => {
    db.exec(schema, (err) => {
      if (err) {
        console.error('Error creating tables:', err);
        reject(err);
        return;
      }

      // Check if we need to insert sample data
      db.get('SELECT COUNT(*) as count FROM products', [], (err, row) => {
        if (err) {
          console.error('Error checking products:', err);
          reject(err);
          return;
        }

        if (row.count === 0) {
          const sampleProduct = {
            id: '1',
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

          db.run(`
            INSERT INTO products (
              id, name, sku, description, unit, purchasePrice, salePrice,
              stockQuantity, status, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            sampleProduct.id,
            sampleProduct.name,
            sampleProduct.sku,
            sampleProduct.description,
            sampleProduct.unit,
            sampleProduct.purchasePrice,
            sampleProduct.salePrice,
            sampleProduct.stockQuantity,
            sampleProduct.status,
            sampleProduct.createdAt,
            sampleProduct.updatedAt
          ], (err) => {
            if (err) {
              console.error('Error inserting sample product:', err);
              reject(err);
              return;
            }
            console.log('Sample product inserted successfully');
            db.close();
            resolve();
          });
        } else {
          db.close();
          resolve();
        }
      });
    });
  });
}

async function init() {
  try {
    await setupDatabase();
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Failed to setup database:', error);
    process.exit(1);
  }
}

init().catch(console.error);