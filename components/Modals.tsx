'use client';

import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, QrCode, ShieldCheck } from 'lucide-react';

// Dynamic Modal Generic Wrapper
export function ModalBase({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md p-6 border border-cyan-500/40 shadow-2xl relative bg-slate-900/95 text-white rounded-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-white mb-4 pr-6">{title}</h3>
        {children}
      </div>
    </div>
  );
}

// Add/Edit Tab Modal
export function TabEditModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialName = '',
  isEdit = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  onDelete?: () => void;
  initialName?: string;
  isEdit?: boolean;
}) {
  const [name, setName] = useState(initialName);

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={isEdit ? 'Chỉnh Sửa Tủ/Khu Vực' : 'Thêm Tủ/Khu Vực Mới'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            onSave(name.trim());
            onClose();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tên Thiết Bị / Khu Vực</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Tủ Điện Phụ 02, Máy Bơm Khu A..."
            className="w-full bg-slate-800 border border-cyan-500/30 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
            autoFocus
          />
        </div>
        <div className="flex items-center justify-between gap-3 pt-2">
          {isEdit && onDelete ? (
            <button
              type="button"
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="px-4 py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" /> Xóa
            </button>
          ) : <div></div>}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-600/30"
            >
              Lưu Thành Công
            </button>
          </div>
        </div>
      </form>
    </ModalBase>
  );
}

// Add Monitor Modal
export function AddMonitorModal({
  isOpen,
  onClose,
  onSave,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  title: string;
}) {
  const [name, setName] = useState('');

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            onSave(name.trim());
            setName('');
            onClose();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tên Thiết Bị Giám Sát</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Cảm Biến Áp Lực, Máy Nén Khí..."
            className="w-full bg-slate-800 border border-cyan-500/30 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-600/30"
          >
            Thêm Ngay
          </button>
        </div>
      </form>
    </ModalBase>
  );
}

// Add Switch Modal
export function AddSwitchModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, bid?: number) => void;
}) {
  const [name, setName] = useState('');
  const [bid, setBid] = useState<number>(1);

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Thêm Công Tắc Điều Khiển Mới">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) {
            onSave(name.trim(), Number(bid));
            setName('');
            onClose();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tên Công Tắc</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Công Tắc Đèn Xưởng 03, Van Xả..."
            className="w-full bg-slate-800 border border-cyan-500/30 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mã Kênh BID (Board ID)</label>
          <input
            type="number"
            value={bid}
            onChange={(e) => setBid(Number(e.target.value))}
            className="w-full bg-slate-800 border border-cyan-500/30 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-600/30"
          >
            Tạo Công Tắc
          </button>
        </div>
      </form>
    </ModalBase>
  );
}

// QR Code Scanner Modal Simulation
export function QrScannerModal({
  isOpen,
  onClose,
  onScanned,
}: {
  isOpen: boolean;
  onClose: () => void;
  onScanned: (deviceId: string) => void;
}) {
  const [scanning, setScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onScanned('MINATEK_GW_NEW_8899');
      onClose();
    }, 1500);
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Quét Mã QR Kết Nối Thiết Bị IoT">
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="relative w-48 h-48 bg-slate-950 border-2 border-cyan-400/60 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl">
          <QrCode className="w-28 h-28 text-cyan-400/80 animate-pulse" />
          {scanning && (
            <div className="absolute inset-0 bg-cyan-500/20 border-t-4 border-cyan-400 animate-scan"></div>
          )}
        </div>
        <p className="text-xs text-slate-300 max-w-xs">
          Đưa camera điện thoại hướng về phía mã QR dán trên thân tủ điện Minatek để tự động kết nối PWA.
        </p>
        <button
          onClick={handleSimulateScan}
          disabled={scanning}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          {scanning ? 'Đang Quét Thiết Bị...' : 'Mô Phỏng Quét QR Mã MINATEK'}
        </button>
      </div>
    </ModalBase>
  );
}
