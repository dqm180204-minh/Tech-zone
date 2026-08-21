import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Send, 
  CheckCircle,
  Facebook,
  Youtube,
  Instagram
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { success } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      success('Cảm ơn bạn! Đã đăng ký nhận tin khuyến mãi thành công.');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white leading-none">
                  TECH<span className="text-brand-400">ZONE</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
                  Điện Thoại & Công Nghệ
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Hệ thống bán lẻ điện thoại thông minh, máy tính bảng và phụ kiện công nghệ chính hãng hàng đầu Việt Nam. Cam kết giá tốt nhất, dịch vụ tận tâm và bảo hành uy tín số 1.
            </p>

            <div className="space-y-2 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Tư vấn mua hàng: <strong className="text-white">1800 6868</strong> (7:30 - 22:00)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Email hỗ trợ: <strong className="text-white">cskh@techzone.vn</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Trụ sở: 72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. HCM</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#facebook" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Thương hiệu hot</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/products?brand=Apple" className="hover:text-white transition-colors">Apple iPhone</Link>
              </li>
              <li>
                <Link to="/products?brand=Samsung" className="hover:text-white transition-colors">Samsung Galaxy</Link>
              </li>
              <li>
                <Link to="/products?brand=Xiaomi" className="hover:text-white transition-colors">Xiaomi Series</Link>
              </li>
              <li>
                <Link to="/products?brand=OPPO" className="hover:text-white transition-colors">OPPO Find & Reno</Link>
              </li>
              <li>
                <Link to="/products?brand=ASUS" className="hover:text-white transition-colors">ASUS ROG Gaming</Link>
              </li>
              <li>
                <Link to="/products?brand=Google" className="hover:text-white transition-colors">Google Pixel</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Policies */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Chính sách dịch vụ</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#chinh-sach-bao-hanh" className="hover:text-white transition-colors">Chính sách bảo hành 12 tháng</a>
              </li>
              <li>
                <a href="#chinh-sach-doi-tra" className="hover:text-white transition-colors">Chính sách 1 đổi 1 30 ngày</a>
              </li>
              <li>
                <a href="#chinh-sach-giao-hang" className="hover:text-white transition-colors">Giao hàng hỏa tốc 2h</a>
              </li>
              <li>
                <a href="#chinh-sach-tra-gop" className="hover:text-white transition-colors">Hướng dẫn trả góp 0%</a>
              </li>
              <li>
                <a href="#thu-cu-doi-moi" className="hover:text-white transition-colors">Thu cũ đổi mới trợ giá cao</a>
              </li>
              <li>
                <a href="#tra-cuu-don-hang" className="hover:text-white transition-colors">Tra cứu hóa đơn điện tử</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Nhận ưu đãi sớm</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đăng ký để nhận thông tin flash sale, voucher giảm giá 500k và ra mắt sản phẩm mới.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Nhập email của bạn..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-brand-600 hover:bg-brand-500 text-white text-xs px-3 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-300 block mb-2">Thanh toán tiện lợi:</span>
              <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                <span className="bg-slate-800 px-2 py-1 rounded text-emerald-400 border border-slate-700">VietQR</span>
                <span className="bg-slate-800 px-2 py-1 rounded text-blue-400 border border-slate-700">VNPAY</span>
                <span className="bg-slate-800 px-2 py-1 rounded text-pink-400 border border-slate-700">MoMo</span>
                <span className="bg-slate-800 px-2 py-1 rounded text-amber-400 border border-slate-700">VISA / Master</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 TechZone Corporation. Tất cả quyền được bảo lưu. Thiết kế cho trải nghiệm mua sắm hiện đại.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Điều khoản dịch vụ</span>
            <span className="hover:text-slate-400 cursor-pointer">Bảo mật thông tin</span>
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
