# Vision Document - Hệ thống Quản lý Nhân sự (HRMS) Đại học Thủy lợi

**Phiên bản:** 1.0  
**Ngày:** 30/01/2026

---

## Section 1: Introduction

### Purpose

Tài liệu này định nghĩa tầm nhìn và phạm vi cho dự án Hệ thống Quản lý Nhân sự (HRMS) của Trường Đại học Thủy lợi. Nó cung cấp một cái nhìn tổng quan về nhu cầu kinh doanh, các bên liên quan, và các tính năng cốt lõi của giải pháp, làm cơ sở chung cho đội ngũ phát triển và các bên liên quan.

### Scope

Hệ thống tập trung vào việc quản lý toàn diện vòng đời nhân sự của trường.

- **IN SCOPE (Trong phạm vi):**
    - Quản lý hồ sơ nhân sự toàn diện (cán bộ, giảng viên, nhân viên)
    - Quản lý hợp đồng lao động và cảnh báo hết hạn
    - Quản lý cơ cấu tổ chức (Khoa/Viện/Bộ môn) và lịch sử biến động cơ bản
    - Quản lý đào tạo và phát triển
    - Cấu hình tham số nghiệp vụ (lương, phụ cấp, danh mục)
    - Quản lý chức vụ (bổ nhiệm, miễn nhiệm) và chức vụ bộ môn
    - Cổng thông tin tự phục vụ (Self-Service) cho nhân viên
    - Báo cáo và thống kê nhân sự
- **OUT OF SCOPE (Ngoài phạm vi):**
    - Quản lý sinh viên (Student Management)
    - Tính toán và chi trả bảng lương chi tiết (Payroll Processing - hệ thống chỉ cung cấp dữ liệu đầu vào)
    - Quản lý đào tạo sinh viên
    - Quản lý đánh giá viên chức hàng năm (Performance Evaluation)
    - Quản lý Nghiên cứu sinh (NCS)
    - Quản lý Phòng thí nghiệm (Laboratory)
    - Cấu hình tham số Bảo hiểm và Thuế (BHXH/BHYT/BHTN, thuế TNCN)
    - Cấu hình phiên bản hóa (Configuration Versioning)
    - Quản lý thông tin chuyên môn sâu của giảng viên (lĩnh vực nghiên cứu, từ khóa)

### Definitions

- **TLU:** Thuyloi University (Trường Đại học Thủy lợi).
- **TCCB:** Phòng Tổ chức Cán bộ.
- **TCKT:** Phòng Tài chính - Kế toán.
- **GV:** Giảng viên.
- **NCS:** Nghiên cứu sinh.
- **Giờ chuẩn:** Đơn vị quy đổi khối lượng giảng dạy và nghiên cứu khoa học.

---

## Section 2: Positioning

### Problem Statement

Đây là phần quan trọng nhất xác định "Tại sao" chúng ta cần xây dựng hệ thống này.

| Element                         | Description                                                                                                                                                                                                                                                                              |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The Problem of**              | Việc quản lý hồ sơ nhân sự phân tán, thủ công và khó khăn trong việc theo dõi lịch sử biến động nhân sự, hợp đồng và các quy định lương thưởng phức tạp thay đổi thường xuyên.                                                                                                           |
| **Affects**                     | Phòng Tổ chức Cán bộ (TCCB), Phòng Tài chính - Kế toán (TCKT), Ban Giám hiệu và hơn 1,200 Cán bộ Giảng viên toàn trường.                                                                                                                                                                 |
| **The Impact is**               | Tốn nhiều thời gian cho các thủ tục hành chính; sai sót hoặc không đồng bộ dữ liệu giữa các phòng ban; khó khăn trong việc báo cáo thống kê tức thời cho Bộ chủ quản; thiếu minh bạch thông tin cho giảng viên.                                                                          |
| **A Successful Solution would** | Xây dựng một **Single Source of Truth** (Nguồn dữ liệu duy nhất) cho toàn bộ thông tin nhân sự; Tự động hóa quy trình quản lý hợp đồng và quyết định nhân sự; Cung cấp khả năng cấu hình linh hoạt cho các quy định nhà nước; và Trao quyền tự phục vụ cho nhân viên qua cổng thông tin. |

---

## 3. Stakeholder and User Descriptions

### 3.1 Stakeholder Requests (STRQ)

Phần này liệt kê các yêu cầu cấp cao (High-level Needs) được thu thập từ các bên liên quan. Đây là đáy của "Kim tự tháp yêu cầu" (Requirements Pyramid).

| ID      | Stakeholder   | Request Description                                                                             | Priority | Use Cases                             |
| ------- | ------------- | ----------------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| STRQ-01 | Ban Giám hiệu | Cần báo cáo thống kê tức thời (Real-time Dashboard) về biến động nhân sự và chất lượng đội ngũ. | High     | UC-RPT-001                            |
| STRQ-02 | Phòng TCCB    | Phải số hóa toàn bộ hồ sơ nhân sự, thay thế lưu trữ giấy tờ và Excel rời rạc.                   | High     | UC-HRM-001, UC-HRM-008, UC-ADM-001    |
| STRQ-03 | Phòng TCCB    | Tự động cảnh báo các mốc thời gian: Hết hạn hợp đồng, đến hạn nâng lương.                       | High     | UC-HRM-003                            |
| STRQ-04 | Phòng TCCB    | Quản lý được cấu trúc tổ chức phức tạp (Trường/Khoa/Bộ môn) và kiêm nhiệm chức vụ.              | Medium   | UC-HRM-006, UC-HRM-009, UC-HRM-010    |
| STRQ-05 | Phòng TCKT    | Cung cấp chính xác dữ liệu ngạch, bậc, hệ số và phụ cấp để tính lương trên phần mềm kế toán.    | High     | UC-FIN-001, UC-FIN-002, UC-CFG-001    |
| STRQ-06 | Giảng viên    | Cần cổng thông tin (Portal) để tự tra cứu hồ sơ, lịch sử hợp đồng và gửi yêu cầu cập nhật.      | Medium   | UC-SSP-001 đến UC-SSP-005             |
| STRQ-07 | Admin         | Cho phép cấu hình động các tham số (lương cơ sở, định mức) khi luật thay đổi mà không sửa code. | High     | UC-CFG-001 đến UC-CFG-003, UC-CFG-007 |
| STRQ-08 | Bộ Chủ quản   | Xuất được các biểu mẫu báo cáo thống kê theo quy định Nhà nước.                                 | High     | UC-RPT-001                            |

### 4. Product Overview (Features)

Các đặc trưng (Features) của hệ thống, được ánh xạ từ STRQ.

- FEAT-001: Quản lý Hồ sơ Nhân sự Tập trung
    - Trace to: STRQ-02, STRQ-04
    - Related Use Cases: UC-HRM-001, UC-HRM-002, UC-HRM-008, UC-HRM-011, UC-HRM-012, UC-HRM-013, UC-HRM-014, UC-ADM-001
    - Lưu trữ toàn diện hồ sơ nhân sự (Sơ yếu lý lịch, Quá trình công tác, Bằng cấp, Chứng chỉ, Gia đình, Thông tin ngân hàng).
    - Hỗ trợ audit trail cơ bản (UC-HRM-008), tìm kiếm nâng cao, xuất trích ngang hồ sơ, thống kê trình độ (UC-HRM-012),
    - quản lý yêu cầu chỉnh sửa (UC-HRM-014), và phê duyệt cập nhật thông tin từ nhân sự (UC-ADM-001).

- FEAT-002: Quản lý Cơ cấu Tổ chức Phân cấp
    - Trace to: STRQ-04
    - Related Use Cases: UC-HRM-006, UC-HRM-009, UC-HRM-010
    - Quản lý sơ đồ tổ chức đa cấp (Trường -> Khoa/Viện -> Bộ môn).
    - Hỗ trợ quản lý nhân sự kiêm nhiệm nhiều chức vụ, chức vụ bộ môn (Trưởng/Phó BM) (UC-HRM-009),
    - lịch sử thành lập/sáp nhập/giải thể đơn vị cơ bản (UC-HRM-010).

- FEAT-003: Quản lý và Cảnh báo Hợp đồng
    - Trace to: STRQ-03
    - Related Use Cases: UC-HRM-003, UC-CFG-002
    - Quản lý vòng đời hợp đồng lao động (tạo mới, gia hạn, chấm dứt).
    - Tự động cảnh báo trước khi hợp đồng hết hạn, đề xuất loại hợp đồng tiếp theo theo quy tắc cấu hình,
    - validate thời hạn min/max, và in hợp đồng theo mẫu chuẩn.

- FEAT-004: Engine Cấu hình Tham số Linh hoạt
    - Trace to: STRQ-07
    - Related Use Cases: UC-CFG-001, UC-CFG-002, UC-CFG-003, UC-CFG-007
    - Cho phép Quản trị viên cấu hình động các tham số nghiệp vụ cần thiết:

    - Lương: Mức lương cơ sở, Hệ số ngạch/bậc, Danh mục phụ cấp (UC-CFG-001)
    - Hợp đồng: Loại HĐ, thời hạn min/max, số lần ký tối đa, quy tắc chuyển đổi (UC-CFG-002)
    - Danh mục dùng chung: Trình độ, chức danh, ngạch viên chức, loại đơn vị (UC-CFG-003)
    - Loại đào tạo: Trong nước, ngoài nước, ngắn hạn, dài hạn (UC-CFG-007)
    - Lưu lịch sử thay đổi cấu hình với lý do sửa theo quy định.

- FEAT-005: Báo cáo & Thống kê Nhân sự
    - Trace to: STRQ-01, STRQ-08
    - Related Use Cases: UC-RPT-001
    - Cung cấp Dashboard tổng quan (tổng nhân sự, biến động, cơ cấu trình độ) và
    - các báo cáo định kỳ: biến động nhân sự, dữ liệu lương/phụ cấp, BHXH, thuế TNCN theo mẫu quy định.
    - Hỗ trợ xuất Excel, PDF, Word theo biểu mẫu Nhà nước và Bộ chủ quản.

- FEAT-006: Cổng Tự phục vụ Nhân viên (Self-Service)
    - Trace to: STRQ-06
    - Related Use Cases: UC-SSP-001 đến UC-SSP-005
    - Cho phép Cán bộ/Giảng viên:

    - Xem và tra cứu thông tin cá nhân (hồ sơ, hợp đồng, khen thưởng/kỷ luật)
    - Gửi yêu cầu cập nhật thông tin (chờ Phòng TCCB phê duyệt - UC-ADM-001)
    - Đăng ký tham gia khóa đào tạo (UC-SSP-004)
    - Xem kết quả đánh giá viên chức (nếu có tích hợp - UC-SSP-005)

- FEAT-007: Quản lý Đào tạo và Phát triển
    - Trace to: STRQ-02 (extended)
    - Related Use Cases: UC-HRM-007, UC-CFG-007
    - Quản lý hoạt động đào tạo và phát triển nhân sự:
    - Lập kế hoạch và tổ chức khóa đào tạo (trong/ngoài nước, ngắn hạn, dài hạn) (UC-HRM-007)
    - Theo dõi tiến trình và kết quả đào tạo của nhân sự
    - Cấu hình loại đào tạo (UC-CFG-007)
    - Cập nhật chứng chỉ tự động sau khi hoàn thành đào tạo

---

### 4.1 Feature-to-Use Case Mapping Summary

| Feature   | Use Cases                                                                                      | Module               |
| --------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| FEAT-001  | UC-HRM-001, UC-HRM-002, UC-HRM-008, UC-HRM-011, UC-HRM-012, UC-HRM-013, UC-HRM-014, UC-ADM-001 | Hồ sơ nhân sự        |
| FEAT-002  | UC-HRM-006, UC-HRM-009, UC-HRM-010                                                             | Cơ cấu tổ chức       |
| FEAT-003  | UC-HRM-003, UC-CFG-002, UC-HRM-013                                                             | Hợp đồng             |
| FEAT-004  | UC-CFG-001, UC-CFG-002, UC-CFG-003, UC-CFG-007                                                 | Cấu hình hệ thống    |
| FEAT-005  | UC-RPT-001, UC-HRM-012                                                                         | Báo cáo & Thống kê   |
| FEAT-006  | UC-SSP-001 đến UC-SSP-005                                                                      | Self-Service         |
| FEAT-007  | UC-HRM-007, UC-CFG-007                                                                         | Đào tạo & Phát triển |
| _Admin_   | UC-ADM-001                                                                                     | Phê duyệt & Quản lý  |
| _System_  | UC-SYS-001, UC-SYS-002, UC-SYS-003, UC-SYS-004                                                 | Quản trị hệ thống    |
| _Finance_ | UC-FIN-001, UC-FIN-002                                                                         | Tài chính - Kế toán  |

**Tổng số Use Cases:** 30 use cases đã được định nghĩa chi tiết trong tài liệu Use Case Specifications.

## Section 5: Constraints & Quality Ranges

### Constraints

- **Hạ tầng:** Phải vận hành trên hạ tầng máy chủ nội bộ hiện có của Trường Đại học Thủy lợi.
- **Pháp lý:** Tuân thủ tuyệt đối Bộ Luật Lao động 2019, Luật Viên chức và các quy định về bảo mật dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP).
- **Tích hợp:** Phải có khả năng kết nối (API/Excel) với phần mềm Kế toán hiện tại và Hệ thống Quản lý Đào tạo.
- **Ngôn ngữ:** Giao diện và tài liệu 100% Tiếng Việt.

### Quality Ranges

- **Hiệu năng (Performance):** Hệ thống phải hỗ trợ tối thiểu 500 người dùng đồng thời (đặc biệt vào kỳ đánh giá hoặc xem lương); Thời gian phản hồi trang dưới 2 giây.
- **Bảo mật (Security):** Phân quyền chi tiết đến mức trường dữ liệu (Field-level security) để bảo vệ thông tin nhạy cảm (VD: lương, địa chỉ nhà riêng).
- **Khả dụng (Availability):** Đảm bảo hoạt động 99.5% trong giờ hành chính. Cơ chế sao lưu dữ liệu tự động hàng ngày (RPO < 24h).
