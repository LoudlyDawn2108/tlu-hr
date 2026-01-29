# Tài liệu Yêu cầu Người dùng (MVP)
## Hệ thống Quản lý Nhân sự - Trường Đại học Thủy lợi

> **Phiên bản:** MVP - Phase 1  
> **Thời gian triển khai:** 2 tháng  
> **Nhóm thực hiện:** 14 người (5 Teams)

---

## 1. Các nhân tố tham gia (Stakeholders)

### 1.1. Người dùng hệ thống

| Vai trò | Đơn vị | Mô tả |
|---------|--------|-------|
| Quản trị hệ thống | Phòng CNTT | Quản trị, phân quyền |
| Cán bộ TCCB | Phòng TCCB | Quản lý hồ sơ nhân sự |
| Cán bộ TCKT | Phòng TCKT | Quản lý lương, phụ cấp |
| Lãnh đạo | Ban Giám hiệu | Phê duyệt, báo cáo |
| Trưởng đơn vị | Khoa/Phòng | Quản lý nhân sự đơn vị |
| CBGV/NV | Toàn trường | Tra cứu, cập nhật thông tin |

### 1.2. Các bên liên quan khác

- Bộ Nông nghiệp và Môi trường
- Bộ Giáo dục và Đào tạo
- Cơ quan Bảo hiểm xã hội
- Cơ quan Thuế

---

## 2. Yêu cầu của Stakeholders

### 2.1. Quản lý Hồ sơ Nhân sự ⭐⭐⭐

**Mô tả:** Quản lý toàn diện thông tin của tất cả cán bộ, giảng viên, nhân viên trong trường.

**Yêu cầu chi tiết:**

| STT | Yêu cầu | Mức độ |
|-----|---------|--------|
| 1 | Tạo lập hồ sơ cá nhân | Bắt buộc |
| 2 | Lưu trữ thông tin cá nhân: họ tên, ngày sinh, giới tính, CCCD/CMT, nơi sinh, quê quán, dân tộc, tôn giáo | Bắt buộc |
| 3 | Lưu trữ thông tin liên hệ: địa chỉ thường trú, tạm trú, SĐT, email cá nhân, email công việc | Bắt buộc |
| 4 | Lưu trữ thông tin gia đình: hôn nhân, vợ/chồng, con cái, người phụ thuộc | Bắt buộc |
| 5 | Quản lý ảnh chân dung (3x4, 4x6) | Bắt buộc |
| 6 | Lưu trữ thông tin ngân hàng: tên NH, số tài khoản, chi nhánh | Bắt buộc |
| 7 | Lưu trữ quá trình công tác trước khi vào trường | Bắt buộc |
| 8 | Lưu trữ thông tin Đảng viên: ngày vào Đảng, ngày chính thức, đảng bộ | Bắt buộc |
| 9 | Lưu trữ thông tin đoàn viên công đoàn | Bắt buộc |
| 10 | Mã cán bộ được tạo tự động | Bắt buộc |
| 11 | Tìm kiếm, lọc hồ sơ theo nhiều tiêu chí | Bắt buộc |
| 12 | Xuất hồ sơ ra file PDF, Excel, Word theo mẫu | Bắt buộc |
| 13 | Hiển thị thông tin dạng học hàm, học vị (VD: PGS.TS. Nguyễn Văn A) | Bắt buộc |

---

### 2.2. Quản lý Trình độ Học vấn, Chức danh ⭐⭐⭐

| STT | Yêu cầu | Mức độ |
|-----|---------|--------|
| 1 | Lưu trữ chi tiết bằng cấp: tên bằng, chuyên ngành, trường cấp, năm tốt nghiệp, xếp loại | Bắt buộc |
| 2 | Lưu các chức danh khoa học | Bắt buộc |
| 3 | Lưu thông tin chức danh, ngạch viên chức | Bắt buộc |
| 4 | Lưu thông tin chức vụ + quá trình bổ nhiệm, miễn nhiệm | Bắt buộc |
| 5 | Lưu các chứng chỉ + ngày hết hạn | Bắt buộc |

---

### 2.3. Quản lý Cơ cấu Tổ chức ⭐⭐⭐

| STT | Yêu cầu | Mức độ |
|-----|---------|--------|
| 1 | Cơ cấu tổ chức phân cấp theo quan hệ cha-con (Trường → Khoa → Bộ môn) | Bắt buộc |
| 2 | Phân bổ nhân sự, chuyển công tác vào các đơn vị | Bắt buộc |
| 3 | Một người có thể kiêm nhiệm nhiều chức vụ ở nhiều đơn vị | Bắt buộc |
| 4 | Lưu lịch sử thành lập, sáp nhập, giải thể đơn vị | Bắt buộc |
| 5 | Đánh dấu trạng thái tồn tại/giải thể | Bắt buộc |

---

### 2.4. Quản lý Hợp đồng Lao động ⭐⭐⭐

| STT | Yêu cầu | Mức độ |
|-----|---------|--------|
| 1 | Tạo lập 4 loại HĐ: không xác định thời hạn, xác định thời hạn, thử việc, thỉnh giảng | Bắt buộc |
| 2 | Lưu thông tin HĐ: số HĐ, ngày ký, ngày hiệu lực, ngày hết hạn, nội dung công việc, phụ lục | Bắt buộc |
| 3 | HĐ thỉnh giảng cho phép gia hạn và cảnh báo hết hạn | Bắt buộc |
| 4 | HĐ thử việc có thời gian theo bậc/ngạch | Bắt buộc |
| 5 | In hợp đồng theo chuẩn mẫu | Bắt buộc |
| 6 | Chuyển đổi HĐ theo quy tắc (thử việc → chính thức, có thời hạn → vô thời hạn) | Bắt buộc |
| 7 | Tạo hồ sơ nhân sự từ HĐ đã ký | Bắt buộc |

---

### 2.5. Quản lý Bậc lương ⭐⭐ (Đơn giản hóa)

| STT | Yêu cầu | Mức độ |
|-----|---------|--------|
| 1 | Lưu hệ số lương và mức lương cơ sở theo ngạch/bậc | Bắt buộc |
| 2 | Lưu các loại phụ cấp (chức vụ, thâm niên, ưu đãi ngành, trách nhiệm, độc hại, khu vực) | Bắt buộc |
| 3 | Bảng hệ số lương theo ngạch/bậc (VD: Giảng viên 9 bậc, hệ số 2.34-4.98) | Bắt buộc |
| 4 | Hệ số phụ cấp chức vụ theo từng vị trí | Bắt buộc |

> **Lưu ý MVP:** Chỉ lưu trữ thông tin lương, KHÔNG tính lương tự động trong Phase 1.

---

### 2.6. Báo cáo Thống kê ⭐ (Cơ bản)

| STT | Yêu cầu | Mức độ |
|-----|---------|--------|
| 1 | Thống kê nhân sự theo toàn trường, theo đơn vị (dạng bảng) | Bắt buộc |
| 2 | Xuất thống kê ra PDF, Excel | Bắt buộc |

---

### 2.7. Self-Service Portal ⭐ (Cơ bản)

| STT | Yêu cầu | Mức độ |
|-----|---------|--------|
| 1 | Xem thông tin cá nhân | Bắt buộc |
| 2 | Xem lịch sử hợp đồng | Bắt buộc |
| 3 | Xem thông tin chức vụ, học vấn, bậc lương | Bắt buộc |

---

## 3. Yêu cầu Chung

| STT | Yêu cầu | Mức độ |
|-----|---------|--------|
| 1 | Kiểm tra tính hợp lệ dữ liệu trước khi lưu | Bắt buộc |
| 2 | Mỗi danh mục hỗ trợ: thêm/sửa, đánh dấu active/inactive, sắp xếp thứ tự | Bắt buộc |
| 3 | Hỗ trợ danh mục phân cấp (VD: Quốc gia → Tỉnh/Thành phố) | Bắt buộc |
| 4 | Không cho phép xóa danh mục đang sử dụng, chỉ đánh dấu inactive | Bắt buộc |

---

## 4. Yêu cầu Phi chức năng

### 4.1. Hiệu năng
- Trang thông thường: < 2 giây
- Báo cáo phức tạp: < 10 giây

### 4.2. Bảo mật
- Mã hóa dữ liệu nhạy cảm (lương, CCCD)
- HTTPS cho web
- Ghi lại tất cả thao tác quan trọng

### 4.3. Khả năng sử dụng
- Giao diện tiếng Việt, thân thiện, responsive
- Có tài liệu hướng dẫn sử dụng
- Người dùng mới sử dụng được sau 4 giờ đào tạo

### 4.4. Tích hợp
- Hỗ trợ quản lý đa cơ sở: Hà Nội, Phố Hiến, TP.HCM
- Hỗ trợ xuất file theo chuẩn

### 4.5. Tuân thủ pháp luật
- Tuân thủ Bộ Luật Lao động 2019
- Tuân thủ Luật Viên chức và các văn bản hướng dẫn

---

## 5. Phạm vi KHÔNG nằm trong Phase 1

> Các module sau sẽ được phát triển trong Phase 2:

| Module | Lý do hoãn |
|--------|-----------|
| Chấm công | Cần tích hợp máy chấm công |
| Nghiên cứu khoa học | Quy tắc quy đổi phức tạp |
| Giờ giảng | Nhiều quy tắc đặc thù |
| Đào tạo chi tiết | Giảm xuống cơ bản |
| Tuyển dụng | Ưu tiên thấp hơn |
| Đánh giá viên chức | Ưu tiên thấp hơn |
| Tính lương tự động | Chỉ lưu trữ trong Phase 1 |

---

## Tổng kết

| Tiêu chí | Giá trị |
|----------|---------|
| Số module MVP | 7 |
| Số yêu cầu chức năng | ~35 |
| Thời gian triển khai | 2 tháng |
| Đội ngũ | 14 người (5 Teams) |

---

> *Tài liệu này là phiên bản rút gọn MVP từ bản đầy đủ. Các module và yêu cầu bị hoãn sẽ được triển khai trong Phase 2 sau khi hoàn thành Phase 1.*
