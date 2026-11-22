# AI_LOG.md: Nhật ký sử dụng AI

1.Tạo dữ liệu mẫu cho `db.json`
   - Câu hỏi: "Tạo 12 dữ liệu JSON mẫu cho chức năng quản lý sự kiện câu lạc bộ, bao gồm các trường: id, name, date, startTime, endTime, mode, location, link, capacity"
   - Tóm tắt trả lời: AI sinh mảng 12 sự kiện đủ các trường, có cả trực tiếp (`offline`) và trực tuyến (`online`), có sự kiện đã diễn ra và sắp diễn ra.
   - Điều rút ra / đã sửa: thay dữ liệu ảo bằng sự kiện của Đại học FPT Hà Nội; tự thêm `endDate` và `eventUrl`; cho phép `startTime`, `endTime`, `capacity` là `null`; phát hiện dữ liệu chưa khớp form (sự kiện `online` thiếu `link`, một sự kiện `mode: "hybrid"` trong khi form chỉ hỗ trợ `offline` / `online`).

2.Thêm Tailwind CSS cho trang tạo sự kiện
   - Câu hỏi: Gợi ý thêm các  Tailwind CSS vào cho đẹp với tông màu chủ đạo "
   - Tóm tắt trả lời: AI bọc `EventForm` trong layout có nền, card bo góc, tiêu đề, nút quay lại; hướng dẫn cài `tailwindcss` + `@tailwindcss/vite` cho Tailwind v4.
   - Điều rút ra: trang tạo chỉ là lớp bọc ngoài, các ô nhập và nút nằm trong `EventForm` nên phải style ở component đó; Tailwind v4 cấu hình qua plugin Vite và `@import "tailwindcss"` thay vì `tailwind.config.js`.

3.Cảnh báo tên class của Tailwind v4
   - Câu hỏi: dán các cảnh báo IntelliSense (`bg-gradient-to-br` → `bg-linear-to-br`, `break-words` → `wrap-break-word`, `rounded-[2rem]` → `rounded-4xl`, `has-[:checked]` → `has-checked`).
   - Tóm tắt trả lời: đây chỉ là gợi ý (hint), không phải lỗi; Tailwind v4 đổi tên một số class, class cũ vẫn chạy nhờ tương thích ngược.
   - Điều rút ra / đã sửa: phân biệt được lỗi (error) với gợi ý (hint); đã đổi sang tên mới ở `Header.tsx`, `EventListPage.tsx`, `EventDetailPage.tsx`, `EventForm.tsx`, giao diện không đổi.

4.Cảnh báo `Unknown at rule @theme` / `@apply`**
   - Câu hỏi: dán cảnh báo `unknownAtRules` của `index.css`.
   - Tóm tắt trả lời: trình kiểm tra CSS mặc định của VS Code không biết at-rule của Tailwind; xử lý bằng `.vscode/settings.json` với `"css.lint.unknownAtRules": "ignore"`.
   - Điều rút ra / đã sửa: cảnh báo này không ảnh hưởng build; đã tạo `.vscode/settings.json` và reload VS Code.

5.Gợi ý lại css lại `index.css` cho Tailwind v4
   - Câu hỏi: dán `index.css` cũ (dùng `@apply bg-canvas text-ink`) và nhờ xem lại.
   - Tóm tắt trả lời: AI viết lại với `@import "tailwindcss"`, khai báo màu và font trong `@theme`, bọc style nền trong `@layer base`, bỏ các dòng trùng với Preflight.
   - Điều rút ra / đã sửa: `@theme` là nơi khai báo màu tùy chỉnh để dùng được `bg-canvas`, `text-ink` trong cả `@apply` lẫn JSX; style trong `@layer base` thì utility trong JSX luôn thắng; AI đoán sai một số mã màu vì không thấy file gốc, tôi đối chiếu và dùng lại đúng bộ màu của dự án.

6.Đổi màu giao diện trong `@theme`
   - Câu hỏi: dán `index.css` có bộ màu navy + coral và nhờ tối ưu lại.
   - Tóm tắt trả lời: `--color-sea*` và hai biến font bị khai báo hai lần; CSS lấy giá trị cuối nên màu `sea` thực tế là xanh lá `#21af33`, không phải navy như comment ghi.
   - Điều rút ra / đã sửa: khai báo trùng làm giá trị sau ghi đè giá trị trước mà không báo lỗi; đã gộp thành một lần khai báo và chọn rõ màu chính.

7.Thêm sự kiện đang diễn ra và sắp diễn ra
   - Câu hỏi: dán `db.json` và yêu cầu "cho thêm các sự kiện đang diễn ra và sắp diễn ra".
   - Tóm tắt trả lời: AI thêm 9 sự kiện (`EV013` đến `EV021`): 3 đang diễn ra quanh ngày 22/11/2026 và 6 sắp diễn ra.
   - Điều rút ra / đã sửa: sự kiện nhiều ngày phải so sánh theo `endDate ?? date` mới xếp đúng nhóm; dữ liệu "đang diễn ra" chỉ đúng vào một ngày cụ thể nên phải chỉnh `date` khi quay video hoặc nộp bài; link họp trực tuyến là link giả, chỉ để demo.

8.Hướng dẫn chụp ảnh màn hình và quay video
   - Câu hỏi: hướng dẫn chụp ảnh trang danh sách, form lỗi validate, giao diện điện thoại; kịch bản video giới thiệu.
   - Tóm tắt trả lời: AI hướng dẫn dùng DevTools (`Ctrl+Shift+P` → Capture screenshot, `Ctrl+Shift+M` chế độ thiết bị), đưa kịch bản video và cách tạo từng trạng thái: giới hạn mạng cho trạng thái đang tải, dừng `npm run api` cho lỗi kết nối, gõ chuỗi vô nghĩa vào ô tìm kiếm cho danh sách trống, gõ đường dẫn sai cho trang 404.
   - Điều rút ra: một ảnh form có nhiều lỗi cùng lúc là đủ; mỗi trạng thái lỗi minh họa một tình huống khác nhau (trang không tồn tại, dữ liệu không tồn tại, mất kết nối API).
