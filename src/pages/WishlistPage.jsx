import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/product/ProductCard';
import { useWishlist } from '../context/WishlistContext';

export const WishlistPage = () => {
  const { wishlist, clearWishlist, wishlistCount } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 text-rose-400 rounded-3xl flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          Danh sách yêu thích trống
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Hãy bấm vào biểu tượng trái tim ở các sản phẩm bạn yêu thích để lưu lại và theo dõi biến động giá nhé!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs shadow-md transition-all"
        >
          <span>Khám phá điện thoại ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
      <Breadcrumbs
        items={[
          { label: 'Sản phẩm yêu thích', path: '/wishlist' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 my-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Sản Phẩm Bạn Yêu Thích
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Đang lưu <strong className="text-slate-800 font-bold">{wishlistCount}</strong> sản phẩm
          </p>
        </div>

        <button
          onClick={clearWishlist}
          className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 font-semibold self-start sm:self-auto transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Xóa tất cả</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
