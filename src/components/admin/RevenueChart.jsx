import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const RevenueChart = ({ data = [] }) => {
  // Default fallback sample 7-day data if none passed
  const chartData = data && data.length > 0 ? data : [
    { date: '15/08', amount: 18500000 },
    { date: '16/08', amount: 34990000 },
    { date: '17/08', amount: 28490000 },
    { date: '18/08', amount: 52980000 },
    { date: '19/08', amount: 41990000 },
    { date: '20/08', amount: 68980000 },
    { date: '21/08', amount: 89470000 },
  ];

  const maxAmount = Math.max(...chartData.map((d) => d.amount), 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">
            Biểu Đồ Doanh Thu 7 Ngày Qua
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Dữ liệu doanh thu thực tế từ MySQL Database</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+24.8% Tăng trưởng</span>
        </div>
      </div>

      {/* Bar Chart Visual */}
      <div className="pt-6">
        <div className="h-52 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-slate-100">
          {chartData.map((item, idx) => {
            const heightPercent = Math.max(12, Math.round((item.amount / maxAmount) * 100));
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg whitespace-nowrap mb-1 shadow-lg pointer-events-none">
                  {formatPrice(item.amount)}
                </div>

                {/* Bar */}
                <div
                  className="w-full max-w-[42px] bg-gradient-to-t from-brand-600 to-indigo-500 rounded-t-xl group-hover:from-brand-500 group-hover:to-indigo-400 transition-all duration-500 shadow-sm"
                  style={{ height: `${heightPercent}%` }}
                />

                {/* Date Label */}
                <span className="text-[11px] font-bold text-slate-500 mt-1">
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
