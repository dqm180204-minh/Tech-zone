-- =======================================================
-- TECHZONE PHONE STORE - DATABASE SCHEMA & SEED SCRIPT
-- MySQL 8.0+ / MariaDB
-- Character Set: utf8mb4 / utf8mb4_unicode_ci
-- =======================================================

CREATE DATABASE IF NOT EXISTS `techzone_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `techzone_db`;

-- 1. BẢNG USERS (Tài khoản người dùng & Phân quyền Admin)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'customer') DEFAULT 'customer',
  `phone` VARCHAR(20) DEFAULT '',
  `address` TEXT DEFAULT NULL,
  `avatar` VARCHAR(255) DEFAULT '',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. BẢNG PRODUCTS (Danh mục điện thoại & Thông số kỹ thuật)
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(100) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `price` BIGINT NOT NULL,
  `original_price` BIGINT NOT NULL,
  `rating` FLOAT DEFAULT 5.0,
  `review_count` INT DEFAULT 0,
  `sold_count` INT DEFAULT 0,
  `is_hot` BOOLEAN DEFAULT FALSE,
  `is_new` BOOLEAN DEFAULT FALSE,
  `is_flash_sale` BOOLEAN DEFAULT FALSE,
  `flash_sale_price` BIGINT DEFAULT NULL,
  `stock` INT DEFAULT 10,
  `sold_percent` INT DEFAULT 0,
  `badge` VARCHAR(100) DEFAULT '',
  `thumbnail` TEXT NOT NULL,
  `images` JSON DEFAULT NULL,
  `colors` JSON DEFAULT NULL,
  `storage_options` JSON DEFAULT NULL,
  `specs` JSON DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. BẢNG ORDERS (Đơn đặt hàng)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(50) UNIQUE NOT NULL,
  `user_id` INT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(20) NOT NULL,
  `customer_email` VARCHAR(100) DEFAULT '',
  `customer_city` VARCHAR(50) DEFAULT '',
  `customer_district` VARCHAR(50) DEFAULT '',
  `customer_address` TEXT NOT NULL,
  `customer_note` TEXT DEFAULT NULL,
  `subtotal` BIGINT NOT NULL,
  `discount_amount` BIGINT DEFAULT 0,
  `shipping_fee` BIGINT DEFAULT 0,
  `total_amount` BIGINT NOT NULL,
  `coupon_code` VARCHAR(50) DEFAULT NULL,
  `payment_method` VARCHAR(50) DEFAULT 'cod',
  `payment_status` VARCHAR(50) DEFAULT 'unpaid',
  `order_status` ENUM('pending', 'confirmed', 'processing', 'shipping', 'completed', 'cancelled') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_order_status` (`order_status`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. BẢNG ORDER_ITEMS (Chi tiết sản phẩm từng đơn hàng)
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` VARCHAR(100) NOT NULL,
  `product_name` VARCHAR(255) NOT NULL,
  `product_thumbnail` TEXT,
  `color_name` VARCHAR(50) DEFAULT '',
  `storage_size` VARCHAR(50) DEFAULT '',
  `price` BIGINT NOT NULL,
  `quantity` INT NOT NULL,
  `total_price` BIGINT NOT NULL,
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. BẢNG COUPONS (Mã giảm giá & Voucher)
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) UNIQUE NOT NULL,
  `discount_type` ENUM('fixed', 'percent') NOT NULL,
  `discount_value` BIGINT NOT NULL,
  `min_order_value` BIGINT DEFAULT 0,
  `max_discount` BIGINT DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT '',
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =======================================================
-- SEED DATA MẪU KHỞI TẠO HỆ THỐNG
-- =======================================================

-- Seed Tài Khoản:
-- Admin: admin@techzone.vn / admin123 (mật khẩu bcrypt hash $2a$10$iI0iB0v2B2.1XwPz1q6Cq.Yy2o8x4K4O4i6O/QZgC3.Qn9A0m1s7u)
-- Khách hàng: customer@techzone.vn / 123456
INSERT INTO `users` (`name`, `email`, `password`, `role`, `phone`, `address`, `avatar`)
VALUES 
  ('Quản Trị Viên TechZone', 'admin@techzone.vn', '$2a$10$p3s7b40u5qO6ZkJ8g0M59.c4Nq3N7P8M1bY5p3O2i4v7Q6W8e9m5O', 'admin', '1800 6868', '72 Lê Thánh Tôn, Quận 1, TP.HCM', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
  ('Nguyễn Văn Khách Hàng', 'customer@techzone.vn', '$2a$10$p3s7b40u5qO6ZkJ8g0M59.c4Nq3N7P8M1bY5p3O2i4v7Q6W8e9m5O', 'customer', '0909 888 999', '123 Nguyễn Huệ, Quận 1, TP.HCM', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- Seed Mã Giảm Giá
INSERT INTO `coupons` (`code`, `discount_type`, `discount_value`, `min_order_value`, `max_discount`, `description`)
VALUES 
  ('TECHZONE500', 'fixed', 500000, 5000000, NULL, 'Giảm 500.000₫ cho đơn từ 5.000.000₫'),
  ('FLAGSHIP1000', 'fixed', 1000000, 20000000, NULL, 'Giảm 1.000.000₫ cho siêu phẩm Flagship từ 20 triệu'),
  ('WELCOME10', 'percent', 10, 1000000, 300000, 'Giảm 10% (tối đa 300k) cho khách hàng mới')
ON DUPLICATE KEY UPDATE `description`=VALUES(`description`);

-- Seed Danh Sách Sản Phẩm Điện Thoại
INSERT INTO `products` (
  `id`, `name`, `brand`, `category`, `price`, `original_price`, `rating`, `review_count`, `sold_count`,
  `is_hot`, `is_new`, `is_flash_sale`, `flash_sale_price`, `stock`, `sold_percent`, `badge`, `thumbnail`,
  `images`, `colors`, `storage_options`, `specs`, `description`
) VALUES 
('iphone-16-pro-max', 'iPhone 16 Pro Max 256GB - Titan Tự Nhiên', 'Apple', 'flagship', 34990000, 38990000, 4.9, 428, 1850, 1, 1, 1, 33490000, 45, 85, 'Mới ra mắt & Giảm sốc',
 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
 '["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800", "https://images.unsplash.com/photo-1695048133021-36427329fb78?w=800"]',
 '[{"name": "Titan Tự Nhiên", "hex": "#9f9a94"}, {"name": "Titan Sa Mạc", "hex": "#d4b797"}, {"name": "Titan Trắng", "hex": "#f2f2f2"}, {"name": "Titan Đen", "hex": "#37383a"}]',
 '[{"size": "256GB", "priceOffset": 0}, {"size": "512GB", "priceOffset": 6000000}, {"size": "1TB", "priceOffset": 12000000}]',
 '{"screen": "6.9 Super Retina XDR OLED 120Hz", "cpu": "Apple A18 Pro 3nm", "ram": "8 GB", "rom": "256 GB / 512 GB / 1 TB", "battery": "4.685 mAh", "os": "iOS 18"}',
 'iPhone 16 Pro Max là đỉnh cao công nghệ di động năm nay từ Apple...'),

('samsung-galaxy-s24-ultra', 'Samsung Galaxy S24 Ultra 5G 256GB - Quyền Năng Galaxy AI', 'Samsung', 'flagship', 29990000, 33990000, 4.8, 380, 2100, 1, 0, 1, 28490000, 38, 78, 'Tặng Bao da + Giảm 4 Triệu',
 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
 '["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800"]',
 '[{"name": "Xám Titan", "hex": "#6c6f70"}, {"name": "Đen Titan", "hex": "#262626"}]',
 '[{"size": "256GB", "priceOffset": 0}, {"size": "512GB", "priceOffset": 4500000}]',
 '{"screen": "6.8 Dynamic AMOLED 2X 120Hz 2600 nits", "cpu": "Snapdragon 8 Gen 3 for Galaxy", "ram": "12 GB", "rom": "256 GB", "battery": "5.000 mAh 45W", "os": "Android 14"}',
 'Samsung Galaxy S24 Ultra mở ra kỷ nguyên trí tuệ nhân tạo Galaxy AI đột phá...'),

('samsung-galaxy-z-fold6', 'Samsung Galaxy Z Fold6 5G 256GB - Siêu Phẩm Màn Hình Gập AI', 'Samsung', 'foldable', 41990000, 43990000, 4.9, 156, 650, 1, 1, 0, NULL, 20, 50, 'Đẳng Cấp Doanh Nhân',
 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
 '["https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800"]',
 '[{"name": "Xám Metal", "hex": "#636569"}, {"name": "Xanh Navy", "hex": "#212d40"}]',
 '[{"size": "256GB", "priceOffset": 0}, {"size": "512GB", "priceOffset": 5000000}]',
 '{"screen": "Chính: 7.6 Dynamic AMOLED 2X | Phụ: 6.3", "cpu": "Snapdragon 8 Gen 3", "ram": "12 GB", "battery": "4.400 mAh", "os": "Android 14"}',
 'Galaxy Z Fold6 là mẫu điện thoại gập flagship mỏng nhẹ đẳng cấp...'),

('xiaomi-14-ultra', 'Xiaomi 14 Ultra 5G 512GB - Nhiếp Ảnh Huyền Thoại Leica', 'Xiaomi', 'flagship', 27990000, 31990000, 4.8, 215, 940, 1, 0, 0, NULL, 25, 65, 'Camera Khủng 1 Inch Leica',
 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
 '["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800"]',
 '[{"name": "Đen Da Thuần Chay", "hex": "#1c1c1c"}, {"name": "Trắng Gốm", "hex": "#ececec"}]',
 '[{"size": "512GB", "priceOffset": 0}, {"size": "1TB", "priceOffset": 4500000}]',
 '{"screen": "6.73 LTPO AMOLED 2K 120Hz 3000 nits", "cpu": "Snapdragon 8 Gen 3", "ram": "16 GB", "battery": "5.000 mAh 90W", "os": "Xiaomi HyperOS"}',
 'Xiaomi 14 Ultra là tuyệt tác nhiếp ảnh di động cùng Leica...'),

('asus-rog-phone-8-pro', 'ASUS ROG Phone 8 Pro 512GB - Quái Vật Gaming Đỉnh Cao', 'ASUS', 'gaming', 25490000, 28990000, 4.9, 142, 520, 1, 0, 0, NULL, 18, 40, 'Gaming Phone Số 1 Thế Giới',
 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
 '["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800"]',
 '[{"name": "Phantom Black", "hex": "#111111"}]',
 '[{"size": "512GB", "priceOffset": 0}, {"size": "1TB", "priceOffset": 5000000}]',
 '{"screen": "6.78 AMOLED FHD+ 165Hz LTPO", "cpu": "Snapdragon 8 Gen 3", "ram": "16 GB", "battery": "5.500 mAh 65W", "os": "ROG UI"}',
 'ASUS ROG Phone 8 Pro quái vật hiệu năng gaming đỉnh nhất...'),

('samsung-galaxy-a55-5g', 'Samsung Galaxy A55 5G 128GB - Khung Kim Loại Tầm Trung', 'Samsung', 'midrange', 8990000, 10490000, 4.7, 310, 3200, 0, 0, 1, 8490000, 60, 88, 'Bán Chạy Dưới 10 Triệu',
 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
 '["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800"]',
 '[{"name": "Xanh Iceblue", "hex": "#a6cce0"}, {"name": "Tím Lilac", "hex": "#d6c4e0"}]',
 '[{"size": "128GB", "priceOffset": 0}, {"size": "256GB", "priceOffset": 1200000}]',
 '{"screen": "6.6 Super AMOLED 120Hz", "cpu": "Exynos 1480", "ram": "8 GB", "battery": "5.000 mAh 25W", "os": "Android 14"}',
 'Samsung Galaxy A55 5G khung kim loại sang trọng...')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `price`=VALUES(`price`), `stock`=VALUES(`stock`);

-- Seed Đơn Hàng Mẫu Ban Đầu Cho Dashboard
INSERT INTO `orders` (
  `id`, `order_code`, `customer_name`, `customer_phone`, `customer_email`, `customer_address`,
  `subtotal`, `discount_amount`, `total_amount`, `payment_method`, `payment_status`, `order_status`
) VALUES 
  (1, 'TZ-8A9F21', 'Trần Văn Mạnh', '0912 345 678', 'manh.tran@gmail.com', '45 Lê Duẩn, Phường Bến Nghé, Quận 1, TP.HCM', 33490000, 500000, 32990000, 'vietqr', 'paid', 'completed'),
  (2, 'TZ-3B7D88', 'Nguyễn Thị Hương', '0988 777 666', 'huong.nguyen@gmail.com', '18 Hai Bà Trưng, Quận Hoàn Kiếm, Hà Nội', 28490000, 1000000, 27490000, 'vnpay', 'paid', 'shipping'),
  (3, 'TZ-1C4E52', 'Lê Hoàng Nam', '0903 111 222', 'nam.le@gmail.com', '88 Nguyễn Thị Minh Khai, Quận 3, TP.HCM', 8490000, 0, 8490000, 'cod', 'unpaid', 'pending')
ON DUPLICATE KEY UPDATE `customer_name`=VALUES(`customer_name`);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_name`, `product_thumbnail`, `color_name`, `storage_size`, `price`, `quantity`, `total_price`)
VALUES 
  (1, 'iphone-16-pro-max', 'iPhone 16 Pro Max 256GB', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', 'Titan Tự Nhiên', '256GB', 33490000, 1, 33490000),
  (2, 'samsung-galaxy-s24-ultra', 'Samsung Galaxy S24 Ultra 256GB', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', 'Xám Titan', '256GB', 28490000, 1, 28490000),
  (3, 'samsung-galaxy-a55-5g', 'Samsung Galaxy A55 5G 128GB', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800', 'Xanh Iceblue', '128GB', 8490000, 1, 8490000)
ON DUPLICATE KEY UPDATE `product_name`=VALUES(`product_name`);
