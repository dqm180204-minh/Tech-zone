import React from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../../data/mockProducts';

export const BrandBar = () => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
            Thương hiệu điện thoại hàng đầu
          </h3>
          <Link to="/products" className="text-xs font-bold text-brand-600 hover:text-brand-700">
            Xem tất cả
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {BRANDS.filter(b => b.id !== 'all').map((brand) => (
            <Link
              key={brand.id}
              to={`/products?brand=${brand.id}`}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden mb-2 bg-slate-100 p-1 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-brand-600 text-center truncate w-full">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
