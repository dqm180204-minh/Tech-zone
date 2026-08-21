import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { TECH_NEWS } from '../../data/banners';

export const TechNews = () => {
  return (
    <section className="py-8 bg-slate-100/60 rounded-3xl my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Công nghệ 24h
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Tin Tức & Đánh Giá Mới Nhất
            </h2>
          </div>
          <a href="#tin-tuc" className="text-xs font-bold text-brand-600 hover:underline flex items-center">
            Tất cả bài viết <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_NEWS.map((news) => (
            <article
              key={news.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative pt-[55%] overflow-hidden bg-slate-100">
                <img
                  src={news.image}
                  alt={news.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {news.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {news.author}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {news.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
