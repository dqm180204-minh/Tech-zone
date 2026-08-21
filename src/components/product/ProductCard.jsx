import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Zap, Eye, Check } from 'lucide-react';
import { formatPrice, calculateDiscountPercent } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentPrice = product.isFlashSale ? product.flashSalePrice : product.price;
  const discountPct = calculateDiscountPercent(product.originalPrice, currentPrice);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedColor, product.storageOptions?.[0], 1);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1500);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-brand-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start pointer-events-none">
        {discountPct > 0 && (
          <span className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-sm flex items-center gap-0.5">
            <Zap className="w-3 h-3 fill-current" /> -{discountPct}%
          </span>
        )}
        {product.isFlashSale && (
          <span className="bg-amber-500 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            Flash Sale
          </span>
        )}
        {product.badge && !product.isFlashSale && (
          <span className="bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
            {product.badge}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isFavorited
            ? 'bg-rose-50 text-rose-500 shadow-md scale-105'
            : 'bg-white/80 backdrop-blur-md text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm'
        }`}
        title={isFavorited ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative pt-[85%] overflow-hidden bg-slate-50">
        <img
          src={selectedColor?.image || product.thumbnail}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-slate-400 text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-700">{product.rating}</span>
              <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-brand-600 transition-colors">
            <h3 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Key Specs tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
              {product.specs?.screen?.split(',')[0]}
            </span>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
              {product.specs?.cpu?.split('(')[0]}
            </span>
          </div>

          {/* Color swatches preview */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor?.name === color.name ? 'ring-2 ring-brand-500 scale-110' : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              <span className="text-[10px] text-slate-400 ml-1">
                {product.colors.length} màu
              </span>
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-extrabold text-red-600">
              {formatPrice(currentPrice)}
            </span>
            {product.originalPrice > currentPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Flash Sale Progress bar if applicable */}
          {product.isFlashSale && product.soldPercent && (
            <div className="mb-3">
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${product.soldPercent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                <span>Đã bán: <strong>{product.soldCount}</strong></span>
                <span className="text-red-500 font-bold">Còn {product.stock} suất</span>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              isAddedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white'
            }`}
          >
            {isAddedAnim ? (
              <>
                <Check className="w-4 h-4" /> Đã thêm giỏ
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Thêm vào giỏ
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
