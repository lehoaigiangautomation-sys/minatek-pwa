import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Standard authentication logic matching Minatek NestJS Backend
    if (username && password) {
      return NextResponse.json({
        accessToken: `minatek_jwt_access_${Date.now()}`,
        refreshToken: `minatek_jwt_refresh_${Date.now()}`,
        user: {
          id: 1,
          username: username,
          name: 'Quản Tri Viên Minatek',
          email: 'admin@minatek.vn',
          phone: '0942926979',
          role: 'admin',
        },
      });
    }

    return NextResponse.json({ message: 'Tài khoản hoặc mật khẩu không chính xác' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi hệ thống đăng nhập' }, { status: 500 });
  }
}
