# Hướng Dẫn Triển Khai Minatek PWA Lên Vercel

Ứng dụng **Minatek Progressive Web App (PWA)** đã được cấu hình tối ưu để triển khai trực tiếp lên **Vercel** chỉ với 1 click hoặc qua Vercel CLI.

---

## 1. Cấu Trúc Dự Án PWA

- **Thư mục ứng dụng**: `Minatek-Handover/minatek-pwa`
- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS (Glassmorphism UI).
- **Tính năng PWA**:
  - Web App Manifest: `public/manifest.json` (Standalone app display, icons, cyan theme).
  - Service Worker: `public/sw.js` (Offline caching, static asset pre-caching, push notification listener).
  - Cài đặt App: Tự động hiện banner cài đặt PWA ("Thêm vào màn hình chính") trên Android, iOS Safari và Desktop.
- **Serverless API Routes**: Tích hợp các API backend trong `/app/api/` (`/api/auth/login`, `/api/control`, `/api/devices`, `/api/users`).

---

## 2. Cách 1: Triển Khai Bằng Vercel Dashboard (Khuyên Dùng - GUI)

1. **Đẩy mã nguồn lên Git** (GitHub, GitLab hoặc Bitbucket):
   - Đẩy thư mục `minatek-pwa` lên repository của bạn.

2. **Đăng nhập Vercel**:
   - Truy cập [https://vercel.com](https://vercel.com) và chọn **Add New Project**.

3. **Import Repository**:
   - Chọn repository `minatek-pwa`.
   - Vercel sẽ tự động phát hiện framework là **Next.js**.

4. **Cấu Hình Môi Trường (Optional - Nếu dùng Database Cloud)**:
   Thêm các biến môi trường trong phần **Environment Variables** nếu muốn kết nối PostgreSQL Cloud (Neon / Supabase):
   ```env
   POSTGRES_HOST=ep-xxxx.neon.tech
   POSTGRES_DB=minatek_db
   POSTGRES_USER=minatek_user
   POSTGRES_PASSWORD=your_password
   JWT_ACCESS_KEY=minatek_secret_key_2026
   ```

5. **Bấm Deploy**:
   - Vercel sẽ tự động build và cấp phát domain HTTPS miễn phí (ví dụ: `minatek-pwa.vercel.app`).

---

## 3. Cách 2: Triển Khai Bằng Vercel CLI (Command Line)

Cài đặt Vercel CLI và chạy lệnh deploy trực tiếp từ terminal:

```bash
# Cài đặt Vercel CLI
npm install -g vercel

# Di chuyển vào thư mục ứng dụng minatek-pwa
cd minatek-pwa

# Đăng nhập Vercel (chỉ làm lần đầu)
vercel login

# Triển khai bản xem trước (Preview)
vercel

# Triển khai bản chính thức (Production)
vercel --prod
```

---

## 4. Kiểm Tra Tính Năng PWA Sau Khi Deploy

1. **Truy cập đường dẫn HTTPS của Vercel** từ điện thoại iOS (Safari) hoặc Android (Chrome).
2. **Cài đặt App**:
   - **Android / Chrome**: Nhấn nút **"Cài đặt"** trên banner Minatek xuất hiện ở đầu trang.
   - **iOS Safari**: Nhấn biểu tượng **Chia sẻ (Share)** -> Chọn **"Thêm vào Màn hình chính" (Add to Home Screen)**.
3. **Chạy ngoại tuyến (Offline)**: Tắt Wifi/4G, mở app Minatek trên màn hình chính – PWA vẫn khởi động mượt mà nhờ Service Worker.
4. **Giả lập dữ liệu IoT**: Nhấn nút **"Giả Lập IoT"** trên thanh tiêu đề để mô phỏng tín hiệu cảm biến thời gian thực.
