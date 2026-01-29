# CHƯƠNG 1. THU THẬP YÊU CẦU VÀ LẬP KẾ HOẠCH

## 1.1. Bản kế hoạch quản lý yêu cầu

### 1.1.1. Giới thiệu

Hệ thống Quản lý Nhân sự (HRMS - Human Resource Management System) là giải pháp phần mềm toàn diện được xây dựng nhằm hỗ trợ công tác quản lý nhân sự tại Trường Đại học Thủy lợi. Hệ thống giúp số hóa và tự động hóa các quy trình nghiệp vụ liên quan đến quản lý hồ sơ cán bộ, giảng viên, nhân viên từ khi tuyển dụng đến khi nghỉ hưu.

**Bối cảnh thực hiện:**
- Trường Đại học Thủy lợi hiện có khoảng 1.200 cán bộ, giảng viên, nhân viên làm việc tại 3 cơ sở: Hà Nội, Phố Hiến (Hưng Yên) và TP. Hồ Chí Minh.
- Công tác quản lý nhân sự hiện tại chủ yếu dựa trên hồ sơ giấy và các file Excel rời rạc, gây khó khăn trong việc tra cứu, thống kê và báo cáo.
- Nhu cầu cấp thiết về một hệ thống tập trung để quản lý toàn bộ thông tin nhân sự một cách khoa học và hiệu quả.

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
- Quản lý Tuyển dụng
- Quản lý Đào tạo
- Quản lý Chấm công
- Quản lý Nghiên cứu khoa học
- Quản lý Giờ giảng
- Đánh giá viên chức
- Tính lương tự động

### 1.1.4. Công nghệ sử dụng

| Thành phần | Công nghệ | Phiên bản | Lý do lựa chọn |
|------------|-----------|-----------|----------------|
| **Frontend** | React.js | 18.x | SPA, hiệu năng cao, cộng đồng lớn |
| **Backend** | Spring Boot | 3.x | Java ecosystem, bảo mật tốt |
| **Database** | PostgreSQL | 15.x | Open source, hỗ trợ JSON, full-text search |
| **ORM** | Hibernate | 6.x | JPA standard, mapping linh hoạt |
| **Authentication** | Spring Security + JWT | - | Stateless, phù hợp microservices |
| **API Docs** | Swagger/OpenAPI | 3.0 | Tạo tài liệu API tự động |
| **Build Tool** | Maven | 3.9.x | Quản lý dependencies chuẩn |
| **Version Control** | Git + GitHub | - | Quản lý source code |
| **CI/CD** | GitHub Actions | - | Tự động build, test, deploy |
| **Containerization** | Docker | - | Đóng gói ứng dụng |

**Kiến trúc hệ thống:**

```
[Browser] → [React SPA] → [Spring Boot API] → [PostgreSQL]
                ↓
         [JWT Auth]
```

*(Hình 1.1: Sơ đồ kiến trúc tổng quan - Cần bổ sung)*

### 1.1.5. Các nhân tố tham gia (Stakeholders)

#### 1.1.5.1. Người dùng hệ thống

| STT | Vai trò | Đơn vị | Mô tả | Số lượng ước tính |
|-----|---------|--------|-------|-------------------|
| 1 | Quản trị hệ thống | Phòng CNTT | Quản trị, phân quyền, backup | 2-3 người |
| 2 | Cán bộ TCCB | Phòng TCCB | Quản lý hồ sơ nhân sự | 5-10 người |
| 3 | Cán bộ TCKT | Phòng TCKT | Quản lý lương, phụ cấp | 3-5 người |
| 4 | Lãnh đạo | Ban Giám hiệu | Phê duyệt, xem báo cáo | 5-10 người |
| 5 | Trưởng đơn vị | Khoa/Phòng/Ban | Quản lý nhân sự đơn vị | 30-50 người |
| 6 | CBGV/NV | Toàn trường | Tra cứu, cập nhật thông tin cá nhân | ~1.200 người |

#### 1.1.5.2. Các bên liên quan khác

| STT | Bên liên quan | Vai trò | Tương tác với hệ thống |
|-----|---------------|---------|------------------------|
| 1 | Bộ Nông nghiệp và Môi trường | Cơ quan chủ quản | Nhận báo cáo định kỳ |
| 2 | Bộ Giáo dục và Đào tạo | Quản lý ngành | Báo cáo theo mẫu |
| 3 | Cơ quan Bảo hiểm xã hội | Đối tác | Đối chiếu dữ liệu BHXH |
| 4 | Cơ quan Thuế | Đối tác | Kê khai thuế TNCN |

### 1.1.6. Mô tả yêu cầu khách hàng, người dùng (Needs)

*(Nội dung chi tiết đã có trong file user_requirements_mvp.md - Phần 2)*

**Tóm tắt các nhóm yêu cầu chính:**

| STT | Nhóm yêu cầu | Số lượng Needs | Đối tượng chính |
|-----|--------------|----------------|-----------------|
| 1 | Quản lý Tài khoản & Phân quyền | 14 | Phòng CNTT |
| 2 | Quản lý Hồ sơ Nhân sự | 36 | Phòng TCCB |
| 3 | Quản lý Trình độ, Chức danh | 16 | Phòng TCCB |
| 4 | Quản lý Cơ cấu Tổ chức | 14 | Ban Giám hiệu |
| 5 | Quản lý Hợp đồng Lao động | 17 | Phòng TCCB |
| 6 | Quản lý Bậc lương | 12 | Phòng TCCB, TCKT |
| 7 | Báo cáo Thống kê | 4 | Ban Giám hiệu |
| 8 | Self-Service Portal | 5 | CBGV/NV |
| | **Tổng cộng** | **119 Needs** | |

### 1.1.7. Thu thập yêu cầu từ các Stakeholders (Xác định STRQ, FEAT)

*(Nội dung chi tiết đã có trong file user_requirements_mvp.md - Phần 2 và 3)*

**Phương pháp thu thập yêu cầu:**

| Phương pháp | Mô tả | Đối tượng áp dụng |
|-------------|-------|-------------------|
| Phỏng vấn trực tiếp | Trao đổi 1-1 với người dùng | Lãnh đạo, Trưởng phòng |
| Brainstorming | Họp nhóm đề xuất ý tưởng | Cán bộ nghiệp vụ |
| Phân tích tài liệu | Nghiên cứu quy trình hiện tại | Biểu mẫu, văn bản |
| Quan sát | Theo dõi quy trình thực tế | Phòng TCCB |

**Bảng tổng hợp STRQ → FEAT:**

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
| **Tổng cộng** | **119** | **62** |

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
| 6 | CBGV/NV (Người dùng cuối) | Toàn trường | Tra cứu thông tin cá nhân |

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

##### 1.1.8.2.1. Biểu đồ Use Case tổng quát

*(Hình 1.2: Biểu đồ Use Case tổng quát - Cần bổ sung)*

```
+--------------------------------------------------+
|               HỆ THỐNG HRMS                       |
|                                                   |
|  [UC-01: Đăng nhập/Đăng xuất]                    |
|  [UC-02: Quản lý tài khoản]                      |
|  [UC-03: Phân quyền]                             |
|  [UC-04: Quản lý hồ sơ nhân sự]                  |
|  [UC-05: Quản lý trình độ, chức danh]            |
|  [UC-06: Quản lý cơ cấu tổ chức]                 |
|  [UC-07: Quản lý hợp đồng]                       |
|  [UC-08: Quản lý bậc lương]                      |
|  [UC-09: Xem báo cáo]                            |
|  [UC-10: Tra cứu thông tin cá nhân]              |
|                                                   |
+--------------------------------------------------+
      ↑        ↑        ↑         ↑         ↑
    Admin   TCCB     TCKT     Lãnh đạo   CBGV/NV
```

##### 1.1.8.2.2. Phân rã Use Case theo tác nhân

###### 1.1.8.2.2.1. Phân rã Use Case theo Quản trị viên (Admin)

*(Hình 1.3: Use Case Admin - Cần bổ sung)*

| UC | Tên | Mô tả |
|----|-----|-------|
| UC-01 | Đăng nhập/Đăng xuất | Xác thực vào hệ thống |
| UC-02.1 | Tạo tài khoản | Tạo mới tài khoản cho người dùng |
| UC-02.2 | Sửa tài khoản | Cập nhật thông tin tài khoản |
| UC-02.3 | Khóa/Mở khóa tài khoản | Vô hiệu hóa tài khoản |
| UC-02.4 | Reset mật khẩu | Đặt lại mật khẩu cho người dùng |
| UC-03.1 | Tạo vai trò | Tạo role mới trong hệ thống |
| UC-03.2 | Phân quyền chức năng | Gán quyền cho role |
| UC-03.3 | Gán vai trò cho người dùng | Gán role cho tài khoản |

###### 1.1.8.2.2.2. Phân rã Use Case theo Cán bộ TCCB

*(Hình 1.4: Use Case Cán bộ TCCB - Cần bổ sung)*

| UC | Tên | Mô tả |
|----|-----|-------|
| UC-04.1 | Tạo hồ sơ nhân sự | Nhập thông tin nhân sự mới |
| UC-04.2 | Sửa hồ sơ nhân sự | Cập nhật thông tin |
| UC-04.3 | Tìm kiếm hồ sơ | Tìm theo nhiều tiêu chí |
| UC-04.4 | Xuất hồ sơ | Xuất PDF, Excel, Word |
| UC-05.1 | Quản lý bằng cấp | CRUD bằng cấp |
| UC-05.2 | Quản lý chứng chỉ | CRUD chứng chỉ |
| UC-05.3 | Quản lý chức vụ | Bổ nhiệm/Miễn nhiệm |
| UC-06.1 | Quản lý đơn vị | CRUD đơn vị |
| UC-06.2 | Phân bổ nhân sự | Gán nhân viên vào đơn vị |
| UC-07.1 | Tạo hợp đồng | Lập HĐ mới |
| UC-07.2 | Gia hạn hợp đồng | Gia hạn HĐ thỉnh giảng |
| UC-07.3 | Chuyển đổi hợp đồng | Thử việc → Chính thức |
| UC-07.4 | In hợp đồng | Xuất HĐ theo mẫu |

###### 1.1.8.2.2.3. Phân rã Use Case theo Lãnh đạo

*(Hình 1.5: Use Case Lãnh đạo - Cần bổ sung)*

| UC | Tên | Mô tả |
|----|-----|-------|
| UC-09.1 | Xem thống kê nhân sự | Thống kê theo đơn vị |
| UC-09.2 | Xuất báo cáo | Xuất PDF, Excel |
| UC-06.3 | Xem sơ đồ tổ chức | Xem cây đơn vị |

###### 1.1.8.2.2.4. Phân rã Use Case theo CBGV/NV

*(Hình 1.6: Use Case CBGV/NV - Cần bổ sung)*

| UC | Tên | Mô tả |
|----|-----|-------|
| UC-01 | Đăng nhập/Đăng xuất | Xác thực |
| UC-10.1 | Xem thông tin cá nhân | Xem hồ sơ của mình |
| UC-10.2 | Xem lịch sử hợp đồng | Xem các HĐ đã ký |
| UC-10.3 | Xem thông tin lương | Xem ngạch/bậc, phụ cấp |
| UC-01.3 | Đổi mật khẩu | Tự đổi mật khẩu |

### 1.1.9. Các yêu cầu ràng buộc cụ thể

#### 1.1.9.1. Các yêu cầu về giao diện

| STT | Yêu cầu | Mô tả |
|-----|---------|-------|
| UI-01 | Ngôn ngữ | Giao diện tiếng Việt 100% |
| UI-02 | Responsive | Hiển thị tốt trên Desktop, Tablet, Mobile |
| UI-03 | Trình duyệt | Hỗ trợ Chrome, Firefox, Edge, Safari |
| UI-04 | Accessibility | Tuân thủ WCAG 2.1 Level AA |
| UI-05 | Theme | Hỗ trợ Light/Dark mode |
| UI-06 | Font | Sử dụng font tiếng Việt chuẩn (Roboto, Open Sans) |

#### 1.1.9.2. Các yêu cầu về chức năng

| STT | Yêu cầu | Mô tả |
|-----|---------|-------|
| FN-01 | Validate dữ liệu | Kiểm tra tính hợp lệ trước khi lưu |
| FN-02 | Soft delete | Không xóa vật lý, chỉ đánh dấu inactive |
| FN-03 | Audit log | Ghi lại mọi thao tác quan trọng |
| FN-04 | Sinh mã tự động | Mã cán bộ, mã HĐ tự động |
| FN-05 | Cảnh báo | Thông báo HĐ/Chứng chỉ sắp hết hạn |
| FN-06 | Xuất file | Hỗ trợ PDF, Excel, Word |
| FN-07 | Danh mục phân cấp | Quốc gia → Tỉnh → Huyện |

#### 1.1.9.3. Các yêu cầu bổ sung

| STT | Yêu cầu | Mô tả |
|-----|---------|-------|
| AD-01 | Đa cơ sở | Quản lý 3 cơ sở: Hà Nội, Phố Hiến, TP.HCM |
| AD-02 | Kiêm nhiệm | Một người có thể giữ nhiều chức vụ |
| AD-03 | Lịch sử đơn vị | Lưu thành lập/sáp nhập/giải thể |
| AD-04 | Hiển thị học hàm | Format: PGS.TS. Nguyễn Văn A |
| AD-05 | Lưu trữ 10 năm | Dữ liệu lưu tối thiểu 10 năm |

#### 1.1.9.4. Các yêu cầu khác

| STT | Yêu cầu | Mô tả |
|-----|---------|-------|
| OT-01 | Tài liệu | Có hướng dẫn sử dụng đầy đủ |
| OT-02 | Đào tạo | Người dùng thành thạo sau 4h |
| OT-03 | Backup | Backup dữ liệu hàng ngày |
| OT-04 | Recovery | Khôi phục trong 4h nếu sự cố |

### 1.1.10. Luồng sự kiện cho các Use Case chính

#### 1.1.10.1. UC-04.1: Tạo hồ sơ nhân sự mới

**Mô tả:** Cán bộ TCCB tạo mới hồ sơ cho nhân sự vừa được tuyển dụng.

**Actor:** Cán bộ TCCB

**Tiền điều kiện:** 
- Cán bộ TCCB đã đăng nhập hệ thống
- Có quyền truy cập module Quản lý Hồ sơ

**Luồng sự kiện chính:**

| Bước | Hành động của Actor | Phản hồi của hệ thống |
|------|--------------------|-----------------------|
| 1 | Chọn menu "Hồ sơ nhân sự" | Hiển thị danh sách hồ sơ |
| 2 | Nhấn nút "Thêm mới" | Hiển thị form nhập hồ sơ |
| 3 | Nhập thông tin cá nhân (họ tên, ngày sinh, CCCD...) | Validate dữ liệu real-time |
| 4 | Nhập thông tin liên hệ (địa chỉ, SĐT, email) | Validate định dạng |
| 5 | Nhập thông tin gia đình (hôn nhân, người phụ thuộc) | Validate |
| 6 | Upload ảnh chân dung | Kiểm tra định dạng, kích thước |
| 7 | Nhấn nút "Lưu" | Validate toàn bộ, sinh mã cán bộ tự động |
| 8 | - | Lưu vào CSDL, hiển thị thông báo thành công |

**Luồng sự kiện thay thế:**

| Bước | Điều kiện | Xử lý |
|------|-----------|-------|
| 3a | CCCD đã tồn tại | Hiển thị lỗi "CCCD đã được sử dụng" |
| 6a | File quá lớn (>5MB) | Hiển thị lỗi "File vượt quá 5MB" |
| 7a | Thiếu trường bắt buộc | Highlight các trường lỗi |

**Hậu điều kiện:**
- Hồ sơ nhân sự mới được tạo thành công
- Mã cán bộ được sinh tự động
- Log ghi nhận thao tác

*(Hình 1.7: Sequence Diagram - Tạo hồ sơ nhân sự - Cần bổ sung)*

---

#### 1.1.10.2. UC-07.1: Tạo hợp đồng lao động

**Mô tả:** Cán bộ TCCB tạo hợp đồng lao động cho nhân sự.

**Actor:** Cán bộ TCCB

**Tiền điều kiện:**
- Cán bộ TCCB đã đăng nhập
- Nhân sự đã có hồ sơ trong hệ thống

**Luồng sự kiện chính:**

| Bước | Hành động của Actor | Phản hồi của hệ thống |
|------|--------------------|-----------------------|
| 1 | Chọn menu "Hợp đồng lao động" | Hiển thị danh sách HĐ |
| 2 | Nhấn nút "Thêm mới" | Hiển thị form tạo HĐ |
| 3 | Chọn nhân sự từ danh sách | Load thông tin nhân sự |
| 4 | Chọn loại hợp đồng | Hiển thị các trường tương ứng |
| 5 | Nhập thông tin HĐ (số HĐ, ngày ký, ngày hiệu lực...) | Validate |
| 6 | Nhập nội dung công việc | - |
| 7 | Nhấn "Lưu" | Lưu HĐ, hiển thị thông báo |

**Luồng thay thế:**

| Bước | Điều kiện | Xử lý |
|------|-----------|-------|
| 4a | Chọn "Thử việc" | Tự động tính thời gian thử việc theo ngạch |
| 4b | Chọn "Thỉnh giảng" | Hiển thị thêm trường "Số giờ giảng" |

*(Hình 1.8: Sequence Diagram - Tạo hợp đồng - Cần bổ sung)*

---

#### 1.1.10.3. UC-01: Đăng nhập hệ thống

**Mô tả:** Người dùng đăng nhập vào hệ thống.

**Actor:** Tất cả người dùng

**Tiền điều kiện:** Người dùng có tài khoản hợp lệ

**Luồng sự kiện chính:**

| Bước | Hành động của Actor | Phản hồi của hệ thống |
|------|--------------------|-----------------------|
| 1 | Truy cập URL hệ thống | Hiển thị trang đăng nhập |
| 2 | Nhập tên đăng nhập | - |
| 3 | Nhập mật khẩu | - |
| 4 | Nhấn "Đăng nhập" | Xác thực thông tin |
| 5 | - | Chuyển đến trang chủ theo vai trò |

**Luồng thay thế:**

| Bước | Điều kiện | Xử lý |
|------|-----------|-------|
| 4a | Sai mật khẩu | Hiển thị lỗi, tăng số lần thử |
| 4b | Sai 5 lần liên tiếp | Khóa tài khoản 15 phút |
| 4c | Tài khoản bị khóa | Hiển thị thông báo liên hệ Admin |

*(Hình 1.9: Sequence Diagram - Đăng nhập - Cần bổ sung)*

---

#### 1.1.10.4. UC-09.1: Xem thống kê nhân sự

**Mô tả:** Lãnh đạo xem báo cáo thống kê nhân sự.

**Actor:** Lãnh đạo

**Luồng sự kiện chính:**

| Bước | Hành động của Actor | Phản hồi của hệ thống |
|------|--------------------|-----------------------|
| 1 | Chọn menu "Báo cáo" | Hiển thị danh sách báo cáo |
| 2 | Chọn "Thống kê nhân sự" | Hiển thị form lọc |
| 3 | Chọn tiêu chí (đơn vị, loại nhân sự...) | - |
| 4 | Nhấn "Xem báo cáo" | Hiển thị bảng thống kê |
| 5 | (Tùy chọn) Nhấn "Xuất Excel" | Tải file Excel |

*(Hình 1.10: Sequence Diagram - Xem thống kê - Cần bổ sung)*

### 1.1.11. Các yêu cầu phi chức năng

#### 1.1.11.1. Danh sách yêu cầu phi chức năng

| Mã | Loại | Yêu cầu |
|----|------|---------|
| NFR-01 | Hiệu năng | Trang thông thường load < 2 giây |
| NFR-02 | Hiệu năng | Báo cáo phức tạp < 10 giây |
| NFR-03 | Hiệu năng | Hỗ trợ 200 người dùng đồng thời |
| NFR-04 | Bảo mật | Mã hóa dữ liệu nhạy cảm (AES-256) |
| NFR-05 | Bảo mật | HTTPS cho toàn bộ kết nối |
| NFR-06 | Bảo mật | Ghi log tất cả thao tác quan trọng |
| NFR-07 | Bảo mật | Session timeout sau 30 phút không hoạt động |
| NFR-08 | Khả dụng | Uptime 99.5% (trong giờ hành chính) |
| NFR-09 | Khả dụng | Backup dữ liệu hàng ngày |
| NFR-10 | Mở rộng | Kiến trúc module hóa, dễ thêm tính năng |
| NFR-11 | Pháp lý | Tuân thủ Bộ Luật Lao động 2019 |
| NFR-12 | Pháp lý | Tuân thủ Luật Viên chức |

#### 1.1.11.2. Bảng đo các yêu cầu phi chức năng

| Mã | Yêu cầu | Thang đo | Giá trị mục tiêu | Cách đo |
|----|---------|----------|------------------|---------|
| NFR-01 | Thời gian load trang | Giây | < 2s | Performance testing |
| NFR-02 | Thời gian báo cáo | Giây | < 10s | Performance testing |
| NFR-03 | Người dùng đồng thời | Số lượng | 200 | Load testing |
| NFR-04 | Mã hóa dữ liệu | Thuật toán | AES-256 | Code review |
| NFR-05 | Kết nối bảo mật | Giao thức | HTTPS/TLS 1.3 | Security scan |
| NFR-08 | Uptime | Phần trăm | 99.5% | Monitoring |

---

## 1.2. Lập kế hoạch dự án

### 1.2.1. Đội phát triển dự án

| STT | Vai trò | Số lượng | Nhiệm vụ chính |
|-----|---------|----------|----------------|
| 1 | PM (Project Manager) | 1 | Quản lý dự án, điều phối |
| 2 | BA (Business Analyst) | 2 | Phân tích yêu cầu, viết SRS |
| 3 | SA (System Analyst) | 2 | Thiết kế hệ thống, kiến trúc |
| 4 | UI/UX Designer | 1 | Thiết kế giao diện |
| 5 | Backend Developer | 3 | Phát triển API, logic |
| 6 | Frontend Developer | 2 | Phát triển giao diện |
| 7 | Tester (QA) | 2 | Kiểm thử, đảm bảo chất lượng |
| 8 | DevOps | 1 | Triển khai, CI/CD |
| | **Tổng cộng** | **14** | |

**Phân công theo Team:**

| Team | Thành viên | Tuần 1-2 | Tuần 3-4 | Tuần 5-6 | Tuần 7-8 |
|------|------------|----------|----------|----------|----------|
| Team 1 (BA) | 3 | Phân tích | Review | Hỗ trợ Test | Tài liệu |
| Team 2 (Design) | 3 | Thiết kế | Review | Hỗ trợ Test | Tài liệu |
| Team 3 (Dev) | 5 | - | Code | Code | Fix bugs |
| Team 4 (Test) | 2 | - | - | Test | Test |
| Team 5 (Deploy) | 1 | - | - | - | Deploy |

### 1.2.2. Quy định phạm vi dự án

#### 1.2.2.1. Phạm vi công việc

##### 1.2.2.1.1. Phạm vi công việc phân tích yêu cầu (Team 1)

| STT | Công việc | Đầu ra | Thời gian |
|-----|-----------|--------|-----------|
| 1 | Khảo sát nghiệp vụ | Biên bản khảo sát | Tuần 1 |
| 2 | Thu thập yêu cầu | Danh sách STRQ | Tuần 1 |
| 3 | Phân tích yêu cầu | Tài liệu SRS | Tuần 2 |
| 4 | Vẽ Use Case Diagram | Biểu đồ UC | Tuần 2 |
| 5 | Viết luồng sự kiện | Event flow | Tuần 2 |

##### 1.2.2.1.2. Phạm vi công việc thiết kế (Team 2)

| STT | Công việc | Đầu ra | Thời gian |
|-----|-----------|--------|-----------|
| 1 | Thiết kế kiến trúc | Architecture Diagram | Tuần 3 |
| 2 | Thiết kế CSDL | ERD, DBML | Tuần 3 |
| 3 | Thiết kế API | API Spec (OpenAPI) | Tuần 3-4 |
| 4 | Thiết kế UI/UX | Wireframe, Mockup | Tuần 3-4 |
| 5 | Review thiết kế | Checklist | Tuần 4 |

##### 1.2.2.1.3. Phạm vi công việc lập trình (Team 3)

| STT | Công việc | Đầu ra | Thời gian |
|-----|-----------|--------|-----------|
| 1 | Setup project, CI/CD | Repo, pipeline | Tuần 4 |
| 2 | Phát triển Backend | API endpoints | Tuần 5-6 |
| 3 | Phát triển Frontend | UI components | Tuần 5-6 |
| 4 | Tích hợp | Hệ thống hoàn chỉnh | Tuần 7 |
| 5 | Fix bugs | Bug-free code | Tuần 8 |

##### 1.2.2.1.4. Phạm vi công việc kiểm thử (Team 4)

| STT | Công việc | Đầu ra | Thời gian |
|-----|-----------|--------|-----------|
| 1 | Viết Test Plan | Test Plan | Tuần 4 |
| 2 | Viết Test Case | Test Cases | Tuần 5 |
| 3 | Thực hiện Unit Test | Test Report | Tuần 6 |
| 4 | Thực hiện Integration Test | Test Report | Tuần 7 |
| 5 | UAT (User Acceptance Test) | UAT Report | Tuần 8 |

##### 1.2.2.1.5. Phạm vi công việc triển khai (Team 5)

| STT | Công việc | Đầu ra | Thời gian |
|-----|-----------|--------|-----------|
| 1 | Chuẩn bị môi trường | Server, Docker | Tuần 7 |
| 2 | Deploy staging | Staging environment | Tuần 7 |
| 3 | Deploy production | Production environment | Tuần 8 |
| 4 | Viết tài liệu | User manual | Tuần 8 |

#### 1.2.2.2. Phạm vi tài nguyên

| Tài nguyên | Chi tiết | Ghi chú |
|------------|----------|---------|
| Nhân lực | 14 người | Sinh viên, 8h/tuần/người |
| Thời gian | 8 tuần | Phase 1 (MVP) |
| Server | 1 VPS (4 CPU, 8GB RAM) | Development + Staging |
| Database | PostgreSQL 15 | Managed hoặc Docker |
| Source control | GitHub | Private repo |
| CI/CD | GitHub Actions | Free tier |
| Domain | hrms.tlu.edu.vn | Ví dụ |

### 1.2.3. Ước lượng chi phí dự án

#### 1.2.3.1. Function Point Analysis

##### 1.2.3.1.1. Tính toán UFP (Unadjusted Function Points)

**External Inputs (EI):**

| STT | Chức năng | Độ phức tạp | FP |
|-----|-----------|-------------|-----|
| 1 | Thêm hồ sơ nhân sự | Cao | 6 |
| 2 | Sửa hồ sơ nhân sự | Trung bình | 4 |
| 3 | Thêm hợp đồng | Cao | 6 |
| 4 | Sửa hợp đồng | Trung bình | 4 |
| 5 | Thêm đơn vị | Thấp | 3 |
| 6 | Phân bổ nhân sự | Trung bình | 4 |
| 7 | Tạo tài khoản | Trung bình | 4 |
| 8 | Đăng nhập | Thấp | 3 |
| | **Tổng EI** | | **34** |

**External Outputs (EO):**

| STT | Chức năng | Độ phức tạp | FP |
|-----|-----------|-------------|-----|
| 1 | Xuất hồ sơ PDF | Cao | 7 |
| 2 | Xuất hồ sơ Excel | Trung bình | 5 |
| 3 | In hợp đồng | Cao | 7 |
| 4 | Báo cáo thống kê | Cao | 7 |
| | **Tổng EO** | | **26** |

**External Inquiries (EQ):**

| STT | Chức năng | Độ phức tạp | FP |
|-----|-----------|-------------|-----|
| 1 | Tìm kiếm hồ sơ | Trung bình | 4 |
| 2 | Xem chi tiết hồ sơ | Thấp | 3 |
| 3 | Xem sơ đồ tổ chức | Trung bình | 4 |
| 4 | Xem thông tin cá nhân | Thấp | 3 |
| | **Tổng EQ** | | **14** |

**Internal Logical Files (ILF):**

| STT | File | Độ phức tạp | FP |
|-----|------|-------------|-----|
| 1 | Employee | Cao | 15 |
| 2 | Contract | Cao | 15 |
| 3 | Organization_Unit | Trung bình | 10 |
| 4 | User_Account | Trung bình | 10 |
| 5 | Qualification | Trung bình | 10 |
| 6 | Salary | Trung bình | 10 |
| | **Tổng ILF** | | **70** |

**External Interface Files (EIF):**

| STT | File | Độ phức tạp | FP |
|-----|------|-------------|-----|
| 1 | Danh mục Quốc gia | Thấp | 5 |
| 2 | Danh mục Tỉnh/TP | Thấp | 5 |
| | **Tổng EIF** | | **10** |

**Tổng UFP = 34 + 26 + 14 + 70 + 10 = 154 FP**

##### 1.2.3.1.2. Tính toán AFP (Adjusted Function Points)

**Value Adjustment Factor (VAF):**

| STT | Yếu tố | Giá trị (0-5) |
|-----|--------|---------------|
| 1 | Data communications | 4 |
| 2 | Distributed data processing | 2 |
| 3 | Performance | 3 |
| 4 | Heavily used configuration | 2 |
| 5 | Transaction rate | 2 |
| 6 | Online data entry | 5 |
| 7 | End-user efficiency | 4 |
| 8 | Online update | 4 |
| 9 | Complex processing | 3 |
| 10 | Reusability | 3 |
| 11 | Installation ease | 3 |
| 12 | Operational ease | 3 |
| 13 | Multiple sites | 2 |
| 14 | Facilitate change | 4 |
| | **Tổng TDI** | **44** |

**VAF = 0.65 + (TDI × 0.01) = 0.65 + 0.44 = 1.09**

**AFP = UFP × VAF = 154 × 1.09 = 168 FP**

#### 1.2.3.2. COCOMO II Estimation

**Giả định:**
- SLOC/FP = 50 (Java/Spring Boot)
- SLOC = 168 × 50 = 8,400 SLOC = 8.4 KLOC

**Basic COCOMO:**
- Effort = a × (KLOC)^b
- Với dự án Semi-detached: a = 3.0, b = 1.12
- Effort = 3.0 × (8.4)^1.12 = **32 person-months**

**Với 14 người, 8h/tuần:**
- Tổng giờ = 14 × 8 × 8 tuần = 896 giờ
- = 896 / 160 = **5.6 person-months** thực tế

**Kết luận:** Với scope MVP đã rút gọn, dự án **KHẢN THI** trong 8 tuần với 14 người.

### 1.2.4. Kế hoạch thời gian dự án

#### 1.2.4.1. Các đầu mục công việc chính

| STT | Công việc | Bắt đầu | Kết thúc | Thời lượng |
|-----|-----------|---------|----------|------------|
| 1 | Phân tích yêu cầu | Tuần 1 | Tuần 2 | 2 tuần |
| 2 | Thiết kế hệ thống | Tuần 3 | Tuần 4 | 2 tuần |
| 3 | Phát triển Backend | Tuần 5 | Tuần 6 | 2 tuần |
| 4 | Phát triển Frontend | Tuần 5 | Tuần 6 | 2 tuần |
| 5 | Kiểm thử | Tuần 7 | Tuần 8 | 2 tuần |
| 6 | Triển khai | Tuần 8 | Tuần 8 | 1 tuần |

#### 1.2.4.2. Ước lượng thời gian theo PERT

| Công việc | Optimistic (O) | Most Likely (M) | Pessimistic (P) | Expected (E) |
|-----------|----------------|-----------------|-----------------|--------------|
| Phân tích | 1.5 tuần | 2 tuần | 3 tuần | 2.1 tuần |
| Thiết kế | 1.5 tuần | 2 tuần | 3 tuần | 2.1 tuần |
| Dev Backend | 1.5 tuần | 2 tuần | 3 tuần | 2.1 tuần |
| Dev Frontend | 1.5 tuần | 2 tuần | 3 tuần | 2.1 tuần |
| Kiểm thử | 1 tuần | 2 tuần | 3 tuần | 2.0 tuần |
| Triển khai | 0.5 tuần | 1 tuần | 2 tuần | 1.1 tuần |

*E = (O + 4M + P) / 6*

#### 1.2.4.3. Biểu đồ Gantt

*(Hình 1.11: Biểu đồ Gantt - Cần bổ sung)*

```
Tuần      | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
----------|---|---|---|---|---|---|---|---|
Phân tích |███|███|   |   |   |   |   |   |
Thiết kế  |   |   |███|███|   |   |   |   |
Backend   |   |   |   |   |███|███|   |   |
Frontend  |   |   |   |   |███|███|   |   |
Kiểm thử  |   |   |   |   |   |   |███|███|
Triển khai|   |   |   |   |   |   |   |███|
```

### 1.2.5. Quản trị rủi ro

| STT | Rủi ro | Xác suất | Tác động | Biện pháp phòng ngừa | Biện pháp khắc phục |
|-----|--------|----------|----------|---------------------|---------------------|
| 1 | Yêu cầu thay đổi giữa chừng | Cao | Cao | Freeze requirements sau tuần 2 | Đánh giá impact, thương lượng |
| 2 | Thành viên nghỉ học/bận | Trung bình | Trung bình | Tài liệu hóa mọi thứ, pair work | Phân công lại |
| 3 | Conflict code (Git) | Cao | Thấp | Branching strategy, code review | Resolve conflict kịp thời |
| 4 | Bug nhiều khi test | Trung bình | Cao | Unit test sớm, TDD | Tăng ca fix bug |
| 5 | Server sập | Thấp | Cao | Backup hàng ngày | Restore từ backup |
| 6 | Thiếu thời gian | Cao | Cao | Buffer 20% thời gian | Cắt bớt scope |

---

> **Ghi chú:** Các hình ảnh (Biểu đồ Use Case, Sequence Diagram, Gantt Chart) cần được bổ sung riêng bằng công cụ vẽ (Draw.io, Lucidchart, PlantUML).
