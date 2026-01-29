# Performance Appraisal Management

## Screen Metadata

| Item       | Detail                        |
| ---------- | ----------------------------- |
| Screen ID  | PR-ADM-001                    |
| Module     | Performance & Rewards (FR-PR) |
| Related FR | FR-PR-001 to FR-PR-010        |

---

# 1. Quản lý Đánh giá - Performance Review Hub

**User Goal:** Launch review cycles, monitor progress, and finalize performance results.

**Role:** HR Specialist (TCCB)

## Layout: Review Cycle Dashboard

```
+------------------------------------------------------------------+
|  [Sidebar]  |  Đánh giá & Thi đua > Kỳ đánh giá                  |
+-------------|----------------------------------------------------+
|             |                                                    |
|  ĐÁNH GIÁ   |  KỲ ĐÁNH GIÁ: VIÊN CHỨC NĂM 2025                   |
|             |  Trạng thái: [Đang diễn ra] | Hạn chót: 31/12/2025 |
|  [Kỳ ĐG]    |                                                    |
|  [Mẫu ĐG]   |  TIẾN ĐỘ TOÀN TRƯỜNG                               |
|  [Kết quả]  |  [██████████████░░░░░░] 70% (842/1203)             |
|  [Thi đua]  |                                                    |
|             |  +----------------------------------------------+  |
|             |  | BY STEP:                                     |  |
|             |  | Tự đánh giá:    [██████████] 95%             |  |
|             |  | Quản lý duyệt:  [██████░░░░] 60%             |  |
|             |  | Hội đồng duyệt: [█░░░░░░░░░] 10%             |  |
|             |  +----------------------------------------------+  |
|             |                                                    |
|             |  ACTION CENTER                                     |
|             |  [Gửi nhắc nhở (361 chưa xong)]  [Gia hạn kỳ ĐG]   |
|             |                                                    |
|             |  WARNINGS                                          |
|             |  [!] Khoa Cơ khí: Tiến độ chậm (30%)               |
|             |  [!] 5 Đơn kiến nghị về kết quả                    |
|             |                                                    |
+------------------------------------------------------------------+
```

---

## 2. Evaluation Form Designer (Thiết kế Mẫu đánh giá)

**Scope:** FR-CF-063, FR-CF-065 (Templates)

```
+------------------------------------------------------------------+
|  CHỈNH SỬA MẪU: ĐÁNH GIÁ GIẢNG VIÊN                              |
+------------------------------------------------------------------+
|                                                                  |
|  Nhóm tiêu chí 1: Kết quả Công việc (Trọng số: 60%)              |
|                                                                  |
|  +-------------------------------------------------------------+ |
|  | 1.1 Hoàn thành giờ giảng dạy                                | |
|  |     Target: [Lấy từ Module Giờ giảng FR-TL]                 | |
|  |     Điểm tối đa: 40                                         | |
|  |                                                             | |
|  | 1.2 Kết quả NCKH                                            | |
|  |     Target: [Lấy từ Module NCKH FR-RM]                      | |
|  |     Điểm tối đa: 20                                         | |
|  +-------------------------------------------------------------+ |
|                                                                  |
|  Nhóm tiêu chí 2: Kỷ luật lao động (Trọng số: 20%)               |
|  +-------------------------------------------------------------+ |
|  | 2.1 Chấp hành giờ giấc                                      | |
|  |     [Edit Criteria]                                         | |
|  +-------------------------------------------------------------+ |
|                                                                  |
|  [+ Thêm nhóm tiêu chí] [Xem trước Mẫu] [Lưu mẫu]                |
+------------------------------------------------------------------+
```

---

## 3. Employee Self-Evaluation (Giao diện Nhân viên)

**Scope:** FR-PR-004 (Self Assessment)

```
+------------------------------------------------------------------+
|  PHIẾU TỰ ĐÁNH GIÁ NĂM 2025                                      |
+------------------------------------------------------------------+
|  Nhân viên: Nguyen Van A | Chức danh: GVC                        |
|                                                                  |
|  I. KẾT QUẢ CÔNG VIỆC (Tự động đồng bộ)                          |
|  - Định mức giờ: 280  | Thực hiện: 312 (+32) -> Điểm: 40/40      |
|  - NCKH: 2 bài báo    | Yêu cầu: 1 bài       -> Điểm: 20/20      |
|                                                                  |
|  II. PHẨM CHẤT ĐẠO ĐỨC (Tự chấm)                                 |
|  1. Chấp hành quy định:                                          |
|     [ v ] Xuất sắc (10đ) - "Tham gia đầy đủ các cuộc họp..."     |
|     ( ) Tốt (8đ)                                                 |
|     ( ) Khá (6đ)                                                 |
|  ...                                                             |
|                                                                  |
|  TỔNG ĐIỂM TỰ CHẤM: 95/100                                       |
|  XẾP LOẠI ĐỀ XUẤT:  HOÀN THÀNH XUẤT SẮC NHIỆM VỤ                 |
|                                                                  |
|  [Gửi bản đánh giá]                                              |
+------------------------------------------------------------------+
```

---

## 4. Calibration & Rewards (Xếp loại & Thi đua)

**Scope:** FR-PR-008

```
+------------------------------------------------------------------+
|  TỔNG HỢP XẾP LOẠI & KHEN THƯỞNG                                 |
+------------------------------------------------------------------+
|                                                                  |
|  Đơn vị: KHOA CNTT                                               |
|                                                                  |
|  Thống kê phân loại (Bell Curve Check):                          |
|  [ Xuất sắc: 20% ] [ Tốt: 60% ] [ Hoàn thành: 15% ] [ KHT: 5% ]  |
|  warning: Tỷ lệ Xuất sắc vượt quá quy định (Max 15%)             |
|                                                                  |
|  Danh sách đề xuất Khen thưởng (Chiến sĩ thi đua):               |
|  | Tên          | Điểm | Thành tích nổi bật        | Duyệt       |
|  |--------------|------|---------------------------|-------------|
|  | Nguyen Van A | 98   | 2 bài Q1, Dạy giỏi        | [x] Yes [ ] |
|  | Tran Thi B   | 96   | Chủ nhiệm đề tài Bộ       | [x] Yes [ ] |
|                                                                  |
|  [Kết xuất Quyết định Khen thưởng] [Kết xuất Lương Thưởng]       |
+------------------------------------------------------------------+
```
