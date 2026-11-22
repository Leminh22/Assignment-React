# Bài làm : Assignment-React | Họ và tên : Lê Hồng Minh

# ClubEvents: Quản lý sự kiện câu lạc bộ

Ứng dụng CRUD bằng React + TypeScript để quản lý lịch sự kiện của câu lạc bộ. Dữ liệu được lưu qua json-server trong `server/db.json`, nên không cần cài database.

##  Video giới thiệu

Xem video demo toàn bộ chức năng tại đây: **[Google Drive: Video giới thiệu ClubEvents](https://drive.google.com/file/d/1dFweSZBY1v6Q0uBVqO8kfzaeQhct-YVg/view?usp=drive_link)**

## Ảnh chụp màn hình

### Trang danh sách sự kiện
Trang danh sách (docs/screenshots/danh-sach.png)
### Form có lỗi validate
Form báo lỗi (docs/screenshots/form-loi-validate.png)
### Giao diện trên điện thoại
Giao diện mobile (docs/screenshots/mobile.png)

### Dự án có gì?

**Chức năng**

- **Danh sách:** xem toàn bộ sự kiện, chia nhóm *Sắp diễn ra* / *Đã diễn ra*, tìm theo tên.
- **Chi tiết:** xem đầy đủ thông tin một sự kiện (ngày, giờ, hình thức, địa điểm hoặc đường dẫn, số chỗ).
- **Thêm / Sửa:** dùng chung một form, kiểm tra dữ liệu khi rời ô nhập và khi gửi. Hình thức *Trực tiếp* yêu cầu địa điểm, *Trực tuyến* yêu cầu đường dẫn tham gia.
- **Xóa:** có hộp thoại xác nhận trước khi xóa.
- **Thông báo:** hiện Toast khi thêm, sửa, xóa thành công.
- **Các trạng thái giao diện:** đang tải, lỗi API (có nút *Thử lại*), danh sách trống, không tìm thấy kết quả, lỗi khi lưu, trang 404.
- **Responsive:** hiển thị tốt trên máy tính, tablet và điện thoại.

**Các trang**

| Đường dẫn | Trang |
|---|---|
| `/su-kien` | Danh sách sự kiện |
| `/su-kien/them` | Tạo sự kiện mới |
| `/su-kien/:id` | Chi tiết sự kiện |
| `/su-kien/:id/sua` | Chỉnh sửa sự kiện |
| Đường dẫn khác | Trang 404 |

**Dữ liệu mẫu:** 21 sự kiện trong `server/db.json`, gồm sự kiện trực tiếp và trực tuyến, đã diễn ra, đang diễn ra và sắp diễn ra.

**Công nghệ:** React, TypeScript, Vite, React Router, Axios, Tailwind CSS v4, json-server.

## Cần có gì để chạy?


| Yêu cầu | Chi tiết |
|---|---|
| **Node.js** | Phiên bản 20.19 trở lên (hoặc 22.12+), vì Vite yêu cầu. Kiểm tra bằng `node -v` |
| **npm** | Đi kèm Node.js. Kiểm tra bằng `npm -v` |
| **Trình duyệt** | Chrome, Edge, Firefox bản mới |
| **Cổng trống** | `3000` (API) và `5173` (web). Nếu bị chiếm, đóng chương trình đang dùng cổng đó |
| **Kết nối mạng** | Chỉ cần lúc `npm install` và khi tải font Google Fonts (DM Sans, Manrope) |

Không cần cài database, không cần cấu hình biến môi trường.

##  Cài đặt và chạy

**Bước 1:** tải mã nguồn và cài thư viện



cd club-events
npm install


**Bước 2:** mở **hai terminal** cùng ở thư mục dự án, chạy song song:

```
# Terminal 1: chạy API (json-server)
npm run api
```
```
# Terminal 2: chạy giao diện web (Vite)
npm run dev
```
**Bước 3:** mở trình duyệt vào địa chỉ Vite in ra ở Terminal 2 (`http://localhost:5173`).


`npm run api`  Chạy json-server, phục vụ dữ liệu từ `server/db.json`  `http://localhost:3000/events`
`npm run dev`  Chạy giao diện web ở chế độ phát triển `http://localhost:5173`

> Phải chạy **cả hai lệnh**. Nếu chỉ chạy `npm run dev` hoặc dừng API, giao diện sẽ hiện trạng thái lỗi kết nối.

##  Cấu trúc code

```
club-events/
├── server/db.json        # Dữ liệu json-server
├── docs/screenshots/     # Ảnh chụp màn hình cho README
└── src/
    ├── components/       # Header, EventForm, TextField, thẻ sự kiện, Toast, Loading, ErrorMessage, EmptyState, hộp thoại xác nhận
    ├── layouts/          # Layout dùng chung
    ├── pages/            # EventListPage, EventDetailPage, EventCreatePage, trang sửa, 404
    ├── services/         # Axios instance và các thao tác API (eventService)
    ├── utils/            # Validate (validateEvent) và xử lý ngày
    ├── types/            # Kiểu sự kiện và lỗi form
    └── index.css         # Tailwind v4: bảng màu (@theme), font, style nền
```

**Ghi chú về cách tổ chức:**

- `EventForm` là một form dùng chung cho cả trang tạo và trang sửa, nhận `initialValues` và `onSubmit` từ trang cha.
- Mọi lệnh gọi API nằm trong `services/`, các trang không gọi axios trực tiếp.
- Logic kiểm tra dữ liệu tách riêng trong `utils/`, tách khỏi giao diện.
