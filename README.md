# 📱 TECHZONE PHONE STORE - FULL-STACK E-COMMERCE

> **Dự án Website Bán Điện Thoại Thông Minh Hiện Đại (Full-Stack React + Node.js Express + MySQL Database + Admin Dashboard)**

---

## 🌟 1. Thông Tin Cấu Hình Cơ Sở Dữ Liệu MySQL

- **Host**: `127.0.0.1:3306`
- **User**: `root`
- **Database**: `techzone_db`
- **Bảng dữ liệu (Tables)**:
  - `users`: Quản lý tài khoản Admin & Khách hàng
  - `products`: Danh mục điện thoại, giá, tồn kho, flash sale, thông số kỹ thuật JSON
  - `orders`: Quản lý đơn đặt hàng, địa chỉ, trạng thái vận chuyển, thanh toán
  - `order_items`: Chi tiết từng máy trong đơn hàng
  - `coupons`: Mã giảm giá, voucher khuyến mãi

---

## 👑 2. Tài Khoản Quản Trị Viên (Admin Portal)

- **Đường dẫn Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Tài khoản Đăng nhập Quản trị**:
  - **Email**: `admin@techzone.vn`
  - **Mật khẩu**: `admin123`
- **Tài khoản Khách hàng thử nghiệm**:
  - **Email**: `customer@techzone.vn`
  - **Mật khẩu**: `123456`

---

## 🚀 3. Hướng Dẫn Chạy Dự Án

### Cách 1: Chạy nhanh bằng 1-Click (Khuyên dùng trên Windows)
- Nhấp đúp chuột vào file **`start.bat`** ở thư mục gốc `D:\techzone-phone-store`.
- File này sẽ tự động khởi động đồng thời cả:
  1. **Backend Server API**: `http://localhost:5000/api`
  2. **Frontend Website**: `http://localhost:3000`

### Cách 2: Chạy thủ công qua Terminal trong Antigravity IDE
1. **Khởi động Backend API**:
   ```bash
   cd D:\techzone-phone-store\server
   npm start
   ```
2. **Khởi động Frontend Vite**:
   ```bash
   cd D:\techzone-phone-store
   npm run dev
   ```

---

## 🛠️ 4. Các Chức Năng Chính Của Admin Dashboard (`/admin`)

1. **📊 Tổng quan (Dashboard Overview)**:
   - 4 thẻ KPI thời gian thực: Tổng doanh thu, Tổng đơn hàng, Sản phẩm đang bán, Khách hàng mới.
   - Biểu đồ tăng trưởng doanh thu 7 ngày qua.
   - Bảng 5 đơn hàng mới nhất và Top 4 sản phẩm bán chạy nhất.

2. **📱 Quản lý Sản phẩm (`/admin/products`)**:
   - Thêm điện thoại mới vào Database MySQL (Tên máy, Hãng, Phân khúc, Giá bán, Tồn kho, Ảnh, Flash Sale, Mô tả).
   - Chỉnh sửa giá, cập nhật số lượng tồn kho.
   - Xóa sản phẩm khỏi Database với hộp thoại xác nhận.

3. **📦 Quản lý Đơn hàng (`/admin/orders`)**:
   - Lọc đơn theo trạng thái: *Chờ xác nhận, Đã xác nhận, Đang đóng gói, Đang giao hàng, Giao thành công, Đã hủy*.
   - Xem chi tiết thông tin người nhận, địa chỉ giao hàng, từng món hàng trong đơn.
   - Cập nhật trực tiếp trạng thái vận chuyển và trạng thái thanh toán vào MySQL.

4. **🏷️ Quản lý Mã giảm giá (`/admin/coupons`)**:
   - Tạo mã voucher mới (giảm tiền cố định hoặc giảm theo %).
   - Bật / Tắt trạng thái hoạt động của voucher.

5. **👥 Quản lý Người dùng (`/admin/users`)**:
   - Danh sách tài khoản Admin và Khách hàng đăng ký trên hệ thống.

---

## 🔗 5. GitHub Repository
Mã nguồn chính thức được đồng bộ tại:
👉 **[https://github.com/dqm180204-minh/Tech-zone.git](https://github.com/dqm180204-minh/Tech-zone.git)**
