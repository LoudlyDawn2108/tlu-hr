# Use Case Specifications

**Dự án:** Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi  
**Module:** 3.1 Quản trị hệ thống (System Administration)
**Ngày:** 30/01/2026

---

## 1. UC-SYS-001: Đăng nhập (Login)

**Mô tả:** Cho phép người dùng xác thực và truy cập vào hệ thống dựa trên thông tin tài khoản được cấp.
**Actors:** Quản trị viên, Cán bộ TCCB, Cán bộ TCKT, Lãnh đạo trường, Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SYS-001, SYS-002

### Preconditions (Điều kiện tiên quyết)
*   Người dùng đã được cấp tài khoản.
*   Hệ thống đang hoạt động bình thường.

### Postconditions (Điều kiện sau)
*   Thành công: Người dùng được chuyển đến trang chủ (Dashboard) tương ứng với vai trò của mình.
*   Thất bại: Người dùng vẫn ở lại màn hình đăng nhập và nhận thông báo lỗi.

### Main Flow (Luồng chính)
1.  Người dùng truy cập vào địa chỉ web của hệ thống.
2.  Hệ thống hiển thị màn hình Đăng nhập.
3.  Người dùng nhập `Tên đăng nhập` và `Mật khẩu`.
4.  Người dùng nhấn nút "Đăng nhập".
5.  Hệ thống kiểm tra tính hợp lệ của dữ liệu nhập (không được để trống).
6.  Hệ thống xác thực thông tin tài khoản với cơ sở dữ liệu.
7.  Hệ thống kiểm tra trạng thái tài khoản (Active/Locked).
8.  Hệ thống xác định vai trò của người dùng.
9.  Hệ thống chuyển hướng người dùng đến Dashboard tương ứng.

### Alternative Flows (Luồng thay thế)
*   **A1: Đăng nhập khi đã có session**
    *   Nếu người dùng truy cập trang đăng nhập khi đã có session hợp lệ, hệ thống tự động chuyển hướng vào Dashboard.

### Exception Flows (Luồng ngoại lệ)
*   **E1: Sai Tên đăng nhập hoặc Mật khẩu**
    *   Tại bước 6, nếu thông tin không khớp, hệ thống hiển thị thông báo "Tên đăng nhập hoặc mật khẩu không đúng".
*   **E2: Tài khoản bị khóa**
    *   Tại bước 7, nếu tài khoản bị khóa, hệ thống hiển thị thông báo "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Quản trị viên".

---

## 2. UC-SYS-002: Đăng xuất (Logout)

**Mô tả:** Cho phép người dùng thoát khỏi phiên làm việc hiện tại một cách an toàn. Cũng bao gồm việc tự động đăng xuất khi hết phiên.
**Actors:** Tất cả người dùng đã đăng nhập.
**Liên quan đến Requirements:** SYS-003, SYS-004

### Preconditions
*   Người dùng đang trong phiên đăng nhập hợp lệ.

### Postconditions
*   Phiên làm việc bị hủy bỏ.
*   Người dùng được chuyển về màn hình Đăng nhập.

### Main Flow (Đăng xuất thủ công)
1.  Người dùng nhấn vào Avatar hoặc Tên tài khoản ở góc màn hình.
2.  Hệ thống hiển thị menu cá nhân.
3.  Người dùng chọn "Đăng xuất".
4.  Hệ thống hủy session hiện tại.
5.  Hệ thống chuyển hướng về trang Đăng nhập.

### Alternative Flows (Tự động đăng xuất - Auto Logout)
1.  Hệ thống giám sát thời gian không hoạt động (idle time) của người dùng.
2.  Nếu thời gian idle vượt quá **30 phút** (cấu hình SYS-003).
3.  Hệ thống tự động hủy session.
4.  Hệ thống hiển thị thông báo "Phiên làm việc đã hết hạn" và chuyển về trang Đăng nhập.

---

## 3. UC-SYS-003: Quản lý Người dùng (Manage Users)

**Mô tả:** Cho phép Quản trị viên thêm mới, tìm kiếm, cập nhật thông tin, reset mật khẩu và khóa/mở khóa tài khoản người dùng.
**Actors:** Quản trị viên hệ thống (System Admin).
**Liên quan đến Requirements:** SYS-005, SYS-006, SYS-007, SYS-008

### Preconditions
*   Người dùng đã đăng nhập với vai trò Quản trị viên hệ thống.

### Postconditions
*   Thông tin người dùng được cập nhật trong cơ sở dữ liệu.

### Main Flow (Xem và Tìm kiếm)
1.  Admin chọn menu "Quản trị hệ thống" -> "Quản lý người dùng".
2.  Hệ thống hiển thị danh sách người dùng (phân trang).
3.  Admin nhập từ khóa vào ô tìm kiếm (Username, Họ tên, Email).
4.  Hệ thống lọc và hiển thị danh sách kết quả tương ứng.

### Alternative Flow 1: Thêm mới người dùng (Add User)
1.  Tại màn hình danh sách, Admin nhấn nút "Thêm mới".
2.  Hệ thống hiển thị form thêm người dùng.
3.  Admin nhập thông tin: `Tên đăng nhập`, `Mật khẩu`, `Họ tên`, `Email`.
4.  Admin chọn `Vai trò` (Role) cho người dùng (SYS-008).
5.  Admin nhấn "Lưu".
6.  Hệ thống validate dữ liệu (Username duy nhất, Email đúng định dạng, Password đủ mạnh - SYS-002).
7.  Hệ thống lưu thông tin và hiển thị thông báo "Thêm mới thành công".

### Alternative Flow 2: Sửa thông tin tài khoản (Edit User)
1.  Tại danh sách, Admin nhấn icon "Sửa" trên một dòng user.
2.  Hệ thống hiển thị form cập nhật (Username không được sửa).
3.  Admin thay đổi `Họ tên`, `Email`, hoặc `Vai trò`.
4.  Admin nhấn "Lưu".
5.  Hệ thống lưu thay đổi và thông báo thành công.

### Alternative Flow 3: Reset Mật khẩu (Reset Password)
1.  Tại form sửa user, Admin nhấn nút "Reset Mật khẩu".
2.  Admin nhập mật khẩu mới (hoặc hệ thống sinh ngẫu nhiên).
3.  Admin xác nhận.
4.  Hệ thống cập nhật mật khẩu mới (đã mã hóa) và thông báo thành công.

### Alternative Flow 4: Khóa/Mở khóa tài khoản (Lock/Unlock)
1.  Tại danh sách, Admin nhấn icon "Khóa" (hoặc "Mở khóa") trên dòng user.
2.  Hệ thống hiển thị popup xác nhận.
3.  Admin xác nhận.
4.  Hệ thống cập nhật trạng thái `Active` / `Locked` và load lại danh sách.

### Exception Flows
*   **E1: Dữ liệu không hợp lệ (Validation Error)**
    *   Nếu Username trùng, Email sai định dạng, hoặc Password < 8 ký tự (SYS-002).
    *   Hệ thống hiển thị lỗi cụ thể ngay tại trường dữ liệu tương ứng.
*   **E2: Không thể khóa chính mình**
    *   Nếu Admin cố gắng khóa tài khoản đang đăng nhập của chính mình.
    *   Hệ thống từ chối và thông báo "Không thể khóa tài khoản đang sử dụng".

---

**Module:** 3.2 Quản lý Cấu hình (Configuration Management)

## 4. UC-CFG-001: Cấu hình Lương và Phụ cấp

**Mô tả:** Quản trị viên thiết lập mức lương cơ sở, hệ số lương theo ngạch/bậc và các loại phụ cấp.
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** CFG-001 đến CFG-009

### Preconditions
*   Người dùng đăng nhập với vai trò Quản trị viên.

### Main Flow (Quản lý Mức lương cơ sở)
1.  Admin chọn menu "Quản lý Cấu hình" -> "Lương & Phụ cấp".
2.  Admin chọn tab "Mức lương cơ sở".
3.  Hệ thống hiển thị danh sách lịch sử mức lương cơ sở (Mức lương, Ngày hiệu lực).
4.  Admin nhấn "Thêm mới".
5.  Admin nhập `Mức lương` (VNĐ) và `Ngày hiệu lực`.
6.  Admin nhấn "Lưu".
7.  Hệ thống lưu dữ liệu và áp dụng cho các tính toán từ ngày hiệu lực đó.

### Alternative Flow 1: Quản lý Hệ số Ngạch/Bậc
1.  Admin chọn tab "Hệ số lương".
2.  Hệ thống hiển thị danh sách Ngạch (Giảng viên, Chuyên viên...).
3.  Admin chọn một Ngạch để xem chi tiết các Bậc.
4.  Admin có thể Sửa hệ số của một bậc hoặc Thêm bậc mới.
5.  Hệ thống lưu lịch sử thay đổi (CFG-006).

### Alternative Flow 2: Quản lý Loại Phụ cấp
1.  Admin chọn tab "Phụ cấp".
2.  Hệ thống hiển thị danh sách các loại phụ cấp.
3.  Admin nhấn "Thêm mới".
4.  Admin nhập: `Tên phụ cấp`, `Loại tính` (Hệ số lương cơ sở / Số tiền cố định / % Lương), `Công thức`.
5.  Admin nhấn "Lưu".

---

## 5. UC-CFG-002: Cấu hình Hợp đồng

**Mô tả:** Quản trị viên cấu hình các loại hợp đồng và quy tắc thời hạn, số lần ký tối đa.
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** CFG-010 đến CFG-014

### Main Flow
1.  Admin chọn menu "Quản lý Cấu hình" -> "Hợp đồng".
2.  Hệ thống hiển thị danh sách loại hợp đồng.
3.  Admin chọn một loại (VD: Hợp đồng xác định thời hạn) để sửa.
4.  Admin cập nhật tham số:
    *   `Thời hạn tối thiểu` (tháng).
    *   `Thời hạn tối đa` (tháng).
    *   `Số lần ký tối đa` (trước khi phải chuyển loại).
5.  Admin nhấn "Lưu".
6.  Hệ thống cập nhật quy tắc validate cho module Hợp đồng.

---

## 6. UC-CFG-003: Quản lý Danh mục Dùng chung (Master Data)

**Mô tả:** Quản lý các danh mục chuẩn như Tỉnh/Thành phố, Dân tộc, Học hàm, Học vị, Chức vụ.
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** CFG-017 đến CFG-020

### Main Flow
1.  Admin chọn menu "Quản lý Cấu hình" -> "Danh mục dùng chung".
2.  Admin chọn loại danh mục cần quản lý (VD: Chức vụ).
3.  Hệ thống hiển thị danh sách các mục (Items).
4.  Admin nhấn "Thêm mới" hoặc chọn "Sửa" một mục.
5.  Admin nhập `Mã`, `Tên`, `Mô tả`, `Thứ tự hiển thị`.
6.  Admin nhấn "Lưu".

### Exception Flow
*   **E1: Xóa mục đang sử dụng**
    *   Admin nhấn "Xóa" một mục đang được gán cho nhân sự.
    *   Hệ thống thông báo: "Không thể xóa mục đang được sử dụng. Vui lòng chọn 'Ngừng hoạt động' (Inactive) thay thế." (CFG-019).

---

**Module:** 3.3 Nghiệp vụ Tổ chức Cán bộ (HR Management)

## 7. UC-HRM-001: Quản lý Hồ sơ Nhân sự (Manage Employee Profiles)

**Mô tả:** Cho phép cán bộ TCCB quản lý toàn bộ thông tin hồ sơ nhân sự, bao gồm thêm mới, cập nhật thông tin cá nhân, gia đình, và xem chi tiết hồ sơ.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-001 đến HRM-014 (Needs 32-48)

### Preconditions
*   Cán bộ TCCB đã đăng nhập hệ thống.

### Postconditions
*   Hồ sơ nhân sự được tạo mới hoặc cập nhật.
*   Lịch sử thay đổi được ghi lại.

### Main Flow (Tìm kiếm và Xem danh sách)
1.  Cán bộ TCCB chọn menu "Quản lý Hồ sơ".
2.  Hệ thống hiển thị danh sách hồ sơ nhân viên (Mã, Họ tên, Đơn vị, Chức vụ...).
3.  Cán bộ TCCB nhập từ khóa vào ô tìm kiếm hoặc sử dụng bộ lọc nâng cao.
4.  Hệ thống hiển thị kết quả lọc.
5.  Cán bộ TCCB chọn một hồ sơ để xem chi tiết hoặc thực hiện các hành động khác.

### Alternative Flow 1: Thêm mới Hồ sơ (Add Profile)
1.  Tại màn hình danh sách, Cán bộ TCCB nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu chia thành các tabs/bước.
3.  Cán bộ TCCB nhập **Thông tin chung**: Họ tên, Ngày sinh, Giới tính, CCCD, MST, BHXH, Email, SĐT (HRM-003).
4.  Cán bộ TCCB nhập **Thông tin gia đình**: Vợ/chồng, con, người phụ thuộc (HRM-004).
5.  Cán bộ TCCB nhập **Thông tin ngân hàng**: Tên NH, STK (HRM-006).
6.  Cán bộ TCCB nhập **Quá trình công tác** trước khi về trường (HRM-007) và **Thông tin Đảng/Đoàn** (HRM-008).
7.  Cán bộ TCCB upload ảnh chân dung (HRM-005).
8.  Cán bộ TCCB nhấn "Lưu".
9.  Hệ thống tự động sinh **Mã cán bộ** (HRM-009).
10. Hệ thống lưu hồ sơ và thông báo thành công.

### Alternative Flow 2: Cập nhật Hồ sơ (Edit Profile)
1.  Cán bộ TCCB chọn "Sửa" trên hồ sơ nhân viên.
2.  Hệ thống hiển thị form thông tin hiện tại.
3.  Cán bộ TCCB thay đổi thông tin cần thiết.
4.  Cán bộ TCCB nhập "Lý do sửa" (nếu cấu hình yêu cầu bắt buộc).
5.  Cán bộ TCCB nhấn "Lưu".
6.  Hệ thống lưu thay đổi và ghi log lịch sử (HRM-010).

### Alternative Flow 3: Đánh dấu Thôi việc
1.  Cán bộ TCCB chọn chức năng "Đánh dấu thôi việc" (HRM-011).
2.  Hệ thống yêu cầu xác nhận và nhập ngày/lý do thôi việc.
3.  Cán bộ TCCB xác nhận.
4.  Hệ thống cập nhật trạng thái nhân sự sang "Thôi việc" (Inactive).

---

## 8. UC-HRM-002: Quản lý Trình độ và Chức danh

**Mô tả:** Quản lý thông tin học vấn, bằng cấp, chứng chỉ và các chức danh khoa học của nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-015 đến HRM-019 (Needs 56-61)

### Preconditions
*   Đang trong màn hình chi tiết hoặc chỉnh sửa hồ sơ nhân sự.

### Main Flow (Cập nhật Bằng cấp)
1.  Cán bộ TCCB chọn tab "Trình độ & Chức danh" trong hồ sơ.
2.  Hệ thống hiển thị danh sách bằng cấp đã lưu.
3.  Cán bộ TCCB nhấn "Thêm bằng cấp".
4.  Cán bộ TCCB chọn `Trình độ` (Tiến sĩ, Thạc sĩ...) từ danh mục.
5.  Nhập chi tiết: Tên bằng, Trường, Ngành, Năm tốt nghiệp, Xếp loại.
6.  Upload file scan văn bằng.
7.  Nhấn "Lưu".

### Alternative Flow 1: Quản lý Chức danh
1.  Tại tab "Trình độ & Chức danh", mục Chức danh/Ngạch.
2.  Cán bộ TCCB chọn `Chức danh khoa học` (GS, PGS), `Ngạch viên chức`, `Danh hiệu` từ danh mục (HRM-017).
3.  Nhấn "Lưu".

### Alternative Flow 2: Quản lý Chứng chỉ và Cảnh báo
1.  Cán bộ TCCB nhấn "Thêm chứng chỉ".
2.  Nhập Tên, Nơi cấp, Ngày cấp, **Ngày hết hạn**.
3.  Hệ thống kiểm tra `Ngày hết hạn`. Nếu sắp hết hạn (so với ngày hiện tại + config), hệ thống vẫn lưu nhưng có thể hiển thị flag cảnh báo (HRM-019).

---

## 9. UC-HRM-003: Quản lý Hợp đồng Lao động

**Mô tả:** Quản lý vòng đời hợp đồng lao động: Tạo mới, Gia hạn, Chấm dứt và In hợp đồng.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-020 đến HRM-028 (Needs 76-87)

### Main Flow (Tạo mới Hợp đồng)
1.  Cán bộ TCCB chọn tab "Hợp đồng" trong hồ sơ nhân sự.
2.  Nhấn "Thêm mới HĐ".
3.  Chọn `Loại hợp đồng` (Xác định thời hạn, Không xác định thời hạn...).
4.  Hệ thống kiểm tra số lần ký tối đa cho loại HĐ này (HRM-026). Nếu vượt quá, yêu cầu chuyển loại HĐ.
5.  Nhập Số HĐ, Ngày ký, Ngày hiệu lực, Ngày hết hạn.
6.  Hệ thống validate thời hạn Min/Max của loại HĐ (HRM-024).
7.  Nhấn "Lưu".

### Alternative Flow 1: Gia hạn Hợp đồng
1.  Cán bộ TCCB chọn hợp đồng sắp hết hạn, nhấn "Gia hạn".
2.  Hệ thống đề xuất Loại hợp đồng tiếp theo dựa trên quy tắc (VD: Sau 2 lần HĐ 12 tháng -> HĐ Không xác định thời hạn) (HRM-025).
3.  Cán bộ TCCB xác nhận hoặc điều chỉnh thông tin gia hạn.
4.  Lưu hợp đồng mới.

### Alternative Flow 2: Chấm dứt Hợp đồng
1.  Cán bộ TCCB chọn Hợp đồng đang hiệu lực, nhấn "Chấm dứt".
2.  Nhập Ngày chấm dứt, Lý do, Thông tin thanh toán/bồi thường (HRM-022).
3.  Xác nhận.
4.  Hệ thống cập nhật trạng thái Hợp đồng là "Đã chấm dứt".

### Alternative Flow 3: In Hợp đồng
1.  Cán bộ TCCB chọn Hợp đồng, nhấn "In".
2.  Hệ thống xuất file PDF theo mẫu quy định (HRM-028).

---

## 10. UC-HRM-004: Quản lý Lương & Phụ cấp (Data Entry)

**Mô tả:** Nhập liệu thông tin ngạch lương, bậc lương, hệ số và các mục phụ cấp cho từng nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-029 đến HRM-032 (Needs 110-113)

### Main Flow (Cập nhật Lương)
1.  Cán bộ TCCB chọn tab "Lương & Phụ cấp" trong hồ sơ nhân sự.
2.  Hệ thống hiển thị thông tin lương hiện tại.
3.  Cán bộ TCCB nhấn "Cập nhật Lương".
4.  Cán bộ TCCB chọn `Ngạch lương`, `Bậc lương`.
5.  Hệ thống tự động hiển thị `Hệ số` tương ứng (theo cấu hình).
6.  Nhập `Ngày hiệu lực`.
7.  Nhấn "Lưu".
8.  Hệ thống lưu lịch sử thay đổi mức lương (HRM-030).

### Alternative Flow 1: Quản lý Phụ cấp
1.  Tại tab "Lương & Phụ cấp", mục "Danh sách Phụ cấp".
2.  Cán bộ TCCB nhấn "Thêm phụ cấp".
3.  Chọn `Loại phụ cấp` từ danh mục.
4.  Hệ thống hiển thị mức phụ cấp mặc định hoặc cho phép nhập số tiền/hệ số (tùy cấu hình).
5.  Nhấn "Lưu".

---

## 11. UC-HRM-005: Quản lý Khen thưởng & Kỷ luật

**Mô tả:** Ghi nhận các quyết định khen thưởng hoặc kỷ luật đối với nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-033, HRM-034 (Needs 93, 94)

### Main Flow (Thêm Khen thưởng)
1.  Cán bộ TCCB chọn tab "Khen thưởng & Kỷ luật" trong hồ sơ nhân sự.
2.  Nhấn "Thêm Khen thưởng".
3.  Nhập/Chọn: `Loại khen thưởng`, `Ngày quyết định`, `Số quyết định`, `Nội dung`, `Số tiền thưởng` (nếu có).
4.  Đính kèm file minh chứng (PDF/Image).
5.  Nhấn "Lưu".

### Alternative Flow 1: Thêm Kỷ luật
1.  Nhấn "Thêm Kỷ luật".
2.  Nhập/Chọn: `Loại kỷ luật`, `Ngày quyết định`, `Lý do`, `Hình thức xử lý`.
3.  Nhấn "Lưu".

---

## 12. UC-HRM-006: Quản lý Cơ cấu Tổ chức (Manage Organization)

**Mô tả:** Quản lý cây sơ đồ tổ chức, các đơn vị phòng ban và phân công nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-035 đến HRM-044 (Needs 65-73)

### Main Flow (Quản lý Cây đơn vị)
1.  Cán bộ TCCB chọn menu "Cơ cấu Tổ chức" ở menu chính.
2.  Hệ thống hiển thị sơ đồ cây (Tree View).
3.  Cán bộ TCCB chọn một nút (đơn vị) để xem chi tiết.
4.  Có thể thực hiện: Thêm đơn vị con, Sửa thông tin, Giải thể (HRM-038).

### Alternative Flow 1: Phân công Nhân sự (Điều chuyển)
1.  Cán bộ TCCB chọn đơn vị đích trên cây tổ chức.
2.  Nhấn "Thêm nhân sự" -> "Phân công / Điều chuyển".
3.  Tìm kiếm nhân sự từ danh sách hoặc từ đơn vị khác.
4.  Thiết lập `Chức vụ` tại đơn vị mới.
5.  Chọn là `Chức vụ chính` hay `Kiêm nhiệm` (HRM-040).
6.  Nếu là giảng viên, hệ thống ràng buộc chỉ thuộc 1 Bộ môn (HRM-042).
7.  Lưu thông tin.

---

## 13. UC-HRM-007: Quản lý Đào tạo (Manage Training)

**Mô tả:** Lập kế hoạch, tổ chức các khóa đào tạo và ghi nhận kết quả cho nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-045 đến HRM-052 (Needs 97-105)

### Main Flow (Tạo Khóa đào tạo)
1.  Cán bộ TCCB chọn menu "Đào tạo & Phát triển".
2.  Nhấn "Tạo khóa học mới".
3.  Nhập thông tin: Tên khóa, Loại (Trong/Ngoài nước), Thời gian, Địa điểm, Kinh phí.
4.  Thiết lập `Mở đăng ký` (Có/Không, Thời hạn đăng ký) (HRM-048).
5.  Lưu khóa học.

### Alternative Flow 1: Ghi nhận Kết quả
1.  Cán bộ TCCB chọn Khóa học -> Tab "Danh sách học viên".
2.  Cập nhật trạng thái cho học viên: `Đang học` -> `Hoàn thành` (hoặc `Không đạt`).
3.  Nếu `Hoàn thành`, nhập thông tin chứng chỉ/kết quả.
4.  Hệ thống tự động cập nhật thông tin này vào hồ sơ cá nhân của nhân sự (HRM-050).

---

## 14. UC-RPT-001: Báo cáo và Thống kê (Reports)

**Mô tả:** Cung cấp các báo cáo tổng hợp, thống kê về tình hình nhân sự cho lãnh đạo.
**Actors:** Lãnh đạo trường, Cán bộ TCCB.
**Liên quan đến Requirements:** RPT-001 đến RPT-006 (Needs 119-127)

### Main Flow (Xem Dashboard)
1.  Lãnh đạo trường đăng nhập.
2.  Truy cập menu "Báo cáo".
3.  Hệ thống hiển thị Dashboard với các biểu đồ: Tổng nhân sự, Biến động nhân sự, Cơ cấu theo trình độ (RPT-001).

### Alternative Flow 1: Xuất Báo cáo
1.  Chọn loại báo cáo cụ thể (VD: Báo cáo biến động tháng 1/2026).
2.  Chọn tham số (Khoảng thời gian, Đơn vị).
3.  Nhấn "Xem trước" (Preview).
4.  Nhấn "Xuất Excel" hoặc "Xuất PDF".
5.  Hệ thống trả về file báo cáo theo mẫu (RPT-006).

---

**Module:** 3.4 Nghiệp vụ Tài chính - Kế toán (Finance)

## 15. UC-FIN-001: Xem Hồ sơ và Dữ liệu Lương

**Mô tả:** Cho phép cán bộ TCKT truy cập xem danh sách nhân sự và các thông tin liên quan đến lương, phụ cấp để phục vụ công tác tính lương. Chế độ xem là Read-only (chỉ đọc).
**Actors:** Cán bộ TCKT.
**Liên quan đến Requirements:** FIN-002, FIN-003 (Need 34)

### Preconditions
*   Cán bộ TCKT đã đăng nhập hệ thống (FIN-001).
*   Quyền hạn được phân là "TCKT" hoặc tương đương.

### Main Flow (Xem Danh sách)
1.  Cán bộ TCKT truy cập menu "Dữ liệu Lương".
2.  Hệ thống hiển thị danh sách nhân sự toàn trường.
3.  Cán bộ TCKT sử dụng bộ lọc (Đơn vị, Trạng thái) hoặc tìm kiếm theo Tên/Mã.
4.  Hệ thống hiển thị danh sách rút gọn.

### Alternative Flow 1: Xem Chi tiết Lương
1.  Cán bộ TCKT chọn một nhân sự từ danh sách.
2.  Hệ thống hiển thị màn hình chi tiết nhưng ở chế độ `View-Only`.
3.  Cán bộ TCKT xem được các tab:
    *   **Thông tin chung**: Để xác định đúng người.
    *   **Lương & Phụ cấp**: Xem Ngạch, Bậc, Hệ số lương hiện tại, Các loại phụ cấp và hệ số tương ứng.
    *   **Hợp đồng**: Xem loại hợp đồng để biết chế độ đãi ngộ.
    *   **Công tác phí/Khen thưởng/Kỷ luật**: Xem các quyết định ảnh hưởng đến thu nhập trong kỳ.

---

## 16. UC-FIN-002: Xuất Dữ liệu Lương (Export Salary Data)

**Mô tả:** Xuất dữ liệu lương và phụ cấp của nhân sự ra file Excel hoặc định dạng chuẩn để import vào phần mềm kế toán/tính lương chuyên dụng.
**Actors:** Cán bộ TCKT.
**Liên quan đến Requirements:** FIN-004 (Need 116)

### Main Flow
1.  Cán bộ TCKT truy cập menu "Xuất Dữ liệu".
2.  Chọn kỳ dữ liệu (Tháng/Năm) chốt số liệu.
3.  Chọn phạm vi xuất (Toàn trường hoặc theo Đơn vị).
4.  Nhấn "Xuất Excel".
5.  Hệ thống tổng hợp dữ liệu hiện hành (tính đến thời điểm chọn).
6.  Hệ thống tải xuống file Excel chứa: Mã NS, Họ tê, Hệ số lương, Hệ số phụ cấp, Số tài khoản NH, CNT...

### Alternative Flow 1: Kết nối API (System Flow)
*   Đây không phải là thao tác người dùng trực tiếp trên giao diện web, nhưng là chức năng hệ thống hỗ trợ.
*   Phần mềm Kế toán gọi API lấy danh sách lương.
*   Hệ thống xác thực token API.
*   Hệ thống trả về JSON/XML dữ liệu lương.

---

**Module:** 3.5 Cổng Tự phục vụ (Self-Service Portal)

## 17. UC-SSP-001: Xem Hồ sơ Cá nhân (View My Profile)

**Mô tả:** Cho phép Cán bộ/Giảng viên (CBGV) xem toàn bộ thông tin hồ sơ cá nhân của mình đang được lưu trong hệ thống.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-002 (Need 139)

### Preconditions
*   CBGV đã đăng nhập vào Portal (UC-SYS-001).

### Main Flow
1.  CBGV chọn menu "Hồ sơ của tôi" (My Profile).
2.  Hệ thống hiển thị trang thông tin cá nhân với các tab:
    *   **Thông tin chung**: Lý lịch, Liên hệ, Gia đình.
    *   **Công việc**: Đơn vị công tác, Chức vụ, Quá trình công tác.
    *   **Trình độ**: Bằng cấp, Chứng chỉ, Học hàm/Học vị.
3.  CBGV xem chi tiết các thông tin.

---

## 18. UC-SSP-002: Yêu cầu Cập nhật Thông tin (Request Profile Update)

**Mô tả:** Cho phép CBGV gửi yêu cầu chỉnh sửa thông tin cá nhân khi có thay đổi (VD: đổi số điện thoại, địa chỉ, thêm bằng cấp mới). Yêu cầu này cần được Phòng TCCB phê duyệt mới có hiệu lực.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-003 (Need 140)

### Preconditions
*   CBGV đang xem hồ sơ cá nhân (UC-SSP-001).

### Main Flow
1.  Tại màn hình hồ sơ, CBGV nhấn nút "Yêu cầu chỉnh sửa".
2.  Hệ thống mở form cho phép sửa một số trường thông tin cho phép (VD: SĐT, Địa chỉ, Email...).
3.  Với các thông tin quan trọng (Bằng cấp...), CBGV nhập thông tin mới và upload minh chứng.
4.  CBGV nhấn "Gửi yêu cầu".
5.  Hệ thống lưu yêu cầu ở trạng thái `Pending` (Chờ duyệt).
6.  Hệ thống gửi thông báo đến Cán bộ TCCB.

### Alternative Flow 1: Xem trạng thái yêu cầu
1.  CBGV truy cập "Lịch sử yêu cầu".
2.  Hệ thống hiển thị danh sách các yêu cầu đã gửi và trạng thái (Đã duyệt / Từ chối).
3.  Nếu bị Từ chối, xem lý do từ chối.

---

## 19. UC-SSP-003: Tra cứu Thông tin (My Records)

**Mô tả:** Cho phép CBGV tra cứu lịch sử hợp đồng, các quyết định khen thưởng và kỷ luật của bản thân.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-004, SSP-005 (Need 144, 145)

### Main Flow
1.  CBGV chọn menu "Thông tin công việc".
2.  Chọn tab tương ứng: "Hợp đồng" hoặc "Khen thưởng/Kỷ luật".
3.  **Hợp đồng**: Xem danh sách các HĐ đã ký, Ngày hiệu lực/Hết hạn, Loại HĐ. Tải về bản scan (nếu có).
4.  **Khen thưởng/Kỷ luật**: Xem danh sách các quyết định, Số quyết định, Nội dung, Hình thức.

---

## 20. UC-SSP-004: Đào tạo Cá nhân (My Training)

**Mô tả:** Cho phép CBGV theo dõi lịch sử đào tạo và đăng ký tham gia các khóa học mới do nhà trường tổ chức.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-006, SSP-007 (Need 146, 150)

### Main Flow (Xem Lịch sử Đào tạo)
1.  CBGV chọn menu "Đào tạo".
2.  Hệ thống hiển thị tab "Lịch sử": Danh sách khóa học đã tham gia, Thời gian, Kết quả/Chứng chỉ.

### Alternative Flow 1: Đăng ký Khóa học
1.  CBGV chọn tab "Khóa học đang mở".
2.  Hệ thống hiển thị danh sách khóa học đang trong thời hạn đăng ký.
3.  CBGV xem chi tiết nội dung, thời gian.
4.  Nhấn nút "Đăng ký tham gia".
5.  Hệ thống ghi nhận đăng ký (có thể cần duyệt tùy cấu hình khóa học).
6.  Trạng thái chuyển thành "Đã đăng ký".

