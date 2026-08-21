import React from 'react';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Camera, 
  BatteryCharging, 
  Layers, 
  Smartphone, 
  Wifi, 
  Scale 
} from 'lucide-react';

export const ProductSpecs = ({ specs = {} }) => {
  const specItems = [
    { label: 'Màn hình', value: specs.screen, icon: Monitor },
    { label: 'Vi xử lý (CPU)', value: specs.cpu, icon: Cpu },
    { label: 'RAM', value: specs.ram, icon: Layers },
    { label: 'Bộ nhớ trong (ROM)', value: specs.rom, icon: HardDrive },
    { label: 'Camera sau', value: specs.rearCamera, icon: Camera },
    { label: 'Camera trước', value: specs.frontCamera, icon: Camera },
    { label: 'Pin & Sạc', value: specs.battery, icon: BatteryCharging },
    { label: 'Hệ điều hành', value: specs.os, icon: Smartphone },
    { label: 'SIM & Mạng', value: specs.sim, icon: Wifi },
    { label: 'Trọng lượng', value: specs.weight, icon: Scale },
    { label: 'Kết nối khác', value: specs.connectivity, icon: Wifi },
  ].filter(item => item.value);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-base">Thông số kỹ thuật chi tiết</h3>
        <span className="text-xs text-brand-600 font-semibold bg-brand-50 px-2.5 py-1 rounded-full">
          Chính hãng VN/A
        </span>
      </div>

      <div className="divide-y divide-slate-100 text-sm">
        {specItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 font-medium mb-1 sm:mb-0">
                <Icon className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
              <div className="sm:col-span-2 text-slate-800 font-semibold text-sm leading-relaxed">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
