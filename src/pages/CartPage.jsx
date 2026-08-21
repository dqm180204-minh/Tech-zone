import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const { cartItems, clearCart, totalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-5">
        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá ngay hàng loạt siêu phẩm smartphone đang có giá cực tốt!
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-brand-500/25 transition-all"
        >
          <span>Khám phá sản phẩm ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Giỏ hàng', path: '/cart' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 my-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Giỏ Hàng Của Bạn
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Có <strong className="text-slate-800 font-bold">{totalItems}</strong> sản phẩm trong giỏ
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Xóa tất cả</span>
        </button>
      </div>

      {/* Cart Layout (Items + Summary) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tiếp tục chọn thêm sản phẩm khác</span>
            </Link>
          </div>
        </div>

        {/* Order Summary (4 cols) */}
        <div className="lg:col-span-4">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};
