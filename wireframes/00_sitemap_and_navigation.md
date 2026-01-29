# Sitemap and Navigation Architecture

## Document Info
| Item | Detail |
|------|--------|
| Version | 1.0 |
| Last Updated | 2026-01-27 |
| Target System | TLU HRMS |

---

## 1. Global Navigation Philosophy

### Design Principles
- **Role-Based Visibility**: Menu items are shown/hidden based on user role permissions
- **Task-Oriented Grouping**: Features grouped by workflow, not just modules
- **Progressive Disclosure**: Complex functions nested under logical parent items
- **Consistent Shell**: Same layout shell across all roles (but different content)

### Layout Shell Pattern

```
+------------------------------------------------------------------+
|  [TLU Logo]   HRMS - Hệ thống Quản lý Nhân sự    [User] [Đăng xuất] |
+------------------------------------------------------------------+
|                |                                                  |
|   SIDEBAR      |   MAIN CONTENT AREA                              |
|   NAVIGATION   |                                                  |
|                |   +--------------------------------------------+ |
|   - Primary    |   | Breadcrumbs: Dashboard > Personnel > ...  | |
|     Menu       |   +--------------------------------------------+ |
|                |   |                                            | |
|   - Quick      |   |   Page Content                             | |
|     Actions    |   |                                            | |
|                |   |                                            | |
|   - Favorites  |   |                                            | |
|                |   +--------------------------------------------+ |
|                |   | Status Bar / Notifications                 | |
+------------------------------------------------------------------+
```

---

## 2. Role-Based Menu Structures

### 2.1 Admin/HR Specialist (Phong TCCB) - Complex Desktop View

**User Goal:** Manage all personnel operations, contracts, reports with full access

```
+---------------------------+
|  SIDEBAR NAVIGATION       |
+---------------------------+
|                           |
|  [Dashboard Icon]         |
|  Dashboard                |
|    - Trung tâm Điều hành Nhân sự|
|    - Công việc của tôi    |
|    - Thông báo (12)       |
|                           |
|  [People Icon]            |
|  Quản lý Nhân sự          |
|    - Tìm kiếm Hồ sơ       |
|    - Thêm mới Nhân sự     |
|    - Hồ sơ 360            |
|    - Giảng viên Thỉnh giảng|
|                           |
|  [Building Icon]          |
|  Cơ cấu Tổ chức           |
|    - Sơ đồ Tổ chức        |
|    - Quản lý Đơn vị       |
|    - Quản lý Bộ môn       |
|                           |
|  [Document Icon]          |
|  Hợp đồng & Tuyển dụng    |
|    - Danh sách Hợp đồng   |
|    - HĐ sắp hết hạn [!5]  |
|    - Tuyển dụng           |
|                           |
|  [Clock Icon]             |
|  Chấm công & Nghỉ phép    |
|    - Bảng chấm công       |
|    - Duyệt nghỉ phép [!8] |
|    - Công tác             |
|                           |
|  [Dollar Icon]            |
|  Tiền lương               |
|    - Tính lương tháng     |
|    - Lịch sử lương        |
|    - Thống kê lương       |
|                           |
|  [Book Icon]              |
|  Giờ giảng & NCKH         |
|    - Quản lý Giờ giảng    |
|    - Đề tài NCKH          |
|    - Công bố Khoa học     |
|                           |
|  [Award Icon]             |
|  Đánh giá & Thi đua       |
|    - Đánh giá Viên chức   |
|    - Khen thưởng          |
|    - Kỷ luật              |
|                           |
|  [Chart Icon]             |
|  Báo cáo                  |
|    - Báo cáo Nhân sự      |
|    - Báo cáo Lương        |
|    - Báo cáo Bộ GD&ĐT     |
|    - Tạo báo cáo          |
|                           |
|  [Gear Icon]              |
|  Cấu hình Hệ thống        |
|    - Tham số Lương        |
|    - Danh mục             |
|    - Quy trình Phê duyệt  |
|                           |
+---------------------------+
|  [?] Huong dan su dung    |
+---------------------------+
```

#### Badge Indicators
- `[!N]` = Action required (red badge with count)
- `(N)` = Notifications (blue badge)

---

### 2.2 Department Head (Truong Khoa/Phong) - Management View

**User Goal:** Manage unit personnel, approve requests, view unit reports

```
+---------------------------+
|  SIDEBAR NAVIGATION       |
+---------------------------+
|                           |
|  [Dashboard Icon]         |
|  Dashboard                |
|    - Tổng quan Đơn vị     |
|    - Cần phê duyệt [!3]   |
|                           |
|  [People Icon]            |
|  Nhân sự Đơn vị           |
|    - Danh sách CBGV       |
|    - Thống kê trình độ    |
|                           |
|  [Check Icon]             |
|  Phê duyệt                |
|    - Nghỉ phép [!2]       |
|    - Giờ giảng [!1]       |
|    - Đánh giá             |
|                           |
|  [Clock Icon]             |
|  Chấm công                |
|    - Bảng chấm công       |
|    - Tổng hợp tháng       |
|                           |
|  [Book Icon]              |
|  Giờ giảng                |
|    - Nhập Giờ giảng       |
|    - Tổng hợp Định mức    |
|                           |
|  [Chart Icon]             |
|  Báo cáo Đơn vị           |
|    - Báo cáo Nhân sự      |
|    - Báo cáo Giờ giảng    |
|                           |
|  [User Icon]              |
|  Thông tin Cá nhân        |
|                           |
+---------------------------+
```

---

### 2.3 Lecturer (Giang vien) - Simplified Mobile/Desktop View

**User Goal:** Self-service for personal info, leave requests, payslip viewing

```
+---------------------------+
|  BOTTOM TAB NAVIGATION    |
|  (Mobile-First)           |
+---------------------------+

+-------+-------+-------+-------+-------+
| Home  | Lịch  |   +   | Lương | Tôi   |
| [O]   | [Cal] | [FAB] | [$]   | [User]|
+-------+-------+-------+-------+-------+

EXPANDED MENU STRUCTURE:

[Home] Trang chủ
  - Thông báo mới
  - Nhắc nhở
  - Trạng thái nghỉ phép

[Lich] Lịch làm việc
  - Lịch giảng dạy
  - Lịch họp
  - Công tác

[+] FAB Quick Actions
  - Đăng ký Nghỉ phép
  - Cập nhật Thông tin
  - Báo cáo Vấn đề

[Luong] Thu nhập
  - Phiếu lương tháng
  - Lịch sử lương
  - Thuế TNCN

[Toi] Cá nhân
  - Hồ sơ Cá nhân
  - Trình độ & Chứng chỉ
  - Hợp đồng
  - Giờ giảng của tôi
  - NCKH của tôi
  - Kết quả Đánh giá
  - Cài đặt

+---------------------------+
```

---

### 2.4 Finance Staff (Phong TCKT) - Payroll Focus View

**User Goal:** Process payroll, manage financial reports, bank exports

```
+---------------------------+
|  SIDEBAR NAVIGATION       |
+---------------------------+
|                           |
|  [Dashboard Icon]         |
|  Dashboard                |
|    - Tổng quan TCKT       |
|    - Việc cần làm [!2]    |
|                           |
|  [Dollar Icon]            |
|  Tính lương               |
|    - Wizard Tính lương    |
|    - Bảng lương tháng     |
|    - Điều chỉnh           |
|                           |
|  [Bank Icon]              |
|  Chi trả                  |
|    - Xuất file Ngân hàng  |
|    - Lịch sử Chi trả      |
|                           |
|  [Shield Icon]            |
|  Bảo hiểm                 |
|    - BHXH hàng tháng      |
|    - Báo cáo BHXH         |
|                           |
|  [File Icon]              |
|  Thuế TNCN                |
|    - Tính thuế tháng      |
|    - Quyết toán năm       |
|    - Báo cáo Thuế         |
|                           |
|  [Chart Icon]             |
|  Báo cáo                  |
|    - Báo cáo Lương        |
|    - Báo cáo BHXH         |
|    - Báo cáo Thuế         |
|                           |
|  [Gear Icon]              |
|  Cấu hình                 |
|    - Tham số Lương        |
|    - Tỷ lệ Bảo hiểm       |
|    - Biểu Thuế            |
|                           |
+---------------------------+
```

---

## 3. Complete Sitemap Hierarchy

```
TLU HRMS
│
├── Dashboard
│   ├── Trung tâm Điều hành Nhân sự (TCCB)
│   ├── Tổng quan Tài chính (TCKT)
│   ├── Tổng quan Đơn vị (Trưởng đơn vị)
│   └── Dashboard Cá nhân (All users)
│
├── Quản lý Nhân sự (FR-ER)
│   ├── Tìm kiếm Hồ sơ
│   ├── Thêm mới Nhân sự
│   ├── Hồ sơ 360 (Master Detail)
│   │   ├── Tab: Tổng quan
│   │   ├── Tab: Trình độ Chuyên môn
│   │   ├── Tab: Hợp đồng & Vị trí
│   │   ├── Tab: Giờ giảng & NCKH
│   │   └── Tab: Thu nhập
│   └── Giảng viên Thỉnh giảng
│
├── Cơ cấu Tổ chức (FR-OS)
│   ├── Sơ đồ Tổ chức (Org Chart)
│   ├── Quản lý Đơn vị
│   ├── Quản lý Bộ môn
│   ├── Phòng Thí nghiệm
│   └── Lịch sử Lãnh đạo
│
├── Hợp đồng (FR-CM)
│   ├── Danh sách Hợp đồng
│   ├── Hợp đồng sắp hết hạn
│   ├── Tạo Hợp đồng mới
│   ├── Phụ lục Hợp đồng
│   └── In Hợp đồng
│
├── Tuyển dụng (FR-RC)
│   ├── Kế hoạch Tuyển dụng
│   ├── Vị trí Tuyển dụng
│   ├── Quản lý Ứng viên
│   ├── Lịch Phỏng vấn
│   └── Kết quả Tuyển dụng
│
├── Chấm công & Nghỉ phép (FR-TA)
│   ├── Bảng Chấm công
│   ├── Đăng ký Nghỉ phép
│   ├── Duyệt Nghỉ phép
│   ├── Làm thêm giờ
│   ├── Công tác
│   └── Báo cáo Chấm công
│
├── Tiền lương (FR-PB)
│   ├── Wizard Tính lương (4 bước)
│   ├── Bảng lương Tháng
│   ├── Phiếu lương
│   ├── Xuất file Ngân hàng
│   ├── BHXH / BHYT / BHTN
│   ├── Thuế TNCN
│   └── Thưởng / Phụ cấp
│
├── Giờ giảng (FR-TL)
│   ├── Định mức Giờ giảng
│   ├── Nhập Giờ giảng (Grid)
│   ├── Xác nhận Khối lượng
│   ├── Giờ vượt Định mức
│   └── Báo cáo Giờ giảng
│
├── Nghiên cứu Khoa học (FR-RM)
│   ├── Đề tài NCKH
│   ├── Công bố Khoa học
│   ├── Hướng dẫn NCS/Cao học
│   ├── Quy đổi Giờ chuẩn
│   └── Lý lịch Khoa học
│
├── Đánh giá (FR-PR)
│   ├── Đánh giá Viên chức
│   ├── Danh hiệu Thi đua
│   ├── Khen thưởng
│   └── Kỷ luật
│
├── Đào tạo (FR-TD)
│   ├── Kế hoạch Đào tạo
│   ├── Cử đi học
│   ├── Cam kết Đào tạo
│   └── Chứng chỉ Đạt được
│
├── Báo cáo (FR-RP)
│   ├── Báo cáo Nhân sự
│   ├── Báo cáo Lương
│   ├── Báo cáo Bộ GD&ĐT
│   ├── Báo cáo Bộ NN&MT
│   └── Tạo Báo cáo Tùy chỉnh
│
├── Self-Service Portal (FR-SS)
│   ├── Thông tin Cá nhân
│   ├── Phiếu lương
│   ├── Đăng ký Nghỉ phép
│   ├── Lịch làm việc
│   └── Thông báo
│
└── Cấu hình Hệ thống (FR-CF)
    ├── Tham số Lương
    ├── Tham số Bảo hiếm & Thuế
    ├── Danh mục Dùng chung
    ├── Công thức Tính toán
    ├── Quy trình Phê duyệt
    └── Phân quyền Người dùng
```

---

## 4. Navigation Interaction Rules

### 4.1 Sidebar Behavior
| Action | Result |
|--------|--------|
| Click menu item | Expand submenu (if has children) or navigate |
| Hover menu item | Show tooltip with full name |
| Click active item | Collapse submenu |
| Sidebar toggle button | Collapse to icon-only mode |

### 4.2 Breadcrumb Pattern
```
Dashboard > Quan ly Nhan su > Ho so 360 > Nguyen Van A
    [Home]      [Parent]        [Page]      [Entity]
```
- Each segment is clickable
- Maximum 4 levels displayed
- Ellipsis (...) for deep nesting

### 4.3 Mobile Navigation
| Pattern | Usage |
|---------|-------|
| Bottom Tab Bar | Primary navigation (5 items max) |
| Hamburger Menu | Secondary/settings access |
| FAB (Floating Action Button) | Quick action (Leave Request) |
| Pull-down | Refresh data |
| Swipe left/right | Navigate between tabs |

---

## 5. Responsive Breakpoints

| Breakpoint | Screen Width | Layout |
|------------|--------------|--------|
| Mobile | < 768px | Bottom tab + Hamburger |
| Tablet | 768px - 1024px | Collapsible sidebar |
| Desktop | > 1024px | Full sidebar |
| Large Desktop | > 1440px | Sidebar + Secondary panel |

---

## 6. Quick Access Features

### 6.1 Global Search (Ctrl+K)
```
+--------------------------------------------------+
|  [Search Icon]  Tìm kiếm nhanh...      [Ctrl+K]  |
+--------------------------------------------------+
|  Kết quả Gần đây:                                |
|    [User] Nguyen Van A - GV Khoa CNTT            |
|    [Doc] Hợp đồng #HD2024-001                    |
|                                                  |
|  Hành động:                                      |
|    [+] Thêm Nhân sự mới                          |
|    [Calendar] Đăng ký Nghỉ phép                  |
+--------------------------------------------------+
```

### 6.2 Notification Center
```
+--------------------------------------------------+
|  [Bell Icon] Thông báo                    Tất cả |
+--------------------------------------------------+
|  [!] Hợp đồng HD-2024-089 sắp hết hạn (3 ngày)   |
|      2 phút trước                                |
|  -------------------------------------------------
|  [Clock] Đơn nghỉ phép chờ duyệt: Tran Van B     |
|      1 giờ trước                                 |
|  -------------------------------------------------
|  [Check] Bảng lương T12/2025 đã được duyệt       |
|      Hôm qua                                     |
+--------------------------------------------------+
```

---

## 7. Accessibility Considerations

| Feature | Implementation |
|---------|---------------|
| Keyboard Navigation | Full tab support, arrow keys for menus |
| Screen Reader | ARIA labels on all interactive elements |
| Color Contrast | WCAG 2.1 AA compliant |
| Focus Indicators | Visible focus rings |
| Skip Links | "Skip to main content" link |
