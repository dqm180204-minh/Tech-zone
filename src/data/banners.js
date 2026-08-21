export const HERO_SLIDES = [
  {
    id: 1,
    title: 'iPhone 16 Pro Max',
    subtitle: 'Kỷ Nguyên Apple Intelligence',
    tagline: 'Titan Cấp 5 • A18 Pro 3nm • Camera Control Chuyên Nghiệp',
    discount: 'Ưu đãi tới 4.000.000₫',
    price: 'Từ 33.490.000₫',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1000&auto=format&fit=crop&q=80',
    link: '/product/iphone-16-pro-max',
    badge: 'Flagship Siêu Hot',
    bgColor: 'from-slate-900 via-indigo-950 to-slate-900',
    accentColor: 'text-amber-400'
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24 Ultra',
    subtitle: 'Quyền Năng Galaxy AI',
    tagline: 'Camera 200MP • Bút S-Pen • Màn Hình Chống Lóa Kỷ Lục',
    discount: 'Tặng Voucher 4 Triệu + Trả Góp 0%',
    price: 'Từ 28.490.000₫',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=1000&auto=format&fit=crop&q=80',
    link: '/product/samsung-galaxy-s24-ultra',
    badge: 'AI Phone Đỉnh Cao',
    bgColor: 'from-slate-900 via-blue-950 to-slate-900',
    accentColor: 'text-blue-400'
  },
  {
    id: 3,
    title: 'ASUS ROG Phone 8 Pro',
    subtitle: 'Thống Lĩnh Mọi Tựa Game',
    tagline: '165Hz LTPO AMOLED • Snapdragon 8 Gen 3 • AirTrigger Cực Nhạy',
    discount: 'Tặng Quạt Tản Nhiệt Cooler X',
    price: 'Từ 25.490.000₫',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&auto=format&fit=crop&q=80',
    link: '/product/asus-rog-phone-8-pro',
    badge: 'Quái Vật Gaming',
    bgColor: 'from-slate-950 via-red-950 to-slate-900',
    accentColor: 'text-red-400'
  }
];

export const PROMO_COUPONS = [
  {
    code: 'TECHZONE500',
    discountType: 'fixed',
    discountValue: 500000,
    minOrderValue: 5000000,
    description: 'Giảm 500.000₫ cho đơn từ 5.000.000₫'
  },
  {
    code: 'FLAGSHIP1000',
    discountType: 'fixed',
    discountValue: 1000000,
    minOrderValue: 20000000,
    description: 'Giảm 1.000.000₫ cho siêu phẩm Flagship từ 20 triệu'
  },
  {
    code: 'WELCOME10',
    discountType: 'percent',
    discountValue: 10,
    maxDiscount: 300000,
    minOrderValue: 1000000,
    description: 'Giảm 10% (tối đa 300k) cho khách hàng mới'
  }
];

export const SERVICE_COMMITMENTS = [
  {
    icon: 'ShieldCheck',
    title: '100% Hàng Chính Hãng',
    desc: 'Bảo hành 12 tháng tại TTBH chính hãng toàn quốc'
  },
  {
    icon: 'RefreshCw',
    title: '1 Đổi 1 Trong 30 Ngày',
    desc: 'Lỗi từ nhà sản xuất đổi ngay máy mới nguyên seal'
  },
  {
    icon: 'Truck',
    title: 'Giao Hàng Siêu Tốc 2H',
    desc: 'Miễn phí vận chuyển toàn quốc cho đơn từ 5 triệu'
  },
  {
    icon: 'CreditCard',
    title: 'Trả Góp 0% Lãi Suất',
    desc: 'Thủ tục duyệt hồ sơ online chỉ trong 5 phút'
  }
];

export const TECH_NEWS = [
  {
    id: 1,
    title: 'Đánh giá chi tiết camera iPhone 16 Pro Max: Nút Camera Control có thực sự hữu ích?',
    date: '20/08/2026',
    author: 'TechZone Review',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    summary: 'Trải nghiệm thực tế hệ thống ống kính tiềm vọng 5x mới và nút điều khiển cảm ứng lực đột phá trên flagship đỉnh nhất của Apple.'
  },
  {
    id: 2,
    title: 'Galaxy AI trên dòng S24 Series đã thay đổi cách làm việc di động của người dùng như thế nào?',
    date: '18/08/2026',
    author: 'Công Nghệ Số',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    summary: 'Từ khoanh tròn tìm kiếm thông minh đến dịch trực tiếp cuộc gọi đa ngôn ngữ, trải nghiệm trí tuệ nhân tạo bỏ túi cực tiện.'
  },
  {
    id: 3,
    title: 'Top 5 smartphone cấu hình khủng chiến mọi game mượt mà đáng mua nhất năm 2026',
    date: '15/08/2026',
    author: 'Gamer Zone',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    summary: 'Bảng xếp hạng hiệu năng Snapdragon 8 Gen 3, tản nhiệt buồng hơi và màn hình tần số quét siêu cao cho game thủ.'
  }
];
