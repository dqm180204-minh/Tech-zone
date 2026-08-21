import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  RefreshCw,
  PlusCircle,
  ShoppingBag,
  DollarSign,
  AlertCircle,
  Calendar,
  Phone,
  User,
  ChevronDown
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { OrderDetailModal } from '../../components/admin/OrderDetailModal';
import { api } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const STATUS_TABS = [
  { id: 'all', label: 'Tất cả đơn' },
  { id: 'pending', label: 'Chờ xác nhận' },
  { id: 'confirmed', label: 'Đã xác nhận' },
  { id: 'processing', label: 'Đang đóng gói' },
  { id: 'shipping', label: 'Đang giao hàng' },
  { id: 'completed', label: 'Giao thành công' },
  { id: 'cancelled', label: 'Đã hủy' },
];

const STATUS_BADGES = {
  pending: { label: 'Chờ xác nhận', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  processing: { label: 'Đang đóng gói', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  shipping: { label: 'Đang giao hàng', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  completed: { label: 'Giao thành công', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800 border-red-200' },
};

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { success, error, info } = useToast();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders({
        status: activeTab !== 'all' ? activeTab : undefined,
        search: search || undefined
      });
      if (res && res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.warn('Loi loadOrders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadOrders();
  };

  const handleOpenDetail = (ord) => {
    setSelectedOrder(ord);
    setModalOpen(true);
  };

  const handleUpdateStatus = async (orderId, statusData) => {
    const res = await api.updateOrderStatus(orderId, statusData);
    if (res && res.success) {
      success('Cập nhật trạng thái đơn hàng thành công!');
      loadOrders();
    } else {
      error(res?.message || 'Lỗi khi cập nhật trạng thái đơn');
    }
  };

  // Tao don hang thu nghiem mau
  const handleCreateSampleOrder = async () => {
    const sampleNames = ['Nguyễn Văn Nam', 'Trần Thị Mai', 'Lê Hoàng Long', 'Phạm Minh Đức', 'Vũ Thu Trang'];
    const samplePhones = ['0912 345 678', '0988 777 666', '0903 111 222', '0977 888 999', '0933 444 555'];
    const randomIdx = Math.floor(Math.random() * sampleNames.length);

    const res = await api.createOrder({
      customerName: sampleNames[randomIdx],
      customerPhone: samplePhones[randomIdx],
      customerEmail: 'khachhang@gmail.com',
      customerCity: 'TP. Hồ Chí Minh',
      customerDistrict: 'Quận 1',
      customerAddress: '72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP.HCM',
      customerNote: 'Giao giờ hành chính, gọi trước 15 phút',
      subtotal: 34990000,
      discountAmount: 500000,
      shippingFee: 0,
      totalAmount: 34490000,
      couponCode: 'TECHZONE500',
      paymentMethod: 'vietqr',
      items: [
        {
          productId: 'iphone-16-pro-max',
          name: 'iPhone 16 Pro Max 256GB',
          thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
          color: 'Titan Tự Nhiên',
          storage: '256GB',
          price: 34990000,
          quantity: 1
        }
      ]
    });

    if (res && res.success) {
      success(`Đã tạo thành công đơn hàng mẫu #${res.orderCode}!`);
      loadOrders();
    } else {
      error('Không thể tạo đơn hàng thử nghiệm');
    }
  };

  // Tinh toan metrics tong quan
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter((o) => o.orderStatus === 'pending').length;
  const shippingCount = orders.filter((o) => o.orderStatus === 'shipping').length;
  const completedCount = orders.filter((o) => o.orderStatus === 'completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.orderStatus !== 'cancelled' ? Number(o.total || 0) : 0), 0);

  return (
    <AdminLayout title="Quản Lý Đơn Đặt Hàng">
      <div className="space-y-6">
        {/* Top 4 KPI Summary Cards for Orders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Tổng số đơn</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">{totalOrdersCount} đơn</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-600 font-bold uppercase tracking-wider block">Chờ xác nhận</span>
              <span className="text-2xl font-black text-amber-600 mt-1 block">{pendingCount} đơn</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-purple-600 font-bold uppercase tracking-wider block">Đang giao hàng</span>
              <span className="text-2xl font-black text-purple-600 mt-1 block">{shippingCount} đơn</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider block">Doanh thu đơn</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">{formatPrice(totalRevenue)}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm theo Mã đơn (#TZ-...), Tên khách, SĐT..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCreateSampleOrder}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl text-xs font-bold transition-all border border-brand-200"
                title="Tạo nhanh 1 đơn hàng thử nghiệm để kiểm tra tính năng"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tạo đơn mẫu thử nghiệm</span>
              </button>

              <button
                onClick={loadOrders}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Làm mới</span>
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 pt-3">
            {STATUS_TABS.map((tab) => {
              const count = tab.id === 'all' 
                ? orders.length 
                : orders.filter((o) => o.orderStatus === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Danh sách: <strong>{orders.length}</strong> đơn hàng trong hệ thống
            </span>
          </div>

          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Mã đơn</th>
                    <th className="py-3 px-4">Khách hàng & SĐT</th>
                    <th className="py-3 px-4">Sản phẩm đã đặt</th>
                    <th className="py-3 px-4">Tổng tiền</th>
                    <th className="py-3 px-4">Thanh toán</th>
                    <th className="py-3 px-4">Trạng thái vận chuyển</th>
                    <th className="py-3 px-4">Ngày đặt</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => {
                    const badge = STATUS_BADGES[ord.orderStatus] || { label: ord.orderStatus, color: 'bg-slate-100 text-slate-700' };

                    return (
                      <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Order Code */}
                        <td className="py-3.5 px-4 font-mono font-bold text-brand-600">
                          #{ord.orderCode}
                        </td>

                        {/* Customer Info */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{ord.customer?.name}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" />
                            <span>{ord.customer?.phone}</span>
                          </div>
                        </td>

                        {/* Order Items */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {ord.items?.[0]?.thumbnail && (
                              <img
                                src={ord.items[0].thumbnail}
                                alt=""
                                className="w-9 h-9 object-contain rounded-lg border border-slate-100 bg-slate-50 p-1 flex-shrink-0"
                              />
                            )}
                            <div>
                              <span className="font-bold text-slate-800 line-clamp-1">
                                {ord.items?.[0]?.name || 'Điện thoại'}
                              </span>
                              {ord.items && ord.items.length > 1 && (
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  + {ord.items.length - 1} máy khác
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Total Amount */}
                        <td className="py-3.5 px-4 font-black text-red-600 text-sm">
                          {formatPrice(ord.total)}
                        </td>

                        {/* Payment Method */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 block w-fit">
                              {ord.paymentMethod}
                            </span>
                            <span className={`text-[10px] font-bold block ${ord.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {ord.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                            </span>
                          </div>
                        </td>

                        {/* Status Select dropdown */}
                        <td className="py-3.5 px-4">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border inline-block ${badge.color}`}>
                            {badge.label}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                          {formatDate(ord.createdAt)}
                        </td>

                        {/* Detail Modal button */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleOpenDetail(ord)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl font-bold text-xs transition-colors shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Xử lý</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty Orders State */
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Chưa có đơn hàng nào theo bộ lọc này
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                  Khi khách hàng đặt mua điện thoại trên website, đơn hàng sẽ tự động xuất hiện tại đây để bạn duyệt và đổi trạng thái giao hàng.
                </p>
              </div>
              <button
                onClick={handleCreateSampleOrder}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Tạo đơn hàng mẫu thử nghiệm ngay</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail & Status Modal */}
      <OrderDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </AdminLayout>
  );
};
