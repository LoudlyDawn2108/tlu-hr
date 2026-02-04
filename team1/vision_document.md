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

| ID      | Stakeholder   | Request Description                                                                             | Priority |
| ------- | ------------- | ----------------------------------------------------------------------------------------------- | -------- |
| STRQ-01 | Ban Giám hiệu | Cần báo cáo thống kê tức thời (Real-time Dashboard) về biến động nhân sự và chất lượng đội ngũ. | High     |
| STRQ-02 | Phòng TCCB    | Phải số hóa toàn bộ hồ sơ nhân sự, thay thế lưu trữ giấy tờ và Excel rời rạc.                   | High     |
| STRQ-03 | Phòng TCCB    | Tự động cảnh báo các mốc thời gian: Hết hạn hợp đồng, đến hạn nâng lương.                       | High     |
| STRQ-04 | Phòng TCCB    | Quản lý được cấu trúc tổ chức phức tạp (Trường/Khoa/Bộ môn) và kiêm nhiệm chức vụ.              | Medium   |
| STRQ-05 | Phòng TCKT    | Cung cấp chính xác dữ liệu ngạch, bậc, hệ số và phụ cấp để tính lương trên phần mềm kế toán.    | High     |
| STRQ-06 | Giảng viên    | Cần cổng thông tin (Portal) để tự tra cứu hồ sơ, lịch sử hợp đồng và gửi yêu cầu cập nhật.      | Medium   |
| STRQ-07 | Admin         | Cho phép cấu hình động các tham số (lương cơ sở, định mức) khi luật thay đổi mà không sửa code. | High     |
| STRQ-08 | Bộ Chủ quản   | Xuất được các biểu mẫu báo cáo thống kê theo quy định Nhà nước.                                 | High     |

### 4. Product Overview (Features)

Các đặc trưng (Features) của hệ thống, được ánh xạ từ STRQ.

- FEAT-001: Quản lý Hồ sơ Nhân sự Tập trung
    - Trace to: STRQ-02, STRQ-04
    - 001.1 Lưu trữ toàn diện hồ sơ nhân sự (Sơ yếu lý lịch, Quá trình công tác, Bằng cấp, Chứng chỉ, Gia đình, Thông tin ngân hàng).
    - 001.2 Hỗ trợ audit trail cơ bản (UC-HRM-008), tìm kiếm nâng cao, xuất trích ngang hồ sơ, in hồ sơ nhân sự, và phê duyệt cập nhật thông tin từ nhân sự (UC-ADM-001).

- FEAT-002: Quản lý Cơ cấu Tổ chức Phân cấp
    - Trace to: STRQ-04
    - 002.1 Quản lý sơ đồ tổ chức đa cấp (Trường -> Khoa/Viện -> Bộ môn).
    - 002.2 Hỗ trợ quản lý nhân sự kiêm nhiệm nhiều chức vụ, chức vụ bộ môn (Trưởng/Phó BM) (UC-HRM-009), lịch sử thành lập/sáp nhập/giải thể đơn vị cơ bản (UC-HRM-010).

- FEAT-003: Quản lý và Cảnh báo Hợp đồng
    - Trace to: STRQ-03
    - 003.1 Quản lý vòng đời hợp đồng lao động (tạo mới, gia hạn, chấm dứt).
    - 003.2 Tự động cảnh báo trước khi hợp đồng hết hạn, đề xuất loại hợp đồng tiếp theo theo quy tắc cấu hình, validate thời hạn min/max, upload file hợp đồng PDF.

- FEAT-004: Cấu hình Tham số Linh hoạt
    - Trace to: STRQ-07
    - 004.1 Cho phép Quản trị viên cấu hình động các tham số nghiệp vụ cần thiết:
    - 004.2 Lương: Mức lương cơ sở, Hệ số ngạch/bậc, Danh mục phụ cấp
    - 004.3 Hợp đồng: Loại HĐ, thời hạn min/max, số lần ký tối đa, quy tắc chuyển đổi
    - 004.4 Danh mục dùng chung: Trình độ, chức danh, ngạch viên chức, loại đơn vị
    - 004.5 Khen thưởng/Kỷ luật: Danh mục hình thức, cấp quyết định
    - 004.6 Loại đào tạo: Trong nước, ngoài nước, ngắn hạn, dài hạn
    - 004.7 Lưu lịch sử thay đổi cấu hình với lý do sửa theo quy định.

- FEAT-005: Báo cáo & Thống kê Nhân sự
    - Trace to: STRQ-01, STRQ-08
    - 005.1 Cung cấp Dashboard tổng quan (tổng nhân sự, biến động, cơ cấu trình độ) và các báo cáo định kỳ: biến động nhân sự, dữ liệu lương/phụ cấp, BHXH, thuế TNCN theo mẫu quy định.
    - 005.2 Hỗ trợ xuất Excel, PDF, Word theo biểu mẫu Nhà nước và Bộ chủ quản.

- FEAT-006: Cổng Tự phục vụ Nhân viên
    - Trace to: STRQ-06
    - 006.1 Related Use Cases: UC-SSP-001 đến UC-SSP-004
    - 006.2 Cho phép Cán bộ/Giảng viên:
    - 006.3 Xem và tra cứu thông tin cá nhân (hồ sơ, hợp đồng, khen thưởng/kỷ luật)
    - 006.4 Gửi yêu cầu cập nhật thông tin (chờ Phòng TCCB phê duyệt - UC-ADM-001)
    - 006.5 Đăng ký tham gia khóa đào tạo (UC-SSP-004)

- FEAT-007: Quản lý Đào tạo và Phát triển
    - Trace to: STRQ-02 (extended)
    - 007.1 Quản lý hoạt động đào tạo và phát triển nhân sự:
    - 007.2 Lập kế hoạch và tổ chức khóa đào tạo (trong/ngoài nước, ngắn hạn, dài hạn)
    - 007.3 Theo dõi tiến trình và kết quả đào tạo của nhân sự
    - 007.4 Cấu hình loại đào tạo
    - 007.5 Cập nhật chứng chỉ tự động sau khi hoàn thành đào tạo

---

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
