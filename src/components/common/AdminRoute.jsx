import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogIn, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Chưa đăng nhập -> Chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location, message: 'Vui lòng đăng nhập bằng tài khoản Quản trị viên để truy cập Trang Quản Trị' }} replace />;
  }

  // Đã đăng nhập nhưng không phải là Admin (Khách hàng thông thường) -> Chặn 403
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-5 shadow-2xl border border-slate-100 animate-slide-up">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Từ chối truy cập (403 Forbidden)
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-2.5">
              Khu Vực Dành Riêng Cho Quản Trị Viên
            </h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Tài khoản hiện tại (<strong className="text-slate-800">{user?.email}</strong>) là tài khoản <strong>Khách Hàng</strong>, không có quyền truy cập vào bảng điều khiển quản trị TechZone.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 text-left space-y-1">
            <span className="font-bold block">💡 Thông tin tài khoản Quản Trị:</span>
            <p>• Email: <strong>admin@techzone.vn</strong></p>
            <p>• Mật khẩu: <strong>admin123</strong></p>
          </div>

          <div className="pt-2 space-y-2 text-xs">
            <Link
              to="/login"
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-500/25"
            >
              <LogIn className="w-4 h-4" />
              <span>Đổi sang tài khoản Admin</span>
            </Link>
            <Link
              to="/"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay về trang mua sắm</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Đúng quyền Admin -> Cho phép vào
  return children;
};
