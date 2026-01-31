# DANH SÁCH TÍNH NĂNG CHI TIẾT (DETAILED FEATURE LIST)
**Dự án:** Hệ thống Quản lý Nhân sự (HRMS)
**Nguồn:** Chuyển đổi từ Danh sách Nhu cầu (Needs List)

---

## 1. Phân hệ Quản trị Hệ thống (System Administration)

### F-SYS-01: Quản lý Xác thực & Phiên làm việc (Authentication & Session Management)
*Nguồn: Needs 1, 2, 4, 5, 32, 33, 107, 108, 137, 138, 155, 159, 160*
- **Đăng nhập (Login):** Hỗ trợ đăng nhập bằng tên đăng nhập và mật khẩu cho mọi đối tượng người dùng (Quản trị viên, Cán bộ TCCB, TCKT, Giảng viên/NV).
- **Đăng xuất (Logout):** Cho phép người dùng kết thúc phiên làm việc an toàn.
- **Chính sách mật khẩu (Password Policy):** Bắt buộc mật khẩu tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số.
- **Quản lý phiên (Session Timeout):** Tự động đăng xuất sau 30 phút không hoạt động để đảm bảo an toàn.

### F-SYS-02: Quản lý Người dùng & Phân quyền (User Management & RBAC)
*Nguồn: Needs 6, 7, 8, 9, 156*
- **Quản lý tài khoản (User CRUD):** Thêm mới, cập nhật, khóa/mở khóa tài khoản người dùng; reset mật khẩu.
- **Tìm kiếm người dùng:** Tìm kiếm và lọc danh sách tài khoản.
- **Phân quyền theo vai trò (Role-Based Access Control):** Phân quyền chi tiết dựa trên vai trò hệ thống:
    - Quản trị viên (Admin)
    - Cán bộ Phòng Tổ chức Cán bộ (HR Staff)
    - Cán bộ Phòng Tài chính - Kế toán (Finance Staff)
    - Cán bộ/Giảng viên (Employee/Faculty)

### F-SYS-03: Cấu hình Danh mục dùng chung (Master Data Configuration)
*Nguồn: Needs 26, 49, 50, 51, 52*
- **Quản lý danh mục hành chính:** Quốc gia, Tỉnh/Thành phố, Quận/Huyện, Xã/Phường (phân cấp).
- **Quản lý danh mục nhân sự:** Dân tộc, Tôn giáo, Trình độ học vấn, Chức danh khoa học, Ngạch viên chức, Chức vụ, Danh hiệu, Loại đơn vị.
- **Thao tác danh mục:** Thêm, sửa, sắp xếp thứ tự, kích hoạt/hủy kích hoạt (inactive). Không xóa danh mục đang sử dụng.
- **Lịch sử thay đổi:** Ghi nhận lịch sử và lý do thay đổi cấu hình.

### F-SYS-04: Cấu hình Lương & Phụ cấp (Salary & Allowance Configuration)
*Nguồn: Needs 11-19*
- **Quản lý Mức lương cơ sở:** Thiết lập và lưu lịch sử mức lương cơ sở theo ngày hiệu lực.
- **Quản lý Ngạch/Bậc lương:** Cấu hình hệ thống ngạch (Giảng viên, Chuyên viên...), số bậc và hệ số lương tương ứng từng bậc.
- **Quản lý Loại phụ cấp:** Định nghĩa các loại phụ cấp (Chức vụ, Thâm niên, Độc hại...); thiết lập công thức tính (theo hệ số hoặc số tiền cố định).

### F-SYS-05: Cấu hình Hợp đồng (Contract Configuration)
*Nguồn: Needs 20-24*
- **Danh mục Loại hợp đồng:** Quản lý các loại hợp đồng (Không xác định thời hạn, Xác định thời hạn, Thử việc, Thỉnh giảng).
- **Quy tắc Hợp đồng:** Cấu hình thời hạn tối thiểu/tối đa, số lần ký tối đa cho từng loại hợp đồng.
- **Quy tắc Chuyển đổi:** Cấu hình quy tắc và thời hạn tự động cảnh báo/chuyển đổi loại hợp đồng (ví dụ: Thử việc -> Xác định thời hạn).

### F-SYS-06: Cấu hình Đánh giá & Đào tạo (Evaluation & Training Configuration)
*Nguồn: Needs 25, 27, 30, 44-46* (Mapping Needs numbering form input 38-46)
- **Danh mục Khen thưởng/Kỷ luật:** Định nghĩa các hình thức khen thưởng và kỷ luật.
- **Danh mục Khóa đào tạo:** Định nghĩa các loại hình và khóa đào tạo.

---

## 2. Phân hệ Quản lý Hồ sơ Nhân sự (HR Records Management)

### F-HRM-01: Quản lý Hồ sơ Cá nhân (Employee Profile Management)
*Nguồn: Needs 34-48, 164*
- **Danh sách Hồ sơ:** Hiển thị danh sách nhân sự với bộ lọc đa tiêu chí (Đơn vị, Trình độ, Chức danh, Trạng thái).
- **Tạo mới hồ sơ:** Nhập liệu chi tiết thông tin cá nhân (Sơ yếu lý lịch, CCCD, Mã số thuế, BHXH, Thông tin liên hệ, Gia đình, Quá trình công tác trước đây, Đảng/Đoàn). Tự động sinh Mã cán bộ.
- **Cập nhật hồ sơ:** Chỉnh sửa thông tin, đánh dấu yêu cầu chỉnh sửa, cập nhật ảnh chân dung.
- **Lưu trữ lịch sử:** Tự động lưu vết mọi thay đổi trên hồ sơ và lý do chỉnh sửa.
- **Đánh dấu Thôi việc:** Quy trình xử lý nhân sự nghỉ việc/thôi việc.
- **Xuất hồ sơ:** Hỗ trợ xuất Lý lịch trích ngang/Hồ sơ ra PDF, Word, Excel theo biểu mẫu quy định.

### F-HRM-02: Quản lý Trình độ & Chức danh (Qualifications & Titles)
*Nguồn: Needs 55-61*
- **Quản lý Bằng cấp/Học vấn:** Lưu chi tiết bằng cấp, chuyên ngành, nơi cấp, xếp loại. Đính kèm bản scan văn bằng (PDF/Image).
- **Quản lý Chức danh/Ngạch:** Theo dõi lịch sử bổ nhiệm Ngạch, Chức danh khoa học, Danh hiệu.
- **Quản lý Chứng chỉ:** Lưu thông tin chứng chỉ, ngày cấp/hết hạn.
- **Cảnh báo:** Tự động cảnh báo chứng chỉ sắp hết hạn.

### F-HRM-03: Quản lý Quá trình Hợp đồng (Contract Management)
*Nguồn: Needs 75-87, 83, 82, 179*
- **Quản lý Hợp đồng lao động:** Lưu trữ chi tiết Số HĐ, Loại HĐ, Thời hạn, Nội dung, Phụ lục. Đính kèm bản scan.
- **Xử lý Hợp đồng:** Thực hiện Gia hạn, Chuyển đổi loại hợp đồng, Chấm dứt hợp đồng (tính toán quyền lợi).
- **Kiểm soát quy tắc:** Tự động kiểm tra tính hợp lệ (Số lần ký, Thời hạn tối thiểu/tối đa) theo cấu hình.
- **Cảnh báo tự động:** Thông báo danh sách hợp đồng sắp hết hạn để xử lý kịp thời.
- **In Hợp đồng:** Xuất/In hợp đồng trực tiếp từ hệ thống theo mẫu.

### F-HRM-04: Quản lý Lương & Phụ cấp Cá nhân (Salary & Allowance Info)
*Nguồn: Needs 110-113*
- **Thông tin Lương:** Ghi nhận Ngạch, Bậc, Hệ số lương hiện tại và Lịch sử diễn biến lương.
- **Phụ cấp cá nhân:** Gán và điều chỉnh các khoản phụ cấp đặc thù cho từng nhân sự.
- **Thâm niên:** Tự động tính toán số năm thâm niên công tác.

### F-HRM-05: Quản lý Khen thưởng & Kỷ luật (Rewards & Discipline)
*Nguồn: Needs 93, 94*
- **Khen thưởng:** Ghi nhận quyết định khen thưởng, danh hiệu, kèm minh chứng (scan quyết định/bằng khen).
- **Kỷ luật:** Ghi nhận quyết định kỷ luật, hình thức và thời hạn kỷ luật.

---

## 3. Phân hệ Quản lý Tổ chức (Organization Management)

### F-ORG-01: Quản lý Cơ cấu Tổ chức (Organization Chart)
*Nguồn: Needs 65, 67, 127*
- **Cây sơ đồ tổ chức:** Hiển thị và quản lý trực quan theo mô hình phân cấp (Trường -> Khoa/Phòng -> Bộ môn).
- **Mô hình linh hoạt:** Hỗ trợ cấu hình số cấp và quan hệ không giới hạn.

### F-ORG-02: Quản lý Đơn vị (Unit Management)
*Nguồn: Needs 66, 69, 70*
- **Thông tin Đơn vị:** Quản lý chi tiết Mã, Tên, Liên hệ, Loại đơn vị (Khoa, Phòng, Trung tâm...).
- **Lịch sử Đơn vị:** Theo dõi quá trình Thành lập, Sáp nhập, Giải thể.

### F-ORG-03: Quản lý Bố trí Nhân sự (Staffing & Positions)
*Nguồn: Needs 51, 52, 62, 72, 73*
- **Phân công công tác:** Điều chuyển/Phân công nhân sự vào Đơn vị/Bộ môn.
- **Quản lý Chức vụ:** Bổ nhiệm/Miễn nhiệm chức vụ quản lý.
- **Kiêm nhiệm:** Hỗ trợ một nhân sự giữ nhiều chức vụ tại nhiều đơn vị khác nhau.
- **Lịch sử chức vụ:** Lưu trữ quá trình công tác và thay đổi chức vụ.

---

## 4. Phân hệ Đào tạo & Phát triển (Training & Development)

### F-TRN-01: Quản lý Khóa đào tạo (Course Management)
*Nguồn: Needs 97-99, 101, 102, 134*
- **Kế hoạch đào tạo:** Lập và theo dõi kế hoạch đào tạo theo năm.
- **Tổ chức khóa học:** Tạo mới khóa học, định nghĩa thông tin (Thời gian, Kinh phí, Cam kết), Mở đăng ký.
- **Danh sách học viên:** Ghi danh nhân sự, phê duyệt danh sách tham gia.

### F-TRN-02: Theo dõi Kết quả Đào tạo (Training Tracking)
*Nguồn: Needs 102, 104*
- **Tiến trình:** Cập nhật trạng thái (Đang học, Hoàn thành, Bỏ dở).
- **Cập nhật hồ sơ:** Tự động bổ sung chứng chỉ/kết quả vào hồ sơ nhân sự sau khi hoàn thành.

---

## 5. Cổng Thông tin Nhân sự (Employee Self-Service Portal - ESS)

### F-ESS-01: Hồ sơ Cá nhân (My Profile)
*Nguồn: Needs 139, 140*
- **Xem hồ sơ:** Nhân sự xem toàn bộ thông tin cá nhân của mình.
- **Yêu cầu cập nhật:** Gửi yêu cầu chỉnh sửa thông tin (gửi về Phòng TCCB duyệt).

### F-ESS-02: Tra cứu Thông tin (Information Lookup)
*Nguồn: Needs 144-146*
- **Lịch sử Hợp đồng:** Xem danh sách và tình trạng hợp đồng.
- **Lịch sử Đào tạo:** Xem các khóa đã tham gia.
- **Khen thưởng/Kỷ luật:** Xem lịch sử khen thưởng, kỷ luật cá nhân.

### F-ESS-03: Đăng ký Trực tuyến (Online Registration)
*Nguồn: Needs 150*
- **Đăng ký Đào tạo:** Xem danh sách khóa học đang mở và đăng ký tham gia.

---

## 6. Phân hệ Báo cáo & Thống kê (Reporting & Analytics)

### F-RPT-01: Dashboard Lãnh đạo (Executive Dashboard)
*Nguồn: Needs 119-122*
- **Tổng quan Nhân sự:** Biểu đồ thống kê số lượng, cơ cấu theo Đơn vị, Trình độ, Độ tuổi, Giới tính.
- **Biến động nhân sự:** Theo dõi trực quan tình hình Tuyển dụng, Nghỉ việc, Bổ nhiệm.

### F-RPT-02: Báo cáo Nghiệp vụ (Standard Reports)
*Nguồn: Needs 64, 105, 126, 127*
- **Báo cáo Tổ chức Cán bộ:** Thống kê chất lượng nhân sự, danh sách trích ngang.
- **Báo cáo Đào tạo:** Tình hình thực hiện kế hoạch đào tạo.
- **Báo cáo Định kỳ:** Hỗ trợ lập báo cáo Tháng/Quý/Năm.
- **Xuất dữ liệu:** Hỗ trợ xuất định dạng Excel, PDF, Word.

---

## 7. Phân hệ Tài chính & Tích hợp (Finance & Integration)

### F-INT-01: Dữ liệu Lương & Tích hợp (Payroll Data & Integration)
*Nguồn: Needs 34, 116, 172*
- **Tra cứu dữ liệu lương:** Cán bộ TCKT tra cứu thông tin ngạch, bậc, hệ số để phục vụ tính lương.
- **Kết xuất dữ liệu:** API hoặc Export Excel dữ liệu lương chuẩn hóa để tích hợp với phần mềm Kế toán/Tính lương.

### F-NFR-01: Yêu cầu Phi chức năng (Non-Functional Requirements)
*Nguồn: Section 7 (Needs 152-206)*
- **Hiệu năng:** Phản hồi < 2s; hỗ trợ 500 CCU; sẵn sàng 99.5%.
- **Bảo mật:** Mã hóa dữ liệu HTTPS; Sao lưu tự động (Daily backup, lưu 30 ngày); Phục hồi RTO < 4h.
- **Tuân thủ pháp lý:** Đáp ứng Luật Lao động, BHXH, Luật Viên chức, Luật Giáo dục.
- **Trải nghiệm:** Giao diện Tiếng Việt, Responsive (Mobile/Tablet support).
