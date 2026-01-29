# Organization Structure Administration

## Screen Metadata

| Item       | Detail                          |
| ---------- | ------------------------------- |
| Screen ID  | ORG-ADM-001                     |
| Module     | Organization Management (FR-OS) |
| Related FR | FR-OS-001 to FR-OS-013          |

---

# Quản lý Cơ cấu Tổ chức - Org Structure Admin

**User Goal:** Modify the university's hierarchy (Faculties, Departments), manage leadership positions, and official mandates.

**Role:** Admin (TCCB)

---

## Layout & Navigation

```
+------------------------------------------------------------------+
|  [Sidebar]  |  Cơ cấu Tổ chức > Quản lý Đơn vị                   |
+-------------|----------------------------------------------------+
|             |                                                    |
|  Org Tree   |  +------------------------------------------------+|
|  View       |  |  CHI TIẾT ĐƠN VỊ: KHOA CÔNG NGHỆ THÔNG TIN     ||
|             |  +------------------------------------------------+|
|  [+] Expand |  |                                                ||
|  [-] Collaps|  |  [Thông tin chung] [Vị trí việc làm] [Lịch sử] ||
|             |  |                                                ||
|  Truong DHTL|  |  1. THÔNG TIN CHUNG                            ||
|  |-- Ban GD |  |  +------------------------------------------+  ||
|  |-- Phong  |  |  | Mã đơn vị:   [ KCNTT                   ] |  ||
|  |-- Khoa   |  |  | Tên đơn vị:  [ Khoa Công nghệ Thông tin] |  ||
|  |   |--CNTT|  |  | Tên TA:      [ Faculty of CSE          ] |  ||
|  |   |--Kinh|  |  | Loại đơn vị: [ Khoa đào tạo          v ] |  ||
|  |   |--... |  |  |                                          |  ||
|  |-- Vien   |  |  | Ngày thành lập:[ 15/10/2000 ]            |  ||
|  |-- TT     |  |  | Website:       [ cse.tlu.edu.vn        ] |  ||
|             |  |  | Email:         [ vpkcntt@tlu.edu.vn    ] |  ||
|             |  |  | Địa chỉ:       [ Nhà C1, 175 Tây Sơn   ] |  ||
|             |  |  +------------------------------------------+  ||
|             |  |                                                ||
|             |  |  2. BAN LÃNH ĐẠO HIỆN TẠI                      ||
|             |  |  +------------------------------------------+  ||
|             |  |  | [Trưởng Khoa    ]  Nguyen Van A          |  ||
|             |  |  | [Phó Trưởng Khoa]  Tran Thi B            |  ||
|             |  |  | [Phó Trưởng Khoa]  Le Van C              |  ||
|             |  |  | [+ Thêm chức vụ lãnh đạo]                |  ||
|             |  |  +------------------------------------------+  ||
|             |  |                                                ||
|             |  |  3. ĐƠN VỊ CON (BỘ MÔN / PTN)                  ||
|             |  |  +------------------------------------------+  ||
|             |  |  | 1. BM Công nghệ Phần mềm       [Edit]    |  ||
|             |  |  | 2. BM Hệ thống Thông tin       [Edit]    |  ||
|             |  |  | 3. BM Mạng & ATTT              [Edit]    |  ||
|             |  |  | 4. PTN Trí tuệ Nhân tạo        [Edit]    |  ||
|             |  |  |                                          |  ||
|             |  |  | [+ Thêm đơn vị con]                      |  ||
|             |  |  +------------------------------------------+  ||
|             |  |                                                ||
|             |  |  [Xóa Đơn vị]             [Lưu Thay đổi]       ||
|             |  +------------------------------------------------+|
|             |                                                    |
+------------------------------------------------------------------+
```

---

## 2. Org Chart Visualization (Sơ đồ Tổ chức)

**Scope:** FR-OS-011 (Interactive Chart)

```
+------------------------------------------------------------------+
|  SƠ ĐỒ TỔ CHỨC (Visualize)                  [Zoom In] [Zoom Out] |
+------------------------------------------------------------------+
|                                                                  |
|              [ BAN GIÁM HIỆU ]                                   |
|                     |                                            |
|        +------------+-------------+                              |
|        |                          |                              |
|   [ KHOA CNTT ]              [ KHOA KINH TẾ ]                    |
|   (72 Nhân sự)               (54 Nhân sự)                        |
|        |                                                         |
|   +----+-----+-----+                                             |
|   |          |     |                                             |
| [BM CNPM]  [BM HTTT] ...                                         |
| (15 NS)    (12 NS)                                               |
|                                                                  |
|Click node to view detail popup >                                 |
+------------------------------------------------------------------+
```

---

## 3. Position Management (Quản lý Vị trí Việc làm)

**Scope:** Defining headcount quotas for recruitment

```
+------------------------------------------------------------------+
|  QUẢN LÝ VỊ TRÍ VIỆC LÀM - KHOA CNTT                             |
+------------------------------------------------------------------+
|                                                                  |
|  Tổng số lượng được duyệt: 80 | Hiện có: 72 | Còn trống: 8       |
|                                                                  |
|  +-------------------------------------------------------------+ |
|  | Vị trí          | Ngạch yêu cầu| Quy hoạch | Hiện có | Trống| |
|  |-----------------|--------------|-----------|---------|------| |
|  | Giảng viên CC   | V.07.01.01   | 5         | 2       | 3    | |
|  | Giảng viên Chính| V.07.01.02   | 20        | 15      | 5    | |
|  | Giảng viên      | V.07.01.03   | 50        | 50      | 0    | |
|  | Thư ký Khoa     | 01.003       | 2         | 2       | 0    | |
|  | Kỹ thuật viên   | V.05.02.07   | 3         | 3       | 0    | |
|  +-------------------------------------------------------------+ |
|                                                                  |
|  [Điều chỉnh Quy hoạch]   [Tạo yêu cầu Tuyển dụng từ vị trí]     |
+------------------------------------------------------------------+
```

---

## 4. Mandate History (Lịch sử Lãnh đạo)

**Scope:** FR-OS-006 (Leadership history)

```
+------------------------------------------------------------------+
|  LỊCH SỬ LÃNH ĐẠO - KHOA CNTT                                    |
+------------------------------------------------------------------+
|                                                                  |
|  +-------------------------------------------------------------+ |
|  | Nhiệm kỳ    | Chức vụ        | Nhân sự        | Số QĐ       | |
|  |-------------|----------------|----------------|-------------| |
|  | 2025 - Nay  | Trưởng Khoa    | Nguyen Van A   | QĐ-2025/123 | |
|  | 2020 - 2025 | Trưởng Khoa    | Pham Van X     | QĐ-2020/456 | |
|  | 2020 - 2025 | Phó Trưởng Khoa| Nguyen Van A   | QĐ-2020/457 | |
|  | 2015 - 2020 | Trưởng Khoa    | Tran Van Y     | QĐ-2015/789 | |
|  +-------------------------------------------------------------+ |
|                                                                  |
|  [+ Thêm Nhiệm kỳ cũ]                                            |
+------------------------------------------------------------------+
```
