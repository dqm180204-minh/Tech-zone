import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter, 
  Smartphone, 
  Sparkles, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ProductModal } from '../../components/admin/ProductModal';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import { BRANDS } from '../../data/mockProducts';

export const AdminProductsPage = () => {
  const { products, addProduct, editProduct, removeProduct, refreshProducts, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const { success, error } = useToast();

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setModalOpen(true);
  };

  const handleSaveProduct = async (formData) => {
    if (editingProduct) {
      const res = await editProduct(editingProduct.id, formData);
      if (res && res.success) {
        success(`Đã cập nhật điện thoại "${formData.name}" thành công!`);
      } else {
        error(res?.message || 'Lỗi khi cập nhật sản phẩm');
      }
    } else {
      const res = await addProduct(formData);
      if (res && res.success) {
        success(`Đã thêm điện thoại "${formData.name}" vào cơ sở dữ liệu MySQL và Trang Chủ!`);
      } else {
        error(res?.message || 'Lỗi khi thêm sản phẩm');
      }
    }
    setModalOpen(false);
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" khỏi MySQL?`)) {
      const res = await removeProduct(id);
      if (res && res.success) {
        success(`Đã xóa "${name}" thành công!`);
      } else {
        error(res?.message || 'Lỗi khi xóa sản phẩm');
      }
    }
  };

  // Filter products locally from live MySQL state
  const displayedProducts = products.filter((p) => {
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const matchName = p.name?.toLowerCase().includes(q);
      const matchBrand = p.brand?.toLowerCase().includes(q);
      if (!matchName && !matchBrand) return false;
    }
    if (selectedBrand !== 'all' && p.brand?.toLowerCase() !== selectedBrand.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <AdminLayout title="Quản Lý Sản Phẩm Điện Thoại">
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
            <div className="relative flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Tìm theo tên máy, model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
              >
                {BRANDS.map((b) => (
                  <option key={b.id} value={b.id}>
                    Hãng: {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Add Product Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={refreshProducts}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              title="Đồng bộ lại từ MySQL"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleOpenAdd}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-500/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Điện Thoại Mới</span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Tổng số: <strong>{displayedProducts.length}</strong> sản phẩm trong Database
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Ảnh & Sản phẩm</th>
                  <th className="py-3 px-4">Hãng</th>
                  <th className="py-3 px-4">Giá bán</th>
                  <th className="py-3 px-4">Tồn kho</th>
                  <th className="py-3 px-4">Flash Sale</th>
                  <th className="py-3 px-4">Đã bán</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.thumbnail}
                          alt=""
                          className="w-11 h-11 object-contain rounded-xl border border-slate-100 flex-shrink-0 bg-slate-50 p-1"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 line-clamp-1 max-w-xs">{p.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400">ID: {p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {p.brand}
                    </td>
                    <td className="py-3 px-4 font-bold text-red-600">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.stock <= 5 ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {p.stock} máy
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {p.isFlashSale ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full w-fit">
                          <Sparkles className="w-3 h-3 text-amber-600" /> Flash Sale
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Bình thường</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-600">
                      {p.soldCount || 0}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                          title="Sửa sản phẩm"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </AdminLayout>
  );
};
