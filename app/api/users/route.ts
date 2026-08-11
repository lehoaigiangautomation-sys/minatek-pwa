import { NextResponse } from 'next/server';

let mockUser = {
  id: 1,
  username: 'minatek_admin',
  name: 'Quản Trị Viên Minatek',
  email: 'admin@minatek.vn',
  phone: '0942926979',
  role: 'admin',
};

export async function GET() {
  return NextResponse.json(mockUser);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    mockUser = { ...mockUser, ...body };
    return NextResponse.json(mockUser);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi cập nhật người dùng' }, { status: 500 });
  }
}
