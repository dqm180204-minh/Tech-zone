import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Smartphone, 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  PhoneCall, 
  MapPin, 
  Sparkles,
  ChevronRight,
  LogOut,
  PackageCheck,
  Flame,
  ArrowRight,
  SlidersHorizontal,
  LayoutDashboard,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { BRANDS } from '../../data/mockProducts';
import { formatPrice } from '../../utils/formatters';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { products } = useProducts();
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Handle live search auto-suggest
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchSuggestions(filtered);
      setIsSearchOpen(true);
    } else {
      setSearchSuggestions([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  // Click outside to close search & user menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current && !searchRef.current.contains(e.target) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm select-none">
      {/* Top Banner Announcement */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center space-x-2 truncate">
            <span className="flex-shrink-0 flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              HOT
            </span>
            <span className="truncate text-[11px] sm:text-xs">
              Thu cũ đổi mới trợ giá <strong>3.000.000₫</strong> • Trả góp 0%
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-5 text-xs text-slate-400 flex-shrink-0">
            {user?.role === 'admin' && (
              <>
                <Link
                  to="/admin"
                  className="flex items-center gap-1 text-amber-300 hover:text-amber-200 bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full font-bold transition-all border border-amber-300/30"
                >
                  <LayoutDashboard className="w-3 h-3 text-amber-300" />
                  <span>Trang Quản Trị (Admin)</span>
                </Link>
                <div className="h-3 w-px bg-slate-700"></div>
              </>
            )}
            <a href="tel:18006868" className="hover:text-white flex items-center gap-1.5 transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-brand-400" />
              Hotline: <strong className="text-white">1800 6868</strong>
            </a>
            <div className="h-3 w-px bg-slate-700"></div>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              120 Showrooms
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-18 py-2 sm:py-3 gap-2 sm:gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-xl text-slate-700 hover:bg-slate-100 md:hidden flex-shrink-0"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none group-hover:text-brand-600 transition-colors">
                  TECH<span className="text-brand-600">ZONE</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5 hidden xs:block">
                  Smartphones
                </span>
              </div>
            </Link>

            {/* Desktop Live Search Bar */}
            <div className="flex-1 max-w-xl relative hidden md:block" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Bạn tìm iPhone 16 Pro, Galaxy S24 Ultra, Xiaomi 14..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
                  className="w-full bg-slate-100/80 hover:bg-slate-100 text-slate-800 text-sm rounded-full pl-11 pr-24 py-2.5 border border-transparent focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors shadow-sm"
                >
                  Tìm kiếm
                </button>
              </form>

              {/* Desktop Live Search Dropdown Suggestions */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-slide-up">
                  {searchSuggestions.length > 0 ? (
                    <div className="py-2">
                      <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Gợi ý sản phẩm ({searchSuggestions.length})</span>
                        <Link 
                          to={`/products?search=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="text-brand-600 hover:underline text-xs capitalize font-medium flex items-center"
                        >
                          Xem tất cả <ChevronRight className="w-3 h-3 ml-0.5" />
                        </Link>
                      </div>
                      {searchSuggestions.map((prod) => (
                        <Link
                          key={prod.id}
                          to={`/product/${prod.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                        >
                          <img
                            src={prod.thumbnail}
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-lg border border-slate-100 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-brand-600">
                              {prod.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-sm font-bold text-red-600">
                                {formatPrice(prod.isFlashSale ? prod.flashSalePrice : prod.price)}
                              </span>
                              {prod.originalPrice > prod.price && (
                                <span className="text-xs text-slate-400 line-through">
                                  {formatPrice(prod.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
                            {prod.brand}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm text-slate-500">
                      Không tìm thấy sản phẩm nào khớp với "<strong>{searchQuery}</strong>"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              {/* Wishlist Link (Desktop) */}
              <Link
                to="/wishlist"
                className="hidden sm:flex relative p-2.5 rounded-xl text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-all items-center justify-center group"
                title="Sản phẩm yêu thích"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Link */}
              <Link
                to="/cart"
                className="relative p-2 sm:p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-600 transition-all flex items-center gap-1.5 sm:gap-2 group border border-slate-200/80"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-700 group-hover:text-brand-600" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline text-xs font-bold text-slate-700 group-hover:text-brand-600">
                  Giỏ hàng
                </span>
              </Link>

              {/* User Account / Auth Dropdown */}
              <div className="relative" ref={userMenuRef}>
                {isAuthenticated ? (
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 p-1 sm:p-1.5 sm:pr-3 rounded-full hover:bg-slate-100 border border-slate-200 transition-all"
                  >
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                      alt={user?.name}
                      className="w-7 h-7 rounded-full object-cover border border-brand-500"
                    />
                    <span className="text-xs font-bold text-slate-700 max-w-[80px] truncate hidden md:inline">
                      {user?.name}
                    </span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm shadow-brand-500/20"
                  >
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Đăng nhập</span>
                  </Link>
                )}

                {/* User Dropdown Menu */}
                {isAuthenticated && isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-slide-up">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    </div>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-brand-600 bg-brand-50/50 hover:bg-brand-50 font-bold"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-600" />
                        Trang Quản Trị (Dashboard)
                      </Link>
                    )}
                    <Link
                      to="/cart"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-600 font-medium"
                    >
                      <PackageCheck className="w-4 h-4 text-slate-400" />
                      Đơn hàng & Giỏ hàng
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-600 font-medium"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      Sản phẩm yêu thích
                    </Link>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar & Auto-suggest */}
          <div className="pb-2.5 md:hidden relative" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Tìm iPhone 16, Galaxy S24, Xiaomi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
                className="w-full bg-slate-100 text-slate-900 text-xs rounded-full pl-9 pr-14 py-2.5 border border-slate-200/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-brand-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full"
              >
                Tìm
              </button>
            </form>

            {/* Mobile Search Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-slide-up max-h-[60vh] overflow-y-auto">
                {searchSuggestions.length > 0 ? (
                  <div className="py-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-100">
                      <span>Gợi ý ({searchSuggestions.length})</span>
                      <Link 
                        to={`/products?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="text-brand-600 text-xs font-semibold"
                      >
                        Xem tất cả →
                      </Link>
                    </div>
                    {searchSuggestions.map((prod) => (
                      <Link
                        key={prod.id}
                        to={`/product/${prod.id}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-none"
                      >
                        <img
                          src={prod.thumbnail}
                          alt={prod.name}
                          className="w-10 h-10 object-contain rounded-lg border border-slate-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs font-extrabold text-red-600">
                              {formatPrice(prod.isFlashSale ? prod.flashSalePrice : prod.price)}
                            </span>
                            {prod.originalPrice > prod.price && (
                              <span className="text-[10px] text-slate-400 line-through">
                                {formatPrice(prod.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    Không tìm thấy sản phẩm nào khớp với "<strong>{searchQuery}</strong>"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Quick Brand Strip (Horizontal Scroll) */}
        <div className="md:hidden border-t border-slate-100 bg-slate-50/90 px-3 py-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <Link
              to="/products?filter=flashsale"
              className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-200/80 px-2.5 py-1 rounded-full text-[11px] font-bold flex-shrink-0"
            >
              <Flame className="w-3 h-3 fill-red-500" />
              <span>Flash Sale</span>
            </Link>
            {BRANDS.filter(b => b.id !== 'all').map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.id}`}
                className="bg-white text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0 hover:border-brand-500"
              >
                {brand.name.replace(' (iPhone)', '')}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Secondary Category Navigation Bar */}
        <div className="bg-slate-50/90 border-t border-slate-200/60 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 py-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center space-x-6 flex-shrink-0">
                <Link
                  to="/products"
                  className="flex items-center gap-1.5 hover:text-brand-600 transition-colors py-1"
                >
                  <Smartphone className="w-4 h-4 text-brand-600" />
                  <span>Tất Cả Điện Thoại</span>
                </Link>
                {BRANDS.filter(b => b.id !== 'all').map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/products?brand=${brand.id}`}
                    className="hover:text-brand-600 transition-colors py-1 flex items-center gap-1 text-slate-600"
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200 flex-shrink-0">
                <Link
                  to="/products?filter=flashsale"
                  className="flex items-center gap-1 text-red-600 font-bold hover:opacity-80 transition-opacity"
                >
                  <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>Flash Sale Giá Sốc</span>
                </Link>
                <Link
                  to="/products?filter=hot"
                  className="text-amber-600 font-bold hover:opacity-80"
                >
                  Flagship Đỉnh Cao
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[100px] bg-black/50 backdrop-blur-sm z-50 flex flex-col justify-start">
          <div className="bg-white max-h-[80vh] overflow-y-auto p-5 rounded-b-3xl shadow-2xl border-t border-slate-100 animate-slide-up">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Danh mục thương hiệu
            </div>
            <div className="grid grid-cols-2 gap-2 mb-5">
              <Link
                to="/products"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50 text-xs font-bold text-slate-800"
              >
                <span>Tất cả sản phẩm</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              {BRANDS.filter(b => b.id !== 'all').map((brand) => (
                <Link
                  key={brand.id}
                  to={`/products?brand=${brand.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50 text-xs font-bold text-slate-800"
                >
                  <span>{brand.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2">
              <Link
                to="/products?filter=flashsale"
                className="flex items-center gap-2 p-2.5 rounded-xl text-red-600 font-bold bg-red-50 text-xs"
              >
                <Flame className="w-4 h-4 fill-red-500" />
                <span>Flash Sale Giờ Vàng</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-2 p-2.5 rounded-xl text-slate-700 font-medium hover:bg-slate-50 text-xs"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Danh sách yêu thích ({wishlistCount})</span>
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-2 p-2.5 rounded-xl text-slate-700 font-medium hover:bg-slate-50 text-xs"
              >
                <ShoppingCart className="w-4 h-4 text-brand-600" />
                <span>Giỏ hàng ({totalItems})</span>
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-amber-900 font-bold bg-amber-100 text-xs mt-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-700" />
                  <span>Vào Trang Quản Trị (Admin)</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
