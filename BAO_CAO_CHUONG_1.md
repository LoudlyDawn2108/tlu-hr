# CHƯƠNG 1. THU THẬP YÊU CẦU VÀ LẬP KẾ HOẠCH

## 1.1. Bản kế hoạch quản lý yêu cầu

### 1.1.1. Giới thiệu

Hệ thống Quản lý Nhân sự (HRMS - Human Resource Management System) là giải pháp phần mềm toàn diện được xây dựng nhằm hỗ trợ công tác quản lý nhân sự tại Trường Đại học Thủy lợi. Hệ thống giúp số hóa và tự động hóa các quy trình nghiệp vụ liên quan đến quản lý hồ sơ cán bộ, giảng viên, nhân viên từ khi tuyển dụng đến khi nghỉ hưu.

**Bối cảnh thực hiện:**
- Trường Đại học Thủy lợi hiện có khoảng 1.200 cán bộ, giảng viên, nhân viên làm việc tại 3 cơ sở: Hà Nội, Phố Hiến (Hưng Yên) và TP. Hồ Chí Minh.
- Công tác quản lý nhân sự hiện tại chủ yếu dựa trên hồ sơ giấy và các file Excel rời rạc.
- Nhu cầu cấp thiết về một hệ thống tập trung để quản lý toàn bộ thông tin nhân sự.

### 1.1.2. Mục tiêu dự án

**Mục tiêu tổng quát:**
Xây dựng hệ thống quản lý nhân sự tập trung, hiện đại, đáp ứng các yêu cầu nghiệp vụ của Trường Đại học Thủy lợi và tuân thủ các quy định pháp luật hiện hành.

**Mục tiêu cụ thể (Phase 1 - MVP):**

| STT | Mục tiêu | Chỉ tiêu đo lường |
|-----|----------|-------------------|
| 1 | Số hóa 100% hồ sơ nhân sự | Tất cả CBGV có hồ sơ điện tử |
| 2 | Quản lý cơ cấu tổ chức phân cấp | Cây tổ chức đầy đủ các cấp |
| 3 | Quản lý hợp đồng lao động | Theo dõi 4 loại HĐ |
| 4 | Quản lý bậc lương, phụ cấp | Lưu trữ thông tin lương |
| 5 | Báo cáo thống kê cơ bản | Xuất báo cáo PDF, Excel |
| 6 | Cổng thông tin cá nhân | CBGV tự tra cứu thông tin |

### 1.1.3. Phạm vi đề tài

**Phạm vi Phase 1 (MVP - 2 tháng):**

| Module | Mô tả | Ưu tiên |
|--------|-------|---------|
| Quản lý Tài khoản & Phân quyền | Đăng nhập, phân quyền theo vai trò | ⭐⭐⭐ |
| Quản lý Hồ sơ Nhân sự | Thông tin cá nhân, gia đình, Đảng viên | ⭐⭐⭐ |
| Quản lý Trình độ, Chức danh | Bằng cấp, chứng chỉ, chức vụ | ⭐⭐⭐ |
| Quản lý Cơ cấu Tổ chức | Cây đơn vị phân cấp | ⭐⭐⭐ |
| Quản lý Hợp đồng | 4 loại HĐ, gia hạn, chuyển đổi | ⭐⭐⭐ |
| Quản lý Bậc lương | Lưu trữ ngạch/bậc, phụ cấp | ⭐⭐ |
| Báo cáo Thống kê | Thống kê cơ bản, xuất file | ⭐⭐ |
| Self-Service Portal | Tra cứu thông tin cá nhân | ⭐ |

**Phạm vi Phase 2 (Mở rộng - Sau MVP):**
- Quản lý Tuyển dụng, Đào tạo, Chấm công, NCKH, Giờ giảng, Đánh giá viên chức, Tính lương tự động

### 1.1.4. Công nghệ sử dụng

| Thành phần | Công nghệ | Lý do lựa chọn |
|------------|-----------|----------------|
| Frontend | React.js 18.x | SPA, hiệu năng cao |
| Backend | Spring Boot 3.x | Java ecosystem, bảo mật tốt |
| Database | PostgreSQL 15.x | Open source, hỗ trợ JSON |
| Authentication | Spring Security + JWT | Stateless |
| API Docs | Swagger/OpenAPI 3.0 | Tài liệu API tự động |
| Version Control | Git + GitHub | Quản lý source code |
| CI/CD | GitHub Actions | Tự động build, test, deploy |
| Containerization | Docker | Đóng gói ứng dụng |

*(Hình 1.1: Sơ đồ kiến trúc tổng quan - Cần bổ sung)*

### 1.1.5. Các nhân tố tham gia (Stakeholders)

#### 1.1.5.1. Người dùng hệ thống

| STT | Vai trò | Đơn vị | Mô tả |
|-----|---------|--------|-------|
| 1 | Quản trị hệ thống | Phòng CNTT | Quản trị, phân quyền |
| 2 | Cán bộ TCCB | Phòng TCCB | Quản lý hồ sơ nhân sự |
| 3 | Cán bộ TCKT | Phòng TCKT | Quản lý lương, phụ cấp |
| 4 | Lãnh đạo | Ban Giám hiệu | Phê duyệt, báo cáo |
| 5 | Trưởng đơn vị | Khoa/Phòng | Quản lý nhân sự đơn vị |
| 6 | CBGV/NV | Toàn trường | Tra cứu, cập nhật thông tin |

#### 1.1.5.2. Các bên liên quan khác

- Bộ Nông nghiệp và Môi trường
- Bộ Giáo dục và Đào tạo
- Cơ quan Bảo hiểm xã hội
- Cơ quan Thuế

---

### 1.1.6. Thu thập yêu cầu từ các Stakeholders (Xác định STRQ, FEAT)

**Phương pháp thu thập yêu cầu:**

| Phương pháp | Mô tả | Đối tượng áp dụng |
|-------------|-------|-------------------|
| Phỏng vấn trực tiếp | Trao đổi 1-1 với người dùng | Lãnh đạo, Trưởng phòng |
| Brainstorming | Họp nhóm đề xuất ý tưởng | Cán bộ nghiệp vụ |
| Phân tích tài liệu | Nghiên cứu quy trình hiện tại | Biểu mẫu, văn bản |
| Quan sát | Theo dõi quy trình thực tế | Phòng TCCB |

---

#### 1.1.6.1. Quản lý Tài khoản & Phân quyền

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

#### 1.1.6.2. Quản lý Hồ sơ Nhân sự

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

#### 1.1.6.3. Quản lý Trình độ Học vấn, Chức danh

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

#### 1.1.6.4. Quản lý Cơ cấu Tổ chức

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

#### 1.1.6.5. Quản lý Hợp đồng Lao động

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

#### 1.1.6.6. Quản lý Bậc lương (Cơ bản)

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

#### 1.1.6.7. Báo cáo Thống kê (Cơ bản)

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 96 | Ban Giám hiệu | Phỏng vấn | STRQ-RP-01 | Lãnh đạo muốn xem thống kê nhân sự toàn trường | → FEAT-RP-01.1 |
| 97 | Ban Giám hiệu | Phỏng vấn | STRQ-RP-02 | Lãnh đạo muốn xem thống kê nhân sự theo đơn vị | → FEAT-RP-01.2 |
| 98 | Ban Giám hiệu | Phỏng vấn | STRQ-RP-03 | Lãnh đạo muốn xuất thống kê ra PDF | → FEAT-RP-02.1 |
| 99 | Ban Giám hiệu | Phỏng vấn | STRQ-RP-04 | Lãnh đạo muốn xuất thống kê ra Excel | → FEAT-RP-02.2 |

---

#### 1.1.6.8. Self-Service Portal (Cơ bản)

| STT | Đối tượng | Phương pháp | Mã STRQ | Yêu cầu (STRQ) | Ánh xạ FEAT |
|-----|-----------|-------------|---------|----------------|-------------|
| 100 | CBGV/NV | Phỏng vấn | STRQ-SS-01 | CBGV/NV muốn xem thông tin cá nhân của mình | → FEAT-SS-01 |
| 101 | CBGV/NV | Phỏng vấn | STRQ-SS-02 | CBGV/NV muốn xem lịch sử hợp đồng của mình | → FEAT-SS-02 |
| 102 | CBGV/NV | Phỏng vấn | STRQ-SS-03 | CBGV/NV muốn xem thông tin chức vụ, chức danh | → FEAT-SS-03.1 |
| 103 | CBGV/NV | Phỏng vấn | STRQ-SS-04 | CBGV/NV muốn xem thông tin học vấn | → FEAT-SS-03.2 |
| 104 | CBGV/NV | Phỏng vấn | STRQ-SS-05 | CBGV/NV muốn xem thông tin bậc lương | → FEAT-SS-03.3 |

---

### 1.1.7. Bảng tổng hợp Features (FEAT)

**Tổng hợp STRQ → FEAT:**

| Module | Số STRQ | Số FEAT |
|--------|---------|---------|
| Tài khoản & Phân quyền (AU) | 14 | 14 |
| Hồ sơ Nhân sự (ER) | 36 | 18 |
| Trình độ, Chức danh (QM) | 16 | 6 |
| Cơ cấu Tổ chức (OS) | 14 | 6 |
| Hợp đồng Lao động (CM) | 17 | 8 |
| Bậc lương (PB) | 12 | 6 |
| Báo cáo (RP) | 4 | 2 |
| Self-Service (SS) | 5 | 3 |
| **Tổng cộng** | **118** | **62** |

---

#### 1.1.7.1. Module Tài khoản & Phân quyền (FEAT-AU)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
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

#### 1.1.7.2. Module Hồ sơ Nhân sự (FEAT-ER)

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

#### 1.1.7.3. Module Trình độ, Chức danh (FEAT-QM)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-QM-01 | Quản lý bằng cấp | Nhập/sửa thông tin bằng cấp | STRQ-QM-01 → 05 |
| FEAT-QM-02 | Quản lý chức danh khoa học | Lưu GS, PGS | STRQ-QM-06 |
| FEAT-QM-03 | Quản lý học vị | Lưu TS, ThS, CN | STRQ-QM-07 |
| FEAT-QM-04 | Quản lý ngạch viên chức | Lưu ngạch công chức | STRQ-QM-08 |
| FEAT-QM-05 | Quản lý chức vụ | Lưu quá trình bổ nhiệm | STRQ-QM-09 → 12 |
| FEAT-QM-06 | Quản lý chứng chỉ | Lưu + cảnh báo hết hạn | STRQ-QM-13 → 16 |

#### 1.1.7.4. Module Cơ cấu Tổ chức (FEAT-OS)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-OS-01 | Quản lý đơn vị phân cấp | Cây tổ chức Trường → Khoa → Bộ môn | STRQ-OS-01 → 06 |
| FEAT-OS-02 | Phân bổ nhân sự | Gán nhân viên vào đơn vị | STRQ-OS-07 |
| FEAT-OS-03 | Chuyển công tác | Di chuyển nhân sự giữa đơn vị | STRQ-OS-08 |
| FEAT-OS-04 | Quản lý kiêm nhiệm | Một người nhiều chức vụ | STRQ-OS-09 |
| FEAT-OS-05 | Lịch sử đơn vị | Thành lập/sáp nhập/giải thể | STRQ-OS-10 → 13 |
| FEAT-OS-06 | Sơ đồ tổ chức | Hiển thị cây trực quan | STRQ-OS-14 |

#### 1.1.7.5. Module Hợp đồng Lao động (FEAT-CM)

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

#### 1.1.7.6. Module Bậc lương (FEAT-PB)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-PB-01 | Lưu hệ số lương | Hệ số theo ngạch/bậc | STRQ-PB-01 |
| FEAT-PB-02 | Lưu lương cơ sở | Mức lương cơ sở hiện hành | STRQ-PB-02 |
| FEAT-PB-03 | Gán ngạch/bậc | Lưu ngạch và bậc của nhân sự | STRQ-PB-03, 04 |
| FEAT-PB-04 | Bảng hệ số lương | Danh mục ngạch/bậc/hệ số | STRQ-PB-05 |
| FEAT-PB-05 | Quản lý phụ cấp | 6 loại phụ cấp | STRQ-PB-06 → 11 |
| FEAT-PB-06 | Hệ số phụ cấp chức vụ | Theo vị trí | STRQ-PB-12 |

#### 1.1.7.7. Module Báo cáo (FEAT-RP)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-RP-01 | Thống kê nhân sự | Theo toàn trường/đơn vị | STRQ-RP-01, 02 |
| FEAT-RP-02 | Xuất báo cáo | PDF, Excel | STRQ-RP-03, 04 |

#### 1.1.7.8. Module Self-Service (FEAT-SS)

| Mã FEAT | Tên tính năng | Mô tả | STRQ liên quan |
|---------|--------------|-------|----------------|
| FEAT-SS-01 | Xem hồ sơ cá nhân | Trang xem thông tin | STRQ-SS-01 |
| FEAT-SS-02 | Xem lịch sử HĐ | Danh sách HĐ đã ký | STRQ-SS-02 |
| FEAT-SS-03 | Xem thông tin lương | Ngạch/bậc, phụ cấp | STRQ-SS-03 → 05 |

---

### 1.1.8. Mô hình hóa yêu cầu

#### 1.1.8.1. Xác định các tác nhân và Use Case

**Danh sách tác nhân (Actors):**

| STT | Tác nhân | Mô tả | Vai trò trong hệ thống |
|-----|----------|-------|------------------------|
| 1 | Quản trị viên (Admin) | Phòng CNTT | Quản trị hệ thống, phân quyền |
| 2 | Cán bộ TCCB | Phòng TCCB | Quản lý hồ sơ, hợp đồng |
| 3 | Cán bộ TCKT | Phòng TCKT | Quản lý lương |
| 4 | Lãnh đạo | Ban Giám hiệu | Xem báo cáo, phê duyệt |
| 5 | Trưởng đơn vị | Khoa/Phòng | Quản lý nhân sự đơn vị |
| 6 | CBGV/NV | Toàn trường | Tra cứu thông tin cá nhân |

**Danh sách Use Case chính:**

| STT | Mã UC | Tên Use Case | Actor chính |
|-----|-------|--------------|-------------|
| 1 | UC-01 | Đăng nhập/Đăng xuất | Tất cả |
| 2 | UC-02 | Quản lý tài khoản người dùng | Admin |
| 3 | UC-03 | Phân quyền hệ thống | Admin |
| 4 | UC-04 | Quản lý hồ sơ nhân sự | Cán bộ TCCB |
| 5 | UC-05 | Quản lý trình độ, chức danh | Cán bộ TCCB |
| 6 | UC-06 | Quản lý cơ cấu tổ chức | Cán bộ TCCB, Lãnh đạo |
| 7 | UC-07 | Quản lý hợp đồng lao động | Cán bộ TCCB |
| 8 | UC-08 | Quản lý bậc lương, phụ cấp | Cán bộ TCCB, TCKT |
| 9 | UC-09 | Xem báo cáo thống kê | Lãnh đạo |
| 10 | UC-10 | Tra cứu thông tin cá nhân | CBGV/NV |

#### 1.1.8.2. Vẽ Biểu đồ Use Case

*(Hình 1.2: Biểu đồ Use Case tổng quát - Cần bổ sung)*

*(Hình 1.3-1.6: Phân rã Use Case theo từng tác nhân - Cần bổ sung)*

---

### 1.1.9. Các yêu cầu ràng buộc

| Loại | Yêu cầu | Mô tả |
|------|---------|-------|
| Giao diện | Ngôn ngữ tiếng Việt | 100% tiếng Việt |
| Giao diện | Responsive | Desktop, Tablet, Mobile |
| Chức năng | Validate dữ liệu | Kiểm tra trước khi lưu |
| Chức năng | Soft delete | Không xóa vật lý |
| Chức năng | Audit log | Ghi lại mọi thao tác |
| Bổ sung | Đa cơ sở | Hà Nội, Phố Hiến, TP.HCM |
| Bổ sung | Kiêm nhiệm | Một người nhiều chức vụ |

---

### 1.1.10. Đặc tả Use Case

#### 1.1.10.1. UC-01: Đăng nhập hệ thống

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-01 |
| **Use Case Name** | Đăng nhập hệ thống |
| **Actor** | Tất cả người dùng (Admin, TCCB, TCKT, Lãnh đạo, CBGV/NV) |
| **Description** | Người dùng đăng nhập vào hệ thống bằng tài khoản và mật khẩu để sử dụng các chức năng được phân quyền |
| **Trigger** | Người dùng truy cập URL hệ thống |
| **Pre-conditions** | - Người dùng có tài khoản hợp lệ trong hệ thống<br>- Tài khoản chưa bị khóa |
| **Post-conditions** | - Người dùng được xác thực thành công<br>- Session được tạo<br>- Chuyển đến trang chủ theo vai trò |

**Flow of Events (Luồng chính):**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Truy cập URL hệ thống | Hiển thị trang đăng nhập |
| 2 | Nhập tên đăng nhập | - |
| 3 | Nhập mật khẩu | - |
| 4 | Nhấn nút "Đăng nhập" | Xác thực thông tin |
| 5 | - | Tạo JWT token và session |
| 6 | - | Ghi log đăng nhập |
| 7 | - | Chuyển đến trang chủ theo vai trò |

**Alternative Flow (Luồng thay thế):**

| Bước | Điều kiện | Xử lý |
|------|-----------|-------|
| 4a | Sai mật khẩu lần 1-4 | Hiển thị "Sai tên đăng nhập hoặc mật khẩu", tăng đếm |
| 4b | Sai mật khẩu lần 5 | Khóa tài khoản 15 phút, gửi email cảnh báo |
| 4c | Tài khoản bị khóa | Hiển thị "Tài khoản đã bị khóa, liên hệ Admin" |

**Exceptions:**

| Mã | Ngoại lệ | Xử lý |
|----|----------|-------|
| E01 | Lỗi kết nối database | Hiển thị "Hệ thống đang bảo trì" |
| E02 | Token hết hạn | Chuyển về trang đăng nhập |

---

#### 1.1.10.2. UC-02: Quản lý tài khoản người dùng

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-02 |
| **Use Case Name** | Quản lý tài khoản người dùng |
| **Actor** | Quản trị viên (Admin) |
| **Description** | Admin tạo, sửa, khóa/mở khóa, reset mật khẩu tài khoản người dùng |
| **Trigger** | Admin chọn menu "Quản lý tài khoản" |
| **Pre-conditions** | - Admin đã đăng nhập<br>- Có quyền quản lý tài khoản |
| **Post-conditions** | - Tài khoản được tạo/cập nhật trong CSDL<br>- Log ghi nhận thao tác |

**Flow of Events (Tạo tài khoản mới):**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn menu "Tài khoản" | Hiển thị danh sách tài khoản |
| 2 | Nhấn "Thêm mới" | Hiển thị form tạo tài khoản |
| 3 | Nhập username, email | Validate unique |
| 4 | Chọn vai trò | Load danh sách role |
| 5 | Liên kết với nhân sự | Dropdown chọn nhân sự |
| 6 | Nhấn "Lưu" | Tạo tài khoản, gửi email mật khẩu tạm |

**Alternative Flow:**

| Điều kiện | Xử lý |
|-----------|-------|
| Username đã tồn tại | Báo lỗi "Username đã được sử dụng" |
| Email đã tồn tại | Báo lỗi "Email đã được đăng ký" |
| Reset mật khẩu | Sinh mật khẩu ngẫu nhiên, gửi email |

---

#### 1.1.10.3. UC-03: Phân quyền hệ thống

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-03 |
| **Use Case Name** | Phân quyền hệ thống |
| **Actor** | Quản trị viên (Admin) |
| **Description** | Admin tạo vai trò (role), gán quyền truy cập cho từng chức năng |
| **Trigger** | Admin chọn menu "Phân quyền" |
| **Pre-conditions** | Admin có quyền Super Admin |
| **Post-conditions** | Role và permission được lưu vào CSDL |

**Flow of Events:**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn menu "Vai trò & Quyền" | Hiển thị danh sách role |
| 2 | Nhấn "Thêm vai trò" | Form tạo role |
| 3 | Nhập tên role, mô tả | Validate |
| 4 | Tick chọn các quyền | Hiển thị tree chức năng |
| 5 | Nhấn "Lưu" | Lưu role + permissions |

---

#### 1.1.10.4. UC-04: Quản lý hồ sơ nhân sự

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-04 |
| **Use Case Name** | Quản lý hồ sơ nhân sự |
| **Actor** | Cán bộ TCCB |
| **Description** | Tạo mới, cập nhật, tìm kiếm, xuất hồ sơ nhân sự |
| **Trigger** | Cán bộ TCCB chọn menu "Hồ sơ nhân sự" |
| **Pre-conditions** | - Đã đăng nhập<br>- Có quyền quản lý hồ sơ |
| **Post-conditions** | - Hồ sơ được lưu vào CSDL<br>- Mã cán bộ được sinh tự động |

**Flow of Events (Tạo hồ sơ mới):**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn menu "Hồ sơ nhân sự" | Hiển thị danh sách |
| 2 | Nhấn "Thêm mới" | Hiển thị form nhập hồ sơ |
| 3 | Nhập thông tin cá nhân (họ tên, ngày sinh, CCCD...) | Validate real-time |
| 4 | Nhập thông tin liên hệ (địa chỉ, SĐT, email) | Validate format |
| 5 | Nhập thông tin gia đình | - |
| 6 | Upload ảnh chân dung | Kiểm tra định dạng (JPG, PNG), kích thước (<5MB) |
| 7 | Nhấn "Lưu" | Sinh mã cán bộ, lưu CSDL |
| 8 | - | Hiển thị thông báo thành công |

**Alternative Flow:**

| Điều kiện | Xử lý |
|-----------|-------|
| CCCD đã tồn tại | Báo lỗi "CCCD đã được sử dụng" |
| File ảnh >5MB | Báo lỗi "File vượt quá kích thước cho phép" |
| Thiếu trường bắt buộc | Highlight trường lỗi |

**Exceptions:**

| Mã | Ngoại lệ | Xử lý |
|----|----------|-------|
| E01 | Upload ảnh thất bại | Cho phép lưu hồ sơ, bổ sung ảnh sau |

---

#### 1.1.10.5. UC-05: Quản lý trình độ, chức danh

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-05 |
| **Use Case Name** | Quản lý trình độ, chức danh |
| **Actor** | Cán bộ TCCB |
| **Description** | Cập nhật bằng cấp, chức danh khoa học, ngạch viên chức, chức vụ cho nhân sự |
| **Trigger** | Cán bộ TCCB mở hồ sơ nhân sự |
| **Pre-conditions** | Nhân sự đã có hồ sơ trong hệ thống |
| **Post-conditions** | Thông tin trình độ được cập nhật |

**Flow of Events:**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Mở hồ sơ nhân sự | Hiển thị chi tiết hồ sơ |
| 2 | Chọn tab "Trình độ" | Hiển thị danh sách bằng cấp, chứng chỉ |
| 3 | Nhấn "Thêm bằng cấp" | Form nhập bằng cấp |
| 4 | Nhập thông tin (tên bằng, trường, năm, xếp loại) | Validate |
| 5 | Upload file scan | Lưu file |
| 6 | Nhấn "Lưu" | Cập nhật CSDL |

---

#### 1.1.10.6. UC-06: Quản lý cơ cấu tổ chức

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-06 |
| **Use Case Name** | Quản lý cơ cấu tổ chức |
| **Actor** | Cán bộ TCCB, Lãnh đạo |
| **Description** | Tạo, sửa, xóa đơn vị; phân bổ nhân sự vào đơn vị; xem sơ đồ tổ chức |
| **Trigger** | Chọn menu "Cơ cấu tổ chức" |
| **Pre-conditions** | Có quyền quản lý đơn vị |
| **Post-conditions** | Cây tổ chức được cập nhật |

**Flow of Events (Tạo đơn vị mới):**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn menu "Đơn vị" | Hiển thị cây tổ chức |
| 2 | Nhấn "Thêm đơn vị" | Form tạo đơn vị |
| 3 | Chọn đơn vị cha | Load dropdown đơn vị |
| 4 | Nhập tên, mã, ngày thành lập | Validate |
| 5 | Chọn loại đơn vị (Khoa/Phòng/Bộ môn) | - |
| 6 | Nhấn "Lưu" | Thêm vào cây tổ chức |

---

#### 1.1.10.7. UC-07: Quản lý hợp đồng lao động

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-07 |
| **Use Case Name** | Quản lý hợp đồng lao động |
| **Actor** | Cán bộ TCCB |
| **Description** | Tạo, gia hạn, chuyển đổi, in hợp đồng lao động |
| **Trigger** | Cán bộ TCCB chọn menu "Hợp đồng" hoặc từ hồ sơ nhân sự |
| **Pre-conditions** | Nhân sự đã có hồ sơ |
| **Post-conditions** | Hợp đồng được lưu, liên kết với hồ sơ nhân sự |

**Flow of Events (Tạo hợp đồng mới):**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn menu "Hợp đồng" | Hiển thị danh sách HĐ |
| 2 | Nhấn "Thêm mới" | Form tạo HĐ |
| 3 | Chọn nhân sự | Load thông tin nhân sự |
| 4 | Chọn loại HĐ (Vô hạn/Có hạn/Thử việc/Thỉnh giảng) | Hiển thị các trường tương ứng |
| 5 | Nhập số HĐ, ngày ký, ngày hiệu lực | Validate |
| 6 | Nhập nội dung công việc | - |
| 7 | Nhấn "Lưu" | Lưu HĐ vào CSDL |

**Alternative Flow:**

| Điều kiện | Xử lý |
|-----------|-------|
| Chọn "Thử việc" | Tự động tính thời gian thử việc theo ngạch |
| Chọn "Thỉnh giảng" | Hiển thị thêm trường "Số giờ giảng" |
| Gia hạn HĐ | Copy thông tin cũ, cho sửa ngày mới |
| Chuyển đổi HĐ | Đánh dấu HĐ cũ kết thúc, tạo HĐ mới |

---

#### 1.1.10.8. UC-08: Quản lý bậc lương, phụ cấp

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-08 |
| **Use Case Name** | Quản lý bậc lương, phụ cấp |
| **Actor** | Cán bộ TCCB, Cán bộ TCKT |
| **Description** | Cập nhật ngạch/bậc lương, các loại phụ cấp cho nhân sự |
| **Trigger** | Mở hồ sơ nhân sự → Tab "Lương" |
| **Pre-conditions** | Nhân sự có hợp đồng chính thức |
| **Post-conditions** | Thông tin lương được cập nhật |

**Flow of Events:**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Mở hồ sơ nhân sự | Hiển thị chi tiết |
| 2 | Chọn tab "Lương" | Hiển thị thông tin lương hiện tại |
| 3 | Nhấn "Cập nhật lương" | Form cập nhật |
| 4 | Chọn ngạch viên chức | Load bậc lương tương ứng |
| 5 | Chọn bậc (1-9) | Tự động tính hệ số |
| 6 | Nhập các phụ cấp | - |
| 7 | Nhấn "Lưu" | Lưu và lưu lịch sử lương |

---

#### 1.1.10.9. UC-09: Xem báo cáo thống kê

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-09 |
| **Use Case Name** | Xem báo cáo thống kê |
| **Actor** | Lãnh đạo (Ban Giám hiệu) |
| **Description** | Xem thống kê nhân sự theo đơn vị, xuất báo cáo PDF/Excel |
| **Trigger** | Lãnh đạo chọn menu "Báo cáo" |
| **Pre-conditions** | Có quyền xem báo cáo |
| **Post-conditions** | Báo cáo hiển thị hoặc file được tải về |

**Flow of Events:**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn menu "Báo cáo" | Hiển thị danh sách báo cáo |
| 2 | Chọn "Thống kê nhân sự" | Hiển thị form lọc |
| 3 | Chọn đơn vị, loại nhân sự | - |
| 4 | Nhấn "Xem báo cáo" | Query và hiển thị bảng thống kê |
| 5 | (Tùy chọn) Nhấn "Xuất Excel" | Tạo file và download |
| 6 | (Tùy chọn) Nhấn "Xuất PDF" | Tạo file và download |

---

#### 1.1.10.10. UC-10: Tra cứu thông tin cá nhân

| Thuộc tính | Mô tả |
|------------|-------|
| **Use Case ID** | UC-10 |
| **Use Case Name** | Tra cứu thông tin cá nhân (Self-Service) |
| **Actor** | CBGV/NV (Cán bộ, giảng viên, nhân viên) |
| **Description** | Nhân viên tự xem thông tin cá nhân, lịch sử hợp đồng, bậc lương |
| **Trigger** | CBGV/NV đăng nhập và chọn "Thông tin cá nhân" |
| **Pre-conditions** | - Đã đăng nhập<br>- Tài khoản liên kết với hồ sơ nhân sự |
| **Post-conditions** | Hiển thị thông tin chỉ đọc |

**Flow of Events:**

| Bước | Actor | Hệ thống |
|------|-------|----------|
| 1 | Chọn menu "Thông tin cá nhân" | Load hồ sơ của user hiện tại |
| 2 | - | Hiển thị thông tin cá nhân (chỉ đọc) |
| 3 | Chọn tab "Hợp đồng" | Hiển thị danh sách HĐ đã ký |
| 4 | Chọn tab "Lương" | Hiển thị ngạch/bậc, phụ cấp |
| 5 | Chọn tab "Trình độ" | Hiển thị bằng cấp, chức vụ |

**Alternative Flow:**

| Điều kiện | Xử lý |
|-----------|-------|
| Tài khoản chưa liên kết hồ sơ | Hiển thị thông báo "Vui lòng liên hệ Phòng TCCB" |

---

### 1.1.11. Các yêu cầu phi chức năng

| Mã | Loại | Yêu cầu | Giá trị mục tiêu |
|----|------|---------|------------------|
| NFR-01 | Hiệu năng | Thời gian load trang | < 2 giây |
| NFR-02 | Hiệu năng | Thời gian báo cáo | < 10 giây |
| NFR-03 | Hiệu năng | Người dùng đồng thời | 200 |
| NFR-04 | Bảo mật | Mã hóa dữ liệu nhạy cảm | AES-256 |
| NFR-05 | Bảo mật | Kết nối | HTTPS/TLS 1.3 |
| NFR-06 | Bảo mật | Session timeout | 30 phút |
| NFR-07 | Khả dụng | Uptime | 99.5% |
| NFR-08 | Khả dụng | Backup | Hàng ngày |
| NFR-09 | Pháp lý | Tuân thủ | Bộ Luật Lao động 2019 |
| NFR-10 | Pháp lý | Tuân thủ | Luật Viên chức |

---

## 1.2. Lập kế hoạch dự án

### 1.2.1. Đội phát triển dự án

| Team | Vai trò | Số lượng | Nhiệm vụ chính |
|------|---------|----------|----------------|
| Team 1 | BA/PM | 2 | Phân tích yêu cầu, quản lý dự án |
| Team 2 | SA/Design | 4 | Thiết kế hệ thống, UI/UX |
| Team 3 | Dev | 4 | Phát triển Fullstack (FE & BE) theo module |
| Team 4 | Test | 2 | Kiểm thử |
| Team 5 | Deploy | 2 | Triển khai, CI/CD |
| | **Tổng** | **14** | |

### 1.2.2. Phạm vi công việc

| Giai đoạn | Công việc | Team | Thời gian |
|-----------|-----------|------|-----------|
| Phân tích | Thu thập yêu cầu, viết SRS | Team 1 | Tuần 1-2 |
| Thiết kế | Thiết kế DB, API, UI | Team 2 | Tuần 3-4 |
| Phát triển | Code Backend, Frontend | Team 3 | Tuần 5-6 |
| Kiểm thử | Test, fix bugs | Team 4 | Tuần 7-8 |
| Triển khai | Deploy, tài liệu | Team 5 | Tuần 8 |

### 1.2.3. Ước lượng chi phí (Function Point)

| Loại | Số lượng | FP |
|------|----------|-----|
| External Inputs (EI) | 8 | 34 |
| External Outputs (EO) | 4 | 26 |
| External Inquiries (EQ) | 4 | 14 |
| Internal Logical Files (ILF) | 6 | 70 |
| External Interface Files (EIF) | 2 | 10 |
| **Tổng UFP** | | **154** |

AFP = 154 × 1.09 = **168 FP**

### 1.2.4. Kế hoạch thời gian (Gantt)

```
Tuần      | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
----------|---|---|---|---|---|---|---|---|
Phân tích |███|███|   |   |   |   |   |   |
Thiết kế  |   |   |███|███|   |   |   |   |
Phát triển|   |   |   |   |███|███|   |   |
Kiểm thử  |   |   |   |   |   |   |███|███|
Triển khai|   |   |   |   |   |   |   |███|
```

*(Hình 1.10: Biểu đồ Gantt - Cần bổ sung)*

### 1.2.5. Quản trị rủi ro

| Rủi ro | Xác suất | Tác động | Biện pháp |
|--------|----------|----------|-----------|
| Yêu cầu thay đổi | Cao | Cao | Freeze requirements sau tuần 2 |
| Thành viên bận | Trung bình | Trung bình | Tài liệu hóa, pair work |
| Conflict code | Cao | Thấp | Branching strategy |
| Bug nhiều | Trung bình | Cao | Unit test sớm |
| Thiếu thời gian | Cao | Cao | Buffer 20% thời gian |

---

## Tổng kết Chương 1

| Tiêu chí | Giá trị |
|----------|---------|
| Tổng số STRQ | **118** |
| Tổng số FEAT | **62** |
| Số module | **8** |
| Số Use Case | **10** |
| Function Points | **168 FP** |
| Thời gian | **8 tuần (Phase 1)** |
| Nhân lực | **14 người** |

---

> **Ghi chú:** Các hình ảnh (Biểu đồ Use Case, Sequence Diagram, Gantt Chart) cần được bổ sung bằng công cụ vẽ (Draw.io, Lucidchart, PlantUML).
