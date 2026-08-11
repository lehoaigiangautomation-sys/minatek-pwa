'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Cpu, RefreshCw } from 'lucide-react';

interface BottomNavProps {
  onOpenSimulator: () => void;
  onRefresh: () => void;
}

export default function BottomNav({ onOpenSimulator, onRefresh }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Giám Sát',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      label: 'Giả Lập',
      onClick: onOpenSimulator,
      icon: Cpu,
    },
    {
      label: 'Tài Khoản',
      href: '/user',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-t border-cyan-500/20 py-2 px-4 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname === item.href : false;

          if (item.href) {
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/15 border border-cyan-400/30 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[11px] font-semibold tracking-wide">{item.label}</span>
              </Link>
            );
          }

          return (
            <button
              key={idx}
              onClick={item.onClick}
              className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl text-slate-400 hover:text-cyan-400 transition-all duration-200"
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-semibold tracking-wide">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={onRefresh}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl text-slate-400 hover:text-cyan-400 transition-all active:rotate-180 duration-500"
          title="Tải lại dữ liệu"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="text-[11px] font-semibold tracking-wide">Làm Mới</span>
        </button>
      </div>
    </nav>
  );
}
