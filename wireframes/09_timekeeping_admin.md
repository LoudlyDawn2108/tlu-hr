# Timekeeping & Attendance Administration

## Screen Metadata

| Item       | Detail                    |
| ---------- | ------------------------- |
| Screen ID  | TA-ADM-001                |
| Module     | Time & Attendance (FR-TA) |
| Related FR | FR-TA-001 to FR-TA-010    |

---

# 1. Quản lý Chấm công - Monthly Timesheet Admin

**User Goal:** Verify attendance data from machines/requests, fix errors, and approve final timesheets for payroll.

**Role:** C&B Specialist (TCCB)

## Layout: Monthly Overview

```
+------------------------------------------------------------------+
|  [Sidebar]  |  Chấm công > Bảng tổng hợp tháng                   |
+-------------|----------------------------------------------------+
|             |                                                    |
|  BẢNG CÔNG  |  Tháng: [ 01/2026 v ]   Đơn vị: [ Toàn trường v ]  |
|             |                                                    |
|  [Overview] |  +----------------------------------------------+  |
|  [Daily]    |  | Tổng NS: 1,203 | Đủ công: 1,150 | Thiếu: 53  |  |
|  [Ot]       |  | Nghỉ phép: 45  | Công tác: 12   | Trễ/Sớm: 85|  |
|  [Shift]    |  +----------------------------------------------+  |
|             |                                                    |
|             |  [Khóa bảng công] [Xuất Excel] [Đồng bộ máy CC]    |
|             |                                                    |
|             |  | Mã NS | Tên        | Ngày công | Đi muộn | Phép |
|             |  |-------|------------|-----------|---------|------|
|             |  | 001   | Nguyen A   | 22/22     | 0       | 0    |
|             |  | 002   | Tran B     | 21/22     | 2       | 1    |
|             |  | 003   | Le C       | 18/22     | 0       | 4    |
|             |  | ...   | ...        | ...       | ...     | ...  |
|             |                                                    |
|             |  DETAIL PANEL (Tran B - 21/22):                    |
|             |  +----------------------------------------------+  |
|             |  | Ngày 15/01: [X] Vắng mặt                        |  |
|             |  | -> Giải trình: "Quên chấm công sáng"            |  |
|             |  | -> Minh chứng: Email xác nhận của Trưởng BM     |  |
|             |  |                                                 |  |
|             |  | [Chấp nhận & Bổ sung công]  [Từ chối]           |  |
|             |  +----------------------------------------------+  |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 2. Anomaly Resolution (Xử lý Bất thường)

**Scope:** resolving missing swipes, unmatched shifts

```
+------------------------------------------------------------------+
|  DỮ LIỆU CHẤM CÔNG BẤT THƯỜNG                                    |
+------------------------------------------------------------------+
|                                                                  |
|  Filter: [Lỗi thiếu Check-out v]                                 |
|                                                                  |
|  | Ngày       | Nhân viên     | Ra        | Vào       | Trạng thái     |
|  |------------|---------------|-----------|-----------|----------------|
|  | 10/01/2026 | Nguyen Van X  | 07:45     | --:--     | Thiếu Check-out|
|  | 12/01/2026 | Le Thi Y      | --:--     | 17:15     | Thiếu Check-in |
|                                                                  |
|  Batch Action:                                                   |
|  [Gửi thông báo giải trình cho 15 người]                         |
|                                                                  |
|  Manual Fix (Nguyen Van X):                                      |
|  +-------------------------------------------------------------+ |
|  | Set Check-out time: [ 17:00 ]                               | |
|  | Lý do:              [ Máy chấm công tầng 2 báo lỗi        ] | |
|  | [Lưu]                                                       | |
|  +-------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

---

## 3. Overtime Management (Quản lý Làm thêm)

**Scope:** FR-TA-007

```
+------------------------------------------------------------------+
|  PHÊ DUYỆT LÀM THÊM GIỜ (OT)                                     |
+------------------------------------------------------------------+
|                                                                  |
|  | Nhân viên   | Ngày       | Giờ ĐK | Giờ Thực | Lý do          | Actions |
|  |-------------|------------|--------|----------|----------------|---------|
|  | Tran B      | 15/01 (T7) | 4h     | 4h15     | Bảo trì Server | [v] [x] |
|  | Nguyen C    | 15/01 (T7) | 4h     | 4h00     | Bảo trì Server | [v] [x] |
|  | Le D        | 20/01 (Tối)| 2h     | 3h00     | Hỗ trợ sự cố   | [v] [x] |
|                                                                  |
|  Summary:                                                        |
|  Tổng giờ OT trong tháng: 125h                                   |
|  Quỹ lương OT ước tính: 15,000,000 VNĐ                           |
|                                                                  |
|  [Phê duyệt Tất cả]                                              |
+------------------------------------------------------------------+
```

---

## 4. Workflow Integration

**Validation:** Ensures approved leaves (from Self-service) automatically reflect in Timesheet.

```
+------------------------------------------------------------------+
|  ĐỒNG BỘ DỮ LIỆU NGHỈ PHÉP                                       |
+------------------------------------------------------------------+
|                                                                  |
|  Hệ thống tự động đồng bộ đơn nghỉ phép đã duyệt vào bảng công.  |
|                                                                  |
|  Log đồng bộ:                                                    |
|  - 15/01: Đồng bộ 3 đơn phép (Nguyen A, Tran B...) [OK]          |
|  - 16/01: Đồng bộ 1 đơn công tác (Le C)            [OK]          |
|                                                                  |
|  [Kiểm tra mâu thuẫn] (VD: Vừa có công vừa có phép)              |
|  > Phathien 0 mâu thuẫn.                                         |
+------------------------------------------------------------------+
```
