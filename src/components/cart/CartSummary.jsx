import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, Check, X, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { PROMO_COUPONS } from '../../data/banners';

export const CartSummary = ({ onProceedCheckout, isCheckoutPage = false }) => {
  const {
    subtotal,
    discountAmount,
    shippingFee,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
    cartItems
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (applyCoupon(inputCode)) {
      setInputCode('');
    }
  };

  const handleQuickApply = (code) => {
    setInputCode(code);
    applyCoupon(code);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      <h3 className="font-extrabold text-slate-900 text-base">
        Tóm tắt đơn hàng
      </h3>

      {/* Coupon Code Section */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-700 block">
          Mã giảm giá / Voucher
        </label>
        
        {coupon ? (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-bold text-xs block">{coupon.code}</span>
                <span className="text-[11px] text-emerald-600 font-medium">{coupon.description}</span>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 text-emerald-700 hover:text-red-600 transition-colors"
              title="Hủy mã"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex gap-2">
            <input
              type="text"
              placeholder="Nhập TECHZONE500..."
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold uppercase focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Áp dụng
            </button>
          </form>
        )}

        {/* Quick Suggest Coupons */}
        {!coupon && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] text-slate-400 font-medium">Mã khuyến mãi có sẵn:</span>
            <div className="flex flex-wrap gap-1.5">
              {PROMO_COUPONS.map((c) => (
                <button
                  key={c.code}
                  onClick={() => handleQuickApply(c.code)}
                  className="text-[10px] font-bold bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200/60 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Tạm tính ({cartItems.length} sản phẩm):</span>
          <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Giảm giá voucher:</span>
            <span className="font-bold">-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600">
          <span>Phí vận chuyển:</span>
          <span>
            {shippingFee === 0 ? (
              <span className="text-emerald-600 font-bold">Miễn phí giao hàng</span>
            ) : (
              <span className="font-semibold text-slate-900">{formatPrice(shippingFee)}</span>
            )}
          </span>
        </div>

        {subtotal < 5000000 && subtotal > 0 && (
          <p className="text-[11px] text-amber-600 bg-amber-50 p-2 rounded-lg font-medium">
            💡 Mua thêm {formatPrice(5000000 - subtotal)} để nhận <strong>Miễn phí vận chuyển</strong> toàn quốc!
          </p>
        )}

        {/* Total Price */}
        <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
          <span className="font-extrabold text-slate-900 text-base">Tổng thanh toán:</span>
          <div className="text-right">
            <div className="text-2xl font-black text-red-600">{formatPrice(total)}</div>
            <span className="text-[11px] text-slate-400">(Đã bao gồm VAT 10%)</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      {!isCheckoutPage && (
        <div className="space-y-3 pt-2">
          <Link
            to="/checkout"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 hover:scale-[1.02] transition-all"
          >
            <span>Tiến hành đặt hàng ngay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/products"
            className="w-full py-2.5 rounded-2xl text-center text-xs font-bold text-slate-600 hover:text-brand-600 block transition-colors"
          >
            ← Tiếp tục mua sắm
          </Link>
        </div>
      )}

      {/* Trust Guarantee */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs text-slate-500">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <span>Giao dịch an toàn & bảo mật tuyệt đối. Kiểm tra máy trước khi thanh toán.</span>
      </div>
    </div>
  );
};
