import { NextResponse } from 'next/server';

const mockDevices = [
  {
    id: 1,
    deviceId: 'MINATEK_GW_001',
    deviceName: 'Tủ Điện Trung Tâm 01',
    status: 'online',
    life: 99.8,
    ssid: 'Minatek_Factory_5G',
    txtype: 'wifi',
    groupId: 'kcn-01',
  },
  {
    id: 2,
    deviceId: 'MINATEK_GW_002',
    deviceName: 'Hệ Thống Chiếu Sáng KCN',
    status: 'online',
    life: 98.4,
    ssid: 'Minatek_Office',
    txtype: 'ethernet',
    groupId: 'kcn-01',
  },
];

export async function GET() {
  return NextResponse.json(mockDevices);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, message: 'Đã cập nhật cấu hình thiết bị', data: body });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi xử lý yêu cầu thiết bị' }, { status: 500 });
  }
}
