# Admin Dashboard - Interview Project

Dự án này được xây dựng cho bài test phỏng vấn, tạo một giao diện admin dashboard đơn giản với 2 trang chính: Dashboard và Settings.

## Công nghệ sử dụng

- **Next.js 15.3.2** - Framework React hiện đại
- **React 19.0.0** - Thư viện UI
- **Tailwind CSS** - Framework CSS tiện ích
- **shadcn/ui** - Components UI đẹp và dễ tùy biến
- **React Hook Form + Zod** - Xử lý form và validation
- **Zustand** - Quản lý state

## Tính năng

### Trang Dashboard:
- Stats Cards hiển thị số liệu thống kê
- Danh sách Pending Suppliers với nút Approve
- Danh sách Pending Events với nút Approve/Reject
- Danh sách Reported Posts với nút View chi tiết
- Dialog/Modal khi click vào các nút hành động

### Trang Settings:
- Form với các trường: Name, Email, Password
- Validation sử dụng React Hook Form + Zod
- Lưu trạng thái form với Zustand

### Các tính năng chung:
- Chế độ Dark Mode / Light Mode
- Responsive design (di động và desktop)
- Sidebar navigation có thể thu gọn trên mobile

## Cách chạy dự án

```bash
# Cài đặt các dependencies
npm install

# Chạy môi trường development
npm run dev

# Truy cập http://localhost:3000
```

## Thiết kế và Kiến trúc

- **Component-based Architecture**: Tất cả UI được chia thành các component nhỏ, có thể tái sử dụng
- **Separation of Concerns**: Các components UI chung được tách riêng khỏi components cụ thể của business
- **State Management**: Zustand được sử dụng để quản lý state giữa các trang
- **Responsive Design**: Tailwind CSS giúp tạo giao diện chạy tốt trên mọi kích thước màn hình

## Các nâng cấp có thể thực hiện

- Thêm tính năng authentication
- Tích hợp API để lấy dữ liệu thực tế
- Thêm nhiều trang admin khác như quản lý người dùng, phân tích, v.v.
- Tích hợp testing cho các component
- Tối ưu hiệu suất với Server Components của Next.js
