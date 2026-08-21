import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { PROMO_COUPONS } from '../data/banners';
import { generateOrderId } from '../utils/formatters';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'techzone_cart_items';
const ORDERS_STORAGE_KEY = 'techzone_orders_history';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(null);
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { success, error, info } = useToast();

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  // Thêm vào giỏ hàng
  const addToCart = (product, selectedColor, selectedStorage, quantity = 1) => {
    const colorName = selectedColor?.name || product.colors?.[0]?.name || 'Tiêu chuẩn';
    const colorHex = selectedColor?.hex || product.colors?.[0]?.hex || '#000000';
    const storageSize = selectedStorage?.size || product.storageOptions?.[0]?.size || 'Tiêu chuẩn';
    const priceOffset = selectedStorage?.priceOffset || 0;
    const itemPrice = (product.isFlashSale ? product.flashSalePrice : product.price) + priceOffset;
    const itemImage = selectedColor?.image || product.thumbnail;

    const cartItemId = `${product.id}-${colorName}-${storageSize}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            brand: product.brand,
            thumbnail: itemImage,
            color: { name: colorName, hex: colorHex },
            storage: storageSize,
            price: itemPrice,
            originalPrice: product.originalPrice + priceOffset,
            quantity: quantity
          }
        ];
      }
    });

    success(`Đã thêm ${product.name.split('-')[0]} (${colorName}, ${storageSize}) vào giỏ hàng!`);
  };

  // Cập nhật số lượng
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  // Xóa khỏi giỏ hàng
  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === cartItemId);
      if (item) {
        info(`Đã xóa ${item.name.split('-')[0]} khỏi giỏ hàng`);
      }
      return prev.filter((i) => i.id !== cartItemId);
    });
  };

  // Xóa toàn bộ giỏ
  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  // Tính toán tiền
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Áp dụng Voucher
  const applyCoupon = (codeStr) => {
    if (!codeStr || !codeStr.trim()) {
      error('Vui lòng nhập mã giảm giá');
      return false;
    }
    const cleanCode = codeStr.trim().toUpperCase();
    const foundCoupon = PROMO_COUPONS.find((c) => c.code === cleanCode);

    if (!foundCoupon) {
      error('Mã giảm giá không tồn tại hoặc đã hết hạn');
      return false;
    }

    if (subtotal < foundCoupon.minOrderValue) {
      error(`Mã này chỉ áp dụng cho đơn hàng từ ${new Intl.NumberFormat('vi-VN').format(foundCoupon.minOrderValue)} ₫`);
      return false;
    }

    setCoupon(foundCoupon);
    success(`Áp dụng mã ${cleanCode} thành công!`);
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    info('Đã hủy áp dụng mã giảm giá');
  };

  // Tính tiền giảm giá
  let discountAmount = 0;
  if (coupon) {
    if (coupon.discountType === 'fixed') {
      discountAmount = coupon.discountValue;
    } else if (coupon.discountType === 'percent') {
      discountAmount = Math.min((subtotal * coupon.discountValue) / 100, coupon.maxDiscount || 999999999);
    }
  }

  // Phí ship: Miễn phí nếu đơn >= 5.000.000đ hoặc giỏ rỗng, ngược lại 30.000đ
  const shippingFee = subtotal === 0 || subtotal >= 5000000 ? 0 : 30000;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Đặt hàng
  const placeOrder = (customerInfo, paymentMethod) => {
    const newOrder = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      items: [...cartItems],
      subtotal,
      discountAmount,
      shippingFee,
      total,
      couponCode: coupon?.code || null,
      customer: customerInfo,
      paymentMethod: paymentMethod || 'cod',
      status: 'pending'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        coupon,
        orders,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
