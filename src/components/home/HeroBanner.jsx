import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Shield, ArrowRight, Zap, Gift } from 'lucide-react';
import { HERO_SLIDES } from '../../data/banners';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden py-2 sm:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Main Hero Slider (3 cols) */}
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden shadow-xl min-h-[330px] sm:min-h-[440px] flex items-center bg-slate-900 group">
            {/* Dynamic Background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-95 transition-all duration-700`}></div>
            
            {/* Background Blur Graphic */}
            <div className="absolute -right-20 -bottom-20 w-80 sm:w-96 h-80 sm:h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Slide Content */}
            <div className="relative z-10 w-full p-4 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-8">
              {/* Left Text */}
              <div className="flex-1 space-y-2 sm:space-y-4 text-left w-full">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{slide.badge}</span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <span className={`text-[11px] sm:text-sm font-bold uppercase tracking-widest block ${slide.accentColor}`}>
                    {slide.subtitle}
                  </span>
                  <h1 className="text-2xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    {slide.title}
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-2 max-w-md hidden xs:block">
                  {slide.tagline}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="bg-red-500/20 border border-red-500/30 text-red-300 font-bold text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl">
                    {slide.discount}
                  </div>
                  <div className="text-lg sm:text-2xl font-black text-white">
                    {slide.price}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 sm:gap-3">
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-600/30 hover:scale-105 transition-all"
                  >
                    <span>Khám phá ngay</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                  <Link
                    to="/products"
                    className="px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-colors"
                  >
                    Xem tất cả
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex-1 flex justify-center items-center relative w-full sm:w-auto">
                <div className="relative w-40 h-40 sm:w-72 sm:h-72">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Slider Navigation Arrows (Desktop) */}
            <button
              onClick={prevSlide}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slider Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 z-20">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 sm:w-8 bg-brand-500' : 'w-1.5 sm:w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Side Promo Cards (1 col) */}
          <div className="hidden lg:flex flex-col justify-between gap-4">
            {/* Mini Card 1 */}
            <div className="relative flex-1 rounded-3xl p-5 bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 overflow-hidden flex flex-col justify-between group">
              <div className="relative z-10">
                <span className="inline-block bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider mb-2">
                  Trade-in Lên đời
                </span>
                <h4 className="text-white font-extrabold text-base leading-tight">
                  Thu Cũ Đổi Mới Trợ Giá Tới 3 Triệu
                </h4>
                <p className="text-xs text-slate-300 mt-1">Định giá máy nhanh qua app, nhận tiền ngay</p>
              </div>
              <div className="relative z-10 pt-3">
                <Link
                  to="/products?filter=hot"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Đổi máy ngay <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Mini Card 2 */}
            <div className="relative flex-1 rounded-3xl p-5 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-900 border border-indigo-500/30 overflow-hidden flex flex-col justify-between group">
              <div className="relative z-10">
                <span className="inline-block bg-brand-500 text-white font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider mb-2">
                  Ưu đãi tài chính
                </span>
                <h4 className="text-white font-extrabold text-base leading-tight">
                  Trả Góp 0% Lãi Suất 0₫ Trả Trước
                </h4>
                <p className="text-xs text-slate-300 mt-1">Duyệt hồ sơ online chỉ trong 5 phút</p>
              </div>
              <div className="relative z-10 pt-3">
                <Link
                  to="/products"
                  className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
