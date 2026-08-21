import React from 'react';
import { RotateCcw, Filter, Check, X } from 'lucide-react';
import { BRANDS, CATEGORIES } from '../../data/mockProducts';

export const PRICE_RANGES = [
  { id: 'all', label: 'Tất cả mức giá', min: 0, max: Infinity },
  { id: 'under-5m', label: 'Dưới 5 triệu', min: 0, max: 5000000 },
  { id: '5m-10m', label: 'Từ 5 - 10 triệu', min: 5000000, max: 10000000 },
  { id: '10m-20m', label: 'Từ 10 - 20 triệu', min: 10000000, max: 20000000 },
  { id: 'above-20m', label: 'Trên 20 triệu', min: 20000000, max: Infinity },
];

export const STORAGE_FILTERS = ['128GB', '256GB', '512GB', '1TB'];
export const RAM_FILTERS = ['6GB', '8GB', '12GB', '16GB', '24GB'];

export const ProductFilter = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 p-5 space-y-6 ${isMobileDrawer ? 'h-full overflow-y-auto' : 'shadow-sm sticky top-36'}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-800 text-sm">Bộ lọc sản phẩm</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetFilters}
            className="text-xs text-slate-500 hover:text-brand-600 flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Xóa lọc
          </button>
          {isMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Hãng sản xuất
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {BRANDS.map((b) => {
            const isSelected = (filters.brand === b.id) || (filters.brand === '' && b.id === 'all');
            return (
              <button
                key={b.id}
                onClick={() => onFilterChange('brand', b.id === 'all' ? '' : b.id)}
                className={`text-xs px-3 py-2 rounded-xl text-left font-medium border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/70 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{b.name}</span>
                {isSelected && <Check className="w-3 h-3 text-brand-600 flex-shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Mức giá
        </label>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range) => {
            const isSelected = filters.priceRange === range.id;
            return (
              <button
                key={range.id}
                onClick={() => onFilterChange('priceRange', range.id)}
                className={`w-full text-xs px-3 py-2 rounded-xl text-left font-medium border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/70 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{range.label}</span>
                {isSelected && <Check className="w-3 h-3 text-brand-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Phân khúc nhu cầu
        </label>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = (filters.category === cat.id) || (filters.category === '' && cat.id === 'all');
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange('category', cat.id === 'all' ? '' : cat.id)}
                className={`w-full text-xs px-3 py-2 rounded-xl text-left font-medium border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold shadow-sm'
                    : 'bg-slate-50/70 border-slate-200/70 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat.name}</span>
                {isSelected && <Check className="w-3 h-3 text-brand-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage Filter */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Dung lượng bộ nhớ
        </label>
        <div className="flex flex-wrap gap-1.5">
          {STORAGE_FILTERS.map((storage) => {
            const isSelected = filters.storage === storage;
            return (
              <button
                key={storage}
                onClick={() => onFilterChange('storage', isSelected ? '' : storage)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold border transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {storage}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Special Filter (Flash Sale / Hot) */}
      <div className="pt-2 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Tính năng đặc biệt
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={filters.onlyFlashSale}
              onChange={(e) => onFilterChange('onlyFlashSale', e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span>⚡ Đang Flash Sale giảm giá sâu</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={filters.onlyHot}
              onChange={(e) => onFilterChange('onlyHot', e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span>🔥 Sản phẩm nổi bật / Bán chạy</span>
          </label>
        </div>
      </div>

      {/* Bottom Summary on Mobile */}
      {isMobileDrawer && (
        <div className="pt-4">
          <button
            onClick={onCloseMobileDrawer}
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-sm shadow-md"
          >
            Xem {totalResults} sản phẩm phù hợp
          </button>
        </div>
      )}
    </div>
  );
};
