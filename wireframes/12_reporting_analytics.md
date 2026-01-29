# Reporting & Analytics Administration

## Screen Metadata

| Item       | Detail                        |
| ---------- | ----------------------------- |
| Screen ID  | RPT-ADM-001                   |
| Module     | Reporting & Analytics (FR-RP) |
| Related FR | FR-RP-001 to FR-RP-010        |

---

# 1. Kho Báo cáo - Report Center

**User Goal:** Access standard reports for internal management and external compliance (Ministry).

**Role:** Admin, Manager

## Layout: Report Library

```
+------------------------------------------------------------------+
|  [Sidebar]  |  Báo cáo > Kho báo cáo                             |
+-------------|----------------------------------------------------+
|             |                                                    |
|  BÁO CÁO    |  DANH MỤC BÁO CÁO                                  |
|             |  Filter: [Nhân sự v] [Tài chính v] [Bộ GD&ĐT v]    |
|  [Library]  |                                                    |
|  [Designer] |  1. NHÓM BÁO CÁO NHÂN SỰ                           |
|  [Schedule] |  +----------------------------------------------+  |
|             |  | RP01. Danh sách Trích ngang Nhân sự          |  |
|             |  | RP02. Báo cáo Biến động Nhân sự (Tăng/Giảm)  |  |
|             |  | RP03. Cơ cấu trình độ Giáo viên              |  |
|             |  +----------------------------------------------+  |
|             |                                                    |
|             |  2. NHÓM BÁO CÁO LƯƠNG (Secure)                    |
|             |  +----------------------------------------------+  |
|             |  | RP10. Bảng thanh toán tiền lương tháng       |  |
|             |  | RP11. Báo cáo Quỹ lương & Thuế TNCN          |  |
|             |  | RP12. Tổng hợp Trích nộp Bảo hiểm            |  |
|             |  +----------------------------------------------+  |
|             |                                                    |
|             |  3. NHÓM BÁO CÁO BỘ GIÁO DỤC                       |
|             |  +----------------------------------------------+  |
|             |  | EMIS. Thống kê Đội ngũ Cán bộ Quản lý, GV    |  |
|             |  | EMIS. Chất lượng đội ngũ (Chuẩn hóa)         |  |
|             |  +----------------------------------------------+  |
|             |                                                    |
+------------------------------------------------------------------+
```

---

## 2. Report Parameter Screen (Chạy Báo cáo)

**Interaction:** When clicking a report (e.g., RP01)

```
+------------------------------------------------------------------+
|  RP01. DANH SÁCH TRÍCH NGANG NHÂN SỰ                             |
+------------------------------------------------------------------+
|                                                                  |
|  THAM SỐ LỌC DỮ LIỆU                                             |
|  +-------------------------------------------------------------+ |
|  | Ngày chốt số liệu: [ 31/01/2026   ]                         | |
|  | Đơn vị:            [ Toàn trường  v ]  [x] Bao gồm đơn vị con| |
|  | Loại hợp đồng:     [ Tất cả       v ]                        | |
|  | Trạng thái:        [ Đang làm việc v ]                        | |
|  +-------------------------------------------------------------+ |
|                                                                  |
|  [XEM TRƯỚC (PREVIEW)]    [XUẤT EXCEL]    [XUẤT PDF]             |
|                                                                  |
|  PREVIEW DATA:                                                   |
|  | STT | Họ tên       | Ngày sinh  | Đơn vị   | Chức danh |      |
|  |-----|--------------|------------|----------|-----------|      |
|  | 1   | Nguyen Van A | 1980       | CNTT     | GVC       |      |
|  | 2   | Tran Thi B   | 1985       | Kinh tế  | GV        |      |
|  ...                                                             |
+------------------------------------------------------------------+
```

---

## 3. Custom Report Builder (Tạo Báo cáo Tùy chỉnh)

**Scope:** FR-RP-010 (Ad-hoc reporting)

```
+------------------------------------------------------------------+
|  THIẾT KẾ BÁO CÁO MỚI                                            |
+------------------------------------------------------------------+
|                                                                  |
|  BƯỚC 1: CHỌN TRƯỜNG DỮ LIỆU (Drag & Drop)                       |
|  Source: [Hồ sơ Nhân sự v]                                       |
|                                                                  |
|  Available Fields:       Selected Columns:                       |
|  [ Mã Nhân viên  ]       [ Họ và tên     ] [x]                   |
|  [ Họ và tên     ]  -->  [ Giới tính     ] [x]                   |
|  [ Ngày sinh     ]       [ Tên Đơn vị    ] [x]                   |
|  [ Quê quán      ]       [ Trình độ      ] [x]                   |
|  [ Dân tộc       ]       [ Thâm niên     ] [x]                   |
|                                                                  |
|  BƯỚC 2: ĐIỀU KIỆN LỌC (Filters)                                 |
|  IF [Giới tính] = "Nữ" AND [Trình độ] = "Tiến sĩ"                |
|                                                                  |
|  BƯỚC 3: GROUP & SORT                                            |
|  Group by: [Tên Đơn vị]                                          |
|  Sort by:  [Tên] ASC                                             |
|                                                                  |
|  [Chạy thử]   [Lưu mẫu báo cáo này]                              |
+------------------------------------------------------------------+
```

---

## 4. System Logs (Nhật ký Hệ thống)

**Scope:** Security & Audit

```
+------------------------------------------------------------------+
|  NHẬT KÝ HỆ THỐNG (SYSTEM AUDIT LOG)                             |
+------------------------------------------------------------------+
|                                                                  |
|  Filter: [User: admin.tccb]  [Action: Modify Salary]             |
|                                                                  |
|  | Time             | User       | IP Addr      | Action               |
|  |------------------|------------|--------------|----------------------|
|  | 27/01/26 10:05   | admin.tccb | 192.168.1.5  | Update Base Salary   |
|  | 27/01/26 09:12   | admin.tccb | 192.168.1.5  | Login Success        |
|  | 26/01/26 18:00   | system     | localhost    | Auto-backup DB       |
|                                                                  |
|  [Xuất Log]                                                      |
+------------------------------------------------------------------+
```
