# CHƯƠNG 1: PHÂN TÍCH YÊU CẦU VÀ QUẢN LÝ DỰ ÁN PHẦN MỀM

## 1.1. Tài liệu Tầm nhìn Dự án

**Hệ thống Quản lý Nhân sự (HRMS) - Đại học Thủy lợi**

**Phiên bản:** 1.0  
**Ngày:** 30/01/2026

---

### 1.1.1. Giới thiệu

#### a) Mục đích

Tài liệu này định nghĩa tầm nhìn và phạm vi cho dự án Hệ thống Quản lý Nhân sự (HRMS) của Trường Đại học Thủy lợi. Nó cung cấp một cái nhìn tổng quan về nhu cầu kinh doanh, các bên liên quan, và các tính năng cốt lõi của giải pháp, làm cơ sở chung cho đội ngũ phát triển và các bên liên quan.

#### b) Phạm vi dự án

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

#### c) Thuật ngữ và định nghĩa

- **TLU:** Thuyloi University (Trường Đại học Thủy lợi).
- **TCCB:** Phòng Tổ chức Cán bộ.
- **TCKT:** Phòng Tài chính - Kế toán.
- **GV:** Giảng viên.
- **NCS:** Nghiên cứu sinh.
- **Giờ chuẩn:** Đơn vị quy đổi khối lượng giảng dạy và nghiên cứu khoa học.

---

### 1.1.2. Xác định vấn đề

#### a) Mô tả vấn đề cần giải quyết

Đây là phần quan trọng nhất xác định "Tại sao" chúng ta cần xây dựng hệ thống này.

| Element                         | Description                                                                                                                                                                                                                                                                              |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **The Problem of**              | Việc quản lý hồ sơ nhân sự phân tán, thủ công và khó khăn trong việc theo dõi lịch sử biến động nhân sự, hợp đồng và các quy định lương thưởng phức tạp thay đổi thường xuyên.                                                                                                           |
| **Affects**                     | Phòng Tổ chức Cán bộ (TCCB), Phòng Tài chính - Kế toán (TCKT), Ban Giám hiệu và hơn 1,200 Cán bộ Giảng viên toàn trường.                                                                                                                                                                 |
| **The Impact is**               | Tốn nhiều thời gian cho các thủ tục hành chính; sai sót hoặc không đồng bộ dữ liệu giữa các phòng ban; khó khăn trong việc báo cáo thống kê tức thời cho Bộ chủ quản; thiếu minh bạch thông tin cho giảng viên.                                                                          |
| **A Successful Solution would** | Xây dựng một **Single Source of Truth** (Nguồn dữ liệu duy nhất) cho toàn bộ thông tin nhân sự; Tự động hóa quy trình quản lý hợp đồng và quyết định nhân sự; Cung cấp khả năng cấu hình linh hoạt cho các quy định nhà nước; và Trao quyền tự phục vụ cho nhân viên qua cổng thông tin. |

---

### 1.1.3. Các bên liên quan và người dùng

#### a) Yêu cầu từ các bên liên quan (STRQ)

Phần này liệt kê các yêu cầu cấp cao (High-level Needs) được thu thập từ các bên liên quan. Đây là đáy của "Kim tự tháp yêu cầu" (Requirements Pyramid).

| ID      | Stakeholder   | Request Description                                                                             | Priority | Use Cases                             |
| ------- | ------------- | ----------------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| STRQ-01 | Ban Giám hiệu | Cần báo cáo thống kê tức thời (Real-time Dashboard) về biến động nhân sự và chất lượng đội ngũ. | High     | UC-RPT-001                            |
| STRQ-02 | Phòng TCCB    | Phải số hóa toàn bộ hồ sơ nhân sự, thay thế lưu trữ giấy tờ và Excel rời rạc.                   | High     | UC-HRM-001, UC-HRM-008, UC-ADM-001    |
| STRQ-03 | Phòng TCCB    | Tự động cảnh báo các mốc thời gian: Hết hạn hợp đồng, đến hạn nâng lương.                       | High     | UC-HRM-003                            |
| STRQ-04 | Phòng TCCB    | Quản lý được cấu trúc tổ chức phức tạp (Trường/Khoa/Bộ môn) và kiêm nhiệm chức vụ.              | Medium   | UC-HRM-006, UC-HRM-009, UC-HRM-010    |
| STRQ-05 | Phòng TCKT    | Cung cấp chính xác dữ liệu ngạch, bậc, hệ số và phụ cấp để tính lương trên phần mềm kế toán.    | High     | UC-FIN-001, UC-FIN-002, UC-CFG-001    |
| STRQ-06 | Giảng viên    | Cần cổng thông tin (Portal) để tự tra cứu hồ sơ, lịch sử hợp đồng và gửi yêu cầu cập nhật.      | Medium   | UC-SSP-001 đến UC-SSP-004             |
| STRQ-07 | Admin         | Cho phép cấu hình động các tham số (lương cơ sở, định mức) khi luật thay đổi mà không sửa code. | High     | UC-CFG-001 đến UC-CFG-003, UC-CFG-007 |
| STRQ-08 | Bộ Chủ quản   | Xuất được các biểu mẫu báo cáo thống kê theo quy định Nhà nước.                                 | High     | UC-RPT-001                            |

### 1.1.4. Tổng quan sản phẩm

Các đặc trưng (Features) của hệ thống, được ánh xạ từ STRQ.

- FEAT-001: Quản lý Hồ sơ Nhân sự Tập trung
    - Trace to: STRQ-02, STRQ-04
    - Related Use Cases: UC-HRM-001, UC-HRM-002, UC-HRM-008, UC-ADM-001
    - Lưu trữ toàn diện hồ sơ nhân sự (Sơ yếu lý lịch, Quá trình công tác, Bằng cấp, Chứng chỉ, Gia đình, Thông tin ngân hàng).
    - Hỗ trợ audit trail cơ bản (UC-HRM-008), tìm kiếm nâng cao, xuất trích ngang hồ sơ, in hồ sơ nhân sự,
    - và phê duyệt cập nhật thông tin từ nhân sự (UC-ADM-001).

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
    - validate thời hạn min/max, upload file hợp đồng PDF.

- FEAT-004: Engine Cấu hình Tham số Linh hoạt
    - Trace to: STRQ-07
    - Related Use Cases: UC-CFG-001, UC-CFG-002, UC-CFG-003, UC-CFG-004, UC-CFG-007
    - Cho phép Quản trị viên cấu hình động các tham số nghiệp vụ cần thiết:

    - Lương: Mức lương cơ sở, Hệ số ngạch/bậc, Danh mục phụ cấp (UC-CFG-001)
    - Hợp đồng: Loại HĐ, thời hạn min/max, số lần ký tối đa, quy tắc chuyển đổi (UC-CFG-002)
    - Danh mục dùng chung: Trình độ, chức danh, ngạch viên chức, loại đơn vị (UC-CFG-003)
    - Khen thưởng/Kỷ luật: Danh mục hình thức, cấp quyết định (UC-CFG-004)
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
    - Related Use Cases: UC-SSP-001 đến UC-SSP-004
    - Cho phép Cán bộ/Giảng viên:

    - Xem và tra cứu thông tin cá nhân (hồ sơ, hợp đồng, khen thưởng/kỷ luật)
    - Gửi yêu cầu cập nhật thông tin (chờ Phòng TCCB phê duyệt - UC-ADM-001)
    - Đăng ký tham gia khóa đào tạo (UC-SSP-004)

- FEAT-007: Quản lý Đào tạo và Phát triển
    - Trace to: STRQ-02 (extended)
    - Related Use Cases: UC-HRM-007, UC-CFG-007
    - Quản lý hoạt động đào tạo và phát triển nhân sự:
    - Lập kế hoạch và tổ chức khóa đào tạo (trong/ngoài nước, ngắn hạn, dài hạn) (UC-HRM-007)
    - Theo dõi tiến trình và kết quả đào tạo của nhân sự
    - Cấu hình loại đào tạo (UC-CFG-007)
    - Cập nhật chứng chỉ tự động sau khi hoàn thành đào tạo

---

#### a) Ánh xạ tính năng và Use Case

| Feature   | Use Cases                                                              | Module               |
| --------- | ---------------------------------------------------------------------- | -------------------- |
| FEAT-001  | UC-HRM-001, UC-HRM-002, UC-HRM-008, UC-ADM-001                         | Hồ sơ nhân sự        |
| FEAT-002  | UC-HRM-006, UC-HRM-009, UC-HRM-010                                     | Cơ cấu tổ chức       |
| FEAT-003  | UC-HRM-003, UC-CFG-002                                                 | Hợp đồng             |
| FEAT-004  | UC-CFG-001, UC-CFG-002, UC-CFG-003, UC-CFG-004, UC-CFG-007             | Cấu hình hệ thống    |
| FEAT-005  | UC-RPT-001                                                             | Báo cáo & Thống kê   |
| FEAT-006  | UC-SSP-001 đến UC-SSP-004                                              | Self-Service         |
| FEAT-007  | UC-HRM-007, UC-CFG-007                                                 | Đào tạo & Phát triển |
| _Admin_   | UC-ADM-001                                                             | Phê duyệt & Quản lý  |
| _System_  | UC-SYS-001, UC-SYS-002, UC-SYS-003, UC-SYS-004                         | Quản trị hệ thống    |
| _Finance_ | UC-FIN-001, UC-FIN-002                                                 | Tài chính - Kế toán  |

**Tổng số Use Cases:** 27 use cases đã được định nghĩa chi tiết trong tài liệu Use Case Specifications.

### 1.1.5. Các ràng buộc và yêu cầu chất lượng

#### a) Ràng buộc hệ thống

- **Hạ tầng:** Phải vận hành trên hạ tầng máy chủ nội bộ hiện có của Trường Đại học Thủy lợi.
- **Pháp lý:** Tuân thủ tuyệt đối Bộ Luật Lao động 2019, Luật Viên chức và các quy định về bảo mật dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP).
- **Tích hợp:** Phải có khả năng kết nối (API/Excel) với phần mềm Kế toán hiện tại và Hệ thống Quản lý Đào tạo.
- **Ngôn ngữ:** Giao diện và tài liệu 100% Tiếng Việt.

#### b) Yêu cầu chất lượng

- **Hiệu năng (Performance):** Hệ thống phải hỗ trợ tối thiểu 500 người dùng đồng thời (đặc biệt vào kỳ đánh giá hoặc xem lương); Thời gian phản hồi trang dưới 2 giây.
- **Bảo mật (Security):** Phân quyền chi tiết đến mức trường dữ liệu (Field-level security) để bảo vệ thông tin nhạy cảm (VD: lương, địa chỉ nhà riêng).
- **Khả dụng (Availability):** Đảm bảo hoạt động 99.5% trong giờ hành chính. Cơ chế sao lưu dữ liệu tự động hàng ngày (RPO < 24h).

---

## 1.2. Kế hoạch Quản lý Yêu cầu

**Dự án:** Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi  
**Phiên bản:** 1.0  
**Ngày tạo:** 30/01/2026  
**Người lập:** Nhóm phát triển phần mềm

---

### 1.2.1. Giới thiệu

#### a) Mục đích
Mục đích của Kế hoạch Quản lý Yêu cầu (RMP) này là xác định các quy trình, kỹ thuật và công cụ sẽ được sử dụng để quản lý các yêu cầu của dự án Hệ thống Quản lý Nhân sự (HRMS) cho Trường Đại học Thủy lợi. Tài liệu này đảm bảo rằng các yêu cầu được thu thập, phân tích, lập văn bản, kiểm soát thay đổi và truy vết một cách nhất quán trong suốt vòng đời dự án.

#### b) Phạm vi áp dụng
Kế hoạch này áp dụng cho toàn bộ các yêu cầu của dự án HRMS, bao gồm:
- Yêu cầu người dùng (User Requirements)
- Yêu cầu chức năng (Functional Requirements)
- Yêu cầu phi chức năng (Non-functional Requirements)

Kế hoạch bao gồm các hoạt động từ giai đoạn khơi gợi yêu cầu ban đầu cho đến khi hệ thống được chuyển giao và nghiệm thu.

#### c) Thuật ngữ viết tắt
- **HRMS:** Human Resource Management System (Hệ thống Quản lý Nhân sự).
- **RMP:** Requirements Management Plan (Kế hoạch Quản lý Yêu cầu).
- **CCB:** Change Control Board (Ban Kiểm soát Thay đổi).
- **URS:** User Requirement Specification (Đặc tả Yêu cầu Người dùng).
- **TCCB:** Phòng Tổ chức Cán bộ.
- **TCKT:** Phòng Tài chính - Kế toán.

#### d) Tài liệu tham chiếu
1. Tài liệu Đặc tả Yêu cầu Người dùng (user_requirements_hrms.md)
2. Danh sách Nhu cầu (needs_list.md)
3. IBM Rational RequisitePro User's Guide (Tham chiếu cấu trúc)

---

### 1.2.2. Quy trình quản lý yêu cầu

#### a) Thu thập yêu cầu
Các yêu cầu được thu thập thông qua các phương pháp sau:
- **Phỏng vấn (Interviews):** Phỏng vấn trực tiếp các bên liên quan chính (stakeholders) như Cán bộ Phòng TCCB, Phòng TCKT, Lãnh đạo nhà trường.
- **Phân tích tài liệu (Document Analysis):** Nghiên cứu các văn bản pháp quy (Luật Viên chức, Luật Lao động), các mẫu biểu báo cáo hiện hành của Trường Đại học Thủy lợi.
- **Hội thảo (Workshops):** Tổ chức các buổi họp với đại diện các phòng ban để thống nhất quy trình nghiệp vụ.

#### b) Phân tích yêu cầu
Sau khi thu thập, các yêu cầu sẽ được phân tích để:
- Phát hiện các xung đột hoặc mâu thuẫn giữa các bên liên quan.
- Xác định độ ưu tiên của yêu cầu.
- Phân rã các yêu cầu cấp cao (Needs) thành các yêu cầu chức năng chi tiết (Features/Functional Requirements).

#### c) Đặc tả yêu cầu
Các yêu cầu được lập văn bản chi tiết trong tài liệu "Đặc tả Yêu cầu Người dùng" (URS) và được quản lý theo các định dạng sau:
- **Use Cases:** Mô tả tương tác giữa người dùng và hệ thống.
- **Danh sách yêu cầu (Requirement List):** Liệt kê chi tiết các yêu cầu với ID duy nhất (ví dụ: FR-ER-001).
- **Mô hình nghiệp vụ:** Sơ đồ quy trình hoạt động.

---

### 1.2.3. Công cụ và môi trường

#### a) Công cụ quản lý
Dự án sử dụng các công cụ sau để hỗ trợ quản lý yêu cầu:
- **Kho lưu trữ tài liệu:** Git/GitHub để quản lý phiên bản các file tài liệu Markdown (`user_requirements_hrms.md`).
- **Công cụ theo dõi (Tracking):** Sử dụng Issues/Project Board hoặc file Excel/Markdown để theo dõi trạng thái yêu cầu.
- **Định dạng tài liệu:** Markdown cho các tài liệu đặc tả kỹ thuật và Requirement Management Plan.

#### b) Cấu trúc lưu trữ
Mỗi yêu cầu được định danh duy nhất và lưu trữ tập trung. Mọi thay đổi đối với yêu cầu phải được cập nhật vào tài liệu chính (Single Source of Truth).

---

### 1.2.4. Thuộc tính yêu cầu

Mỗi yêu cầu trong hệ thống sẽ được quản lý với các thuộc tính sau để thuận tiện cho việc theo dõi và báo cáo:

| Thuộc tính | Mô tả | Giá trị chấp nhận |
| :--- | :--- | :--- |
| **ID** | Mã định danh duy nhất của yêu cầu | FR-XX-YYY (Ví dụ: FR-ER-001) |
| **Tên yêu cầu** | Tên ngắn gọn của yêu cầu | Văn bản |
| **Mô tả** | Nội dung chi tiết của yêu cầu | Văn bản |
| **Độ ưu tiên (Priority)** | Mức độ quan trọng của yêu cầu | Cao (High), Trung bình (Medium), Thấp (Low) |
| **Trạng thái (Status)** | Trạng thái hiện tại của yêu cầu | Đề xuất (Proposed), Đã duyệt (Approved), Đang phát triển (In Progress), Đã kiểm thử (Validated), Đã hoàn thành (Completed) |
| **Độ khó (Difficulty)** | Mức độ phức tạp để thực hiện | Cao, Trung bình, Thấp |
| **Nguồn gốc (Source)** | Nguồn phát sinh yêu cầu | TCCB, TCKT, Admin, Luật pháp |
| **Người phụ trách** | Thành viên nhóm chịu trách nhiệm | Tên thành viên |

---

### 1.2.5. Truy vết yêu cầu

Để đảm bảo mọi yêu cầu đều được thực hiện và kiểm thử, dự án sẽ duy trì Ma trận Truy vết (Traceability Matrix) liên kết các phần tử sau:

1. **Nhu cầu nghiệp vụ (Business Needs) ↔ Yêu cầu chức năng (Functional Requirements):** Đảm bảo mọi nhu cầu của stakeholders đều được chuyển đổi thành chức năng hệ thống.
2. **Yêu cầu chức năng (Functional Requirements) ↔ Thiết kế (Design Elements):** Đảm bảo mọi chức năng đều có thiết kế tương ứng.
3. **Yêu cầu chức năng (Functional Requirements) ↔ Kịch bản kiểm thử (Test Cases):** Đảm bảo mọi chức năng đều được kiểm thử.

**Ví dụ Ma trận truy vết:**

| Need ID (Nhu cầu) | Functional ID (Chức năng) | Test Case ID |
| :--- | :--- | :--- |
| Need-001 (Quản lý hồ sơ) | FR-ER-001 (Lưu thông tin cá nhân) | TC-ER-001 |
| Need-002 (Tính lương) | FR-SD-001 (Lưu ngạch bậc lương) | TC-SD-001 |

---

### 1.2.6. Quản lý thay đổi yêu cầu

Mọi thay đổi đối với các yêu cầu đã được phê duyệt (Baslined Requirements) phải tuân theo quy trình kiểm soát thay đổi nghiêm ngặt.

#### a) Ban kiểm soát thay đổi (CCB)
CCB của dự án bao gồm:
- Trưởng dự án (Project Manager)
- Đại diện khách hàng (Trường ĐH Thủy lợi)
- Trưởng nhóm kỹ thuật (Technical Lead)

#### b) Quy trình yêu cầu thay đổi
1. **Gửi yêu cầu (Submit):** Bất kỳ thành viên nào cũng có thể gửi Yêu cầu Thay đổi (Change Request - CR) mô tả thay đổi mong muốn và lý do.
2. **Đánh giá (Evaluate):** Trưởng dự án và nhóm kỹ thuật phân tích tác động của thay đổi đến chi phí, lịch trình và các yêu cầu khác (Impact Analysis).
3. **Phê duyệt/Từ chối (Approve/Reject):** CCB xem xét kết quả phân tích và quyết định phê duyệt hoặc từ chối CR.
4. **Thực hiện (Implement):** Nếu được duyệt, cập nhật tài liệu yêu cầu, thông báo cho đội dự án và tiến hành thực hiện.
5. **Xác nhận (Verify):** Kiểm tra lại thay đổi sau khi hoàn thành.

---

### 1.2.7. Báo cáo và đánh giá

Các báo cáo quản lý yêu cầu sẽ được tạo định kỳ để theo dõi tiến độ:

- **Báo cáo Trạng thái Yêu cầu (Requirements Status Report):** Tỷ lệ % yêu cầu đã hoàn thành, đang thực hiện, chưa bắt đầu.
- **Báo cáo Ổn định Yêu cầu (Requirements Stability Index):** Số lượng thay đổi yêu cầu theo thời gian.
- **Ma trận Truy vết (Traceability Matrix):** Kiểm tra độ bao phủ của test case đối với yêu cầu.

Các mốc quan trọng (Milestones) cho tài liệu yêu cầu:
1. Phê duyệt sơ bộ danh sách nhu cầu (Needs List Baseline).
2. Phê duyệt tài liệu đặc tả yêu cầu người dùng (URS Baseline).
3. Rà soát yêu cầu lần cuối trước khi UAT (Final Review).

---

## 1.3. Đặc tả Use Case

**Dự án:** Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi  
**Ngày:** 30/01/2026

### Nghiệp vụ quản trị hệ thống

#### 1.3.1. Đăng nhập hệ thống (UC-SYS-001)

| Thuộc tính | Nội dung |
|------------|----------|
| **Mô tả** | Cho phép người dùng xác thực và truy cập vào hệ thống dựa trên thông tin tài khoản được cấp |
| **Actors** | Quản trị viên, Cán bộ TCCB, Cán bộ TCKT, Lãnh đạo trường, Cán bộ/Giảng viên |
| **Requirements** | SYS-001, SYS-002 |
| **Điều kiện tiên quyết** | - Người dùng đã được cấp tài khoản<br>- Hệ thống đang hoạt động bình thường |
| **Điều kiện sau** | **Thành công:** Chuyển đến Dashboard tương ứng với vai trò<br>**Thất bại:** Ở lại màn hình đăng nhập, hiển thị lỗi |
| **Luồng chính** | 1. Người dùng truy cập vào địa chỉ web của hệ thống<br>2. Hệ thống hiển thị màn hình Đăng nhập<br>3. Người dùng nhập Tên đăng nhập và Mật khẩu<br>4. Người dùng nhấn nút "Đăng nhập"<br>5. Hệ thống kiểm tra tính hợp lệ của dữ liệu nhập<br>6. Hệ thống xác thực thông tin tài khoản với CSDL<br>7. Hệ thống kiểm tra trạng thái tài khoản (Active/Locked)<br>8. Hệ thống xác định vai trò của người dùng<br>9. Hệ thống chuyển hướng người dùng đến Dashboard |
| **Luồng thay thế** | **A1:** Nếu người dùng đã có session hợp lệ → hệ thống tự động chuyển vào Dashboard |
| **Luồng ngoại lệ** | **E1:** Sai Tên đăng nhập hoặc Mật khẩu → hiển thị "Tên đăng nhập hoặc mật khẩu không đúng"<br>**E2:** Tài khoản bị khóa → hiển thị "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Quản trị viên" |

---

#### 1.3.2. Đăng xuất (UC-SYS-002)

| Thuộc tính | Nội dung |
|------------|----------|
| **Mô tả** | Cho phép người dùng thoát khỏi phiên làm việc hiện tại một cách an toàn. Cũng bao gồm việc tự động đăng xuất khi hết phiên |
| **Actors** | Tất cả người dùng đã đăng nhập |
| **Requirements** | SYS-003, SYS-004 |
| **Điều kiện tiên quyết** | - Người dùng đang trong phiên đăng nhập hợp lệ |
| **Điều kiện sau** | - Phiên làm việc bị hủy bỏ<br>- Người dùng được chuyển về màn hình Đăng nhập |
| **Luồng chính** | 1. Người dùng nhấn vào Avatar/Tên tài khoản ở góc màn hình<br>2. Hệ thống hiển thị menu cá nhân<br>3. Người dùng chọn "Đăng xuất"<br>4. Hệ thống hủy session hiện tại<br>5. Hệ thống chuyển hướng về trang Đăng nhập |
| **Luồng thay thế** | **A1 - Tự động đăng xuất:**<br>1. Hệ thống giám sát thời gian idle<br>2. Nếu idle vượt quá 30 phút<br>3. Hệ thống tự động hủy session<br>4. Hiển thị "Phiên làm việc đã hết hạn" và chuyển về trang Đăng nhập |

---

#### 1.3.3. Quản lý người dùng (UC-SYS-003)

| Thuộc tính | Nội dung |
|------------|----------|
| **Mô tả** | Cho phép Quản trị viên thêm mới, tìm kiếm, cập nhật thông tin, reset mật khẩu và khóa/mở khóa tài khoản người dùng |
| **Actors** | Quản trị viên hệ thống (System Admin) |
| **Requirements** | SYS-005, SYS-006, SYS-007, SYS-008 |
| **Điều kiện tiên quyết** | - Người dùng đã đăng nhập với vai trò Quản trị viên hệ thống |
| **Điều kiện sau** | - Thông tin người dùng được cập nhật trong cơ sở dữ liệu |
| **Luồng chính** | 1. Admin chọn menu "Quản trị hệ thống" -> "Quản lý người dùng"<br>2. Hệ thống hiển thị danh sách người dùng (phân trang)<br>3. Admin nhập từ khóa vào ô tìm kiếm (Username, Họ tên, Email)<br>4. Hệ thống lọc và hiển thị danh sách kết quả tương ứng |
| **Luồng thay thế** | **A1 - Thêm mới:**<br>1. Admin nhấn "Thêm mới"<br>2. Nhập: Tên đăng nhập, Mật khẩu, Họ tên, Email, Vai trò<br>3. Nhấn "Lưu"<br>4. Hệ thống validate và lưu<br><br>**A2 - Sửa thông tin:**<br>1. Admin nhấn icon "Sửa"<br>2. Thay đổi Họ tên, Email hoặc Vai trò<br>3. Nhấn "Lưu"<br><br>**A3 - Reset Mật khẩu:**<br>1. Nhấn "Reset Mật khẩu"<br>2. Nhập mật khẩu mới<br>3. Xác nhận<br><br>**A4 - Khóa/Mở khóa:**<br>1. Nhấn icon "Khóa"/"Mở khóa"<br>2. Xác nhận<br>3. Hệ thống cập nhật trạng thái |
| **Luồng ngoại lệ** | **E1:** Dữ liệu không hợp lệ (Username trùng, Email sai, Password < 8 ký tự) → hiển thị lỗi<br>**E2:** Không thể khóa chính mình → thông báo "Không thể khóa tài khoản đang sử dụng" |

---

#### 1.3.4. Phân quyền người dùng (UC-SYS-004)

| Thuộc tính | Nội dung |
|------------|----------|
| **Mô tả** | Cho phép Quản trị viên phân quyền cho người dùng dựa trên vai trò (Role). Hệ thống hỗ trợ các vai trò: TCCB, TCKT, và các vai trò khác |
| **Actors** | Quản trị viên hệ thống |
| **Requirements** | Need #9, Need #156 |
| **Điều kiện tiên quyết** | - Người dùng đã đăng nhập với vai trò Quản trị viên<br>- Tài khoản người dùng cần phân quyền đã được tạo (UC-SYS-003) |
| **Điều kiện sau** | - Vai trò được gán cho người dùng<br>- Quyền hạn tương ứng với vai trò được kích hoạt |
| **Luồng chính** | 1. Admin chọn menu "Quản trị hệ thống" -> "Phân quyền người dùng"<br>2. Hệ thống hiển thị danh sách người dùng với cột "Vai trò hiện tại"<br>3. Admin chọn một người dùng và nhấn "Phân quyền"<br>4. Hệ thống hiển thị form với các vai trò: Admin, TCCB, TCKT, Cán bộ/Giảng viên, Lãnh đạo<br>5. Admin chọn vai trò từ dropdown<br>6. Admin nhấn "Lưu"<br>7. Hệ thống cập nhật vai trò và kích hoạt quyền hạn<br>8. Hệ thống ghi log thay đổi |
| **Luồng thay thế** | **A1 - Phân quyền nhiều user:**<br>1. Chọn nhiều user bằng checkbox<br>2. Chọn "Phân quyền"<br>3. Chọn vai trò và xác nhận<br><br>**A2 - Xem chi tiết quyền:**<br>1. Nhấn "Xem chi tiết quyền"<br>2. Hiển thị danh sách quyền hạn của vai trò |
| **Luồng ngoại lệ** | **E1:** Không thể phân quyền cho chính mình → từ chối<br>**E2:** Tài khoản bị khóa → yêu cầu mở khóa trước |

---

### Nghiệp vụ cấu hình hệ thống

#### 1.3.5. Cấu hình lương và phụ cấp (UC-CFG-001)

| Thuộc tính | Nội dung |
|------------|----------|
| **Mô tả** | Quản trị viên thiết lập mức lương cơ sở, hệ số lương theo ngạch/bậc và các loại phụ cấp |
| **Actors** | Quản trị viên hệ thống |
| **Requirements** | CFG-001 đến CFG-009 |
| **Điều kiện tiên quyết** | - Người dùng đăng nhập với vai trò Quản trị viên |

**Luồng chính (UC-CFG-001-01: Thêm mới Mức lương cơ sở):**

| Bước | Mô tả |
|------|-------|
| 1 | Admin chọn menu "Quản lý Cấu hình" -> "Lương & Phụ cấp" |
| 2 | Admin chọn tab "Mức lương cơ sở" |
| 3 | Hệ thống hiển thị danh sách lịch sử mức lương cơ sở (Mức lương, Ngày hiệu lực) |
| 4 | Admin nhấn "Thêm mới" |
| 5 | Admin nhập `Mức lương` (VNĐ) và `Ngày hiệu lực` |
| 6 | Admin nhấn "Lưu" |
| 7 | Hệ thống lưu dữ liệu và áp dụng cho các tính toán từ ngày hiệu lực đó |

**Luồng thay thế (UC-CFG-001-02: Thêm mới/Sửa Hệ số Ngạch/Bậc):**

| Bước | Mô tả |
|------|-------|
| 1 | Admin chọn tab "Hệ số lương" |
| 2 | Hệ thống hiển thị danh sách Ngạch (Giảng viên, Chuyên viên...) |
| 3 | Admin chọn một Ngạch để xem chi tiết các Bậc |
| 4 | Admin có thể Thêm bậc mới hoặc Sửa hệ số của một bậc |
| 5 | Hệ thống lưu lịch sử thay đổi |

**Luồng thay thế (UC-CFG-001-03: Thêm mới/Sửa Loại Phụ cấp):**

| Bước | Mô tả |
|------|-------|
| 1 | Admin chọn tab "Phụ cấp" |
| 2 | Admin nhấn "Thêm mới" hoặc "Sửa" một mục |
| 3 | Admin nhập/sửa: `Tên phụ cấp`, `Loại tính` (Hệ số lương cơ sở / Số tiền cố định / % Lương), `Công thức` |
| 4 | Admin nhấn "Lưu" |

**Luồng thay thế (UC-CFG-001-04: Đánh dấu Active/Inactive):**

| Bước | Mô tả |
|------|-------|
| 1 | Tại tab "Hệ số lương" hoặc "Phụ cấp", Admin chọn một mục cần thay đổi trạng thái |
| 2 | Admin nhấn nút "Đánh dấu Inactive" hoặc "Kích hoạt lại" |
| 3 | Hệ thống hiển thị xác nhận và yêu cầu nhập `Lý do` (bắt buộc đối với việc inactive) |
| 4 | Admin xác nhận |
| 5 | Hệ thống cập nhật trạng thái và ghi log thay đổi |

**Luồng ngoại lệ:**

| Mã | Điều kiện | Mô tả |
|----|-----------|-------|
| E1 | Ngày hiệu lực không hợp lệ | Nếu `Ngày hiệu lực` <= ngày hiện tại, hệ thống hiển thị thông báo "Ngày hiệu lực phải lớn hơn ngày hiện tại" |
| E2 | Đã tồn tại mức lương cơ sở đang hoạt động | Hệ thống tự động đánh dấu mức cũ là Inactive và kích hoạt mức mới |

**Quy tắc nghiệp vụ:**

| STT | Quy tắc |
|-----|---------|
| 1 | **Mức lương cơ sở:** Chỉ được tồn tại 01 mức đang Active tại một thời điểm |
| 2 | **Ngày hiệu lực:** Phải lớn hơn ngày hiện tại |
| 3 | **Trạng thái Active/Inactive:** Các mục Inactive không hiển thị trong dropdown cho người dùng thường |
| 4 | **Lưu lịch sử:** Mọi thay đổi đều được ghi log với lý do (CFG-006) |

---

#### 1.3.6. Cấu hình hợp đồng (UC-CFG-002)


**Mô tả:** Quản trị viên cấu hình các loại hợp đồng lao động với tham số riêng cho từng loại, bao gồm thời hạn, số lần ký tối đa và các quy tắc chuyển đổi.
**Actors:** Quản trị viên hệ thống, Cán bộ Phòng TCCB (có quyền xem/sửa các loại hợp đồng inactive).
**Liên quan đến Requirements:** CFG-010 đến CFG-014

### UC-CFG-002-01: Quản lý loại Hợp đồng Xác định thời hạn
1.  Admin chọn menu "Quản lý Cấu hình" -> "Hợp đồng".
2.  Hệ thống hiển thị danh sách loại hợp đồng (chỉ hiển thị các loại Active với người dùng thường).
3.  **Với Cán bộ Phòng TCCB/Quản trị viên:** Có thể xem và quản lý cả các loại Inactive (được đánh dấu riêng).
4.  Admin chọn loại "Hợp đồng xác định thời hạn" để cấu hình.
5.  Hệ thống hiển thị các tham số đặc thù của loại này:
    *   `Thời hạn tối thiểu` (tháng) - VD: 12 tháng
    *   `Thời hạn tối đa` (tháng) - VD: 36 tháng
    *   `Số lần ký tối đa` (trước khi phải chuyển loại) - VD: 2 lần
    *   `Gia hạn tối đa` (số lần gia hạn) - VD: 1 lần
    *   `Thời hạn tối đa gia hạn` (tháng) - VD: 24 tháng
6.  Admin cập nhật các tham số và nhấn "Lưu".
7.  Hệ thống validate dữ liệu và cập nhật quy tắc.
**Luồng ngoại lệ:**
*   **E1: Thời hạn không hợp lệ**
    *   Nếu `Thời hạn tối thiểu` > `Thời hạn tối đa`, hệ thống hiển thị thông báo lỗi.

### UC-CFG-002-02: Cấu hình Hợp đồng Thử việc
1.  Admin chọn loại "Hợp đồng thử việc".
2.  Hệ thống hiển thị các tham số đặc thù:
    *   `Thời hạn tối đa` (tháng) - VD: 2-3 tháng theo Luật Lao động
    *   `Số lần ký tối đa` - VD: 01 lần duy nhất
    *   `Không được gia hạn` - Luôn checked và disabled
    *   `Loại HĐ chuyển đổi sau thử việc` - Chọn từ danh sách: Hợp đồng xác định thời hạn / Hợp đồng không xác định thời hạn
3.  Admin cập nhật và nhấn "Lưu".
4.  Admin cập nhật các tham số và nhấn "Lưu".
5.  Hệ thống validate dữ liệu và cập nhật quy tắc.
**Luồng ngoại lệ:**
*   **E1: Thời hạn không hợp lệ**
    *   Nếu `Thời hạn tối thiểu` > `Thời hạn tối đa`, hệ thống hiển thị thông báo lỗi.

### UC-CFG-002-03: Cấu hình Hợp đồng Không xác định thời hạn
1.  Admin chọn loại "Hợp đồng không xác định thời hạn".
2.  Hệ thống hiển thị các tham số đặc thù:
    *   `Không giới hạn thời hạn` - Luôn checked và disabled
    *   `Không giới hạn số lần ký` - Luôn checked và disabled
    *   `Có thể chuyển đổi từ` - Chọn: Hợp đồng xác định thời hạn (sau khi hết lần ký tối đa)
    *   `Điều kiện chuyển đổi` - VD: "Sau khi hết lần ký HĐ xác định thời hạn"
3.  Admin cập nhật và nhấn "Lưu".
4.  Admin cập nhật các tham số và nhấn "Lưu".
5.  Hệ thống validate dữ liệu và cập nhật quy tắc.

### UC-CFG-002-04: Cấu hình Hợp đồng Cộng tác viên / Visiting
1.  Admin chọn loại "Hợp đồng cộng tác viên / Visiting".
2.  Hệ thống hiển thị các tham số đặc thù:
    *   `Thời hạn theo niên học` - Checkbox: Tự động tính theo năm học (VD: 01/09 - 31/08)
    *   `Thời hạn tối thiểu` (tháng) - VD: 1 tháng
    *   `Thời hạn tối đa` (tháng) - VD: 12 tháng (1 niên học)
    *   `Số lần ký tối đa` - VD: Không giới hạn hoặc theo niên học
    *   `Cho phép gia hạn` - Checkbox
3.  Admin cập nhật và nhấn "Lưu".
4.  Admin cập nhật các tham số và nhấn "Lưu".
5.  Hệ thống validate dữ liệu và cập nhật quy tắc.
**Luồng ngoại lệ:**
*   **E1: Thời hạn không hợp lệ**
    *   Nếu `Thời hạn tối thiểu` > `Thời hạn tối đa`, hệ thống hiển thị thông báo lỗi.

### UC-CFG-002-05: Đánh dấu Active/Inactive
1.  Tại danh sách loại hợp đồng, Admin chọn một loại cần thay đổi trạng thái.
2.  Admin nhấn nút "Đánh dấu Inactive" hoặc "Kích hoạt lại".
3.  Hệ thống hiển thị xác nhận và yêu cầu nhập `Lý do` (bắt buộc đối với việc inactive).
4.  Admin xác nhận.
5.  Hệ thống cập nhật trạng thái và ghi log thay đổi.

**Luồng ngoại lệ:**
*   **E1: Loại hợp đồng đang được sử dụng**
    *   Nếu cố gắng inactive một loại hợp đồng đang có nhân sự sử dụng, hệ thống hiển thị cảnh báo "Không thể inactive - Đang có X nhân sự sử dụng loại hợp đồng này".

**Quy tắc nghiệp vụ:**
1.  **Tham số theo loại hợp đồng:** Mỗi loại hợp đồng có bộ tham số riêng biệt, phù hợp với đặc thù của loại đó.
2.  **Trạng thái Active/Inactive:**
    *   Các loại hợp đồng **Inactive** sẽ **không hiển thị** trong dropdown chọn loại hợp đồng khi tạo/gia hạn hợp đồng cho nhân sự.
    *   **Cán bộ Phòng TCCB** và **Quản trị viên** có quyền xem và quản lý các loại hợp đồng Inactive.
3.  **Validation:** Hệ thống sử dụng các tham số cấu hình để validate khi tạo/gia hạn hợp đồng trong UC-HRM-003.
4.  **Lưu lịch sử:** Mọi thay đổi cấu hình đều được ghi log với lý do.

---

#### 1.3.7. Quản lý danh mục dùng chung (UC-CFG-003)


**Mô tả:** Quản lý 9 danh mục chuẩn dùng chung cho toàn hệ thống:
1. **Quốc gia → Thành phố → Xã/Phường** (phân cấp 3 cấp, có ảnh hưởng trực tiếp đến luồng chính)
2. **Dân tộc**
3. **Tôn giáo**
4. **Trình độ học vấn**
5. **Chức danh khoa học** (GS, PGS)
6. **Ngạch viên chức**
7. **Chức vụ** (cấu hình riêng theo từng loại đơn vị)
8. **Danh hiệu**
9. **Loại đơn vị** (phân cấp: Hội đồng trường/Đảng ủy → Ban Giám hiệu/Hội đồng KH&ĐT → Khoa đào tạo/Phòng ban chức năng → Bộ môn/Phòng thí nghiệm, có ảnh hưởng trực tiếp đến luồng chính)

**Actors:** Quản trị viên hệ thống, Cán bộ Phòng TCCB (có quyền thêm/sửa các danh mục bị inactive).
**Liên quan đến Requirements:** CFG-017 đến CFG-020, Needs #26-30

### UC-CFG-003-01: Thêm mới Danh mục cơ bản
1.  Admin chọn menu "Quản lý Cấu hình" -> "Danh mục dùng chung".
2.  Hệ thống hiển thị danh sách 6 loại danh mục.
3.  Admin chọn một loại danh mục cần quản lý (VD: Dân tộc).
4.  Hệ thống hiển thị danh sách các mục (Items), **chỉ hiển thị các mục Active với người dùng thường**.
5.  **Với Cán bộ Phòng TCCB/Quản trị viên:** Có thể xem cả các mục Inactive (được đánh dấu riêng).
6.  Admin nhấn "Thêm mới" một mục.
7.  Admin nhập: `Mã` (tự động/tùy chọn), `Tên`, `Mô tả`, `Thứ tự hiển thị`.
8.  Admin nhấn "Lưu".
9.  Hệ thống lưu và ghi log.

### UC-CFG-003-02: Sửa Danh mục
1.  Admin chọn menu "Quản lý Cấu hình" -> "Danh mục dùng chung".
2.  Hệ thống hiển thị danh sách 9 loại danh mục.
3.  Admin chọn một loại danh mục cần quản lý (VD: Dân tộc).
4.  Hệ thống hiển thị danh sách các mục (Items), **chỉ hiển thị các mục Active với người dùng thường**.
5.  **Với Cán bộ Phòng TCCB/Quản trị viên:** Có thể xem cả các mục Inactive (được đánh dấu riêng).
6.  Admin chọn "Sửa" một mục.
7.  Admin sửa: `Mã` (tự động/tùy chọn), `Tên`, `Mô tả`, `Thứ tự hiển thị`.
8.  Admin nhấn "Lưu".
9.  Hệ thống lưu và ghi log.

### UC-CFG-003-03: Thêm mới Phân cấp Địa phương (Quốc gia → Thành phố → Xã/Phường)
1.  Admin chọn loại danh mục "Quốc gia → Thành phố → Xã/Phường" (Danh mục #1).
2.  Hệ thống hiển thị dạng **Tree View** (cây phân cấp 3 cấp).
3.  **Cấp 1 - Quốc gia:** Hiển thị danh sách các quốc gia (VD: Việt Nam, Lào, Campuchia...).
4.  Admin chọn một quốc gia (VD: Việt Nam) và nhấn "Thêm Thành phố".
5.  **Cấp 2 - Thành phố:** Nhập tên thành phố/trực thuộc quốc gia đã chọn (VD: Hà Nội, TP.HCM).
6.  Admin chọn một thành phố và nhấn "Thêm Xã/Phường".
7.  **Cấp 3 - Xã/Phường:** Nhập tên xã/phường/trực thuộc thành phố đã chọn (VD: Phường Bách Khoa, Quận Hai Bà Trưng).
8.  Có thể **kéo thả (Drag & Drop)** để thay đổi vị trí hoặc chuyển đơn vị cấp dưới sang đơn vị cấp trên khác.
9.  **Ảnh hưởng trực tiếp:** Phân cấp này được sử dụng trực tiếp trong hồ sơ nhân sự (mục Nơi sinh, Quê quán, Địa chỉ thường trú/tạm trú).

### UC-CFG-003-04: Thêm mới Phân cấp Loại đơn vị
1.  Admin chọn loại danh mục "Loại đơn vị" (Danh mục #9).
2.  Hệ thống hiển thị dạng **Tree View** (cây phân cấp đơn vị).
3.  **Cấp 1:** Hội đồng trường/Đảng ủy
4.  **Cấp 2:** Ban Giám hiệu/Hội đồng Khoa học và Đào tạo (trực thuộc cấp 1)
5.  **Cấp 3:** Khoa đào tạo/Phòng ban chức năng (trực thuộc cấp 2)
6.  **Cấp 4:** Bộ môn/Phòng thí nghiệm (trực thuộc cấp 3)
7.  Admin có thể thêm, sửa, xóa các cấp theo cấu trúc phân cấp.
8.  **Ảnh hưởng trực tiếp:** Phân cấp này được sử dụng trong quản lý cơ cấu tổ chức (UC-HRM-006) để xây dựng sơ đồ tổ chức.

### UC-CFG-003-05: Thêm mới Chức vụ theo Loại đơn vị
**Lưu ý:** Chức vụ được cấu hình riêng biệt cho từng loại đơn vị để đảm bảo tính nhất quán.

1.  Admin chọn loại danh mục "Chức vụ" (Danh mục #7).
2.  Hệ thống hiển thị danh sách các **Loại đơn vị** đã cấu hình (từ Danh mục #9).
3.  Admin chọn một loại đơn vị (VD: "Khoa").
4.  Hệ thống hiển thị danh sách chức vụ đã cấu hình cho loại đơn vị này (VD: Trưởng khoa, Phó trưởng khoa).
5.  Admin nhấn "Thêm chức vụ cho loại đơn vị này".
6.  Nhập: `Tên chức vụ`, `Mã`, `Mô tả`, `Số lượng tối đa` (VD: Trưởng khoa = 1, Phó trưởng khoa = 0-2).
7.  **Tương ứng với loại đơn vị:**
    *   Nếu chọn "Phòng ban chức năng" → Chức vụ: Trưởng phòng, Phó trưởng phòng
    *   Nếu chọn "Bộ môn" → Chức vụ: Trưởng bộ môn, Phó trưởng bộ môn
    *   Nếu chọn "Hội đồng trường" → Chức vụ: Chủ tịch HĐT, Phó Chủ tịch HĐT
8.  **Sử dụng:** Chức vụ được cấu hình sẽ tự động hiển thị dưới dạng "thẻ" khi phân công nhân sự vào đơn vị (liên kết UC-HRM-006, UC-HRM-009).

### UC-CFG-003-06: Sắp xếp Thứ tự Hiển thị
1.  Tại danh sách danh mục, Admin nhấn "Sắp xếp thứ tự".
2.  Hệ thống hiển thị danh sách có thể kéo thả (drag & drop).
3.  Admin điều chỉnh thứ tự các mục.
4.  Nhấn "Lưu thứ tự".
5.  Thứ tự này sẽ ảnh hưởng đến thứ tự hiển thị trong dropdown khi người dùng chọn.

### UC-CFG-003-07: Đánh dấu Active/Inactive
1.  Tại danh sách, Admin chọn một mục và nhấn "Đánh dấu Inactive" (hoặc "Active" nếu đang inactive).
2.  Hệ thống kiểm tra:
    *   Nếu mục đang được sử dụng trong hồ sơ nhân sự → Hiển thị cảnh báo và không cho phép inactive.
    *   Nếu không sử dụng → Chuyển trạng thái.
3.  Hệ thống cập nhật trạng thái và ghi log.
4.  **Quyền hạn:**
    *   **Người dùng thường:** Chỉ thấy các mục Active (hiển thị mặc định).
    *   **Cán bộ Phòng TCCB/Quản trị viên:** Có thể xem và quản lý cả các mục Inactive (có filter/bộ lọc riêng để hiển thị), có quyền thêm/sửa cả mục inactive.
**Luồng ngoại lệ:**
*   **E1: Không thể inactive mục đang sử dụng**
    *   Nếu mục danh mục đang được gán cho ít nhất 1 nhân sự.
    *   Hệ thống báo: "Không thể inactive mục đang được sử dụng trong hồ sơ nhân sự. Vui lòng chuyển tất cả nhân sự sang mục khác trước."


#### 1.3.8. Cấu hình khen thưởng và kỷ luật (UC-CFG-004)

**Mô tả:** Quản trị viên cấu hình các danh mục dùng cho việc ghi nhận khen thưởng và kỷ luật nhân sự, bao gồm các hình thức khen thưởng (danh hiệu, bằng khen, giấy khen, tiền thưởng) và các hình thức kỷ luật (khiển trách, cảnh cáo, sa thải).
**Actors:** Quản trị viên hệ thống.
**Liên quan đến Requirements:** Needs #25, #27, #30

**Điều kiện tiên quyết:**
*   Người dùng đăng nhập với vai trò Quản trị viên.

**Điều kiện sau:**
*   Danh mục khen thưởng/kỷ luật được cập nhật.
*   Thay đổi được ghi log với lý do.

### UC-CFG-004-01: Xem danh sách Danh mục Khen thưởng
1.  Admin chọn menu "Quản lý Cấu hình" -> "Khen thưởng & Kỷ luật".
2.  Hệ thống hiển thị tab "Danh mục Khen thưởng" với danh sách:
    *   Mã danh mục (tự động), Tên danh mục, Mô tả, Trạng thái (Active/Inactive), Thứ tự hiển thị
    *   Các danh mục mặc định: Danh hiệu (VD: Chiến sĩ thi đua), Bằng khen, Giấy khen, Tiền thưởng...
3.  Admin có thể chuyển sang tab "Danh mục Kỷ luật" để xem danh sách tương tự.

### UC-CFG-004-02: Thêm mới Danh mục Khen thưởng
1.  Tại tab "Khen thưởng", Admin nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu:
    *   **Tên danh mục:** (VD: "Bằng khen cấp Bộ", "Danh hiệu Lao động tiên tiến")
    *   **Loại:** Khen thưởng
    *   **Mô tả:** Chi tiết về danh mục
    *   **Thứ tự hiển thị:** Số thứ tự sắp xếp
3.  Admin nhập thông tin.
4.  Nhấn "Lưu".
5.  Hệ thống:
    *   Tạo mã danh mục tự động (VD: KT001).
    *   Lưu dữ liệu với trạng thái Active.
    *   Hiển thị thông báo thành công.
**Luồng ngoại lệ:**
*   **E1: Tên danh mục trùng**
    *   Nếu tên danh mục đã tồn tại trong cùng loại (Khen thưởng/Kỷ luật).
    *   Hệ thống báo lỗi và yêu cầu nhập tên khác.

### UC-CFG-004-03: Thêm mới Danh mục Kỷ luật
1.  Tại tab "Kỷ luật", Admin nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu:
    *   **Tên danh mục:** (VD: "Khiển trách", "Cảnh cáo", "Sa thải")
    *   **Loại:** Kỷ luật
    *   **Mức độ:** Nhẹ/Trung bình/Nghiêm trọng
    *   **Mô tả:** Chi tiết về hình thức kỷ luật
    *   **Thứ tự hiển thị:** Số thứ tự sắp xếp
3.  Admin nhập thông tin.
4.  Nhấn "Lưu".
5.  Hệ thống:
    *   Tạo mã danh mục tự động (VD: KL001).
    *   Lưu dữ liệu với trạng thái Active.
    *   Hiển thị thông báo thành công.
**Luồng ngoại lệ:**
*   **E1: Tên danh mục trùng**
    *   Nếu tên danh mục đã tồn tại trong cùng loại (Khen thưởng/Kỷ luật).
    *   Hệ thống báo lỗi và yêu cầu nhập tên khác.
    **E2: Thiếu thông tin bắt buộc**
    *   Nếu không nhập Tên danh mục.
    *   Hệ thống báo lỗi validate và không cho lưu.

### UC-CFG-004-04: Sửa Danh mục
1.  Tại danh sách, Admin chọn một danh mục và nhấn "Sửa".
2.  Hệ thống hiển thị form với thông tin hiện tại.
3.  Admin điều chỉnh Tên, Mô tả, Thứ tự hiển thị.
4.  Nhập lý do sửa (bắt buộc theo Need #30).
5.  Nhấn "Lưu".
6.  Hệ thống lưu thay đổi và ghi log lịch sử với lý do.
**Luồng ngoại lệ:**
*   **E1: Tên danh mục trùng**
    *   Nếu tên danh mục đã tồn tại trong cùng loại (Khen thưởng/Kỷ luật).
    *   Hệ thống báo lỗi và yêu cầu nhập tên khác.
*   **E2: Thiếu thông tin bắt buộc**
    *   Nếu không nhập Tên danh mục.
    *   Hệ thống báo lỗi validate và không cho lưu.

### UC-CFG-004-05: Đánh dấu Inactive
1.  Tại danh sách, Admin chọn một danh mục và nhấn "Inactive".
2.  Hệ thống kiểm tra xem danh mục này có đang được sử dụng trong hồ sơ khen thưởng/kỷ luật không.
3.  Nếu không sử dụng, chuyển sang trạng thái Inactive.
4.  Nếu đang sử dụng, hiển thị cảnh báo và không cho phép inactive.

### UC-CFG-004-06: Sắp xếp Thứ tự Hiển thị
1.  Admin nhấn "Sắp xếp thứ tự".
2.  Hệ thống hiển thị danh sách có thể kéo thả (drag & drop) để sắp xếp.
3.  Admin điều chỉnh thứ tự các danh mục.
4.  Nhấn "Lưu thứ tự".
5.  Hệ thống cập nhật thứ tự hiển thị.
---

#### 1.3.9. Cấu hình loại đào tạo (UC-CFG-007)


**Mô tả:** Quản trị viên cấu hình các loại khóa đào tạo như trong nước, ngoài nước, ngắn hạn, dài hạn để phân loại các khóa đào tạo trong hệ thống.
**Actors:** Quản trị viên hệ thống, Cán bộ Phòng TCCB (có quyền xem/sửa các loại đào tạo bị inactive).
**Liên quan đến Requirements:** Needs #25, #27, #30

**Điều kiện tiên quyết:**
*   Người dùng đăng nhập với vai trò Quản trị viên hoặc Cán bộ Phòng TCCB.

**Điều kiện sau:**
*   Danh mục loại đào tạo được cập nhật.
*   Thay đổi được ghi log với lý do.

### UC-CFG-007-01: Xem danh sách Loại đào tạo
1.  Admin chọn menu "Quản lý Cấu hình" -> "Loại khóa đào tạo".
2.  Hệ thống hiển thị danh sách các loại đào tạo, **chỉ hiển thị các loại Active với người dùng thường**.
3.  **Với Cán bộ Phòng TCCB/Quản trị viên:** Có thể xem và quản lý cả các loại Inactive (được đánh dấu riêng).
4.  Admin có thể sử dụng chức năng tìm kiếm, lọc.

### UC-CFG-007-02: Thêm mới Loại đào tạo
1.  Tại danh sách, Admin nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu:
    *   Tên loại (VD: "Đào tạo trong nước", "Đào tạo nước ngoài", "Đào tạo ngắn hạn", "Đào tạo dài hạn")
    *   Mô tả
    *   Thứ tự hiển thị
3.  Admin nhập thông tin.
4.  Nhấn "Lưu".
5.  Hệ thống:
    *   Tạo mã loại tự động (VD: DT001).
    *   Lưu dữ liệu với trạng thái Active.
    *   Hiển thị thông báo thành công.
**Luồng ngoại lệ:**
*   **E1: Tên loại trùng**
    *   Nếu tên loại đã tồn tại.
    *   Hệ thống báo lỗi và yêu cầu nhập tên khác.
*   **E2: Thiếu thông tin bắt buộc**
    *   Nếu không nhập Tên loại.
    *   Hệ thống báo lỗi validate và không cho lưu.

### UC-CFG-007-03: Sửa Loại đào tạo
1.  Tại danh sách, Admin chọn một loại và nhấn "Sửa".
2.  Hệ thống hiển thị form với thông tin hiện tại.
3.  Admin điều chỉnh Tên, Mô tả, Thứ tự hiển thị.
4.  Nhập lý do sửa (bắt buộc theo Need #30).
5.  Nhấn "Lưu".
6.  Hệ thống lưu thay đổi và ghi log lịch sử với lý do.
**Luồng ngoại lệ:**
*   **E1: Tên loại trùng**
    *   Nếu tên loại đã tồn tại.
    *   Hệ thống báo lỗi và yêu cầu nhập tên khác.
*   **E2: Thiếu thông tin bắt buộc**
    *   Nếu không nhập Tên loại.
    *   Hệ thống báo lỗi validate và không cho lưu.

### UC-CFG-007-04: Đánh dấu Active/Inactive
1.  Tại danh sách, Admin chọn một loại cần thay đổi trạng thái.
2.  Admin nhấn nút "Đánh dấu Inactive" hoặc "Kích hoạt lại".
3.  Hệ thống hiển thị xác nhận và yêu cầu nhập `Lý do` (bắt buộc đối với việc inactive).
4.  Admin xác nhận.
5.  Hệ thống kiểm tra:
    *   Nếu không sử dụng trong khóa đào tạo nào → Cập nhật trạng thái.
    *   Nếu đang sử dụng → Hiển thị cảnh báo "Không thể inactive - Đang có khóa đào tạo sử dụng loại này".
6.  Hệ thống ghi log thay đổi.

### UC-CFG-007-05: Sắp xếp Thứ tự Hiển thị
1.  Admin nhấn "Sắp xếp thứ tự".
2.  Hệ thống hiển thị danh sách có thể kéo thả (drag & drop).
3.  Admin điều chỉnh thứ tự các loại.
4.  Nhấn "Lưu thứ tự".
5.  Hệ thống cập nhật thứ tự hiển thị.


**Quy tắc nghiệp vụ:**
1.  **Trạng thái Active/Inactive:**
    *   Các loại đào tạo **Inactive** sẽ **không hiển thị** trong dropdown chọn loại đào tạo khi tạo khóa đào tạo (UC-HRM-007).
    *   **Cán bộ Phòng TCCB** và **Quản trị viên** có quyền xem và quản lý các loại đào tạo Inactive.
2.  **Lưu lịch sử:** Mọi thay đổi đều được ghi log với lý do (Need #30).
3.  **Sử dụng:** Loại đào tạo được sử dụng trong UC-HRM-007 (Quản lý Đào tạo).

---

### Nghiệp vụ phòng Tổ chức Cán bộ

#### 1.3.10. Quản lý hồ sơ nhân sự (UC-HRM-001)


**Mô tả:** Cho phép cán bộ TCCB quản lý toàn bộ thông tin hồ sơ nhân sự, bao gồm thêm mới, cập nhật thông tin cá nhân, gia đình, và xem chi tiết hồ sơ.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-001 đến HRM-014 (Needs 32-48)

**Điều kiện tiên quyết:**
*   Cán bộ TCCB đã đăng nhập hệ thống.

**Điều kiện sau:**
*   Hồ sơ nhân sự được tạo mới hoặc cập nhật.
*   Lịch sử thay đổi được ghi lại.

### UC-HRM-001-01: Tìm kiếm và Xem danh sách
1.  Cán bộ TCCB chọn menu "Quản lý Hồ sơ".
2.  Hệ thống hiển thị danh sách hồ sơ nhân viên (Mã, Họ tên, Đơn vị, Chức vụ...).
3.  Cán bộ TCCB **nhập từ khóa** vào ô tìm kiếm (Tên, Mã, CCCD, Email, SĐT).
4.  Hệ thống hiển thị kết quả tìm kiếm theo từ khóa (real-time hoặc sau khi nhấn Enter).
5.  Cán bộ TCCB chọn một hồ sơ từ kết quả để xem chi tiết hoặc thực hiện các hành động khác.

### UC-HRM-001-02: Sử dụng Bộ lọc Nâng cao (Advanced Filter)
**Lưu ý:** Đây là tính năng riêng biệt với tìm kiếm bằng từ khóa, cho phép lọc đa tiêu chí đồng thời.

1.  Tại màn hình danh sách, Cán bộ TCCB nhấn "Bộ lọc nâng cao".
2.  Hệ thống hiển thị panel lọc với nhiều tiêu chí:
    *   **Đơn vị:** Dropdown chọn Khoa/Phòng/Ban (cho phép chọn nhiều)
    *   **Trình độ:** Tiến sĩ, Thạc sĩ, Đại học, Cao đẳng...
    *   **Chức danh:** GS, PGS, Chuyên viên...
    *   **Chức vụ:** Trưởng khoa, Phó khoa...
    *   **Trạng thái:** Đang làm việc, Thôi việc, Nghỉ phép...
    *   **Ngày sinh:** Từ ngày - Đến ngày
    *   **Giới tính:** Nam, Nữ
3.  Cán bộ TCCB chọn các tiêu chí lọc.
4.  Nhấn "Áp dụng bộ lọc".
5.  Hệ thống hiển thị kết quả lọc đa tiêu chí.
6.  Có thể lưu bộ lọc để sử dụng lại hoặc xuất kết quả lọc ra Excel.

### UC-HRM-001-03: Kết hợp Tìm kiếm + Bộ lọc Nâng cao
1.  Cán bộ TCCB có thể **kết hợp** cả 2 tính năng:
    *   Bước 1: Sử dụng Bộ lọc Nâng cao để lọc theo Đơn vị, Trình độ...
    *   Bước 2: Trong kết quả đã lọc, nhập từ khóa vào ô tìm kiếm để tìm kiếm thêm
2.  Hệ thống áp dụng cả 2 điều kiện: Kết quả phải thỏa mãn Bộ lọc Nâng cao VÀ chứa từ khóa tìm kiếm.

### UC-HRM-001-04: Thêm mới Hồ sơ (Add Profile)
1.  Tại màn hình danh sách, Cán bộ TCCB nhấn "Thêm mới".
2.  Hệ thống hiển thị form nhập liệu chia thành các tabs/bước.
3.  Cán bộ TCCB nhập **Thông tin chung**: Họ tên, Ngày sinh, Giới tính, CCCD, MST, BHXH, Email, SĐT (HRM-003).
4.  **[MỞ RỘNG - Nếu là người nước ngoài]** Cán bộ TCCB tick chọn "Người nước ngoài", hệ thống hiển thị thêm các trường:
    *   **Số Visa:** Nhập số visa còn hiệu lực
    *   **Ngày hết hạn Visa:** Ngày visa hết hạn
    *   **Số Hộ chiếu:** Passport number
    *   **Ngày hết hạn Hộ chiếu:** Ngày passport hết hạn
    *   **Số giấy phép lao động:** Work permit number
    *   **Ngày hết hạn giấy phép lao động:** Work permit expiration
    *   **Upload PDF giấy phép lao động:** Tải lên bản scan giấy phép lao động (bắt buộc)
5.  Cán bộ TCCB nhập **Thông tin gia đình**: Vợ/chồng, con, người phụ thuộc (HRM-004).
6.  Cán bộ TCCB nhập **Thông tin ngân hàng**: Tên NH, STK (HRM-006).
7.  Cán bộ TCCB nhập **Quá trình công tác** trước khi về trường (HRM-007) và **Thông tin Đảng/Đoàn** (HRM-008).
8.  Cán bộ TCCB upload ảnh chân dung (HRM-005).
9.  **BẮT BUỘC - Cập nhật thông tin trước khi lưu:**
    *   Cán bộ TCCB chuyển sang tab **"Trình độ & Chức danh"** và nhập thông tin (liên kết UC-HRM-002)
    *   Cán bộ TCCB chuyển sang tab **"Lương & Phụ cấp"** và nhập thông tin (liên kết UC-HRM-004)
    *   Cán bộ TCCB chuyển sang tab **"Hợp đồng"** và tạo hợp đồng mới (liên kết UC-HRM-003)
10. Hệ thống kiểm tra tính đầy đủ của các thông tin bắt buộc:
    *   Kiểm tra đã có Trình độ & Chức danh chưa
    *   Kiểm tra đã có Lương & Phụ cấp chưa
    *   Kiểm tra đã có Hợp đồng chưa
    *   Nếu thiếu thông tin bắt buộc → Hiển thị cảnh báo và không cho phép lưu.
11. Cán bộ TCCB nhấn "Lưu".
12. Hệ thống tự động sinh **Mã cán bộ** (HRM-009).
13. Hệ thống lưu hồ sơ và thông báo thành công.
**Luồng ngoại lệ:**
*   **E1: Thiếu thông tin bắt buộc khi lưu**
    *   Nếu chưa nhập đủ thông tin Trình độ, Lương, hoặc Hợp đồng (bắt buộc).
    *   Hệ thống hiển thị cảnh báo: "Vui lòng cập nhật đầy đủ thông tin [tên tab còn thiếu] trước khi lưu hồ sơ."
    *   Highlight các tab còn thiếu thông tin.
*   **E2: Thông tin người nước ngoài không đầy đủ**
    *   Nếu tick chọn "Người nước ngoài" nhưng chưa nhập Visa, Hộ chiếu, hoặc Giấy phép lao động.
    *   Hệ thống báo lỗi: "Vui lòng nhập đầy đủ thông tin Visa, Hộ chiếu và Giấy phép lao động."
*   **E3: Giấy phép lao động đã hết hạn**
    *   Nếu ngày hết hạn giấy phép lao động < ngày hiện tại.
    *   Hệ thống cảnh báo: "Giấy phép lao động đã hết hạn. Vui lòng cập nhật giấy phép mới."

### UC-HRM-001-05: Đánh dấu Thôi việc
1.  Cán bộ TCCB chọn chức năng "Đánh dấu thôi việc" (HRM-011).
2.  Hệ thống yêu cầu xác nhận và nhập ngày/lý do thôi việc.
3.  Cán bộ TCCB xác nhận.
4.  Hệ thống cập nhật trạng thái nhân sự sang "Thôi việc" (Inactive).

### UC-HRM-001-06: In Hồ sơ (Print Profile)
1.  Tại danh sách hoặc chi tiết hồ sơ, Cán bộ TCCB chọn hồ sơ cần in.
2.  Nhấn nút "In hồ sơ" (hoặc icon print).
3.  Hệ thống hiển thị dialog chọn mẫu in:
    *   **Mẫu mặc định (PDF):** Lý lịch trích ngang chuẩn
    *   **Mẫu đầy đủ (PDF):** Toàn bộ thông tin hồ sơ
    *   **Mẫu tóm tắt (PDF):** Thông tin cơ bản
4.  Admin chọn mẫu mặc định là PDF.
5.  Nhấn "Xem trước" hoặc "Tải xuống".
6.  Hệ thống tạo file PDF theo mẫu đã chọn:
    *   Bao gồm thông tin cá nhân, ảnh chân dung, thông tin công việc
    *   Định dạng theo mẫu chuẩn của trường
7.  File PDF được tải xuống máy hoặc mở trong tab mới để in.

### UC-HRM-001-07: Xem Chi tiết Hồ sơ (View Detailed Profile)
1.  Tại danh sách, Cán bộ TCCB nhấn vào tên/mã nhân viên (hoặc nhấn "Xem chi tiết").
2.  Hệ thống hiển thị màn hình **Chi tiết hồ sơ** ở chế độ **read-only** (chỉ xem, không sửa).
3.  Hệ thống hiển thị đầy đủ thông tin theo các tab:
    *   **Tab "Thông tin chung":** Lý lịch, liên hệ, gia đình, ảnh chân dung
    *   **Tab "Trình độ & Chức danh":** Bằng cấp, chứng chỉ, học hàm/học vị
    *   **Tab "Lương & Phụ cấp":** Ngạch, bậc, hệ số, phụ cấp hiện tại
    *   **Tab "Hợp đồng":** Lịch sử các hợp đồng đã ký
    *   **Tab "Khen thưởng/Kỷ luật":** Các quyết định khen thưởng, kỷ luật
    *   **Tab "Công tác":** Quá trình công tác, điều chuyển
    *   **Tab "Lịch sử":** Lịch sử thay đổi hồ sơ (audit trail)
4.  Tại mỗi tab, Cán bộ TCCB có thể nhấn nút **"Chỉnh sửa"** để chuyển sang chế độ sửa thông tin tương ứng.
5.  Có thể nhấn "In hồ sơ" hoặc "Xuất Excel" từ màn hình chi tiết.

### UC-HRM-001-09: Chỉnh sửa trong chi tiết hồ sơ (Edit via Tabs)
1.  Tại màn hình **Chi tiết hồ sơ** (Alternative Flow 5), Cán bộ TCCB chọn tab cần cập nhật.
2.  Nhấn nút **"Chỉnh sửa"** hoặc **"Cập nhật"** tại tab đó.
3.  Hệ thống chuyển hướng đến use case tương ứng:
    *   Tab "Trình độ" → Chuyển đến Module HRM-002 (Quản lý Trình độ)
    *   Tab "Lương & Phụ cấp" → Chuyển đến Module HRM-004 (Quản lý Lương)
    *   Tab "Hợp đồng" → Chuyển đến Module HRM-003 (Quản lý Hợp đồng)
    *   Tab "Khen thưởng/Kỷ luật" → Chuyển đến Module HRM-005 (Quản lý Khen thưởng & Kỷ luật)
4.  Sau khi cập nhật xong tại use case con, hệ thống tự động quay lại màn hình Chi tiết hồ sơ.
5.  Thông tin được cập nhật hiển thị ngay trên tab tương ứng.

---

#### 1.3.11. Quản lý trình độ và chức danh (UC-HRM-002)


**Mô tả:** Quản lý thông tin học vấn, bằng cấp, chứng chỉ và các chức danh khoa học của nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-015 đến HRM-019 (Needs 56-61)

**Điều kiện tiên quyết:**
*   Đang trong màn hình chi tiết hoặc chỉnh sửa hồ sơ nhân sự.

### UC-HRM-002-01: Cập nhật Bằng cấp
1.  Cán bộ TCCB chọn tab "Trình độ & Chức danh" trong hồ sơ.
2.  Hệ thống hiển thị danh sách bằng cấp đã lưu.
3.  Cán bộ TCCB nhấn "Thêm bằng cấp".
4.  Cán bộ TCCB chọn `Trình độ` (Tiến sĩ, Thạc sĩ...) từ danh mục.
5.  Nhập chi tiết: Tên bằng, Trường, Ngành, Năm tốt nghiệp, Xếp loại.
6.  Upload file scan văn bằng.
7.  Nhấn "Lưu".

### UC-HRM-002-02: Gỡ Bằng cấp
1.  Cán bộ TCCB chọn tab "Trình độ & Chức danh" trong hồ sơ.
2.  Hệ thống hiển thị danh sách bằng cấp đã lưu.
3.  Cán bộ TCCB nhấn "Gỡ bằng cấp".
4.  Nhấn "Lưu".

### UC-HRM-002-03: Sửa đổi Chức danh
1.  Tại tab "Trình độ & Chức danh", mục Chức danh/Ngạch.
2.  Cán bộ TCCB chọn `Chức danh khoa học` (GS, PGS), `Ngạch viên chức`, `Danh hiệu` từ danh mục được cấu hình.
3.  Nhấn "Lưu".

### UC-HRM-002-04: Thêm Chứng chỉ
1.  Cán bộ TCCB chọn tab "Trình độ & Chức danh" trong hồ sơ.
2.  Cán bộ TCCB nhấn "Thêm chứng chỉ".
3.  Nhập Tên, Nơi cấp, Ngày cấp, **Ngày hết hạn**.
4.  Hệ thống kiểm tra `Ngày hết hạn`. Nếu sắp hết hạn (so với ngày hiện tại + config), hệ thống vẫn lưu nhưng có thể hiển thị flag cảnh báo (HRM-019).

### UC-HRM-002-05: Gỡ chứng chỉ
1.  Cán bộ TCCB chọn tab "Trình độ & Chức danh" trong hồ sơ.
2.  Cán bộ TCCB nhấn "Gỡ chứng chỉ".
3.  Nhấn "Lưu".


#### 1.3.12. Quản lý hợp đồng lao động (UC-HRM-003)


**Mô tả:** Quản lý vòng đời hợp đồng lao động: Tạo mới, Gia hạn, Chấm dứt hợp đồng với quản lý trạng thái và ràng buộc nghiệp vụ.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-020 đến HRM-028 (Needs 76-87)

**Điều kiện tiên quyết:**
*   Cán bộ TCCB đã đăng nhập hệ thống.
*   Hồ sơ nhân sự đã được tạo (UC-HRM-001).

**Điều kiện sau:**
*   Hợp đồng được tạo mới, gia hạn hoặc chấm dứt.
*   Trạng thái hợp đồng được tự động tính toán và cập nhật.

### Trạng thái Hợp đồng (Contract Status)
Hệ thống tự động tính toán trạng thái dựa trên ngày hiện tại:

*   **Đang hiệu lực (Active):** Ngày hiệu lực ≤ Ngày hiện tại ≤ Ngày hết hạn
*   **Chưa hiệu lực (Not yet active):** Ngày hiện tại < Ngày hiệu lực
*   **Hết hiệu lực (Expired):** Ngày hiện tại > Ngày hết hạn

### UC-HRM-003-01: Tạo mới Hợp đồng
1.  Cán bộ TCCB chọn tab "Hợp đồng" trong hồ sơ nhân sự.
2.  Nhấn "Thêm mới HĐ".
3.  Hệ thống kiểm tra **Business Rule BR-001**: Chỉ cho phép tạo hợp đồng mới nếu nhân viên không có hợp đồng "Đang hiệu lực". Nếu có, hiển thị cảnh báo và yêu cầu chấm dứt hợp đồng hiện tại trước.
4.  Chọn `Loại hợp đồng` (Xác định thời hạn, Không xác định thời hạn...).
5.  Hệ thống kiểm tra số lần ký tối đa cho loại HĐ này (HRM-026). Nếu vượt quá, yêu cầu chuyển loại HĐ.
6.  Nhập thông tin hợp đồng:
    *   `Số HĐ`
    *   `Ngày ký`
    *   `Ngày hiệu lực`
    *   `Ngày hết hạn`
    *   `Nội dung hợp đồng` (rich text editor - nhập điều khoản, mô tả công việc, quyền lợi...)
    *   `Upload PDF bản hợp đồng giấy` (tải lên bản scan/file gốc đã ký)
7.  Hệ thống validate thời hạn Min/Max của loại HĐ (HRM-024).
8.  Hệ thống kiểm tra **Business Rule BR-002**: Hợp đồng mới không được trùng lặp thời gian với hợp đồng đã tồn tại (Ngày hiệu lực phải > Ngày hết hạn của hợp đồng cũ hoặc hợp đồng cũ đã chấm dứt).
9.  Nhấn "Lưu".
10. Hệ thống tự động tính trạng thái hợp đồng dựa trên Ngày hiệu lực và Ngày hết hạn.
11. Hệ thống lưu hợp đồng và thông báo thành công.
**Luồng ngoại lệ:**
*   **E1: Vi phạm Business Rule BR-001 (Đã có hợp đồng hiệu lực)**
    *   Tại bước 3 Main Flow, nếu nhân viên đã có hợp đồng "Đang hiệu lực".
    *   Hệ thống hiển thị: "Không thể tạo hợp đồng mới. Nhân viên đang có hợp đồng hiệu lực đến [Ngày hết hạn]. Vui lòng chấm dứt hợp đồng hiện tại trước."
*   **E2: Vi phạm Business Rule BR-002 (Trùng lặp thời gian)**
    *   Tại bước 8 Main Flow, nếu Ngày hiệu lực của hợp đồng mới ≤ Ngày hết hạn của hợp đồng cũ chưa chấm dứt.
    *   Hệ thống hiển thị: "Ngày hiệu lực của hợp đồng mới không hợp lệ. Vui lòng chọn ngày sau [Ngày hết hạn HĐ cũ] hoặc chấm dứt hợp đồng cũ trước."
*   **E3: Thiếu file PDF hợp đồng giấy**
    *   Nếu Cán bộ TCCB không upload PDF bản hợp đồng đã ký.
    *   Hệ thống hiển thị cảnh báo: "Vui lòng upload bản PDF hợp đồng đã ký để hoàn tất lưu trữ."

### UC-HRM-003-02: Gia hạn Hợp đồng (Renewal)
1.  Cán bộ TCCB chọn hợp đồng, nhấn "Gia hạn".
2.  Hệ thống kiểm tra **Business Rule BR-003**: Chỉ cho phép gia hạn khi thời gian còn lại của hợp đồng hiện tại **≤ 30 ngày** (tính từ ngày hiện tại đến Ngày hết hạn). Nếu > 30 ngày, hiển thị thông báo "Chỉ được gia hạn khi còn tối đa 30 ngày trước ngày hết hạn".
3.  Hệ thống đề xuất Loại hợp đồng tiếp theo dựa trên quy tắc (VD: Sau 2 lần HĐ 12 tháng -> HĐ Không xác định thời hạn) (HRM-025).
4.  Hệ thống tự động điền thông tin từ hợp đồng cũ (có thể chỉnh sửa):
    *   `Ngày hiệu lực` = Ngày hết hạn của HĐ cũ + 1 ngày
    *   Giữ nguyên `Nội dung hợp đồng` (có thể sửa)
    *   Yêu cầu upload `PDF bản hợp đồng giấy` mới
5.  Cán bộ TCCB xác nhận hoặc điều chỉnh thông tin gia hạn.
6.  Nhấn "Lưu".
7.  Hệ thống tự động chấm dứt hợp đồng cũ và kích hoạt hợp đồng mới.
**Luồng ngoại lệ:**
*   **E1: Vi phạm Business Rule BR-003 (Gia hạn quá sớm)**
    *   Tại bước 2 Alternative Flow 1, nếu số ngày còn lại > 30.
    *   Hệ thống hiển thị: "Chưa đến thời hạn gia hạn. Chỉ được gia hạn khi còn tối đa 30 ngày trước ngày hết hạn (hiện còn [X] ngày)."
*   **E2: Thiếu file PDF hợp đồng giấy**
    *   Nếu Cán bộ TCCB không upload PDF bản hợp đồng đã ký.
    *   Hệ thống hiển thị cảnh báo: "Vui lòng upload bản PDF hợp đồng đã ký để hoàn tất lưu trữ."

### UC-HRM-003-03: Chấm dứt Hợp đồng
1.  Cán bộ TCCB chọn Hợp đồng đang hiệu lực, nhấn "Chấm dứt".
2.  Nhập Ngày chấm dứt, Lý do, Thông tin thanh toán/bồi thường (HRM-022).
3.  Xác nhận.
4.  Hệ thống cập nhật trạng thái Hợp đồng là "Hết hiệu lực" và ghi nhận Ngày chấm dứt thực tế.

**Quy tắc nghiệp vụ:**

**BR-001: Chỉ 1 hợp đồng hiệu lực tại một thời điểm**
*   Mỗi nhân viên chỉ được có tối đa 1 hợp đồng ở trạng thái "Đang hiệu lực".
*   Không thể tạo hợp đồng mới nếu đã tồn tại hợp đồng đang hiệu lực.

**BR-002: Không trùng lặp thời gian hợp đồng**
*   Hợp đồng mới không được có thời gian hiệu lực trùng lặp với hợp đồng cũ chưa chấm dứt.
*   Ngày hiệu lực của hợp đồng mới phải sau Ngày hết hạn của hợp đồng cũ (nếu hợp đồng cũ chưa hết hạn thì phải chấm dứt trước).

**BR-003: Gia hạn chỉ khi còn ≤ 30 ngày**
*   Chỉ cho phép thực hiện gia hạn hợp đồng khi thời gian từ ngày hiện tại đến Ngày hết hạn còn tối đa 30 ngày.
*   Nếu còn > 30 ngày, hệ thống từ chối và hiển thị thông báo lỗi.

---

#### 1.3.13. Quản lý lương và phụ cấp (UC-HRM-004)


**Mô tả:** Nhập liệu thông tin ngạch lương, bậc lương, hệ số và các mục phụ cấp cho từng nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-029 đến HRM-032 (Needs 110-113)

### UC-HRM-004-01: Cập nhật Lương
1.  Cán bộ TCCB chọn tab "Lương & Phụ cấp" trong hồ sơ nhân sự.
2.  Hệ thống hiển thị thông tin lương hiện tại.
3.  Cán bộ TCCB nhấn "Cập nhật Lương".
4.  Cán bộ TCCB chọn `Ngạch lương`, `Bậc lương`.
5.  Hệ thống tự động hiển thị `Hệ số` tương ứng (theo cấu hình).
6.  Nhập `Ngày hiệu lực`.
7.  Nhấn "Lưu".
8.  Hệ thống lưu lịch sử thay đổi mức lương (HRM-030).

### UC-HRM-004-02: Thêm Phụ cấp
1.  Tại tab "Lương & Phụ cấp", mục "Danh sách Phụ cấp".
2.  Cán bộ TCCB nhấn "Thêm phụ cấp".
3.  Chọn `Loại phụ cấp` từ danh mục.
4.  Hệ thống hiển thị mức phụ cấp mặc định hoặc cho phép nhập số tiền/hệ số (tùy cấu hình).
5.  Nhấn "Lưu".

### UC-HRM-004-03: Sửa phụ cấp
1.  Tại tab "Lương & Phụ cấp", mục "Danh sách Phụ cấp".
2.  Cán bộ TCCB nhấn "Sửa phụ cấp".
3.  Chọn `Loại phụ cấp` từ danh mục.
4.  Hệ thống hiển thị mức phụ cấp mặc định hoặc cho phép sửa số tiền/hệ số (tùy cấu hình).
5.  Nhấn "Lưu".

### UC-HRM-004-04: Hủy phụ cấp
1.  Tại tab "Lương & Phụ cấp", mục "Danh sách Phụ cấp".
2.  Cán bộ TCCB nhấn Một mục phụ cấp.
3.  Cán bộ TCCB nhấn "Hủy phụ cấp".
4.  Hệ thống "Lưu".

---

#### 1.3.14. Quản lý khen thưởng và kỷ luật (UC-HRM-005)


**Mô tả:** Ghi nhận các quyết định khen thưởng hoặc kỷ luật đối với nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-033, HRM-034 (Needs 93, 94)

### UC-HRM-005-01: Thêm Khen thưởng
1.  Cán bộ TCCB chọn tab "Khen thưởng & Kỷ luật" trong hồ sơ nhân sự.
2.  Nhấn "Thêm Khen thưởng".
3.  Nhập/Chọn: `Loại khen thưởng`, `Ngày quyết định`, `Số quyết định`, `Nội dung`, `Số tiền thưởng` (nếu có).
4.  Đính kèm file minh chứng (PDF/Image).
5.  Nhấn "Lưu".

### UC-HRM-005-02: Thêm Kỷ luật
1.  Cán bộ TCCB chọn tab "Khen thưởng & Kỷ luật" trong hồ sơ nhân sự.
2.  Nhấn "Thêm Kỷ luật".
3.  Nhập/Chọn: `Loại kỷ luật`, `Ngày quyết định`, `Lý do`, `Hình thức xử lý`.
4.  Nhấn "Lưu".

### UC-HRM-005-03: Xóa Khen thưởng
1.  Cán bộ TCCB chọn tab "Khen thưởng & Kỷ luật" trong hồ sơ nhân sự.
2.  Nhấn "Xóa Khen thưởng".
3.  Cán bộ TCCB xác nhận
4.  Nhấn "Lưu".

### UC-HRM-005-04: Xóa Kỷ luật
1.  Cán bộ TCCB chọn tab "Khen thưởng & Kỷ luật" trong hồ sơ nhân sự.
2.  Nhấn "Xóa Kỷ luật".
3.  Cán bộ TCCB xác nhận
4.  Nhấn "Lưu".
---

#### 1.3.15. Quản lý cơ cấu tổ chức (UC-HRM-006)


**Mô tả:** Quản lý cây sơ đồ tổ chức, các đơn vị phòng ban và phân công nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-035 đến HRM-044 (Needs 65-73)

### UC-HRM-006-01: Quản lý Cây đơn vị
1.  Cán bộ TCCB chọn menu "Cơ cấu Tổ chức" ở menu chính.
2.  Hệ thống hiển thị sơ đồ cây (Tree View) với màu sắc trạng thái đơn vị:
    *   **Xanh lá (Hoạt động):** Đơn vị đang hoạt động bình thường
    *   **Cam (Sáp nhập):** Đơn vị đang trong quá trình sáp nhập
    *   **Đỏ (Giải thể):** Đơn vị đã giải thể
3.  Cán bộ TCCB chọn một nút (đơn vị) để xem chi tiết.
4.  Hệ thống hiển thị thông tin đơn vị:
    *   **Thông tin cơ bản:** Tên đơn vị, Mã đơn vị, Loại đơn vị
    *   **Thông tin liên hệ:** Địa chỉ, Địa chỉ văn phòng, Email, Số điện thoại, Website
    *   **Trạng thái:** Hiển thị trạng thái hiện tại với màu sắc tương ứng
    *   **Các chức vụ:** Hiển thị dưới dạng thẻ (cards) theo cấu hình loại đơn vị từ UC-CFG-003
5.  Cán bộ TCCB có thể thực hiện: Sửa thông tin đơn vị, Phân công nhân sự.

### UC-HRM-006-02: Phân công Nhân sự (Điều chuyển/Phân công)
1.  Cán bộ TCCB chọn đơn vị đích trên cây tổ chức.
2.  Nhấn "Thêm nhân sự" -> "Phân công / Điều chuyển".
4.  Tìm kiếm nhân sự từ danh sách hoặc từ đơn vị khác.
5.  Chọn là `Chức vụ chính` hay `Kiêm nhiệm` (HRM-040).
6.  Nếu là giảng viên, hệ thống ràng buộc chỉ thuộc 1 Bộ môn (HRM-042).
7.  **Lưu ý:** Việc phân công vào chức vụ cụ thể được thực hiện tại UC-HRM-009.
8.  Lưu thông tin.

### UC-HRM-006-03: Xem danh sách Nhân sự đơn vị
1.  Tại màn hình chi tiết đơn vị, Cán bộ TCCB chuyển sang tab "Nhân sự".
2.  Hệ thống hiển thị danh sách nhân sự đang công tác tại đơn vị:
    *   Họ tên, Mã cán bộ
    *   Chức vụ (nếu đã được phân công tại UC-HRM-009)
    *   Loại phân công: Chính / Kiêm nhiệm
3.  Có thể lọc theo: Đang công tác, Đã chuyển đi, Tất cả.

### UC-HRM-006-04: Xem Lịch sử phân công
1.  Tại tab "Nhân sự", Cán bộ TCCB chọn một nhân sự.
2.  Nhấn "Xem lịch sử".
3.  Hệ thống hiển thị lịch sử phân công của nhân sự tại đơn vị:
    *   Ngày bắt đầu, Ngày kết thúc
    *   Chức vụ tại thời điểm đó
    *   Lý do chuyển đi (nếu có)

### UC-HRM-006-05: Quản lý Thông tin Đơn vị (Unit Information Management)
1.  Tại màn hình chi tiết đơn vị, Cán bộ TCCB nhấn "Sửa thông tin".
2.  Hệ thống hiển thị form chỉnh sửa với các trường:
    *   **Thông tin cơ bản:** Tên đơn vị, Mã đơn vị
    *   **Thông tin liên hệ:**
        *   Địa chỉ: Địa chỉ trụ sở chính
        *   Địa chỉ văn phòng: Địa chỉ văn phòng làm việc (nếu khác trụ sở)
        *   Email: Email liên hệ chính thức
        *   Số điện thoại: Số điện thoại liên hệ
        *   Website: Trang web đơn vị (nếu có)
3.  Cán bộ TCCB chỉnh sửa thông tin.
4.  Nhập lý do chỉnh sửa (bắt buộc).
5.  Nhấn "Lưu".
6.  Hệ thống cập nhật thông tin và ghi log thay đổi.

### UC-HRM-006-06: Xem Lịch sử Đơn vị (Unit History)
1.  Tại màn hình chi tiết đơn vị, Cán bộ TCCB nhấn "Lịch sử".
2.  Hệ thống hiển thị timeline các sự kiện:
    *   Ngày thành lập/Thành lập lại
    *   Các lần thay đổi thông tin (tên, mã, địa chỉ...)
    *   Các lần sáp nhập (vào đơn vị khác hoặc tiếp nhận đơn vị khác)
    *   Ngày giải thể (nếu có)
3.  Mỗi sự kiện hiển thị: Ngày, Loại sự kiện, Nội dung chi tiết.
4.  **Lưu ý:** Để xem chi tiết đầy đủ các sự kiện lịch sử, hệ thống cung cấp liên kết đến UC-HRM-010.

---

#### 1.3.16. Quản lý chức vụ đơn vị (UC-HRM-009)

**Mô tả:** Quản lý các chức vụ trong bộ môn theo danh mục cấu hình (Trưởng bộ môn, Phó trưởng bộ môn, Tổ trưởng...) và phân công cán bộ vào các chức vụ này.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** FR-ER-016, FR-CF-037

**Điều kiện tiên quyết:**
*   Danh mục chức vụ đơn vị đã được cấu hình trong FR-CF-037.
*   Đơn vị đã được tạo trong cây tổ chức.

### UC-HRM-009-01: Phân công Chức vụ Đơn vị
1.  Cán bộ TCCB chọn menu "Cơ cấu Tổ chức".
2.  Chọn một đơn vị từ cây tổ chức.
3.  Chọn tab "Chức vụ".
4.  Hệ thống hiển thị các chức vụ của đơn vị dưới dạng thẻ (cards) dựa trên cấu hình loại đơn vị.
5.  Hệ thống hiển thị danh sách chức vụ cần có (theo cấu hình):
    *   Trưởng bộ môn (1 người)
    *   Phó trưởng bộ môn (0-2 người)
    *   Tổ trưởng chuyên môn (nếu có)
6.  Cán bộ TCCB chọn chức vụ "Trưởng bộ môn" và nhấn "Phân công".
7.  Tìm kiếm và chọn giảng viên từ danh sách cán bộ thuộc bộ môn.
8.  Nhập `Ngày bắt đầu` và `Quyết định bổ nhiệm` (số QĐ, ngày QĐ, upload file).
9.  Nhấn "Lưu".
10.  Hệ thống cập nhật và ghi nhận lịch sử bổ nhiệm.
**Luồng ngoại lệ:**
*   **E1: Một người giữ nhiều chức vụ chính**
    *   Hệ thống cảnh báo nếu cán bộ đang giữ chức vụ chính ở bộ môn khác.
    *   Yêu cầu xác nhận hoặc điều chuyển chức vụ cũ trước khi bổ nhiệm mới.
*   **E2: Không phải giảng viên**
    *   Chỉ giảng viên mới được phân công vào chức vụ bộ môn.
    *   Hệ thống kiểm tra và từ chối nếu cán bộ không phải giảng viên.

### UC-HRM-009-02: Miễn nhiệm Chức vụ
1.  Tại tab "Chức vụ", chọn chức vụ đang có người đảm nhiệm.
2.  Nhấn "Miễn nhiệm".
3.  Nhập:
    *   `Ngày miễn nhiệm`
    *   `Lý do` (Hết nhiệm kỳ/Chuyển công tác/Nghỉ hưu/Khác)
    *   `Quyết định miễn nhiệm`
4.  Xác nhận.
5.  Hệ thống cập nhật trạng thái chức vụ thành "Trống" và lưu lịch sử.

### UC-HRM-009-03: Xem Lịch sử Lãnh đạo Đơn vị
1.  Tại chi tiết bộ môn, chọn "Lịch sử lãnh đạo".
2.  Hệ thống hiển thị timeline các đời Trưởng/Phó bộ môn:
    *   Tên cán bộ
    *   Chức vụ
    *   Thời gian đảm nhiệm (từ ngày - đến ngày)
    *   Quyết định bổ nhiệm/miễn nhiệm
3.  Có thể export lịch sử ra PDF.

---

#### 1.3.17. Quản lý lịch sử đơn vị (UC-HRM-010)


**Mô tả:** Quản lý lịch sử thành lập, sáp nhập, giải thể các đơn vị trong trường. Theo dõi sự thay đổi cơ cấu tổ chức qua các thời kỳ.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** FR-OS-005, FR-OS-006

**Điều kiện tiên quyết:**
*   Cán bộ TCCB đã đăng nhập hệ thống.

### UC-HRM-010-01: Ghi nhận Thành lập Đơn vị
1.  Cán bộ TCCB chọn menu "Cơ cấu Tổ chức" -> "Lịch sử đơn vị".
2.  Nhấn "Thêm sự kiện mới".
3.  Chọn loại sự kiện: `Thành lập`.
4.  Chọn đơn vị từ danh sách (hoặc nhập tên đơn vị mới nếu chưa có).
5.  Nhập thông tin:
    *   `Ngày thành lập`
    *   `Quyết định thành lập` (số QĐ, ngày QĐ, cơ quan ban hành)
    *   Upload file quyết định
    *   `Mô tả` (nhiệm vụ, chức năng ban đầu)
6.  Nhấn "Lưu".
**Luồng ngoại lệ:**
*   **E1: Đơn vị đã tồn tại**
    *   Không cho phép thêm sự kiện thành lập cho đơn vị đã có lịch sử thành lập.
    *   Hệ thống thông báo đã tồn tại sự kiện thành lập.

### UC-HRM-010-02: Ghi nhận Sáp nhập Đơn vị
1.  Chọn loại sự kiện: `Sáp nhập`.
2.  Chọn đơn vị bị sáp nhập (có thể chọn nhiều đơn vị).
3.  Chọn đơn vị tiếp nhận sau sáp nhập.
4.  Nhập:
    *   `Ngày sáp nhập`
    *   `Quyết định sáp nhập`
    *   `Phương án xử lý nhân sự` (chuyển sang đơn vị mới/điều chuyển)
5.  Hệ thống tự động cập nhật trạng thái đơn vị bị sáp nhập thành "Đã sáp nhập" và ghi nhận liên kết.
**Luồng ngoại lệ:**
*   **E1: Đơn vị có nhân sự đang hoạt động**
    *   Khi sát nhập đơn vị, nếu còn nhân sự đang thuộc đơn vị.
    *   Hệ thống cảnh báo và yêu cầu hoàn thành điều chuyển nhân sự trước khi sát nhập.

### UC-HRM-010-03: Ghi nhận Giải thể Đơn vị
1.  Chọn loại sự kiện: `Giải thể`.
2.  Chọn đơn vị cần giải thể.
3.  Nhập:
    *   `Ngày giải thể`
    *   `Quyết định giải thể`
    *   `Lý do` (sáp nhập/không hiệu quả/quyết định cơ cấu lại)
    *   `Phương án xử lý nhân sự`
4.  Xác nhận.
5.  Hệ thống cập nhật trạng thái đơn vị thành "Đã giải thể" và đóng mã đơn vị (không cho phép phân công nhân sự mới).
**Luồng ngoại lệ:**
*   **E1: Đơn vị có nhân sự đang hoạt động**
    *   Khi giải thể đơn vị, nếu còn nhân sự đang thuộc đơn vị.
    *   Hệ thống cảnh báo và yêu cầu hoàn thành điều chuyển nhân sự trước khi giải thể.

---

#### 1.3.18. Quản lý đào tạo (UC-HRM-007)


**Mô tả:** Lập kế hoạch, tổ chức các khóa đào tạo và ghi nhận kết quả cho nhân sự.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** HRM-045 đến HRM-052 (Needs 97-105)

### UC-HRM-007-01: Tạo Khóa đào tạo
1.  Cán bộ TCCB chọn menu "Đào tạo & Phát triển".
2.  Nhấn "Tạo khóa đào tạo mới".
3.  Nhập thông tin: Tên khóa, Loại khóa đào tạo theo cấu hình, Thời gian, Địa điểm, Kinh phí, Cam kết sau đào tạo, Chứng chỉ sau đào tạo (Tên chứng chỉ, Loại chứng chỉ).
4.  Thiết lập `Mở đăng ký` (Có/Không, Thời gian mở đăng ký từ ngày - đến ngày, Giới hạn số người tham gia).
5.  Lưu khóa đào tạo.

### UC-HRM-007-02: Sửa Khóa đào tạo
1.  Cán bộ TCCB chọn menu "Đào tạo & Phát triển".
2.  Nhấn "Sửa thông tin khóa đào tạo" trong 1 khóa đào tạo.
3.  Sửa thông tin: Tên khóa, Loại khóa đào tạo theo cấu hình, Thời gian, Địa điểm, Kinh phí, Cam kết sau đào tạo, Chứng chỉ sau đào tạo (Tên chứng chỉ, Loại chứng chỉ).
4.  Thiết lập `Thay đổi thông tin` (Có/Không, Thời gian mở đăng ký từ ngày - đến ngày, Giới hạn số người tham gia).
5.  Lưu khóa đào tạo.

### UC-HRM-007-03: Ghi nhận Kết quả
1.  Cán bộ TCCB chọn Khóa đào tạo -> Tab "Danh sách học viên".
2.  Cập nhật trạng thái cho học viên: `Đang học` -> `Hoàn thành` (hoặc `Không đạt`).
3.  Hệ thống tự động cập nhật chứng chỉ (đã cấu hình tại bước 3 UC-HRM-007-01) vào hồ sơ cá nhân của nhân sự khi trạng thái là `Hoàn thành` (HRM-050).

---

#### 1.3.19. Xem lịch sử thay đổi (UC-HRM-008)


**Mô tả:** Cho phép cán bộ TCCB xem audit trail (lịch sử thay đổi) của hồ sơ nhân sự, bao gồm ai thay đổi, thay đổi gì, và khi nào.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** FR-ER-012

**Điều kiện tiên quyết:**
*   Cán bộ TCCB đã đăng nhập hệ thống.
*   Hồ sơ nhân sự đã có lịch sử thay đổi.

### UC-HRM-008-01: Xem Lịch sử Hồ sơ
1.  Cán bộ TCCB truy cập hồ sơ nhân sự (UC-HRM-001).
2.  Chọn tab "Lịch sử thay đổi" (Audit Trail).
3.  Hệ thống hiển thị danh sách các thay đổi theo thời gian giảm dần:
    *   Ngày giờ thay đổi
    *   Người thực hiện
    *   Loại thay đổi (Thêm mới, Cập nhật, Xóa)
    *   Phần dữ liệu bị thay đổi
4.  Cán bộ TCCB chọn một bản ghi để xem chi tiết.
5.  Hệ thống hiển thị:
    *   Giá trị cũ (trước khi thay đổi)
    *   Giá trị mới (sau khi thay đổi)
    *   Lý do thay đổi (nếu có)

### UC-HRM-008-02: Xuất Lịch sử
1.  Cán bộ TCCB nhấn "Xuất lịch sử".
2.  Chọn khoảng thời gian.
3.  Hệ thống xuất file Excel/PDF chứa toàn bộ lịch sử thay đổi của hồ sơ.

---

#### 1.3.20. Quản lý phê duyệt yêu cầu cập nhật (UC-ADM-001)

**Mô tả:** Cho phép cán bộ TCCB xem và phê duyệt/từ chối các yêu cầu cập nhật thông tin cá nhân do Cán bộ/Giảng viên gửi lên từ cổng Self-Service.
**Actors:** Cán bộ TCCB.
**Liên quan đến Requirements:** Need #140

**Điều kiện tiên quyết:**
*   Cán bộ TCCB đã đăng nhập hệ thống.
*   Có yêu cầu cập nhật đang ở trạng thái "Chờ duyệt".

**Điều kiện sau:**
*   Yêu cầu được chuyển sang trạng thái "Đã duyệt" hoặc "Từ chối".
*   Nếu được duyệt, thông tin hồ sơ cá nhân được cập nhật.
*   Thông báo kết quả được gửi đến CBGV.

### UC-ADM-001-01: Xem danh sách Yêu cầu
1.  Cán bộ TCCB chọn menu "Quản lý Yêu cầu".
2.  Hệ thống hiển thị danh sách các yêu cầu đang chờ duyệt:
    *   Mã nhân sự, Họ tên, Ngày gửi, Loại yêu cầu (SĐT, Địa chỉ, Bằng cấp...)
    *   Mô tả thay đổi
3.  Cán bộ TCCB chọn một yêu cầu để xem chi tiết.
4.  Hệ thống hiển thị:
    *   Giá trị cũ
    *   Giá trị mới đề nghị
    *   Minh chứng đính kèm (nếu có)

### UC-ADM-001-02: Phê duyệt Yêu cầu
1.  Sau khi xem chi tiết, Cán bộ TCCB nhấn "Phê duyệt".
2.  Hệ thống hiển thị form xác nhận.
3.  Cán bộ TCCB nhập ghi chú (nếu cần).
4.  Nhấn "Xác nhận".
5.  Hệ thống:
    *   Cập nhật trạng thái yêu cầu thành "Đã duyệt".
    *   Cập nhật thông tin vào hồ sơ nhân sự.
    *   Ghi log thay đổi.
    *   Gửi thông báo đến CBGV.
**Luồng ngoại lệ:**
*   **E1: Yêu cầu đã bị xử lý bởi người khác**
    *   Nếu cán bộ TCCB khác đã phê duyệt/từ chối trong lúc đang xem.
    *   Hệ thống thông báo "Yêu cầu đã được xử lý" và refresh danh sách.

### UC-ADM-001-03: Từ chối Yêu cầu
1.  Sau khi xem chi tiết, Cán bộ TCCB nhấn "Từ chối".
2.  Hệ thống yêu cầu nhập lý do từ chối (bắt buộc).
3.  Cán bộ TCCB nhập lý do.
4.  Nhấn "Xác nhận".
5.  Hệ thống:
    *   Cập nhật trạng thái yêu cầu thành "Từ chối".
    *   Lưu lý do từ chối.
    *   Gửi thông báo đến CBGV kèm lý do.
**Luồng ngoại lệ:**
*   **E1: Thiếu lý do từ chối**
    *   Nếu từ chối mà không nhập lý do.
    *   Hệ thống báo lỗi và không cho phép xác nhận.

### UC-ADM-001-04: Xem Lịch sử Yêu cầu
1.  Cán bộ TCCB chọn tab "Lịch sử".
2.  Hệ thống hiển thị các yêu cầu đã xử lý (Đã duyệt/Từ chối).
3.  Có thể lọc theo khoảng thời gian, trạng thái, nhân sự.
    
---

#### 1.3.21. Báo cáo và thống kê (UC-RPT-001)


**Mô tả:** Cung cấp các báo cáo tổng hợp, thống kê về tình hình nhân sự cho lãnh đạo.
**Actors:** Lãnh đạo trường, Cán bộ TCCB.
**Liên quan đến Requirements:** RPT-001 đến RPT-006 (Needs 119-127)

### UC-RPT-001-01: Xem Dashboard
1.  Lãnh đạo trường đăng nhập.
2.  Truy cập menu "Báo cáo".
3.  Hệ thống hiển thị Dashboard với các biểu đồ: Tổng nhân sự, Biến động nhân sự, Cơ cấu theo trình độ (RPT-001).

### UC-RPT-001-02: Xuất Báo cáo
1.  Chọn loại báo cáo cụ thể (VD: Báo cáo biến động tháng 1/2026).
2.  Chọn tham số (Khoảng thời gian, Đơn vị).
3.  Nhấn "Xem trước" (Preview).
4.  Nhấn "Xuất Excel" hoặc "Xuất PDF".
5.  Hệ thống trả về file báo cáo theo mẫu (RPT-006).

---

### Nghiệp vụ phòng Tài chính - Kế toán

#### 1.3.22. Xem hồ sơ và dữ liệu lương (UC-FIN-001)

**Mô tả:** Cho phép cán bộ TCKT truy cập xem danh sách nhân sự và các thông tin liên quan đến lương, phụ cấp để phục vụ công tác tính lương. Chế độ xem là Read-only (chỉ đọc).
**Actors:** Cán bộ TCKT.
**Liên quan đến Requirements:** FIN-002, FIN-003 (Need 34)

**Điều kiện tiên quyết:**
*   Cán bộ TCKT đã đăng nhập hệ thống (FIN-001).
*   Quyền hạn được phân là "TCKT" hoặc tương đương.

### UC-FIN-001-01: Xem Danh sách
1.  Cán bộ TCKT truy cập menu "Dữ liệu Lương".
2.  Hệ thống hiển thị danh sách nhân sự toàn trường.
3.  Cán bộ TCKT sử dụng bộ lọc (Đơn vị, Trạng thái) hoặc tìm kiếm theo Tên/Mã.
4.  Hệ thống hiển thị danh sách rút gọn.

### UC-FIN-001-02: Xem Chi tiết Lương
1.  Cán bộ TCKT chọn một nhân sự từ danh sách.
2.  Hệ thống hiển thị màn hình chi tiết nhưng ở chế độ `View-Only`.
3.  Cán bộ TCKT xem được các tab:
    *   **Thông tin chung**: Để xác định đúng người.
    *   **Lương & Phụ cấp**: Xem Ngạch, Bậc, Hệ số lương hiện tại, Các loại phụ cấp và hệ số tương ứng.
    *   **Hợp đồng**: Xem loại hợp đồng để biết chế độ đãi ngộ.
    *   **Công tác phí/Khen thưởng/Kỷ luật**: Xem các quyết định ảnh hưởng đến thu nhập trong kỳ.

---

#### 1.3.23. Xuất dữ liệu lương (UC-FIN-002)


**Mô tả:** Xuất dữ liệu lương và phụ cấp của nhân sự ra file Excel hoặc định dạng chuẩn để import vào phần mềm kế toán/tính lương chuyên dụng.
**Actors:** Cán bộ TCKT.
**Liên quan đến Requirements:** FIN-004 (Need 116)

### UC-FIN-002-01: Luồng chính
1.  Cán bộ TCKT truy cập menu "Xuất Dữ liệu".
2.  Chọn kỳ dữ liệu (Tháng/Năm) chốt số liệu.
3.  Chọn phạm vi xuất (Toàn trường hoặc theo Đơn vị).
4.  Hệ thống hiển thị danh sách nhân sự trong phạm vi xuất
4.  Nhấn "Xuất Excel".
5.  Hệ thống tổng hợp dữ liệu hiện hành (tính đến thời điểm chọn).
6.  Hệ thống tải xuống file Excel chứa: Mã NS, Họ tê, Hệ số lương, Hệ số phụ cấp, Số tài khoản NH, CNT...

### UC-FIN-002-02: Kết nối API (System Flow)
*   Đây không phải là thao tác người dùng trực tiếp trên giao diện web, nhưng là chức năng hệ thống hỗ trợ.
*   Phần mềm Kế toán gọi API lấy danh sách lương.
*   Hệ thống xác thực token API.
*   Hệ thống trả về JSON/XML dữ liệu lương.

---

### Nghiệp vụ Cổng tự phục vụ nhân viên

#### 1.3.24. Xem hồ sơ cá nhân (UC-SSP-001)


**Mô tả:** Cho phép Cán bộ/Giảng viên (CBGV) xem toàn bộ thông tin hồ sơ cá nhân của mình đang được lưu trong hệ thống, tra cứu lịch sử hợp đồng, hệ số, bậc lương, các quyết định khen thưởng và kỷ luật của bản thân..
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-002 (Need 139)

**Điều kiện tiên quyết:**
*   CBGV đã đăng nhập vào Portal (UC-SYS-001).

### UC-SSP-001-01: Xem Hồ sơ Cá nhân (View My Profile)
1.  CBGV chọn menu "Hồ sơ của tôi" (My Profile).
2.  Hệ thống hiển thị trang thông tin cá nhân với các tab:
    *   **Thông tin chung**: Lý lịch, Liên hệ, Gia đình.
    *   **Công việc**: Đơn vị công tác, Chức vụ, Quá trình công tác.
    *   **Trình độ**: Bằng cấp, Chứng chỉ, Học hàm/Học vị.
3.  CBGV xem chi tiết các thông tin.

### UC-SSP-001-02: Tra cứu các thông tin công việc
1.  CBGV chọn menu "Thông tin công việc" trong "Hồ sơ của tôi".
2.  Chọn tab tương ứng: "Hợp đồng", "Trình độ học vấn", "Dữ liệu lương", "Khen thưởng/Kỷ luật".
3.  Hệ thống hiển thị thông tin tương ứng với các tab đã chọn
    **Hợp đồng**: Xem danh sách các HĐ đã ký, Ngày hiệu lực/Hết hạn, Loại HĐ. Tải về bản scan (nếu có).
    **Khen thưởng/Kỷ luật**: Xem danh sách các quyết định, Số quyết định, Nội dung, Hình thức.
    **Hệ số lương/Bậc lương/ Ngạch**: Xem hệ số lương, bậc lương, ngạch.
    **Trình độ học vấn/Bằng cấp/ Chức danh/ Chứng chỉ**: Trình độ học vấn/Bằng cấp/ Chức danh/ Chứng chỉ.

---

#### 1.3.25. Yêu cầu cập nhật thông tin (UC-SSP-002)

**Mô tả:** Cho phép CBGV gửi yêu cầu chỉnh sửa thông tin cá nhân khi có thay đổi (VD: đổi số điện thoại, địa chỉ, thêm bằng cấp mới). Yêu cầu này cần được Phòng TCCB phê duyệt mới có hiệu lực.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-003 (Need 140)

**Điều kiện tiên quyết:**
*   CBGV đang xem hồ sơ cá nhân (UC-SSP-001).

### UC-SSP-002-01: Yêu cầu Cập nhật Thông tin
1.  Tại màn hình hồ sơ, CBGV nhấn nút "Yêu cầu chỉnh sửa".
2.  Hệ thống mở form cho phép sửa một số trường thông tin cho phép (VD: SĐT, Địa chỉ, Email...).
3.  Với các thông tin quan trọng (Bằng cấp...), CBGV nhập thông tin mới và upload minh chứng.
4.  CBGV nhấn "Gửi yêu cầu".
5.  Hệ thống lưu yêu cầu ở trạng thái `Pending` (Chờ duyệt).
6.  Hệ thống gửi thông báo đến Cán bộ TCCB.

### UC-SSP-002-02: Xem trạng thái yêu cầu
1.  CBGV truy cập "Lịch sử yêu cầu".
2.  Hệ thống hiển thị danh sách các yêu cầu đã gửi và trạng thái (Đã duyệt / Từ chối).
3.  Nếu bị Từ chối, xem lý do từ chối.

---

#### 1.3.26. Đào tạo cá nhân (UC-SSP-003)


**Mô tả:** Cho phép CBGV theo dõi lịch sử đào tạo và đăng ký tham gia các khóa học mới do nhà trường tổ chức.
**Actors:** Cán bộ/Giảng viên.
**Liên quan đến Requirements:** SSP-006, SSP-007 (Need 146, 150)

### UC-SSP-003-01: Xem Lịch sử Đào tạo
1.  CBGV chọn menu "Đào tạo".
2.  Hệ thống hiển thị tab "Lịch sử": Danh sách khóa học đã tham gia, Thời gian, Kết quả/Chứng chỉ.

### UC-SSP-003-02: Đăng ký Khóa học
1.  CBGV chọn tab "Khóa học đang mở".
2.  Hệ thống hiển thị danh sách khóa học đang trong thời hạn đăng ký.
3.  CBGV xem chi tiết nội dung, thời gian.
4.  Nhấn nút "Đăng ký tham gia".
5.  Hệ thống ghi nhận đăng ký (có thể cần duyệt tùy cấu hình khóa học).
6.  Trạng thái chuyển thành "Đã đăng ký".
**Luồng ngoại lệ:**
*   **E1: Hết hạn đăng ký**
    *   Nếu thời gian hiện tại nằm ngoài khoảng "Thời gian mở đăng ký".
    *   Hệ thống ẩn nút "Đăng ký" và hiển thị thông báo "Đã hết hạn đăng ký".
*   **E2: Đủ số lượng người tham gia**
    *   Nếu số người đã đăng ký đạt "Giới hạn số người tham gia".
    *   Hệ thống hiển thị thông báo "Khóa học đã đủ số lượng đăng ký" và không cho đăng ký thêm.

---

**Tổng số Use Cases:** 26 use cases

**Kết thúc Tài liệu Đặc tả Use Case**

