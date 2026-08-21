import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  ShoppingBag, 
  Zap, 
  Check, 
  Plus, 
  Minus,
  Sparkles,
  Gift,
  ChevronRight,
  PhoneCall,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductSpecs } from '../components/product/ProductSpecs';
import { ProductReviews } from '../components/product/ProductReviews';
import { ProductCard } from '../components/product/ProductCard';
import { PRODUCTS } from '../data/mockProducts';
import { formatPrice, calculateDiscountPercent } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const { success, info } = useToast();

  const isAdmin = user?.role === 'admin';
  const product = PRODUCTS.find((p) => p.id === id);

  // Variant States
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews' | 'description'

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setSelectedStorage(product.storageOptions?.[0] || null);
      setSelectedImage(product.colors?.[0]?.image || product.thumbnail);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy sản phẩm</h2>
        <p className="text-sm text-slate-500">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã ngừng kinh doanh.</p>
        <Link to="/products" className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const priceOffset = selectedStorage?.priceOffset || 0;
  const basePrice = product.isFlashSale ? product.flashSalePrice : product.price;
  const currentPrice = basePrice + priceOffset;
  const currentOriginalPrice = product.originalPrice + priceOffset;
  const discountPct = calculateDiscountPercent(currentOriginalPrice, currentPrice);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (color.image) {
      setSelectedImage(color.image);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedStorage, quantity);
  };

  const handleBuyNow = () => {
    const res = addToCart(product, selectedColor, selectedStorage, quantity);
    if (res !== false) {
      navigate('/cart');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    info('Đã sao chép đường link sản phẩm vào clipboard!');
  };

  // Similar Products
  const similarProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 pb-28 md:pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Điện thoại', path: '/products' },
          { label: product.brand, path: `/products?brand=${product.brand}` },
          { label: product.name, path: `/product/${product.id}` },
        ]}
      />

      {/* Admin Notice Banner if Admin is Viewing */}
      {isAdmin && (
        <div className="my-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Bạn đang đăng nhập với tư cách Quản Trị Viên (Admin)</span>
              <span className="text-slate-600">Tài khoản Admin không thực hiện mua hàng, chỉ quản lý và chỉnh sửa thông số.</span>
            </div>
          </div>
          <Link
            to="/admin/products"
            className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Quản lý trong Admin</span>
          </Link>
        </div>
      )}

      {/* Main Product Hero */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-8 shadow-sm my-3 sm:my-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left: Images Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {/* Main Active Image with Zoom Area */}
            <div className="relative rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden pt-[90%] sm:pt-[95%]">
              <img
                src={selectedImage || product.thumbnail}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-contain p-4 sm:p-6 hover:scale-105 transition-transform duration-500"
              />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                {discountPct > 0 && (
                  <span className="bg-red-600 text-white text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" /> -{discountPct}%
                  </span>
                )}
                {product.isFlashSale && (
                  <span className="bg-amber-400 text-slate-900 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Flash Sale
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 no-scrollbar">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 p-1 bg-slate-50 flex-shrink-0 transition-all ${
                    selectedImage === img ? 'border-brand-600 ring-2 ring-brand-500/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Guarantees Box */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1">
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] sm:text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Bảo hành chính hãng 12T</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] sm:text-xs text-slate-600">
                <RotateCcw className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>1 Đổi 1 trong 30 ngày</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Variant Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Title & Brand header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] sm:text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-md">
                  {product.brand} Official
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2 rounded-xl border transition-all ${
                      isFavorited ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-rose-500'
                    }`}
                    title="Yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:text-brand-600 transition-all"
                    title="Chia sẻ sản phẩm"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug sm:leading-tight">
                {product.name}
              </h1>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800 ml-1">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount})</span>
                </div>
                <div className="h-3 w-px bg-slate-200"></div>
                <span>Đã bán: <strong className="text-slate-800 font-bold">{product.soldCount}</strong></span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 border border-red-100 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-black text-red-600">
                  {formatPrice(currentPrice)}
                </span>
                {currentOriginalPrice > currentPrice && (
                  <span className="text-xs sm:text-sm text-slate-400 line-through">
                    {formatPrice(currentOriginalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                Trả góp 0% chỉ từ {formatPrice(Math.round(currentPrice / 12))}/tháng
              </span>
            </div>

            {/* Storage Options */}
            {product.storageOptions && (
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  1. Chọn Dung lượng bộ nhớ:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.storageOptions.map((opt) => {
                    const isSelected = selectedStorage?.size === opt.size;
                    const optPrice = basePrice + opt.priceOffset;
                    return (
                      <button
                        key={opt.size}
                        onClick={() => setSelectedStorage(opt)}
                        className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold text-xs text-slate-800 flex items-center justify-between">
                          <span>{opt.size}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 sm:mt-1 font-semibold truncate">
                          {formatPrice(optPrice)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Swatches */}
            {product.colors && (
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  2. Chọn Màu sắc: <span className="text-brand-600 font-extrabold">{selectedColor?.name}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => handleColorChange(color)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50/60 text-brand-900 ring-2 ring-brand-500/20 font-bold'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Promotions Special Gift Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <Gift className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Ưu đãi & Quà tặng kèm độc quyền:</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1 pl-5 list-disc leading-relaxed">
                <li>Tặng củ sạc nhanh chính hãng trị giá <strong>490.000₫</strong></li>
                <li>Giảm ngay <strong>500.000₫</strong> khi thanh toán VietQR / VNPAY</li>
                <li>Hỗ trợ thu cũ đổi mới trợ giá lên tới <strong>3.000.000₫</strong></li>
              </ul>
            </div>

            {/* Desktop Action Area */}
            <div className="hidden sm:block space-y-3 pt-2">
              {isAdmin ? (
                /* Admin Notification & Edit Shortcut */
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-md">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Tài Khoản Quản Trị Viên (Admin)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Bạn đang đăng nhập bằng tài khoản chủ quản trị. Chức năng đặt mua hàng chỉ dành cho <strong>Khách Hàng</strong>. Bạn có thể vào Trang Quản Trị để cập nhật giá bán, tồn kho và thông số cho điện thoại này.
                  </p>
                  <div className="pt-1 flex items-center gap-3">
                    <Link
                      to="/admin/products"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Quản lý thông số máy trong Admin</span>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Customer Purchase Buttons */
                <>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-700">Số lượng:</span>
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-bold text-slate-800 min-w-[32px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-slate-200 text-slate-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-xs text-slate-400">
                      (Còn {product.stock} máy tại kho)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={handleAddToCart}
                      className="py-3.5 px-4 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      <span>Mua ngay (Giao tận nơi 2h)</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specs / Description / Reviews */}
      <div className="mt-6 sm:mt-8">
        <div className="flex border-b border-slate-200 gap-4 sm:gap-6 text-xs sm:text-sm font-bold mb-4 sm:mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2.5 sm:pb-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Thông số kỹ thuật
          </button>
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-2.5 sm:pb-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'description'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Mô tả sản phẩm
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2.5 sm:pb-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Đánh giá</span>
            <span className="bg-slate-100 text-slate-600 text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
              {product.reviewCount}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'specs' && <ProductSpecs specs={product.specs} />}
        
        {activeTab === 'description' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-8 space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Đặc điểm nổi bật của {product.name}</h3>
            
            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.highlights?.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-brand-50/40 border border-brand-100 text-xs font-medium text-slate-800">
                  <Sparkles className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line pt-3 border-t border-slate-100">
              {product.description}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && <ProductReviews product={product} />}
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-10 sm:mt-14">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">Sản phẩm tương tự</h3>
            <Link to="/products" className="text-xs font-bold text-brand-600 hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      {isAdmin ? (
        <div className="sm:hidden fixed bottom-12 left-0 right-0 z-30 bg-slate-900 text-white px-3 py-2.5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-300">Tài khoản Quản Trị</span>
          </div>
          <Link
            to="/admin/products"
            className="px-3.5 py-1.5 bg-brand-600 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Chỉnh sửa trong Admin
          </Link>
        </div>
      ) : (
        <div className="sm:hidden fixed bottom-12 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2 flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0 pr-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Giá ưu đãi</span>
            <span className="text-base font-black text-red-600 leading-none truncate">
              {formatPrice(currentPrice)}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleAddToCart}
              className="p-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 transition-colors"
              title="Thêm vào giỏ"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              onClick={handleBuyNow}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs shadow-md shadow-red-500/20 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Mua Ngay</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
