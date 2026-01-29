# Academic Workload Manager

## Screen Metadata

| Item       | Detail                                         |
| ---------- | ---------------------------------------------- |
| Screen ID  | TL-ENTRY-001                                   |
| Module     | Teaching Load (FR-TL)                          |
| Related FR | FR-TL-001 to FR-TL-009, FR-CF-027 to FR-CF-030 |

---

# Quản lý Giờ giảng - Department Secretary's Teaching Load Entry

**User Goal:** Enter, verify, and submit teaching workload data for all lecturers in a department for a specific semester, with automatic conversion to standard hours.

**Role:** Department Secretary (Thư ký Khoa), Department Head (for approval)

---

## Visual Layout - Main Grid View

```
+------------------------------------------------------------------+
|  [Sidebar]  |  Giờ giảng > Nhập Giờ giảng                        |
|             |  [Lưu nháp] [Gửi duyệt] [Xuất Excel] [In]          |
+-------------|----------------------------------------------------+
|             |                                                     |
|             |  +------------------------------------------------+|
|             |  | FILTER BAR                                      ||
|             |  | Đơn vị: [Khoa CNTT v]  Năm học: [2025-2026 v]   ||
|             |  | Học kỳ: [Học kỳ 1 v]   Bộ môn: [Tất cả v]       ||
|             |  | Giảng viên: [Tìm kiếm...]  [Lọc] [Xóa lọc]      ||
|             |  +------------------------------------------------+|
|             |                                                     |
|             |  +------------------------------------------------+|
|             |  | SUMMARY PANEL                                   ||
|             |  | +------------+ +------------+ +----------------+||
|             |  | | Tổng GV    | | Tổng Giờ   | | Hoàn thành     |||
|             |  | | 62         | | 15,420     | | 45/62 (73%)    |||
|             |  | +------------+ +------------+ +----------------+||
|             |  +------------------------------------------------+|
|             |                                                     |
|             |  +------------------------------------------------+|
|             |  | DATA GRID - GIỜ GIẢNG GIẢNG VIÊN                ||
|             |  +------------------------------------------------+|
|             |  | # |Tên GV      |Môn học    |Lớp   |SV |Giờ|HS |GC||
|             |  |---|------------|-----------|------|---|---|---|--||
|             |  | 1 |Nguyen Van A|OOP        |65CN01|45 |45 |1.0|45||
|             |  | 2 |Nguyen Van A|OOP        |65CN02|48 |45 |1.0|45||
|             |  | 3 |Nguyen Van A|Đồ án CNPM |64CN  |25 |30 |1.5|45||
|             |  | 4 |Tran Thi B  |CSDL       |65CN01|45 |45 |1.0|45||
|             |  | 5 |Tran Thi B  |CSDL TH    |65CN01|45 |30 |0.7|21||
|             |  | 6 |...         |...        |...   |...|...|...|..||
|             |  +------------------------------------------------+|
|             |  | << < Trang 1/5 > >> | Hiển thị: [20 v] dòng     ||
|             |  +------------------------------------------------+|
|             |                                                     |
|             |  +------------------------------------------------+|
|             |  | SUMMARY FOOTER - TỔNG HỢP THEO GIẢNG VIÊN       ||
|             |  +------------------------------------------------+|
|             |  | Giảng viên      |Chức danh|ĐM  |Thực hiện|Vượt  ||
|             |  |-----------------|---------|----|---------| -----||
|             |  | Nguyen Van A    |GVC      |280 |312      |+32[G]||
|             |  | Tran Thi B      |GV       |270 |245      |-25[R]||
|             |  | Le Van C        |GVC      |280 |280      |0  [Y]||
|             |  +------------------------------------------------+|
|             |                                                     |
+------------------------------------------------------------------+
```

---

## Filter Bar Component

```
+------------------------------------------------------------------+
| FILTER BAR                                                        |
+------------------------------------------------------------------+
|                                                                   |
|  Đơn vị:          Năm học:          Học kỳ:          Bộ môn:      |
|  +--------------+ +--------------+  +-------------+  +-----------+|
|  | Khoa CNTT  v | | 2025-2026  v |  | Học kỳ 1  v |  | Tất cả  v ||
|  +--------------+ +--------------+  +-------------+  +-----------+|
|                                                                   |
|  Giảng viên:                         Trạng thái:                  |
|  +-----------------------------+     +-------------------------+  |
|  | [Search] Tìm tên giảng viên |     | [x] Chưa nhập           |  |
|  +-----------------------------+     | [x] Đã nhập             |  |
|                                      | [ ] Đã xác nhận         |  |
|                                      +-------------------------+  |
|                                                                   |
|  [LỌC DỮ LIỆU]  [XÓA BỘ LỌC]  [LƯU BỘ LỌC]                        |
+------------------------------------------------------------------+
```

**Filter Behavior:**
| Filter | Type | Default | Impact |
|--------|------|---------|--------|
| Đơn vị | Dropdown | User's department | Filters all data |
| Năm học | Dropdown | Current academic year | Filters workload records |
| Học kỳ | Dropdown | Current semester | Filters by semester |
| Bộ môn | Dropdown | All | Filters by sub-department |
| Giảng viên | Autocomplete | Empty | Search by name |
| Trạng thái | Multi-checkbox | All checked | Filter by entry status |

---

## Main Data Grid

### Grid Columns Specification

```
+---+-------------+------------+--------+----+-----+------+--------+--------+
| # | Tên GV      | Môn học    | Mã lớp | SV | Giờ | Hệ số| Giờ TC | Hành   |
|   |             |            |        |    | thực|quyđổi|        | động   |
+---+-------------+------------+--------+----+-----+------+--------+--------+
| 1 | Nguyen V.A  | Lập trình  | 65CN01 | 45 | 45  | 1.0  | 45.0   | [Sửa]  |
|   | [GVC]       | OOP (LT)   |        |    |     |      |        | [Xóa]  |
+---+-------------+------------+--------+----+-----+------+--------+--------+
```

| Column    | Field                  | Width | Editable   | Notes                      |
| --------- | ---------------------- | ----- | ---------- | -------------------------- |
| #         | Row number             | 40px  | No         | Auto-increment             |
| Tên GV    | employee_name          | 150px | No         | Link to profile            |
| Chức danh | academic_title         | 60px  | No         | Badge (GV, GVC, GVCC)      |
| Môn học   | subject_name           | 180px | Yes        | Autocomplete from catalog  |
| Loại      | activity_type          | 60px  | Yes        | LT/TH/DA/TT/CT (FR-CF-069) |
| Mã lớp    | class_code             | 80px  | Yes        | Freetext                   |
| SV        | student_count          | 50px  | Yes        | Number input               |
| Giờ thực  | raw_hours              | 50px  | Yes        | Number input               |
| Hệ số     | conversion_coefficient | 60px  | Auto       | From FR-CF-070             |
| Giờ TC    | standard_hours         | 60px  | Calculated | = Gio thuc x He so         |
| Hành động | actions                | 80px  | -          | Edit, Delete buttons       |

### Conversion Coefficient Logic (FR-CF-070)

```
+------------------------------------------------------------------+
| HỆ SỐ QUY ĐỔI GIỜ GIẢNG (Cấu hình FR-CF-028)                      |
+------------------------------------------------------------------+
| Loại hoạt động          | Mã  | Hệ số quy đổi | Ghi chú           |
|-------------------------|-----|---------------|-------------------|
| Lý thuyết               | LT  | 1.0           | Mặc định          |
| Thực hành/TN            | TH  | 0.7           | Tùy quy mô lớp    |
| Hướng dẫn Đồ án/Luận văn| DA  | 1.5           | Theo số SV        |
| Hướng dẫn Thực tập      | TT  | 0.5           | Theo tuần         |
| Chấm thi                | CT  | 0.3           | Theo số bài       |
| Hướng dẫn NCS           | NCS | 3.0           | Theo năm          |
| Hướng dẫn Cao học       | CH  | 1.5           | Theo đề tài       |
+------------------------------------------------------------------+
```

---

## Inline Edit Mode

```
+---+-------------+------------+--------+----+-----+------+--------+--------+
| 3 | Nguyen V.A  | [Input   v]| [Input]| [45]|[30] | 1.5  | 45.0   | [Lưu]  |
|   | [GVC]       | Đồ án CNPM |64CNTT  |     |     |      |        |[Hủy]   |
|   |             | [Dropdown] |        |     |     | (auto)|        |        |
+---+-------------+------------+--------+----+-----+------+--------+--------+
     ^             ^            ^        ^     ^      ^
     Fixed         Autocomplete Freetext Num   Num    Calculated
```

### Edit Validation Rules

| Field    | Validation                      | Error Message           |
| -------- | ------------------------------- | ----------------------- |
| Môn học  | Required, must exist in catalog | "Vui lòng chọn môn học" |
| Mã lớp   | Required, alphanumeric          | "Mã lớp không hợp lệ"   |
| Số SV    | Required, 1-200                 | "Số sinh viên từ 1-200" |
| Giờ thực | Required, 1-100                 | "Số giờ từ 1-100"       |

---

## Summary Footer - Lecturer Workload Summary

```
+------------------------------------------------------------------+
| TỔNG HỢP KHỐI LƯỢNG THEO GIẢNG VIÊN                               |
+------------------------------------------------------------------+
|                                                                   |
| +------+----------------+--------+------+----------+-------+-----+|
| | #    | Giảng viên     | Chức   | Định | Thực hiện| Chênh | TT  ||
| |      |                | danh   | mức  | (Giờ TC) | lệch  |     ||
| +------+----------------+--------+------+----------+-------+-----+|
| | 1    | Nguyen Van A   | GVC    | 280  | 312      | +32   | [G] ||
| |      | BM CNPM        |        |      |          |       |     ||
| +------+----------------+--------+------+----------+-------+-----+|
| | 2    | Tran Thi B     | GV     | 270  | 245      | -25   | [R] ||
| |      | BM CNPM        |        |      |          |       |     ||
| +------+----------------+--------+------+----------+-------+-----+|
| | 3    | Le Van C       | GVC    | 280  | 280      | 0     | [Y] ||
| |      | BM HTTT        |        |      |          |       |     ||
| +------+----------------+--------+------+----------+-------+-----+|
|                                                                   |
| Tổng cộng:                          | 4,520      |               ||
| Định mức đơn vị:                    | 4,340      |               ||
| Chênh lệch:                         | +180       | [GREEN]       ||
+------------------------------------------------------------------+
```

### Status Color Coding

| Status        | Color            | Condition                     | Icon |
| ------------- | ---------------- | ----------------------------- | ---- |
| Vượt định mức | Green (#43A047)  | Thực hiện > Định mức          | [G]  |
| Đạt định mức  | Yellow (#FDD835) | Thực hiện = Định mức (+/- 5%) | [Y]  |
| Chưa đạt      | Red (#E53935)    | Thực hiện < Định mức - 5%     | [R]  |
| Chưa nhập     | Gray (#9E9E9E)   | No data entered               | [-]  |

---

## Add New Entry Modal

```
+------------------------------------------------------------------+
| THÊM MỚI GIỜ GIẢNG                                         [X]   |
+------------------------------------------------------------------+
|                                                                   |
|  Giảng viên: *                                                    |
|  +----------------------------------------------------------+    |
|  | [Search] Tìm và chọn giảng viên...                       |    |
|  +----------------------------------------------------------+    |
|  Selected: PGS.TS. Nguyen Van A - BM Công nghệ Phần mềm          |
|                                                                   |
|  +---------------------------+  +---------------------------+    |
|  | Môn học: *                |  | Loại hoạt động: *         |    |
|  | +---------------------+   |  | +---------------------+   |    |
|  | | Lập trình OOP     v |   |  | | Lý thuyết (LT)    v |   |    |
|  | +---------------------+   |  | +---------------------+   |    |
|  +---------------------------+  +---------------------------+    |
|                                                                   |
|  +---------------------------+  +---------------------------+    |
|  | Mã lớp: *                 |  | Số sinh viên: *           |    |
|  | +---------------------+   |  | +---------------------+   |    |
|  | | 65CNTT01           |   |  | | 45                  |   |    |
|  | +---------------------+   |  | +---------------------+   |    |
|  +---------------------------+  +---------------------------+    |
|                                                                   |
|  +---------------------------+  +---------------------------+    |
|  | Số giờ thực: *            |  | Hệ số quy đổi:            |    |
|  | +---------------------+   |  | +---------------------+   |    |
|  | | 45                  |   |  | | 1.0 (Tự động)       |   |    |
|  | +---------------------+   |  | +---------------------+   |    |
|  +---------------------------+  +---------------------------+    |
|                                                                   |
|  +----------------------------------------------------------+    |
|  | GIỜ CHUẨN TÍNH ĐƯỢC: 45.0 giờ                             |    |
|  +----------------------------------------------------------+    |
|                                                                   |
|  Ghi chú:                                                         |
|  +----------------------------------------------------------+    |
|  |                                                          |    |
|  +----------------------------------------------------------+    |
|                                                                   |
|  +---------------------------+  +---------------------------+    |
|  | [HỦY BỎ]                  |  | [LƯU VÀ THÊM TIẾP] [LƯU]  |    |
|  +---------------------------+  +---------------------------+    |
+------------------------------------------------------------------+
```

---

## Bulk Import Feature

```
+------------------------------------------------------------------+
| NHẬP TỪ EXCEL                                              [X]   |
+------------------------------------------------------------------+
|                                                                   |
|  Bước 1: Tải mẫu file Excel                                       |
|  +----------------------------------------------------------+    |
|  | [Download Icon] Tải mẫu file nhập liệu (.xlsx)            |    |
|  +----------------------------------------------------------+    |
|                                                                   |
|  Bước 2: Chọn file đã điền thông tin                              |
|  +----------------------------------------------------------+    |
|  | [Upload Icon] Kéo thả file vào đây hoặc click để chọn    |    |
|  |                                                          |    |
|  |              [teaching_load_import.xlsx]                 |    |
|  +----------------------------------------------------------+    |
|                                                                   |
|  Bước 3: Kiểm tra dữ liệu                                         |
|  +----------------------------------------------------------+    |
|  | [Preview Grid showing first 5 rows]                       |    |
|  | Tổng: 150 dòng | Hợp lệ: 148 | Lỗi: 2                    |    |
|  +----------------------------------------------------------+    |
|                                                                   |
|  Chi tiết lỗi:                                                    |
|  +----------------------------------------------------------+    |
|  | Dòng 45: Mã lớp "65XYZ99" không tồn tại                  |    |
|  | Dòng 89: Giảng viên "ABC" không tìm thấy                 |    |
|  +----------------------------------------------------------+    |
|                                                                   |
|  [ ] Bỏ qua các dòng lỗi và nhập các dòng hợp lệ                  |
|                                                                   |
|  [HỦY BỎ]                              [NHẬP 148 DÒNG HỢP LỆ]     |
+------------------------------------------------------------------+
```

---

## Workflow Actions

### Action Bar

```
+------------------------------------------------------------------+
| [Lưu nháp]  [Gửi xác nhận BM]  [Gửi duyệt Khoa]  [Xuất Excel]    |
+------------------------------------------------------------------+
```

### Workflow States

| State             | Description            | Actions Available       |
| ----------------- | ---------------------- | ----------------------- |
| Draft             | Data being entered     | Save, Edit, Delete      |
| Submitted to BM   | Sent to Dept Head      | Review, Approve, Reject |
| BM Approved       | Dept Head approved     | Submit to Faculty       |
| Submitted to Khoa | Sent to Faculty        | Review, Approve, Reject |
| Faculty Approved  | Final approval         | Export, Print           |
| Rejected          | Sent back for revision | Edit, Resubmit          |

---

## Interaction Rules

### Grid Interactions

| Action     | Trigger               | Result                         |
| ---------- | --------------------- | ------------------------------ |
| Sort       | Click column header   | Sort ascending/descending      |
| Filter     | Type in column filter | Real-time filtering            |
| Select row | Click row             | Highlight, enable bulk actions |
| Edit cell  | Double-click cell     | Inline edit mode               |
| Add row    | Click [+Thêm]         | Open add modal                 |
| Delete row | Click [X]             | Confirm dialog                 |

### Keyboard Shortcuts

| Key    | Action                     |
| ------ | -------------------------- |
| Tab    | Move to next editable cell |
| Enter  | Save and move to next row  |
| Escape | Cancel edit                |
| Ctrl+S | Save all changes           |
| Ctrl+N | Add new entry              |

---

## Data Fields

### Input Fields

| Field            | Type    | Source    | Validation                            |
| ---------------- | ------- | --------- | ------------------------------------- |
| lecturer_id      | FK      | FR-ER     | Must be active lecturer in department |
| subject_id       | FK      | Catalog   | Must be valid subject                 |
| activity_type_id | FK      | FR-CF-069 | Required                              |
| class_code       | String  | Input     | Required, max 20 chars                |
| student_count    | Integer | Input     | 1-200                                 |
| raw_hours        | Decimal | Input     | 0.5-100                               |
| semester_id      | FK      | FR-CF     | From filter                           |
| academic_year_id | FK      | FR-CF     | From filter                           |

### Calculated Fields

| Field                  | Formula                      | Source                      |
| ---------------------- | ---------------------------- | --------------------------- |
| conversion_coefficient | Lookup                       | FR-CF-070 by activity_type  |
| standard_hours         | raw_hours × coefficient      | Calculated                  |
| quota_hours            | Lookup                       | FR-CF-027 by academic_title |
| variance               | standard_hours - quota_hours | Calculated                  |

---

## Responsive Behavior

### Desktop (> 1024px)

- Full grid with all columns visible
- Inline editing
- Side-by-side summary panels

### Tablet (768px - 1024px)

- Horizontal scroll for grid
- Collapsed summary (expandable)
- Modal editing

### Mobile (< 768px)

- Card-based view instead of grid
- Each entry as a card
- Full-screen editing
