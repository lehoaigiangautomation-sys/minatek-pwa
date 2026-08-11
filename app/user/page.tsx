'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import IotSimulatorModal from '@/components/IotSimulatorModal';
import { User, Phone, Mail, ShieldCheck, LogOut, Check, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const router = useRouter();
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [profile, setProfile] = useState({
    username: 'minatek_admin',
    name: 'Quản Trị Viên Minatek',
    email: 'admin@minatek.vn',
    phone: '0942926979',
    role: 'admin',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.username) {
          setProfile(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('minatek_token');
    localStorage.removeItem('minatek_user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 pt-0 font-sans">
      <Header
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenQrScanner={() => {}}
      />

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        {/* Profile Card Header */}
        <div className="glass-panel p-6 border border-cyan-500/30 text-center relative overflow-hidden bg-slate-900/90 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl mx-auto flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-cyan-500/30 border border-cyan-300/40 mb-3">
            {profile.name ? profile.name.charAt(0) : 'M'}
          </div>
          <h2 className="text-xl font-bold text-white">{profile.name}</h2>
          <p className="text-xs text-cyan-400 font-mono mt-0.5">@{profile.username} • Administrator</p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold rounded-full mt-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Tài Khoản Đã Xác Thực PWA</span>
          </div>
        </div>

        {saved && (
          <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Đã cập nhật thông tin tài khoản thành công!</span>
          </div>
        )}

        {/* Edit Profile Form */}
        <form onSubmit={handleSave} className="glass-panel p-6 border border-cyan-500/30 bg-slate-900/80 rounded-3xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Thông Tin Cá Nhân</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Họ & Tên</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Số Điện Thoại Liên Hệ</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 pl-10 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Hỗ Trợ</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 pl-10 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Thay Đổi</span>
          </button>
        </form>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3.5 bg-slate-900 border border-rose-500/40 text-rose-400 font-bold text-xs rounded-2xl hover:bg-rose-500/10 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng Xuất Khỏi Ứng Dụng</span>
        </button>
      </main>

      <BottomNav
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onRefresh={() => {}}
      />

      <IotSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSimulateEvent={() => {}}
      />
    </div>
  );
}
