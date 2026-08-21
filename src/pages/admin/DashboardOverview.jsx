import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingBag, 
  Smartphone, 
  Users, 
  ArrowRight, 
  Clock, 
  Flame, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { StatCard } from '../../components/admin/StatCard';
import { RevenueChart } from '../../components/admin/RevenueChart';
import { OrderDetailModal } from '../../components/admin/OrderDetailModal';
import { api } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { success } = useToast();

  const loadData = async () => {
    setLoading(true);
    const res = await api.getAnalytics();
    if (res?.data) {
      setStats(res.data);
    } else {
      // Fallback
      setStats({
        totalRevenue: 68970000,
        totalOrders: 3,
        totalProducts: 6,
        lowStockProducts: 1,
        totalUsers: 2,
        topProducts: [],
        recentOrders: []
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateOrderStatus = async (orderId, statusData) => {
    await api.updateOrderStatus(orderId, statusData);
    success('Đã cập nhật trạng thái đơn hàng thành công!');
    loadData();
  };

  return (
    <AdminLayout title="Tổng Quan Hoạt Động (Dashboard)">
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              Chào mừng Quản trị viên trở lại! 👋
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hệ thống kết nối trực tiếp MySQL Database • Cập nhật tự động
            </p>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm mới dữ liệu</span>
          </button>
        </div>

        {/* 4 KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Tổng Doanh Thu"
            value={formatPrice(stats?.totalRevenue || 0)}
            icon={DollarSign}
            trend="+18.4%"
            color="emerald"
          />
          <StatCard
            title="Đơn Đặt Hàng"
            value={`${stats?.totalOrders || 0} đơn`}
            icon={ShoppingBag}
            trend="+12%"
            color="brand"
          />
          <StatCard
            title="Sản Phẩm Đang Bán"
            value={`${stats?.totalProducts || 0} máy`}
            icon={Smartphone}
            color="blue"
          />
          <StatCard
            title="Khách Hàng Đăng Ký"
            value={`${stats?.totalUsers || 0} người`}
            icon={Users}
            trend="+5%"
            color="amber"
          />
        </div>

        {/* Middle Section: Revenue Chart & Top Selling Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue 7-day Chart (8 cols) */}
          <div className="lg:col-span-8">
            <RevenueChart data={stats?.revenue7Days} />
          </div>

          {/* Top Selling Products (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h3 className="font-extrabold text-slate-900 text-sm">Bán Chạy Nhất</h3>
              </div>
              <Link to="/admin/products" className="text-xs font-bold text-brand-600 hover:underline">
                Xem tất cả
              </Link>
            </div>

            <div className="space-y-3">
              {stats?.topProducts?.slice(0, 4).map((p, idx) => (
                <div key={p.id || idx} className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={p.thumbnail} alt="" className="w-9 h-9 object-contain rounded-lg border border-slate-100 flex-shrink-0" />
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                      <span className="text-[11px] text-slate-400 font-semibold">{formatPrice(p.price)}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex-shrink-0">
                    {p.sold_count || 0} đã bán
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Recent Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Đơn Hàng Gần Đây Cần Xử Lý</h3>
              <p className="text-xs text-slate-400">Các đơn hàng mới nhất từ khách hàng</p>
            </div>
            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline"
            >
              <span>Xem toàn bộ đơn hàng</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Mã đơn</th>
                  <th className="py-3 px-4">Khách hàng</th>
                  <th className="py-3 px-4">Tổng tiền</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4">Thời gian</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats?.recentOrders?.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand-600">
                      #{ord.order_code || ord.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {ord.customer_name}
                    </td>
                    <td className="py-3 px-4 font-bold text-red-600">
                      {formatPrice(ord.total_amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {ord.order_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {formatDate(ord.created_at)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/orders?orderCode=${ord.order_code || ord.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors"
                      >
                        <span>Xử lý đơn →</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
