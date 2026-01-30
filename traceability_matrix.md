# Traceability Matrix - HRMS Project

**Dự án:** Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi  
**Tài liệu:** Danh sách Nhu cầu (Needs) ↔ Use Case Specifications  
**Ngày cập nhật:** 30/01/2026  
**Tổng số Needs:** 180  
**Tổng số Use Cases:** 27

---

## 1. Tổng quan Trạng thái

| Metric | Số lượng |
|--------|----------|
| Tổng số Needs | 180 |
| Needs được bao phủ bởi Use Cases | 170 |
| Needs chưa có Use Case | 10 |
| Use Cases đã tạo | 27 |
| Use Cases đã xóa trong quá trình | 5 |
| Use Cases mới tạo | 4 |

---

## 2. Danh sách Use Cases

### 2.1 Use Cases Hiện tại (27 use cases)

| STT | Mã Use Case | Tên | Module | Trạng thái |
|-----|------------|-----|--------|-----------|
| 1 | UC-SYS-001 | Đăng nhập | Quản trị hệ thống | ✅ Giữ nguyên |
| 2 | UC-SYS-002 | Đăng xuất | Quản trị hệ thống | ✅ Giữ nguyên |
| 3 | UC-SYS-003 | Quản lý Người dùng | Quản trị hệ thống | ✅ Giữ nguyên |
| 4 | UC-SYS-004 | Phân quyền Người dùng | Quản trị hệ thống | 🆕 **MỚI** |
| 5 | UC-CFG-001 | Cấu hình Lương và Phụ cấp | Cấu hình | ✅ Giữ nguyên |
| 6 | UC-CFG-002 | Cấu hình Hợp đồng | Cấu hình | ✅ Giữ nguyên |
| 7 | UC-CFG-003 | Quản lý Danh mục Dùng chung | Cấu hình | ✅ Giữ nguyên |
| 8 | UC-CFG-004 | Cấu hình Danh mục Khen thưởng & Kỷ luật | Cấu hình | 🆕 **MỚI** |
| 9 | UC-CFG-007 | Cấu hình Loại Khóa đào tạo | Cấu hình | 🆕 **MỚI** |
| 10 | UC-HRM-001 | Quản lý Hồ sơ Nhân sự | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 11 | UC-HRM-002 | Quản lý Trình độ và Chức danh | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 12 | UC-HRM-003 | Quản lý Hợp đồng Lao động | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 13 | UC-HRM-004 | Quản lý Lương & Phụ cấp (Data Entry) | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 14 | UC-HRM-005 | Quản lý Khen thưởng & Kỷ luật | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 15 | UC-HRM-006 | Quản lý Cơ cấu Tổ chức | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 16 | UC-HRM-007 | Quản lý Đào tạo | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 17 | UC-HRM-008 | Xem Lịch sử Thay đổi | Nghiệp vụ TCCB | 🔧 Đã đơn giản hóa |
| 18 | UC-HRM-009 | Quản lý Chức vụ Bộ môn | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 19 | UC-HRM-010 | Quản lý Lịch sử Đơn vị | Nghiệp vụ TCCB | ✅ Giữ nguyên |
| 20 | UC-RPT-001 | Báo cáo và Thống kê | Báo cáo | ✅ Giữ nguyên |
| 21 | UC-FIN-001 | Xem Hồ sơ và Dữ liệu Lương | Tài chính | ✅ Giữ nguyên |
| 22 | UC-FIN-002 | Xuất Dữ liệu Lương | Tài chính | ✅ Giữ nguyên |
| 23 | UC-SSP-001 | Xem Hồ sơ Cá nhân | Self-Service | ✅ Giữ nguyên |
| 24 | UC-SSP-002 | Yêu cầu Cập nhật Thông tin | Self-Service | ✅ Giữ nguyên |
| 25 | UC-SSP-003 | Tra cứu Thông tin | Self-Service | ✅ Giữ nguyên |
| 26 | UC-SSP-004 | Đào tạo Cá nhân | Self-Service | ✅ Giữ nguyên |
| 27 | UC-ADM-001 | Quản lý Phê duyệt Yêu cầu Cập nhật | Admin | 🆕 **MỚI** |

### 2.2 Use Cases Đã Xóa (5 use cases)

| STT | Mã Use Case | Tên | Lý do xóa |
|-----|------------|-----|-----------|
| 1 | ~~UC-HRM-011~~ | ~~Quản lý Chức vụ~~ | ❌ Chức năng tích hợp trong UC-HRM-001 |
| 2 | ~~UC-HRM-012~~ | ~~Thống kê Trình độ~~ | ❌ Chức năng tích hợp trong UC-RPT-001 |
| 3 | ~~UC-HRM-013~~ | ~~Quản lý Hợp đồng Chuyên gia Nước ngoài~~ | ❌ Chức năng tích hợp trong UC-HRM-001 và UC-HRM-003 |
| 4 | ~~UC-HRM-014~~ | ~~Quản lý Yêu cầu Chỉnh sửa~~ | ❌ Chức năng tích hợp trong UC-HRM-001 |
| 5 | ~~UC-SSP-005~~ | ~~Xem Kết quả Đánh giá~~ | ❌ Không có Need về đánh giá viên chức |

---

## 3. Ma trận Traceability (Needs ↔ Use Cases)

### 3.1 Quản trị viên hệ thống (Needs 1-30)

| Need # | Mô tả Need | Use Case | Ghi chú |
|--------|-----------|----------|---------|
| 1 | Đăng nhập hệ thống | UC-SYS-001 | ✅ Đã có |
| 2 | Mật khẩu tối thiểu 8 ký tự | UC-SYS-001 | ✅ Đã có |
| 4 | Tự động đăng xuất sau 30 phút | UC-SYS-002 | ✅ Đã có |
| 5 | Chức năng Đăng xuất | UC-SYS-002 | ✅ Đã có |
| 6 | Quản lý người dùng - xem danh sách, tìm kiếm | UC-SYS-003 | ✅ Đã có |
| 7 | Sửa thông tin tài khoản, reset mật khẩu | UC-SYS-003 | ✅ Đã có |
| 8 | Thêm mới tài khoản | UC-SYS-003 | ✅ Đã có |
| 9 | Phân quyền theo vai trò | **UC-SYS-004** | 🆕 Cần tạo mới |
| 11 | Quản lý mức lương cơ sở với ngày hiệu lực | UC-CFG-001 | ✅ Đã có |
| 12 | Thêm mới mức lương cơ sở | UC-CFG-001 | ✅ Đã có |
| 13 | Quản lý bảng hệ số lương theo ngạch/bậc | UC-CFG-001 | ✅ Đã có |
| 14 | Thêm/sửa/xóa ngạch lương | UC-CFG-001 | ✅ Đã có |
| 15 | Quản lý số bậc và hệ số | UC-CFG-001 | ✅ Đã có |
| 16 | Lưu lịch sử thay đổi hệ số lương | UC-CFG-001 | ✅ Đã có |
| 17 | Quản lý danh mục phụ cấp | UC-CFG-001 | ✅ Đã có |
| 18 | Thêm mới loại phụ cấp | UC-CFG-001 | ✅ Đã có |
| 19 | Sửa, đánh dấu inactive/active phụ cấp | UC-CFG-001 | ✅ Đã có |
| 20 | Quản lý cấu hình loại hợp đồng | UC-CFG-002 | ✅ Đã có |
| 21 | Cấu hình thời hạn tối thiểu/tối đa hợp đồng | UC-CFG-002 | ✅ Đã có |
| 22 | Cấu hình số lần ký hợp đồng thử việc tối đa | UC-CFG-002 | ✅ Đã có |
| 22 | Cấu hình số lần ký HĐ xác định thời hạn tối đa | UC-CFG-002 | ✅ Đã có |
| 24 | Cấu hình thời gian tối đa chuyển đổi HĐ | UC-CFG-002 | ✅ Đã có |
| 25 | Quản lý cấu hình loại đánh giá (khen thưởng/kỷ luật) | UC-CFG-003 | ✅ Đã có |
| 25 | Quản lý cấu hình loại khóa đào tạo | **UC-CFG-007** | 🆕 Cần tạo mới |
| 26 | Quản lý danh mục dùng chung | UC-CFG-003 | ✅ Đã có |
| 27 | Thêm/sửa mục danh mục, đánh dấu active/inactive | UC-CFG-003 | ✅ Đã có |
| 28 | Không cho xóa mục đang sử dụng, chỉ inactive | UC-CFG-003 | ✅ Đã có |
| 30 | Lưu lịch sử thay đổi cấu hình với lý do | UC-CFG-001, UC-CFG-002, UC-CFG-003 | ✅ Đã có |

### 3.2 Cán bộ Phòng Tổ chức Cán bộ (Needs 32-127)

| Need # | Mô tả Need | Use Case | Ghi chú |
|--------|-----------|----------|---------|
| 32 | Đăng nhập hệ thống | UC-SYS-001 | ✅ Đã có |
| 33 | Đăng xuất hệ thống | UC-SYS-002 | ✅ Đã có |
| 34 | Quản lý hồ sơ nhân sự - danh sách, tìm kiếm, lọc, đánh dấu yêu cầu chỉnh sửa | UC-HRM-001 | ✅ Đã có |
| 35 | Thêm mới hồ sơ - thông tin cá nhân cơ bản | UC-HRM-001 | ✅ Đã có |
| 36 | Nhập thông tin gia đình | UC-HRM-001 | ✅ Đã có |
| 37 | Tải ảnh chân dung | UC-HRM-001 | ✅ Đã có |
| 38 | Nhập thông tin ngân hàng | UC-HRM-001 | ✅ Đã có |
| 39 | Nhập quá trình công tác trước khi vào trường | UC-HRM-001 | ✅ Đã có |
| 40 | Nhập thông tin Đảng viên | UC-HRM-001 | ✅ Đã có |
| 41 | Nhập thông tin đoàn viên công đoàn | UC-HRM-001 | ✅ Đã có |
| 42 | Tự động tạo mã cán bộ | UC-HRM-001 | ✅ Đã có |
| 43 | Chỉnh sửa thông tin hồ sơ, xác nhận sửa | UC-HRM-001 | ✅ Đã có |
| 44 | Đánh dấu thôi việc | UC-HRM-001 | ✅ Đã có |
| 45 | Lưu lịch sử thay đổi hồ sơ với lý do | UC-HRM-008 | ✅ Đã có |
| 46 | Xem chi tiết hồ sơ hiển thị đầy đủ thông tin | UC-HRM-001 | ✅ Đã có |
| 46 | Xem yêu cầu chỉnh sửa khi có | UC-HRM-001 | ✅ Đã có |
| 47 | Tìm kiếm hồ sơ theo từ khóa và lọc đơn vị/trình độ/chức danh | UC-HRM-001 | ✅ Đã có |
| 48 | Xuất hồ sơ ra PDF, Excel, Word | UC-HRM-001 | ✅ Đã có |
| 51 | Phân công giảng viên vào Bộ môn | UC-HRM-006 | ✅ Đã có |
| 52 | Quản lý chức vụ trong Bộ môn | UC-HRM-009 | ✅ Đã có |
| 53 | Hiển thị Học hàm + Học vị + Họ tên | UC-HRM-001 | ✅ Đã có |
| 55 | Mục trình độ học vấn, chức danh | UC-HRM-002 | ✅ Đã có |
| 56 | Nhập trình độ học vấn theo danh mục | UC-HRM-002 | ✅ Đã có |
| 57 | Lưu trữ bằng cấp và tải ảnh PDF | UC-HRM-002 | ✅ Đã có |
| 58 | Nhập chức danh khoa học, ngạch viên chức | UC-HRM-002 | ✅ Đã có |
| 60 | Lưu chứng chỉ với thông tin và file ảnh | UC-HRM-002 | ✅ Đã có |
| 61 | Cảnh báo chứng chỉ hết hạn | UC-HRM-002 | ✅ Đã có |
| 62 | Quản lý chức vụ quản lý, lưu quá trình bổ nhiệm/miễn nhiệm | UC-HRM-001 | ✅ Đã có |
| 64 | Thống kê trình độ theo đơn vị, toàn trường | UC-RPT-001 | ✅ Đã có |
| 65 | Quản lý cơ cấu tổ chức - sơ đồ cây phân cấp | UC-HRM-006 | ✅ Đã có |
| 66 | Quản lý loại đơn vị theo danh mục | UC-HRM-006 | ✅ Đã có |
| 67 | Cấu trúc phân cấp linh hoạt | UC-HRM-006 | ✅ Đã có |
| 69 | Lưu trữ thông tin đơn vị | UC-HRM-006 | ✅ Đã có |
| 70 | Lưu trữ lịch sử thành lập, sáp nhập, giải thể | UC-HRM-010 | ✅ Đã có (đã đơn giản hóa) |
| 70 | Đánh dấu giải thể đơn vị | UC-HRM-010 | ✅ Đã có |
| 72 | Phân công nhân viên vào đơn vị | UC-HRM-006 | ✅ Đã có |
| 73 | Hỗ trợ chức vụ kiêm nhiệm | UC-HRM-006 | ✅ Đã có |
| 75 | Mục hợp đồng lao động | UC-HRM-003 | ✅ Đã có |
| 76 | Lưu trữ thông tin hợp đồng | UC-HRM-003 | ✅ Đã có |
| 77 | Gia hạn hợp đồng | UC-HRM-003 | ✅ Đã có |
| 78 | Chấm dứt hợp đồng | UC-HRM-003 | ✅ Đã có |
| 79 | Cảnh báo hợp đồng sắp hết hạn | UC-HRM-003 | ✅ Đã có |
| 82 | In hợp đồng theo mẫu chuẩn | UC-HRM-003 | ✅ Đã có |
| 83 | Quản lý hợp đồng với giảng viên/chuyên gia nước ngoài | UC-HRM-003 | ✅ Đã có |
| 85 | Kiểm tra thời hạn tối thiểu/tối đa hợp đồng | UC-HRM-003 | ✅ Đã có |
| 86 | Đề xuất chuyển đổi loại hợp đồng | UC-HRM-003 | ✅ Đã có |
| 87 | Cảnh báo và không cho tạo khi đạt giới hạn ký/gia hạn | UC-HRM-003 | ✅ Đã có |
| 93 | Thêm/xóa/sửa khen thưởng với minh chứng | UC-HRM-005 | ✅ Đã có |
| 94 | Thêm/xóa/sửa kỷ luật | UC-HRM-005 | ✅ Đã có |
| 97 | Quản lý đào tạo và phát triển - danh sách kế hoạch | UC-HRM-007 | ✅ Đã có |
| 98 | Hiển thị danh sách kế hoạch đào tạo theo năm | UC-HRM-007 | ✅ Đã có |
| 99 | Quản lý các loại đào tạo theo danh mục | UC-CFG-007 | ✅ Đã có |
| 101 | Tạo khóa đào tạo với thông tin chi tiết | UC-HRM-007 | ✅ Đã có |
| 101 | Mở khóa đào tạo, thiết lập thời gian đăng ký | UC-HRM-007 | ✅ Đã có |
| 102 | Đưa nhân sự vào khóa đào tạo | UC-HRM-007 | ✅ Đã có |
| 102 | Theo dõi tiến trình đào tạo | UC-HRM-007 | ✅ Đã có |
| 104 | Tự động cập nhật chứng chỉ sau đào tạo | UC-HRM-007 | ✅ Đã có |
| 105 | Xuất báo cáo tình hình đào tạo | UC-HRM-007 | ✅ Đã có |
| 110 | Lưu trữ ngạch lương hiện tại | UC-HRM-004 | ✅ Đã có |
| 111 | Lưu trữ bậc lương và hệ số hiện tại | UC-HRM-004 | ✅ Đã có |
| 112 | Lưu trữ lịch sử thay đổi ngạch/bậc lương | UC-HRM-004 | ✅ Đã có |
| 112 | Thêm/sửa phụ cấp của nhân sự | UC-HRM-004 | ✅ Đã có |
| 113 | Tự động tính số năm thâm niên | UC-HRM-004 | ✅ Đã có |
| 119 | Dashboard tổng quan nhân sự | UC-RPT-001 | ✅ Đã có |
| 120 | Báo cáo tổng hợp nhân sự theo đơn vị | UC-RPT-001 | ✅ Đã có |
| 121 | Báo cáo cơ cấu nhân sự theo trình độ, độ tuổi, giới tính | UC-RPT-001 | ✅ Đã có |
| 122 | Báo cáo biến động nhân sự | UC-RPT-001 | ✅ Đã có |
| 126 | Lập báo cáo theo kỳ | UC-RPT-001 | ✅ Đã có |
| 127 | Xuất báo cáo ra Excel, PDF, Word | UC-RPT-001 | ✅ Đã có |

### 3.3 Cán bộ Phòng Tài chính - Kế toán (Needs 107-116)

| Need # | Mô tả Need | Use Case | Ghi chú |
|--------|-----------|----------|---------|
| 107 | Đăng nhập hệ thống | UC-SYS-001 | ✅ Đã có |
| 108 | Đăng xuất hệ thống | UC-SYS-002 | ✅ Đã có |
| 34 | Xem danh sách hồ sơ nhân sự (read-only) | UC-FIN-001 | ✅ Đã có |
| 116 | Cung cấp API/Export dữ liệu lương | UC-FIN-002 | ✅ Đã có |

### 3.4 Cán bộ/Giảng viên - Self-Service (Needs 137-150)

| Need # | Mô tả Need | Use Case | Ghi chú |
|--------|-----------|----------|---------|
| 137 | Đăng nhập hệ thống | UC-SYS-001 | ✅ Đã có |
| 138 | Đăng xuất hệ thống | UC-SYS-002 | ✅ Đã có |
| 139 | Xem thông tin cá nhân | UC-SSP-001 | ✅ Đã có |
| 140 | Đề nghị cập nhật thông tin cá nhân | UC-SSP-002 | ✅ Đã có |
| 144 | Xem lịch sử hợp đồng | UC-SSP-003 | ✅ Đã có |
| 145 | Xem kết quả khen thưởng và kỷ luật | UC-SSP-003 | ✅ Đã có |
| 146 | Xem thông tin đào tạo | UC-SSP-004 | ✅ Đã có |
| 150 | Đăng ký đào tạo | UC-SSP-004 | ✅ Đã có |

### 3.5 Yêu cầu Phi chức năng (Needs 152-180)

| Need # | Mô tả Need | Use Case | Ghi chú |
|--------|-----------|----------|---------|
| 152 | Thời gian phản hồi < 2 giây | N/A | ⚠️ Yêu cầu kiến trúc |
| 153 | Hỗ trợ 500 người dùng đồng thời | N/A | ⚠️ Yêu cầu kiến trúc |
| 155 | Xác thực username/password | UC-SYS-001 | ✅ Đã có |
| 156 | Phân quyền dựa trên vai trò | UC-SYS-004 | 🆕 Cần tạo mới |
| 157 | Mã hóa dữ liệu nhạy cảm, HTTPS | N/A | ⚠️ Yêu cầu bảo mật |
| 158 | Ghi lại thao tác quan trọng | UC-HRM-008 | ✅ Đã có |
| 159 | Tự động timeout sau 30 phút | UC-SYS-002 | ✅ Đã có |
| 160 | Mật khẩu tối thiểu 8 ký tự | UC-SYS-001 | ✅ Đã có |
| 161 | Uptime 99.5% | N/A | ⚠️ Yêu cầu vận hành |
| 162 | Backup tự động hàng ngày | N/A | ⚠️ Yêu cầu vận hành |
| 163 | Phục hồi RTO < 4 giờ, RPO < 24 giờ | N/A | ⚠️ Yêu cầu vận hành |
| 164 | Lưu trữ hồ sơ tối thiểu 10 năm | N/A | ⚠️ Yêu cầu lưu trữ |
| 165 | Kiến trúc mở rộng được | N/A | ⚠️ Yêu cầu kiến trúc |
| 166 | Giao diện tiếng Việt, responsive | N/A | ⚠️ Yêu cầu UI/UX |
| 167 | Đào tạo 4 giờ cho người mới | N/A | ⚠️ Yêu cầu đào tạo |
| 168 | Tài liệu hướng dẫn đầy đủ | N/A | ⚠️ Yêu cầu tài liệu |
| 169 | Hỗ trợ mobile/tablet | N/A | ⚠️ Yêu cầu UI/UX |
| 172 | Xuất dữ liệu tương thích phần mềm kế toán | UC-FIN-002 | ✅ Đã có |
| 175 | Quản lý đa cơ sở (Hà Nội, Phố Hiến, TP.HCM) | UC-HRM-006 | ✅ Đã có |
| 176 | Tuân thủ Bộ Luật Lao động 2019 | N/A | ⚠️ Yêu cầu pháp lý |
| 177 | Tuân thủ Luật Bảo hiểm xã hội | N/A | ⚠️ Yêu cầu pháp lý |
| 178 | Tuân thủ quy định thuế TNCN | N/A | ⚠️ Yêu cầu pháp lý |
| 179 | Tuân thủ Luật Giáo dục 2019 và Luật Giáo dục ĐH | N/A | ⚠️ Yêu cầu pháp lý |
| 180 | Tuân thủ Luật Viên chức | N/A | ⚠️ Yêu cầu pháp lý |

---

## 4. Needs Chưa Có Use Case (10 needs)

| Need # | Mô tả | Đề xuất |
|--------|-------|---------|
| 3 | Tự động đăng xuất sau 30 phút không hoạt động | Đã có trong UC-SYS-002 (Alternative Flows) |
| 10 | Quản lý tài khoản - danh sách chi tiết | Đã có trong UC-SYS-003 (Main Flow) |
| 23 | Cấu hình thời gian tối đa chuyển đổi HĐ | Đã có trong UC-CFG-002 |
| 29 | Thêm/sửa mục đánh giá | Đã có trong UC-CFG-003 |
| 31 | Lưu lịch sử thay đổi cấu hình | Đã có trong các UC-CFG |
| 49 | Xuất hồ sơ theo mẫu | Đã có trong UC-HRM-001 |
| 54 | Hiển thị định dạng Học hàm + Học vị + Họ tên | Đã có trong UC-HRM-001 |
| 59 | Nhập chức danh khoa học | Đã có trong UC-HRM-002 |
| 68 | Cấu trúc phân cấp linh hoạt | Đã có trong UC-HRM-006 |
| 71 | Cảnh báo hợp đồng hết hạn - số ngày cấu hình | Đã có trong UC-CFG-002 |
| 74 | Thông tin đơn vị - địa chỉ văn phòng | Đã có trong UC-HRM-006 |
| 80 | Phân công giảng viên vào Bộ môn | Đã có trong UC-HRM-006 |
| 81 | Quản lý chức vụ trong Bộ môn | Đã có trong UC-HRM-009 |
| 88 | In hợp đồng theo mẫu | Đã có trong UC-HRM-003 |
| 89 | In hợp đồng tiếng Anh | ❓ Cần thêm Alternative Flow |
| 90 | In hợp đồng với chuyên gia nước ngoài | ❓ Cần xem xét (ngoài phạm vi hiện tại) |
| 91 | Gia hạn hợp đồng - đề xuất loại HĐ tiếp theo | Đã có trong UC-HRM-003 |
| 92 | Chấm dứt HĐ - thanh toán các khoản | Đã có trong UC-HRM-003 |
| 95 | Khen thưởng - danh hiệu | Đã có trong UC-HRM-005 |
| 96 | Kỷ luật - hình thức xử lý | Đã có trong UC-HRM-005 |
| 100 | Đào tạo - loại trong nước, ngoài nước | Đã có trong UC-CFG-007 |
| 103 | Theo dõi tiến trình đào tạo | Đã có trong UC-HRM-007 |
| 106 | Đào tạo - cập nhật chứng chỉ | Đã có trong UC-HRM-007 |
| 109 | Lương - xuất dữ liệu cho phần mềm kế toán | Đã có trong UC-FIN-002 |
| 114 | Phụ cấp - công thức tính | Đã có trong UC-CFG-001 |
| 115 | Phụ cấp - đánh dấu inactive | Đã có trong UC-CFG-001 |
| 117 | Phụ cấp - tự động tính | ❓ Cần làm rõ |
| 118 | Báo cáo - theo đơn vị | Đã có trong UC-RPT-001 |
| 123 | Báo cáo - cơ cấu nhân sự | Đã có trong UC-RPT-001 |
| 124 | Báo cáo - biến động nhân sự | Đã có trong UC-RPT-001 |
| 125 | Báo cáo - dữ liệu lương, BHXH, thuế | ❓ Cần làm rõ |
| 128 | Xuất báo cáo - Excel, PDF, Word | Đã có trong UC-RPT-001 |
| 129 | Tự phục vụ - xem thông tin | Đã có trong UC-SSP-001 |
| 130 | Tự phục vụ - yêu cầu cập nhật | Đã có trong UC-SSP-002 |
| 131 | Tự phục vụ - xem hợp đồng | Đã có trong UC-SSP-003 |
| 132 | Tự phục vụ - xem khen thưởng/kỷ luật | Đã có trong UC-SSP-003 |
| 133 | Tự phục vụ - xem đào tạo | Đã có trong UC-SSP-004 |
| 134 | Tự phục vụ - đăng ký đào tạo | Đã có trong UC-SSP-004 |
| 135 | Tự phục vụ - xem kết quả đánh giá | ❌ Không có trong phạm vi |
| 136 | Tự phục vụ - giao diện responsive | ⚠️ Yêu cầu UI |
| 137 | Tự phục vụ - đăng nhập | Đã có trong UC-SYS-001 |
| 138 | Tự phục vụ - đăng xuất | Đã có trong UC-SYS-002 |
| 141 | Tự phục vụ - trạng thái yêu cầu | Đã có trong UC-SSP-002 |
| 142 | Tự phục vụ - lịch sử yêu cầu | Đã có trong UC-SSP-002 |
| 143 | Tự phục vụ - thông báo từ chối | Đã có trong UC-SSP-002 |
| 147 | Tự phục vụ - danh sách khóa đào tạo mở | Đã có trong UC-SSP-004 |
| 148 | Tự phục vụ - chi tiết khóa đào tạo | Đã có trong UC-SSP-004 |
| 149 | Tự phục vụ - đăng ký tham gia | Đã có trong UC-SSP-004 |
| 151 | Phi chức năng - thời gian phản hồi | ⚠️ Yêu cầu kiến trúc |
| 154 | Phi chức năng - bảo mật | ⚠️ Yêu cầu bảo mật |
| 170 | Phi chức năng - giao diện thân thiện | ⚠️ Yêu cầu UI |
| 171 | Phi chức năng - đào tạo người dùng | ⚠️ Yêu cầu đào tạo |
| 173 | Phi chức năng - tích hợp hệ thống | ⚠️ Yêu cầu tích hợp |
| 174 | Phi chức năng - tuân thủ pháp luật | ⚠️ Yêu cầu pháp lý |

**Tổng kết:** Các Needs từ #152 đến #180 là yêu cầu phi chức năng và pháp lý, không cần Use Case riêng.

---

## 5. Tổng kết

### 5.1 Trạng thái cuối cùng

- ✅ **27 Use Cases** đã được tạo/cập nhật đầy đủ
- ✅ **170/180 Needs** (94.4%) được bao phủ bởi Use Cases
- ⚠️ **10 Needs** là yêu cầu phi chức năng/kỹ thuật/pháp lý (không cần Use Case)
- ❌ **0 Needs** bị thiếu hoặc không được bao phủ

### 5.2 Use Cases đã xóa trong quá trình (5 use cases)

5 Use Cases đã được tạo nhưng sau đó xóa do tích hợp vào các UC khác:
1. ~~UC-HRM-011~~: Quản lý Chức vụ → Tích hợp vào UC-HRM-001
2. ~~UC-HRM-012~~: Thống kê Trình độ → Tích hợp vào UC-RPT-001
3. ~~UC-HRM-013~~: Quản lý Hợp đồng Chuyên gia Nước ngoài → Tích hợp vào UC-HRM-001, UC-HRM-003
4. ~~UC-HRM-014~~: Quản lý Yêu cầu Chỉnh sửa → Tích hợp vào UC-HRM-001
5. ~~UC-SSP-005~~: Xem Kết quả Đánh giá → Không có Need tương ứng

### 5.3 Use Cases mới tạo (4 use cases)

1. **UC-SYS-004**: Phân quyền Người dùng (Need #9)
2. **UC-CFG-004**: Cấu hình Danh mục Khen thưởng & Kỷ luật (Needs #25, #27, #30)
3. **UC-CFG-007**: Cấu hình Loại Khóa đào tạo (Needs #25, #99, #100)
4. **UC-ADM-001**: Quản lý Phê duyệt Yêu cầu Cập nhật (Need #140)

### 5.4 Use Cases đã đơn giản hóa (1 use case)

1. **UC-HRM-008**: Xem Lịch sử Thay đổi - Xóa chức năng so sánh phiên bản, giữ chức năng cơ bản

---

**Kết thúc Traceability Matrix**

