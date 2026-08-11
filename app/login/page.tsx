'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, User, ArrowRight, Smartphone, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('minatek_admin');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.accessToken) {
        localStorage.setItem('minatek_token', data.accessToken);
        localStorage.setItem('minatek_user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setErrorMsg(data.message || 'Đăng nhập không thành công');
      }
    } catch (err) {
      setErrorMsg('Không thể kết nối máy chủ API Minatek');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glowing background circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-panel w-full max-w-md p-8 border border-cyan-500/30 shadow-2xl relative bg-slate-900/80 backdrop-blur-2xl rounded-3xl z-10 space-y-6">
        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-cyan-500/30 border border-cyan-300/40">
            M
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            MINATEK <span className="text-xs uppercase px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-400/30 font-bold">PWA</span>
          </h1>
          <p className="text-xs text-slate-400">
            Hệ thống điều khiển & giám sát tự động hóa thông minh
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tên Đăng Nhập</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
                className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mật Khẩu</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm rounded-2xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            {loading ? (
              <span>Đang Xác Thực...</span>
            ) : (
              <>
                <span>Đăng Nhập Minatek</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-400">
            Minatek Smart App • Tương thích iOS, Android & Desktop PWA
          </p>
        </div>
      </div>
    </div>
  );
}
