import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Smartphone, Lock, Mail, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, loginWithDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleDemoLogin = () => {
    loginWithDemo();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xl space-y-6">
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
          <h2 className="text-xl font-bold text-slate-900 pt-2">
            Đăng nhập tài khoản
          </h2>
          <p className="text-xs text-slate-500">
            Quản lý đơn hàng, theo dõi giao hàng và nhận ưu đãi riêng
          </p>
        </div>

        {/* 1-Click Quick Demo Login Button */}
        <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-900">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Trải nghiệm nhanh hệ thống</span>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Đăng nhập 1-Click với Tài khoản Demo</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Hoặc dùng email
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
                placeholder="customer@techzone.vn"
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
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
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
        <div className="text-center pt-2 text-xs text-slate-500">
          Chưa có tài khoản TechZone?{' '}
          <Link to="/register" className="font-bold text-brand-600 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};
