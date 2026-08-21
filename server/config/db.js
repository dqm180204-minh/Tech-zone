import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env tu ca thu muc server hoac goc
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '123456',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'techzone_db',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create a pool for queries
let pool = null;

export const getDb = () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
};

// Test connection
export const testConnection = async () => {
  try {
    const connection = await getDb().getConnection();
    console.log('✅ Ket noi MySQL Database thanh cong tren port:', dbConfig.port);
    connection.release();
    return true;
  } catch (error) {
    console.error('⚠️ Khong the ket noi den MySQL Database:', error.message);
    console.log('👉 Hay kiem tra lai thong tin DB_USER, DB_PASSWORD trong file server/.env');
    return false;
  }
};
