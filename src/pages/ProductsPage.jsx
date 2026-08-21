import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Search, 
  X, 
  Smartphone,
  Flame,
  Zap,
  HelpCircle
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/product/ProductCard';
import { ProductFilter, PRICE_RANGES } from '../components/product/ProductFilter';
import { PRODUCTS, BRANDS } from '../data/mockProducts';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Mobile Filter Drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    brand: searchParams.get('brand') || '',
    category: searchParams.get('category') || '',
    priceRange: 'all',
    storage: '',
    onlyFlashSale: searchParams.get('filter') === 'flashsale',
    onlyHot: searchParams.get('filter') === 'hot',
  });

  // Sort State
  const [sortBy, setSortBy] = useState('featured');

  // Sync state with URL params
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlBrand = searchParams.get('brand') || '';
    const urlCategory = searchParams.get('category') || '';
    const urlFilter = searchParams.get('filter') || '';

    setFilters((prev) => ({
      ...prev,
      search: urlSearch,
      brand: urlBrand,
      category: urlCategory,
      onlyFlashSale: urlFilter === 'flashsale',
      onlyHot: urlFilter === 'hot',
    }));
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      brand: '',
      category: '',
      priceRange: 'all',
      storage: '',
      onlyFlashSale: false,
      onlyHot: false,
    });
    setSearchParams({});
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        if (!matchName && !matchBrand) return false;
      }

      // Brand
      if (filters.brand && item.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // Category
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Price Range
      if (filters.priceRange && filters.priceRange !== 'all') {
        const range = PRICE_RANGES.find((r) => r.id === filters.priceRange);
        if (range) {
          const itemPrice = item.isFlashSale ? item.flashSalePrice : item.price;
          if (itemPrice < range.min || itemPrice > range.max) {
            return false;
          }
        }
      }

      // Storage
      if (filters.storage) {
        const hasStorage = item.storageOptions?.some((s) => s.size === filters.storage);
        if (!hasStorage) return false;
      }

      // Flash Sale only
      if (filters.onlyFlashSale && !item.isFlashSale) {
        return false;
      }

      // Hot only
      if (filters.onlyHot && !item.isHot) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.isFlashSale ? a.flashSalePrice : a.price;
      const priceB = b.isFlashSale ? b.flashSalePrice : b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.soldCount - a.soldCount; // featured / best-seller
    });
  }, [filters, sortBy]);

  // Active filter count for badge
  const activeFiltersCount = Object.entries(filters).filter(([k, v]) => {
    if (k === 'priceRange') return v !== 'all';
    return Boolean(v);
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Danh sách điện thoại', path: '/products' },
          ...(filters.brand ? [{ label: filters.brand, path: `/products?brand=${filters.brand}` }] : []),
        ]}
      />

      {/* Page Title & Search Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {filters.brand ? `Điện Thoại ${filters.brand}` : filters.onlyFlashSale ? 'Flash Sale Giảm Giá Sốc' : 'Điện Thoại Thông Minh Chính Hãng'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Hiển thị <strong className="text-slate-800 font-bold">{filteredProducts.length}</strong> sản phẩm phù hợp
          </p>
        </div>

        {/* Sort and Mobile Filter Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-600" />
            <span>Bộ lọc</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 bg-brand-600 text-white rounded-full text-[10px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm flex-1 md:flex-none">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="featured">Bán chạy nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="newest">Mới ra mắt</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-400 font-medium">Đang lọc theo:</span>
          {filters.search && (
            <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-full border border-brand-200 font-medium">
              Từ khóa: "{filters.search}"
              <button onClick={() => handleFilterChange('search', '')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {filters.brand && (
            <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-full border border-brand-200 font-medium">
              Hãng: {filters.brand}
              <button onClick={() => handleFilterChange('brand', '')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {filters.priceRange !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-full border border-brand-200 font-medium">
              Giá: {PRICE_RANGES.find(r => r.id === filters.priceRange)?.label}
              <button onClick={() => handleFilterChange('priceRange', 'all')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {filters.storage && (
            <span className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-2.5 py-1 rounded-full border border-brand-200 font-medium">
              Bộ nhớ: {filters.storage}
              <button onClick={() => handleFilterChange('storage', '')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {filters.onlyFlashSale && (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-full border border-red-200 font-medium">
              ⚡ Flash Sale
              <button onClick={() => handleFilterChange('onlyFlashSale', false)}><X className="w-3 h-3" /></button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-red-600 hover:underline font-bold ml-1"
          >
            Xóa tất cả bộ lọc
          </button>
        </div>
      )}

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar Filter (Desktop) */}
        <div className="hidden md:block md:col-span-1">
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Right Product Grid */}
        <div className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Không tìm thấy sản phẩm nào phù hợp
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hãy thử nới lỏng bộ lọc giá, tìm kiếm với từ khóa khác hoặc bấm nút bên dưới để xem tất cả sản phẩm.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-brand-700 transition-colors"
              >
                Xem tất cả điện thoại
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end md:hidden">
          <div className="w-4/5 max-w-md bg-white h-full overflow-y-auto animate-slide-up">
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredProducts.length}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
