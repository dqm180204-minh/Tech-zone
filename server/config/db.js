import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'techzone_db',
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
