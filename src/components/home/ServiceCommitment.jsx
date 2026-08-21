import React from 'react';
import { ShieldCheck, RefreshCw, Truck, CreditCard } from 'lucide-react';
import { SERVICE_COMMITMENTS } from '../../data/banners';

const ICON_MAP = {
  ShieldCheck,
  RefreshCw,
  Truck,
  CreditCard
};

export const ServiceCommitment = () => {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_COMMITMENTS.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-brand-500/50 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
