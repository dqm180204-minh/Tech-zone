import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

const STORAGE_KEY = 'techzone_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const { success, error, info } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email, password) => {
    // Mock authentication logic
    if (!email || !password) {
      error('Vui lòng nhập đầy đủ Email và Mật khẩu');
      return false;
    }

    if (password.length < 6) {
      error('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }

    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 6),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: email.includes('admin') ? 'admin' : 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: '0988 123 456',
      address: '72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh'
    };

    setUser(mockUser);
    success(`Đăng nhập thành công! Chào mừng ${mockUser.name}`);
    return true;
  };

  const loginWithDemo = () => {
    const demoUser = {
      id: 'usr_demo',
      name: 'Nguyễn Văn Công Nghệ',
      email: 'demo@techzone.vn',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      phone: '0909 888 999',
      address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh'
    };
    setUser(demoUser);
    success('Đã đăng nhập bằng tài khoản Trải Nghiệm Demo!');
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      error('Vui lòng điền đầy đủ các thông tin đăng ký');
      return false;
    }

    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 6),
      name,
      email,
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      phone: '',
      address: ''
    };

    setUser(newUser);
    success('Đăng ký tài khoản thành công!');
    return true;
  };

  const logout = () => {
    setUser(null);
    info('Bạn đã đăng xuất khỏi hệ thống TechZone');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithDemo,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
