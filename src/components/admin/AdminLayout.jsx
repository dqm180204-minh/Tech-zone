import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Smartphone, 
  ShoppingBag, 
  Tag, 
  Users, 
  LogOut, 
  Store, 
  Menu, 
  X, 
  Bell, 
  ShieldCheck, 
  ChevronRight,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout = ({ children, title = 'Bảng Điều Khiển' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', label: 'Tổng quan Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'Quản lý Sản phẩm', icon: Smartphone },
    { to: '/admin/orders', label: 'Quản lý Đơn hàng', icon: ShoppingBag },
    { to: '/admin/coupons', label: 'Mã Giảm Giá (Voucher)', icon: Tag },
    { to: '/admin/users', label: 'Khách hàng & Tài khoản', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* Sidebar (Desktop & Mobile Overlay) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">
                  TECH<span className="text-brand-400">ZONE</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-400 font-bold mt-0.5">
                  Admin Portal
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MySQL Status Badge */}
          <div className="mx-4 my-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <div className="flex-1 truncate">
              <span className="text-[10px] text-slate-400 block font-medium">Cơ sở dữ liệu</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Database className="w-3 h-3" /> MySQL techzone_db
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-3 mb-2">
              Quản lý hệ thống
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Return Store & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-brand-400" />
              <span>Xem trang bán hàng</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-2.5 rounded-xl text-red-400 hover:bg-red-950/40 hover:text-red-300 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h1>
          </div>

          {/* Topbar Right Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Quyền Quản Trị (Admin)</span>
            </div>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover border border-brand-500"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {user?.name || 'Admin'}
                </div>
                <div className="text-[10px] text-slate-400">admin@techzone.vn</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
