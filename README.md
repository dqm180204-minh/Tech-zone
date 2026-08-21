# 📱 TechZone - Website Bán Điện Thoại Hiện Đại

Dự án website thương mại điện tử chuyên nghiệp bán điện thoại thông minh chính hãng (Apple, Samsung, Xiaomi, OPPO, Google, ASUS...).

## 🚀 Hướng dẫn khởi chạy dự án

### 1. Cách nhanh nhất (Windows):
Double click vào file **`start.bat`** trong thư mục `D:\techzone-phone-store`.

### 2. Sử dụng dòng lệnh (Terminal):
Mở PowerShell hoặc Command Prompt tại thư mục dự án và chạy:

```bash
# Cài đặt thư viện (nếu cần tải lại)
npm install

# Khởi động server phát triển (Development)
npm run dev

# Đóng gói sản phẩm (Production Build)
npm run build
```

Sau đó mở trình duyệt truy cập: **http://localhost:3000**

---

## 🛠️ Cấu trúc thư mục chính

```
D:\techzone-phone-store\
├── public/                 # Favicon và tài nguyên tĩnh
├── src/
│   ├── components/         # Header, Footer, HeroBanner, FlashSale, ProductCard, Filter, Reviews, Cart...
│   ├── context/            # CartContext, AuthContext, WishlistContext, ToastContext
│   ├── data/               # mockProducts.js, banners.js
│   ├── pages/              # HomePage, ProductsPage, ProductDetailPage, CartPage, CheckoutPage, WishlistPage, LoginPage, RegisterPage
│   ├── utils/              # formatters.js (Định dạng tiền tệ VNĐ, voucher)
│   ├── App.jsx             # Router và Layout
│   └── index.css           # Cấu hình Tailwind CSS
├── start.bat               # File chạy nhanh 1-click
└── package.json
```
