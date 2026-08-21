import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Smartphone, 
  ArrowLeft, 
  Lock,
  CheckCircle
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CartSummary } from '../components/cart/CartSummary';
import { OrderSuccessModal } from '../components/cart/OrderSuccessModal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, placeOrder } = useCart();
  const { user } = useAuth();
  const { error } = useToast();

  const [createdOrder, setCreatedOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('vietqr');
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: 'Hồ Chí Minh',
    district: 'Quận 1',
    address: user?.address || '',
    note: '',
  });

  if (cartItems.length === 0 && !createdOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Không có sản phẩm nào để thanh toán</h2>
        <Link to="/products" className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      error('Vui lòng nhập họ và tên người nhận');
      return;
    }
    if (!formData.phone.trim()) {
      error('Vui lòng nhập số điện thoại liên hệ');
      return;
    }
    if (!formData.address.trim()) {
      error('Vui lòng nhập địa chỉ giao hàng cụ thể');
      return;
    }

    const order = placeOrder(formData, paymentMethod);
    setCreatedOrder(order);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Giỏ hàng', path: '/cart' },
          { label: 'Thanh toán đơn hàng', path: '/checkout' },
        ]}
      />

      <div className="my-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Thông Tin Giao Hàng & Thanh Toán
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Vui lòng kiểm tra chính xác thông tin để TechZone giao hàng nhanh chóng nhất
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Delivery info & Payment options (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Info Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-600" />
              <span>1. Địa chỉ nhận hàng</span>
            </h3>

            <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Họ và tên người nhận <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0988 123 456"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Email nhận thông báo đơn hàng
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nguyenvana@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  >
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Bình Dương">Bình Dương</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Quận / Huyện
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="Quận 1, Hoàn Kiếm, v.v."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Địa chỉ chi tiết (Số nhà, Tên đường, Tòa nhà) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Ví dụ: 72 Lê Thánh Tôn, Phường Bến Nghé"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Ghi chú giao hàng (Tùy chọn)
                </label>
                <textarea
                  name="note"
                  rows="2"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Giao giờ hành chính, gọi trước khi giao..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-600" />
              <span>2. Phương thức thanh toán</span>
            </h3>

            <div className="space-y-3">
              {/* VietQR */}
              <label
                onClick={() => setPaymentMethod('vietqr')}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'vietqr'
                    ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'vietqr'}
                  onChange={() => setPaymentMethod('vietqr')}
                  className="mt-1 text-brand-600 focus:ring-brand-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Chuyển khoản QR Siêu Tốc (VietQR)</span>
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      Khuyên dùng
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Quét mã QR qua mọi ứng dụng ngân hàng hoặc ví điện tử. Xác nhận tự động không cần gửi ảnh bill.
                  </p>
                </div>
                <QrCode className="w-6 h-6 text-brand-600 flex-shrink-0" />
              </label>

              {/* COD */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-brand-600 focus:ring-brand-500"
                />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 text-sm">Thanh toán tiền mặt khi nhận hàng (COD)</span>
                  <p className="text-xs text-slate-500 mt-1">
                    Nhận hàng, kiểm tra tem niêm phong và máy rồi mới thanh toán tiền mặt cho shipper.
                  </p>
                </div>
                <Banknote className="w-6 h-6 text-slate-600 flex-shrink-0" />
              </label>

              {/* VNPAY / MoMo */}
              <label
                onClick={() => setPaymentMethod('vnpay')}
                className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'vnpay'
                    ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'vnpay'}
                  onChange={() => setPaymentMethod('vnpay')}
                  className="mt-1 text-brand-600 focus:ring-brand-500"
                />
                <div className="flex-1">
                  <span className="font-bold text-slate-900 text-sm">Ví VNPAY / MoMo / Thẻ ATM Nội Địa</span>
                  <p className="text-xs text-slate-500 mt-1">
                    Hỗ trợ thanh toán nhanh chóng qua cổng thanh toán VNPAY-QR bảo mật cao.
                  </p>
                </div>
                <Smartphone className="w-6 h-6 text-pink-600 flex-shrink-0" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary & Place Order Button (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <CartSummary isCheckoutPage={true} />

          {/* Big Order Button */}
          <button
            type="submit"
            form="checkout-form"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
          >
            <Lock className="w-4 h-4" />
            <span>Xác Nhận Đặt Hàng Ngay</span>
          </button>

          <p className="text-[11px] text-center text-slate-400">
            Bằng việc nhấn Đặt hàng, bạn đồng ý với Điều khoản mua bán hàng hóa của TechZone
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {createdOrder && (
        <OrderSuccessModal
          order={createdOrder}
          onClose={() => {
            setCreatedOrder(null);
            navigate('/');
          }}
        />
      )}
    </div>
  );
};
