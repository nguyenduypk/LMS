# Hướng dẫn sử dụng tính năng liên kết từ TeacherClass đến các trang con

## Tổng quan

Tính năng này cho phép giáo viên điều hướng từ trang quản lý học liệu (`TeacherClass.js`) đến các trang con của lớp học trong thư mục `Class`.

## Cách sử dụng

### 1. Điều hướng đến lớp học

Khi bạn đang ở trang quản lý học liệu (`/teacher/resources`):

1. **Double-click vào folder (lớp học)** để mở lớp học
2. Hoặc **click vào menu "⋯"** và chọn "Mở lớp học"

### 2. Các trang con có sẵn

Sau khi vào lớp học, bạn có thể truy cập các trang con sau:

- **Bảng tin** (`/teacher/class/:id/announcements`) - Quản lý thông báo
- **Lịch học** (`/teacher/class/:id/schedule`) - Xem và quản lý lịch học
- **Thành viên** (`/teacher/class/:id/members`) - Quản lý thành viên lớp
- **Bài tập** (`/teacher/class/:id/assignments`) - Quản lý bài tập
- **Bảng điểm** (`/teacher/class/:id/grades`) - Xem bảng điểm
- **Tài liệu** (`/teacher/class/:id/documents`) - Quản lý tài liệu

### 3. Các trang phụ trợ

- **Tạo bài tập** (`/teacher/class/:id/assignments/create`)
- **Upload bài tập** (`/teacher/class/:id/assignments/upload`)
- **Chi tiết thành viên** (`/teacher/class/:id/members/:memberId`)
- **Xem tài liệu** (`/teacher/class/:id/documents/:docId`)

## Cấu trúc dữ liệu

### Dữ liệu mẫu

Hệ thống đã được cấu hình với dữ liệu mẫu bao gồm:

- **Khối 6-12**: Các khối học phổ thông
- **Khối Cao đẳng, Đại học**: Các khối học cao hơn
- **Môn học**: Toán, Văn, Lý, Hóa, Sinh, Địa, v.v.
- **Chương**: Các chương học cụ thể
- **Lớp học**: Các lớp học với tên cụ thể

### Ví dụ cấu trúc

```
Khối 10
├── Địa lý
│   ├── Bản đồ
│   │   ├── Lớp 6A1 - Toán cơ bản
│   │   └── Lớp 6A2 - Văn học cơ bản
│   └── Cấu trúc của Trái Đất
│       ├── Lớp 7B1 - Khoa học tự nhiên
│       └── Lớp 7B2 - Khoa học xã hội
├── Toán học
│   ├── Đại số
│   │   ├── Lớp 10A5 - Toán đại số
│   │   └── Lớp 10A6 - Toán hình học
│   └── Hình học
│       ├── Lớp 10A7 - Hình học phẳng
│       └── Lớp 10A8 - Hình học không gian
└── Văn học
    ├── Văn học Việt Nam
    │   ├── Lớp 10A9 - Văn học trung đại
    │   └── Lớp 10A10 - Văn học hiện đại
    └── Văn học nước ngoài
        ├── Lớp 10A11 - Văn học phương Tây
        └── Lớp 10A12 - Văn học phương Đông
```

## Tính năng

### 1. Tìm kiếm
- Sử dụng ô tìm kiếm để tìm nhanh các khối, môn, chương hoặc lớp học

### 2. Tạo mới
- Click vào card "Tạo mới" để thêm khối, môn, chương hoặc thư mục mới
- Hệ thống sẽ gợi ý các tên phổ biến

### 3. Quản lý
- Click vào menu "⋯" để xóa các mục không cần thiết
- Double-click để mở lớp học

### 4. Điều hướng
- Sử dụng breadcrumb để quay lại các cấp cao hơn
- Click vào "Học liệu" để về trang chính

## Lưu ý

1. **ID lớp học**: Hệ thống tự động tạo ID từ tên lớp học (ví dụ: "Lớp 10A1 - Toán học" → "lớp-10a1---toán-học")

2. **Responsive**: Giao diện được thiết kế responsive, hoạt động tốt trên cả desktop và mobile

3. **Performance**: Dữ liệu được load theo cấu trúc phân cấp, không load tất cả cùng lúc

4. **Security**: Các route được bảo vệ và chỉ cho phép giáo viên truy cập

## Troubleshooting

### Lỗi thường gặp

1. **Không thể mở lớp học**
   - Kiểm tra xem đã double-click đúng folder chưa
   - Đảm bảo folder có chứa tên lớp học

2. **Trang con không hiển thị**
   - Kiểm tra console để xem có lỗi JavaScript không
   - Đảm bảo đã import đúng các component

3. **CSS không load**
   - Kiểm tra đường dẫn import CSS
   - Đảm bảo file CSS đã được tạo trong thư mục `src/styles/`

### Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra console browser
2. Kiểm tra network tab
3. Liên hệ team phát triển 