import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-500 py-3 overflow-x-auto no-scrollbar">
      <Link to="/" className="flex items-center hover:text-brand-600 transition-colors">
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Trang chủ</span>
      </Link>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
            {isLast ? (
              <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-md">
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className="hover:text-brand-600 transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
