import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="space-y-6 max-w-md">
        <div className="w-24 h-24 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto text-brand-600 shadow-inner">
          <Smartphone className="w-12 h-12 rotate-12 text-brand-500" />
        </div>
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-slate-800 mt-2">Trang không tồn tại</h2>
          <p className="text-xs text-slate-500 mt-1">
            Đường dẫn bạn truy cập có thể đã bị xóa hoặc không còn tồn tại trên TechZone.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang chủ</span>
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Xem sản phẩm</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
