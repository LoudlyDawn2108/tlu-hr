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

## 4. UC-SYS-004: Phân quyền Người dùng (Role Assignment)

**Mô tả:** Cho phép Quản trị viên phân quyền cho người dùng dựa trên vai trò (Role). Hệ thống hỗ trợ các vai trò: Nhân sự phòng Tổ chức Cán bộ (TCCB), Nhân sự phòng Tài chính - Kế toán (TCKT), và các vai trò khác.
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** Need #9, Need #156

### Preconditions
*   Người dùng đã đăng nhập với vai trò Quản trị viên hệ thống.
*   Tài khoản người dùng cần phân quyền đã được tạo (UC-SYS-003).

### Postconditions
*   Vai trò được gán cho người dùng.
*   Quyền hạn tương ứng với vai trò được kích hoạt cho người dùng.

### Main Flow (Xem và Phân quyền)
1.  Admin chọn menu "Quản trị hệ thống" -> "Phân quyền người dùng".
2.  Hệ thống hiển thị danh sách người dùng với cột "Vai trò hiện tại".
3.  Admin chọn một người dùng và nhấn "Phân quyền".
4.  Hệ thống hiển thị form phân quyền với các vai trò:
    *   **Quản trị viên** (Admin)
    *   **Nhân sự phòng Tổ chức Cán bộ** (HR - TCCB)
    *   **Nhân sự phòng Tài chính - Kế toán** (Finance - TCKT)
    *   **Cán bộ/Giảng viên** (Employee/Faculty)
    *   **Lãnh đạo trường** (Manager)
5.  Admin chọn vai trò phù hợp từ dropdown.
6.  Admin nhấn "Lưu".
7.  Hệ thống cập nhật vai trò cho người dùng.
8.  Hệ thống kích hoạt các quyền hạn tương ứng với vai trò.
9.  Hệ thống ghi log thay đổi vai trò.

### Alternative Flow 1: Phân quyền cho nhiều người dùng (Bulk Assignment)
1.  Tại danh sách người dùng, Admin chọn nhiều user bằng checkbox.
2.  Admin chọn "Thao tác hàng loạt" -> "Phân quyền".
3.  Chọn vai trò từ dropdown.
4.  Xác nhận.
5.  Hệ thống cập nhật vai trò cho tất cả user được chọn.

### Alternative Flow 2: Xem Chi tiết Quyền hạn
1.  Tại form phân quyền, Admin nhấn "Xem chi tiết quyền".
2.  Hệ thống hiển thị danh sách các quyền hạn của vai trò đó:
    *   Xem hồ sơ nhân sự
    *   Sửa hồ sơ nhân sự
    *   Xem dữ liệu lương
    *   Xuất báo cáo
    *   ...

### Exception Flows
*   **E1: Không thể phân quyền cho chính mình**
    *   Nếu Admin cố gắng thay đổi vai trò của chính mình.
    *   Hệ thống từ chối và thông báo "Không thể thay đổi vai trò của chính mình".
*   **E2: Tài khoản bị khóa**
    *   Nếu tài khoản user đang bị khóa.
    *   Hệ thống cảnh báo và yêu cầu mở khóa trước khi phân quyền.

---

**Module:** 3.2 Quản lý Cấu hình (Configuration Management)

## 5. UC-CFG-001: Cấu hình Lương và Phụ cấp

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

## 6. UC-CFG-002: Cấu hình Hợp đồng

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

## 7. UC-CFG-003: Quản lý Danh mục Dùng chung (Master Data)

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

## 8. UC-CFG-004: Cấu hình Danh mục Khen thưởng & Kỷ luật (Reward & Discipline Category Configuration)

**Mô tả:** Quản trị viên cấu hình các danh mục dùng cho việc ghi nhận khen thưởng và kỷ luật nhân sự, bao gồm các hình thức khen thưởng (danh hiệu, bằng khen, giấy khen, tiền thưởng) và các hình thức kỷ luật (khiển trách, cảnh cáo, sa thải).
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** Needs #25, #27, #30

### Preconditions
*   Người dùng đăng nhập với vai trò Quản trị viên.

### Postconditions
*   Danh mục khen thưởng/kỷ luật được cập nhật.
*   Thay đổi được ghi log với lý do.

### Main Flow (Xem danh sách Danh mục Khen thưởng)
1.  Admin chọn menu "Quản lý Cấu hình" -> "Khen thưởng & Kỷ luật".
2.  Hệ thống hiển thị tab "Danh mục Khen thưởng" với danh sách:
    *   Mã danh mục (tự động), Tên danh mục, Mô tả, Trạng thái (Active/Inactive), Thứ tự hiển thị
    *   Các danh mục mặc định: Danh hiệu (VD: Chiến sĩ thi đua), Bằng khen, Giấy khen, Tiền thưởng...
3.  Admin có thể chuyển sang tab "Danh mục Kỷ luật" để xem danh sách tương tự.

### Alternative Flow 1: Thêm mới Danh mục Khen thưởng
1.  Tại tab "Khen thưởng", Admin nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu:
    *   **Tên danh mục:** (VD: "Bằng khen cấp Bộ", "Danh hiệu Lao động tiên tiến")
    *   **Loại:** Khen thưởng
    *   **Mô tả:** Chi tiết về danh mục
    *   **Thứ tự hiển thị:** Số thứ tự sắp xếp
3.  Admin nhập thông tin.
4.  Nhấn "Lưu".
5.  Hệ thống:
    *   Tạo mã danh mục tự động (VD: KT001).
    *   Lưu dữ liệu với trạng thái Active.
    *   Hiển thị thông báo thành công.

### Alternative Flow 2: Thêm mới Danh mục Kỷ luật
1.  Tại tab "Kỷ luật", Admin nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu:
    *   **Tên danh mục:** (VD: "Khiển trách", "Cảnh cáo", "Sa thải")
    *   **Loại:** Kỷ luật
    *   **Mức độ:** Nhẹ/Trung bình/Nghiêm trọng
    *   **Mô tả:** Chi tiết về hình thức kỷ luật
    *   **Thứ tự hiển thị:** Số thứ tự sắp xếp
3.  Admin nhập thông tin.
4.  Nhấn "Lưu".
5.  Hệ thống:
    *   Tạo mã danh mục tự động (VD: KL001).
    *   Lưu dữ liệu với trạng thái Active.
    *   Hiển thị thông báo thành công.

### Alternative Flow 3: Sửa Danh mục
1.  Tại danh sách, Admin chọn một danh mục và nhấn "Sửa".
2.  Hệ thống hiển thị form với thông tin hiện tại.
3.  Admin điều chỉnh Tên, Mô tả, Thứ tự hiển thị.
4.  Nhập lý do sửa (bắt buộc theo Need #30).
5.  Nhấn "Lưu".
6.  Hệ thống lưu thay đổi và ghi log lịch sử với lý do.

### Alternative Flow 4: Đánh dấu Inactive
1.  Tại danh sách, Admin chọn một danh mục và nhấn "Inactive".
2.  Hệ thống kiểm tra xem danh mục này có đang được sử dụng trong hồ sơ khen thưởng/kỷ luật không.
3.  Nếu không sử dụng, chuyển sang trạng thái Inactive.
4.  Nếu đang sử dụng, hiển thị cảnh báo và không cho phép inactive.

### Alternative Flow 5: Sắp xếp Thứ tự Hiển thị
1.  Admin nhấn "Sắp xếp thứ tự".
2.  Hệ thống hiển thị danh sách có thể kéo thả (drag & drop) để sắp xếp.
3.  Admin điều chỉnh thứ tự các danh mục.
4.  Nhấn "Lưu thứ tự".
5.  Hệ thống cập nhật thứ tự hiển thị.

### Exception Flows
*   **E1: Tên danh mục trùng**
    *   Nếu tên danh mục đã tồn tại trong cùng loại (Khen thưởng/Kỷ luật).
    *   Hệ thống báo lỗi và yêu cầu nhập tên khác.
*   **E2: Không thể xóa**
    *   Nếu Admin nhấn "Xóa" danh mục đang sử dụng.
    *   Hệ thống báo "Không thể xóa mục đang được sử dụng trong hồ sơ. Vui lòng chọn 'Inactive' thay thế." (theo Need #28).
*   **E3: Thiếu thông tin bắt buộc**
    *   Nếu không nhập Tên danh mục.
    *   Hệ thống báo lỗi validate và không cho lưu.

---

## 9. UC-CFG-007: Cấu hình Loại Khóa đào tạo (Training Type Configuration)

**Mô tả:** Quản trị viên cấu hình các loại khóa đào tạo như trong nước, ngoài nước, ngắn hạn, dài hạn để phân loại các khóa đào tạo trong hệ thống.
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** Needs #25, #27, #30

### Preconditions
*   Người dùng đăng nhập với vai trò Quản trị viên.

### Postconditions
*   Danh mục loại đào tạo được cập nhật.
*   Thay đổi được ghi log với lý do.

### Main Flow (Xem danh sách Loại đào tạo)
1.  Admin chọn menu "Quản lý Cấu hình" -> "Loại khóa đào tạo".
2.  Hệ thống hiển thị danh sách các loại đào tạo:
    *   Mã loại (tự động), Tên loại, Mô tả, Trạng thái (Active/Inactive), Thứ tự hiển thị
3.  Admin có thể sử dụng chức năng tìm kiếm, lọc.

### Alternative Flow 1: Thêm mới Loại đào tạo
1.  Tại danh sách, Admin nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu:
    *   Tên loại (VD: "Đào tạo trong nước", "Đào tạo nước ngoài")
    *   Mô tả
    *   Thứ tự hiển thị
3.  Admin nhập thông tin.
4.  Nhấn "Lưu".
5.  Hệ thống:
    *   Tạo mã loại tự động.
    *   Lưu dữ liệu với trạng thái Active.
    *   Hiển thị thông báo thành công.

### Alternative Flow 2: Sửa Loại đào tạo
1.  Tại danh sách, Admin chọn một loại và nhấn "Sửa".
2.  Hệ thống hiển thị form với thông tin hiện tại.
3.  Admin điều chỉnh Tên, Mô tả, Thứ tự hiển thị.
4.  Nhập lý do sửa (bắt buộc theo Need #30).
5.  Nhấn "Lưu".
6.  Hệ thống lưu thay đổi và ghi log.

### Alternative Flow 3: Đánh dấu Inactive
1.  Tại danh sách, Admin chọn một loại và nhấn "Inactive".
2.  Hệ thống kiểm tra xem loại này có đang được sử dụng không.
3.  Nếu không sử dụng, chuyển sang trạng thái Inactive.
4.  Nếu đang sử dụng, hiển thị cảnh báo và không cho phép inactive.

### Exception Flows
*   **E1: Tên loại trùng**
    *   Nếu tên loại đã tồn tại.
    *   Hệ thống báo lỗi và yêu cầu nhập tên khác.
*   **E2: Không thể xóa**
    *   Nếu Admin nhấn "Xóa" loại đang sử dụng.
    *   Hệ thống báo "Không thể xóa mục đang được sử dụng. Vui lòng chọn 'Inactive' thay thế." (theo Need #28).

---

**Module:** 3.8 Nghiệp vụ Tổ chức Cán bộ (bổ sung)

## 10. UC-HRM-001: Quản lý Hồ sơ Nhân sự (Manage Employee Profiles)

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

## 11. UC-HRM-002: Quản lý Trình độ và Chức danh

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

## 12. UC-HRM-003: Quản lý Hợp đồng Lao động

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

## 13. UC-HRM-004: Quản lý Lương & Phụ cấp (Data Entry)

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

## 14. UC-HRM-005: Quản lý Khen thưởng & Kỷ luật

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

## 15. UC-HRM-006: Quản lý Cơ cấu Tổ chức (Manage Organization)

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

## 16. UC-HRM-007: Quản lý Đào tạo (Manage Training)

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

## 17. UC-RPT-001: Báo cáo và Thống kê (Reports)

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

## 18. UC-FIN-001: Xem Hồ sơ và Dữ liệu Lương

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

## 19. UC-FIN-002: Xuất Dữ liệu Lương (Export Salary Data)

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

## 20. UC-SSP-001: Xem Hồ sơ Cá nhân (View My Profile)

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

## 21. UC-SSP-002: Yêu cầu Cập nhật Thông tin (Request Profile Update)

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

## 22. UC-SSP-003: Tra cứu Thông tin (My Records)

**Mô tả:** Cho phép CBGV tra cứu lịch sử hợp đồng, các quyết định khen thưởng và kỷ luật của bản thân.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-004, SSP-005 (Need 144, 145)

### Main Flow
1.  CBGV chọn menu "Thông tin công việc".
2.  Chọn tab tương ứng: "Hợp đồng" hoặc "Khen thưởng/Kỷ luật".
3.  **Hợp đồng**: Xem danh sách các HĐ đã ký, Ngày hiệu lực/Hết hạn, Loại HĐ. Tải về bản scan (nếu có).
4.  **Khen thưởng/Kỷ luật**: Xem danh sách các quyết định, Số quyết định, Nội dung, Hình thức.

---

## 23. UC-SSP-004: Đào tạo Cá nhân (My Training)

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

---

## 24. UC-HRM-008: Xem Lịch sử Thay đổi (View Change History)

**Mô tả:** Cho phép cán bộ TCCB xem audit trail (lịch sử thay đổi) của hồ sơ nhân sự, bao gồm ai thay đổi, thay đổi gì, và khi nào.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** FR-ER-012

### Preconditions
*   Cán bộ TCCB đã đăng nhập hệ thống.
*   Hồ sơ nhân sự đã có lịch sử thay đổi.

### Main Flow (Xem Lịch sử Hồ sơ)
1.  Cán bộ TCCB truy cập hồ sơ nhân sự (UC-HRM-001).
2.  Chọn tab "Lịch sử thay đổi" (Audit Trail).
3.  Hệ thống hiển thị danh sách các thay đổi theo thời gian giảm dần:
    *   Ngày giờ thay đổi
    *   Người thực hiện
    *   Loại thay đổi (Thêm mới, Cập nhật, Xóa)
    *   Phần dữ liệu bị thay đổi
4.  Cán bộ TCCB chọn một bản ghi để xem chi tiết.
5.  Hệ thống hiển thị:
    *   Giá trị cũ (trước khi thay đổi)
    *   Giá trị mới (sau khi thay đổi)
    *   Lý do thay đổi (nếu có)

### Alternative Flow 1: Xuất Lịch sử
1.  Cán bộ TCCB nhấn "Xuất lịch sử".
2.  Chọn khoảng thời gian.
3.  Hệ thống xuất file Excel/PDF chứa toàn bộ lịch sử thay đổi của hồ sơ.

## 25. UC-HRM-009: Quản lý Chức vụ Bộ môn (Department Position Management)

**Mô tả:** Quản lý các chức vụ trong bộ môn theo danh mục cấu hình (Trưởng bộ môn, Phó trưởng bộ môn, Tổ trưởng...) và phân công cán bộ vào các chức vụ này.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** FR-ER-016, FR-CF-037

### Preconditions
*   Danh mục chức vụ bộ môn đã được cấu hình trong FR-CF-037.
*   Bộ môn đã được tạo trong cây tổ chức.

### Main Flow (Phân công Chức vụ Bộ môn)
1.  Cán bộ TCCB chọn menu "Cơ cấu Tổ chức" -> "Bộ môn".
2.  Chọn một bộ môn từ cây tổ chức.
3.  Chọn tab "Chức vụ".
4.  Hệ thống hiển thị danh sách chức vụ cần có (theo cấu hình):
    *   Trưởng bộ môn (1 người)
    *   Phó trưởng bộ môn (0-2 người)
    *   Tổ trưởng chuyên môn (nếu có)
5.  Cán bộ TCCB chọn chức vụ "Trưởng bộ môn" và nhấn "Phân công".
6.  Tìm kiếm và chọn giảng viên từ danh sách cán bộ thuộc bộ môn.
7.  Nhập `Ngày bắt đầu` và `Quyết định bổ nhiệm` (số QĐ, ngày QĐ, upload file).
8.  Nhấn "Lưu".
9.  Hệ thống cập nhật và ghi nhận lịch sử bổ nhiệm.

### Alternative Flow 1: Miễn nhiệm Chức vụ
1.  Tại tab "Chức vụ", chọn chức vụ đang có người đảm nhiệm.
2.  Nhấn "Miễn nhiệm".
3.  Nhập:
    *   `Ngày miễn nhiệm`
    *   `Lý do` (Hết nhiệm kỳ/Chuyển công tác/Nghỉ hưu/Khác)
    *   `Quyết định miễn nhiệm`
4.  Xác nhận.
5.  Hệ thống cập nhật trạng thái chức vụ thành "Trống" và lưu lịch sử.

### Alternative Flow 2: Xem Lịch sử Lãnh đạo Bộ môn
1.  Tại chi tiết bộ môn, chọn "Lịch sử lãnh đạo".
2.  Hệ thống hiển thị timeline các đời Trưởng/Phó bộ môn:
    *   Tên cán bộ
    *   Chức vụ
    *   Thời gian đảm nhiệm (từ ngày - đến ngày)
    *   Quyết định bổ nhiệm/miễn nhiệm
3.  Có thể export lịch sử ra PDF.

### Exception Flows
*   **E1: Một người giữ nhiều chức vụ chính**
    *   Hệ thống cảnh báo nếu cán bộ đang giữ chức vụ chính ở bộ môn khác.
    *   Yêu cầu xác nhận hoặc điều chuyển chức vụ cũ trước khi bổ nhiệm mới.
*   **E2: Không phải giảng viên**
    *   Chỉ giảng viên mới được phân công vào chức vụ bộ môn.
    *   Hệ thống kiểm tra và từ chối nếu cán bộ không phải giảng viên.

---

## 26. UC-HRM-010: Quản lý Lịch sử Đơn vị (Organization History)

**Mô tả:** Quản lý lịch sử thành lập, sáp nhập, giải thể các đơn vị trong trường. Theo dõi sự thay đổi cơ cấu tổ chức qua các thời kỳ.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** FR-OS-005, FR-OS-006

### Preconditions
*   Cán bộ TCCB đã đăng nhập hệ thống.

### Main Flow (Ghi nhận Thành lập Đơn vị)
1.  Cán bộ TCCB chọn menu "Cơ cấu Tổ chức" -> "Lịch sử đơn vị".
2.  Nhấn "Thêm sự kiện mới".
3.  Chọn loại sự kiện: `Thành lập`.
4.  Chọn đơn vị từ danh sách (hoặc nhập tên đơn vị mới nếu chưa có).
5.  Nhập thông tin:
    *   `Ngày thành lập`
    *   `Quyết định thành lập` (số QĐ, ngày QĐ, cơ quan ban hành)
    *   Upload file quyết định
    *   `Mô tả` (nhiệm vụ, chức năng ban đầu)
6.  Nhấn "Lưu".

### Alternative Flow 1: Ghi nhận Sáp nhập Đơn vị
1.  Chọn loại sự kiện: `Sáp nhập`.
2.  Chọn đơn vị bị sáp nhập (có thể chọn nhiều đơn vị).
3.  Chọn đơn vị tiếp nhận sau sáp nhập.
4.  Nhập:
    *   `Ngày sáp nhập`
    *   `Quyết định sáp nhập`
    *   `Phương án xử lý nhân sự` (chuyển sang đơn vị mới/điều chuyển)
5.  Hệ thống tự động cập nhật trạng thái đơn vị bị sáp nhập thành "Đã sáp nhập" và ghi nhận liên kết.

### Alternative Flow 2: Ghi nhận Giải thể Đơn vị
1.  Chọn loại sự kiện: `Giải thể`.
2.  Chọn đơn vị cần giải thể.
3.  Nhập:
    *   `Ngày giải thể`
    *   `Quyết định giải thể`
    *   `Lý do` (sáp nhập/không hiệu quả/quyết định cơ cấu lại)
    *   `Phương án xử lý nhân sự`
4.  Xác nhận.
5.  Hệ thống cập nhật trạng thái đơn vị thành "Đã giải thể" và đóng mã đơn vị (không cho phép phân công nhân sự mới).

### Exception Flows
*   **E1: Đơn vị có nhân sự đang hoạt động**
    *   Khi giải thể đơn vị, nếu còn nhân sự đang thuộc đơn vị.
    *   Hệ thống cảnh báo và yêu cầu hoàn thành điều chuyển nhân sự trước khi giải thể.
*   **E2: Đơn vị đã tồn tại**
    *   Không cho phép thêm sự kiện thành lập cho đơn vị đã có lịch sử thành lập.
    *   Hệ thống thông báo đã tồn tại sự kiện thành lập.

---

---

**Module:** 3.6 Quản lý Phê duyệt và Admin

## 27. UC-ADM-001: Quản lý Phê duyệt Yêu cầu Cập nhật (Approve Profile Update Requests)

**Mô tả:** Cho phép cán bộ TCCB xem và phê duyệt/từ chối các yêu cầu cập nhật thông tin cá nhân do Cán bộ/Giảng viên gửi lên từ cổng Self-Service.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** Need #140

### Preconditions
*   Cán bộ TCCB đã đăng nhập hệ thống.
*   Có yêu cầu cập nhật đang ở trạng thái "Chờ duyệt".

### Postconditions
*   Yêu cầu được chuyển sang trạng thái "Đã duyệt" hoặc "Từ chối".
*   Nếu được duyệt, thông tin hồ sơ cá nhân được cập nhật.
*   Thông báo kết quả được gửi đến CBGV.

### Main Flow (Xem danh sách Yêu cầu)
1.  Cán bộ TCCB chọn menu "Quản lý Yêu cầu".
2.  Hệ thống hiển thị danh sách các yêu cầu đang chờ duyệt:
    *   Mã nhân sự, Họ tên, Ngày gửi, Loại yêu cầu (SĐT, Địa chỉ, Bằng cấp...)
    *   Mô tả thay đổi
3.  Cán bộ TCCB chọn một yêu cầu để xem chi tiết.
4.  Hệ thống hiển thị:
    *   Giá trị cũ
    *   Giá trị mới đề nghị
    *   Minh chứng đính kèm (nếu có)

### Alternative Flow 1: Phê duyệt Yêu cầu
1.  Sau khi xem chi tiết, Cán bộ TCCB nhấn "Phê duyệt".
2.  Hệ thống hiển thị form xác nhận.
3.  Cán bộ TCCB nhập ghi chú (nếu cần).
4.  Nhấn "Xác nhận".
5.  Hệ thống:
    *   Cập nhật trạng thái yêu cầu thành "Đã duyệt".
    *   Cập nhật thông tin vào hồ sơ nhân sự.
    *   Ghi log thay đổi.
    *   Gửi thông báo đến CBGV.

### Alternative Flow 2: Từ chối Yêu cầu
1.  Sau khi xem chi tiết, Cán bộ TCCB nhấn "Từ chối".
2.  Hệ thống yêu cầu nhập lý do từ chối (bắt buộc).
3.  Cán bộ TCCB nhập lý do.
4.  Nhấn "Xác nhận".
5.  Hệ thống:
    *   Cập nhật trạng thái yêu cầu thành "Từ chối".
    *   Lưu lý do từ chối.
    *   Gửi thông báo đến CBGV kèm lý do.

### Alternative Flow 3: Xem Lịch sử Yêu cầu
1.  Cán bộ TCCB chọn tab "Lịch sử".
2.  Hệ thống hiển thị các yêu cầu đã xử lý (Đã duyệt/Từ chối).
3.  Có thể lọc theo khoảng thời gian, trạng thái, nhân sự.

### Exception Flows
*   **E1: Yêu cầu đã bị xử lý bởi người khác**
    *   Nếu cán bộ TCCB khác đã phê duyệt/từ chối trong lúc đang xem.
    *   Hệ thống thông báo "Yêu cầu đã được xử lý" và refresh danh sách.
*   **E2: Thiếu lý do từ chối**
    *   Nếu từ chối mà không nhập lý do.
    *   Hệ thống báo lỗi và không cho phép xác nhận.

---

**Module:** 3.7 Cấu hình bổ sung


---

**Tổng số Use Cases:** 27 use cases

**Kết thúc Tài liệu Đặc tả Use Case**
