import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const BottomNav = () => {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Hide bottom nav on specific fullscreen pages if needed (e.g. checkout)
  const isCheckout = location.pathname === '/checkout';

  if (isCheckout) return null;

  const navItems = [
    {
      to: '/',
      label: 'Trang chủ',
      icon: Home,
      badge: null,
    },
    {
      to: '/products',
      label: 'Sản phẩm',
      icon: Grid,
      badge: null,
    },
    {
      to: '/wishlist',
      label: 'Yêu thích',
      icon: Heart,
      badge: wishlistCount > 0 ? wishlistCount : null,
      badgeColor: 'bg-rose-500',
    },
    {
      to: '/cart',
      label: 'Giỏ hàng',
      icon: ShoppingBag,
      badge: totalItems > 0 ? totalItems : null,
      badgeColor: 'bg-red-600',
    },
    {
      to: isAuthenticated ? '/cart' : '/login',
      label: isAuthenticated ? (user?.name?.split(' ')?.[0] || 'Tài khoản') : 'Tài khoản',
      icon: User,
      badge: null,
      isAvatar: isAuthenticated && user?.avatar,
      avatarSrc: user?.avatar,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-bottom">
      <nav className="grid grid-cols-5 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative select-none ${
                  isActive
                    ? 'text-brand-600 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative p-1">
                    {item.isAvatar ? (
                      <img
                        src={item.avatarSrc}
                        alt="Avatar"
                        className={`w-5 h-5 rounded-full object-cover border ${
                          isActive ? 'border-brand-600 ring-2 ring-brand-500/20' : 'border-slate-300'
                        }`}
                      />
                    ) : (
                      <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.4px]' : 'stroke-[1.8px]'}`} />
                    )}

                    {/* Badge */}
                    {item.badge !== null && (
                      <span
                        className={`absolute -top-1 -right-2 ${
                          item.badgeColor || 'bg-red-600'
                        } text-white text-[9px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-sm animate-fade-in`}
                      >
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] tracking-tight truncate max-w-[56px] mt-0.5">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
