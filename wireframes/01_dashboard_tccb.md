# HR Command Center Dashboard

## Screen Metadata
| Item | Detail |
|------|--------|
| Screen ID | DASH-TCCB-001 |
| Module | Dashboard |
| Related FR | FR-RP-007, FR-CM-005, FR-TA-004 |

---

# HR Command Center (Trung tâm Điều hành Nhân sự)

**User Goal:** Get a real-time overview of critical HR metrics, pending actions, and alerts requiring immediate attention.

**Role:** HR Specialist (Phòng TCCB), HR Manager

---

## Visual Layout

```
+------------------------------------------------------------------+
|  [Sidebar]  |  Dashboard > Trung tâm Điều hành Nhân sự           |
|             |  Chào buổi sáng, Nguyen Thi H!      [Jan 27, 2026]  |
+-------------|----------------------------------------------------+
|             |                                                     |
|  Dashboard  |  +---------------+  +---------------+  +-----------+|
|  > Trung    |  | TỔNG NHÂN SỰ  |  | CẦN PHÊ DUYỆT |  | CẢNH BÁO  ||
|    tâm ĐH   |  |     1,203     |  |      12       |  |     8     ||
|             |  | [People Icon] |  | [Clock Icon]  |  | [! Icon]  ||
|  Nhân sự    |  | +2.1% vs Q3   |  |  Xem tất cả > |  | Chi tiết >||
|             |  +---------------+  +---------------+  +-----------+|
|  Tổ chức    |                                                     |
|             |  +------------------------------------------------+|
|  Hợp đồng   |  |  ACTION CARDS - VIỆC CẦN LÀM HÔM NAY            ||
|             |  +------------------------------------------------+|
|  Chấm công  |  |                                                 ||
|             |  |  +-------------------+  +---------------------+ ||
|  Lương      |  |  | [!] HỢP ĐỒNG     |  | [Clock] NGHỈ PHÉP   | ||
|             |  |  | SẮP HẾT HẠN      |  | CHỜ DUYỆT           | ||
|             |  |  |                  |  |                     | ||
|  Giờ giảng  |  |  | 5 hợp đồng       |  | 8 đơn               | ||
|             |  |  | trong 30 ngày    |  | chờ xử lý           | ||
|             |  |  |                  |  |                     | ||
|             |  |  | [RED] 2 Quá hạn  |  | [YELLOW] 3 > 2 ngày | ||
|             |  |  | [YELLOW] 3 < 7d  |  | [GREEN] 5 mới       | ||
|             |  |  |                  |  |                     | ||
|             |  |  | [Xử lý ngay]     |  | [Duyệt ngay]        | ||
|             |  |  +-------------------+  +---------------------+ ||
|             |  |                                                 ||
|             |  |  +-------------------+  +---------------------+ ||
|             |  |  | [Star] ĐÁNH GIÁ  |  | [User+] TUYỂN DỤNG  | ||
|             |  |  | VIÊN CHỨC        |  | ĐANG MỞ             | ||
|             |  |  |                  |  |                     | ||
|             |  |  | Kỳ đánh giá 2025 |  | 3 vị trí            | ||
|             |  |  | Còn 15 ngày      |  | 45 ứng viên         | ||
|             |  |  |                  |  |                     | ||
|             |  |  | 847/1203 đã hoàn |  | 12 cần phỏng vấn    | ||
|             |  |  | thành (70%)      |  |                     | ||
|             |  |  |                  |  |                     | ||
|             |  |  | [Xem chi tiết]   |  | [Xem ứng viên]      | ||
|             |  |  +-------------------+  +---------------------+ ||
|             |  +------------------------------------------------+|
|             |                                                     |
|             |  +------------------------------------------------+|
|             |  |  TÌM KIẾM NHANH                                 ||
|             |  +------------------------------------------------+|
|             |  |  +------------------------------------------+  ||
|             |  |  | [Search] Tìm theo Tên, Mã CB, Đơn vị...  |  ||
|             |  |  +------------------------------------------+  ||
|             |  |  |  Gợi ý: "Nguyen", "KCNTT", "Tien si"     |  ||
|             |  +------------------------------------------------+|
|             |                                                     |
|             |  +------------------------+  +---------------------+|
|             |  | THỐNG KÊ NHÂN SỰ       |  | LỊCH SỬ HOẠT ĐỘNG   ||
|             |  +------------------------+  +---------------------+|
|             |  | [Pie Chart]            |  | 09:15 Duyệt đơn #45 ||
|             |  |                        |  | 09:02 Cập nhật HS   ||
|             |  | GV: 738 (61%)          |  | 08:45 Thêm HĐ mới   ||
|             |  | NV: 312 (26%)          |  | 08:30 Xuất báo cáo  ||
|             |  | QL: 153 (13%)          |  |                     ||
|             |  |                        |  | [Xem tất cả]        ||
|             |  +------------------------+  +---------------------+|
|             |                                                     |
+------------------------------------------------------------------+
```

---

## Component Specifications

### 1. Summary Metric Cards (Top Row)

```
+---------------------------+
|  [Icon]                   |
|  METRIC LABEL             |
|  -------------------------+
|  ##,###                   |  <- Large number
|  +X.X% vs [period]        |  <- Trend indicator
|  [Action Link >]          |  <- Optional CTA
+---------------------------+
```

| Card | Metric | Data Source | Click Action |
|------|--------|-------------|--------------|
| Tổng Nhân sự | Count of active employees | FR-ER | Navigate to Personnel List |
| Cần Phê duyệt | Pending approvals count | FR-TA, FR-CM | Navigate to Approval Queue |
| Cảnh báo | Active alerts count | System | Open Alert Panel |

---

### 2. Action Cards - Contract Expiry (FR-CM-005)

**Visual Layout:**
```
+---------------------------------------+
|  [!] HỢP ĐỒNG SẮP HẾT HẠN             |
+---------------------------------------+
|                                       |
|  5 hợp đồng trong 30 ngày tới         |
|                                       |
|  +-----------------------------------+|
|  | [RED DOT] Quá hạn             2   ||
|  | [YELLOW DOT] < 7 ngày         3   ||
|  | [GREEN DOT] 7-30 ngày         0   ||
|  +-----------------------------------+|
|                                       |
|  Chi tiết:                            |
|  +-----------------------------------+|
|  | Nguyen Van A  | HD-2024-001 | -5d ||
|  | Tran Thi B    | HD-2024-015 | 3d  ||
|  | Le Van C      | HD-2024-023 | 5d  ||
|  +-----------------------------------+|
|                                       |
|  [XỬ LÝ NGAY]  [XEM TẤT CẢ >]         |
+---------------------------------------+
```

**Status Color Coding:**
| Status | Color | Dot | Meaning |
|--------|-------|-----|---------|
| Overdue | Red (#E53935) | Filled circle | Contract already expired |
| Critical | Yellow (#FDD835) | Filled circle | < 7 days remaining |
| Warning | Orange (#FB8C00) | Filled circle | 7-14 days remaining |
| Normal | Green (#43A047) | Filled circle | 15-30 days remaining |

---

### 3. Action Cards - Leave Approvals (FR-TA-004)

**Visual Layout:**
```
+---------------------------------------+
|  [Clock] NGHỈ PHÉP CHỜ DUYỆT          |
+---------------------------------------+
|                                       |
|  8 đơn chờ xử lý                      |
|                                       |
|  +-----------------------------------+|
|  | [YELLOW] Chờ > 2 ngày         3   ||
|  | [GREEN] Đơn mới               5   ||
|  +-----------------------------------+|
|                                       |
|  Mới nhất:                            |
|  +-----------------------------------+|
|  | Pham D | Phép năm | 3 ngày | 2h  ||
|  | Hoang E| Việc riêng| 1 ngày | 5h  ||
|  +-----------------------------------+|
|                                       |
|  [DUYỆT NGAY]  [XEM TẤT CẢ >]         |
+---------------------------------------+
```

**Priority Indicators:**
| Priority | Color | Condition |
|----------|-------|-----------|
| High | Yellow | Pending > 2 days |
| Normal | Green | Pending < 2 days |
| Urgent | Red | Start date within 24h |

---

### 4. Quick Search Component

```
+--------------------------------------------------+
|  TÌM KIẾM NHANH                                  |
+--------------------------------------------------+
|                                                  |
|  +--------------------------------------------+  |
|  | [Search Icon]  Tìm theo Tên, Mã CB, Đơn vị...|  |
|  +--------------------------------------------+  |
|                                                  |
|  Tìm kiếm nâng cao:                              |
|  [Đơn vị v] [Trình độ v] [Trạng thái v] [Lọc]    |
|                                                  |
|  Tìm kiếm gần đây:                               |
|  [Tag] Nguyen Van A  [Tag] Khoa CNTT  [x]        |
|                                                  |
+--------------------------------------------------+
```

**Search Behavior:**
| Input | Action |
|-------|--------|
| Type 2+ characters | Show autocomplete suggestions |
| Press Enter | Execute search, navigate to results |
| Click suggestion | Navigate directly to profile |
| Click filter | Open advanced filter modal |

---

### 5. Statistics Panel

```
+----------------------------------+
|  THỐNG KÊ NHÂN SỰ THEO ĐƠN VỊ    |
+----------------------------------+
|                                  |
|  [Horizontal Bar Chart]          |
|                                  |
|  Khoa Cong trinh        |████| 87|
|  Khoa CNTT              |███| 62 |
|  Khoa Co khi            |███| 62 |
|  Khoa Dien-Dien tu      |██| 45  |
|  Phong TCCB             |█| 12   |
|  ...                             |
|                                  |
|  [Xem báo cáo chi tiết >]        |
+----------------------------------+
```

---

## Interaction Rules

### Card Interactions
| Element | Action | Result |
|---------|--------|--------|
| Action Card | Click | Expand to show detail list |
| "Xử lý ngay" button | Click | Navigate to processing queue |
| Individual row | Click | Open employee/contract detail |
| Status dot | Hover | Show tooltip with explanation |

### Dashboard Refresh
| Trigger | Action |
|---------|--------|
| Page load | Fetch all metrics |
| Every 5 minutes | Auto-refresh pending counts |
| Manual refresh button | Full data reload |
| After approval action | Update affected counts |

---

## Data Fields Required

### Contract Expiry Card
| Field | Source | Format |
|-------|--------|--------|
| Employee Name | FR-ER-001 | Full name |
| Contract Number | FR-CM-002 | HD-YYYY-NNN |
| Days Remaining | Calculated | +/-N days |
| Contract Type | FR-CF-012 | Category name |

### Leave Approval Card
| Field | Source | Format |
|-------|--------|--------|
| Employee Name | FR-ER-001 | Full name |
| Leave Type | FR-CF-023 | Category name |
| Duration | FR-TA | N days |
| Pending Time | Calculated | N hours/days |

---

## Alert Severity Matrix

```
+------------------+------------------+------------------+
|      LOW         |     MEDIUM       |      HIGH        |
|    (Green)       |    (Yellow)      |     (Red)        |
+------------------+------------------+------------------+
| Contract expiry  | Contract expiry  | Contract expiry  |
| > 14 days        | 7-14 days        | < 7 days         |
+------------------+------------------+------------------+
| Leave pending    | Leave pending    | Leave start      |
| < 1 day          | 1-2 days         | within 24h       |
+------------------+------------------+------------------+
| Evaluation       | Evaluation       | Evaluation       |
| > 7 days left    | 3-7 days left    | overdue          |
+------------------+------------------+------------------+
```

---

## Responsive Behavior

### Desktop (> 1024px)
- 3 columns for summary cards
- 2x2 grid for action cards
- Side-by-side stats and activity

### Tablet (768px - 1024px)
- 3 columns for summary cards
- 2x2 grid for action cards (smaller)
- Stacked stats and activity

### Mobile (< 768px)
- Horizontal scroll for summary cards
- Stacked action cards (full width)
- Collapsible sections
