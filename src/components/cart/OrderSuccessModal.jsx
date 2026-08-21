import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Phone, ArrowRight, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice } from '../../utils/formatters';

export const OrderSuccessModal = ({ order, onClose }) => {
  useEffect(() => {
    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback
    }
  }, []);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-slide-up relative">
        {/* Header Icon */}
        <div className="text-center space-y-3 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Đặt Hàng Thành Công!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Cảm ơn bạn đã tin tưởng mua sắm tại TechZone
            </p>
          </div>
          <div className="inline-block bg-brand-50 border border-brand-200 text-brand-700 font-mono font-bold text-xs px-3 py-1 rounded-full">
            Mã đơn: <strong>#{order.orderId}</strong>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="py-4 space-y-4 text-xs">
          {/* Customer & Shipping info */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Người nhận:</span>
              <span className="font-bold text-slate-800">{order.customer?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Số điện thoại:</span>
              <span className="font-bold text-slate-800">{order.customer?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Địa chỉ giao:</span>
              <span className="font-semibold text-slate-800 text-right max-w-[200px] truncate">
                {order.customer?.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Hình thức thanh toán:</span>
              <span className="font-bold text-brand-600 uppercase">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Items Preview */}
          <div className="space-y-2">
            <span className="font-bold text-slate-700 block">Sản phẩm đã đặt ({order.items?.length}):</span>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-600 bg-white p-2 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 truncate">
                    <img src={item.thumbnail} alt="" className="w-8 h-8 object-contain" />
                    <div className="truncate">
                      <span className="font-semibold text-slate-800 truncate block">{item.name}</span>
                      <span className="text-[10px] text-slate-400">SL: {item.quantity} | {item.color?.name}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 flex-shrink-0 ml-2">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm">
            <span className="font-bold text-slate-800">Tổng tiền đã thanh toán:</span>
            <span className="text-lg font-black text-red-600">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            to="/products"
            onClick={onClose}
            className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/25 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tiếp tục mua hàng</span>
          </Link>
          <button
            onClick={onClose}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
