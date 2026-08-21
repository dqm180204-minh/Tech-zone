import React, { useState, useEffect } from 'react';
import { X, Smartphone, Save, Sparkles } from 'lucide-react';
import { BRANDS, CATEGORIES } from '../../data/mockProducts';

export const ProductModal = ({ isOpen, onClose, onSave, product = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Apple',
    category: 'flagship',
    price: '',
    originalPrice: '',
    stock: '20',
    thumbnail: '',
    badge: '',
    isFlashSale: false,
    flashSalePrice: '',
    description: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        brand: product.brand || 'Apple',
        category: product.category || 'flagship',
        price: product.price || '',
        originalPrice: product.originalPrice || product.price || '',
        stock: product.stock !== undefined ? product.stock : '20',
        thumbnail: product.thumbnail || '',
        badge: product.badge || '',
        isFlashSale: Boolean(product.isFlashSale),
        flashSalePrice: product.flashSalePrice || '',
        description: product.description || '',
      });
    } else {
      setFormData({
        name: '',
        brand: 'Apple',
        category: 'flagship',
        price: '',
        originalPrice: '',
        stock: '20',
        thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        badge: 'Mới ra mắt',
        isFlashSale: false,
        flashSalePrice: '',
        description: '',
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      stock: Number(formData.stock),
      flashSalePrice: formData.flashSalePrice ? Number(formData.flashSalePrice) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                {product ? 'Chỉnh Sửa Điện Thoại' : 'Thêm Điện Thoại Mới'}
              </h3>
              <p className="text-xs text-slate-400">Lưu trực tiếp vào cơ sở dữ liệu MySQL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="py-5 space-y-4 text-xs">
          {/* Name */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              Tên điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: iPhone 16 Pro Max 256GB"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* Brand & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Hãng sản xuất</label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
              >
                {BRANDS.filter((b) => b.id !== 'all').map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Phân khúc</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Giá bán (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                placeholder="Ví dụ: 34990000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none text-red-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Giá niêm yết cũ (VNĐ)</label>
              <input
                type="number"
                placeholder="Ví dụ: 38990000"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Số lượng tồn kho</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Flash Sale toggle */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <div>
                <span className="font-bold text-slate-800 text-xs block">Sản phẩm Flash Sale Giờ Vàng</span>
                <span className="text-[11px] text-slate-500">Kích hoạt để đưa máy lên mục Flash Sale trang chủ</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={formData.isFlashSale}
              onChange={(e) => setFormData({ ...formData, isFlashSale: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 cursor-pointer"
            />
          </div>

          {formData.isFlashSale && (
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Giá Flash Sale Sốc (VNĐ)</label>
              <input
                type="number"
                placeholder="Ví dụ: 32990000"
                value={formData.flashSalePrice}
                onChange={(e) => setFormData({ ...formData, flashSalePrice: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none text-red-600"
              />
            </div>
          )}

          {/* Image Thumbnail URL & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Đường dẫn ảnh Thumbnail (URL)</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Nhãn nổi bật (Badge)</label>
              <input
                type="text"
                placeholder="Ví dụ: Giảm 4 triệu + Tặng sạc"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Mô tả sản phẩm</label>
            <textarea
              rows="3"
              placeholder="Giới thiệu đặc điểm nổi bật..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-500/25 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{product ? 'Lưu Cập Nhật' : 'Thêm Sản Phẩm'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
