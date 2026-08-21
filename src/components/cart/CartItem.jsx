import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-all gap-4">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <Link
          to={`/product/${item.productId}`}
          className="w-20 h-20 bg-slate-50 rounded-xl p-2 flex-shrink-0 border border-slate-100 flex items-center justify-center"
        >
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            {item.brand}
          </span>
          <Link
            to={`/product/${item.productId}`}
            className="block text-sm font-bold text-slate-900 hover:text-brand-600 truncate"
          >
            {item.name}
          </Link>

          {/* Variants tags */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-md font-medium">
              <span
                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                style={{ backgroundColor: item.color?.hex || '#333' }}
              />
              {item.color?.name}
            </span>
            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-md font-semibold">
              {item.storage}
            </span>
          </div>

          <div className="text-sm font-extrabold text-red-600 sm:hidden mt-2">
            {formatPrice(item.price * item.quantity)}
          </div>
        </div>
      </div>

      {/* Quantity modifier and actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Giảm số lượng"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 text-xs font-bold text-slate-800 min-w-[28px] text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Tăng số lượng"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total for this item (Desktop) */}
        <div className="hidden sm:block text-right min-w-[110px]">
          <div className="text-sm font-extrabold text-slate-900">
            {formatPrice(item.price * item.quantity)}
          </div>
          <div className="text-[11px] text-slate-400">
            {formatPrice(item.price)} / máy
          </div>
        </div>

        {/* Delete Item */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Xóa khỏi giỏ hàng"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
