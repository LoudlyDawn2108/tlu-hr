# Kế hoạch Quản lý Yêu cầu (Requirements Management Plan)

**Dự án:** Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi  
**Phiên bản:** 1.0  
**Ngày tạo:** 30/01/2026  
**Người lập:** Nhóm phát triển phần mềm

---

## 1. Giới thiệu (Introduction)

### 1.1 Mục đích (Purpose)
Mục đích của Kế hoạch Quản lý Yêu cầu (RMP) này là xác định các quy trình, kỹ thuật và công cụ sẽ được sử dụng để quản lý các yêu cầu của dự án Hệ thống Quản lý Nhân sự (HRMS) cho Trường Đại học Thủy lợi. Tài liệu này đảm bảo rằng các yêu cầu được thu thập, phân tích, lập văn bản, kiểm soát thay đổi và truy vết một cách nhất quán trong suốt vòng đời dự án.

### 1.2 Phạm vi (Scope)
Kế hoạch này áp dụng cho toàn bộ các yêu cầu của dự án HRMS, bao gồm:
- Yêu cầu người dùng (User Requirements)
- Yêu cầu chức năng (Functional Requirements)
- Yêu cầu phi chức năng (Non-functional Requirements)

Kế hoạch bao gồm các hoạt động từ giai đoạn khơi gợi yêu cầu ban đầu cho đến khi hệ thống được chuyển giao và nghiệm thu.

### 1.3 Thuật ngữ và Viết tắt (Definitions and Acronyms)
- **HRMS:** Human Resource Management System (Hệ thống Quản lý Nhân sự).
- **RMP:** Requirements Management Plan (Kế hoạch Quản lý Yêu cầu).
- **CCB:** Change Control Board (Ban Kiểm soát Thay đổi).
- **URS:** User Requirement Specification (Đặc tả Yêu cầu Người dùng).
- **TCCB:** Phòng Tổ chức Cán bộ.
- **TCKT:** Phòng Tài chính - Kế toán.

### 1.4 Tài liệu tham chiếu (References)
1. Tài liệu Đặc tả Yêu cầu Người dùng (user_requirements_hrms.md)
2. Danh sách Nhu cầu (needs_list.md)
3. IBM Rational RequisitePro User's Guide (Tham chiếu cấu trúc)

---

## 2. Quy trình Quản lý Yêu cầu (Requirements Management Process)

### 2.1 Khơi gợi yêu cầu (Requirements Elicitation)
Các yêu cầu được thu thập thông qua các phương pháp sau:
- **Phỏng vấn (Interviews):** Phỏng vấn trực tiếp các bên liên quan chính (stakeholders) như Cán bộ Phòng TCCB, Phòng TCKT, Lãnh đạo nhà trường.
- **Phân tích tài liệu (Document Analysis):** Nghiên cứu các văn bản pháp quy (Luật Viên chức, Luật Lao động), các mẫu biểu báo cáo hiện hành của Trường Đại học Thủy lợi.
- **Hội thảo (Workshops):** Tổ chức các buổi họp với đại diện các phòng ban để thống nhất quy trình nghiệp vụ.

### 2.2 Phân tích yêu cầu (Requirements Analysis)
Sau khi thu thập, các yêu cầu sẽ được phân tích để:
- Phát hiện các xung đột hoặc mâu thuẫn giữa các bên liên quan.
- Xác định độ ưu tiên của yêu cầu.
- Phân rã các yêu cầu cấp cao (Needs) thành các yêu cầu chức năng chi tiết (Features/Functional Requirements).

### 2.3 Đặc tả yêu cầu (Requirements Documentation)
Các yêu cầu được lập văn bản chi tiết trong tài liệu "Đặc tả Yêu cầu Người dùng" (URS) và được quản lý theo các định dạng sau:
- **Use Cases:** Mô tả tương tác giữa người dùng và hệ thống.
- **Danh sách yêu cầu (Requirement List):** Liệt kê chi tiết các yêu cầu với ID duy nhất (ví dụ: FR-ER-001).
- **Mô hình nghiệp vụ:** Sơ đồ quy trình hoạt động.

---

## 3. Công cụ và Môi trường (Tools and Environment)

### 3.1 Công cụ quản lý (Tools)
Dự án sử dụng các công cụ sau để hỗ trợ quản lý yêu cầu:
- **Kho lưu trữ tài liệu:** Git/GitHub để quản lý phiên bản các file tài liệu Markdown (`user_requirements_hrms.md`).
- **Công cụ theo dõi (Tracking):** Sử dụng Issues/Project Board hoặc file Excel/Markdown để theo dõi trạng thái yêu cầu.
- **Định dạng tài liệu:** Markdown cho các tài liệu đặc tả kỹ thuật và Requirement Management Plan.

### 3.2 Cấu trúc lưu trữ
Mỗi yêu cầu được định danh duy nhất và lưu trữ tập trung. Mọi thay đổi đối với yêu cầu phải được cập nhật vào tài liệu chính (Single Source of Truth).

---

## 4. Thuộc tính Yêu cầu (Requirement Attributes)

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

## 5. Truy vết Yêu cầu (Requirements Traceability)

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

## 6. Quản lý Thay đổi Yêu cầu (Requirements Change Management)

Mọi thay đổi đối với các yêu cầu đã được phê duyệt (Baslined Requirements) phải tuân theo quy trình kiểm soát thay đổi nghiêm ngặt.

### 6.1 Ban Kiểm soát Thay đổi (Change Control Board - CCB)
CCB của dự án bao gồm:
- Trưởng dự án (Project Manager)
- Đại diện khách hàng (Trường ĐH Thủy lợi)
- Trưởng nhóm kỹ thuật (Technical Lead)

### 6.2 Quy trình Yêu cầu Thay đổi (Change Request Process)
1. **Gửi yêu cầu (Submit):** Bất kỳ thành viên nào cũng có thể gửi Yêu cầu Thay đổi (Change Request - CR) mô tả thay đổi mong muốn và lý do.
2. **Đánh giá (Evaluate):** Trưởng dự án và nhóm kỹ thuật phân tích tác động của thay đổi đến chi phí, lịch trình và các yêu cầu khác (Impact Analysis).
3. **Phê duyệt/Từ chối (Approve/Reject):** CCB xem xét kết quả phân tích và quyết định phê duyệt hoặc từ chối CR.
4. **Thực hiện (Implement):** Nếu được duyệt, cập nhật tài liệu yêu cầu, thông báo cho đội dự án và tiến hành thực hiện.
5. **Xác nhận (Verify):** Kiểm tra lại thay đổi sau khi hoàn thành.

---

## 7. Báo cáo và Đánh giá (Reports and Milestones)

Các báo cáo quản lý yêu cầu sẽ được tạo định kỳ để theo dõi tiến độ:

- **Báo cáo Trạng thái Yêu cầu (Requirements Status Report):** Tỷ lệ % yêu cầu đã hoàn thành, đang thực hiện, chưa bắt đầu.
- **Báo cáo Ổn định Yêu cầu (Requirements Stability Index):** Số lượng thay đổi yêu cầu theo thời gian.
- **Ma trận Truy vết (Traceability Matrix):** Kiểm tra độ bao phủ của test case đối với yêu cầu.

Các mốc quan trọng (Milestones) cho tài liệu yêu cầu:
1. Phê duyệt sơ bộ danh sách nhu cầu (Needs List Baseline).
2. Phê duyệt tài liệu đặc tả yêu cầu người dùng (URS Baseline).
3. Rà soát yêu cầu lần cuối trước khi UAT (Final Review).
