# Software Requirements Specification (SRS)

**Dự án:** Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi  
**Version:** 2.1 (Consolidated - Full Detail)  
**Ngày:** 30/01/2026

---

## 1. Introduction

### 1.1 Purpose
Tài liệu này xác định các yêu cầu phần mềm cho Hệ thống Quản lý Nhân sự (HRMS) của Trường Đại học Thủy lợi. Nó bao gồm toàn bộ các yêu cầu chức năng và phi chức năng được ánh xạ từ Danh sách Nhu cầu (Needs List), tích hợp chi tiết các luồng nghiệp vụ (Use Cases).

### 1.2 Scope
Hệ thống quản lý toàn bộ vòng đời nhân sự của nhà trường, bao gồm:
*   Quản lý hồ sơ và hợp đồng.
*   Cấu hình thông số lương, phụ cấp (không tính lương chi tiết).
*   Quản lý đào tạo và đánh giá nhân sự.
*   Báo cáo thống kê.
*   Cổng tự phục vụ cho cán bộ giảng viên (Self-Service Portal).

### 1.3 Definitions and Acronyms
*   **SRS:** Software Requirements Specification.
*   **HRMS:** Human Resource Management System.
*   **TCCB:** Phòng Tổ chức Cán bộ.
*   **TCKT:** Phòng Tài chính - Kế toán.
*   **CBGV:** Cán bộ Giảng viên.

---

## 2. Overall Description

### 2.1 User Classes and Characteristics
*   **System Admin:** Quản lý tài khoản, cấu hình hệ thống.
*   **Cán bộ TCCB:** Quản lý nghiệp vụ nhân sự chính.
*   **Cán bộ TCKT:** Xem dữ liệu lương để thực hiện chi trả bên ngoài.
*   **Lãnh đạo trường:** Xem báo cáo thống kê.
*   **Cán bộ/Giảng viên:** Sử dụng cổng Self-service để tra cứu thông tin.

---

## 3. System Features (Functional Requirements)

### 3.1 Quản trị hệ thống (System Administration)
*Mapping to Needs: 1-9*

| ID | Description | Need ID |
| :--- | :--- | :--- |
| **SYS-001** | Đăng nhập hệ thống bằng username/password. | Need-1 |
| **SYS-002** | Validation mật khẩu tối thiểu 8 ký tự, gồm chữ hoa, thường, số. | Need-2 |
| **SYS-003** | Tự động đăng xuất sau 30 phút không hoạt động. | Need-4 |
| **SYS-004** | Chức năng Đăng xuất thủ công. | Need-5 |
| **SYS-005** | Quản lý người dùng: Xem ds, Tìm kiếm, Sửa, Khóa/Mở khóa. | Need-6 |
| **SYS-006** | Sửa thông tin tài khoản và Reset mật khẩu user. | Need-7 |
| **SYS-007** | Thêm mới user: Username, Password, Họ tên, Email, Vai trò. | Need-8 |
| **SYS-008** | Phân quyền vai trò: TCCB, TCKT, User thường. | Need-9 |

### 3.2 Quản lý Cấu hình (Configuration Management)
*Mapping to Needs: 11-30*

| ID | Description | Need ID |
| :--- | :--- | :--- |
| **CFG-001** | Xem danh sách mức lương cơ sở theo ngày hiệu lực. | Need-11 |
| **CFG-002** | Thêm mới mức lương cơ sở + ngày hiệu lực. | Need-12 |
| **CFG-003** | Quản lý bảng hệ số lương theo ngạch/bậc gồm Giảng viên, Giảng viên chính, Giảng viên cao cấp, Chuyên viên. | Need-13 |
| **CFG-004** | Thêm/Sửa/Xóa ngạch lương mới. | Need-14 |
| **CFG-005** | Quản lý số bậc và hệ số tương ứng cho từng ngạch. | Need-15 |
| **CFG-006** | Lưu lịch sử thay đổi hệ số lương theo thời gian + Lý do sửa. | Need-16 |
| **CFG-007** | Xem danh sách loại phụ cấp gồm chức vụ, thâm niên, ưu đãi ngành, trách nhiệm, độc hại, khu vực. | Need-17 |
| **CFG-008** | Thêm loại phụ cấp: Mã (auto), Tên, Loại (Hệ số/Tiền), Công thức. | Need-18 |
| **CFG-009** | Sửa, Active/Inactive các loại phụ cấp. | Need-19 |
| **CFG-010** | Xem danh sách loại hợp đồng gồm không xác định thời hạn, xác định thời hạn, thử việc, thỉnh giảng. | Need-20 |
| **CFG-011** | Cấu hình thời hạn Min/Max cho từng loại HĐ xác định thời hạn, thử việc, thỉnh giảng. | Need-21 |
| **CFG-012** | Cấu hình số lần ký tối đa (1 lần) với HĐ thử việc trước khi chuyển đổi. | Need-22 |
| **CFG-013** | Cấu hình số lần ký tối đa với HĐ xác định thời hạn trước khi chuyển đổi. | Need-23 |
| **CFG-014** | Cấu hình thời gian tối đa chuyển đổi/ký tiếp HĐ. | Need-24 |
| **CFG-015** | Định nghĩa danh sách loại đánh giá (Khen thưởng/Kỷ luật). | Need-25 |
| **CFG-016** | Định nghĩa danh sách loại khóa đào tạo. | Need-25 |
| **CFG-017** | Quản lý Danh mục dùng chung: Quốc gia/Tỉnh/Huyện, Dân tộc, Tôn giáo, Trình độ, Chức danh, Chức vụ, Đơn vị. | Need-26 |
| **CFG-018** | Thêm/Sửa mục danh mục, Active/Inactive, Sắp xếp thứ tự. | Need-27 |
| **CFG-019** | Không cho xóa mục đang sử dụng (chỉ Inactive). | Need-28 |
| **CFG-020** | Lưu lịch sử thay đổi cấu hình + Lý do sửa. | Need-30 |

### 3.3 Nghiệp vụ Tổ chức Cán bộ (HR Management)
*Mapping to Needs: 32-105*

| ID | Description | Need ID |
| :--- | :--- | :--- |
| **HRM-001** | Đăng nhập/Đăng xuất cho cán bộ TCCB. | Need-32,33 |
| **HRM-002** | Xem danh sách hồ sơ: Tìm kiếm, Lọc, Xem chi tiết, Đánh dấu sửa/thôi việc. | Need-34 |
| **HRM-003** | Thêm mới hồ sơ: Thông tin cá nhân, CCCD, MST, BHXH, BHYT, Liên hệ, Email. | Need-35 |
| **HRM-004** | Cập nhật thông tin gia đình: Vợ/chồng, con, người phụ thuộc. | Need-36 |
| **HRM-005** | Upload ảnh chân dung 3x4 / 4x6. | Need-37 |
| **HRM-006** | Cập nhật thông tin ngân hàng: Tên NH, STK, Chi nhánh. | Need-38 |
| **HRM-007** | Nhập quá trình công tác trước khi vào trường. | Need-39 |
| **HRM-008** | Nhập thông tin Đảng (Ngày vào, Đảng bộ) và Công đoàn. | Need-40,41 |
| **HRM-009** | Tự động sinh Mã cán bộ sau khi lưu. | Need-42 |
| **HRM-010** | Sửa thông tin hồ sơ và Lưu lịch sử thay đổi + Lý do sửa. | Need-43,45 |
| **HRM-011** | Đánh dấu thôi việc nhân sự. | Need-44 |
| **HRM-012** | Xem chi tiết hồ sơ (bao gồm cả lý do yêu cầu chỉnh sửa từ nhân viên). | Need-46 |
| **HRM-013** | Tìm kiếm nâng cao theo Đơn vị, Trình độ, Chức danh. | Need-47 |
| **HRM-014** | Xuất hồ sơ ra PDF, Excel, Word theo mẫu. | Need-48 |
| **HRM-015** | Nhập trình độ học vấn từ danh mục cấu hình. | Need-56 |
| **HRM-016** | Lưu chi tiết bằng cấp + Ảnh scan (Tên, Ngành, Trường, Xếp loại). | Need-57 |
| **HRM-017** | Nhập chức danh khoa học, Ngạch viên chức, Danh hiệu. | Need-58 |
| **HRM-018** | Lưu chứng chỉ + Ảnh scan (Tên, Nơi cấp, Ngày cấp/hết hạn). | Need-60 |
| **HRM-019** | Cảnh báo chứng chỉ hết hạn. | Need-61 |
| **HRM-020** | Lưu Hợp đồng: Số, Ngày ký/Hiệu lực/Hết hạn, Loại HĐ, Phụ lục, Ảnh scan. | Need-76 |
| **HRM-021** | Chức năng Gia hạn hợp đồng. | Need-77 |
| **HRM-022** | Chức năng Chấm dứt hợp đồng (Lý do, Ngày, Thanh toán). | Need-78 |
| **HRM-023** | Cảnh báo Hợp đồng sắp hết hạn (ngày config). | Need-79 |
| **HRM-024** | Validate thời hạn Min/Max theo cấu hình. | Need-85 |
| **HRM-025** | Đề xuất loại HĐ khi gia hạn (theo quy tắc cấu hình). | Need-86 |
| **HRM-026** | Chặn tạo thêm nếu đã đạt giới hạn số lần ký (HĐ có thời hạn). | Need-87 |
| **HRM-027** | Quản lý hợp đồng giảng viên/chuyên gia nước ngoài. | Need-83 |
| **HRM-028** | In hợp đồng theo mẫu. | Need-82 |
| **HRM-029** | Lưu Ngạch lương, Bậc lương, Hệ số lương hiện tại. | Need-110,111 |
| **HRM-030** | Lưu lịch sử thay đổi lương + ngày hiệu lực. | Need-112 |
| **HRM-031** | Thêm/Sửa phụ cấp nhân sự theo loại cấu hình. | Need-112 |
| **HRM-032** | Tự động tính thâm niên từ ngày vào ngành. | Need-113 |
| **HRM-033** | Quản lý Khen thưởng: Loại, Chi tiết, Kèm file minh chứng. | Need-93 |
| **HRM-034** | Quản lý Kỷ luật: Loại, Chi tiết. | Need-94 |
| **HRM-035** | Hiển thị sơ đồ cây: Trường -> Ban/Khoa -> Bộ môn. | Need-65 |
| **HRM-036** | Quản lý đơn vị: Thêm/Sửa Tên, Mã, Email, Website. | Need-66,69 |
| **HRM-037** | Cấu hình cây phân cấp cha-con linh hoạt. | Need-67 |
| **HRM-038** | Quản lý lịch sử Thành lập/Sáp nhập/Giải thể đơn vị. | Need-70 |
| **HRM-039** | Phân công nhân viên vào đơn vị. | Need-72 |
| **HRM-040** | Hỗ trợ kiêm nhiệm (1 người - nhiều đơn vị). | Need-73 |
| **HRM-041** | Quản lý chức vụ quản lý (Bổ nhiệm/Miễn nhiệm + Lịch sử, Thông báo trống). | Need-62 |
| **HRM-042** | Phân công giảng viên vào 1 Bộ môn duy nhất. | Need-51 |
| **HRM-043** | Quản lý chức vụ trong Bộ môn. | Need-52 |
| **HRM-044** | Hiển thị định dạng chuẩn: Học hàm + Học vị + Tên. | Need-53 |
| **HRM-045** | Xem danh sách kế hoạch đào tạo theo năm. | Need-97,98 |
| **HRM-046** | Quản lý loại đào tạo (Trong/Ngoài nước, Ngắn/Dài hạn). | Need-99 |
| **HRM-047** | Tạo khóa đào tạo: Thời gian, Địa điểm, Kinh phí, Cam kết, Chứng chỉ. | Need-101 |
| **HRM-048** | Mở đăng ký khóa đào tạo (cấu hình thời gian, giới hạn). | Need-101 |
| **HRM-049** | Đưa nhân sự vào khóa đào tạo; Theo dõi tiến độ (Học/Xong/Bỏ). | Need-102 |
| **HRM-050** | Tự động cập nhật chứng chỉ sau khi hoàn thành. | Need-104 |
| **HRM-051** | Thống kê trình độ theo đơn vị/toàn trường. | Need-64 |
| **HRM-052** | Xuất báo cáo tình hình đào tạo. | Need-105 |
| **RPT-001** | Dashboard tổng quan nhân sự cho lãnh đạo. | Need-119 |
| **RPT-002** | Báo cáo tổng hợp nhân sự theo đơn vị/trường. | Need-120 |
| **RPT-003** | Báo cáo cơ cấu nhân sự (Trình độ, Độ tuổi, Giới tính). | Need-121 |
| **RPT-004** | Báo cáo biến động (Tuyển, Nghỉ, Chuyển). | Need-122 |
| **RPT-005** | Lập báo cáo theo kỳ (Tháng/Quý/Năm). | Need-126 |
| **RPT-006** | Xuất báo cáo Excel, PDF, Word. | Need-127 |

### 3.4 Nghiệp vụ Tài chính - Kế toán (Finance)
*Mapping to Needs: 107-116/157-160*

| ID | Description | Need ID |
| :--- | :--- | :--- |
| **FIN-001** | Đăng nhập/Đăng xuất cho cán bộ TCKT. | Need-107,108 |
| **FIN-002** | Xem danh sách hồ sơ (chỉ xem, lọc, tìm kiếm). | Need-34 |
| **FIN-003** | Xem "Hồ sơ dữ liệu lương": Ngạch, Bậc, Hệ số, Phụ cấp. | Need-34 |
| **FIN-004** | Export dữ liệu lương ra Excel hoặc cung cấp API cho hệ thống tính lương ngoài. | Need-116 |

### 3.5 Cổng Tự phục vụ (Self-Service Portal)
*Mapping to Needs: 137-150*

| ID | Description | Need ID |
| :--- | :--- | :--- |
| **SSP-001** | Đăng nhập/Đăng xuất cho CBGV. | Need-137,138 |
| **SSP-002** | Xem thông tin hồ sơ cá nhân đầy đủ. | Need-139 |
| **SSP-003** | Gửi yêu cầu cập nhật thông tin (về TCCB duyệt). | Need-140 |
| **SSP-004** | Xem lịch sử hợp đồng (Loại, Thời hạn...). | Need-144 |
| **SSP-005** | Xem kết quả khen thưởng, kỷ luật. | Need-145 |
| **SSP-006** | Xem danh sách khóa đào tạo đã tham gia. | Need-146 |
| **SSP-007** | Xem và Đăng ký các khóa đào tạo đang mở. | Need-150 |

---

## 4. Detailed Use Case Specifications

### Module: 3.1 Quản trị hệ thống (System Administration)

#### 1. UC-SYS-001: Đăng nhập (Login)
**Mô tả:** Cho phép người dùng xác thực và truy cập vào hệ thống dựa trên thông tin tài khoản được cấp.
**Actors:** Quản trị viên, Cán bộ TCCB, Cán bộ TCKT, Lãnh đạo trường, Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SYS-001, SYS-002

**Preconditions:**
*   Người dùng đã được cấp tài khoản.
*   Hệ thống đang hoạt động bình thường.

**Postconditions:**
*   Thành công: Người dùng được chuyển đến trang chủ (Dashboard) tương ứng với vai trò của mình.
*   Thất bại: Người dùng vẫn ở lại màn hình đăng nhập và nhận thông báo lỗi.

**Main Flow:**
1.  Người dùng truy cập vào địa chỉ web của hệ thống.
2.  Hệ thống hiển thị màn hình Đăng nhập.
3.  Người dùng nhập `Tên đăng nhập` và `Mật khẩu`.
4.  Người dùng nhấn nút "Đăng nhập".
5.  Hệ thống kiểm tra tính hợp lệ của dữ liệu nhập (không được để trống).
6.  Hệ thống xác thực thông tin tài khoản với cơ sở dữ liệu.
7.  Hệ thống kiểm tra trạng thái tài khoản (Active/Locked).
8.  Hệ thống xác định vai trò của người dùng.
9.  Hệ thống chuyển hướng người dùng đến Dashboard tương ứng.

**Alternative Flows:**
*   **A1: Đăng nhập khi đã có session**
    *   Nếu người dùng truy cập trang đăng nhập khi đã có session hợp lệ, hệ thống tự động chuyển hướng vào Dashboard.

**Exception Flows:**
*   **E1: Sai Tên đăng nhập hoặc Mật khẩu**
    *   Tại bước 6, nếu thông tin không khớp, hệ thống hiển thị thông báo "Tên đăng nhập hoặc mật khẩu không đúng".
*   **E2: Tài khoản bị khóa**
    *   Tại bước 7, nếu tài khoản bị khóa, hệ thống hiển thị thông báo "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Quản trị viên".

#### 2. UC-SYS-002: Đăng xuất (Logout)
**Mô tả:** Cho phép người dùng thoát khỏi phiên làm việc hiện tại một cách an toàn. Cũng bao gồm việc tự động đăng xuất khi hết phiên.
**Actors:** Tất cả người dùng đã đăng nhập.
**Liên quan đến Requirements:** SYS-003, SYS-004

**Preconditions:**
*   Người dùng đang trong phiên đăng nhập hợp lệ.

**Postconditions:**
*   Phiên làm việc bị hủy bỏ.
*   Người dùng được chuyển về màn hình Đăng nhập.

**Main Flow (Đăng xuất thủ công):**
1.  Người dùng nhấn vào Avatar hoặc Tên tài khoản ở góc màn hình.
2.  Hệ thống hiển thị menu cá nhân.
3.  Người dùng chọn "Đăng xuất".
4.  Hệ thống hủy session hiện tại.
5.  Hệ thống chuyển hướng về trang Đăng nhập.

**Alternative Flows (Tự động đăng xuất - Auto Logout):**
1.  Hệ thống giám sát thời gian không hoạt động (idle time) của người dùng.
2.  Nếu thời gian idle vượt quá **30 phút** (cấu hình SYS-003).
3.  Hệ thống tự động hủy session.
4.  Hệ thống hiển thị thông báo "Phiên làm việc đã hết hạn" và chuyển về trang Đăng nhập.

#### 3. UC-SYS-003: Quản lý Người dùng (Manage Users)
**Mô tả:** Cho phép Quản trị viên thêm mới, tìm kiếm, cập nhật thông tin, reset mật khẩu và khóa/mở khóa tài khoản người dùng.
**Actors:** Quản trị viên hệ thống (System Admin).
**Liên quan đến Requirements:** SYS-005, SYS-006, SYS-007, SYS-008

**Preconditions:**
*   Người dùng đã đăng nhập với vai trò Quản trị viên hệ thống.

**Postconditions:**
*   Thông tin người dùng được cập nhật trong cơ sở dữ liệu.

**Main Flow (Xem và Tìm kiếm):**
1.  Admin chọn menu "Quản trị hệ thống" -> "Quản lý người dùng".
2.  Hệ thống hiển thị danh sách người dùng (phân trang).
3.  Admin nhập từ khóa vào ô tìm kiếm (Username, Họ tên, Email).
4.  Hệ thống lọc và hiển thị danh sách kết quả tương ứng.

**Alternative Flow 1: Thêm mới người dùng:**
1.  Tại màn hình danh sách, Admin nhấn nút "Thêm mới".
2.  Hệ thống hiển thị form thêm người dùng.
3.  Admin nhập thông tin: `Tên đăng nhập`, `Mật khẩu`, `Họ tên`, `Email`.
4.  Admin chọn `Vai trò` (Role) cho người dùng (SYS-008).
5.  Admin nhấn "Lưu".
6.  Hệ thống validate dữ liệu (Username duy nhất, Email đúng định dạng, Password đủ mạnh - SYS-002).
7.  Hệ thống lưu thông tin và hiển thị thông báo "Thêm mới thành công".

**Alternative Flow 2: Sửa thông tin tài khoản:**
1.  Tại danh sách, Admin nhấn icon "Sửa" trên một dòng user.
2.  Hệ thống hiển thị form cập nhật (Username không được sửa).
3.  Admin thay đổi `Họ tên`, `Email`, hoặc `Vai trò`.
4.  Admin nhấn "Lưu".
5.  Hệ thống lưu thay đổi và thông báo thành công.

**Alternative Flow 3: Reset Mật khẩu:**
1.  Tại form sửa user, Admin nhấn nút "Reset Mật khẩu".
2.  Admin nhập mật khẩu mới (hoặc hệ thống sinh ngẫu nhiên).
3.  Admin xác nhận.
4.  Hệ thống cập nhật mật khẩu mới (đã mã hóa) và thông báo thành công.

**Alternative Flow 4: Khóa/Mở khóa tài khoản:**
1.  Tại danh sách, Admin nhấn icon "Khóa" (hoặc "Mở khóa") trên dòng user.
2.  Hệ thống hiển thị popup xác nhận.
3.  Admin xác nhận.
4.  Hệ thống cập nhật trạng thái `Active` / `Locked` và load lại danh sách.

**Exception Flows:**
*   **E1: Dữ liệu không hợp lệ:** Username trùng, Email sai định dạng, hoặc Password < 8 ký tự -> Hệ thống báo lỗi.
*   **E2: Không thể khóa chính mình:** Admin cố gắng khóa tài khoản của chính mình -> Hệ thống từ chối.

### Module: 3.2 Quản lý Cấu hình (Configuration Management)

#### 4. UC-CFG-001: Cấu hình Lương và Phụ cấp
**Mô tả:** Quản trị viên thiết lập mức lương cơ sở, hệ số lương theo ngạch/bậc và các loại phụ cấp.
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** CFG-001 đến CFG-009

**Preconditions:**
*   Người dùng đăng nhập với vai trò Quản trị viên.

**Main Flow (Quản lý Mức lương cơ sở):**
1.  Admin chọn menu "Quản lý Cấu hình" -> "Lương & Phụ cấp".
2.  Admin chọn tab "Mức lương cơ sở".
3.  Hệ thống hiển thị danh sách lịch sử mức lương cơ sở (Mức lương, Ngày hiệu lực).
4.  Admin nhấn "Thêm mới".
5.  Admin nhập `Mức lương` (VNĐ) và `Ngày hiệu lực`.
6.  **Admin nhập "Lý do thay đổi" (bắt buộc).**
7.  Admin nhấn "Lưu".
8.  Hệ thống lưu dữ liệu và áp dụng cho các tính toán từ ngày hiệu lực đó.

**Alternative Flow 1: Quản lý Hệ số Ngạch/Bậc:**
1.  Admin chọn tab "Hệ số lương".
2.  Hệ thống hiển thị danh sách Ngạch (Giảng viên, Chuyên viên...).
3.  Admin chọn một Ngạch để xem chi tiết các Bậc.
4.  Admin có thể Sửa hệ số của một bậc hoặc Thêm bậc mới.
5.  **Admin nhập "Lý do thay đổi" (bắt buộc).**
6.  Hệ thống lưu lịch sử thay đổi (CFG-006).

**Alternative Flow 2: Quản lý Loại Phụ cấp:**
1.  Admin chọn tab "Phụ cấp".
2.  Hệ thống hiển thị danh sách các loại phụ cấp.
3.  Admin nhấn "Thêm mới".
4.  Admin nhập: `Tên phụ cấp`, `Loại tính` (Hệ số lương cơ sở / Số tiền cố định / % Lương), `Công thức`.
5.  **Admin nhập "Lý do thay đổi" nếu chỉnh sửa.**
6.  Admin nhấn "Lưu".

#### 5. UC-CFG-002: Cấu hình Hợp đồng
**Mô tả:** Quản trị viên cấu hình các loại hợp đồng và quy tắc thời hạn, số lần ký tối đa.
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** CFG-010 đến CFG-014

**Main Flow:**
1.  Admin chọn menu "Quản lý Cấu hình" -> "Hợp đồng".
2.  Hệ thống hiển thị danh sách loại hợp đồng.
3.  Admin chọn một loại (VD: Hợp đồng xác định thời hạn) để sửa.
4.  Admin cập nhật tham số:
    *   `Thời hạn tối thiểu` (tháng).
    *   `Thời hạn tối đa` (tháng).
    *   `Số lần ký tối đa` (trước khi phải chuyển loại).
5.  **Admin nhập "Lý do thay đổi" (bắt buộc).**
6.  Admin nhấn "Lưu".
7.  Hệ thống cập nhật quy tắc validate cho module Hợp đồng.

#### 6. UC-CFG-003: Quản lý Danh mục Dùng chung (Master Data)
**Mô tả:** Quản lý các danh mục chuẩn như Tỉnh/Thành phố, Dân tộc, Học hàm, Học vị, Chức vụ.
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** CFG-017 đến CFG-020

**Main Flow:**
1.  Admin chọn menu "Quản lý Cấu hình" -> "Danh mục dùng chung".
2.  Admin chọn loại danh mục cần quản lý (VD: Chức vụ).
3.  Hệ thống hiển thị danh sách các mục (Items).
4.  Admin nhấn "Thêm mới" hoặc chọn "Sửa" một mục.
5.  Admin nhập `Mã`, `Tên`, `Mô tả`, `Thứ tự hiển thị`.
6.  **Admin nhập "Lý do thay đổi" nếu sửa**
7.  Admin nhấn "Lưu".

**Exception Flow:**
*   **E1: Xóa mục đang sử dụng:**
    *   Admin nhấn "Xóa" một mục đang được gán cho nhân sự.
    *   Hệ thống thông báo: "Không thể xóa mục đang được sử dụng. Vui lòng chọn 'Ngừng hoạt động' (Inactive) thay thế." (CFG-019).

### Module: 3.3 Nghiệp vụ Tổ chức Cán bộ (HR Management)

#### 7. UC-HRM-001: Quản lý Hồ sơ Nhân sự (Manage Employee Profiles)
**Mô tả:** Cho phép cán bộ TCCB quản lý toàn bộ thông tin hồ sơ nhân sự, bao gồm thêm mới, cập nhật thông tin cá nhân, gia đình, và xem chi tiết hồ sơ.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-001 đến HRM-014 (Needs 32-48)

**Preconditions:**
*   Cán bộ TCCB đã đăng nhập hệ thống.

**Postconditions:**
*   Hồ sơ nhân sự được tạo mới hoặc cập nhật.
*   Lịch sử thay đổi được ghi lại.

**Main Flow (Tìm kiếm và Xem danh sách):**
1.  Cán bộ TCCB chọn menu "Quản lý Hồ sơ".
2.  Hệ thống hiển thị danh sách hồ sơ nhân viên (Mã, Họ tên, Đơn vị, Chức vụ...).
3.  Cán bộ TCCB nhập từ khóa vào ô tìm kiếm hoặc sử dụng bộ lọc nâng cao (Đơn vị, Trình độ, Chức danh).
4.  Hệ thống hiển thị kết quả lọc.
5.  Cán bộ TCCB chọn một hồ sơ để xem chi tiết hoặc thực hiện các hành động khác.

**Alternative Flow 1: Thêm mới Hồ sơ:**
1.  Tại màn hình danh sách, Cán bộ TCCB nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu chia thành các tabs/bước.
3.  Cán bộ TCCB nhập **Thông tin chung**: Họ tên, Ngày sinh, Giới tính, CCCD, MST, BHXH, Email, SĐT.
4.  Cán bộ TCCB nhập **Thông tin gia đình**: Vợ/chồng, con, người phụ thuộc.
5.  Cán bộ TCCB nhập **Thông tin ngân hàng**: Tên NH, STK.
6.  Cán bộ TCCB nhập **Quá trình công tác** trước khi về trường và **Thông tin Đảng/Đoàn**.
7.  Cán bộ TCCB upload ảnh chân dung.
8.  Cán bộ TCCB nhấn "Lưu".
9.  Hệ thống tự động sinh **Mã cán bộ**.
10. Hệ thống lưu hồ sơ và thông báo thành công.

**Alternative Flow 2: Cập nhật Hồ sơ:**
1.  Cán bộ TCCB chọn "Sửa" trên hồ sơ nhân viên.
2.  Hệ thống hiển thị form thông tin hiện tại.
3.  Cán bộ TCCB thay đổi thông tin cần thiết.
4.  **Cán bộ TCCB nhập "Lý do sửa" (bắt buộc).**
5.  Cán bộ TCCB nhấn "Lưu".
6.  Hệ thống lưu thay đổi và ghi log lịch sử.

**Alternative Flow 3: Đánh dấu Thôi việc:**
1.  Cán bộ TCCB chọn chức năng "Đánh dấu thôi việc".
2.  Hệ thống yêu cầu xác nhận và nhập ngày/lý do thôi việc.
3.  Cán bộ TCCB xác nhận.
4.  Hệ thống cập nhật trạng thái nhân sự sang "Thôi việc" (Inactive).

**Alternative Flow 4: Phê duyệt Yêu cầu Cập nhật (System Approval):**
1.  Cán bộ TCCB truy cập danh sách "Yêu cầu chờ duyệt" (được gửi từ Cổng Self-Service).
2.  Hệ thống hiển thị các yêu cầu chờ xử lý.
3.  Cán bộ TCCB chọn một yêu cầu để xem chi tiết (Hệ thống hiển thị so sánh dữ liệu Cũ vs Mới).
4.  Cán bộ TCCB nhập "Ghi chú/Lý do" (Tùy chọn nếu Duyệt, Bắt buộc nếu Từ chối).
5.  Cán bộ TCCB nhấn nút **"Duyệt"** hoặc **"Từ chối"**.
6.  *Nếu Duyệt:* Hệ thống cập nhật dữ liệu vào hồ sơ chính thức và gửi thông báo cho nhân sự.
7.  *Nếu Từ chối:* Hệ thống cập nhật trạng thái yêu cầu là "Từ chối" và gửi thông báo kèm lý do cho nhân sự.

#### 8. UC-HRM-002: Quản lý Trình độ và Chức danh
**Mô tả:** Quản lý thông tin học vấn, bằng cấp, chứng chỉ và các chức danh khoa học của nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-015 đến HRM-019 (Needs 56-61)

**Main Flow (Cập nhật Bằng cấp):**
1.  Cán bộ TCCB chọn tab "Trình độ & Chức danh" trong hồ sơ.
2.  Hệ thống hiển thị danh sách bằng cấp đã lưu.
3.  Cán bộ TCCB nhấn "Thêm bằng cấp".
4.  Cán bộ TCCB chọn `Trình độ` (Tiến sĩ, Thạc sĩ...) từ danh mục.
5.  Nhập chi tiết: Tên bằng, Trường, Ngành, Năm tốt nghiệp, Xếp loại.
6.  Upload file scan văn bằng.
7.  Nhấn "Lưu".

**Alternative Flow 1: Quản lý Chức danh:**
1.  Tại tab "Trình độ & Chức danh", mục Chức danh/Ngạch.
2.  Cán bộ TCCB chọn `Chức danh khoa học` (GS, PGS), `Ngạch viên chức`, `Danh hiệu` từ danh mục.
3.  Nhấn "Lưu".

**Alternative Flow 2: Quản lý Chứng chỉ và Cảnh báo:**
1.  Cán bộ TCCB nhấn "Thêm chứng chỉ".
2.  Nhập Tên, Nơi cấp, Ngày cấp, **Ngày hết hạn**.
3.  Hệ thống kiểm tra `Ngày hết hạn`. Nếu sắp hết hạn (so với ngày hiện tại + config), hệ thống vẫn lưu nhưng có thể hiển thị flag cảnh báo.

#### 9. UC-HRM-003: Quản lý Hợp đồng Lao động
**Mô tả:** Quản lý vòng đời hợp đồng lao động: Tạo mới, Gia hạn, Chấm dứt và In hợp đồng.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-020 đến HRM-028 (Needs 76-87)

**Main Flow (Tạo mới Hợp đồng):**
1.  Cán bộ TCCB chọn tab "Hợp đồng" trong hồ sơ nhân sự.
2.  Nhấn "Thêm mới HĐ".
3.  Chọn `Loại hợp đồng` (Xác định thời hạn, Không xác định thời hạn...).
4.  Hệ thống kiểm tra số lần ký tối đa cho loại HĐ này (UC-CFG-002). Nếu vượt quá, yêu cầu chuyển loại HĐ.
5.  Nhập Số HĐ, Ngày ký, Ngày hiệu lực, Ngày hết hạn.
6.  Hệ thống validate thời hạn Min/Max của loại HĐ.
7.  Nhấn "Lưu".

**Alternative Flow 1: Gia hạn Hợp đồng:**
1.  Cán bộ TCCB chọn hợp đồng sắp hết hạn, nhấn "Gia hạn".
2.  **Hệ thống đề xuất Loại hợp đồng tiếp theo dựa trên quy tắc chuyển đổi đã cấu hình (UC-CFG-002).**
3.  Cán bộ TCCB xác nhận hoặc điều chỉnh thông tin gia hạn.
4.  Lưu hợp đồng mới.

**Alternative Flow 2: Chấm dứt Hợp đồng:**
1.  Cán bộ TCCB chọn Hợp đồng đang hiệu lực, nhấn "Chấm dứt".
2.  Nhập Ngày chấm dứt, Lý do, Thông tin thanh toán/bồi thường.
3.  Xác nhận.
4.  Hệ thống cập nhật trạng thái Hợp đồng là "Đã chấm dứt".

**Alternative Flow 3: In Hợp đồng:**
1.  Cán bộ TCCB chọn Hợp đồng, nhấn "In".
2.  Hệ thống xuất file PDF theo mẫu quy định.

#### 10. UC-HRM-004: Quản lý Lương & Phụ cấp (Data Entry)
**Mô tả:** Nhập liệu thông tin ngạch lương, bậc lương, hệ số và các mục phụ cấp cho từng nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-029 đến HRM-032 (Needs 110-113)

**Main Flow (Cập nhật Lương):**
1.  Cán bộ TCCB chọn tab "Lương & Phụ cấp" trong hồ sơ nhân sự.
2.  Hệ thống hiển thị thông tin lương hiện tại.
3.  Cán bộ TCCB nhấn "Cập nhật Lương".
4.  Cán bộ TCCB chọn `Ngạch lương`, `Bậc lương`.
5.  Hệ thống tự động hiển thị `Hệ số` tương ứng (theo cấu hình).
6.  **Hệ thống tự động tính toán lại % Phụ cấp thâm niên dựa trên 'Ngày vào ngành' và ngày hiện tại.**
7.  Nhập `Ngày hiệu lực`.
8.  **Cán bộ TCCB nhập "Lý do điều chỉnh" (bắt buộc).**
9.  Nhấn "Lưu".
10. Hệ thống lưu lịch sử thay đổi mức lương.

**Alternative Flow 1: Quản lý Phụ cấp:**
1.  Tại tab "Lương & Phụ cấp", mục "Danh sách Phụ cấp".
2.  Cán bộ TCCB nhấn "Thêm phụ cấp".
3.  Chọn `Loại phụ cấp` từ danh mục.
4.  Hệ thống hiển thị mức phụ cấp mặc định hoặc cho phép nhập số tiền/hệ số (tùy cấu hình).
5.  Nhấn "Lưu".

#### 11. UC-HRM-005: Quản lý Khen thưởng & Kỷ luật
**Mô tả:** Ghi nhận các quyết định khen thưởng hoặc kỷ luật đối với nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-033, HRM-034 (Needs 93, 94)

**Main Flow (Thêm Khen thưởng):**
1.  Cán bộ TCCB chọn tab "Khen thưởng & Kỷ luật" trong hồ sơ nhân sự.
2.  Nhấn "Thêm Khen thưởng".
3.  Nhập/Chọn: `Loại khen thưởng`, `Ngày quyết định`, `Số quyết định`, `Nội dung`, `Số tiền thưởng` (nếu có).
4.  Đính kèm file minh chứng (PDF/Image).
5.  Nhấn "Lưu".

**Alternative Flow 1: Thêm Kỷ luật:**
1.  Nhấn "Thêm Kỷ luật".
2.  Nhập/Chọn: `Loại kỷ luật`, `Ngày quyết định`, `Lý do`, `Hình thức xử lý`.
3.  Nhấn "Lưu".

#### 12. UC-HRM-006: Quản lý Cơ cấu Tổ chức (Manage Organization)
**Mô tả:** Quản lý cây sơ đồ tổ chức, các đơn vị phòng ban và phân công nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-035 đến HRM-044 (Needs 65-73)

**Main Flow (Quản lý Cây đơn vị):**
1.  Cán bộ TCCB chọn menu "Cơ cấu Tổ chức" ở menu chính.
2.  Hệ thống hiển thị sơ đồ cây (Tree View).
3.  Cán bộ TCCB chọn một nút (đơn vị) để xem chi tiết.
4.  Có thể thực hiện: Thêm đơn vị con, Sửa thông tin, Giải thể.

**Alternative Flow 1: Phân công Nhân sự (Điều chuyển):**
1.  Cán bộ TCCB chọn đơn vị đích trên cây tổ chức.
2.  Nhấn "Thêm nhân sự" -> "Phân công / Điều chuyển".
3.  Tìm kiếm nhân sự từ danh sách hoặc từ đơn vị khác.
4.  Thiết lập `Chức vụ` tại đơn vị mới.
5.  Chọn là `Chức vụ chính` hay `Kiêm nhiệm`.
6.  Nếu là giảng viên, hệ thống ràng buộc chỉ thuộc 1 Bộ môn.
7.  Lưu thông tin.

#### 13. UC-HRM-007: Quản lý Đào tạo (Manage Training)
**Mô tả:** Lập kế hoạch, tổ chức các khóa đào tạo và ghi nhận kết quả cho nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-045 đến HRM-052 (Needs 97-105)

**Main Flow (Tạo Khóa đào tạo):**
1.  Cán bộ TCCB chọn menu "Đào tạo & Phát triển".
2.  Nhấn "Tạo khóa học mới".
3.  Nhập thông tin: Tên khóa, Loại (Trong/Ngoài nước), Thời gian, Địa điểm, Kinh phí.
4.  Thiết lập `Mở đăng ký` (Có/Không, Thời hạn đăng ký).
5.  Lưu khóa học.

**Alternative Flow 1: Ghi nhận Kết quả:**
1.  Cán bộ TCCB chọn Khóa học -> Tab "Danh sách học viên".
2.  Cập nhật trạng thái cho học viên: `Đang học` -> `Hoàn thành` (hoặc `Không đạt`).
3.  Nếu `Hoàn thành`, nhập thông tin chứng chỉ/kết quả.
4.  Hệ thống tự động cập nhật thông tin này vào hồ sơ cá nhân của nhân sự.

#### 14. UC-RPT-001: Báo cáo và Thống kê (Reports)
**Mô tả:** Cung cấp các báo cáo tổng hợp, thống kê về tình hình nhân sự cho lãnh đạo.
**Actors:** Lãnh đạo trường, Cán bộ TCCB.
**Liên quan đến Requirements:** RPT-001 đến RPT-006 (Needs 119-127)

**Main Flow (Xem Dashboard):**
1.  Lãnh đạo trường đăng nhập.
2.  Truy cập menu "Báo cáo".
3.  Hệ thống hiển thị Dashboard với các biểu đồ: Tổng nhân sự, Biến động nhân sự, Cơ cấu theo trình độ.

**Alternative Flow 1: Xuất Báo cáo:**
1.  Chọn loại báo cáo cụ thể (VD: Báo cáo biến động tháng 1/2026).
2.  Chọn tham số (Khoảng thời gian, Đơn vị).
3.  Nhấn "Xem trước" (Preview).
4.  Nhấn "Xuất Excel" hoặc "Xuất PDF".
5.  Hệ thống trả về file báo cáo theo mẫu.

### Module: 3.4 Nghiệp vụ Tài chính - Kế toán (Finance)

#### 15. UC-FIN-001: Xem Hồ sơ và Dữ liệu Lương
**Mô tả:** Cho phép cán bộ TCKT truy cập xem danh sách nhân sự và các thông tin liên quan đến lương, phụ cấp để phục vụ công tác tính lương. Chế độ xem là Read-only (chỉ đọc).
**Actors:** Cán bộ TCKT.
**Liên quan đến Requirements:** FIN-002, FIN-003 (Need 34)

**Preconditions:**
*   Cán bộ TCKT đã đăng nhập hệ thống.
*   Quyền hạn được phân là "TCKT" hoặc tương đương.

**Main Flow (Xem Danh sách):**
1.  Cán bộ TCKT truy cập menu "Dữ liệu Lương".
2.  Hệ thống hiển thị danh sách nhân sự toàn trường.
3.  Cán bộ TCKT sử dụng bộ lọc (Đơn vị, Trạng thái) hoặc tìm kiếm theo Tên/Mã.
4.  Hệ thống hiển thị danh sách rút gọn.

**Alternative Flow 1: Xem Chi tiết Lương:**
1.  Cán bộ TCKT chọn một nhân sự từ danh sách.
2.  Hệ thống hiển thị màn hình chi tiết nhưng ở chế độ `View-Only`.
3.  Cán bộ TCKT xem được các tab:
    *   **Thông tin chung**: Để xác định đúng người.
    *   **Lương & Phụ cấp**: Xem Ngạch, Bậc, Hệ số lương hiện tại, Các loại phụ cấp và hệ số tương ứng.
    *   **Hợp đồng**: Xem loại hợp đồng để biết chế độ đãi ngộ.
    *   **Công tác phí/Khen thưởng/Kỷ luật**: Xem các quyết định ảnh hưởng đến thu nhập trong kỳ.

#### 16. UC-FIN-002: Xuất Dữ liệu Lương (Export Salary Data)
**Mô tả:** Xuất dữ liệu lương và phụ cấp của nhân sự ra file Excel hoặc định dạng chuẩn để import vào phần mềm kế toán/tính lương chuyên dụng.
**Actors:** Cán bộ TCKT.
**Liên quan đến Requirements:** FIN-004 (Need 116)

**Main Flow:**
1.  Cán bộ TCKT truy cập menu "Xuất Dữ liệu".
2.  Chọn kỳ dữ liệu (Tháng/Năm) chốt số liệu.
3.  Chọn phạm vi xuất (Toàn trường hoặc theo Đơn vị).
4.  Nhấn "Xuất Excel".
5.  Hệ thống tổng hợp dữ liệu hiện hành (tính đến thời điểm chọn).
6.  Hệ thống tải xuống file Excel chứa: Mã NS, Họ tê, Hệ số lương, Hệ số phụ cấp, Số tài khoản NH, CNT...

**Alternative Flow 1: Kết nối API (System Flow):**
*   Đây không phải là thao tác người dùng trực tiếp trên giao diện web, nhưng là chức năng hệ thống hỗ trợ.
*   Phần mềm Kế toán gọi API lấy danh sách lương.
*   Hệ thống xác thực token API.
*   Hệ thống trả về JSON/XML dữ liệu lương.

### Module: 3.5 Cổng Tự phục vụ (Self-Service Portal)

#### 17. UC-SSP-001: Xem Hồ sơ Cá nhân (View My Profile)
**Mô tả:** Cho phép Cán bộ/Giảng viên (CBGV) xem toàn bộ thông tin hồ sơ cá nhân của mình đang được lưu trong hệ thống.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-002 (Need 139)

**Preconditions:**
*   CBGV đã đăng nhập vào Portal.

**Main Flow:**
1.  CBGV chọn menu "Hồ sơ của tôi" (My Profile).
2.  Hệ thống hiển thị trang thông tin cá nhân với các tab:
    *   **Thông tin chung**: Lý lịch, Liên hệ, Gia đình.
    *   **Công việc**: Đơn vị công tác, Chức vụ, Quá trình công tác.
    *   **Trình độ**: Bằng cấp, Chứng chỉ, Học hàm/Học vị.
3.  CBGV xem chi tiết các thông tin.

#### 18. UC-SSP-002: Yêu cầu Cập nhật Thông tin (Request Profile Update)
**Mô tả:** Cho phép CBGV gửi yêu cầu chỉnh sửa thông tin cá nhân khi có thay đổi (VD: đổi số điện thoại, địa chỉ, thêm bằng cấp mới). Yêu cầu này cần được Phòng TCCB phê duyệt mới có hiệu lực.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-003 (Need 140)

**Preconditions:**
*   CBGV đang xem hồ sơ cá nhân.

**Main Flow:**
1.  Tại màn hình hồ sơ, CBGV nhấn nút "Yêu cầu chỉnh sửa".
2.  Hệ thống mở form cho phép sửa một số trường thông tin cho phép (VD: SĐT, Địa chỉ, Email...).
3.  Với các thông tin quan trọng (Bằng cấp...), CBGV nhập thông tin mới và upload minh chứng.
4.  CBGV nhấn "Gửi yêu cầu".
5.  Hệ thống lưu yêu cầu ở trạng thái `Pending` (Chờ duyệt).
6.  Hệ thống gửi thông báo đến Cán bộ TCCB.

**Alternative Flow 1: Xem trạng thái yêu cầu:**
1.  CBGV truy cập "Lịch sử yêu cầu".
2.  Hệ thống hiển thị danh sách các yêu cầu đã gửi và trạng thái (Đã duyệt / Từ chối).
3.  Nếu bị Từ chối, xem lý do từ chối.

#### 19. UC-SSP-003: Tra cứu Thông tin (My Records)
**Mô tả:** Cho phép CBGV tra cứu lịch sử hợp đồng, các quyết định khen thưởng và kỷ luật của bản thân.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-004, SSP-005 (Need 144, 145)

**Main Flow:**
1.  CBGV chọn menu "Thông tin công việc".
2.  Chọn tab tương ứng: "Hợp đồng" hoặc "Khen thưởng/Kỷ luật".
3.  **Hợp đồng**: Xem danh sách các HĐ đã ký, Ngày hiệu lực/Hết hạn, Loại HĐ. Tải về bản scan (nếu có).
4.  **Khen thưởng/Kỷ luật**: Xem danh sách các quyết định, Số quyết định, Nội dung, Hình thức.

#### 20. UC-SSP-004: Đào tạo Cá nhân (My Training)
**Mô tả:** Cho phép CBGV theo dõi lịch sử đào tạo và đăng ký tham gia các khóa học mới do nhà trường tổ chức.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-006, SSP-007 (Need 146, 150)

**Main Flow (Xem Lịch sử Đào tạo):**
1.  CBGV chọn menu "Đào tạo".
2.  Hệ thống hiển thị tab "Lịch sử": Danh sách khóa học đã tham gia, Thời gian, Kết quả/Chứng chỉ.

**Alternative Flow 1: Đăng ký Khóa học:**
1.  CBGV chọn tab "Khóa học đang mở".
2.  Hệ thống hiển thị danh sách khóa học đang trong thời hạn đăng ký.
3.  CBGV xem chi tiết nội dung, thời gian.
4.  Nhấn nút "Đăng ký tham gia".
5.  Hệ thống ghi nhận đăng ký (có thể cần duyệt tùy cấu hình khóa học).
6.  Trạng thái chuyển thành "Đã đăng ký".

---

## 5. Non-Functional Requirements (Yêu cầu Phi chức năng)
*Mapping to Needs: 152-180*

### 5.1 Performance (Hiệu năng)
| ID | Description | Need ID |
| :--- | :--- | :--- |
| **NFR-001** | Phản hồi trang < 2s; Báo cáo phức tạp < 10s. | Need-152 |
| **NFR-002** | Hỗ trợ tối thiểu 500 người dùng đồng thời. | Need-153 |

### 5.2 Security (Bảo mật)
| ID | Description | Need ID |
| :--- | :--- | :--- |
| **NFR-003** | Xác thực username/password. | Need-155 |
| **NFR-004** | Phân quyền theo vai trò (Role-based). | Need-156 |
| **NFR-005** | Mã hóa dữ liệu nhạy cảm & Dùng HTTPS. | Need-157 |
| **NFR-006** | Ghi log thao tác quan trọng (Audit Trail). | Need-158 |
| **NFR-007** | Session timeout sau 30 phút. | Need-159 |
| **NFR-008** | Policy mật khẩu: min 8 ký tự, hoa, thường, số. | Need-160 |

### 5.3 Availability & Reliability
| ID | Description | Need ID |
| :--- | :--- | :--- |
| **NFR-009** | Uptime 99.5% giờ hành chính. | Need-161 |
| **NFR-010** | Backup tự động hàng ngày, lưu 30 ngày. | Need-162 |
| **NFR-011** | RTO < 4h, RPO < 24h. | Need-163 |
| **NFR-012** | Lưu trữ hồ sơ tối thiểu 10 năm. | Need-164 |

### 5.4 Usability & Scalability
| ID | Description | Need ID |
| :--- | :--- | :--- |
| **NFR-013** | Kiến trúc mở rộng được. | Need-165 |
| **NFR-014** | Giao diện tiếng Việt, Responsive. | Need-166 |
| **NFR-015** | Training 4h là dùng được chức năng cơ bản. | Need-167 |
| **NFR-016** | Có tài liệu hướng dẫn sử dụng đầy đủ. | Need-168 |
| **NFR-017** | Self-Service hỗ trợ Mobile/Tablet. | Need-169 |
| **NFR-018** | Hỗ trợ đa cơ sở (HN, Hưng Yên, HCM). | Need-175 |

### 5.5 Compliance & Integration
| ID | Description | Need ID |
| :--- | :--- | :--- |
| **NFR-019** | Xuất dữ liệu tương thích phần mềm kế toán. | Need-172 |
| **NFR-020** | Tuân thủ Bộ Luật Lao động 2019. | Need-176 |
| **NFR-021** | Tuân thủ Luật BHXH. | Need-177 |
| **NFR-022** | Tuân thủ quy định thuế thu nhập cá nhân. | Need-178 |
| **NFR-023** | Tuân thủ Luật Giáo dục & GD Đại học. | Need-179 |
| **NFR-024** | Tuân thủ Luật Viên chức. | Need-180 |
