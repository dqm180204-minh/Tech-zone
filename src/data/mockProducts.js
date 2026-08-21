export const BRANDS = [
  { id: 'all', name: 'Tất cả' },
  { id: 'Apple', name: 'Apple (iPhone)', logo: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=100&auto=format&fit=crop&q=80' },
  { id: 'Samsung', name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&auto=format&fit=crop&q=80' },
  { id: 'Xiaomi', name: 'Xiaomi', logo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&auto=format&fit=crop&q=80' },
  { id: 'OPPO', name: 'OPPO', logo: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100&auto=format&fit=crop&q=80' },
  { id: 'Google', name: 'Google Pixel', logo: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=100&auto=format&fit=crop&q=80' },
  { id: 'ASUS', name: 'ASUS ROG', logo: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&auto=format&fit=crop&q=80' },
  { id: 'Vivo', name: 'Vivo', logo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&auto=format&fit=crop&q=80' },
];

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'flagship', name: 'Flagship Cao Cấp' },
  { id: 'gaming', name: 'Gaming Khủng' },
  { id: 'midrange', name: 'Tầm Trung Nổi Bật' },
  { id: 'budget', name: 'Giá Rẻ Tiết Kiệm' },
  { id: 'foldable', name: 'Màn Hình Gập' },
];

export const PRODUCTS = [
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
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Titan Tự Nhiên', hex: '#9f9a94', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80' },
      { name: 'Titan Sa Mạc', hex: '#d4b797', image: 'https://images.unsplash.com/photo-1695048133021-36427329fb78?w=800&auto=format&fit=crop&q=80' },
      { name: 'Titan Trắng', hex: '#f2f2f2', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80' },
      { name: 'Titan Đen', hex: '#37383a', image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&auto=format&fit=crop&q=80' },
    ],
    storageOptions: [
      { size: '256GB', priceOffset: 0 },
      { size: '512GB', priceOffset: 6000000 },
      { size: '1TB', priceOffset: 12000000 },
    ],
    ramOptions: ['8GB'],
    highlights: [
      'Chip Apple A18 Pro 3nm đỉnh cao sức mạnh AI',
      'Màn hình Super Retina XDR 6.9 inch 120Hz viền mỏng kỷ lục',
      'Nút Điều khiển Camera (Camera Control) cảm ứng chuyên nghiệp',
      'Khung viền Titan cấp 5 siêu nhẹ và bền bỉ',
      'Thời lượng pin xem video lên đến 33 giờ liên tục'
    ],
    specs: {
      screen: '6.9" Super Retina XDR OLED, 120Hz ProMotion, 2000 nits',
      cpu: 'Apple A18 Pro (3nm) 6 nhân CPU & 6 nhân GPU',
      ram: '8 GB',
      rom: '256 GB / 512 GB / 1 TB',
      rearCamera: 'Chính 48 MP + Siêu rộng 48 MP + Tele 5x 12 MP',
      frontCamera: '12 MP TrueDepth, quay 4K Dolby Vision',
      battery: '4.685 mAh, Sạc nhanh 30W, MagSafe 25W',
      os: 'iOS 18 (Hỗ trợ Apple Intelligence)',
      sim: '1 Nano SIM + 1 eSIM hoặc 2 eSIM',
      weight: '227 g',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, USB-C 3.0 (10Gbps)'
    },
    description: `iPhone 16 Pro Max là đỉnh cao công nghệ di động năm nay từ Apple. Sở hữu màn hình lớn 6.9 inch với viền mỏng nhất từ trước đến nay, trang bị sức mạnh vô song từ vi xử lý A18 Pro và nút chụp ảnh chuyên dụng Camera Control.
    
Hệ thống 3 camera được nâng cấp vượt bậc với cảm biến góc siêu rộng 48MP và khả năng quay video 4K 120fps chuẩn điện ảnh. Thời lượng pin dài nhất từng có trên iPhone giúp bạn yên tâm sử dụng suốt ngày dài.`,
    reviews: [
      { id: 1, author: 'Nguyễn Văn Minh', rating: 5, date: '2026-08-10', comment: 'Máy quá đẹp, viền mỏng dính nhìn phê thực sự. Nút camera control bấm tiện lợi, chụp ảnh siêu nét!', verified: true },
      { id: 2, author: 'Trần Thị Thu Thảo', rating: 5, date: '2026-08-08', comment: 'Màu titan tự nhiên sang trọng, cầm đầm tay, shop đóng gói cẩn thận giao hàng trong 2 giờ.', verified: true },
      { id: 3, author: 'Lê Hoàng Nam', rating: 4.8, date: '2026-08-01', comment: 'Pin trâu dùng 1.5 ngày thoải mái. Màn hình 120Hz mượt mà, chơi game không nóng máy.', verified: true }
    ]
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
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Xám Titan', hex: '#6c6f70', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
      { name: 'Đen Titan', hex: '#262626', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80' },
      { name: 'Tím Titan', hex: '#7a7082', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80' },
      { name: 'Vàng Titan', hex: '#eed8a1', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
    ],
    storageOptions: [
      { size: '256GB', priceOffset: 0 },
      { size: '512GB', priceOffset: 4500000 },
      { size: '1TB', priceOffset: 9500000 },
    ],
    ramOptions: ['12GB'],
    highlights: [
      'Trợ lý trí tuệ nhân tạo toàn diện Galaxy AI (Khoanh vùng tìm kiếm, Dịch trực tiếp cuộc gọi)',
      'Camera 200MP cảm biến khổng lồ & Zoom quang 5x AI Zoom 100x',
      'Bút S-Pen tích hợp đa năng điều khiển từ xa',
      'Màn hình phẳng chống lóa Corning Gorilla Armor đỉnh cao',
      'Khung Titan cao cấp bền bỉ chuẩn kháng nước IP68'
    ],
    specs: {
      screen: '6.8" Dynamic AMOLED 2X, QHD+, 1-120Hz, 2600 nits, Kính chống lóa',
      cpu: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      ram: '12 GB',
      rom: '256 GB / 512 GB / 1 TB',
      rearCamera: '200 MP + 50 MP (5x) + 12 MP (Góc rộng) + 10 MP (3x)',
      frontCamera: '12 MP Dual Pixel PDAF',
      battery: '5.000 mAh, Sạc nhanh 45W, Không dây 15W',
      os: 'Android 14, One UI 6.1.1 (Cập nhật 7 năm)',
      sim: '2 Nano SIM hoặc 1 Nano + 1 eSIM',
      weight: '232 g',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, Ultra Wideband (UWB)'
    },
    description: `Samsung Galaxy S24 Ultra mở ra kỷ nguyên điện thoại thông minh thế hệ mới với bộ tính năng Galaxy AI đột phá. Bạn có thể dịch cuộc gọi theo thời gian thực, tóm tắt trang web, chỉnh sửa ảnh thần kỳ và khoanh tròn bất kỳ vật thể nào trên màn hình để tìm kiếm ngay lập tức với Google.`,
    reviews: [
      { id: 1, author: 'Đặng Tuấn Anh', rating: 5, date: '2026-08-14', comment: 'Galaxy AI quá tiện cho công việc, dịch thuật văn bản họp hành chuẩn chỉ. Màn hình chống lóa ra trời nắng cực rõ.', verified: true },
      { id: 2, author: 'Phạm Quỳnh Nga', rating: 5, date: '2026-08-11', comment: 'Camera chụp zoom concert ca nhạc nét từng sợi tóc, bút S-Pen ký hợp đồng tiện lợi.', verified: true }
    ]
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
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Xám Metal', hex: '#636569', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80' },
      { name: 'Hồng Rose', hex: '#e8c4c4', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
      { name: 'Xanh Navy', hex: '#212d40', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80' },
    ],
    storageOptions: [
      { size: '256GB', priceOffset: 0 },
      { size: '512GB', priceOffset: 5000000 },
      { size: '1TB', priceOffset: 11000000 },
    ],
    ramOptions: ['12GB'],
    highlights: [
      'Thiết kế mỏng nhẹ vuông vức hoàn hảo, bản lề FlexHinge thế hệ mới',
      'Màn hình chính 7.6" siêu sáng 2600 nits, nếp gập tàng hình',
      'Màn hình phụ 6.3" tỷ lệ rộng rãi gõ phím thoải mái',
      'Đa nhiệm tối đa 3 ứng dụng cùng lúc với thanh taskbar tiện lợi',
      'Trang bị Snapdragon 8 Gen 3 for Galaxy tản nhiệt buồng hơi lớn hơn 1.6x'
    ],
    specs: {
      screen: 'Chính: 7.6" Dynamic AMOLED 2X (1-120Hz) | Phụ: 6.3" AMOLED 2X',
      cpu: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      ram: '12 GB',
      rom: '256 GB / 512 GB / 1 TB',
      rearCamera: '50 MP + 12 MP + 10 MP (3x Tele)',
      frontCamera: 'Màn hình ngoài 10 MP + Ẩn dưới màn hình trong 4 MP',
      battery: '4.400 mAh, Sạc nhanh 25W, Không dây 15W',
      os: 'Android 14, One UI 6.1.1 tối ưu màn hình lớn',
      sim: '2 SIM (Nano + eSIM)',
      weight: '239 g (nhẹ nhất dòng Fold)',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3'
    },
    description: `Galaxy Z Fold6 là mẫu điện thoại gập flagship đỉnh nhất với thiết kế mỏng nhẹ đáng kinh ngạc chỉ 239g. Tích hợp AI chuyển đổi phác thảo thành hình ảnh nghệ thuật (Sketch to Image) và dịch thuật hai chiều thông minh trên cả hai màn hình.`,
    reviews: [
      { id: 1, author: 'Hoàng Quốc Việt', rating: 5, date: '2026-08-16', comment: 'Fold6 cầm nhẹ hơn hẳn Fold5, viền vuông nhìn nam tính sang trọng. Xem biểu đồ chứng khoán trên màn hình to cực thích.', verified: true }
    ]
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
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Đen Da Thuần Chay', hex: '#1c1c1c', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80' },
      { name: 'Trắng Gốm', hex: '#ececec', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80' },
    ],
    storageOptions: [
      { size: '512GB', priceOffset: 0 },
      { size: '1TB', priceOffset: 4500000 },
    ],
    ramOptions: ['16GB'],
    highlights: [
      'Cảm biến Sony LYT-900 1-inch với khẩu độ thay đổi vô cấp f/1.63 - f/4.0',
      'Hệ thống 4 camera Leica 50MP bao phủ mọi tiêu cự từ 12mm đến 120mm',
      'Màn hình cong tràn 4 cạnh All Around Liquid 2K AMOLED 120Hz',
      'Chipset Snapdragon 8 Gen 3 kết hợp tản nhiệt IceLoop kép',
      'Pin 5000mAh hỗ trợ sạc siêu nhanh 90W có dây & 80W không dây'
    ],
    specs: {
      screen: '6.73" LTPO AMOLED 2K (3200 x 1440), 120Hz, 3000 nits, Dolby Vision',
      cpu: 'Snapdragon 8 Gen 3 (4nm)',
      ram: '16 GB LPDDR5X',
      rom: '512 GB / 1 TB UFS 4.0',
      rearCamera: '4 ống kính 50 MP (Chính 1-inch + Tele 3.2x + Tiềm vọng 5x + Góc siêu rộng)',
      frontCamera: '32 MP góc rộng',
      battery: '5.000 mAh, Sạc có dây 90W, Không dây 80W',
      os: 'Xiaomi HyperOS (Android 14)',
      sim: '2 Nano SIM',
      weight: '219.8 g',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.4, Cổng USB 3.2 Gen 2'
    },
    description: `Xiaomi 14 Ultra là tuyệt tác nhiếp ảnh di động được hợp tác phát triển cùng hãng máy ảnh danh tiếng Leica. Khẩu độ cơ học tùy chỉnh và thấu kính Summilux mang đến chất ảnh xóa phông tự nhiên và màu sắc điện ảnh không thể nhầm lẫn.`,
    reviews: [
      { id: 1, author: 'Vũ Đức Thành', rating: 5, date: '2026-08-05', comment: 'Chụp ảnh đường phố với màu Leica Authentic quá đỉnh! Cầm máy như cầm một chiếc máy ảnh compact chuyên nghiệp.', verified: true }
    ]
  },
  {
    id: 'iphone-15-128gb',
    name: 'iPhone 15 128GB - Dynamic Island & Camera 48MP Đột Phá',
    brand: 'Apple',
    category: 'midrange',
    price: 18490000,
    originalPrice: 21990000,
    rating: 4.8,
    reviewCount: 620,
    soldCount: 4300,
    isHot: false,
    isNew: false,
    isFlashSale: true,
    flashSalePrice: 17790000,
    stock: 55,
    soldPercent: 92,
    badge: 'Top 1 Bán Chạy Tầm Trung',
    thumbnail: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Hồng Pastel', hex: '#f9d2d5', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80' },
      { name: 'Xanh Lá', hex: '#d1e5d4', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80' },
      { name: 'Xanh Dương', hex: '#d0e0ea', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80' },
      { name: 'Đen Nhám', hex: '#313335', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80' }
    ],
    storageOptions: [
      { size: '128GB', priceOffset: 0 },
      { size: '256GB', priceOffset: 2800000 },
      { size: '512GB', priceOffset: 7000000 },
    ],
    ramOptions: ['6GB'],
    highlights: [
      'Đảo thích ứng Dynamic Island thông minh hiển thị thông báo trực quan',
      'Camera chính 48MP cho ảnh siêu chi tiết và zoom 2x quang học',
      'Mặt lưng kính pha màu mờ mịn chống bám vân tay tinh tế',
      'Cổng sạc kết nối chuẩn USB-C tương thích mọi thiết bị',
      'Vi xử lý A16 Bionic mạnh mẽ mượt mà suốt nhiều năm'
    ],
    specs: {
      screen: '6.1" Super Retina XDR OLED, 2000 nits, Dynamic Island',
      cpu: 'Apple A16 Bionic (4nm)',
      ram: '6 GB',
      rom: '128 GB / 256 GB / 512 GB',
      rearCamera: 'Chính 48 MP + Siêu rộng 12 MP',
      frontCamera: '12 MP TrueDepth',
      battery: '3.349 mAh, Sạc nhanh 20W, MagSafe 15W',
      os: 'iOS 18',
      sim: '1 Nano SIM + 1 eSIM',
      weight: '171 g',
      connectivity: '5G, Wi-Fi 6, USB-C'
    },
    description: `iPhone 15 mang đến sự kết hợp hoàn hảo giữa thiết kế trẻ trung hiện đại, đảo Dynamic Island tiện ích và cổng sạc Type-C tiêu chuẩn. Với camera 48MP sắc nét gấp 4 lần thế hệ cũ, mọi khoảnh khắc đời thường đều trở thành kiệt tác.`,
    reviews: [
      { id: 1, author: 'Nguyễn Bích Phương', rating: 5, date: '2026-08-12', comment: 'Màu hồng pastel xinh xỉu! Cổng Type C tiện lợi sạc chung với sạc dự phòng và laptop.', verified: true }
    ]
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
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Phantom Black (Anime Matrix LED)', hex: '#111111', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80' }
    ],
    storageOptions: [
      { size: '512GB', priceOffset: 0 },
      { size: '1TB', priceOffset: 5000000 },
    ],
    ramOptions: ['16GB', '24GB'],
    highlights: [
      'Màn hình AMOLED Samsung E6 tần số quét 165Hz siêu mượt phản hồi 720Hz',
      'Nút cảm ứng siêu âm AirTrigger chuẩn tay cầm chơi game chuyên nghiệp',
      'Hệ thống tản nhiệt ma trận GameCool 8 giảm tới 12°C',
      'Hệ thống màn hình phụ AniMe Vision 341 bóng LED Mini-LED cực ngầu',
      'Pin 5500mAh hỗ trợ sạc siêu nhanh 65W HyperCharge và sạc nhánh Bypass'
    ],
    specs: {
      screen: '6.78" AMOLED FHD+ 165Hz LTPO, 2500 nits, Gorilla Glass Victus 2',
      cpu: 'Snapdragon 8 Gen 3 (4nm)',
      ram: '16 GB / 24 GB LPDDR5X',
      rom: '512 GB / 1 TB UFS 4.0',
      rearCamera: '50 MP chống rung Gimbal 6 trục + 32 MP Tele 3x + 13 MP góc rộng',
      frontCamera: '32 MP RGBW',
      battery: '5.500 mAh, Sạc nhanh 65W Quick Charge 5.0, Sạc không dây 15W',
      os: 'ROG UI (Android 14) tối ưu hóa gaming Armoury Crate',
      sim: '2 Nano SIM',
      weight: '225 g (Kháng nước IP68)',
      connectivity: '5G, Wi-Fi 7, 2 Cổng sạc USB-C (Dưới & Cạnh bên), Giắc 3.5mm'
    },
    description: `ASUS ROG Phone 8 Pro tái định nghĩa gaming phone: không chỉ sở hữu hiệu năng phần cứng vô địch với Snapdragon 8 Gen 3 và tản nhiệt chủ động, máy còn có thiết kế mỏng nhẹ thanh lịch hơn, chống nước IP68 và camera Gimbal đẳng cấp.`,
    reviews: [
      { id: 1, author: 'Cao Minh Chiến', rating: 5, date: '2026-08-15', comment: 'Chơi Genshin Max setting 60fps mượt như nhung không hề rớt khung hình. Nút trigger bắn PUBG sấy cực sướng.', verified: true }
    ]
  },
  {
    id: 'google-pixel-9-pro',
    name: 'Google Pixel 9 Pro 5G 128GB - Thuần Khiết Android AI',
    brand: 'Google',
    category: 'flagship',
    price: 24990000,
    originalPrice: 26990000,
    rating: 4.8,
    reviewCount: 98,
    soldCount: 310,
    isHot: true,
    isNew: true,
    isFlashSale: false,
    stock: 15,
    soldPercent: 45,
    badge: 'Mới Ra Mắt',
    thumbnail: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Obsidian Đen', hex: '#222324', image: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80' },
      { name: 'Porcelain Trắng', hex: '#f0ede6', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80' },
      { name: 'Hazel Xám Rêu', hex: '#878c85', image: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80' }
    ],
    storageOptions: [
      { size: '128GB', priceOffset: 0 },
      { size: '256GB', priceOffset: 2500000 },
      { size: '512GB', priceOffset: 6000000 },
    ],
    ramOptions: ['16GB'],
    highlights: [
      'Vi xử lý Google Tensor G4 tối ưu riêng cho mô hình Gemini Nano AI',
      'Tính năng Gemini Live trò chuyện bằng giọng nói thông minh tự nhiên',
      'Camera Pro 50MP với tính năng Thêm tôi (Add Me) độc quyền',
      'Màn hình Super Actua sáng nhất phân khúc lên đến 3000 nits',
      'Cam kết cập nhật hệ điều hành và bảo mật lên tới 7 năm liên tục'
    ],
    specs: {
      screen: '6.3" LTPO OLED Super Actua, 1-120Hz, 3000 nits',
      cpu: 'Google Tensor G4 + Đồng chip Titan M2',
      ram: '16 GB',
      rom: '128 GB / 256 GB / 512 GB',
      rearCamera: '50 MP chính + 48 MP góc siêu rộng + 48 MP Tele 5x zoom quang',
      frontCamera: '42 MP góc rộng lấy nét tự động Dual PD',
      battery: '4.700 mAh, Sạc nhanh 30W, Sạc không dây Qi2',
      os: 'Android 15 gốc Google (Hỗ trợ 7 năm OS)',
      sim: '1 Nano SIM + 1 eSIM',
      weight: '199 g',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, UWB, Vệ tinh SOS'
    },
    description: `Google Pixel 9 Pro mang đến trải nghiệm AI thông minh nhất từ trước đến nay. Tích hợp sâu trợ lý Gemini Live và hệ thống camera nhiếp ảnh thuật toán danh tiếng, giúp mọi bức ảnh chân dung và phong cảnh luôn đạt chất lượng hoàn hảo.`,
    reviews: [
      { id: 1, author: 'Đỗ Hữu Minh', rating: 5, date: '2026-08-18', comment: 'Tính năng Add Me chụp ảnh nhóm tiện bất ngờ. Giao diện Android thuần mượt mà không app rác.', verified: true }
    ]
  },
  {
    id: 'oppo-find-x7-ultra',
    name: 'OPPO Find X7 Ultra 5G 256GB - 2 Camera Tiềm Vọng Đầu Tiên',
    brand: 'OPPO',
    category: 'flagship',
    price: 22990000,
    originalPrice: 25990000,
    rating: 4.7,
    reviewCount: 88,
    soldCount: 410,
    isHot: false,
    isNew: false,
    isFlashSale: false,
    stock: 22,
    soldPercent: 35,
    badge: 'Ống Kính Kép Hasselblad',
    thumbnail: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Xanh Nâu Da Cao Cấp', hex: '#485e75', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80' },
      { name: 'Đen Tuyết Lãnh', hex: '#1e1e1e', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80' }
    ],
    storageOptions: [
      { size: '256GB', priceOffset: 0 },
      { size: '512GB', priceOffset: 3500000 },
    ],
    ramOptions: ['12GB', '16GB'],
    highlights: [
      'Điện thoại đầu tiên sở hữu cụm Camera Tiềm Vọng Kép (3x và 6x quang học)',
      'Cảm biến chính 1 inch Sony LYT-900 thế hệ mới tái tạo dải tương phản cực rộng',
      'Hợp tác hiệu chỉnh quang học cùng thương hiệu Hasselblad Thụy Điển',
      'Màn hình cong 2K 120Hz độ sáng đỉnh 4500 nits',
      'Sạc siêu tốc 100W SuperVOOC sạc đầy trong chỉ 26 phút'
    ],
    specs: {
      screen: '6.82" LTPO AMOLED 2K (3168 x 1440), 120Hz, 4500 nits',
      cpu: 'Snapdragon 8 Gen 3 (4nm)',
      ram: '12 GB / 16 GB LPDDR5X',
      rom: '256 GB / 512 GB UFS 4.0',
      rearCamera: '4 camera 50 MP (Chính 1-inch + Tiềm vọng 3x + Tiềm vọng 6x + Góc siêu rộng)',
      frontCamera: '32 MP Sony IMX709',
      battery: '5.000 mAh, Sạc nhanh SuperVOOC 100W, Sạc không dây AirVOOC 50W',
      os: 'ColorOS 14 (Android 14)',
      sim: '2 Nano SIM',
      weight: '221 g',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.4'
    },
    description: `OPPO Find X7 Ultra là bước nhảy vọt trong công nghệ zoom di động khi tích hợp tới 2 camera kính tiềm vọng và cảm biến 1 inch đỉnh cao.`,
    reviews: [
      { id: 1, author: 'Trần Văn Duy', rating: 5, date: '2026-08-02', comment: 'Chụp chân dung tiêu cự 65mm và 135mm xóa phông mượt mà tuyệt đối, màu da người chân thực.', verified: true }
    ]
  },
  {
    id: 'samsung-galaxy-a55-5g',
    name: 'Samsung Galaxy A55 5G 128GB - Khung Kim Loại Cao Cấp Tầm Trung',
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
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Xanh Iceblue', hex: '#a6cce0', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
      { name: 'Tím Lilac', hex: '#d6c4e0', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' },
      { name: 'Xanh Navy', hex: '#1f2e4d', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80' }
    ],
    storageOptions: [
      { size: '128GB', priceOffset: 0 },
      { size: '256GB', priceOffset: 1200000 },
    ],
    ramOptions: ['8GB'],
    highlights: [
      'Khung viền kim loại vát phẳng cao cấp và mặt lưng kính Gorilla Glass Victus+',
      'Màn hình Super AMOLED 6.6" 120Hz rực rỡ với Vision Booster',
      'Chip Exynos 1480 có GPU kiến trúc AMD RDNA tối ưu đồ họa',
      'Bảo mật phần cứng cấp doanh nghiệp Samsung Knox Vault',
      'Chuẩn kháng nước & bụi cao cấp IP67'
    ],
    specs: {
      screen: '6.6" Super AMOLED FHD+ 120Hz, 1000 nits',
      cpu: 'Exynos 1480 (4nm) GPU Xclipse 530',
      ram: '8 GB',
      rom: '128 GB / 256 GB (Hỗ trợ thẻ nhớ MicroSD 1TB)',
      rearCamera: '50 MP OIS + 12 MP góc rộng + 5 MP macro',
      frontCamera: '32 MP quay video 4K',
      battery: '5.000 mAh, Sạc nhanh 25W',
      os: 'Android 14, One UI 6.1 (4 năm cập nhật OS)',
      sim: '2 SIM hoặc 1 SIM + Thẻ nhớ',
      weight: '213 g',
      connectivity: '5G, Wi-Fi 6, Bluetooth 5.3, NFC'
    },
    description: `Samsung Galaxy A55 5G là mẫu điện thoại tầm trung quốc dân với thiết kế khung nhôm chắc chắn sang trọng chuẩn flagship. Bảo mật Knox Vault bảo vệ toàn diện dữ liệu nhạy cảm của bạn.`,
    reviews: [
      { id: 1, author: 'Lê Thùy Dung', rating: 5, date: '2026-08-04', comment: 'Khung kim loại cầm chắc chắn, màu tím lilac rất xinh. Pin 5000 dùng lướt web cả ngày vẫn còn 35%.', verified: true }
    ]
  },
  {
    id: 'redmi-note-13-pro-plus',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G 256GB - Màn Cong & Sạc 120W',
    brand: 'Xiaomi',
    category: 'midrange',
    price: 9490000,
    originalPrice: 10990000,
    rating: 4.8,
    reviewCount: 412,
    soldCount: 3800,
    isHot: false,
    isNew: false,
    isFlashSale: false,
    stock: 40,
    soldPercent: 70,
    badge: 'Sạc 120W & Kháng Nước IP68',
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Tím Cực Quang', hex: '#b3a0c9', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80' },
      { name: 'Đen Bán Dạ', hex: '#1d1d1d', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80' },
      { name: 'Trắng Ánh Trăng', hex: '#f4f4f4', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80' }
    ],
    storageOptions: [
      { size: '256GB', priceOffset: 0 },
      { size: '512GB', priceOffset: 1500000 },
    ],
    ramOptions: ['8GB', '12GB'],
    highlights: [
      'Camera 200MP siêu phân giải cảm biến Samsung HP3 chống rung OIS kép',
      'Công nghệ sạc thần tốc 120W HyperCharge đầy 100% pin chỉ 19 phút',
      'Màn hình AMOLED cong 1.5K 120Hz 1800 nits cực đẹp',
      'Lần đầu tiên đạt chuẩn kháng bụi nước flagship IP68 trên dòng Redmi Note',
      'Chip Dimensity 7200-Ultra tiến trình 4nm TSMC mạnh mẽ mát mẻ'
    ],
    specs: {
      screen: '6.67" 1.5K CrystalRes AMOLED (2712 x 1220), 120Hz, Dolby Vision',
      cpu: 'MediaTek Dimensity 7200-Ultra (4nm)',
      ram: '8 GB / 12 GB',
      rom: '256 GB / 512 GB',
      rearCamera: '200 MP (OIS) + 8 MP góc siêu rộng + 2 MP macro',
      frontCamera: '16 MP',
      battery: '5.000 mAh, Sạc siêu nhanh 120W HyperCharge kèm củ sạc trong hộp',
      os: 'Xiaomi HyperOS',
      sim: '2 Nano SIM (Hỗ trợ eSIM)',
      weight: '204.5 g',
      connectivity: '5G, Wi-Fi 6, Bluetooth 5.3, NFC, Cổng hồng ngoại IR'
    },
    description: `Redmi Note 13 Pro+ 5G phá vỡ mọi giới hạn của smartphone tầm trung với thiết kế màn hình cong tràn viền, camera 200MP chống rung quang học, chuẩn chống nước IP68 và sạc đầy pin chỉ trong 19 phút.`,
    reviews: [
      { id: 1, author: 'Bùi Gia Huy', rating: 5, date: '2026-08-07', comment: 'Sạc 120W quá nhanh cắm tắm xong cái là 100% pin. Màn hình cong vuốt chạm siêu mượt, rất đáng tiền!', verified: true }
    ]
  },
  {
    id: 'vivo-v30e-5g',
    name: 'Vivo V30e 5G 256GB - Chuyên Gia Chân Dung Vòng Sáng Aura 3.0',
    brand: 'Vivo',
    category: 'midrange',
    price: 8490000,
    originalPrice: 9490000,
    rating: 4.6,
    reviewCount: 120,
    soldCount: 980,
    isHot: false,
    isNew: false,
    isFlashSale: false,
    stock: 30,
    soldPercent: 55,
    badge: 'Chụp Đêm Đỉnh Cao',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Nâu Rượu Vang', hex: '#582b35', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80' },
      { name: 'Xanh Mây Trời', hex: '#c0dce5', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80' }
    ],
    storageOptions: [
      { size: '256GB', priceOffset: 0 },
    ],
    ramOptions: ['8GB', '12GB'],
    highlights: [
      'Đèn Flash vòng sáng Aura 3.0 tự động điều chỉnh nhiệt độ màu thông minh',
      'Cảm biến chụp ảnh cao cấp Sony IMX882 50MP chống rung OIS',
      'Màn hình 3D cong 6.78 inch AMOLED 120Hz mỏng nhẹ chỉ 7.65mm',
      'Pin khủng 5500mAh dù thân máy siêu mỏng, độ bền pin 4 năm'
    ],
    specs: {
      screen: '6.78" 3D Curved AMOLED FHD+ 120Hz, 1300 nits',
      cpu: 'Snapdragon 6 Gen 1 (4nm)',
      ram: '8 GB / 12 GB',
      rom: '256 GB',
      rearCamera: '50 MP Sony IMX882 OIS + 8 MP góc siêu rộng',
      frontCamera: '32 MP HD Selfie với thuật toán xóa phông AI',
      battery: '5.500 mAh, Sạc nhanh FlashCharge 44W',
      os: 'Funtouch OS 14 (Android 14)',
      sim: '2 Nano SIM',
      weight: '179 g',
      connectivity: '5G, Wi-Fi 5, Bluetooth 5.1'
    },
    description: `Vivo V30e là chiếc smartphone chân dung hoàn hảo với đèn Aura Ring thế hệ thứ 3, mang lại ánh sáng mềm mại tự nhiên trong mọi điều kiện thiếu sáng.`,
    reviews: [
      { id: 1, author: 'Mai Phương Ly', rating: 5, date: '2026-08-09', comment: 'Chụp ảnh ban đêm có đèn aura da dẻ mịn màng tự nhiên, không bị cháy sáng như flash thường.', verified: true }
    ]
  },
  {
    id: 'realme-c65',
    name: 'realme C65 128GB - Thiết Kế Mỏng Nhẹ & Sạc Nhanh 45W',
    brand: 'realme',
    category: 'budget',
    price: 3690000,
    originalPrice: 4290000,
    rating: 4.5,
    reviewCount: 240,
    soldCount: 2900,
    isHot: false,
    isNew: false,
    isFlashSale: true,
    flashSalePrice: 3490000,
    stock: 50,
    soldPercent: 90,
    badge: 'Giá Rẻ Bán Chạy',
    thumbnail: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Xanh Khởi Sắc', hex: '#4b779a', image: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80' },
      { name: 'Đen Vũ Trụ', hex: '#222222', image: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80' }
    ],
    storageOptions: [
      { size: '128GB', priceOffset: 0 },
      { size: '256GB', priceOffset: 600000 },
    ],
    ramOptions: ['6GB', '8GB'],
    highlights: [
      'Thiết kế mặt lưng ánh sao lấp lánh mỏng chỉ 7.64mm',
      'Sạc nhanh 45W vượt trội nhất trong phân khúc giá rẻ',
      'Màn hình 90Hz mượt mà tích hợp Mini Capsule 2.0 thông minh',
      'Chứng nhận mượt mà 48 tháng không giật lag từ TÜV SÜD'
    ],
    specs: {
      screen: '6.67" IPS LCD 90Hz, 625 nits',
      cpu: 'MediaTek Helio G85',
      ram: '6 GB / 8 GB (Mở rộng RAM ảo +8GB)',
      rom: '128 GB / 256 GB (Thẻ nhớ tối đa 2TB)',
      rearCamera: '50 MP AI + Cảm biến đo chiều sâu',
      frontCamera: '8 MP AI Beauty',
      battery: '5.000 mAh, Sạc siêu nhanh 45W',
      os: 'realme UI 5.0 (Android 14)',
      sim: '2 Nano SIM + 1 Khe thẻ nhớ chuyên dụng',
      weight: '185 g',
      connectivity: '4G LTE, Wi-Fi 5, Giắc cắm tai nghe 3.5mm'
    },
    description: `realme C65 là lựa chọn smartphone phổ thông hoàn hảo với tốc độ sạc nhanh 45W dẫn đầu phân khúc và thiết kế sang trọng thanh mảnh.`,
    reviews: [
      { id: 1, author: 'Ngô Thanh Tùng', rating: 5, date: '2026-08-03', comment: 'Mua tặng mẹ xem youtube và gọi zalo dùng rất êm, pin trâu sạc nhanh.', verified: true }
    ]
  }
];
