# System Configuration & Administration

## Screen Metadata

| Item       | Detail                       |
| ---------- | ---------------------------- |
| Screen ID  | SYS-CFG-001                  |
| Module     | System Configuration (FR-CF) |
| Related FR | FR-CF-001 to FR-CF-078       |

---

# Cấu hình Hệ thống - System Configuration Hub

**User Goal:** configure dynamic system parameters, formula logic, and approval workflows without code changes.

**Role:** System Administrator, HR Manager (Restricted access)

---

## Layout & Navigation

```
+------------------------------------------------------------------+
|  [Sidebar]  |  Cấu hình Hệ thống                                 |
|             |                                                    |
+-------------|----------------------------------------------------+
|             |                                                    |
|  CẤU HÌNH   |  +------------------------------------------------+|
|             |  |  DASHBOARD CẤU HÌNH                            ||
|  [>] Tổng   |  +------------------------------------------------+|
|      quan   |  |                                                ||
|             |  |  +------------+  +------------+  +------------+||
|  [>] Tham   |  |  | Tham số    |  | Danh mục   |  | Workflow   |||
|      số     |  |  | Lương/BH   |  | Dùng chung |  | Phê duyệt  |||
|             |  |  |            |  |            |  |            |||
|  [>] Danh   |  |  | [Edit]     |  | [Manage]   |  | [Designer] |||
|      mục    |  |  +------------+  +------------+  +------------+||
|             |  |                                                ||
|  [>] Công   |  |  RECENT CHANGES                                ||
|      thức   |  |  - Updated Base Salary (01/07/2026)            ||
|             |  |  - Added "AI Engineer" to Titles               ||
|  [>] Work-  |  |  - Modified Leave Approval Workflow            ||
|      flow   |  |                                                ||
|             |  +------------------------------------------------+|
|  [>] Phân   |                                                    |
|      quyền  |                                                    |
+------------------------------------------------------------------+
```

---

## 1. Salary & Insurance Parameters (Tham số Lương)

**Scope:** FR-CF-001 to FR-CF-021 (Base salary, coefficients, insurance rates)

```
+------------------------------------------------------------------+
|  THAM SỐ LƯƠNG & BẢO HIỂM                  [Lịch sử] [Lưu thay đổi]|
+------------------------------------------------------------------+
|                                                                  |
|  1. MỨC LƯƠNG CƠ SỞ (FR-CF-001)                                  |
|  +-------------------------------------------------------------+ |
|  | Hiệu lực từ: [01/07/2026]                                   | |
|  | Mức lương:   [ 2,340,000 ] VNĐ                              | |
|  | Căn cứ:      [ Nghị định 73/2024/NĐ-CP                    ] | |
|  +-------------------------------------------------------------+ |
|  [+ Thêm mốc thay đổi mới]                                       |
|                                                                  |
|  2. TỶ LỆ BẢO HIỂM (FR-CF-017)                                   |
|  +-------------------------------------------------------------+ |
|  | Loại   | Người Lao Động (%) | Người Sử Dụng LĐ (%) | Tổng     | |
|  |--------|--------------------|----------------------|----------| |
|  | BHXH   | [ 8.0  ]           | [ 17.5 ]             | 25.5%    | |
|  | BHYT   | [ 1.5  ]           | [ 3.0  ]             | 4.5%     | |
|  | BHTN   | [ 1.0  ]           | [ 1.0  ]             | 2.0%     | |
|  +-------------------------------------------------------------+ |
|                                                                  |
|  3. THUẾ THU NHẬP CÁ NHÂN (FR-CF-020)                            |
|  +-------------------------------------------------------------+ |
|  | Giảm trừ bản thân:    [ 11,000,000 ] VNĐ                    | |
|  | Giảm trừ phụ thuộc:   [  4,400,000 ] VNĐ                    | |
|  |                                                             | |
|  | Biểu thuế lũy tiến: [Xem chi tiết & Chỉnh sửa >]            | |
|  +-------------------------------------------------------------+ |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 2. Master Data Management (Danh mục Dùng chung)

**Scope:** FR-CF-037 to FR-CF-041 (Titles, Degrees, Contract Types)

```
+------------------------------------------------------------------+
|  QUẢN LÝ DANH MỤC                          [Thêm mới] [Xuất Excel]|
+------------------------------------------------------------------+
|                                                                  |
|  Chọn danh mục: [Chức danh Nghề nghiệp v]                        |
|                                                                  |
|  +-------------------------------------------------------------+ |
|  | Mã        | Tên chức danh        | Mã ngạch   | Trạng thái  | |
|  |-----------|----------------------|------------|-------------| |
|  | CD001     | Giảng viên Cao cấp   | V.07.01.01 | [Active]    | |
|  | CD002     | Giảng viên Chính     | V.07.01.02 | [Active]    | |
|  | CD003     | Giảng viên           | V.07.01.03 | [Active]    | |
|  | CD004     | Chuyên viên Cao cấp  | 01.001     | [Active]    | |
|  | ...       | ...                  | ...        | ...         | |
|  +-------------------------------------------------------------+ |
|                                                                  |
|  MODAL: THÊM/SỬA CHỨC DANH                                       |
|  +--------------------------------------------------+            |
|  | Tên chức danh: [ Giảng viên Chính              ] |            |
|  | Mã ngạch:      [ V.07.01.02                    ] |            |
|  |                                                  |            |
|  | Định mức giờ giảng mặc định: [ 280 ] giờ/năm     |            |
|  | Thuộc nhóm:    [ Giảng viên      v ]             |            |
|  |                                                  |            |
|  | [x] Kích hoạt                                    |            |
|  |                                                  |            |
|  | [Hủy]                            [Lưu thông tin] |            |
|  +--------------------------------------------------+            |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 3. Formula & Parameter Management (Công thức & Tham số)

**Scope:** FR-CF-042 to FR-CF-056 (Two-Tier Formula System)

### A. Simple Mode: Parameter Editor (Giao diện Đơn giản)
*Role: HR Specialist / Accountant*

```
+------------------------------------------------------------------+
|  CẤU HÌNH THAM SỐ: [Phụ cấp Thâm niên Nhà giáo v]      [Lưu phiên bản]|
+------------------------------------------------------------------+
|                                                                  |
|  PHIẾU ĐIỀU CHỈNH THAM SỐ                                        |
|  Trạng thái: [ Đang soạn thảo v ]       Hiệu lực từ: [01/01/2026]|
|                                                                  |
|  +------------------------------------------------------------+  |
|  | THAM SỐ                    | GIÁ TRỊ      | ĐƠN VỊ | GHI CHÚ |  |
|  |----------------------------|--------------|--------|---------|  |
|  | Số năm tối thiểu (MIN_Y)   | [ 5        ] | năm    | min=1   |  |
|  | Tỷ lệ khởi điểm (BASE_R)   | [ 5        ] | %      |         |  |
|  | Tỷ lệ tăng/năm (RATE_Y)    | [ 1        ] | %      |         |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  [!] IMPACT PREVIEW: Thay đổi này ảnh hưởng đến 850 nhân viên.   |
|  Tổng chi phí dự kiến tăng: +25,000,000 VNĐ / tháng.             |
|                                                                  |
|  [Kiểm tra Validation]  [Xem thử kết quả]      [CHẾ ĐỘ NÂNG CAO >]|
+------------------------------------------------------------------+
```

### B. Advanced Mode: Formula Template Editor (Giao diện Nâng cao)
*Role: Senior Admin / System Architect*

```
+------------------------------------------------------------------+
|  THIẾT LẬP CÔNG THỨC (FORMULA TEMPLATE)        [v] Phiên bản: 2.0|
+------------------------------------------------------------------+
|                                                                  |
|  Tên công thức: Phụ cấp Thâm niên Nhà giáo                       |
|  Mã: PC_THAN_NIEN                                               |
|                                                                  |
|  1. ĐỊNH NGHĨA THAM SỐ (Parameter Mapping)                       |
|  +------------------------------------------------------------+  |
|  | Code    | Tên hiển thị     | Kiểu dữ liệu | Validation     |  |
|  |---------|------------------|--------------|----------------|  |
|  | MIN_Y   | Số năm tối thiểu | Integer      | min=1, max=10  |  |
|  | BASE_R  | Tỷ lệ khởi điểm  | Percentage   | range[0, 50]   |  |
|  | RATE_Y  | Tỷ lệ tăng/năm   | Percentage   |                |  |
|  +------------------------------------------------------------+  |
|  [+ Thêm tham số mới]                                            |
|                                                                  |
|  2. BIỂU THỨC CÔNG THỨC (Expression Builder)                     |
|  +------------------------------------------------------------+  |
|  | Formula = IF(Years >= {MIN_Y},                             |  |
|  |              {BASE_R} + (Years - {MIN_Y}) * {RATE_Y},      |  |
|  |              0)                                            |  |
|  +------------------------------------------------------------+  |
|  [Helper: Insert Years, BaseSalary, Coefficient, Function v]     |
|                                                                  |
|  3. SIMULATION & TESTING                                         |
|  Input test: Years = [ 10 ]                                      |
|  Result:     0.05 + (10 - 5) * 0.01 = 0.1 (10%)        [VALID OK]|
|                                                                  |
|  [Hủy]                     [Yêu cầu Phê duyệt Template] [Lưu v2.0]|
+------------------------------------------------------------------+
```

---

## 4. Workflow Designer (Quy trình Phê duyệt)

**Scope:** FR-CF-054 to FR-CF-062 (Approval flows)

```
+------------------------------------------------------------------+
|  THIẾT KẾ QUY TRÌNH                        [Lưu] [Kích hoạt]     |
+------------------------------------------------------------------+
|                                                                  |
|  Quy trình: [Xin Nghỉ Phép v]                                    |
|                                                                  |
|  Visual Flow Designer:                                           |
|                                                                  |
|  (Start) --> [Step 1: Quản lý trực tiếp]                         |
|                   |                                              |
|                   +---> (Từ chối) --> (Kết thúc)                 |
|                   |                                              |
|                   +---> (Đồng ý)                                 |
|                           |                                      |
|               [Điều kiện: Số ngày > 3?]                          |
|                   |           |                                  |
|           (Yes)   |           | (No)                             |
|                   v           v                                  |
|    [Step 2: Phòng TCCB]    (Kết thúc: Duyệt)                     |
|                   |                                              |
|                   +---> (Kết thúc)                               |
|                                                                  |
|  Step Configuration (Selected: Step 1):                          |
|  +-----------------------------------+                           |
|  | Tên bước: [Phê duyệt Quản lý    ] |                           |
|  | Người duyệt: [Trưởng Đơn vị     ] |                           |
|  | Thời hạn: [ 24 ] giờ              |                           |
|  | Hành động khi quá hạn:            |                           |
|  | [ Tự động chuyển cấp trên v]      |                           |
|  +-----------------------------------+                           |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 5. Version Control & Audit (Lịch sử Cấu hình)

**Scope:** FR-CF-032, FR-CF-047 (Audit logs)

```
+------------------------------------------------------------------+
|  LỊCH SỬ THAY ĐỔI CẤU HÌNH                                       |
+------------------------------------------------------------------+
|                                                                  |
|  | Thời gian        | Đối tượng    | Người thay đổi | Nội dung   |
|  |------------------|--------------|----------------|------------|
|  | 27/01/2026 10:00 | Mức lương CS | admin.tccb     | 1.8 -> 2.34|
|  | 26/01/2026 15:30 | Workflow     | admin.system   | Mod Step 2 |
|  | ...              | ...          | ...            | ...        |
|                                                                  |
|  [Khôi phục phiên bản cũ]  [Xuất báo cáo]                        |
+------------------------------------------------------------------+
```
