import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Zap, Check } from 'lucide-react';
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
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-brand-500/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden select-none">
      {/* Top Badges */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 items-start pointer-events-none">
        {discountPct > 0 && (
          <span className="bg-red-600 text-white text-[10px] sm:text-[11px] font-black px-1.5 sm:px-2 py-0.5 rounded shadow-sm flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" /> -{discountPct}%
          </span>
        )}
        {product.isFlashSale && (
          <span className="bg-amber-400 text-slate-950 text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
            Flash Sale
          </span>
        )}
        {product.badge && !product.isFlashSale && (
          <span className="bg-brand-50 text-brand-700 border border-brand-200 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded hidden sm:inline-block">
            {product.badge}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
          isFavorited
            ? 'bg-rose-50 text-rose-500 shadow-md scale-105'
            : 'bg-white/85 backdrop-blur-md text-slate-400 hover:text-rose-500 hover:bg-white shadow-sm'
        }`}
        title={isFavorited ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative pt-[82%] sm:pt-[85%] overflow-hidden bg-slate-50">
        <img
          src={selectedColor?.image || product.thumbnail}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Content Area */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 mb-1">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-700">{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-brand-600 transition-colors">
            <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-tight sm:leading-snug mb-1.5 min-h-[2rem] sm:min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Color swatches preview */}
          {product.colors && product.colors.length > 1 && (
            <div className="flex items-center gap-1 mb-2">
              {product.colors.slice(0, 4).map((color, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border transition-all ${
                    selectedColor?.name === color.name ? 'ring-1.5 ring-brand-500 scale-110' : 'border-slate-300'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[9px] text-slate-400">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-1.5 sm:pt-2 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="text-sm sm:text-base lg:text-lg font-black text-red-600 leading-tight">
              {formatPrice(currentPrice)}
            </span>
            {product.originalPrice > currentPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Flash Sale Progress bar if applicable */}
          {product.isFlashSale && product.soldPercent && (
            <div className="mb-2 hidden sm:block">
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${product.soldPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleQuickAdd}
            className={`w-full py-1.5 sm:py-2 px-2 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-all ${
              isAddedAnim
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white'
            }`}
          >
            {isAddedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" /> Đã thêm
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> <span className="hidden xs:inline">Thêm vào giỏ</span><span className="xs:hidden">Thêm</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
