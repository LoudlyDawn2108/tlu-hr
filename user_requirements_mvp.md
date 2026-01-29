# Tài liệu Yêu cầu Người dùng (MVP)
## Hệ thống Quản lý Nhân sự - Trường Đại học Thủy lợi

> **Phiên bản:** MVP - Phase 1  
> **Thời gian triển khai:** 2 tháng  
> **Nhóm thực hiện:** 14 người (5 Teams)

---

## 1. Các nhân tố tham gia (Stakeholders)

### 1.1. Người dùng hệ thống

| STT | Vai trò | Đơn vị | Mô tả |
|-----|---------|--------|-------|
| 1 | Quản trị hệ thống | Phòng CNTT | Quản trị, phân quyền |
| 2 | Cán bộ TCCB | Phòng TCCB | Quản lý hồ sơ nhân sự |
| 3 | Cán bộ TCKT | Phòng TCKT | Quản lý lương, phụ cấp |
| 4 | Lãnh đạo | Ban Giám hiệu | Phê duyệt, báo cáo |
| 5 | Trưởng đơn vị | Khoa/Phòng | Quản lý nhân sự đơn vị |
| 6 | CBGV/NV | Toàn trường | Tra cứu, cập nhật thông tin |

### 1.2. Các bên liên quan khác

- Bộ Nông nghiệp và Môi trường
- Bộ Giáo dục và Đào tạo
- Cơ quan Bảo hiểm xã hội
- Cơ quan Thuế

---

## 2. Thu thập yêu cầu từ các Stakeholders (STRQ → FEAT)

### 2.1. Quản lý Tài khoản & Phân quyền

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 1 | Tất cả người dùng | Phỏng vấn | STRQ-AU-01 | Người dùng muốn đăng nhập bằng tài khoản/mật khẩu | → FEAT-AU-01.1 |
| 2 | Tất cả người dùng | Phỏng vấn | STRQ-AU-02 | Người dùng muốn đăng xuất khỏi hệ thống | → FEAT-AU-01.2 |
| 3 | Tất cả người dùng | Phỏng vấn | STRQ-AU-03 | Người dùng muốn đổi mật khẩu của mình | → FEAT-AU-01.3 |
| 4 | Tất cả người dùng | Phỏng vấn | STRQ-AU-04 | Người dùng muốn lấy lại mật khẩu khi quên | → FEAT-AU-01.4 |
| 5 | Phòng CNTT | Phỏng vấn | STRQ-AU-05 | Quản trị viên muốn tạo tài khoản mới cho người dùng | → FEAT-AU-02.1 |
| 6 | Phòng CNTT | Phỏng vấn | STRQ-AU-06 | Quản trị viên muốn sửa thông tin tài khoản | → FEAT-AU-02.2 |
| 7 | Phòng CNTT | Phỏng vấn | STRQ-AU-07 | Quản trị viên muốn khóa/mở khóa tài khoản | → FEAT-AU-02.3 |
| 8 | Phòng CNTT | Phỏng vấn | STRQ-AU-08 | Quản trị viên muốn reset mật khẩu cho người dùng | → FEAT-AU-02.4 |
| 9 | Phòng CNTT | Phỏng vấn | STRQ-AU-09 | Quản trị viên muốn tạo các vai trò (role) trong hệ thống | → FEAT-AU-03.1 |
| 10 | Phòng CNTT | Phỏng vấn | STRQ-AU-10 | Quản trị viên muốn phân quyền chức năng cho từng vai trò | → FEAT-AU-03.2 |
| 11 | Phòng CNTT | Phỏng vấn | STRQ-AU-11 | Quản trị viên muốn gán vai trò cho người dùng | → FEAT-AU-03.3 |
| 12 | Phòng CNTT | Brainstorming | STRQ-AU-12 | Hệ thống cần ghi log tất cả các lần đăng nhập/đăng xuất | → FEAT-AU-04.1 |
| 13 | Phòng CNTT | Brainstorming | STRQ-AU-13 | Hệ thống cần ghi log các thao tác quan trọng của người dùng | → FEAT-AU-04.2 |
| 14 | Phòng CNTT | Brainstorming | STRQ-AU-14 | Quản trị viên muốn xem lịch sử đăng nhập của người dùng | → FEAT-AU-04.3 |

---

### 2.2. Quản lý Hồ sơ Nhân sự

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 1 | Ban Giám hiệu | Phỏng vấn | STRQ-ER-01 | Ban giám hiệu muốn quản lý toàn diện thông tin của tất cả CBGV trong trường | → FEAT-ER-01 |
| 2 | Phòng TCCB | Phỏng vấn | STRQ-ER-02 | Phòng nhân sự muốn tạo lập hồ sơ cá nhân mới | → FEAT-ER-01 |
| 3 | Phòng TCCB | Phỏng vấn | STRQ-ER-03 | Phòng nhân sự muốn lưu trữ họ tên đầy đủ của nhân sự | → FEAT-ER-01.1 |
| 4 | Phòng TCCB | Phỏng vấn | STRQ-ER-04 | Phòng nhân sự muốn lưu trữ ngày tháng năm sinh | → FEAT-ER-01.2 |
| 5 | Phòng TCCB | Phỏng vấn | STRQ-ER-05 | Phòng nhân sự muốn lưu trữ giới tính | → FEAT-ER-01.3 |
| 6 | Phòng TCCB | Phỏng vấn | STRQ-ER-06 | Phòng nhân sự muốn lưu trữ số CCCD/CMT | → FEAT-ER-01.4 |
| 7 | Phòng TCCB | Phỏng vấn | STRQ-ER-07 | Phòng nhân sự muốn lưu trữ nơi sinh, quê quán | → FEAT-ER-01.5 |
| 8 | Phòng TCCB | Phỏng vấn | STRQ-ER-08 | Phòng nhân sự muốn lưu trữ dân tộc, tôn giáo | → FEAT-ER-01.6 |
| 9 | Phòng TCCB | Phỏng vấn | STRQ-ER-09 | Phòng nhân sự muốn lưu trữ địa chỉ thường trú | → FEAT-ER-02.1 |
| 10 | Phòng TCCB | Phỏng vấn | STRQ-ER-10 | Phòng nhân sự muốn lưu trữ địa chỉ tạm trú | → FEAT-ER-02.2 |
| 11 | Phòng TCCB | Phỏng vấn | STRQ-ER-11 | Phòng nhân sự muốn lưu trữ số điện thoại liên hệ | → FEAT-ER-02.3 |
| 12 | Phòng TCCB | Phỏng vấn | STRQ-ER-12 | Phòng nhân sự muốn lưu trữ email cá nhân | → FEAT-ER-02.4 |
| 13 | Phòng TCCB | Phỏng vấn | STRQ-ER-13 | Phòng nhân sự muốn lưu trữ email công việc | → FEAT-ER-02.5 |
| 14 | Phòng TCCB | Phỏng vấn | STRQ-ER-14 | Phòng nhân sự muốn lưu trữ tình trạng hôn nhân | → FEAT-ER-03.1 |
| 15 | Phòng TCCB | Phỏng vấn | STRQ-ER-15 | Phòng nhân sự muốn lưu trữ thông tin vợ/chồng | → FEAT-ER-03.2 |
| 16 | Phòng TCCB | Phỏng vấn | STRQ-ER-16 | Phòng nhân sự muốn lưu trữ thông tin con cái | → FEAT-ER-03.3 |
| 17 | Phòng TCCB | Phỏng vấn | STRQ-ER-17 | Phòng nhân sự muốn lưu trữ người phụ thuộc (để tính giảm trừ thuế TNCN) | → FEAT-ER-03.4 |
| 18 | Phòng TCCB | Phỏng vấn | STRQ-ER-18 | Phòng nhân sự muốn upload và lưu trữ ảnh chân dung 3x4 | → FEAT-ER-04.1 |
| 19 | Phòng TCCB | Phỏng vấn | STRQ-ER-19 | Phòng nhân sự muốn upload và lưu trữ ảnh chân dung 4x6 | → FEAT-ER-04.2 |
| 20 | Phòng TCCB | Phỏng vấn | STRQ-ER-20 | Phòng nhân sự muốn lưu trữ tên ngân hàng | → FEAT-ER-05.1 |
| 21 | Phòng TCCB | Phỏng vấn | STRQ-ER-21 | Phòng nhân sự muốn lưu trữ số tài khoản ngân hàng | → FEAT-ER-05.2 |
| 22 | Phòng TCCB | Phỏng vấn | STRQ-ER-22 | Phòng nhân sự muốn lưu trữ chi nhánh ngân hàng | → FEAT-ER-05.3 |
| 23 | Phòng TCCB | Phỏng vấn | STRQ-ER-23 | Phòng nhân sự muốn lưu trữ quá trình công tác trước khi vào trường | → FEAT-ER-06 |
| 24 | Phòng TCCB | Phỏng vấn | STRQ-ER-24 | Phòng nhân sự muốn lưu trữ ngày vào Đảng | → FEAT-ER-07.1 |
| 25 | Phòng TCCB | Phỏng vấn | STRQ-ER-25 | Phòng nhân sự muốn lưu trữ ngày chính thức vào Đảng | → FEAT-ER-07.2 |
| 26 | Phòng TCCB | Phỏng vấn | STRQ-ER-26 | Phòng nhân sự muốn lưu trữ đảng bộ trực thuộc | → FEAT-ER-07.3 |
| 27 | Phòng TCCB | Phỏng vấn | STRQ-ER-27 | Phòng nhân sự muốn lưu trữ thông tin đoàn viên công đoàn | → FEAT-ER-08 |
| 28 | Phòng TCCB | Phỏng vấn | STRQ-ER-28 | Phòng nhân sự muốn mã cán bộ được tạo tự động theo quy tắc | → FEAT-ER-09 |
| 29 | Phòng TCCB | Brainstorming | STRQ-ER-29 | Khách hàng muốn tìm kiếm hồ sơ theo tên | → FEAT-ER-10.1 |
| 30 | Phòng TCCB | Brainstorming | STRQ-ER-30 | Khách hàng muốn tìm kiếm hồ sơ theo mã cán bộ | → FEAT-ER-10.2 |
| 31 | Phòng TCCB | Brainstorming | STRQ-ER-31 | Khách hàng muốn lọc hồ sơ theo đơn vị | → FEAT-ER-10.3 |
| 32 | Phòng TCCB | Brainstorming | STRQ-ER-32 | Khách hàng muốn lọc hồ sơ theo trình độ | → FEAT-ER-10.4 |
| 33 | Phòng TCCB | Brainstorming | STRQ-ER-33 | Khách hàng muốn xuất hồ sơ ra file PDF | → FEAT-ER-11.1 |
| 34 | Phòng TCCB | Brainstorming | STRQ-ER-34 | Khách hàng muốn xuất hồ sơ ra file Excel | → FEAT-ER-11.2 |
| 35 | Phòng TCCB | Brainstorming | STRQ-ER-35 | Khách hàng muốn xuất hồ sơ ra file Word | → FEAT-ER-11.3 |
| 36 | Phòng TCCB | Phỏng vấn | STRQ-ER-36 | Phòng nhân sự muốn hiển thị thông tin dạng học hàm, học vị (VD: PGS.TS.) | → FEAT-ER-12 |

---

### 2.3. Quản lý Trình độ Học vấn, Chức danh

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 37 | Phòng TCCB | Phỏng vấn | STRQ-QM-01 | Phòng nhân sự muốn lưu trữ tên bằng cấp | → FEAT-QM-01.1 |
| 38 | Phòng TCCB | Phỏng vấn | STRQ-QM-02 | Phòng nhân sự muốn lưu trữ chuyên ngành đào tạo | → FEAT-QM-01.2 |
| 39 | Phòng TCCB | Phỏng vấn | STRQ-QM-03 | Phòng nhân sự muốn lưu trữ trường cấp bằng | → FEAT-QM-01.3 |
| 40 | Phòng TCCB | Phỏng vấn | STRQ-QM-04 | Phòng nhân sự muốn lưu trữ năm tốt nghiệp | → FEAT-QM-01.4 |
| 41 | Phòng TCCB | Phỏng vấn | STRQ-QM-05 | Phòng nhân sự muốn lưu trữ xếp loại tốt nghiệp | → FEAT-QM-01.5 |
| 42 | Phòng TCCB | Phỏng vấn | STRQ-QM-06 | Phòng nhân sự muốn lưu chức danh khoa học (GS, PGS) | → FEAT-QM-02 |
| 43 | Phòng TCCB | Phỏng vấn | STRQ-QM-07 | Phòng nhân sự muốn lưu trình độ học vị (TS, ThS, CN) | → FEAT-QM-03 |
| 44 | Phòng TCCB | Phỏng vấn | STRQ-QM-08 | Phòng nhân sự muốn lưu thông tin ngạch viên chức | → FEAT-QM-04 |
| 45 | Phòng TCCB | Phỏng vấn | STRQ-QM-09 | Phòng nhân sự muốn lưu thông tin chức vụ hiện tại | → FEAT-QM-05.1 |
| 46 | Phòng TCCB | Phỏng vấn | STRQ-QM-10 | Phòng nhân sự muốn lưu ngày bổ nhiệm chức vụ | → FEAT-QM-05.2 |
| 47 | Phòng TCCB | Phỏng vấn | STRQ-QM-11 | Phòng nhân sự muốn lưu ngày miễn nhiệm chức vụ | → FEAT-QM-05.3 |
| 48 | Phòng TCCB | Phỏng vấn | STRQ-QM-12 | Phòng nhân sự muốn lưu quá trình bổ nhiệm chức vụ | → FEAT-QM-05.4 |
| 49 | Phòng TCCB | Phỏng vấn | STRQ-QM-13 | Phòng nhân sự muốn lưu tên chứng chỉ | → FEAT-QM-06.1 |
| 50 | Phòng TCCB | Phỏng vấn | STRQ-QM-14 | Phòng nhân sự muốn lưu ngày cấp chứng chỉ | → FEAT-QM-06.2 |
| 51 | Phòng TCCB | Phỏng vấn | STRQ-QM-15 | Phòng nhân sự muốn lưu ngày hết hạn chứng chỉ | → FEAT-QM-06.3 |
| 52 | Phòng TCCB | Brainstorming | STRQ-QM-16 | Phòng nhân sự muốn cảnh báo chứng chỉ sắp hết hạn | → FEAT-QM-06.4 |

---

### 2.4. Quản lý Cơ cấu Tổ chức

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 53 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-01 | Ban giám hiệu muốn cơ cấu tổ chức phân cấp cha-con | → FEAT-OS-01 |
| 54 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-02 | Ban giám hiệu muốn quản lý cấp Hội đồng trường | → FEAT-OS-01.1 |
| 55 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-03 | Ban giám hiệu muốn quản lý cấp Đảng ủy | → FEAT-OS-01.2 |
| 56 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-04 | Ban giám hiệu muốn quản lý các Phòng/Ban | → FEAT-OS-01.3 |
| 57 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-05 | Ban giám hiệu muốn quản lý các Khoa | → FEAT-OS-01.4 |
| 58 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-06 | Ban giám hiệu muốn quản lý các Bộ môn thuộc Khoa | → FEAT-OS-01.5 |
| 59 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-07 | Ban giám hiệu muốn phân bổ nhân sự vào đơn vị | → FEAT-OS-02 |
| 60 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-08 | Ban giám hiệu muốn chuyển công tác nhân sự giữa các đơn vị | → FEAT-OS-03 |
| 61 | Ban Giám hiệu | Phỏng vấn | STRQ-OS-09 | Ban giám hiệu muốn một người kiêm nhiệm nhiều chức vụ | → FEAT-OS-04 |
| 62 | Phòng TCCB | Phỏng vấn | STRQ-OS-10 | Phòng nhân sự muốn lưu ngày thành lập đơn vị | → FEAT-OS-05.1 |
| 63 | Phòng TCCB | Phỏng vấn | STRQ-OS-11 | Phòng nhân sự muốn lưu lịch sử sáp nhập đơn vị | → FEAT-OS-05.2 |
| 64 | Phòng TCCB | Phỏng vấn | STRQ-OS-12 | Phòng nhân sự muốn lưu lịch sử giải thể đơn vị | → FEAT-OS-05.3 |
| 65 | Phòng TCCB | Phỏng vấn | STRQ-OS-13 | Phòng nhân sự muốn đánh dấu trạng thái đơn vị (hoạt động/giải thể) | → FEAT-OS-05.4 |
| 66 | Ban Giám hiệu | Brainstorming | STRQ-OS-14 | Ban giám hiệu muốn xem sơ đồ tổ chức dạng cây | → FEAT-OS-06 |

---

### 2.5. Quản lý Hợp đồng Lao động

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 67 | Phòng TCCB | Phỏng vấn | STRQ-CM-01 | Phòng nhân sự muốn tạo HĐ không xác định thời hạn | → FEAT-CM-01.1 |
| 68 | Phòng TCCB | Phỏng vấn | STRQ-CM-02 | Phòng nhân sự muốn tạo HĐ xác định thời hạn | → FEAT-CM-01.2 |
| 69 | Phòng TCCB | Phỏng vấn | STRQ-CM-03 | Phòng nhân sự muốn tạo HĐ thử việc | → FEAT-CM-01.3 |
| 70 | Phòng TCCB | Phỏng vấn | STRQ-CM-04 | Phòng nhân sự muốn tạo HĐ thỉnh giảng | → FEAT-CM-01.4 |
| 71 | Phòng TCCB | Phỏng vấn | STRQ-CM-05 | Phòng nhân sự muốn lưu số hợp đồng | → FEAT-CM-02.1 |
| 72 | Phòng TCCB | Phỏng vấn | STRQ-CM-06 | Phòng nhân sự muốn lưu ngày ký hợp đồng | → FEAT-CM-02.2 |
| 73 | Phòng TCCB | Phỏng vấn | STRQ-CM-07 | Phòng nhân sự muốn lưu ngày hiệu lực hợp đồng | → FEAT-CM-02.3 |
| 74 | Phòng TCCB | Phỏng vấn | STRQ-CM-08 | Phòng nhân sự muốn lưu ngày hết hạn hợp đồng | → FEAT-CM-02.4 |
| 75 | Phòng TCCB | Phỏng vấn | STRQ-CM-09 | Phòng nhân sự muốn lưu nội dung công việc trong HĐ | → FEAT-CM-02.5 |
| 76 | Phòng TCCB | Phỏng vấn | STRQ-CM-10 | Phòng nhân sự muốn lưu phụ lục hợp đồng | → FEAT-CM-02.6 |
| 77 | Phòng TCCB | Phỏng vấn | STRQ-CM-11 | Phòng nhân sự muốn gia hạn HĐ thỉnh giảng | → FEAT-CM-03 |
| 78 | Phòng TCCB | Brainstorming | STRQ-CM-12 | Phòng nhân sự muốn cảnh báo HĐ sắp hết hạn | → FEAT-CM-04 |
| 79 | Phòng TCCB | Phỏng vấn | STRQ-CM-13 | Phòng nhân sự muốn HĐ thử việc có thời gian theo ngạch | → FEAT-CM-05 |
| 80 | Phòng TCCB | Phỏng vấn | STRQ-CM-14 | Phòng nhân sự muốn in HĐ theo mẫu chuẩn | → FEAT-CM-06 |
| 81 | Phòng TCCB | Phỏng vấn | STRQ-CM-15 | Phòng nhân sự muốn chuyển đổi HĐ thử việc sang chính thức | → FEAT-CM-07.1 |
| 82 | Phòng TCCB | Phỏng vấn | STRQ-CM-16 | Phòng nhân sự muốn chuyển đổi HĐ có thời hạn sang vô thời hạn | → FEAT-CM-07.2 |
| 83 | Phòng TCCB | Phỏng vấn | STRQ-CM-17 | Phòng nhân sự muốn tạo hồ sơ nhân sự từ HĐ đã ký | → FEAT-CM-08 |

---

### 2.5. Quản lý Bậc lương (Cơ bản)

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 84 | Phòng TCCB | Phỏng vấn | STRQ-PB-01 | Phòng nhân sự muốn lưu hệ số lương của nhân sự | → FEAT-PB-01 |
| 85 | Phòng TCCB | Phỏng vấn | STRQ-PB-02 | Phòng nhân sự muốn lưu mức lương cơ sở | → FEAT-PB-02 |
| 86 | Phòng TCCB | Phỏng vấn | STRQ-PB-03 | Phòng nhân sự muốn lưu ngạch viên chức (GV, GV chính, GV cao cấp...) | → FEAT-PB-03.1 |
| 87 | Phòng TCCB | Phỏng vấn | STRQ-PB-04 | Phòng nhân sự muốn lưu bậc lương (1-9) | → FEAT-PB-03.2 |
| 88 | Phòng TCCB | Phỏng vấn | STRQ-PB-05 | Phòng nhân sự muốn có bảng hệ số lương theo ngạch/bậc | → FEAT-PB-04 |
| 89 | Phòng TCCB | Phỏng vấn | STRQ-PB-06 | Phòng nhân sự muốn lưu phụ cấp chức vụ | → FEAT-PB-05.1 |
| 90 | Phòng TCCB | Phỏng vấn | STRQ-PB-07 | Phòng nhân sự muốn lưu phụ cấp thâm niên | → FEAT-PB-05.2 |
| 91 | Phòng TCCB | Phỏng vấn | STRQ-PB-08 | Phòng nhân sự muốn lưu phụ cấp ưu đãi ngành | → FEAT-PB-05.3 |
| 92 | Phòng TCCB | Phỏng vấn | STRQ-PB-09 | Phòng nhân sự muốn lưu phụ cấp trách nhiệm | → FEAT-PB-05.4 |
| 93 | Phòng TCCB | Phỏng vấn | STRQ-PB-10 | Phòng nhân sự muốn lưu phụ cấp độc hại | → FEAT-PB-05.5 |
| 94 | Phòng TCCB | Phỏng vấn | STRQ-PB-11 | Phòng nhân sự muốn lưu phụ cấp khu vực | → FEAT-PB-05.6 |
| 95 | Phòng TCCB | Phỏng vấn | STRQ-PB-12 | Phòng nhân sự muốn lưu hệ số phụ cấp chức vụ theo vị trí | → FEAT-PB-06 |

> **Lưu ý MVP:** Phase 1 chỉ lưu trữ thông tin lương, KHÔNG tính lương tự động.

---

### 2.6. Báo cáo Thống kê (Cơ bản)

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 96 | Ban Giám hiệu | Phỏng vấn | STRQ-RP-01 | Lãnh đạo muốn xem thống kê nhân sự toàn trường | → FEAT-RP-01.1 |
| 97 | Ban Giám hiệu | Phỏng vấn | STRQ-RP-02 | Lãnh đạo muốn xem thống kê nhân sự theo đơn vị | → FEAT-RP-01.2 |
| 98 | Ban Giám hiệu | Phỏng vấn | STRQ-RP-03 | Lãnh đạo muốn xuất thống kê ra PDF | → FEAT-RP-02.1 |
| 99 | Ban Giám hiệu | Phỏng vấn | STRQ-RP-04 | Lãnh đạo muốn xuất thống kê ra Excel | → FEAT-RP-02.2 |

---

### 2.7. Self-Service Portal (Cơ bản)

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 100 | CBGV/NV | Phỏng vấn | STRQ-SS-01 | CBGV/NV muốn xem thông tin cá nhân của mình | → FEAT-SS-01 |
| 101 | CBGV/NV | Phỏng vấn | STRQ-SS-02 | CBGV/NV muốn xem lịch sử hợp đồng của mình | → FEAT-SS-02 |
| 102 | CBGV/NV | Phỏng vấn | STRQ-SS-03 | CBGV/NV muốn xem thông tin chức vụ, chức danh | → FEAT-SS-03.1 |
| 103 | CBGV/NV | Phỏng vấn | STRQ-SS-04 | CBGV/NV muốn xem thông tin học vấn | → FEAT-SS-03.2 |
| 104 | CBGV/NV | Phỏng vấn | STRQ-SS-05 | CBGV/NV muốn xem thông tin bậc lương | → FEAT-SS-03.3 |

---

## 3. Bảng tổng hợp Features (FEAT)

### 3.1. Module Tài khoản & Phân quyền (FEAT-AU)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|-----------------|
| FEAT-AU-01.1 | Đăng nhập | Đăng nhập bằng tài khoản/mật khẩu | STRQ-AU-01 |
| FEAT-AU-01.2 | Đăng xuất | Đăng xuất khỏi hệ thống | STRQ-AU-02 |
| FEAT-AU-01.3 | Đổi mật khẩu | Người dùng tự đổi mật khẩu | STRQ-AU-03 |
| FEAT-AU-01.4 | Quên mật khẩu | Gửi link reset qua email | STRQ-AU-04 |
| FEAT-AU-02.1 | Tạo tài khoản | Admin tạo tài khoản mới | STRQ-AU-05 |
| FEAT-AU-02.2 | Sửa tài khoản | Admin sửa thông tin tài khoản | STRQ-AU-06 |
| FEAT-AU-02.3 | Khóa/Mở khóa tài khoản | Admin khóa/mở khóa | STRQ-AU-07 |
| FEAT-AU-02.4 | Reset mật khẩu | Admin reset mật khẩu cho người dùng | STRQ-AU-08 |
| FEAT-AU-03.1 | Tạo vai trò | Tạo các role trong hệ thống | STRQ-AU-09 |
| FEAT-AU-03.2 | Phân quyền chức năng | Gán chức năng cho role | STRQ-AU-10 |
| FEAT-AU-03.3 | Gán vai trò | Gán role cho người dùng | STRQ-AU-11 |
| FEAT-AU-04.1 | Log đăng nhập/xuất | Ghi lại lịch sử đăng nhập | STRQ-AU-12 |
| FEAT-AU-04.2 | Log thao tác | Ghi lại các thao tác quan trọng | STRQ-AU-13 |
| FEAT-AU-04.3 | Xem lịch sử đăng nhập | Admin xem log đăng nhập | STRQ-AU-14 |

### 3.2. Module Hồ sơ Nhân sự (FEAT-ER)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-ER-01 | Tạo hồ sơ nhân sự | Form nhập thông tin cơ bản | STRQ-ER-01, 02 |
| FEAT-ER-01.1 | Nhập họ tên | Trường nhập họ tên đầy đủ | STRQ-ER-03 |
| FEAT-ER-01.2 | Nhập ngày sinh | Trường nhập ngày tháng năm sinh | STRQ-ER-04 |
| FEAT-ER-01.3 | Chọn giới tính | Dropdown chọn giới tính | STRQ-ER-05 |
| FEAT-ER-01.4 | Nhập CCCD/CMT | Trường nhập số CCCD | STRQ-ER-06 |
| FEAT-ER-01.5 | Nhập nơi sinh, quê quán | Trường nhập địa chỉ | STRQ-ER-07 |
| FEAT-ER-01.6 | Chọn dân tộc, tôn giáo | Dropdown chọn từ danh mục | STRQ-ER-08 |
| FEAT-ER-02 | Quản lý thông tin liên hệ | Nhập/sửa địa chỉ, SĐT, email | STRQ-ER-09 → 13 |
| FEAT-ER-03 | Quản lý thông tin gia đình | Nhập/sửa hôn nhân, người phụ thuộc | STRQ-ER-14 → 17 |
| FEAT-ER-04 | Upload ảnh chân dung | Upload ảnh 3x4, 4x6 | STRQ-ER-18, 19 |
| FEAT-ER-05 | Quản lý thông tin ngân hàng | Nhập tài khoản, chi nhánh | STRQ-ER-20 → 22 |
| FEAT-ER-06 | Quản lý quá trình công tác | Nhập lịch sử công tác | STRQ-ER-23 |
| FEAT-ER-07 | Quản lý thông tin Đảng viên | Nhập thông tin Đảng | STRQ-ER-24 → 26 |
| FEAT-ER-08 | Quản lý thông tin Công đoàn | Nhập thông tin đoàn viên | STRQ-ER-27 |
| FEAT-ER-09 | Sinh mã cán bộ tự động | Tự động tạo mã theo quy tắc | STRQ-ER-28 |
| FEAT-ER-10 | Tìm kiếm, lọc hồ sơ | Tìm theo tên, mã, đơn vị | STRQ-ER-29 → 32 |
| FEAT-ER-11 | Xuất hồ sơ | Xuất PDF, Excel, Word | STRQ-ER-33 → 35 |
| FEAT-ER-12 | Hiển thị học hàm/học vị | Format: PGS.TS. Nguyễn Văn A | STRQ-ER-36 |

### 3.3. Module Trình độ, Chức danh (FEAT-QM)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-QM-01 | Quản lý bằng cấp | Nhập/sửa thông tin bằng cấp | STRQ-QM-01 → 05 |
| FEAT-QM-02 | Quản lý chức danh khoa học | Lưu GS, PGS | STRQ-QM-06 |
| FEAT-QM-03 | Quản lý học vị | Lưu TS, ThS, CN | STRQ-QM-07 |
| FEAT-QM-04 | Quản lý ngạch viên chức | Lưu ngạch công chức | STRQ-QM-08 |
| FEAT-QM-05 | Quản lý chức vụ | Lưu quá trình bổ nhiệm | STRQ-QM-09 → 12 |
| FEAT-QM-06 | Quản lý chứng chỉ | Lưu + cảnh báo hết hạn | STRQ-QM-13 → 16 |

### 3.3. Module Cơ cấu Tổ chức (FEAT-OS)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-OS-01 | Quản lý đơn vị phân cấp | Cây tổ chức Trường → Khoa → Bộ môn | STRQ-OS-01 → 06 |
| FEAT-OS-02 | Phân bổ nhân sự | Gán nhân viên vào đơn vị | STRQ-OS-07 |
| FEAT-OS-03 | Chuyển công tác | Di chuyển nhân sự giữa đơn vị | STRQ-OS-08 |
| FEAT-OS-04 | Quản lý kiêm nhiệm | Một người nhiều chức vụ | STRQ-OS-09 |
| FEAT-OS-05 | Lịch sử đơn vị | Thành lập/sáp nhập/giải thể | STRQ-OS-10 → 13 |
| FEAT-OS-06 | Sơ đồ tổ chức | Hiển thị cây trực quan | STRQ-OS-14 |

### 3.4. Module Hợp đồng Lao động (FEAT-CM)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-CM-01 | Tạo hợp đồng | Form tạo 4 loại HĐ | STRQ-CM-01 → 04 |
| FEAT-CM-02 | Lưu thông tin HĐ | Số, ngày, hiệu lực, phụ lục | STRQ-CM-05 → 10 |
| FEAT-CM-03 | Gia hạn HĐ thỉnh giảng | Chức năng gia hạn | STRQ-CM-11 |
| FEAT-CM-04 | Cảnh báo hết hạn | Thông báo HĐ sắp hết | STRQ-CM-12 |
| FEAT-CM-05 | Thời gian thử việc theo ngạch | Tự động tính theo ngạch | STRQ-CM-13 |
| FEAT-CM-06 | In hợp đồng | Xuất theo mẫu chuẩn | STRQ-CM-14 |
| FEAT-CM-07 | Chuyển đổi HĐ | Thử việc → Chính thức | STRQ-CM-15, 16 |
| FEAT-CM-08 | Tạo hồ sơ từ HĐ | Tự động tạo hồ sơ | STRQ-CM-17 |

### 3.5. Module Bậc lương (FEAT-PB)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-PB-01 | Lưu hệ số lương | Hệ số theo ngạch/bậc | STRQ-PB-01 |
| FEAT-PB-02 | Lưu lương cơ sở | Mức lương cơ sở hiện hành | STRQ-PB-02 |
| FEAT-PB-03 | Gán ngạch/bậc | Lưu ngạch và bậc của nhân sự | STRQ-PB-03, 04 |
| FEAT-PB-04 | Bảng hệ số lương | Danh mục ngạch/bậc/hệ số | STRQ-PB-05 |
| FEAT-PB-05 | Quản lý phụ cấp | 6 loại phụ cấp | STRQ-PB-06 → 11 |
| FEAT-PB-06 | Hệ số phụ cấp chức vụ | Theo vị trí | STRQ-PB-12 |

### 3.6. Module Báo cáo (FEAT-RP)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-RP-01 | Thống kê nhân sự | Theo toàn trường/đơn vị | STRQ-RP-01, 02 |
| FEAT-RP-02 | Xuất báo cáo | PDF, Excel | STRQ-RP-03, 04 |

### 3.7. Module Self-Service (FEAT-SS)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-SS-01 | Xem hồ sơ cá nhân | Trang xem thông tin | STRQ-SS-01 |
| FEAT-SS-02 | Xem lịch sử HĐ | Danh sách HĐ đã ký | STRQ-SS-02 |
| FEAT-SS-03 | Xem thông tin lương | Ngạch/bậc, phụ cấp | STRQ-SS-03 → 05 |

---

## 4. Yêu cầu Chung

- Trước khi lưu một mục phải có kiểm tra tính hợp lệ của dữ liệu.
- Mỗi danh mục hỗ trợ: thêm/sửa, đánh dấu active/inactive, sắp xếp thứ tự hiển thị.
- Hỗ trợ danh mục phân cấp cho một số loại (VD: Quốc gia → Tỉnh/Thành phố).
- Không cho phép xóa mục danh mục đang được sử dụng, chỉ cho phép đánh dấu inactive.

---

## 5. Yêu cầu Phi chức năng

**Hiệu năng:**
- Trang thông thường < 2 giây, báo cáo phức tạp < 10 giây.

**Bảo mật:**
- Mã hóa dữ liệu nhạy cảm (lương, CCCD); HTTPS cho web.
- Ghi lại tất cả thao tác quan trọng.

**Khả năng sử dụng:**
- Giao diện tiếng Việt, thân thiện, responsive.
- Có tài liệu hướng dẫn sử dụng đầy đủ.
- Người dùng mới sử dụng được các chức năng cơ bản sau 4 giờ đào tạo.

**Tích hợp:**
- Hỗ trợ xuất file theo chuẩn.
- Hỗ trợ quản lý đa cơ sở: Hà Nội, Phố Hiến, TP.HCM.

**Tuân thủ pháp luật:**
- Tuân thủ Bộ Luật Lao động 2019.
- Tuân thủ Luật Viên chức và các văn bản hướng dẫn.

---

## 6. Tổng kết

| Tiêu chí | Giá trị |
|----------|---------|
| Tổng số STRQ | **119** |
| Tổng số FEAT | **62** |
| Số module | **8** |
| Thời gian triển khai | **2 tháng (Phase 1)** |

---

## 7. Phạm vi Phase 2 (Không làm trong 2 tháng)

- Quản lý Tuyển dụng
- Quản lý Đào tạo chi tiết
- Chấm công
- Nghiên cứu khoa học
- Giờ giảng
- Đánh giá viên chức
- Tính lương tự động
- Thông báo tăng bậc lương tự động

---

> *Tài liệu này chứa 118 yêu cầu STRQ ánh xạ sang 62 Features trong 8 modules. Phase 2 sẽ triển khai các tính năng còn lại.*
