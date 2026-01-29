# Salary Data Export for External Payroll Systems

## Screen Metadata

| Item       | Detail                                         |
| ---------- | ---------------------------------------------- |
| Screen ID  | SD-EXPORT-001                                  |
| Module     | Salary Data (FR-SD)                            |
| Related FR | FR-SD-001 to FR-SD-010, FR-CF-001 to FR-CF-021 |

---

> [!NOTE]
> **Module này KHÔNG tính toán lương.** 
> Hệ thống HRMS chỉ lưu trữ và xuất dữ liệu cần thiết để hệ thống tính lương bên ngoài (external payroll system) có thể truy xuất.

---

# 1. Màn hình Xuất Dữ liệu Lương (Salary Data Export)

**User Goal:** Export employee salary data for external payroll system processing.

**Role:** HR Staff, Finance Staff

---

## 1.1 Main Export Screen

```
+------------------------------------------------------------------------+
|  [Sidebar]  |  Dữ liệu Lương > Xuất dữ liệu                             |
+-------------|----------------------------------------------------------+
|             |                                                          |
|  MENU       |  XUẤT DỮ LIỆU LƯƠNG CHO HỆ THỐNG BÊN NGOÀI               |
|             |                                                          |
|  [Thông tin |  +------------------------------------------------------+ |
|   lương NV] |  | CHỌN KỲ XUẤT DỮ LIỆU                                  | |
|             |  +------------------------------------------------------+ |
|  [Người phụ |  | Tháng:  [01 v]  Năm: [2026 v]                         | |
|   thuộc]    |  | Kỳ dữ liệu: 01/01/2026 - 31/01/2026                   | |
|             |  +------------------------------------------------------+ |
|  [Xuất dữ   |                                                          |
|   liệu]     |  +------------------------------------------------------+ |
|             |  | DỮ LIỆU SẼ XUẤT                                       | |
|  [Lịch sử   |  +------------------------------------------------------+ |
|   xuất]     |  |                                                        | |
|             |  | 1. THÔNG TIN CƠ BẢN NHÂN SỰ                            | |
|             |  |    - Mã cán bộ, họ tên, đơn vị                         | |
|             |  |    - Ngạch lương, bậc lương, hệ số                     | |
|             |  |    - Chức vụ (để tính phụ cấp chức vụ)                 | |
|             |  |    - Số năm thâm niên (để tính phụ cấp thâm niên)      | |
|             |  |    - Số tài khoản ngân hàng                            | |
|             |  |                                                        | |
|             |  | 2. DỮ LIỆU CHẤM CÔNG (từ hệ thống bên ngoài)           | |
|             |  |    - Số ngày công thực tế                              | |
|             |  |    - Số ngày nghỉ phép (có lương, không lương)         | |
|             |  |    - Số giờ làm thêm                                   | |
|             |  |                                                        | |
|             |  | 3. THÔNG TIN NGƯỜI PHỤ THUỘC                           | |
|             |  |    - Số lượng người phụ thuộc                          | |
|             |  |    - Thông tin chi tiết (cho giảm trừ thuế TNCN)       | |
|             |  |                                                        | |
|             |  +------------------------------------------------------+ |
|             |                                                          |
|             |  +------------------------------------------------------+ |
|             |  | THỐNG KÊ                                              | |
|             |  +------------------------------------------------------+ |
|             |  | Tổng số nhân sự:        1,203                         | |
|             |  | Có đầy đủ dữ liệu:      1,198 [GREEN]                 | |
|             |  | Thiếu dữ liệu:          5 [RED] [Xem chi tiết]        | |
|             |  +------------------------------------------------------+ |
|             |                                                          |
|             |  [XEM TRƯỚC DỮ LIỆU]           [XUẤT FILE]               |
|             |                                                          |
+------------------------------------------------------------------------+
```

---

## 1.2 Export Options Modal

```
+------------------------------------------------------------------------+
| TÙY CHỌN XUẤT DỮ LIỆU                                             [X]  |
+------------------------------------------------------------------------+
|                                                                        |
|  ĐỊNH DẠNG FILE:                                                       |
|  +------------------------------------------------------------------+  |
|  | (*) Excel (.xlsx) - Recommended                                  |  |
|  | ( ) CSV (.csv)                                                   |  |
|  | ( ) JSON (.json) - For API integration                           |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  BỘ LỌC DỮ LIỆU:                                                       |
|  +------------------------------------------------------------------+  |
|  | Đơn vị: [ Tất cả                                              v] |  |
|  | Loại nhân sự: [ Tất cả                                        v] |  |
|  |               [ ] Chỉ nhân sự có thay đổi trong kỳ               |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  THÔNG TIN THAM SỐ CẤU HÌNH (từ FR-CF):                                |
|  +------------------------------------------------------------------+  |
|  | [x] Bao gồm mức lương cơ sở hiện hành                            |  |
|  | [x] Bao gồm bảng hệ số ngạch/bậc                                 |  |
|  | [x] Bao gồm tỷ lệ bảo hiểm (BHXH, BHYT, BHTN)                    |  |
|  | [x] Bao gồm bảng thuế TNCN lũy tiến                              |  |
|  | [x] Bao gồm hệ số phụ cấp chức vụ                                |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  [HỦY]                                              [XUẤT DỮ LIỆU]     |
+------------------------------------------------------------------------+
```

---

## 1.3 Data Preview Screen

```
+------------------------------------------------------------------------+
| XEM TRƯỚC DỮ LIỆU XUẤT - THÁNG 01/2026                            [X]  |
+------------------------------------------------------------------------+
|                                                                        |
|  [Tìm kiếm...                    ] [Đơn vị: Tất cả v] [Lọc]            |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  | # | Mã CB     | Họ tên       | Đơn vị   | Ngạch | Bậc | Hệ số   |  |
|  |---|-----------|--------------|----------|-------|-----|---------|  |
|  | 1 | TLU-001   | Nguyen Van A | K.CNTT   | GVC   | 5   | 3.66    |  |
|  | 2 | TLU-002   | Tran Thi B   | K.CT     | GV    | 3   | 2.72    |  |
|  | 3 | TLU-003   | Le Van C     | P.TCCB   | CV    | 4   | 2.86    |  |
|  | 4 | TLU-004   | Pham Thi D   | K.CNTT   | GVCC  | 2   | 5.42    |  |
|  | ... | ...     | ...          | ...      | ...   | ... | ...     |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  Hiển thị 1-50 của 1,198                    [<] [1] [2] ... [24] [>]   |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  | THÔNG TIN BỔ SUNG (Nhấn vào dòng để xem)                         |  |
|  +------------------------------------------------------------------+  |
|  | Nguyen Van A (TLU-001):                                          |  |
|  | - Chức vụ: Trưởng bộ môn KHMT                                    |  |
|  | - Thâm niên: 15 năm                                              |  |
|  | - Ngày công: 22/22                                               |  |
|  | - Người phụ thuộc: 2                                             |  |
|  | - STK: 0123456789 - Vietcombank                                  |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  [ĐÓNG]                                             [XUẤT FILE]        |
+------------------------------------------------------------------------+
```

---

## 1.4 Missing Data Alert

```
+------------------------------------------------------------------------+
| NHÂN SỰ THIẾU DỮ LIỆU                                             [X]  |
+------------------------------------------------------------------------+
|                                                                        |
|  [!] 5 nhân sự thiếu dữ liệu, sẽ không được xuất:                      |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  | # | Mã CB     | Họ tên       | Đơn vị   | Vấn đề               |  |
|  |---|-----------|--------------|----------|----------------------|  |
|  | 1 | TLU-2025  | Nguyen Van X | K.CNTT   | Chưa có ngạch lương  |  |
|  | 2 | TLU-2025  | Tran Thi Y   | K.CT     | Chưa có bậc lương    |  |
|  | 3 | TLU-2025  | Le Van Z     | P.HCTH   | Hệ số = null         |  |
|  | 4 | TLU-2025  | Pham Van W   | K.CK     | Chưa có STK ngân hàng|  |
|  | 5 | TLU-2025  | Hoang V      | TV       | Thiếu thông tin HĐ   |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  Hành động:                                                            |
|  +------------------------------------------------------------------+  |
|  | ( ) Bỏ qua và tiếp tục xuất (1,198 nhân sự)                      |  |
|  | (*) Không xuất, yêu cầu bổ sung dữ liệu trước                    |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  [GỬI THÔNG BÁO BỔ SUNG]                    [ĐÓNG]  [TIẾP TỤC XUẤT]   |
+------------------------------------------------------------------------+
```

---

# 2. Quản lý Thông tin Lương Nhân viên (FR-SD-001 to FR-SD-005)

**User Goal:** View and manage employee salary information (grade, step, coefficient).

```
+------------------------------------------------------------------------+
|  [Sidebar]  |  Dữ liệu Lương > Thông tin lương nhân sự                  |
+-------------|----------------------------------------------------------+
|             |                                                          |
|  [Tìm kiếm nhân sự...                                    ] [Tìm]      |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  | THÔNG TIN LƯƠNG: NGUYEN VAN A (TLU-001)                          |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  THÔNG TIN HIỆN TẠI:                                                   |
|  +------------------------------------------------------------------+  |
|  | Ngạch lương:      [ Giảng viên chính (V.07.01.02)             v] |  |
|  | Bậc lương:        [ 5                                         v] |  |
|  | Hệ số lương:      [ 3.66 ] (tự động từ bậc)                      |  |
|  | Ngày hiệu lực:    [ 01/07/2024 ]                                 |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  THÔNG TIN PHỤ CẤP (tự động từ chức vụ và thâm niên):                  |
|  +------------------------------------------------------------------+  |
|  | Chức vụ hiện tại: Trưởng bộ môn KHMT                             |  |
|  | Hệ số PC chức vụ: 0.3 (từ FR-CF)                                 |  |
|  |                                                                  |  |
|  | Ngày vào ngành:   01/09/2010                                     |  |
|  | Số năm thâm niên: 15 năm                                         |  |
|  | Tỷ lệ PC thâm niên: 15% (từ FR-CF)                               |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  THÔNG TIN TÀI KHOẢN:                                                  |
|  +------------------------------------------------------------------+  |
|  | Ngân hàng:        [ Vietcombank                               v] |  |
|  | Số tài khoản:     [ 0123456789                                 ] |  |
|  | Chi nhánh:        [ Đống Đa, Hà Nội                            ] |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  [LỊCH SỬ THAY ĐỔI]                                    [LƯU THAY ĐỔI] |
|                                                                        |
+------------------------------------------------------------------------+
```

---

# 3. Quản lý Người phụ thuộc (FR-SD-006)

**User Goal:** Manage dependent information for tax deduction calculation.

```
+------------------------------------------------------------------------+
|  [Sidebar]  |  Dữ liệu Lương > Người phụ thuộc                          |
+-------------|----------------------------------------------------------+
|             |                                                          |
|  DANH SÁCH NGƯỜI PHỤ THUỘC: NGUYEN VAN A (TLU-001)   [+ Thêm mới]      |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  | # | Họ tên         | Quan hệ  | Ngày sinh  | MST           | TT |  |
|  |---|----------------|----------|------------|---------------|-----|  |
|  | 1 | Nguyen Thi B   | Vợ       | 15/03/1992 | 012345678     | [x] |  |
|  | 2 | Nguyen Van C   | Con      | 20/08/2018 | (Chưa có)     | [x] |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  Tổng số người phụ thuộc: 2                                            |
|  Mức giảm trừ: 2 × 4,400,000 = 8,800,000 VND/tháng                     |
|                                                                        |
|  [Lưu ý: Thông tin này sẽ được xuất cho hệ thống tính lương bên ngoài |
|   để tính giảm trừ gia cảnh khi tính thuế TNCN]                        |
|                                                                        |
+------------------------------------------------------------------------+
```

---

# 4. Lịch sử Xuất Dữ liệu

```
+------------------------------------------------------------------------+
|  [Sidebar]  |  Dữ liệu Lương > Lịch sử xuất                             |
+-------------|----------------------------------------------------------+
|             |                                                          |
|  LỊCH SỬ XUẤT DỮ LIỆU LƯƠNG                                            |
|                                                                        |
|  +------------------------------------------------------------------+  |
|  | Thời gian        | Kỳ       | Người xuất  | Định dạng | Số NV   |  |
|  |------------------|----------|-------------|-----------|---------|  |
|  | 02/02/2026 14:30 | 01/2026  | Nguyen H    | Excel     | 1,198   |  |
|  | 02/01/2026 15:00 | 12/2025  | Nguyen H    | Excel     | 1,195   |  |
|  | 02/12/2025 14:45 | 11/2025  | Tran M      | JSON      | 1,192   |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  [Tải lại file đã xuất]                                                |
|                                                                        |
+------------------------------------------------------------------------+
```

---

# 5. API Endpoint Documentation (For External System Integration)

> [!NOTE]
> Phần này dành cho đội phát triển hệ thống tính lương bên ngoài.

## Available API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/salary-data/employees` | GET | Get all employee salary data |
| `/api/v1/salary-data/employees/{id}` | GET | Get salary data for specific employee |
| `/api/v1/salary-data/config` | GET | Get salary configuration (base salary, rates) |
| `/api/v1/salary-data/dependents/{employee_id}` | GET | Get dependent information |
| `/api/v1/salary-data/attendance/{period}` | GET | Get attendance data for period |

> [!NOTE]
> Dữ liệu giờ giảng được quản lý bởi hệ thống bên ngoài, không thuộc phạm vi HRMS.

## Sample Response

```json
{
  "employee_id": "TLU-001",
  "full_name": "Nguyen Van A",
  "department": "Khoa CNTT",
  "salary_grade": {
    "code": "V.07.01.02",
    "name": "Giảng viên chính",
    "step": 5,
    "coefficient": 3.66
  },
  "position": {
    "title": "Trưởng bộ môn",
    "allowance_coefficient": 0.3
  },
  "seniority_years": 15,
  "bank_account": {
    "bank": "Vietcombank",
    "account_number": "0123456789"
  },
  "dependents": 2,
  "attendance": {
    "working_days": 22,
    "leave_days": 0,
    "overtime_hours": 0
  }
}
```

---

## Note on Removed Payroll Calculation

This module replaces the previous **Payroll Calculation Wizard (FR-PB)**.

**What was removed:**
- Salary calculation (formula-based computation)
- Payroll approval workflow
- Bank file generation
- Payslip generation
- Insurance/tax calculation

**What is kept:**
- Employee salary information (grade, step, coefficient)
- Dependent information (for tax deduction)
- Salary configuration data (in FR-CF module)
- Data export for external payroll system

**Rationale:** The university uses a separate payroll system. HRMS provides the HR data needed for that system to perform payroll calculations.
