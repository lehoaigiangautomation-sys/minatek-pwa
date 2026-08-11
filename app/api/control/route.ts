import { NextResponse } from 'next/server';
import {
  getMinatekTabs,
  toggleSwitchState,
  addTab,
  updateTab,
  deleteTab,
  addBigMonitor,
  deleteBigMonitor,
  addSmallMonitor,
  deleteSmallMonitor,
  addSwitch,
  deleteSwitch,
} from '@/lib/store';

export async function GET() {
  const tabs = getMinatekTabs();
  return NextResponse.json(tabs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, tabIndex, subIndex, name, bid } = body;

    let updatedTabs = getMinatekTabs();

    switch (action) {
      case 'toggle_switch':
        updatedTabs = toggleSwitchState(tabIndex, subIndex);
        break;
      case 'add_tab':
        updatedTabs = addTab(name || 'Tủ Điện Mới');
        break;
      case 'edit_tab':
        updatedTabs = updateTab(tabIndex, name);
        break;
      case 'delete_tab':
        updatedTabs = deleteTab(tabIndex);
        break;
      case 'add_big_monitor':
        updatedTabs = addBigMonitor(tabIndex, name || 'Thiết bị giám sát');
        break;
      case 'delete_big_monitor':
        updatedTabs = deleteBigMonitor(tabIndex, subIndex);
        break;
      case 'add_small_monitor':
        updatedTabs = addSmallMonitor(tabIndex, name || 'Cảm biến mới');
        break;
      case 'delete_small_monitor':
        updatedTabs = deleteSmallMonitor(tabIndex, subIndex);
        break;
      case 'add_switch':
        updatedTabs = addSwitch(tabIndex, name || 'Công tắc mới', bid);
        break;
      case 'delete_switch':
        updatedTabs = deleteSwitch(tabIndex, subIndex);
        break;
      default:
        break;
    }

    return NextResponse.json(updatedTabs);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi cập nhật trạng thái điều khiển' }, { status: 500 });
  }
}
