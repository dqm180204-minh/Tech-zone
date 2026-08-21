import React, { useState } from 'react';
import { X, Package, User, MapPin, CreditCard, Save } from 'lucide-react';
import { formatPrice, formatDate } from '../../utils/formatters';

const STATUS_LABELS = {
  pending: { label: 'Chờ xác nhận', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  processing: { label: 'Đang đóng gói', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  shipping: { label: 'Đang giao hàng', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  completed: { label: 'Giao thành công', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800 border-red-200' },
};

export const OrderDetailModal = ({ isOpen, onClose, order, onUpdateStatus }) => {
  const [orderStatus, setOrderStatus] = useState(order?.orderStatus || 'pending');
  const [paymentStatus, setPaymentStatus] = useState(order?.paymentStatus || 'unpaid');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen || !order) return null;

  const handleSave = async () => {
    setIsUpdating(true);
    await onUpdateStatus(order.id, { orderStatus, paymentStatus });
    setIsUpdating(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Chi Tiết Đơn Hàng #{order.orderCode}
                </h3>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS_LABELS[order.orderStatus]?.color}`}>
                  {STATUS_LABELS[order.orderStatus]?.label || order.orderStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Đặt lúc: {formatDate(order.createdAt)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer & Address Details */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <User className="w-4 h-4 text-brand-600" />
              <span>Khách hàng</span>
            </div>
            <p><strong className="text-slate-700">Tên:</strong> {order.customer?.name}</p>
            <p><strong className="text-slate-700">SĐT:</strong> {order.customer?.phone}</p>
            {order.customer?.email && <p><strong className="text-slate-700">Email:</strong> {order.customer?.email}</p>}
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Địa chỉ nhận hàng</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{order.customer?.address}</p>
            {order.customer?.note && (
              <p className="text-amber-700 bg-amber-50 p-1.5 rounded-lg text-[11px] font-medium">
                Ghi chú: {order.customer?.note}
              </p>
            )}
          </div>
        </div>

        {/* Products Table */}
        <div className="py-2 space-y-2 text-xs">
          <span className="font-bold text-slate-800 block">Sản phẩm đã đặt ({order.items?.length}):</span>
          <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <img src={item.thumbnail} alt="" className="w-10 h-10 object-contain rounded-lg border border-slate-100" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Màu: {item.color} | Bản: {item.storage} | SL: {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="text-right font-extrabold text-slate-900">
                  {formatPrice(item.totalPrice || item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="py-3 border-t border-slate-100 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-500">
            <span>Tạm tính:</span>
            <span className="font-semibold text-slate-800">{formatPrice(order.subtotal)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Giảm giá voucher:</span>
              <span className="font-bold">-{formatPrice(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-500">
            <span>Phí vận chuyển:</span>
            <span>{order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 text-sm font-bold">
            <span className="text-slate-900">Tổng thanh toán:</span>
            <span className="text-base font-black text-red-600">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Status Update Dropdowns */}
        <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 space-y-3 mt-2 text-xs">
          <span className="font-bold text-slate-800 block">Cập nhật trạng thái đơn hàng:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Trạng thái vận chuyển:</label>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
              >
                <option value="pending">Chờ xác nhận</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="processing">Đang đóng gói</option>
                <option value="shipping">Đang giao hàng</option>
                <option value="completed">Giao thành công</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Trạng thái thanh toán:</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
              >
                <option value="unpaid">Chưa thanh toán</option>
                <option value="paid">Đã thanh toán ({order.paymentMethod?.toUpperCase()})</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={handleSave}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isUpdating ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
