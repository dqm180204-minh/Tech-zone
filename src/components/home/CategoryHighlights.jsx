import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { PRODUCTS } from '../../data/mockProducts';

const TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'flagship', label: 'Flagship Cao Cấp' },
  { id: 'gaming', label: 'Gaming Cực Khủng' },
  { id: 'midrange', label: 'Tầm Trung Bán Chạy' },
  { id: 'budget', label: 'Phổ Thông Giá Rẻ' },
];

export const CategoryHighlights = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Gợi ý tốt nhất cho bạn</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Điện Thoại Nổi Bật 2026
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full pb-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Link
            to={`/products${activeTab !== 'all' ? `?category=${activeTab}` : ''}`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm shadow-sm transition-all hover:border-brand-500"
          >
            <span>Xem thêm sản phẩm</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </Link>
        </div>
      </div>
    </section>
  );
};
