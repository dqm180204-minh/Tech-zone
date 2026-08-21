import { getDb } from '../config/db.js';

export const getAnalytics = async (req, res) => {
  try {
    const db = getDb();

    // 1. Tong Doanh thu
    const [revenueRes] = await db.query(`
      SELECT COALESCE(SUM(total_amount), 0) as totalRevenue,
             COALESCE(COUNT(id), 0) as totalOrders
      FROM orders
      WHERE order_status != 'cancelled';
    `);

    // 2. So don hang theo trang thai
    const [ordersByStatus] = await db.query(`
      SELECT order_status, COUNT(id) as count
      FROM orders
      GROUP BY order_status;
    `);

    // 3. Tong San pham & Het hang
    const [productStats] = await db.query(`
      SELECT 
        COUNT(id) as totalProducts,
        SUM(CASE WHEN stock <= 5 THEN 1 ELSE 0 END) as lowStockProducts
      FROM products;
    `);

    // 4. Tong Khach hang
    const [userStats] = await db.query(`
      SELECT COUNT(id) as totalUsers FROM users WHERE role = 'customer';
    `);

    // 5. Doanh thu 7 ngay gan nhat
    const [revenue7Days] = await db.query(`
      SELECT 
        DATE_FORMAT(created_at, '%d/%m') as date,
        COALESCE(SUM(total_amount), 0) as amount,
        COUNT(id) as ordersCount
      FROM orders
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND order_status != 'cancelled'
      GROUP BY DATE(created_at), DATE_FORMAT(created_at, '%d/%m')
      ORDER BY DATE(created_at) ASC;
    `);

    // 6. Top 5 San pham ban chay
    const [topProducts] = await db.query(`
      SELECT id, name, brand, price, thumbnail, sold_count, stock
      FROM products
      ORDER BY sold_count DESC
      LIMIT 5;
    `);

    // 7. 5 Don hang moi nhat
    const [recentOrders] = await db.query(`
      SELECT id, order_code, customer_name, total_amount, order_status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 5;
    `);

    res.json({
      success: true,
      data: {
        totalRevenue: Number(revenueRes[0].totalRevenue),
        totalOrders: Number(revenueRes[0].totalOrders),
        totalProducts: Number(productStats[0].totalProducts),
        lowStockProducts: Number(productStats[0].lowStockProducts || 0),
        totalUsers: Number(userStats[0].totalUsers),
        ordersByStatus,
        revenue7Days,
        topProducts,
        recentOrders
      }
    });
  } catch (error) {
    console.error('Loi getAnalytics:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
