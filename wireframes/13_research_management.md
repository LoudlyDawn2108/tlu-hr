# Research & Science Management

## Screen Metadata

| Item       | Detail                             |
| ---------- | ---------------------------------- |
| Screen ID  | RM-MGT-001                         |
| Module     | Research Management (FR-RM)        |
| Related FR | FR-RM-001 to FR-RM-008, FR-TL-006  |

---

# Quản lý Khoa học & Công nghệ - Research Management Hub

**User Goal:** Manage the lifecycle of research topics, validate publications, and calculate research hours for academic staff.

**Role:** Science Dept Specialist (Phòng KHCN), Science Council

---

## Layout: Research Command Center

```
+------------------------------------------------------------------+
|  [Sidebar]  |  Khoa học Công nghệ > Tổng quan                    |
+-------------|----------------------------------------------------+
|             |                                                    |
|  KHOA HỌC   |  NĂM HỌC: [ 2025-2026 v ]                          |
|             |                                                    |
|  [Dashboard]|  +------------+  +------------+  +------------+    |
|  [Topics]   |  | ĐỀ TÀI     |  | CÔNG BỐ    |  | SỐ GIỜ NCKH|    |
|  [Papers]   |  |            |  |            |  |            |    |
|  [Council]  |  | 45         |  | 120        |  | 45,000h    |    |
|             |  | Đang thực  |  | ISI/Scopus |  | Quy đổi    |    |
|             |  | hiện       |  |            |  |            |    |
|             |  +------------+  +------------+  +------------+    |
|             |                                                    |
|             |  TASKS                                             |
|             |  [!!!] 3 Đề tài chậm tiến độ (Hạn: 15/01)          |
|             |  [ ! ] 15 Bài báo chờ xác minh (Cần đối chiếu minh chứng)
|             |  [ i ] Hội đồng nghiệm thu Cấp Trường (12/02)      |
|             |                                                    |
|             |  QUICK ACTIONS                                     |
|             |  [Đăng ký Đề tài mới]  [Tổ chức Hội đồng]          |
|             |                                                    |
|             |  KPI MONITOR                                       |
|             |  Khoa CNTT:     [████████░░] 80% NCKH              |
|             |  Khoa Kinh tế:  [█████░░░░░] 50% NCKH              |
|             |                                                    |
+------------------------------------------------------------------+
```

---

## 1. Topic Management Workflow (Quản lý Đề tài)

**Scope:** FR-RM-001 (Registration), FR-RM-003 (Tracking)

```
+------------------------------------------------------------------+
|  QUẢN LÝ ĐỀ TÀI NCKH                                             |
+------------------------------------------------------------------+
|                                                                  |
|  View: [Kanban Board v]                                          |
|                                                                  |
|  +-------------+  +-------------+  +-------------+  +-------------+
|  | ĐĂNG KÝ     |  | THUYẾT MINH |  | THỰC HIỆN   |  | NGHIỆM THU |
|  | (New)       |  | (Reviewing) |  | (Ongoing)   |  | (Closing)  |
|  |-------------|  |-------------|  |-------------|  |-------------|
|  | DT-2026-01  |  | DT-2026-05  |  | DT-2025-12  |  | DT-2024-88 |
|  | Ứng dụng AI |  | IoT flood   |  | Big Data    |  | Blockchain |
|  | [Le Van A]  |  | [Tran B]    |  | [Nhóm 3]    |  | [Pham X]   |
|  | 500tr       |  | Chờ HĐ duyệt|  | Hạn: 12/2026|  | [Booked]   |
|  +-------------+  +-------------+  +-------------+  +-------------+
|                                                                  |
|  DETAIL OVERLAY (DT-2025-12):                                    |
|  +------------------------------------------------------------+  |
|  | Tên: Xây dựng CSDL Big Data cho Thủy lợi                   |  |
|  | Chủ nhiệm: TS. Nguyen Van X                                |  |
|  | Thành viên: 5 người (View workload distribution)           |  |
|  |                                                            |  |
|  | TIẾN ĐỘ GIẢI NGÂN:                                         |  |
|  | [██████░░░░] 60% (300/500 Tr)                              |  |
|  |                                                            |  |
|  | SẢN PHẨM DỰ KIẾN:                                          |  |
|  | [x] 1 Bài báo ISI (Done)                                   |  |
|  | [ ] 1 Phần mềm (Testing)                                   |  |
|  | [ ] 1 Sách chuyên khảo (Drafting)                          |  |
|  |                                                            |  |
|  | [Cập nhật Tiến độ] [Gia hạn] [Quyết toán]                  |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

---

## 2. Publication Validation (Xác minh Công bố)

**Scope:** FR-RM-002, FR-RM-004

**Problem:** Lecturers self-report papers. Science Dept must verify IF/Ranking/Author position.

```
+------------------------------------------------------------------+
|  XÁC MINH BÀI BÁO KHOA HỌC (Pending Verification: 15)            |
+------------------------------------------------------------------+
|                                                                  |
|  | Tiêu đề Bài báo        | Tác giả (Claim) | Tạp chí/Hội thảo  |
|  |------------------------|-----------------|-------------------|
|  | "Optimizing Water..."  | Nguyen A (Main) | Water Resources   |
|  |                        |                 | (Q1, IF: 4.5)     |
|  |------------------------|-----------------|-------------------|
|                                                                  |
|  VERIFICATION PANEL:                                             |
|  +------------------------------------------------------------+  |
|  | 1. Minh chứng PDF: [View PDF]                              |  |
|  | 2. Link DOI: dx.doi.org/10.1000/xyz (Auto-check: Valid)    |  |
|  | 3. Xếp hạng Tạp chí (Scimago/WoS):                         |  |
|  |    Detected: Q1 (2024)                                     |  |
|  |    System Rank: [ Q1 v ] (Confirm)                         |  |
|  | 4. Vai trò Tác giả:                                        |  |
|  |    Claim: Tác giả chính (First Author)                     |  |
|  |    Policy: Được hưởng 100% giờ chuẩn                       |  |
|  |                                                            |  |
|  | [Xác nhận Hợp lệ]  [Yêu cầu Bổ sung]  [Từ chối]            |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

---

## 3. Research Hours Calculation (Quy đổi Giờ NCKH)

**Scope:** FR-TL-006 (Converting products to hours), FR-RM-005

```
+------------------------------------------------------------------+
|  TỔNG HỢP GIỜ NCKH (Học kỳ 1, 2025-2026)                         |
+------------------------------------------------------------------+
|                                                                  |
|  Đơn vị: KHOA CNTT                                               |
|                                                                  |
|  | Nhân sự    | Đề tài (h)| Bài báo (h)| Sách (h) | Tổng (h)| %  |
|  |------------|-----------|------------|----------|---------|----|
|  | Nguyen A   | 300       | 400        | 0        | 700     |120%|
|  | Tran B     | 100       | 0          | 0        | 100     | 20%|
|  | Le C       | 600       | 200        | 100      | 900     |150%|
|                                                                  |
|  Rules Applied (Hiển thị công thức apply từ FR-CF):              |
|  - Đề tài Cấp Bộ (Chủ nhiệm): 300h                               |
|  - Bài báo ISI Q1: 400h                                          |
|                                                                  |
|  [Gửi thông báo tiến độ cho GV thấp]  [Xuất báo cáo lương NCKH]  |
+------------------------------------------------------------------+
```
