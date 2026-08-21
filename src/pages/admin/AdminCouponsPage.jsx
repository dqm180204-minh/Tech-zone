import React, { useState, useEffect } from 'react';
import { Tag, Plus, Check, X, Percent, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'fixed',
    discountValue: '',
    minOrderValue: '',
    maxDiscount: '',
    description: '',
  });

  const { success, error } = useToast();

  const loadCoupons = async () => {
    const res = await api.getCoupons();
    if (res?.data) {
      setCoupons(res.data);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    const res = await api.createCoupon({
      ...formData,
      discountValue: Number(formData.discountValue),
      minOrderValue: Number(formData.minOrderValue || 0),
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
    });

    if (res.success) {
      success(`Đã tạo mã giảm giá "${formData.code.toUpperCase()}" thành công!`);
      setShowAddForm(false);
      setFormData({
        code: '',
        discountType: 'fixed',
        discountValue: '',
        minOrderValue: '',
        maxDiscount: '',
        description: '',
      });
      loadCoupons();
    } else {
      error(res.message || 'Lỗi khi tạo mã giảm giá');
    }
  };

  const handleToggle = async (id) => {
    await api.toggleCoupon(id);
    success('Đã cập nhật trạng thái kích hoạt mã!');
    loadCoupons();
  };

  return (
    <AdminLayout title="Quản Lý Mã Giảm Giá (Vouchers)">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Danh Sách Mã Khuyến Mãi</h3>
            <p className="text-xs text-slate-400 mt-0.5">Tạo ưu đãi voucher thúc đẩy đơn hàng</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Đóng Form' : 'Tạo Mã Mới'}</span>
          </button>
        </div>

        {/* Create Form Drawer */}
        {showAddForm && (
          <form onSubmit={handleCreateCoupon} className="bg-white p-6 rounded-2xl border border-brand-200 space-y-4 text-xs animate-slide-up shadow-lg">
            <h4 className="font-bold text-slate-900 text-sm">Thêm Voucher Khuyến Mãi Mới</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mã Voucher (Code) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: SALE500"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold uppercase focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Loại giảm giá</label>
                <select
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
                >
                  <option value="fixed">Số tiền cố định (VNĐ)</option>
                  <option value="percent">Phần trăm (%)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mức giảm *</label>
                <input
                  type="number"
                  required
                  placeholder={formData.discountType === 'fixed' ? 'Ví dụ: 500000' : 'Ví dụ: 10 (%)'}
                  value={formData.discountValue}
                  onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-red-600 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Đơn hàng tối thiểu (VNĐ)</label>
                <input
                  type="number"
                  placeholder="Ví dụ: 5000000"
                  value={formData.minOrderValue}
                  onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mô tả hiển thị</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Giảm 500k cho đơn từ 5 triệu"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-md"
              >
                Tạo Voucher
              </button>
            </div>
          </form>
        )}

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <div key={c.id} className={`p-5 rounded-2xl border bg-white shadow-sm transition-all ${
              c.isActive ? 'border-brand-200' : 'border-slate-200 opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-black text-xs">
                    <Tag className="w-4 h-4" />
                  </div>
                  <span className="font-mono font-black text-slate-900 text-sm tracking-wider">
                    {c.code}
                  </span>
                </div>

                <button
                  onClick={() => handleToggle(c.id)}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    c.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {c.isActive ? 'Đang hoạt động' : 'Đang tạm dừng'}
                </button>
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-extrabold text-red-600 text-base">
                  {c.discountType === 'fixed' ? formatPrice(c.discountValue) : `${c.discountValue}%`}
                </div>
                <p className="text-slate-600">{c.description}</p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Đơn tối thiểu: <strong>{formatPrice(c.minOrderValue)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
