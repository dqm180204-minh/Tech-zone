import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Smartphone, Lock, Mail, ArrowRight, UserCheck, Sparkles, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectMessage = location.state?.message;
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      if (email.includes('admin')) {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  const handleAdminLogin = async () => {
    setEmail('admin@techzone.vn');
    setPassword('admin123');
    setIsLoading(true);
    const success = await login('admin@techzone.vn', 'admin123');
    setIsLoading(false);
    if (success) {
      navigate('/admin', { replace: true });
    }
  };

  const handleCustomerLogin = async () => {
    setEmail('customer@techzone.vn');
    setPassword('123456');
    setIsLoading(true);
    const success = await login('customer@techzone.vn', '123456');
    setIsLoading(false);
    if (success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl space-y-5">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              TECH<span className="text-brand-600">ZONE</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 pt-1">
            Đăng nhập tài khoản
          </h2>
          <p className="text-xs text-slate-500">
            Hệ thống phân quyền Quản Trị Viên và Khách Hàng
          </p>
        </div>

        {/* Redirect Notice if user was blocked from /admin */}
        {redirectMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium leading-relaxed">
            {redirectMessage}
          </div>
        )}

        {/* 1-Click Quick Login Buttons for Demo Testing */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            ⚡ Đăng nhập thử nghiệm nhanh:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleAdminLogin}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 border border-amber-400/30"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Acc Admin</span>
            </button>
            <button
              type="button"
              onClick={handleCustomerLogin}
              className="py-2.5 px-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Acc Khách Hàng</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Hoặc tự nhập email & mật khẩu
          </span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Main Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">
              Địa chỉ Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@techzone.vn hoặc user@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700">Mật khẩu</label>
              <a href="#forgot" className="text-[11px] text-brand-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            {isLoading ? (
              <span>Đang xử lý...</span>
            ) : (
              <>
                <span>Đăng nhập</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Link to Register */}
        <div className="text-center pt-1 text-xs text-slate-500">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-bold text-brand-600 hover:underline">
            Đăng ký tài khoản khách hàng
          </Link>
        </div>
      </div>
    </div>
  );
};
