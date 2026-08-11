'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PwaInstaller from '@/components/PwaInstaller';
import IotSimulatorModal from '@/components/IotSimulatorModal';
import {
  TabEditModal,
  AddMonitorModal,
  AddSwitchModal,
  QrScannerModal,
} from '@/components/Modals';
import { TabData } from '@/lib/store';
import {
  Plus,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Radio,
  Cpu,
  Power,
  ShieldCheck,
} from 'lucide-react';

export default function HomePage() {
  const [tabsData, setTabsData] = useState<TabData[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isTabModalOpen, setIsTabModalOpen] = useState(false);
  const [isEditTab, setIsEditTab] = useState(false);
  const [isBigMonitorModalOpen, setIsBigMonitorModalOpen] = useState(false);
  const [isSmallMonitorModalOpen, setIsSmallMonitorModalOpen] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

  // Fetch initial control data from API
  const fetchControlData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/control');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTabsData(data);
      }
    } catch (error) {
      console.error('Failed fetching Minatek control data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchControlData();
  }, []);

  // Post control actions to serverless backend
  const sendControlAction = async (payload: any) => {
    try {
      const res = await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const updatedData = await res.json();
      if (Array.isArray(updatedData)) {
        setTabsData(updatedData);
      }
    } catch (error) {
      console.error('Action error:', error);
    }
  };

  // Toggle Switch state with optimistic UI
  const handleToggleSwitch = (subIndex: number) => {
    // Optimistic local update
    const copy = [...tabsData];
    if (copy[activeTabIndex]?.switches[subIndex]) {
      copy[activeTabIndex].switches[subIndex].state = !copy[activeTabIndex].switches[subIndex].state;
      setTabsData(copy);
    }
    sendControlAction({
      action: 'toggle_switch',
      tabIndex: activeTabIndex,
      subIndex,
    });
  };

  // IoT Simulator event handler
  const handleSimulateEvent = (eventType: string, payload: any) => {
    if (eventType === 'sensor_update') {
      const copy = [...tabsData];
      if (copy[activeTabIndex] && copy[activeTabIndex].bigMonitor[0]) {
        copy[activeTabIndex].bigMonitor[0].value = payload.value;
        copy[activeTabIndex].bigMonitor[0].state = true;
        setTabsData(copy);
      }
    } else if (eventType === 'alarm_trigger') {
      const copy = [...tabsData];
      if (copy[activeTabIndex]) {
        copy[activeTabIndex].state = !payload.active;
        setTabsData(copy);
      }
    } else if (eventType === 'lwt_disconnect') {
      const copy = [...tabsData];
      if (copy[activeTabIndex]) {
        copy[activeTabIndex].state = false;
        setTabsData(copy);
      }
    }
  };

  const currentTab = tabsData[activeTabIndex] || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28 pt-0 font-sans selection:bg-cyan-500">
      {/* PWA Installation Banner */}
      <PwaInstaller />

      {/* App Header */}
      <Header
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onOpenQrScanner={() => setIsQrScannerOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-4 pt-4 space-y-6">
        {/* Device / Zone Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tabsData.map((tab, idx) => {
            const isActive = idx === activeTabIndex;
            return (
              <button
                key={tab.id || idx}
                onClick={() => setActiveTabIndex(idx)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setActiveTabIndex(idx);
                  setIsEditTab(true);
                  setIsTabModalOpen(true);
                }}
                className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 border shadow-lg ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-cyan-500/30 scale-102'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    tab.state ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-500'
                  }`}
                />
                <span>{tab.devicesName}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              setIsEditTab(false);
              setIsTabModalOpen(true);
            }}
            className="p-2.5 bg-slate-900/90 border border-cyan-500/40 text-cyan-400 rounded-2xl hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex items-center gap-1 shadow-md"
            title="Thêm khu vực/tủ điện mới"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs font-bold pr-1">Thêm Tủ</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Cpu className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-cyan-300">Đang kết nối hệ thống Minatek PWA...</p>
          </div>
        ) : currentTab ? (
          <div className="space-y-6 animate-fade-in">
            {/* Section 1: GIÁM SÁT TRẠNG THÁI (Status Monitor Panel) */}
            <section className="glass-panel p-5 border border-cyan-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>Giám Sát Trạng Thái IoT</span>
                </h2>
                <span className="text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 px-2.5 py-1 rounded-full border border-cyan-400/30">
                  {currentTab.bigMonitor.length + currentTab.smallMonitor.length} Cảm biến
                </span>
              </div>

              {/* Big Monitor Cards Grid */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Thiết Bị Lớn (Big Monitor)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentTab.bigMonitor.map((item, subIdx) => (
                    <div
                      key={item.id || subIdx}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (confirm(`Xóa giám sát "${item.name}"?`)) {
                          sendControlAction({
                            action: 'delete_big_monitor',
                            tabIndex: activeTabIndex,
                            subIndex: subIdx,
                          });
                        }
                      }}
                      className="glass-panel p-4 border border-cyan-500/20 bg-slate-900/70 hover:border-cyan-400/50 transition-all flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3.5 h-3.5 rounded-full ${
                            item.state
                              ? 'bg-emerald-400 shadow-[0_0_12px_#34d399] pulse-indicator'
                              : 'bg-rose-500'
                          }`}
                        />
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xs text-cyan-400/90 font-medium">
                            {item.value || (item.state ? 'Hoạt động ổn định' : 'Tạm dừng')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => setIsBigMonitorModalOpen(true)}
                    className="p-4 rounded-2xl border border-dashed border-cyan-500/40 bg-slate-900/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 font-semibold text-xs min-h-[72px]"
                  >
                    <Plus className="w-4 h-4" /> Thêm Giám Sát Lớn
                  </button>
                </div>
              </div>

              {/* Small Monitor Cards Horizontal List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Cảm Biến Nhỏ (Small Monitor)
                </span>
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {currentTab.smallMonitor.map((item, subIdx) => (
                    <div
                      key={item.id || subIdx}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (confirm(`Xóa cảm biến "${item.name}"?`)) {
                          sendControlAction({
                            action: 'delete_small_monitor',
                            tabIndex: activeTabIndex,
                            subIndex: subIdx,
                          });
                        }
                      }}
                      className="px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-cyan-500/30 flex items-center gap-3 whitespace-nowrap shadow-md"
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.state ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-rose-500'
                        }`}
                      />
                      <span className="text-xs font-bold text-white">{item.name}</span>
                    </div>
                  ))}

                  <button
                    onClick={() => setIsSmallMonitorModalOpen(true)}
                    className="px-4 py-3 rounded-2xl border border-dashed border-cyan-500/40 bg-slate-900/40 text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-1.5 font-semibold text-xs whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" /> Thêm Cảm Biến Nhỏ
                  </button>
                </div>
              </div>
            </section>

            {/* Section 2: CÔNG TẮC ĐIỀU KHIỂN (Switches Control Board) */}
            <section className="glass-panel p-5 border border-cyan-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Công Tắc Điều Khiển Thời Gian Thực</span>
                </h2>
                <span className="text-[11px] font-semibold bg-amber-500/10 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
                  {currentTab.switches.filter((s) => s.state).length} / {currentTab.switches.length} Bật
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {currentTab.switches.map((item, subIdx) => {
                  const isOn = item.state;
                  return (
                    <button
                      key={item.id || subIdx}
                      onClick={() => handleToggleSwitch(subIdx)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        if (confirm(`Xóa công tắc "${item.name}"?`)) {
                          sendControlAction({
                            action: 'delete_switch',
                            tabIndex: activeTabIndex,
                            subIndex: subIdx,
                          });
                        }
                      }}
                      className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-300 active:scale-95 shadow-lg relative overflow-hidden group ${
                        isOn
                          ? 'bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-600 border-cyan-300 text-white shadow-cyan-500/40 ring-2 ring-cyan-400/50'
                          : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:border-cyan-500/40 hover:text-slate-200'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-full mb-2 transition-transform duration-300 group-hover:scale-110 ${
                          isOn ? 'bg-white/20 text-white shadow-inner' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        <Power className={`w-6 h-6 ${isOn ? 'animate-pulse' : ''}`} />
                      </div>
                      <span className="text-sm font-bold line-clamp-1">{item.name}</span>
                      <span className="text-[10px] font-mono mt-1 opacity-80">BID: #{item.bid}</span>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full mt-2 ${
                          isOn ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isOn ? 'BẬT (ON)' : 'TẮT (OFF)'}
                      </span>
                    </button>
                  );
                })}

                <button
                  onClick={() => setIsSwitchModalOpen(true)}
                  className="p-5 rounded-2xl border border-dashed border-amber-500/40 bg-slate-900/40 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 transition-all flex flex-col items-center justify-center gap-2 font-semibold text-xs min-h-[140px]"
                >
                  <Plus className="w-6 h-6" />
                  <span>Thêm Công Tắc</span>
                </button>
              </div>
            </section>

            {/* Section 3: TRẠNG THÁI HỆ THỐNG (System Status Footer Box) */}
            <section className="glass-panel p-5 border border-slate-800 bg-slate-900/60 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${
                    currentTab.state
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-emerald-500/30'
                      : 'bg-rose-600 shadow-rose-600/30'
                  }`}
                >
                  {currentTab.state ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : (
                    <AlertCircle className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{currentTab.devicesName}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30 font-mono">
                      ONLINE
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kết nối MQTT Broker: Stable | Đỗ trễ: 12ms | Độ tin cậy: 99.9%
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSimulatorOpen(true)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-2 transition-all"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Cấu Hình Tủ Điện</span>
              </button>
            </section>
          </div>
        ) : null}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onRefresh={fetchControlData}
      />

      {/* Modals */}
      <IotSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSimulateEvent={handleSimulateEvent}
      />

      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onScanned={(deviceId) => {
          alert(`Đã quét mã thành công! Đã kết nối tới thiết bị ID: ${deviceId}`);
        }}
      />

      <TabEditModal
        isOpen={isTabModalOpen}
        onClose={() => setIsTabModalOpen(false)}
        isEdit={isEditTab}
        initialName={isEditTab && currentTab ? currentTab.devicesName : ''}
        onSave={(name) => {
          if (isEditTab) {
            sendControlAction({
              action: 'edit_tab',
              tabIndex: activeTabIndex,
              name,
            });
          } else {
            sendControlAction({
              action: 'add_tab',
              name,
            });
          }
        }}
        onDelete={() => {
          sendControlAction({
            action: 'delete_tab',
            tabIndex: activeTabIndex,
          });
          setActiveTabIndex(0);
        }}
      />

      <AddMonitorModal
        isOpen={isBigMonitorModalOpen}
        onClose={() => setIsBigMonitorModalOpen(false)}
        title="Thêm Thiết Bị Giám Sát Lớn (Big Monitor)"
        onSave={(name) => {
          sendControlAction({
            action: 'add_big_monitor',
            tabIndex: activeTabIndex,
            name,
          });
        }}
      />

      <AddMonitorModal
        isOpen={isSmallMonitorModalOpen}
        onClose={() => setIsSmallMonitorModalOpen(false)}
        title="Thêm Cảm Biến Nhỏ (Small Monitor)"
        onSave={(name) => {
          sendControlAction({
            action: 'add_small_monitor',
            tabIndex: activeTabIndex,
            name,
          });
        }}
      />

      <AddSwitchModal
        isOpen={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
        onSave={(name, bid) => {
          sendControlAction({
            action: 'add_switch',
            tabIndex: activeTabIndex,
            name,
            bid,
          });
        }}
      />
    </div>
  );
}
