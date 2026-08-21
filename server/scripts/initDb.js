import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '123456';
const DB_NAME = process.env.DB_NAME || 'techzone_db';

const initialProducts = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max 256GB - Titan Tự Nhiên',
    brand: 'Apple',
    category: 'flagship',
    price: 34990000,
    originalPrice: 38990000,
    rating: 4.9,
    reviewCount: 428,
    soldCount: 1850,
    isHot: true,
    isNew: true,
    isFlashSale: true,
    flashSalePrice: 33490000,
    stock: 45,
    soldPercent: 85,
    badge: 'Mới ra mắt & Giảm sốc',
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1695048133021-36427329fb78?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titan Tự Nhiên', hex: '#9f9a94' },
      { name: 'Titan Sa Mạc', hex: '#d4b797' },
      { name: 'Titan Trắng', hex: '#f2f2f2' },
      { name: 'Titan Đen', hex: '#37383a' }
    ],
    storageOptions: [
      { size: '256GB', priceOffset: 0 },
      { size: '512GB', priceOffset: 6000000 },
      { size: '1TB', priceOffset: 12000000 }
    ],
    specs: {
      screen: '6.9" Super Retina XDR OLED, 120Hz ProMotion, 2000 nits',
      cpu: 'Apple A18 Pro (3nm) 6 nhân CPU & 6 nhân GPU',
      ram: '8 GB',
      rom: '256 GB / 512 GB / 1 TB',
      rearCamera: 'Chính 48 MP + Siêu rộng 48 MP + Tele 5x 12 MP',
      frontCamera: '12 MP TrueDepth',
      battery: '4.685 mAh, Sạc nhanh 30W, MagSafe 25W',
      os: 'iOS 18 (Hỗ trợ Apple Intelligence)'
    },
    description: 'iPhone 16 Pro Max là đỉnh cao công nghệ di động năm nay từ Apple...'
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G 256GB - Quyền Năng Galaxy AI',
    brand: 'Samsung',
    category: 'flagship',
    price: 29990000,
    originalPrice: 33990000,
    rating: 4.8,
    reviewCount: 380,
    soldCount: 2100,
    isHot: true,
    isNew: false,
    isFlashSale: true,
    flashSalePrice: 28490000,
    stock: 38,
    soldPercent: 78,
    badge: 'Tặng Bao da + Giảm 4 Triệu',
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80'],
    colors: [
      { name: 'Xám Titan', hex: '#6c6f70' },
      { name: 'Đen Titan', hex: '#262626' }
    ],
    storageOptions: [
      { size: '256GB', priceOffset: 0 },
      { size: '512GB', priceOffset: 4500000 }
    ],
    specs: {
      screen: '6.8" Dynamic AMOLED 2X, QHD+, 1-120Hz, 2600 nits',
      cpu: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      ram: '12 GB',
      rom: '256 GB / 512 GB',
      rearCamera: '200 MP + 50 MP (5x) + 12 MP + 10 MP',
      frontCamera: '12 MP Dual Pixel PDAF',
      battery: '5.000 mAh, Sạc nhanh 45W',
      os: 'Android 14, One UI 6.1.1'
    },
    description: 'Samsung Galaxy S24 Ultra mở ra kỷ nguyên trí tuệ nhân tạo Galaxy AI đột phá...'
  },
  {
    id: 'samsung-galaxy-z-fold6',
    name: 'Samsung Galaxy Z Fold6 5G 256GB - Siêu Phẩm Màn Hình Gập AI',
    brand: 'Samsung',
    category: 'foldable',
    price: 41990000,
    originalPrice: 43990000,
    rating: 4.9,
    reviewCount: 156,
    soldCount: 650,
    isHot: true,
    isNew: true,
    isFlashSale: false,
    stock: 20,
    soldPercent: 50,
    badge: 'Đẳng Cấp Doanh Nhân',
    thumbnail: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Xám Metal', hex: '#636569' }, { name: 'Xanh Navy', hex: '#212d40' }],
    storageOptions: [{ size: '256GB', priceOffset: 0 }, { size: '512GB', priceOffset: 5000000 }],
    specs: {
      screen: 'Chính: 7.6" Dynamic AMOLED 2X | Phụ: 6.3"',
      cpu: 'Snapdragon 8 Gen 3 for Galaxy',
      ram: '12 GB',
      rom: '256 GB / 512 GB',
      rearCamera: '50 MP + 12 MP + 10 MP',
      battery: '4.400 mAh, Sạc nhanh 25W',
      os: 'Android 14'
    },
    description: 'Galaxy Z Fold6 là mẫu điện thoại gập flagship mỏng nhẹ đẳng cấp...'
  },
  {
    id: 'xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra 5G 512GB - Nhiếp Ảnh Huyền Thoại Leica',
    brand: 'Xiaomi',
    category: 'flagship',
    price: 27990000,
    originalPrice: 31990000,
    rating: 4.8,
    reviewCount: 215,
    soldCount: 940,
    isHot: true,
    isNew: false,
    isFlashSale: false,
    stock: 25,
    soldPercent: 65,
    badge: 'Camera Khủng 1 Inch Leica',
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Đen Da Thuần Chay', hex: '#1c1c1c' }, { name: 'Trắng Gốm', hex: '#ececec' }],
    storageOptions: [{ size: '512GB', priceOffset: 0 }, { size: '1TB', priceOffset: 4500000 }],
    specs: {
      screen: '6.73" LTPO AMOLED 2K, 120Hz, 3000 nits',
      cpu: 'Snapdragon 8 Gen 3 (4nm)',
      ram: '16 GB',
      rom: '512 GB',
      rearCamera: '4 ống kính 50 MP Leica Summilux',
      battery: '5.000 mAh, Sạc 90W có dây & 80W không dây',
      os: 'Xiaomi HyperOS'
    },
    description: 'Xiaomi 14 Ultra là tuyệt tác nhiếp ảnh di động cùng Leica...'
  },
  {
    id: 'asus-rog-phone-8-pro',
    name: 'ASUS ROG Phone 8 Pro 512GB - Quái Vật Gaming Đỉnh Cao',
    brand: 'ASUS',
    category: 'gaming',
    price: 25490000,
    originalPrice: 28990000,
    rating: 4.9,
    reviewCount: 142,
    soldCount: 520,
    isHot: true,
    isNew: false,
    isFlashSale: false,
    stock: 18,
    soldPercent: 40,
    badge: 'Gaming Phone Số 1 Thế Giới',
    thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Phantom Black', hex: '#111111' }],
    storageOptions: [{ size: '512GB', priceOffset: 0 }, { size: '1TB', priceOffset: 5000000 }],
    specs: {
      screen: '6.78" AMOLED FHD+ 165Hz LTPO',
      cpu: 'Snapdragon 8 Gen 3 (4nm)',
      ram: '16 GB / 24 GB',
      rom: '512 GB',
      rearCamera: '50 MP Gimbal 6 trục + 32 MP + 13 MP',
      battery: '5.500 mAh, Sạc nhanh 65W',
      os: 'ROG UI (Android 14)'
    },
    description: 'ASUS ROG Phone 8 Pro quái vật hiệu năng gaming đỉnh nhất...'
  },
  {
    id: 'samsung-galaxy-a55-5g',
    name: 'Samsung Galaxy A55 5G 128GB - Khung Kim Loại Tầm Trung',
    brand: 'Samsung',
    category: 'midrange',
    price: 8990000,
    originalPrice: 10490000,
    rating: 4.7,
    reviewCount: 310,
    soldCount: 3200,
    isHot: false,
    isNew: false,
    isFlashSale: true,
    flashSalePrice: 8490000,
    stock: 60,
    soldPercent: 88,
    badge: 'Bán Chạy Dưới 10 Triệu',
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80'],
    colors: [{ name: 'Xanh Iceblue', hex: '#a6cce0' }, { name: 'Tím Lilac', hex: '#d6c4e0' }],
    storageOptions: [{ size: '128GB', priceOffset: 0 }, { size: '256GB', priceOffset: 1200000 }],
    specs: {
      screen: '6.6" Super AMOLED 120Hz',
      cpu: 'Exynos 1480',
      ram: '8 GB',
      rom: '128 GB',
      rearCamera: '50 MP OIS + 12 MP + 5 MP',
      battery: '5.000 mAh, Sạc 25W',
      os: 'Android 14'
    },
    description: 'Samsung Galaxy A55 5G khung kim loại sang trọng...'
  }
];

export const initDatabase = async () => {
  console.log(`🚀 Dang ket noi MySQL tai ${DB_HOST}:${DB_PORT} voi user: ${DB_USER}...`);

  let connection;
  try {
    // 1. Ket noi den MySQL Server goc (chua chi dinh DB_NAME)
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });

    console.log('✅ Ket noi MySQL Server thanh cong!');

    // 2. Tao Database techzone_db neu chua co
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`✅ Database '${DB_NAME}' da san sang!`);

    await connection.query(`USE \`${DB_NAME}\`;`);

    // 3. Tao Bang users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'customer') DEFAULT 'customer',
        phone VARCHAR(20) DEFAULT '',
        address TEXT DEFAULT NULL,
        avatar VARCHAR(255) DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Tao Bang products
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        price BIGINT NOT NULL,
        original_price BIGINT NOT NULL,
        rating FLOAT DEFAULT 5.0,
        review_count INT DEFAULT 0,
        sold_count INT DEFAULT 0,
        is_hot BOOLEAN DEFAULT FALSE,
        is_new BOOLEAN DEFAULT FALSE,
        is_flash_sale BOOLEAN DEFAULT FALSE,
        flash_sale_price BIGINT DEFAULT NULL,
        stock INT DEFAULT 10,
        sold_percent INT DEFAULT 0,
        badge VARCHAR(100) DEFAULT '',
        thumbnail TEXT NOT NULL,
        images JSON DEFAULT NULL,
        colors JSON DEFAULT NULL,
        storage_options JSON DEFAULT NULL,
        specs JSON DEFAULT NULL,
        description TEXT DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Tao Bang orders
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_code VARCHAR(50) UNIQUE NOT NULL,
        user_id INT NULL,
        customer_name VARCHAR(100) NOT NULL,
        customer_phone VARCHAR(20) NOT NULL,
        customer_email VARCHAR(100) DEFAULT '',
        customer_city VARCHAR(50) DEFAULT '',
        customer_district VARCHAR(50) DEFAULT '',
        customer_address TEXT NOT NULL,
        customer_note TEXT DEFAULT NULL,
        subtotal BIGINT NOT NULL,
        discount_amount BIGINT DEFAULT 0,
        shipping_fee BIGINT DEFAULT 0,
        total_amount BIGINT NOT NULL,
        coupon_code VARCHAR(50) DEFAULT NULL,
        payment_method VARCHAR(50) DEFAULT 'cod',
        payment_status VARCHAR(50) DEFAULT 'unpaid',
        order_status ENUM('pending', 'confirmed', 'processing', 'shipping', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Tao Bang order_items
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id VARCHAR(100) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        product_thumbnail TEXT,
        color_name VARCHAR(50) DEFAULT '',
        storage_size VARCHAR(50) DEFAULT '',
        price BIGINT NOT NULL,
        quantity INT NOT NULL,
        total_price BIGINT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Tao Bang coupons
    await connection.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_type ENUM('fixed', 'percent') NOT NULL,
        discount_value BIGINT NOT NULL,
        min_order_value BIGINT DEFAULT 0,
        max_discount BIGINT DEFAULT NULL,
        description VARCHAR(255) DEFAULT '',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('✅ Cac bang Database da duoc tao thanh cong!');

    // 8. Seed Admin & Customer User
    const adminPassword = await bcrypt.hash('admin123', 10);
    const customerPassword = await bcrypt.hash('123456', 10);

    await connection.query(`
      INSERT INTO users (name, email, password, role, phone, address, avatar)
      VALUES 
        ('Quản Trị Viên TechZone', 'admin@techzone.vn', ?, 'admin', '1800 6868', '72 Lê Thánh Tôn, Quận 1, TP.HCM', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
        ('Nguyễn Văn Công Nghệ', 'customer@techzone.vn', ?, 'customer', '0909 888 999', '123 Nguyễn Huệ, Quận 1, TP.HCM', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150')
      ON DUPLICATE KEY UPDATE name=VALUES(name);
    `, [adminPassword, customerPassword]);

    console.log('👤 Da tao tai khoan Admin: admin@techzone.vn / admin123');

    // 9. Seed Coupons
    await connection.query(`
      INSERT INTO coupons (code, discount_type, discount_value, min_order_value, max_discount, description)
      VALUES 
        ('TECHZONE500', 'fixed', 500000, 5000000, NULL, 'Giảm 500.000₫ cho đơn từ 5.000.000₫'),
        ('FLAGSHIP1000', 'fixed', 1000000, 20000000, NULL, 'Giảm 1.000.000₫ cho siêu phẩm Flagship từ 20 triệu'),
        ('WELCOME10', 'percent', 10, 1000000, 300000, 'Giảm 10% (tối đa 300k) cho khách hàng mới')
      ON DUPLICATE KEY UPDATE description=VALUES(description);
    `);

    // 10. Seed Products
    for (const p of initialProducts) {
      await connection.query(`
        INSERT INTO products (
          id, name, brand, category, price, original_price, rating, review_count, sold_count,
          is_hot, is_new, is_flash_sale, flash_sale_price, stock, sold_percent, badge, thumbnail,
          images, colors, storage_options, specs, description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name=VALUES(name), price=VALUES(price), stock=VALUES(stock);
      `, [
        p.id, p.name, p.brand, p.category, p.price, p.originalPrice, p.rating, p.reviewCount, p.soldCount,
        p.isHot ? 1 : 0, p.isNew ? 1 : 0, p.isFlashSale ? 1 : 0, p.flashSalePrice || null, p.stock, p.soldPercent,
        p.badge, p.thumbnail, JSON.stringify(p.images), JSON.stringify(p.colors), JSON.stringify(p.storageOptions),
        JSON.stringify(p.specs), p.description
      ]);
    }
    console.log(`📱 Da seed thanh cong ${initialProducts.length} san pham dien thoai vao MySQL!`);

    // 11. Seed Sample Orders for Dashboard Analytics
    const [existingOrders] = await connection.query('SELECT COUNT(*) as cnt FROM orders;');
    if (existingOrders[0].cnt === 0) {
      const sampleOrders = [
        {
          code: 'TZ-8A9F21',
          name: 'Trần Văn Mạnh',
          phone: '0912 345 678',
          email: 'manh.tran@gmail.com',
          address: '45 Lê Duẩn, Phường Bến Nghé, Quận 1, TP.HCM',
          subtotal: 33490000,
          discount: 500000,
          total: 32990000,
          paymentMethod: 'vietqr',
          paymentStatus: 'paid',
          orderStatus: 'completed',
          items: [{ pid: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max 256GB', thumb: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', color: 'Titan Tự Nhiên', storage: '256GB', price: 33490000, qty: 1 }]
        },
        {
          code: 'TZ-3B7D88',
          name: 'Nguyễn Thị Hương',
          phone: '0988 777 666',
          email: 'huong.nguyen@gmail.com',
          address: '18 Hai Bà Trưng, Quận Hoàn Kiếm, Hà Nội',
          subtotal: 28490000,
          discount: 1000000,
          total: 27490000,
          paymentMethod: 'vnpay',
          paymentStatus: 'paid',
          orderStatus: 'shipping',
          items: [{ pid: 'samsung-galaxy-s24-ultra', name: 'Samsung Galaxy S24 Ultra 256GB', thumb: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', color: 'Xám Titan', storage: '256GB', price: 28490000, qty: 1 }]
        },
        {
          code: 'TZ-1C4E52',
          name: 'Lê Hoàng Nam',
          phone: '0903 111 222',
          email: 'nam.le@gmail.com',
          address: '88 Nguyễn Thị Minh Khai, Quận 3, TP.HCM',
          subtotal: 8490000,
          discount: 0,
          total: 8490000,
          paymentMethod: 'cod',
          paymentStatus: 'unpaid',
          orderStatus: 'pending',
          items: [{ pid: 'samsung-galaxy-a55-5g', name: 'Samsung Galaxy A55 5G 128GB', thumb: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', color: 'Xanh Iceblue', storage: '128GB', price: 8490000, qty: 1 }]
        }
      ];

      for (const ord of sampleOrders) {
        const [res] = await connection.query(`
          INSERT INTO orders (
            order_code, customer_name, customer_phone, customer_email, customer_address,
            subtotal, discount_amount, total_amount, payment_method, payment_status, order_status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          ord.code, ord.name, ord.phone, ord.email, ord.address,
          ord.subtotal, ord.discount, ord.total, ord.paymentMethod, ord.paymentStatus, ord.orderStatus
        ]);

        const orderId = res.insertId;
        for (const itm of ord.items) {
          await connection.query(`
            INSERT INTO order_items (
              order_id, product_id, product_name, product_thumbnail, color_name, storage_size, price, quantity, total_price
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            orderId, itm.pid, itm.name, itm.thumb, itm.color, itm.storage, itm.price, itm.qty, itm.price * itm.qty
          ]);
        }
      }
      console.log('📦 Da seed don hang mau cho Dashboard Analytics!');
    }

    console.log('🎉 KHOI TAO DATABASE MYSQL TECHZONE_DB HOAN TAT 100%!');
  } catch (err) {
    console.error('❌ Loi khi khoi tao database:', err.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
};

initDatabase();
