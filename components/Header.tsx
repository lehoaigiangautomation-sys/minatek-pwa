'use client';

import React, { useState } from 'react';
import { Phone, Globe, QrCode, Cpu, Wifi, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenSimulator: () => void;
  onOpenQrScanner: () => void;
}

export default function Header({ onOpenSimulator, onOpenQrScanner }: HeaderProps) {
  const [showPhone, setShowPhone] = useState(false);
  const [showWeb, setShowWeb] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 px-4 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Branding & QR Scanner */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQrScanner}
            className="p-2.5 bg-slate-900/90 border border-cyan-500/30 rounded-xl text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 hover:bg-slate-800 transition-all active:scale-95 shadow-inner"
            title="Quét mã QR kết nối thiết bị"
          >
            <QrCode className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-md border border-cyan-300/40">
                M
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full pulse-indicator"></span>
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                MINATEK
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-400/30">PWA</span>
              </h1>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Wifi className="w-3 h-3" /> Online
                </span>
                <span>•</span>
                <span className="text-slate-400">IoT Gateway 1.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions (Hotline, Web, IoT Sim) */}
        <div className="flex items-center gap-2">
          {/* IoT Simulator Trigger */}
          <button
            onClick={onOpenSimulator}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold rounded-xl hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-sm"
            title="Giả lập dữ liệu thiết bị IoT"
          >
            <Cpu className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>Giả Lập IoT</span>
          </button>

          {/* Hotline Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPhone(!showPhone);
                setShowWeb(false);
              }}
              onDoubleClick={() => window.open('tel:0942926979')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                showPhone
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-slate-800'
              }`}
            >
              <Phone className="w-4 h-4 text-rose-400 animate-bounce-short" />
              {showPhone ? <span className="text-xs">094 292 6979</span> : null}
            </button>
          </div>

          {/* Website Link Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowWeb(!showWeb);
                setShowPhone(false);
              }}
              onDoubleClick={() => window.open('https://minatek.vn', '_blank')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                showWeb
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-slate-800'
              }`}
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              {showWeb ? <span className="text-xs">minatek.vn</span> : null}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
