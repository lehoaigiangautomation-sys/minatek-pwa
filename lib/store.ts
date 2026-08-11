export interface BigMonitorItem {
  id: string;
  name: string;
  state: boolean;
  type?: string;
  value?: string | number;
}

export interface SmallMonitorItem {
  id: string;
  name: string;
  state: boolean;
  type?: string;
}

export interface SwitchItem {
  id: string;
  bid: number;
  name: string;
  state: boolean;
  type: string; // 'button' | 'output' | 'sensor'
}

export interface TabData {
  id: string;
  devicesName: string;
  state: boolean;
  bigMonitor: BigMonitorItem[];
  smallMonitor: SmallMonitorItem[];
  switches: SwitchItem[];
}

export interface DeviceData {
  id: number;
  deviceId: string;
  deviceName: string;
  status: string;
  life: number;
  ssid?: string;
  txtype?: string;
  groupId?: string;
}

// Initial Default Seed Data for Minatek Smart IoT
const defaultTabs: TabData[] = [
  {
    id: 'tab-1',
    devicesName: 'Tủ Điện Trung Tâm 01',
    state: true,
    bigMonitor: [
      { id: 'bm-1', name: 'Bơm Nước Chính', state: true, value: 'Chạy ổn định' },
      { id: 'bm-2', name: 'Quạt Thông Gió', state: true, value: 'Tốc độ 85%' },
      { id: 'bm-3', name: 'Hệ Thống Làm Lạnh', state: false, value: 'Tạm dừng' },
    ],
    smallMonitor: [
      { id: 'sm-1', name: 'Cảm Biến Nhiệt', state: true, type: 'sensor' },
      { id: 'sm-2', name: 'Cảm Biến Áp Suất', state: true, type: 'sensor' },
      { id: 'sm-3', name: 'Cảnh Báo Quá Tải', state: false, type: 'alarm' },
      { id: 'sm-4', name: 'Rò Rỉ Điện', state: false, type: 'alarm' },
    ],
    switches: [
      { id: 'sw-1', bid: 1, name: 'Đèn Chiếu Sáng', state: true, type: 'output' },
      { id: 'sw-2', bid: 2, name: 'Bơm Phụ 01', state: false, type: 'output' },
      { id: 'sw-3', bid: 3, name: 'Van Khẩn Cấp', state: true, type: 'output' },
      { id: 'sw-4', bid: 4, name: 'Quạt Hút Mùi', state: false, type: 'output' },
    ],
  },
  {
    id: 'tab-2',
    devicesName: 'Hệ Thống Chiếu Sáng KCN',
    state: true,
    bigMonitor: [
      { id: 'bm-201', name: 'Máy Phát Điện Dự Phòng', state: true, value: 'Đang chờ' },
      { id: 'bm-202', name: 'Tủ Động Lực A', state: true, value: '220V - 15A' },
    ],
    smallMonitor: [
      { id: 'sm-201', name: 'Cảm Biến Khói', state: true, type: 'sensor' },
      { id: 'sm-202', name: 'Cửa Tự Động', state: true, type: 'sensor' },
    ],
    switches: [
      { id: 'sw-201', bid: 1, name: 'Đèn Xưởng 01', state: true, type: 'output' },
      { id: 'sw-202', bid: 2, name: 'Đèn Xưởng 02', state: true, type: 'output' },
      { id: 'sw-203', bid: 3, name: 'Đèn Cảnh Báo', state: false, type: 'output' },
    ],
  },
];

let globalTabs = [...defaultTabs];

export const getMinatekTabs = (): TabData[] => {
  return globalTabs;
};

export const setMinatekTabs = (tabs: TabData[]) => {
  globalTabs = tabs;
  return globalTabs;
};

export const toggleSwitchState = (tabIndex: number, switchIndex: number): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].switches[switchIndex]) {
    globalTabs[tabIndex].switches[switchIndex].state = !globalTabs[tabIndex].switches[switchIndex].state;
  }
  return [...globalTabs];
};

export const addTab = (name: string): TabData[] => {
  const newTab: TabData = {
    id: `tab-${Date.now()}`,
    devicesName: name,
    state: true,
    bigMonitor: [],
    smallMonitor: [],
    switches: [],
  };
  globalTabs.push(newTab);
  return [...globalTabs];
};

export const updateTab = (index: number, name: string): TabData[] => {
  if (globalTabs[index]) {
    globalTabs[index].devicesName = name;
  }
  return [...globalTabs];
};

export const deleteTab = (index: number): TabData[] => {
  if (globalTabs[index]) {
    globalTabs.splice(index, 1);
  }
  return [...globalTabs];
};

export const addBigMonitor = (tabIndex: number, name: string): TabData[] => {
  if (globalTabs[tabIndex]) {
    globalTabs[tabIndex].bigMonitor.push({
      id: `bm-${Date.now()}`,
      name,
      state: true,
      value: 'Hoạt động',
    });
  }
  return [...globalTabs];
};

export const deleteBigMonitor = (tabIndex: number, monitorIndex: number): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].bigMonitor[monitorIndex]) {
    globalTabs[tabIndex].bigMonitor.splice(monitorIndex, 1);
  }
  return [...globalTabs];
};

export const addSmallMonitor = (tabIndex: number, name: string): TabData[] => {
  if (globalTabs[tabIndex]) {
    globalTabs[tabIndex].smallMonitor.push({
      id: `sm-${Date.now()}`,
      name,
      state: true,
      type: 'sensor',
    });
  }
  return [...globalTabs];
};

export const deleteSmallMonitor = (tabIndex: number, monitorIndex: number): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].smallMonitor[monitorIndex]) {
    globalTabs[tabIndex].smallMonitor.splice(monitorIndex, 1);
  }
  return [...globalTabs];
};

export const addSwitch = (tabIndex: number, name: string, bid?: number): TabData[] => {
  if (globalTabs[tabIndex]) {
    const nextBid = bid || globalTabs[tabIndex].switches.length + 1;
    globalTabs[tabIndex].switches.push({
      id: `sw-${Date.now()}`,
      bid: nextBid,
      name,
      state: false,
      type: 'output',
    });
  }
  return [...globalTabs];
};

export const deleteSwitch = (tabIndex: number, switchIndex: number): TabData[] => {
  if (globalTabs[tabIndex] && globalTabs[tabIndex].switches[switchIndex]) {
    globalTabs[tabIndex].switches.splice(switchIndex, 1);
  }
  return [...globalTabs];
};
