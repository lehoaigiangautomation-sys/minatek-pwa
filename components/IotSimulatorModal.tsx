'use client';

import React, { useState } from 'react';
import { Cpu, X, Zap, AlertTriangle, Activity, CheckCircle, RefreshCw } from 'lucide-react';

interface IotSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateEvent: (eventType: string, payload: any) => void;
}

export default function IotSimulatorModal({
  isOpen,
  onClose,
  onSimulateEvent,
}: IotSimulatorModalProps) {
  const [selectedDevice, setSelectedDevice] = useState('MINATEK_GW_001');
  const [sensorTemp, setSensorTemp] = useState('32.5');
  const [alarmActive, setAlarmActive] = useState(false);
  const [logMessage, setLogMessage] = useState<string[]>([]);

  if (!isOpen) return null;

  const addLog = (msg: string) => {
    setLogMessage((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);
  };

  const handleSimulateSensor = () => {
    onSimulateEvent('sensor_update', { deviceId: selectedDevice, value: `${sensorTemp} °C` });
    addLog(`Đã gửi dữ liệu nhiệt độ: ${sensorTemp} °C tới ${selectedDevice}`);
  };

  const handleSimulateAlarm = () => {
    const nextState = !alarmActive;
    setAlarmActive(nextState);
    onSimulateEvent('alarm_trigger', { deviceId: selectedDevice, active: nextState });
    addLog(`Cảnh báo hệ thống: ${nextState ? 'KÍCH HOẠT PUSH ALARM' : 'TẮT CẢNH BÁO'}`);
  };

  const handleSimulateOffline = () => {
    onSimulateEvent('lwt_disconnect', { deviceId: selectedDevice });
    addLog(`Gửi MQTT LWT Disconnect tới ${selectedDevice}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg p-6 border border-cyan-500/40 shadow-2xl relative bg-slate-900/95 text-white rounded-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl text-cyan-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Bộ Giả Lập IoT hardware (MQTT Gateway)
            </h3>
            <p className="text-xs text-slate-400">
              Mô phỏng tín hiệu phần cứng gửi về server PWA thời gian thực
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Chọn Thiết Bị IoT</label>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="w-full bg-slate-800/90 border border-cyan-500/30 rounded-xl p-2.5 text-sm text-cyan-300 focus:outline-none focus:border-cyan-400"
            >
              <option value="MINATEK_GW_001">MINATEK_GW_001 - Tủ Điện Trung Tâm 01</option>
              <option value="MINATEK_GW_002">MINATEK_GW_002 - Hệ Thống Chiếu Sáng KCN</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Sensor Telemetry */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" /> Cập Nhật Cảm Biến
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={sensorTemp}
                  onChange={(e) => setSensorTemp(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white text-center"
                />
                <span className="text-xs text-slate-400 font-bold">°C</span>
              </div>
              <button
                onClick={handleSimulateSensor}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Gửi Telemetry
              </button>
            </div>

            {/* Alarm Trigger */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Giả Lập Cảnh Báo
              </span>
              <button
                onClick={handleSimulateAlarm}
                className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  alarmActive
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20'
                }`}
              >
                <Zap className="w-4 h-4" />
                {alarmActive ? 'Tắt Cảnh Báo Khẩn' : 'Bật Cảnh Báo Sự Cố'}
              </button>
            </div>
          </div>

          {/* MQTT Disconnect LWT */}
          <button
            onClick={handleSimulateOffline}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-rose-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Giả lập MQTT LWT (Thiết bị ngắt kết nối đột ngột)
          </button>

          {/* Activity Log console */}
          <div className="p-3 bg-black/60 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
            <span className="text-slate-400 font-bold block mb-1">Nhật Ký Tín Hiệu Simulator:</span>
            {logMessage.length === 0 ? (
              <span className="text-slate-600 italic">Sẵn sàng truyền tín hiệu IoT...</span>
            ) : (
              logMessage.map((msg, idx) => (
                <p key={idx} className="text-cyan-300">
                  {msg}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
