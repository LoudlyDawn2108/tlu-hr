# Lecturer Self-Service Portal (Mobile)

## Screen Metadata

| Item       | Detail                      |
| ---------- | --------------------------- |
| Screen ID  | SS-MOBILE-001               |
| Module     | Self-Service Portal (FR-SS) |
| Related FR | FR-SS-001 to FR-SS-010      |

---

# Cổng Giảng viên - Lecturer Self-Service Mobile Portal

**User Goal:** Access personal HR information, view payslips, check schedules, and request leave on-the-go using mobile devices.

**Role:** Lecturer (Giảng viên), all staff with mobile access

**Design Philosophy:** Mobile-First, Touch-Optimized, Secure Data Access

---

## Mobile Navigation Structure

```
+----------------------------------+
|                                  |
|          MAIN CONTENT            |
|                                  |
|                                  |
|                                  |
|                                  |
|                                  |
|                                  |
|                                  |
+----------------------------------+
|  +-----+                         |
|  | FAB |  Floating Action Button |
|  | [+] |  (Đăng ký Nghỉ phép)    |
|  +-----+                         |
+----------------------------------+
| Home | Lịch | [+] | Lương | Tôi  |
|  O   | Cal  | FAB |   $   |  U   |
+------+------+-----+-------+------+
         BOTTOM TAB BAR
```

### Bottom Tab Bar Specification

| Tab | Icon       | Label     | Screen            |
| --- | ---------- | --------- | ----------------- |
| 1   | Home icon  | Trang chủ | Dashboard         |
| 2   | Calendar   | Lịch      | Schedule Calendar |
| 3   | Plus (FAB) | -         | Quick Actions     |
| 4   | Dollar     | Lương     | Payslip           |
| 5   | User       | Tôi       | Profile           |

---

## Screen 1: Home Dashboard (Trang chủ)

```
+----------------------------------+
| TLU HRMS              [Bell] [=] |
+----------------------------------+
| Chào buổi sáng,                  |
| PGS.TS. Nguyễn Văn A             |
| Khoa CNTT | BM Công nghệ PM      |
+----------------------------------+
|                                  |
| +------------------------------+ |
| | [!] THÔNG BÁO MỚI        (3) | |
| +------------------------------+ |
| | * Bảng lương T01 đã sẵn sàng | |
| | * Lịch họp Khoa 15/02        | |
| | * Hạn nộp đề tài NCKH 28/02  | |
| |                              | |
| | [Xem tất cả thông báo]       | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | TRẠNG THÁI NGHỈ PHÉP         | |
| +------------------------------+ |
| |                              | |
| | Phép năm còn lại:            | |
| | +------------------------+   | |
| | |████████████░░░░| 8/12  |   | |
| | +------------------------+   | |
| |                              | |
| | Đang chờ duyệt: 2 ngày       | |
| | Đã sử dụng: 4 ngày           | |
| |                              | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | GIỜ GIẢNG HK1 2025-2026      | |
| +------------------------------+ |
| |                              | |
| | Định mức: 280 giờ chuẩn      | |
| | Đã thực hiện: 156 giờ        | |
| | +------------------------+   | |
| | |████████░░░░░░░░| 56%   |   | |
| | +------------------------+   | |
| |                              | |
| | [Xem chi tiết giờ giảng]     | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | LỊCH HÔM NAY                 | |
| +------------------------------+ |
| | 07:30 - 09:30  Lập trình OOP | |
| |                Lớp 65CNTT01  | |
| |                Phòng A1-301  | |
| | --------------------------   | |
| | 13:30 - 15:30  Họp Bộ môn    | |
| |                Phòng A1-302  | |
| +------------------------------+ |
|                                  |
|          +-------+               |
|          |  [+]  |  <- FAB       |
|          +-------+               |
+----------------------------------+
| [Home] [Lịch] [+] [Lương] [Tôi]  |
+----------------------------------+
```

---

## Screen 2: Schedule Calendar (Lịch làm việc)

```
+----------------------------------+
| < Tháng 2, 2026              [+] |
+----------------------------------+
|                                  |
| +--+--+--+--+--+--+--+           |
| |CN|T2|T3|T4|T5|T6|T7|           |
| +--+--+--+--+--+--+--+           |
| |26|27|28|29|30|31| 1|           |
| |  |  |  | .|  |  |  |           |
| +--+--+--+--+--+--+--+           |
| | 2| 3| 4| 5| 6| 7| 8|           |
| |  | .|  | .| .|  |  |           |
| +--+--+--+--+--+--+--+           |
| | 9|10|11|12|13|14|15|           |
| |  | .|  |██| .|  |  |           |
| +--+--+--+--+--+--+--+           |
| |16|17|18|19|20|21|22|           |
| |  | .|  | .|  |  |  |           |
| +--+--+--+--+--+--+--+           |
|                                  |
| Chú thích:                       |
| [.] Có lịch   [██] Hôm nay       |
| [x] Nghỉ phép                    |
|                                  |
+----------------------------------+
| THỨ TƯ, 12/02/2026               |
+----------------------------------+
|                                  |
| +------------------------------+ |
| | 07:30 - 09:30                | |
| | Lập trình OOP (LT)           | |
| | Lớp: 65CNTT01 | 45 SV        | |
| | Phòng: A1-301                | |
| | [Chi tiết] [Chỉ đường]       | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | 09:45 - 11:45                | |
| | Lập trình OOP (LT)           | |
| | Lớp: 65CNTT02 | 48 SV        | |
| | Phòng: A1-302                | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | 13:30 - 15:30                | |
| | Họp Bộ môn                   | |
| | Phòng: Phòng họp Khoa        | |
| | Nội dung: Kế hoạch HK2       | |
| +------------------------------+ |
|                                  |
+----------------------------------+
| [Home] [Lịch] [+] [Lương] [Tôi]  |
+----------------------------------+
```

### Calendar Interaction Rules

| Action           | Result                   |
| ---------------- | ------------------------ |
| Tap date         | Show events for that day |
| Swipe left/right | Change month             |
| Tap event        | Expand event details     |
| Tap "Chi duong"  | Open maps navigation     |

---

## Screen 3: My Payslip (Phiếu lương của tôi)

**Security Feature:** Secure toggle to show/hide salary figures

```
+----------------------------------+
| < Phiếu lương               [?]  |
+----------------------------------+
|                                  |
| +------------------------------+ |
| | CHỌN KỲ LƯƠNG                | |
| | +------------------------+   | |
| | | Tháng 01/2026        v |   | |
| | +------------------------+   | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | PHIẾU LƯƠNG THÁNG 01/2026    | |
| | Ngày trả: 05/02/2026         | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | [Toggle: Hiện/Ẩn số liệu]    | |
| |      [ON] ████████           | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | THU NHẬP                     | |
| +------------------------------+ |
| | Lương cơ bản     12,682,800  | |
| | Phụ cấp chức vụ     702,000  | |
| | Phụ cấp thâm niên 1,141,452  | |
| | Phụ cấp ưu đãi    3,804,840  | |
| | Giờ vượt           640,000   | |
| +------------------------------+ |
| | Tổng thu nhập    18,971,092  | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | CÁC KHOẢN TRÍCH              | |
| +------------------------------+ |
| | BHXH (8%)        1,014,624   | |
| | BHYT (1.5%)        190,242   | |
| | BHTN (1%)          126,828   | |
| | Thuế TNCN          865,000   | |
| +------------------------------+ |
| | Tổng trích       2,196,694   | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | THỰC LĨNH                    | |
| | +------------------------+   | |
| | |    16,774,398 VNĐ      |   | |
| | +------------------------+   | |
| +------------------------------+ |
|                                  |
| [Tải PDF] [Xem chi tiết TNCN]    |
|                                  |
+----------------------------------+
| [Home] [Lịch] [+] [Lương] [Tôi]  |
+----------------------------------+
```

### Secure Toggle Behavior

**When Toggle is OFF (Hidden Mode):**

```
+------------------------------+
| THU NHẬP                     |
+------------------------------+
| Lương cơ bản     **,***,***  |
| Phụ cấp chức vụ     ***,***  |
| Phụ cấp thâm niên *,***,***  |
| ...                          |
+------------------------------+
| THỰC LĨNH                    |
| +------------------------+   |
| |    **,***,*** VNĐ      |   |
| +------------------------+   |
+------------------------------+
```

**Toggle Security:**
| Action | Result |
|--------|--------|
| Toggle ON | Require biometric/PIN |
| Auto-lock | After 30 seconds inactive |
| Screenshot | Show warning, optional block |

---

## Screen 4: Profile & Settings (Cá nhân)

```
+----------------------------------+
| < Thông tin Cá nhân        [Edit]|
+----------------------------------+
|                                  |
| +------------------------------+ |
| |     +--------+               | |
| |     | [PHOTO]|               | |
| |     | 100x100|               | |
| |     +--------+               | |
| |                              | |
| | PGS.TS. NGUYỄN VĂN A         | |
| | Mã CB: TLU-2015-0234         | |
| | Giảng viên chính             | |
| | Khoa CNTT > BM CNPM          | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | MENU CÁ NHÂN                 | |
| +------------------------------+ |
| | [>] Thông tin Cơ bản         | |
| |     Hồ sơ cá nhân            | |
| +------------------------------+ |
| | [>] Trình độ & Chứng chỉ     | |
| |     Bằng cấp, chứng chỉ      | |
| +------------------------------+ |
| | [>] Hợp đồng Lao động        | |
| |     Lịch sử hợp đồng         | |
| +------------------------------+ |
| | [>] Giờ giảng của tôi        | |
| |     Thống kê giờ giảng       | |
| +------------------------------+ |
| | [>] NCKH của tôi             | |
| |     Đề tài, công bố          | |
| +------------------------------+ |
| | [>] Kết quả Đánh giá         | |
| |     Đánh giá viên chức       | |
| +------------------------------+ |
| | [>] Người phụ thuộc          | |
| |     Đăng ký giảm trừ thuế    | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | CÀI ĐẶT                      | |
| +------------------------------+ |
| | [>] Thông báo                | |
| | [>] Bảo mật                  | |
| | [>] Ngôn ngữ                 | |
| | [>] Đăng xuất                | |
| +------------------------------+ |
|                                  |
+----------------------------------+
| [Home] [Lịch] [+] [Lương] [Tôi]  |
+----------------------------------+
```

---

## FAB Quick Actions Menu

**Floating Action Button Expanded State:**

```
+----------------------------------+
|                                  |
|                                  |
|                                  |
|               +----------------+ |
|               | Báo cáo Vấn đề | |
|               +----------------+ |
|                          +-----+ |
|                          | [!] | |
|                          +-----+ |
|               +----------------+ |
|               | Cập nhật TT    | |
|               +----------------+ |
|                          +-----+ |
|                          | [i] | |
|                          +-----+ |
|               +----------------+ |
|               | Đăng ký Phép   | |
|               +----------------+ |
|                          +-----+ |
|                          |[Cal]| |
|                          +-----+ |
|                                  |
|                          +-----+ |
|                          | [X] | |
|                          +-----+ |
+----------------------------------+
| [Home] [Lịch] [+] [Lương] [Tôi]  |
+----------------------------------+
```

### FAB Actions

| Action             | Icon     | Screen               |
| ------------------ | -------- | -------------------- |
| Đăng ký Nghỉ phép  | Calendar | Leave Request Form   |
| Cập nhật Thông tin | Info     | Update Personal Info |
| Báo cáo Vấn đề     | Alert    | Report Issue Form    |

---

## Leave Request Flow (Đăng ký Nghỉ phép)

### Step 1: Leave Type Selection

```
+----------------------------------+
| < Đăng ký Nghỉ phép              |
+----------------------------------+
|                                  |
| BƯỚC 1/3: CHỌN LOẠI NGHỈ PHÉP    |
|                                  |
| +------------------------------+ |
| | [ ] Phép năm                 | |
| |     Còn lại: 8 ngày          | |
| +------------------------------+ |
| | [ ] Việc riêng có lương      | |
| |     Tối đa: 3 ngày           | |
| +------------------------------+ |
| | [ ] Nghỉ ốm                  | |
| |     Theo BHXH                | |
| +------------------------------+ |
| | [ ] Nghỉ không lương         | |
| |     Cần phê duyệt            | |
| +------------------------------+ |
|                                  |
|                                  |
|                      [TIẾP TỤC]  |
+----------------------------------+
```

### Step 2: Date Selection

```
+----------------------------------+
| < Đăng ký Nghỉ phép              |
+----------------------------------+
|                                  |
| BƯỚC 2/3: CHỌN NGÀY              |
|                                  |
| Loại phép: Phép năm              |
|                                  |
| Từ ngày:                         |
| +------------------------------+ |
| | [Cal] 15/02/2026 (Thứ Ba)    | |
| +------------------------------+ |
|                                  |
| Đến ngày:                        |
| +------------------------------+ |
| | [Cal] 17/02/2026 (Thứ Năm)   | |
| +------------------------------+ |
|                                  |
| Tổng số ngày: 3 ngày             |
|                                  |
| +------------------------------+ |
| | [!] Sau khi nghỉ, còn lại:   | |
| |     5 ngày phép năm          | |
| +------------------------------+ |
|                                  |
|                                  |
| [QUAY LẠI]           [TIẾP TỤC]  |
+----------------------------------+
```

### Step 3: Reason & Submit

```
+----------------------------------+
| < Đăng ký Nghỉ phép              |
+----------------------------------+
|                                  |
| BƯỚC 3/3: LÝ DO & XÁC NHẬN       |
|                                  |
| Loại phép: Phép năm              |
| Thời gian: 15/02 - 17/02/2026    |
| Số ngày:   3 ngày                |
|                                  |
| Lý do nghỉ: *                    |
| +------------------------------+ |
| | Nghỉ phép về quê thăm gia    | |
| | đình                         | |
| |                              | |
| +------------------------------+ |
|                                  |
| Người phê duyệt:                 |
| +------------------------------+ |
| | TS. Trần Văn B               | |
| | Trưởng Bộ môn CNPM           | |
| +------------------------------+ |
|                                  |
| [ ] Gửi thông báo email cho      |
|     đồng nghiệp trong BM         |
|                                  |
| +------------------------------+ |
| | XÁC NHẬN THÔNG TIN           | |
| | - Phép năm: 3 ngày           | |
| | - Từ 15/02 đến 17/02/2026    | |
| | - Gửi tới: TS. Trần Văn B    | |
| +------------------------------+ |
|                                  |
| [QUAY LẠI]        [GỬI ĐƠN PHÉP] |
+----------------------------------+
```

### Step 4: Confirmation

```
+----------------------------------+
|                                  |
|                                  |
|           +--------+             |
|           |   ✓    |             |
|           +--------+             |
|                                  |
|     ĐƠN NGHỈ PHÉP ĐÃ ĐƯỢC        |
|          GỬI THÀNH CÔNG          |
|                                  |
|     Mã đơn: LP-2026-0234         |
|                                  |
|     Người duyệt: TS. Trần Văn B  |
|     Trạng thái: Chờ phê duyệt    |
|                                  |
|     Bạn sẽ nhận thông báo khi    |
|     đơn được xử lý               |
|                                  |
|                                  |
|        [VỀ TRANG CHỦ]            |
|                                  |
|        [XEM TRẠNG THÁI ĐƠN]      |
|                                  |
+----------------------------------+
```

---

## Notification Center

```
+----------------------------------+
| < Thông báo                      |
+----------------------------------+
|                                  |
| [Tất cả] [Chưa đọc] [Quan trọng] |
|                                  |
| +------------------------------+ |
| | HÔM NAY                      | |
| +------------------------------+ |
| | [!] Đơn nghỉ phép đã được    | |
| |     PHÊ DUYỆT                | |
| |     2 phút trước             | |
| +------------------------------+ |
| | [$] Bảng lương T01/2026      | |
| |     đã sẵn sàng xem          | |
| |     1 giờ trước              | |
| +------------------------------+ |
|                                  |
| +------------------------------+ |
| | HÔM QUA                      | |
| +------------------------------+ |
| | [Cal] Lịch họp Bộ môn        | |
| |     15/02 lúc 13:30          | |
| |     Hôm qua                  | |
| +------------------------------+ |
| | [i] Cập nhật hệ thống        | |
| |     HRMS sẽ bảo trì 20/02    | |
| |     2 ngày trước             | |
| +------------------------------+ |
|                                  |
+----------------------------------+
| [Home] [Lịch] [+] [Lương] [Tôi]  |
+----------------------------------+
```

---

## Mobile UI Specifications

### Touch Targets

| Element      | Minimum Size      | Padding |
| ------------ | ----------------- | ------- |
| Button       | 44x44 px          | 8px     |
| List item    | Full width x 56px | 16px    |
| Tab bar item | 64x56 px          | 8px     |
| FAB          | 56x56 px          | -       |

### Typography (Mobile)

| Element        | Size | Weight   |
| -------------- | ---- | -------- |
| Page title     | 20sp | Bold     |
| Section header | 16sp | SemiBold |
| Body text      | 14sp | Regular  |
| Caption        | 12sp | Regular  |
| Tab label      | 10sp | Medium   |

### Color Palette

| Usage      | Color      | Hex     |
| ---------- | ---------- | ------- |
| Primary    | TLU Blue   | #1565C0 |
| Accent     | Orange     | #FF6F00 |
| Success    | Green      | #43A047 |
| Warning    | Yellow     | #FDD835 |
| Error      | Red        | #E53935 |
| Background | Light Gray | #F5F5F5 |
| Surface    | White      | #FFFFFF |

---

## Offline Capabilities

| Feature              | Offline Behavior |
| -------------------- | ---------------- |
| View cached payslip  | Available        |
| View cached schedule | Available        |
| Submit leave request | Queue for sync   |
| Profile viewing      | Cached data      |
| Notifications        | Not available    |

### Sync Indicator

```
+----------------------------------+
| [Offline Icon] Chế độ ngoại tuyến|
| Dữ liệu cập nhật lúc: 14:30      |
| [Đồng bộ ngay]                   |
+----------------------------------+
```

---

## Biometric Authentication

```
+----------------------------------+
|                                  |
|                                  |
|           +--------+             |
|           |  [FP]  |             |
|           +--------+             |
|                                  |
|     Xác thực để xem              |
|     Phiếu lương                  |
|                                  |
|     [Dùng vân tay hoặc Face ID]  |
|                                  |
|     hoặc                         |
|                                  |
|     [Nhập mã PIN]                |
|                                  |
+----------------------------------+
```

---

## Responsive Considerations

### Phone (< 480px)

- Single column layout
- Bottom tab navigation
- FAB for quick actions
- Full-screen modals

### Tablet Portrait (480px - 768px)

- Two-column layout for some screens
- Larger touch targets
- Split view for calendar

### Tablet Landscape (> 768px)

- Master-detail layout
- Sidebar navigation option
- Multi-panel views
