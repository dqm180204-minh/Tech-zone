import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ChevronRight, Zap } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { PRODUCTS } from '../../data/mockProducts';

export const FlashSale = () => {
  // Countdown Timer: 08:45:30 style
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = PRODUCTS.filter((p) => p.isFlashSale);

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-5 sm:p-7 text-white shadow-xl shadow-red-500/10">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center animate-bounce">
                <Flame className="w-6 h-6 fill-amber-300 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                    Flash Sale Giờ Vàng
                  </h2>
                  <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                    Giá Sốc
                  </span>
                </div>
                <p className="text-xs text-white/80 font-medium">Số lượng có hạn, kết thúc sau:</p>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-1.5 font-mono text-sm font-black text-slate-900">
                <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-md">
                  {formatDigit(timeLeft.hours)}
                </div>
                <span className="text-white text-base font-bold">:</span>
                <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-md">
                  {formatDigit(timeLeft.minutes)}
                </div>
                <span className="text-white text-base font-bold">:</span>
                <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-md text-red-600 animate-pulse">
                  {formatDigit(timeLeft.seconds)}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {flashSaleProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="pt-6 text-center">
            <Link
              to="/products?filter=flashsale"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white text-red-600 font-extrabold text-xs shadow-lg hover:bg-slate-50 transition-colors"
            >
              <span>Xem tất cả sản phẩm Flash Sale</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
