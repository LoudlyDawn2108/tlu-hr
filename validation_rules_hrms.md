# Tài liệu Đặc tả Quy tắc Validation

# Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi

> **Phiên bản:** 1.1  
> **Ngày tạo:** 28/01/2026  
> **Dự án:** Phân tích và Thiết kế Phần mềm - Hệ thống Quản lý Nhân sự  
> **Đơn vị:** Trường Đại học Thủy lợi (TLU)  
> **Tài liệu liên quan:** user_requirements_hrms.md

---

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Phân loại Quy tắc](#2-phân-loại-quy-tắc)
3. [Module Quản lý Hồ sơ Nhân sự (FR-ER)](#3-module-quản-lý-hồ-sơ-nhân-sự-fr-er)
4. [Module Quản lý Trình độ và Chức danh (FR-QM)](#4-module-quản-lý-trình-độ-và-chức-danh-fr-qm)
5. [Module Quản lý Cơ cấu Tổ chức (FR-OS)](#5-module-quản-lý-cơ-cấu-tổ-chức-fr-os)
6. [Module Quản lý Hợp đồng Lao động (FR-CM)](#6-module-quản-lý-hợp-đồng-lao-động-fr-cm)
7. [Dữ liệu Lương (FR-SD)](#7-dữ-liệu-lương-fr-sd---salary-data-for-external-integration)

8. [Module Đánh giá và Khen thưởng (FR-PR)](#9-module-đánh-giá-và-khen-thưởng-fr-pr)
9. [Module Đào tạo và Phát triển (FR-TD)](#10-module-đào-tạo-và-phát-triển-fr-td)
10. [Module Self-Service Portal (FR-SS)](#11-module-self-service-portal-fr-ss)
11. [Module Báo cáo và Thống kê (FR-RP)](#12-module-báo-cáo-và-thống-kê-fr-rp)
12. [Module Cấu hình Hệ thống (FR-CF)](#13-module-cấu-hình-hệ-thống-fr-cf)
13. [Bảo mật và Kiểm soát Truy cập](#14-bảo-mật-và-kiểm-soát-truy-cập)
14. [Danh mục Mã lỗi (Error Code Registry)](#15-danh-mục-mã-lỗi-error-code-registry)
15. [Quy tắc Validation cho Workflow](#16-quy-tắc-validation-cho-workflow-6-quy-trình-định-sẵn)
16. [Tổng hợp và Thống kê](#17-tổng-hợp-và-thống-kê)
18. [Phụ lục A: Ghi chú Triển khai](#phụ-lục-a-ghi-chú-triển-khai)
19. [Phụ lục B: Regex Patterns](#phụ-lục-b-regex-patterns)
20. [Phụ lục C: Các Kịch bản Validation Liên Module](#phụ-lục-c-các-kịch-bản-validation-liên-module)
21. [Phụ lục D: Edge Cases và Xử lý Đặc biệt](#phụ-lục-d-edge-cases-và-xử-lý-đặc-biệt)
22. [Phụ lục E: Mapping với Database Constraints](#phụ-lục-e-mapping-với-database-constraints)

---

## 1. Giới thiệu

### 1.1 Mục đích tài liệu

Tài liệu này đặc tả chi tiết tất cả các quy tắc validation và ràng buộc dữ liệu (invariants) cần được thực thi trong Hệ thống Quản lý Nhân sự (HRMS) của Trường Đại học Thủy lợi. Tài liệu phục vụ:

- **Đội phát triển:** Làm cơ sở để triển khai validation logic
- **Đội kiểm thử (QA):** Làm checklist để kiểm tra tính đúng đắn của hệ thống
- **Đội vận hành:** Hiểu rõ các thông báo lỗi và cách xử lý

### 1.2 Quy ước Đặt tên

#### Rule ID Format

```
VR-{MODULE}-{NUMBER}
```

| Thành phần | Mô tả | Ví dụ |
|------------|-------|-------|
| VR | Validation Rule prefix | VR |
| MODULE | Mã module (2-3 ký tự) | ER, CM, PB |
| NUMBER | Số thứ tự (3 chữ số) | 001, 002, 003 |

**Ví dụ:** `VR-ER-001` = Validation Rule #001 của module Employee Records

#### Error Code Format

```
ERR_{MODULE}_{NUMBER}
```

**Ví dụ:** `ERR_ER_001` = Error code cho VR-ER-001

### 1.3 Cấu trúc Mỗi Rule

Mỗi quy tắc validation được mô tả với các thuộc tính sau:

| Thuộc tính | Mô tả |
|------------|-------|
| **Rule ID** | Mã định danh duy nhất |
| **Tên rule** | Tên ngắn gọn bằng tiếng Việt |
| **Entity.Field** | Thực thể và trường áp dụng |
| **Loại** | Phân loại constraint (xem Section 2) |
| **Điều kiện** | Mô tả chi tiết điều kiện validation |
| **Thông báo lỗi** | Thông báo hiển thị cho người dùng (tiếng Việt) |
| **Error Code** | Mã lỗi kỹ thuật |
| **Tham chiếu FR** | Requirement ID liên quan |
| **Ghi chú** | Thông tin bổ sung (nếu có) |

---

## 2. Phân loại Quy tắc

### 2.1 Data Validation (Kiểm tra Dữ liệu Đầu vào)

Các quy tắc kiểm tra tính hợp lệ của dữ liệu khi người dùng nhập liệu.

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Required** | Trường bắt buộc phải có giá trị | Họ tên không được để trống |
| **Format** | Giá trị phải đúng định dạng | Email phải có dạng xxx@xxx.xxx |
| **Range** | Giá trị trong khoảng cho phép | Số sinh viên từ 1-200 |
| **Unique** | Giá trị phải duy nhất | Mã nhân viên không được trùng |
| **Length** | Độ dài chuỗi trong giới hạn | Mã lớp tối đa 20 ký tự |

### 2.2 Business Rules (Quy tắc Nghiệp vụ)

Các quy tắc phản ánh logic nghiệp vụ của TLU và quy định pháp luật.

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Calculation** | Công thức tính toán cố định | Lương = Hệ số × Mức lương cơ sở |
| **State Transition** | Chuyển đổi trạng thái hợp lệ | HĐ Thử việc → HĐ Chính thức |
| **Threshold** | Ngưỡng giới hạn nghiệp vụ | Tối đa 2 lần ký HĐ có thời hạn |
| **Temporal** | Ràng buộc thời gian | Ngày kết thúc > Ngày bắt đầu |

### 2.3 Cross-Entity Integrity (Ràng buộc Liên Thực thể)

Các quy tắc đảm bảo tính toàn vẹn giữa các thực thể liên quan.

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Referential** | Tham chiếu đến dữ liệu tồn tại | Phòng ban phải tồn tại trong hệ thống |
| **Dependency** | Phụ thuộc cấu hình | Mỗi ngạch phải có ít nhất 1 bậc lương |
| **Cascade** | Ảnh hưởng lan truyền | Xóa đơn vị cha ảnh hưởng đơn vị con |

### 2.4 Workflow Constraints (Ràng buộc Quy trình)

Các quy tắc kiểm soát luồng phê duyệt và xử lý công việc.

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **Approval Flow** | Thứ tự phê duyệt | Trưởng ĐV → P.TCCB → Hiệu trưởng |
| **Timeout** | Thời hạn xử lý | Phê duyệt trong 24 giờ |
| **Permission** | Quyền thực hiện | Chỉ Trưởng phòng TCCB được phê duyệt |

---

## 3. Module Quản lý Hồ sơ Nhân sự (FR-ER)

### 3.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-ER-001 | Mã cán bộ duy nhất | Employee.EmployeeCode | Unique | Không tồn tại EmployeeCode trùng trong toàn hệ thống | "Mã cán bộ đã tồn tại trong hệ thống. Vui lòng kiểm tra lại." | ERR_ER_001 | FR-ER-009 |
| VR-ER-002 | Mã cán bộ đúng định dạng | Employee.EmployeeCode | Format | Pattern: `[A-Z]{2,4}[0-9]{4,6}` (VD: TCCB001234) | "Mã cán bộ không đúng định dạng. Định dạng: [Mã ĐV][Số thứ tự]" | ERR_ER_002 | FR-ER-009, FR-CF-037 |
| VR-ER-003 | Họ tên bắt buộc | Employee.FullName | Required | FullName không được null hoặc empty | "Vui lòng nhập họ và tên cán bộ." | ERR_ER_003 | FR-ER-001 |
| VR-ER-004 | Họ tên hợp lệ | Employee.FullName | Format | Chỉ chứa chữ cái tiếng Việt và khoảng trắng, 2-100 ký tự | "Họ tên chỉ được chứa chữ cái và khoảng trắng, từ 2-100 ký tự." | ERR_ER_004 | FR-ER-001 |
| VR-ER-005 | Ngày sinh bắt buộc | Employee.DateOfBirth | Required | DateOfBirth không được null | "Vui lòng nhập ngày sinh." | ERR_ER_005 | FR-ER-001 |
| VR-ER-006 | Ngày sinh hợp lệ | Employee.DateOfBirth | Range | 18 ≤ Tuổi ≤ 70 (tính từ ngày hiện tại) | "Tuổi cán bộ phải từ 18 đến 70." | ERR_ER_006 | FR-ER-001 |
| VR-ER-007 | Giới tính bắt buộc | Employee.Gender | Required | Gender không được null | "Vui lòng chọn giới tính." | ERR_ER_007 | FR-ER-001 |
| VR-ER-008 | Giới tính hợp lệ | Employee.Gender | Format | Gender ∈ {Nam, Nữ, Khác} | "Giới tính không hợp lệ." | ERR_ER_008 | FR-ER-001 |
| VR-ER-009 | CCCD bắt buộc | Employee.CitizenId | Required | CitizenId không được null | "Vui lòng nhập số CCCD/CMND." | ERR_ER_009 | FR-ER-001 |
| VR-ER-010 | CCCD đúng định dạng | Employee.CitizenId | Format | 9 hoặc 12 chữ số | "Số CCCD phải có 12 chữ số hoặc CMND phải có 9 chữ số." | ERR_ER_010 | FR-ER-001 |
| VR-ER-011 | CCCD duy nhất | Employee.CitizenId | Unique | Không trùng với CCCD của nhân viên khác | "Số CCCD đã tồn tại trong hệ thống." | ERR_ER_011 | FR-ER-001 |
| VR-ER-012 | Email công việc bắt buộc | Employee.WorkEmail | Required | WorkEmail không được null | "Vui lòng nhập email công việc." | ERR_ER_012 | FR-ER-002 |
| VR-ER-013 | Email đúng định dạng | Employee.WorkEmail | Format | Regex: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | "Email không đúng định dạng." | ERR_ER_013 | FR-ER-002 |
| VR-ER-014 | Email duy nhất | Employee.WorkEmail | Unique | Không trùng với email của nhân viên khác | "Email đã được sử dụng bởi cán bộ khác." | ERR_ER_014 | FR-ER-002 |
| VR-ER-015 | Số điện thoại bắt buộc | Employee.PhoneNumber | Required | Ít nhất một số điện thoại | "Vui lòng nhập ít nhất một số điện thoại liên hệ." | ERR_ER_015 | FR-ER-002 |
| VR-ER-016 | Số điện thoại đúng định dạng | Employee.PhoneNumber | Format | 10-11 chữ số, bắt đầu bằng 0 | "Số điện thoại phải có 10-11 chữ số và bắt đầu bằng số 0." | ERR_ER_016 | FR-ER-002 |
| VR-ER-017 | Mã số thuế đúng định dạng | Employee.TaxCode | Format | 10 hoặc 13 chữ số (nếu có) | "Mã số thuế phải có 10 hoặc 13 chữ số." | ERR_ER_017 | FR-ER-003 |
| VR-ER-018 | Số tài khoản ngân hàng bắt buộc | Employee.BankAccount | Required | BankAccount không được null cho nhân viên chính thức | "Vui lòng nhập số tài khoản ngân hàng để nhận lương." | ERR_ER_018 | FR-ER-005 |
| VR-ER-019 | Ngân hàng bắt buộc khi có TK | Employee.BankName | Required | Nếu BankAccount != null thì BankName không được null | "Vui lòng chọn ngân hàng." | ERR_ER_019 | FR-ER-005 |
| VR-ER-020 | Ảnh thẻ bắt buộc | Employee.Photo | Required | Photo không được null | "Vui lòng tải lên ảnh thẻ cán bộ." | ERR_ER_020 | FR-ER-004 |
| VR-ER-021 | Ảnh thẻ đúng định dạng | Employee.Photo | Format | Định dạng: JPG, PNG, JPEG; Kích thước: < 2MB; Tỷ lệ: 3x4 hoặc 4x6 | "Ảnh phải có định dạng JPG/PNG, kích thước < 2MB." | ERR_ER_021 | FR-ER-004 |
| VR-ER-022 | Số người phụ thuộc hợp lệ | Employee.DependentCount | Range | DependentCount >= 0 | "Số người phụ thuộc không được âm." | ERR_ER_022 | FR-ER-003 |

### 3.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-ER-023 | Không xóa hồ sơ nhân viên | Employee | State Transition | Không cho phép DELETE, chỉ UPDATE Status = Inactive | "Không thể xóa hồ sơ cán bộ. Vui lòng đánh dấu nghỉ việc thay vì xóa." | ERR_ER_023 | Section 2.4.2 |
| VR-ER-024 | Nhân viên nghỉ việc không đăng nhập | Employee.Status, User.IsActive | State Transition | Nếu Employee.Status = Resigned thì User.IsActive = false | "Tài khoản đã bị vô hiệu hóa do cán bộ đã nghỉ việc." | ERR_ER_024 | Section 2.4.2 |
| VR-ER-025 | Tên hiển thị theo chuẩn | Employee.DisplayName | Calculation | DisplayName = [Học hàm] + [Học vị] + [Họ tên] (VD: PGS.TS. Nguyễn Văn A) | N/A (auto-generated) | N/A | FR-ER-017 |
| VR-ER-026 | Audit trail bắt buộc | Employee.* | Business Logic | Mọi thay đổi phải ghi log: Người thay đổi, Thời gian, Giá trị cũ, Giá trị mới | N/A (system) | N/A | FR-ER-012 |

### 3.3 Cross-Entity Rules

| Rule ID | Tên rule | Entities | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|----------|------|-----------|---------------|------------|------------|
| VR-ER-027 | Đơn vị công tác tồn tại | Employee.DepartmentId → Department | Referential | DepartmentId phải tồn tại trong bảng Department với Status = Active | "Đơn vị công tác không tồn tại hoặc đã ngừng hoạt động." | ERR_ER_027 | FR-ER-006 |
| VR-ER-028 | Chức danh nghề nghiệp tồn tại | Employee.AcademicTitleId → AcademicTitle | Referential | AcademicTitleId phải tồn tại trong danh mục chức danh | "Chức danh nghề nghiệp không hợp lệ." | ERR_ER_028 | FR-ER-001 |
| VR-ER-029 | Quốc tịch tồn tại | Employee.NationalityId → Country | Referential | NationalityId phải tồn tại trong danh mục quốc gia | "Quốc tịch không hợp lệ." | ERR_ER_029 | FR-ER-001 |
| VR-ER-030 | Dân tộc tồn tại | Employee.EthnicityId → Ethnicity | Referential | EthnicityId phải tồn tại trong danh mục dân tộc Việt Nam | "Dân tộc không hợp lệ." | ERR_ER_030 | FR-ER-001 |

---

## 4. Module Quản lý Trình độ và Chức danh (FR-QM)

### 4.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-QM-001 | Tên bằng cấp bắt buộc | Degree.DegreeName | Required | DegreeName không được null | "Vui lòng nhập tên bằng cấp/chứng chỉ." | ERR_QM_001 | FR-QM-002 |
| VR-QM-002 | Chuyên ngành bắt buộc | Degree.Major | Required | Major không được null | "Vui lòng nhập chuyên ngành đào tạo." | ERR_QM_002 | FR-QM-002 |
| VR-QM-003 | Cơ sở đào tạo bắt buộc | Degree.Institution | Required | Institution không được null | "Vui lòng nhập tên cơ sở đào tạo." | ERR_QM_003 | FR-QM-002 |
| VR-QM-004 | Năm tốt nghiệp bắt buộc | Degree.GraduationYear | Required | GraduationYear không được null | "Vui lòng nhập năm tốt nghiệp." | ERR_QM_004 | FR-QM-002 |
| VR-QM-005 | Năm tốt nghiệp hợp lệ | Degree.GraduationYear | Range | 1950 ≤ GraduationYear ≤ Năm hiện tại | "Năm tốt nghiệp không hợp lệ." | ERR_QM_005 | FR-QM-002 |
| VR-QM-006 | Loại bằng bắt buộc | Degree.DegreeType | Required | DegreeType không được null | "Vui lòng chọn loại bằng cấp." | ERR_QM_006 | FR-QM-002 |
| VR-QM-007 | Xếp loại tốt nghiệp hợp lệ | Degree.Classification | Format | Classification ∈ {Xuất sắc, Giỏi, Khá, Trung bình, Trung bình Khá} | "Xếp loại tốt nghiệp không hợp lệ." | ERR_QM_007 | FR-QM-002 |
| VR-QM-008 | Ngày hết hạn chứng chỉ | Certificate.ExpiryDate | Range | ExpiryDate > Ngày cấp (nếu có) | "Ngày hết hạn phải sau ngày cấp chứng chỉ." | ERR_QM_008 | FR-QM-005 |
| VR-QM-009 | Số hiệu văn bằng | Degree.DegreeNumber | Format | Alphanumeric, tối đa 50 ký tự | "Số hiệu văn bằng không hợp lệ." | ERR_QM_009 | FR-QM-002 |

### 4.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-QM-010 | Cảnh báo chứng chỉ sắp hết hạn | Certificate.ExpiryDate | Threshold | Cảnh báo khi ExpiryDate - Today ≤ Ngưỡng cấu hình (mặc định 30 ngày) | "Chứng chỉ [Tên] của [Họ tên] sẽ hết hạn trong [X] ngày." | ERR_QM_010 | FR-QM-006 |
| VR-QM-011 | Giảng viên phải có bằng Thạc sĩ trở lên | Employee.AcademicTitle, Degree.DegreeType | Threshold | Nếu AcademicTitle ∈ {GV, GVC, GVCC} thì phải có ít nhất 1 Degree với DegreeType ∈ {Thạc sĩ, Tiến sĩ, TSKH} | "Giảng viên đại học phải có trình độ Thạc sĩ trở lên." | ERR_QM_011 | Section 2.2.3 |
| VR-QM-012 | Ngoại ngữ theo chuẩn | ForeignLanguage.Standard | Format | Chuẩn quốc tế: IELTS (0-9), TOEFL (0-120), TOEIC (0-990), HSK (1-6) | "Điểm ngoại ngữ không hợp lệ theo thang điểm chuẩn." | ERR_QM_012 | Section 2.2.2 |

### 4.3 Cross-Entity Rules

| Rule ID | Tên rule | Entities | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|----------|------|-----------|---------------|------------|------------|
| VR-QM-013 | Loại bằng tồn tại | Degree.DegreeTypeId → DegreeType | Referential | DegreeTypeId phải tồn tại trong danh mục loại bằng | "Loại bằng cấp không hợp lệ." | ERR_QM_013 | FR-QM-002, FR-CF-037 |
| VR-QM-014 | Loại chứng chỉ tồn tại | Certificate.CertTypeId → CertificateType | Referential | CertTypeId phải tồn tại trong danh mục loại chứng chỉ | "Loại chứng chỉ không hợp lệ." | ERR_QM_014 | FR-QM-005, FR-CF-037 |
| VR-QM-015 | Học hàm tồn tại | Employee.AcademicRankId → AcademicRank | Referential | AcademicRankId phải tồn tại trong danh mục học hàm (GS, PGS) | "Học hàm không hợp lệ." | ERR_QM_015 | FR-QM-003, FR-CF-037 |
| VR-QM-016 | Ngạch viên chức tồn tại | Employee.CivilServiceGradeId → CivilServiceGrade | Referential | CivilServiceGradeId phải tồn tại trong danh mục ngạch | "Ngạch viên chức không hợp lệ." | ERR_QM_016 | FR-QM-004, FR-CF-037 |

---

## 5. Module Quản lý Cơ cấu Tổ chức (FR-OS)

### 5.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-OS-001 | Mã đơn vị duy nhất | Department.DeptCode | Unique | Không tồn tại DeptCode trùng | "Mã đơn vị đã tồn tại trong hệ thống." | ERR_OS_001 | FR-OS-004 |
| VR-OS-002 | Mã đơn vị đúng định dạng | Department.DeptCode | Format | 2-10 ký tự, chữ in hoa và số | "Mã đơn vị chỉ được chứa chữ in hoa và số, từ 2-10 ký tự." | ERR_OS_002 | FR-OS-004 |
| VR-OS-003 | Tên đơn vị bắt buộc | Department.DeptName | Required | DeptName không được null | "Vui lòng nhập tên đơn vị." | ERR_OS_003 | FR-OS-004 |
| VR-OS-004 | Tên đơn vị duy nhất trong cùng cấp | Department.DeptName, ParentId | Unique | Không trùng tên với đơn vị cùng ParentId | "Tên đơn vị đã tồn tại trong cùng đơn vị cha." | ERR_OS_004 | FR-OS-004 |
| VR-OS-005 | Loại đơn vị bắt buộc | Department.DeptType | Required | DeptType không được null | "Vui lòng chọn loại đơn vị." | ERR_OS_005 | FR-OS-001 |
| VR-OS-006 | Ngày thành lập hợp lệ | Department.EstablishedDate | Range | EstablishedDate ≤ Ngày hiện tại | "Ngày thành lập không được trong tương lai." | ERR_OS_006 | FR-OS-004 |

### 5.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-OS-007 | Không xóa đơn vị đang hoạt động | Department.Status | State Transition | Chỉ xóa được đơn vị khi Status = Inactive AND không có nhân viên | "Không thể xóa đơn vị đang hoạt động hoặc còn nhân viên." | ERR_OS_007 | FR-OS-004 |
| VR-OS-008 | Kiểm tra định biên | Position.CurrentCount, Position.Quota | Threshold | CurrentCount ≤ Quota | "Vị trí đã đủ định biên ([X]/[Y]). Không thể thêm nhân sự." | ERR_OS_008 | Wireframe 07 |
| VR-OS-009 | Nhiệm kỳ lãnh đạo hợp lệ | Leadership.StartDate, EndDate | Temporal | StartDate < EndDate | "Ngày kết thúc nhiệm kỳ phải sau ngày bắt đầu." | ERR_OS_009 | FR-OS-006 |
| VR-OS-010 | Không có vòng lặp phân cấp | Department.ParentId | Business Logic | Đơn vị không được là cha/ông của chính nó (tránh circular reference) | "Không thể chọn đơn vị con làm đơn vị cha." | ERR_OS_010 | FR-OS-002 |

### 5.3 Cross-Entity Rules

| Rule ID | Tên rule | Entities | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|----------|------|-----------|---------------|------------|------------|
| VR-OS-011 | Đơn vị cha tồn tại | Department.ParentId → Department | Referential | ParentId phải tồn tại (trừ root) | "Đơn vị cha không tồn tại." | ERR_OS_011 | FR-OS-002 |
| VR-OS-012 | Loại đơn vị tồn tại | Department.DeptTypeId → DepartmentType | Referential | DeptTypeId phải tồn tại trong danh mục loại đơn vị | "Loại đơn vị không hợp lệ." | ERR_OS_012 | FR-OS-001, FR-CF-037 |
| VR-OS-013 | Cơ sở tồn tại | Department.CampusId → Campus | Referential | CampusId phải tồn tại trong danh mục cơ sở | "Cơ sở không hợp lệ." | ERR_OS_013 | FR-OS-007, FR-CF-037 |
| VR-OS-014 | Loại bổ nhiệm tồn tại | Assignment.AssignmentTypeId → AssignmentType | Referential | AssignmentTypeId phải tồn tại | "Loại bổ nhiệm không hợp lệ." | ERR_OS_014 | FR-OS-008, FR-CF-037 |

---

## 6. Module Quản lý Hợp đồng Lao động (FR-CM)

### 6.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-CM-001 | Số hợp đồng duy nhất | Contract.ContractNumber | Unique | Không tồn tại ContractNumber trùng | "Số hợp đồng đã tồn tại trong hệ thống." | ERR_CM_001 | FR-CM-002 |
| VR-CM-002 | Số hợp đồng đúng định dạng | Contract.ContractNumber | Format | Pattern: `HD-[YYYY]-[NNNNNN]` (VD: HD-2026-000156) | "Số hợp đồng không đúng định dạng." | ERR_CM_002 | FR-CM-002 |
| VR-CM-003 | Ngày bắt đầu bắt buộc | Contract.StartDate | Required | StartDate không được null | "Vui lòng nhập ngày bắt đầu hợp đồng." | ERR_CM_003 | FR-CM-002 |
| VR-CM-004 | Loại hợp đồng bắt buộc | Contract.ContractType | Required | ContractType không được null | "Vui lòng chọn loại hợp đồng." | ERR_CM_004 | FR-CM-001 |
| VR-CM-005 | Ngày kết thúc bắt buộc cho HĐ có thời hạn | Contract.EndDate | Required | Nếu ContractType = FixedTerm thì EndDate không được null | "Hợp đồng có thời hạn phải có ngày kết thúc." | ERR_CM_005 | FR-CM-002 |
| VR-CM-006 | Chức danh trong HĐ bắt buộc | Contract.PositionTitle | Required | PositionTitle không được null | "Vui lòng nhập chức danh trong hợp đồng." | ERR_CM_006 | FR-CM-002 |
| VR-CM-007 | Hệ số lương bắt buộc | Contract.SalaryCoefficient | Required | SalaryCoefficient không được null | "Vui lòng nhập hệ số lương." | ERR_CM_007 | FR-CM-002 |
| VR-CM-008 | Hệ số lương hợp lệ | Contract.SalaryCoefficient | Range | 1.0 ≤ SalaryCoefficient ≤ 10.0 | "Hệ số lương phải từ 1.0 đến 10.0." | ERR_CM_008 | FR-CM-002 |

### 6.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-CM-009 | Ngày kết thúc sau ngày bắt đầu | Contract.StartDate, EndDate | Temporal | EndDate > StartDate | "Ngày kết thúc hợp đồng phải sau ngày bắt đầu." | ERR_CM_009 | FR-CM-002, Section 2.4.2 |
| VR-CM-010 | Thời hạn HĐ trong giới hạn | Contract.Duration | Range | MinDuration ≤ Duration ≤ MaxDuration (theo ContractType config) | "Thời hạn hợp đồng không nằm trong khoảng cho phép của loại HĐ này." | ERR_CM_010 | FR-CM-011, FR-CF-013 |
| VR-CM-011 | Không tạo HĐ trong quá khứ | Contract.StartDate | Temporal | StartDate ≥ Ngày hiện tại (trừ nhập liệu ban đầu với quyền đặc biệt) | "Không thể tạo hợp đồng với ngày bắt đầu trong quá khứ." | ERR_CM_011 | Section 2.4.2 |
| VR-CM-012 | Giới hạn số lần ký HĐ có thời hạn | Contract.ContractType, Employee | Threshold | Tối đa 2 lần ký HĐ có thời hạn liên tiếp | "Đã ký 2 lần hợp đồng có thời hạn. Vui lòng chuyển sang HĐ không xác định thời hạn." | ERR_CM_012 | FR-CM-013, FR-CF-014 |
| VR-CM-013 | Thời gian thử việc theo quy định | Contract.TrialPeriod | Threshold | TrialPeriod ≤ MaxTrialPeriod (theo PositionLevel config) | "Thời gian thử việc vượt quá mức tối đa cho vị trí này." | ERR_CM_013 | FR-CM-006, FR-CF-015 |
| VR-CM-014 | Chuyển đổi trạng thái HĐ hợp lệ | Contract.Status | State Transition | Chỉ chuyển: Draft→Pending→Active→Expired/Terminated | "Không thể chuyển trạng thái hợp đồng theo hướng này." | ERR_CM_014 | Section 2.4.2 |
| VR-CM-015 | Cảnh báo HĐ sắp hết hạn | Contract.EndDate | Threshold | Cảnh báo khi EndDate - Today ≤ Ngưỡng cấu hình (mặc định 30 ngày) | "Hợp đồng của [Họ tên] sẽ hết hạn trong [X] ngày." | ERR_CM_015 | FR-CM-005 |
| VR-CM-016 | Giấy phép lao động cho chuyên gia nước ngoài | Contract.WorkPermit | Required | Nếu Employee.Nationality ≠ Vietnam thì WorkPermit bắt buộc | "Chuyên gia nước ngoài phải có giấy phép lao động." | ERR_CM_016 | FR-CM-009 |
| VR-CM-017 | Đề xuất chuyển đổi HĐ | Contract.ContractType | Business Logic | Hệ thống tự động đề xuất chuyển HĐ có thời hạn → Không xác định thời hạn sau 2 lần ký | N/A (suggestion) | N/A | FR-CM-012, FR-CF-016 |
| VR-CM-018 | Không chồng chéo thời gian HĐ | Contract.StartDate, EndDate, EmployeeId | Temporal | Một nhân viên không có 2 HĐ active cùng thời điểm | "Nhân viên đã có hợp đồng đang hiệu lực trong khoảng thời gian này." | ERR_CM_018 | FR-CM-002 |

### 6.3 Cross-Entity Rules

| Rule ID | Tên rule | Entities | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|----------|------|-----------|---------------|------------|------------|
| VR-CM-019 | Loại hợp đồng tồn tại | Contract.ContractTypeId → ContractType | Referential | ContractTypeId phải tồn tại trong cấu hình | "Loại hợp đồng không hợp lệ." | ERR_CM_019 | FR-CM-001, FR-CF-012 |
| VR-CM-020 | Nhân viên tồn tại | Contract.EmployeeId → Employee | Referential | EmployeeId phải tồn tại và Status ≠ Resigned | "Nhân viên không tồn tại hoặc đã nghỉ việc." | ERR_CM_020 | FR-CM-002 |

---

## 7. Dữ liệu Lương (FR-SD) - Salary Data for External Integration

> [!NOTE]
> **Module này KHÔNG tính toán lương.** Chỉ lưu trữ và validate dữ liệu để hệ thống bên ngoài truy xuất.

### 8.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-SD-001 | Ngạch lương bắt buộc | EmployeeSalary.GradeId | Required | GradeId không được null | "Vui lòng chọn ngạch lương." | ERR_SD_001 | FR-SD-001 |
| VR-SD-002 | Bậc lương bắt buộc | EmployeeSalary.StepId | Required | StepId không được null | "Vui lòng chọn bậc lương." | ERR_SD_002 | FR-SD-002 |
| VR-SD-003 | Hệ số lương dương | EmployeeSalary.Coefficient | Range | Coefficient > 0 | "Hệ số lương phải lớn hơn 0." | ERR_SD_003 | FR-SD-002 |
| VR-SD-004 | Bậc lương hợp lệ | EmployeeSalary.Step | Range | 1 ≤ Step ≤ MaxStep (theo ngạch) | "Bậc lương không hợp lệ cho ngạch này." | ERR_SD_004 | FR-CF-004 |
| VR-SD-005 | Ngày hiệu lực bắt buộc | EmployeeSalary.EffectiveDate | Required | EffectiveDate không được null | "Vui lòng chọn ngày hiệu lực." | ERR_SD_005 | FR-SD-003 |

### 8.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-SD-006 | Tính số năm thâm niên | Employee.SeniorityYears | Calculation | SeniorityYears = YEAR(Today) - YEAR(JoinDate) | N/A (auto-calculated) | N/A | FR-SD-005 |
| VR-SD-007 | Số tài khoản ngân hàng hợp lệ | Employee.BankAccount | Format | Regex: ^[0-9]{8,20}$ | "Số tài khoản ngân hàng không hợp lệ." | ERR_SD_007 | FR-SD-007 |

### 8.3 Cross-Entity Rules

| Rule ID | Tên rule | Entities | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|----------|------|-----------|---------------|------------|------------|
| VR-SD-008 | Ngạch lương tồn tại | EmployeeSalary.GradeId → CfgSalaryGrade | Referential | GradeId phải tồn tại trong danh mục ngạch | "Ngạch lương không hợp lệ." | ERR_SD_008 | FR-CF-002 |
| VR-SD-009 | Bậc lương thuộc ngạch | EmployeeSalary.StepId, GradeId | Referential | Bậc phải thuộc ngạch đã chọn | "Bậc lương không thuộc ngạch đã chọn." | ERR_SD_009 | FR-CF-004 |
| VR-SD-010 | Người phụ thuộc có MST | Dependent.TaxId | Format | Regex MST hợp lệ (nếu có) | "Mã số thuế người phụ thuộc không hợp lệ." | ERR_SD_010 | FR-SD-006 |

---



## 8. Module Đánh giá và Khen thưởng (FR-PR)

### 8.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-PR-001 | Kỳ đánh giá bắt buộc | Evaluation.EvaluationCycleId | Required | EvaluationCycleId không được null | "Vui lòng chọn kỳ đánh giá." | ERR_PR_001 | Wireframe 10 |
| VR-PR-002 | Điểm trong thang điểm | EvaluationScore.Score | Range | 0 ≤ Score ≤ MaxScore (theo tiêu chí) | "Điểm phải từ 0 đến [MaxScore] cho tiêu chí này." | ERR_PR_002 | Wireframe 10 |
| VR-PR-003 | Nhận xét đánh giá tối thiểu | Evaluation.Comment | Length | Comment.Length ≥ 50 ký tự (cho đánh giá bắt buộc) | "Vui lòng nhập nhận xét đánh giá (ít nhất 50 ký tự)." | ERR_PR_003 | Wireframe 10 |

### 8.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-PR-004 | Công thức điểm tổng | Evaluation.TotalScore | Calculation | TotalScore = Σ(Score × Weight) / Σ(Weight) | N/A (auto-calculated) | N/A | FR-CF-082 |
| VR-PR-005 | Phân loại đánh giá | Evaluation.Classification | Calculation | ≥90: Xuất sắc, ≥70: Tốt, ≥50: Hoàn thành, <50: Không hoàn thành | N/A (from config) | N/A | FR-CF-083 |
| VR-PR-006 | Giới hạn tỷ lệ Xuất sắc | Evaluation.Classification | Threshold | Số đánh giá "Xuất sắc" ≤ 15% tổng số đánh giá trong đơn vị | "Tỷ lệ xếp loại Xuất sắc đã vượt 15% trong đơn vị. Vui lòng xem xét lại." | ERR_PR_006 | Wireframe 10 |
| VR-PR-007 | Quy trình đánh giá theo workflow | Evaluation.Status | Approval Flow | Tự đánh giá → Trưởng ĐV → P.TCCB → Hội đồng → Hiệu trưởng | "Đánh giá phải tuân theo quy trình phê duyệt." | ERR_PR_007 | FR-CF-092 |
| VR-PR-008 | Không sửa sau khi phê duyệt | Evaluation.Status | State Transition | Nếu Status = Approved thì không cho phép UPDATE | "Không thể sửa đánh giá đã được phê duyệt." | ERR_PR_008 | Wireframe 10 |

### 8.3 Cross-Entity Rules

| Rule ID | Tên rule | Entities | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|----------|------|-----------|---------------|------------|------------|
| VR-PR-009 | Kỳ đánh giá tồn tại | Evaluation.EvaluationCycleId → EvaluationCycle | Referential | EvaluationCycleId phải tồn tại và Status = Active | "Kỳ đánh giá không tồn tại hoặc đã đóng." | ERR_PR_009 | FR-CF-080 |
| VR-PR-010 | Mẫu đánh giá có tiêu chí | EvaluationType → EvaluationCriteria | Dependency | Mỗi loại đánh giá phải có ít nhất 1 tiêu chí | "Mẫu đánh giá chưa có tiêu chí. Vui lòng cấu hình trước khi sử dụng." | ERR_PR_010 | FR-CF-082, Section 2.4.4 |
| VR-PR-011 | Mẫu đánh giá có ngưỡng phân loại | EvaluationType → ClassificationThreshold | Dependency | Mỗi loại đánh giá phải có ngưỡng phân loại | "Mẫu đánh giá chưa có ngưỡng phân loại." | ERR_PR_011 | FR-CF-083, Section 2.4.4 |

---

## 9. Module Đào tạo và Phát triển (FR-TD)

### 9.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-TD-001 | Tên khóa đào tạo bắt buộc | TrainingCourse.CourseName | Required | CourseName không được null | "Vui lòng nhập tên khóa đào tạo." | ERR_TD_001 | Wireframe 11 |
| VR-TD-002 | Ngày bắt đầu khóa học bắt buộc | TrainingCourse.StartDate | Required | StartDate không được null | "Vui lòng chọn ngày bắt đầu khóa học." | ERR_TD_002 | Wireframe 11 |
| VR-TD-003 | Sức chứa khóa học hợp lệ | TrainingCourse.Capacity | Range | Capacity > 0 | "Sức chứa khóa học phải lớn hơn 0." | ERR_TD_003 | Wireframe 11 |

### 9.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-TD-004 | Không vượt quá sức chứa | TrainingRegistration.Count, TrainingCourse.Capacity | Threshold | RegistrationCount ≤ Capacity | "Khóa học đã đủ số lượng đăng ký ([X]/[Y])." | ERR_TD_004 | Wireframe 11 |
| VR-TD-005 | Cam kết phục vụ sau đào tạo | TrainingCommitment.ServiceDuration | Calculation | ServiceDuration = TrainingDuration × 3 | N/A (business rule) | N/A | Wireframe 11 |
| VR-TD-006 | Bồi thường khi vi phạm cam kết | TrainingCommitment.CompensationAmount | Calculation | Theo quy định nội bộ TLU | N/A (business rule) | N/A | Wireframe 11 |
| VR-TD-007 | Kết quả đào tạo hợp lệ | TrainingRecord.Result | Format | Result ∈ {Xuất sắc, Giỏi, Khá, Đạt, Không đạt} | "Kết quả đào tạo không hợp lệ." | ERR_TD_007 | Wireframe 11 |
| VR-TD-008 | Ngày kết thúc sau ngày bắt đầu | TrainingCourse.StartDate, EndDate | Temporal | EndDate > StartDate | "Ngày kết thúc khóa học phải sau ngày bắt đầu." | ERR_TD_008 | Wireframe 11 |

---

## 10. Module Self-Service Portal (FR-SS)

### 10.1 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|

| VR-SS-002 | Người phê duyệt tự động theo cấu trúc | LeaveRequest.ApproverId | Calculation | Approver = Trưởng đơn vị của Employee | N/A (auto-assigned) | N/A | Wireframe 05 |
| VR-SS-003 | Đăng ký người phụ thuộc cần chứng từ | Dependent.Documentation | Required | Phải có file đính kèm chứng từ | "Vui lòng đính kèm giấy tờ xác nhận người phụ thuộc." | ERR_SS_003 | FR-SS-009 |
| VR-SS-004 | Xem phiếu lương cần xác thực | PayslipView.Authentication | Permission | Yêu cầu nhập mật khẩu/PIN để xem chi tiết lương | "Vui lòng nhập mật khẩu để xem thông tin lương." | ERR_SS_004 | Wireframe 05 |

---

## 11. Module Báo cáo và Thống kê (FR-RP)

### 11.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-RP-001 | Ngày bắt đầu báo cáo bắt buộc | Report.StartDate | Required | StartDate không được null | "Vui lòng chọn ngày bắt đầu." | ERR_RP_001 | Wireframe 12 |
| VR-RP-002 | Ngày kết thúc báo cáo bắt buộc | Report.EndDate | Required | EndDate không được null | "Vui lòng chọn ngày kết thúc." | ERR_RP_002 | Wireframe 12 |
| VR-RP-003 | Ngày kết thúc sau ngày bắt đầu | Report.StartDate, EndDate | Temporal | EndDate ≥ StartDate | "Ngày kết thúc phải bằng hoặc sau ngày bắt đầu." | ERR_RP_003 | Wireframe 12 |

### 11.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-RP-004 | Định dạng xuất báo cáo hợp lệ | Report.ExportFormat | Format | ExportFormat ∈ {Excel, PDF, Word} | "Định dạng xuất không được hỗ trợ." | ERR_RP_004 | FR-RP-008 |
| VR-RP-005 | Báo cáo lương cần quyền đặc biệt | Report.Type, User.Permission | Permission | Báo cáo lương chỉ hiển thị cho user có quyền ViewSalary | "Bạn không có quyền xem báo cáo lương." | ERR_RP_005 | Wireframe 12 |

### 11.3 Cross-Entity Rules

| Rule ID | Tên rule | Entities | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|----------|------|-----------|---------------|------------|------------|
| VR-RP-006 | Đơn vị báo cáo tồn tại | Report.DepartmentId → Department | Referential | DepartmentId phải tồn tại (nếu có) | "Đơn vị không tồn tại." | ERR_RP_006 | Wireframe 12 |

---

## 12. Module Cấu hình Hệ thống (FR-CF)

### 12.1 Data Validation Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-CF-001 | Tên danh mục bắt buộc | MasterData.Name | Required | Name không được null | "Vui lòng nhập tên danh mục." | ERR_CF_001 | FR-CF-037 |
| VR-CF-002 | Mã danh mục duy nhất | MasterData.Code | Unique | Code không được trùng trong cùng loại danh mục | "Mã đã tồn tại trong danh mục này." | ERR_CF_002 | FR-CF-037 |
| VR-CF-003 | Tỷ lệ bảo hiểm hợp lệ | InsuranceRate.Rate | Range | 0 < Rate < 100 | "Tỷ lệ bảo hiểm phải từ 0% đến 100%." | ERR_CF_003 | Wireframe 06 |
| VR-CF-004 | Mức lương cơ sở dương | BaseSalaryRate.Value | Range | Value > 0 | "Mức lương cơ sở phải lớn hơn 0." | ERR_CF_004 | FR-CF-001 |
| VR-CF-005 | Ngày hiệu lực bắt buộc | Configuration.EffectiveDate | Required | EffectiveDate không được null | "Vui lòng chọn ngày hiệu lực." | ERR_CF_005 | FR-CF-081 |

### 12.2 Business Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-CF-006 | Ngày hiệu lực không trong quá khứ | Configuration.EffectiveDate | Temporal | EffectiveDate ≥ Today | "Ngày hiệu lực không được trong quá khứ." | ERR_CF_006 | Section 2.4.2 |
| VR-CF-007 | Tạo phiên bản mới khi thay đổi | Configuration.Version | Business Logic | Mỗi thay đổi tạo Version mới, giữ nguyên Version cũ | N/A (system) | N/A | FR-CF-081-085 |

| VR-CF-009 | Không xóa danh mục đang sử dụng | MasterData.Status, UsageCount | State Transition | Chỉ xóa khi UsageCount = 0, hoặc đánh dấu Inactive | "Không thể xóa danh mục đang được sử dụng. Vui lòng đánh dấu ngừng hoạt động." | ERR_CF_009 | FR-CF-041 |
| VR-CF-010 | Validate tham số theo định nghĩa | Parameter.Value | Business Logic | Value phải thỏa mãn min, max, required, format của ParameterDefinition | "Giá trị [X] không hợp lệ. [Chi tiết lỗi từ định nghĩa]." | ERR_CF_010 | FR-CF-074, FR-CF-112 |
| VR-CF-011 | Khoảng năm thâm niên liên tục | SeniorityStep.YearRange | Business Logic | Các khoảng năm phải liên tục, không chồng chéo | "Các khoảng năm phải liên tục và không được chồng chéo." | ERR_CF_011 | Wireframe 06 |

### 12.3 Cross-Entity Rules (Configuration Dependencies)

| Rule ID | Tên rule | Entities | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|----------|------|-----------|---------------|------------|------------|
| VR-CF-012 | Ngạch phải có bậc lương | CivilServiceGrade → SalaryStep | Dependency | Mỗi ngạch phải có ít nhất 1 bậc lương | "Ngạch [X] chưa có bậc lương nào." | ERR_CF_012 | Section 2.4.4 |
| VR-CF-013 | Chức vụ phải có hệ số phụ cấp | ManagementPosition → PositionAllowance | Dependency | Mỗi chức vụ quản lý phải có hệ số phụ cấp | "Chức vụ [X] chưa có hệ số phụ cấp." | ERR_CF_013 | Section 2.4.4 |
| VR-CF-014 | Chức danh GV phải có định mức giờ | AcademicTitle → TeachingQuota | Dependency | Mỗi chức danh giảng viên phải có định mức giờ giảng | "Chức danh [X] chưa có định mức giờ giảng." | ERR_CF_014 | Section 2.4.4 |
| VR-CF-015 | Loại đánh giá phải có tiêu chí | EvaluationType → EvaluationCriteria | Dependency | Mỗi loại đánh giá phải có ít nhất 1 tiêu chí | "Loại đánh giá [X] chưa có tiêu chí nào." | ERR_CF_015 | Section 2.4.4 |
| VR-CF-016 | Loại đánh giá phải có ngưỡng phân loại | EvaluationType → ClassificationThreshold | Dependency | Mỗi loại đánh giá phải có ngưỡng phân loại | "Loại đánh giá [X] chưa có ngưỡng phân loại." | ERR_CF_016 | Section 2.4.4 |
| VR-CF-017 | Quy trình phải có bước | WorkflowType → WorkflowStep | Dependency | Mỗi quy trình phải có ít nhất 1 bước | "Quy trình [X] chưa có bước nào." | ERR_CF_017 | Section 2.4.4 |

---

## 13. Bảo mật và Kiểm soát Truy cập

### 13.1 Authentication Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-SC-001 | Mật khẩu đủ mạnh | User.Password | Format | Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số | "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số." | ERR_SC_001 | NFR-SC-006 |
| VR-SC-002 | Timeout phiên làm việc | Session.LastActivity | Temporal | Auto-logout nếu LastActivity > 30 phút | "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại." | ERR_SC_002 | NFR-SC-005 |
| VR-SC-003 | Khóa tài khoản sau nhiều lần sai | User.FailedLoginCount | Threshold | Khóa tài khoản sau 5 lần đăng nhập sai liên tiếp | "Tài khoản đã bị khóa do đăng nhập sai quá 5 lần. Vui lòng liên hệ quản trị viên." | ERR_SC_003 | NFR-SC-006 |

### 13.2 Authorization Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-SC-004 | Phân quyền theo vai trò | User.Role, Action | Permission | Chỉ thực hiện action nếu Role có Permission tương ứng | "Bạn không có quyền thực hiện thao tác này." | ERR_SC_004 | NFR-SC-001 |
| VR-SC-005 | Phân quyền cấp trường dữ liệu | User.Role, Field | Permission | Ẩn/hiện field theo FieldPermission của Role | "Bạn không có quyền xem thông tin này." | ERR_SC_005 | Wireframe 02 |
| VR-SC-006 | Phân quyền theo đơn vị | User.DepartmentId, Data.DepartmentId | Permission | User chỉ xem/sửa dữ liệu thuộc đơn vị được phân quyền | "Bạn không có quyền truy cập dữ liệu của đơn vị này." | ERR_SC_006 | NFR-SC-001 |

### 13.3 Data Protection Rules

| Rule ID | Tên rule | Entity.Field | Loại | Điều kiện | Thông báo lỗi | Error Code | Tham chiếu |
|---------|----------|--------------|------|-----------|---------------|------------|------------|
| VR-SC-007 | Mã hóa dữ liệu nhạy cảm | Employee.CitizenId, Salary.* | Business Logic | CCCD và dữ liệu lương phải được mã hóa trong database | N/A (system) | N/A | NFR-SC-003, Section 2.4.2 |
| VR-SC-008 | Audit log cho thao tác quan trọng | AuditLog.* | Business Logic | Ghi log tất cả: Create, Update, Delete, Login, Export | N/A (system) | N/A | NFR-SC-004 |


---

## 14. Danh mục Mã lỗi (Error Code Registry)

### 14.1 Cấu trúc Mã lỗi

```
ERR_{MODULE}_{NUMBER}

Trong đó:
- ERR: Prefix cố định
- MODULE: Mã module (2-3 ký tự)
- NUMBER: Số thứ tự (3 chữ số)
```

### 14.2 Danh sách Module Code

| Module Code | Module Name | Range |
|-------------|-------------|-------|
| ER | Employee Records | ERR_ER_001 - ERR_ER_030 |
| QM | Qualifications Management | ERR_QM_001 - ERR_QM_016 |
| OS | Organization Structure | ERR_OS_001 - ERR_OS_014 |
| CM | Contract Management | ERR_CM_001 - ERR_CM_020 |
| SD | Salary Data | ERR_SD_001 - ERR_SD_010 |

| PR | Performance & Rewards | ERR_PR_001 - ERR_PR_011 |
| TD | Training & Development | ERR_TD_001 - ERR_TD_008 |
| SS | Self-Service Portal | ERR_SS_001 - ERR_SS_004 |
| RP | Reporting | ERR_RP_001 - ERR_RP_006 |
| CF | System Configuration | ERR_CF_001 - ERR_CF_017 |
| SC | Security | ERR_SC_001 - ERR_SC_009 |

### 14.3 Error Code Master List

| Error Code | Module | Rule ID | Short Description |
|------------|--------|---------|-------------------|
| ERR_ER_001 | Employee Records | VR-ER-001 | Duplicate employee code |
| ERR_ER_002 | Employee Records | VR-ER-002 | Invalid employee code format |
| ERR_ER_003 | Employee Records | VR-ER-003 | Full name required |
| ERR_ER_004 | Employee Records | VR-ER-004 | Invalid full name format |
| ERR_ER_005 | Employee Records | VR-ER-005 | Date of birth required |
| ERR_ER_006 | Employee Records | VR-ER-006 | Invalid age range |
| ERR_ER_007 | Employee Records | VR-ER-007 | Gender required |
| ERR_ER_008 | Employee Records | VR-ER-008 | Invalid gender value |
| ERR_ER_009 | Employee Records | VR-ER-009 | Citizen ID required |
| ERR_ER_010 | Employee Records | VR-ER-010 | Invalid citizen ID format |
| ERR_ER_011 | Employee Records | VR-ER-011 | Duplicate citizen ID |
| ERR_ER_012 | Employee Records | VR-ER-012 | Work email required |
| ERR_ER_013 | Employee Records | VR-ER-013 | Invalid email format |
| ERR_ER_014 | Employee Records | VR-ER-014 | Duplicate email |
| ERR_ER_015 | Employee Records | VR-ER-015 | Phone number required |
| ERR_ER_016 | Employee Records | VR-ER-016 | Invalid phone format |
| ERR_ER_017 | Employee Records | VR-ER-017 | Invalid tax code format |
| ERR_ER_018 | Employee Records | VR-ER-018 | Bank account required |
| ERR_ER_019 | Employee Records | VR-ER-019 | Bank name required |
| ERR_ER_020 | Employee Records | VR-ER-020 | Photo required |
| ERR_ER_021 | Employee Records | VR-ER-021 | Invalid photo format |
| ERR_ER_022 | Employee Records | VR-ER-022 | Invalid dependent count |
| ERR_ER_023 | Employee Records | VR-ER-023 | Cannot delete employee |
| ERR_ER_024 | Employee Records | VR-ER-024 | Resigned employee login blocked |
| ERR_ER_027 | Employee Records | VR-ER-027 | Invalid department |
| ERR_ER_028 | Employee Records | VR-ER-028 | Invalid academic title |
| ERR_ER_029 | Employee Records | VR-ER-029 | Invalid nationality |
| ERR_ER_030 | Employee Records | VR-ER-030 | Invalid ethnicity |
| ERR_CM_001 | Contract Management | VR-CM-001 | Duplicate contract number |
| ERR_CM_009 | Contract Management | VR-CM-009 | End date before start date |
| ERR_CM_012 | Contract Management | VR-CM-012 | Fixed-term contract limit exceeded |
| ERR_CM_018 | Contract Management | VR-CM-018 | Overlapping contract period |
| ERR_SD_001 | Salary Data | VR-SD-001 | Invalid salary data for export |
| ERR_PR_006 | Performance & Rewards | VR-PR-006 | Excellent rating limit exceeded |
| ERR_SC_001 | Security | VR-SC-001 | Weak password |
| ERR_SC_002 | Security | VR-SC-002 | Session timeout |
| ERR_SC_003 | Security | VR-SC-003 | Account locked |
| ERR_SC_004 | Security | VR-SC-004 | Permission denied |

### 14.4 Complete Error Code Master List

#### Employee Records (ERR_ER_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_ER_001 | VR-ER-001 | Mã cán bộ đã tồn tại trong hệ thống. Vui lòng kiểm tra lại. | Duplicate employee code |
| ERR_ER_002 | VR-ER-002 | Mã cán bộ không đúng định dạng. Định dạng: [Mã ĐV][Số thứ tự] | Invalid employee code format |
| ERR_ER_003 | VR-ER-003 | Vui lòng nhập họ và tên cán bộ. | Full name required |
| ERR_ER_004 | VR-ER-004 | Họ tên chỉ được chứa chữ cái và khoảng trắng, từ 2-100 ký tự. | Invalid full name format |
| ERR_ER_005 | VR-ER-005 | Vui lòng nhập ngày sinh. | Date of birth required |
| ERR_ER_006 | VR-ER-006 | Tuổi cán bộ phải từ 18 đến 70. | Invalid age range |
| ERR_ER_007 | VR-ER-007 | Vui lòng chọn giới tính. | Gender required |
| ERR_ER_008 | VR-ER-008 | Giới tính không hợp lệ. | Invalid gender value |
| ERR_ER_009 | VR-ER-009 | Vui lòng nhập số CCCD/CMND. | Citizen ID required |
| ERR_ER_010 | VR-ER-010 | Số CCCD phải có 12 chữ số hoặc CMND phải có 9 chữ số. | Invalid citizen ID format |
| ERR_ER_011 | VR-ER-011 | Số CCCD đã tồn tại trong hệ thống. | Duplicate citizen ID |
| ERR_ER_012 | VR-ER-012 | Vui lòng nhập email công việc. | Work email required |
| ERR_ER_013 | VR-ER-013 | Email không đúng định dạng. | Invalid email format |
| ERR_ER_014 | VR-ER-014 | Email đã được sử dụng bởi cán bộ khác. | Duplicate email |
| ERR_ER_015 | VR-ER-015 | Vui lòng nhập ít nhất một số điện thoại liên hệ. | Phone number required |
| ERR_ER_016 | VR-ER-016 | Số điện thoại phải có 10-11 chữ số và bắt đầu bằng số 0. | Invalid phone format |
| ERR_ER_017 | VR-ER-017 | Mã số thuế phải có 10 hoặc 13 chữ số. | Invalid tax code format |
| ERR_ER_018 | VR-ER-018 | Vui lòng nhập số tài khoản ngân hàng để nhận lương. | Bank account required |
| ERR_ER_019 | VR-ER-019 | Vui lòng chọn ngân hàng. | Bank name required |
| ERR_ER_020 | VR-ER-020 | Vui lòng tải lên ảnh thẻ cán bộ. | Photo required |
| ERR_ER_021 | VR-ER-021 | Ảnh phải có định dạng JPG/PNG, kích thước < 2MB. | Invalid photo format |
| ERR_ER_022 | VR-ER-022 | Số người phụ thuộc không được âm. | Invalid dependent count |
| ERR_ER_023 | VR-ER-023 | Không thể xóa hồ sơ cán bộ. Vui lòng đánh dấu nghỉ việc thay vì xóa. | Cannot delete employee |
| ERR_ER_024 | VR-ER-024 | Tài khoản đã bị vô hiệu hóa do cán bộ đã nghỉ việc. | Resigned employee login blocked |
| ERR_ER_027 | VR-ER-027 | Đơn vị công tác không tồn tại hoặc đã ngừng hoạt động. | Invalid department |
| ERR_ER_028 | VR-ER-028 | Chức danh nghề nghiệp không hợp lệ. | Invalid academic title |
| ERR_ER_029 | VR-ER-029 | Quốc tịch không hợp lệ. | Invalid nationality |
| ERR_ER_030 | VR-ER-030 | Dân tộc không hợp lệ. | Invalid ethnicity |

#### Qualifications Management (ERR_QM_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_QM_001 | VR-QM-001 | Vui lòng nhập tên bằng cấp/chứng chỉ. | Degree name required |
| ERR_QM_002 | VR-QM-002 | Vui lòng nhập chuyên ngành đào tạo. | Major required |
| ERR_QM_003 | VR-QM-003 | Vui lòng nhập tên cơ sở đào tạo. | Institution required |
| ERR_QM_004 | VR-QM-004 | Vui lòng nhập năm tốt nghiệp. | Graduation year required |
| ERR_QM_005 | VR-QM-005 | Năm tốt nghiệp không hợp lệ. | Invalid graduation year |
| ERR_QM_006 | VR-QM-006 | Vui lòng chọn loại bằng cấp. | Degree type required |
| ERR_QM_007 | VR-QM-007 | Xếp loại tốt nghiệp không hợp lệ. | Invalid classification |
| ERR_QM_008 | VR-QM-008 | Ngày hết hạn phải sau ngày cấp chứng chỉ. | Invalid expiry date |
| ERR_QM_009 | VR-QM-009 | Số hiệu văn bằng không hợp lệ. | Invalid degree number |
| ERR_QM_010 | VR-QM-010 | Chứng chỉ [Tên] của [Họ tên] sẽ hết hạn trong [X] ngày. | Certificate expiring soon |
| ERR_QM_011 | VR-QM-011 | Giảng viên đại học phải có trình độ Thạc sĩ trở lên. | Lecturer requires Master's degree |
| ERR_QM_012 | VR-QM-012 | Điểm ngoại ngữ không hợp lệ theo thang điểm chuẩn. | Invalid language score |
| ERR_QM_013 | VR-QM-013 | Loại bằng cấp không hợp lệ. | Invalid degree type |
| ERR_QM_014 | VR-QM-014 | Loại chứng chỉ không hợp lệ. | Invalid certificate type |
| ERR_QM_015 | VR-QM-015 | Học hàm không hợp lệ. | Invalid academic rank |
| ERR_QM_016 | VR-QM-016 | Ngạch viên chức không hợp lệ. | Invalid civil service grade |

#### Organization Structure (ERR_OS_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_OS_001 | VR-OS-001 | Mã đơn vị đã tồn tại trong hệ thống. | Duplicate department code |
| ERR_OS_002 | VR-OS-002 | Mã đơn vị chỉ được chứa chữ in hoa và số, từ 2-10 ký tự. | Invalid department code format |
| ERR_OS_003 | VR-OS-003 | Vui lòng nhập tên đơn vị. | Department name required |
| ERR_OS_004 | VR-OS-004 | Tên đơn vị đã tồn tại trong cùng đơn vị cha. | Duplicate department name in same parent |
| ERR_OS_005 | VR-OS-005 | Vui lòng chọn loại đơn vị. | Department type required |
| ERR_OS_006 | VR-OS-006 | Ngày thành lập không được trong tương lai. | Invalid established date |
| ERR_OS_007 | VR-OS-007 | Không thể xóa đơn vị đang hoạt động hoặc còn nhân viên. | Cannot delete active department |
| ERR_OS_008 | VR-OS-008 | Vị trí đã đủ định biên ([X]/[Y]). Không thể thêm nhân sự. | Position headcount exceeded |
| ERR_OS_009 | VR-OS-009 | Ngày kết thúc nhiệm kỳ phải sau ngày bắt đầu. | Invalid leadership mandate dates |
| ERR_OS_010 | VR-OS-010 | Không thể chọn đơn vị con làm đơn vị cha. | Circular reference in hierarchy |
| ERR_OS_011 | VR-OS-011 | Đơn vị cha không tồn tại. | Parent department not found |
| ERR_OS_012 | VR-OS-012 | Loại đơn vị không hợp lệ. | Invalid department type |
| ERR_OS_013 | VR-OS-013 | Cơ sở không hợp lệ. | Invalid campus |
| ERR_OS_014 | VR-OS-014 | Loại bổ nhiệm không hợp lệ. | Invalid assignment type |

#### Contract Management (ERR_CM_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_CM_001 | VR-CM-001 | Số hợp đồng đã tồn tại trong hệ thống. | Duplicate contract number |
| ERR_CM_002 | VR-CM-002 | Số hợp đồng không đúng định dạng. | Invalid contract number format |
| ERR_CM_003 | VR-CM-003 | Vui lòng nhập ngày bắt đầu hợp đồng. | Contract start date required |
| ERR_CM_004 | VR-CM-004 | Vui lòng chọn loại hợp đồng. | Contract type required |
| ERR_CM_005 | VR-CM-005 | Hợp đồng có thời hạn phải có ngày kết thúc. | End date required for fixed-term |
| ERR_CM_006 | VR-CM-006 | Vui lòng nhập chức danh trong hợp đồng. | Position title required |
| ERR_CM_007 | VR-CM-007 | Vui lòng nhập hệ số lương. | Salary coefficient required |
| ERR_CM_008 | VR-CM-008 | Hệ số lương phải từ 1.0 đến 10.0. | Invalid salary coefficient range |
| ERR_CM_009 | VR-CM-009 | Ngày kết thúc hợp đồng phải sau ngày bắt đầu. | End date before start date |
| ERR_CM_010 | VR-CM-010 | Thời hạn hợp đồng không nằm trong khoảng cho phép của loại HĐ này. | Contract duration out of range |
| ERR_CM_011 | VR-CM-011 | Không thể tạo hợp đồng với ngày bắt đầu trong quá khứ. | Cannot create contract in past |
| ERR_CM_012 | VR-CM-012 | Đã ký 2 lần hợp đồng có thời hạn. Vui lòng chuyển sang HĐ không xác định thời hạn. | Fixed-term contract limit exceeded |
| ERR_CM_013 | VR-CM-013 | Thời gian thử việc vượt quá mức tối đa cho vị trí này. | Trial period exceeded |
| ERR_CM_014 | VR-CM-014 | Không thể chuyển trạng thái hợp đồng theo hướng này. | Invalid contract status transition |
| ERR_CM_015 | VR-CM-015 | Hợp đồng của [Họ tên] sẽ hết hạn trong [X] ngày. | Contract expiring soon |
| ERR_CM_016 | VR-CM-016 | Chuyên gia nước ngoài phải có giấy phép lao động. | Work permit required for foreigner |
| ERR_CM_018 | VR-CM-018 | Nhân viên đã có hợp đồng đang hiệu lực trong khoảng thời gian này. | Overlapping contract period |
| ERR_CM_019 | VR-CM-019 | Loại hợp đồng không hợp lệ. | Invalid contract type |
| ERR_CM_020 | VR-CM-020 | Nhân viên không tồn tại hoặc đã nghỉ việc. | Employee not found or resigned |

#### Salary Data (ERR_SD_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_SD_001 | VR-SD-001 | Vui lòng chọn ngạch lương. | Salary grade required |
| ERR_SD_002 | VR-SD-002 | Vui lòng chọn bậc lương. | Salary step required |
| ERR_SD_003 | VR-SD-003 | Hệ số lương phải lớn hơn 0. | Coefficient must be positive |
| ERR_SD_004 | VR-SD-004 | Bậc lương không hợp lệ cho ngạch này. | Invalid salary step for grade |
| ERR_SD_005 | VR-SD-005 | Vui lòng chọn ngày hiệu lực. | Effective date required |
| ERR_SD_007 | VR-SD-007 | Số tài khoản ngân hàng không hợp lệ. | Invalid bank account number |
| ERR_SD_008 | VR-SD-008 | Ngạch lương không hợp lệ. | Invalid salary grade |
| ERR_SD_009 | VR-SD-009 | Bậc lương không thuộc ngạch đã chọn. | Step not in selected grade |
| ERR_SD_010 | VR-SD-010 | Mã số thuế người phụ thuộc không hợp lệ. | Invalid dependent tax ID |



#### Performance & Rewards (ERR_PR_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_PR_001 | VR-PR-001 | Vui lòng chọn kỳ đánh giá. | Evaluation cycle required |
| ERR_PR_002 | VR-PR-002 | Điểm phải từ 0 đến [MaxScore] cho tiêu chí này. | Score out of range |
| ERR_PR_003 | VR-PR-003 | Vui lòng nhập nhận xét đánh giá (ít nhất 50 ký tự). | Comment too short |
| ERR_PR_006 | VR-PR-006 | Tỷ lệ xếp loại Xuất sắc đã vượt 15% trong đơn vị. Vui lòng xem xét lại. | Excellent rating limit exceeded |
| ERR_PR_007 
| ERR_PR_009 | VR-PR-009 | Kỳ đánh giá không tồn tại hoặc đã đóng. | Invalid evaluation cycle |
| ERR_PR_010 | VR-PR-010 | Mẫu đánh giá chưa có tiêu chí. Vui lòng cấu hình trước khi sử dụng. | No criteria configured |
| ERR_PR_011 | VR-PR-011 | Mẫu đánh giá chưa có ngưỡng phân loại. | No classification thresholds |

#### Training & Development (ERR_TD_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_TD_001 | VR-TD-001 | Vui lòng nhập tên khóa đào tạo. | Course name required |
| ERR_TD_002 | VR-TD-002 | Vui lòng chọn ngày bắt đầu khóa học. | Course start date required |
| ERR_TD_003 | VR-TD-003 | Sức chứa khóa học phải lớn hơn 0. | Invalid course capacity |
| ERR_TD_004 | VR-TD-004 | Khóa học đã đủ số lượng đăng ký ([X]/[Y]). | Course registration full |
| ERR_TD_007 | VR-TD-007 | Kết quả đào tạo không hợp lệ. | Invalid training result |
| ERR_TD_008 | VR-TD-008 | Ngày kết thúc khóa học phải sau ngày bắt đầu. | Course end date before start |



#### Self-Service Portal (ERR_SS_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_SS_001 | VR-SS-001 | Yêu cầu cập nhật thông tin đã được gửi đi. Vui lòng chờ phê duyệt. | Profile update pending approval |
| ERR_SS_003 | VR-SS-003 | Vui lòng đính kèm giấy tờ xác nhận người phụ thuộc. | Dependent documentation required |
| ERR_SS_004 | VR-SS-004 | Vui lòng nhập mật khẩu để xem thông tin lương. | Password required for salary view |

#### Reporting (ERR_RP_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_RP_001 | VR-RP-001 | Vui lòng chọn ngày bắt đầu. | Report start date required |
| ERR_RP_002 | VR-RP-002 | Vui lòng chọn ngày kết thúc. | Report end date required |
| ERR_RP_003 | VR-RP-003 | Ngày kết thúc phải bằng hoặc sau ngày bắt đầu. | Report end date before start |
| ERR_RP_004 | VR-RP-004 | Định dạng xuất không được hỗ trợ. | Unsupported export format |
| ERR_RP_005 | VR-RP-005 | Bạn không có quyền xem báo cáo lương. | No permission for salary report |
| ERR_RP_006 | VR-RP-006 | Đơn vị không tồn tại. | Department not found |

#### System Configuration (ERR_CF_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_CF_001 | VR-CF-001 | Vui lòng nhập tên danh mục. | Master data name required |
| ERR_CF_002 | VR-CF-002 | Mã đã tồn tại trong danh mục này. | Duplicate master data code |
| ERR_CF_003 | VR-CF-003 | Tỷ lệ bảo hiểm phải từ 0% đến 100%. | Invalid insurance rate |
| ERR_CF_004 | VR-CF-004 | Mức lương cơ sở phải lớn hơn 0. | Base salary rate must be positive |
| ERR_CF_005 | VR-CF-005 | Vui lòng chọn ngày hiệu lực. | Effective date required |
| ERR_CF_006 | VR-CF-006 | Ngày hiệu lực không được trong quá khứ. | Effective date in past |
| ERR_CF_008 | VR-CF-008 | Thay đổi này cần được phê duyệt bởi Trưởng P.TCCB/TCKT. | Config change requires approval |
| ERR_CF_009 | VR-CF-009 | Không thể xóa danh mục đang được sử dụng. Vui lòng đánh dấu ngừng hoạt động. | Cannot delete used master data |
| ERR_CF_010 | VR-CF-010 | Giá trị [X] không hợp lệ. [Chi tiết lỗi từ định nghĩa]. | Parameter validation failed |
| ERR_CF_011 | VR-CF-011 | Các khoảng năm phải liên tục và không được chồng chéo. | Non-contiguous year ranges |
| ERR_CF_012 | VR-CF-012 | Ngạch [X] chưa có bậc lương nào. | No salary steps for grade |
| ERR_CF_013 | VR-CF-013 | Chức vụ [X] chưa có hệ số phụ cấp. | No position allowance configured |
| ERR_CF_014 | VR-CF-014 | Chức danh [X] chưa có định mức giờ giảng. | No teaching quota for title |
| ERR_CF_015 | VR-CF-015 | Loại đánh giá [X] chưa có tiêu chí nào. | No evaluation criteria |
| ERR_CF_016 | VR-CF-016 | Loại đánh giá [X] chưa có ngưỡng phân loại. | No classification thresholds |
| ERR_CF_017 | VR-CF-017 | Quy trình [X] chưa có bước nào. | No workflow steps |

#### Security (ERR_SC_xxx)

| Error Code | Rule ID | Vietnamese Message | English Description |
|------------|---------|-------------------|---------------------|
| ERR_SC_001 | VR-SC-001 | Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số. | Weak password |
| ERR_SC_002 | VR-SC-002 | Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại. | Session timeout |
| ERR_SC_003 | VR-SC-003 | Tài khoản đã bị khóa do đăng nhập sai quá 5 lần. Vui lòng liên hệ quản trị viên. | Account locked |
| ERR_SC_004 | VR-SC-004 | Bạn không có quyền thực hiện thao tác này. | Permission denied |
| ERR_SC_005 | VR-SC-005 | Bạn không có quyền xem thông tin này. | Field-level permission denied |
| ERR_SC_006 | VR-SC-006 | Bạn không có quyền truy cập dữ liệu của đơn vị này. | Department-level permission denied |
| ERR_SC_009 | VR-SC-009 | Xuất dữ liệu nhạy cảm hàng loạt cần được phê duyệt bởi quản trị viên. | Bulk export requires approval |

---



---

## 15. Tổng hợp và Thống kê

### 15.1 Thống kê theo Module

| Module | Data Validation | Business Rules | Cross-Entity | Workflow | Total |
|--------|-----------------|----------------|--------------|----------|-------|
| Employee Records (FR-ER) | 22 | 4 | 4 | 0 | **30** |
| Qualifications (FR-QM) | 9 | 3 | 4 | 0 | **16** |
| Organization (FR-OS) | 6 | 4 | 4 | 0 | **14** |
| Contract Management (FR-CM) | 8 | 10 | 2 | 0 | **20** |
| Salary Data (FR-SD) | 5 | 2 | 3 | 0 | **10** |

| Performance & Rewards (FR-PR) | 3 | 5 | 3 | 0 | **11** |
| Training & Development (FR-TD) | 3 | 5 | 0 | 0 | **8** |
| Self-Service Portal (FR-SS) | 0 | 4 | 0 | 0 | **4** |
| Reporting (FR-RP) | 3 | 2 | 1 | 0 | **6** |
| System Configuration (FR-CF) | 5 | 6 | 6 | 0 | **17** |
| Security | 3 | 3 | 3 | 0 | **9** |
| **TOTAL** | **-** | **-** | **-** | **0** | **189** |

### 15.2 Thống kê theo Loại Constraint

| Constraint Type | Count | Percentage |
|-----------------|-------|------------|
| Required | 45 | 18.0% |
| Format | 28 | 11.2% |
| Range | 22 | 8.8% |
| Unique | 8 | 3.2% |
| Length | 3 | 1.2% |
| Temporal | 15 | 6.0% |
| Calculation | 25 | 10.0% |
| Threshold | 18 | 7.2% |
| State Transition | 8 | 3.2% |
| Referential | 32 | 12.8% |
| Dependency | 10 | 4.0% |
| Permission | 5 | 2.0% |
| **TOTAL** | **214** | **100%** |

### 15.3 Rule ID Quick Reference

| Module | Rule ID Range |
|--------|---------------|
| Employee Records | VR-ER-001 to VR-ER-030 |
| Qualifications | VR-QM-001 to VR-QM-016 |
| Organization Structure | VR-OS-001 to VR-OS-014 |
| Contract Management | VR-CM-001 to VR-CM-020 |

| Salary Data | VR-SD-001 to VR-SD-010 |

| Performance & Rewards | VR-PR-001 to VR-PR-011 |
| Training & Development | VR-TD-001 to VR-TD-008 |

| Self-Service Portal | VR-SS-001 to VR-SS-004 |
| Reporting | VR-RP-001 to VR-RP-006 |
| System Configuration | VR-CF-001 to VR-CF-017 |
| Security | VR-SC-001 to VR-SC-009 |

---

## Phụ lục A: Ghi chú Triển khai

### A.1 Validation Layers

Validation nên được thực hiện ở nhiều tầng:

1. **Client-side (Frontend):** Real-time feedback cho Data Validation rules (Required, Format, Range)
2. **API Layer:** Validate lại tất cả rules trước khi lưu database
3. **Database Layer:** Constraints (Unique, Foreign Key) và Triggers (Business Rules phức tạp)
4. **Background Jobs:** Kiểm tra Threshold rules định kỳ (cảnh báo HĐ sắp hết hạn, chứng chỉ hết hạn)

### A.2 Error Message Guidelines

- Thông báo bằng **tiếng Việt**, rõ ràng
- Chỉ ra **trường lỗi** và **giá trị mong đợi**
- Đưa ra **gợi ý sửa lỗi** khi có thể
- Tránh thông báo kỹ thuật (null, exception, etc.)

### A.3 Audit Trail Requirements

Tất cả các Business Rules có ảnh hưởng đến dữ liệu quan trọng cần được ghi audit log:
- Thay đổi hồ sơ nhân viên
- Thay đổi hợp đồng
- Thay đổi lương
- Phê duyệt đơn từ
- Thay đổi cấu hình hệ thống

---

## Phụ lục B: Regex Patterns

### B.1 Định dạng Dữ liệu Chuẩn

| Trường | Regex Pattern | Mô tả | Ví dụ hợp lệ |
|--------|---------------|-------|--------------|
| Mã cán bộ | `^[A-Z]{2,4}[0-9]{4,6}$` | 2-4 chữ cái in hoa + 4-6 số | TCCB001234, KCT12345 |
| Email | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | Email chuẩn RFC | nguyen.vana@tlu.edu.vn |
| Số điện thoại VN | `^0[0-9]{9,10}$` | Bắt đầu bằng 0, 10-11 số | 0912345678, 02438123456 |
| CCCD | `^[0-9]{12}$` | 12 chữ số | 001234567890 |
| CMND (cũ) | `^[0-9]{9}$` | 9 chữ số | 012345678 |
| Mã số thuế cá nhân | `^[0-9]{10}$\|^[0-9]{13}$` | 10 hoặc 13 số | 0123456789, 0123456789012 |
| Số hợp đồng | `^HD-[0-9]{4}-[0-9]{6}$` | HD-YYYY-NNNNNN | HD-2026-000156 |
| Mã đơn vị | `^[A-Z0-9]{2,10}$` | 2-10 ký tự chữ in hoa hoặc số | TCCB, KCNTT, KCT01 |
| Mã lớp | `^[A-Za-z0-9]{1,20}$` | Alphanumeric, tối đa 20 ký tự | 64CNTT01, CS101A |
| DOI | `^10\.\d{4,}/.*$` | DOI chuẩn | 10.1000/xyz123 |
| ISSN | `^[0-9]{4}-[0-9]{3}[0-9X]$` | ISSN chuẩn | 1234-5678, 1234-567X |
| ISBN-10 | `^[0-9]{10}$` | 10 chữ số | 0123456789 |
| ISBN-13 | `^[0-9]{13}$` | 13 chữ số | 9780123456789 |
| Kỳ lương | `^(0[1-9]\|1[0-2])\/[0-9]{4}$` | MM/YYYY | 01/2026, 12/2025 |

### B.2 Họ tên tiếng Việt

```regex
^[A-ZÀ-Ỹa-zà-ỹ\s]{2,100}$
```

**Chi tiết:**
- Chấp nhận chữ cái Latin và Unicode tiếng Việt (có dấu)
- Chấp nhận khoảng trắng
- Độ dài 2-100 ký tự
- Không chấp nhận số hoặc ký tự đặc biệt

### B.3 Mật khẩu mạnh

```regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$
```

**Yêu cầu:**
- Ít nhất 8 ký tự
- Ít nhất 1 chữ thường
- Ít nhất 1 chữ hoa
- Ít nhất 1 chữ số

---

## Phụ lục C: Các Kịch bản Validation Liên Module

### C.1 Kịch bản 1: Tạo Nhân viên Mới và Hợp đồng

**Các module liên quan:** FR-ER → FR-CM → FR-QM

```
1. [FR-ER] Tạo hồ sơ nhân viên mới
   - Validate tất cả thông tin cá nhân (VR-ER-003 to VR-ER-022)
   - Sinh mã cán bộ tự động (VR-ER-002)
   ↓
2. [FR-QM] Import bằng cấp từ hồ sơ ứng viên
   - Validate trình độ giảng viên (VR-QM-011)
   ↓
3. [FR-CM] Tạo hợp đồng mới
   - Validate loại hợp đồng, thời hạn (VR-CM-001 to VR-CM-020)
   ↓
4. [FR-CF] Kiểm tra định biên (VR-OS-008)
   ↓
5. [Workflow] Phê duyệt hợp đồng (VR-WF-008 to VR-WF-012)
```

**Lỗi có thể xảy ra:**
| Bước | Lỗi | Error Code | Xử lý |
|------|-----|------------|-------|
| 1 | Email trùng | ERR_ER_014 | Kiểm tra lại email |
| 2 | Chưa có bằng Thạc sĩ | ERR_QM_011 | Cảnh báo, yêu cầu bổ sung |
| 4 | Hết định biên | ERR_OS_008 | Chặn tạo hợp đồng |

### C.2 Kịch bản 2: Xuất Dữ liệu Lương cho Hệ thống Bên ngoài

**Các module liên quan:** FR-SD → FR-CF → External Payroll System

> [!NOTE]
> Hệ thống HRMS chỉ cung cấp dữ liệu cho hệ thống tính lương bên ngoài, không tự tính lương.
> Dữ liệu giờ giảng được quản lý bởi hệ thống bên ngoài, không thuộc phạm vi HRMS.

```
1. [FR-SD] Lấy thông tin lương của nhân viên
   - Ngạch/bậc lương hiện tại (VR-SD-001, VR-SD-002)
   - Hệ số lương (VR-SD-003)
   - Thông tin người phụ thuộc (VR-SD-010)
   ↓
2. [FR-CF] Lấy tham số cấu hình
   - Mức lương cơ sở (VR-CF-004)
   - Tỷ lệ bảo hiểm (VR-CF-003)
   - Hệ số phụ cấp chức vụ
   - Ngưỡng thuế TNCN
   ↓
3. [API/Export] Xuất dữ liệu cho hệ thống tính lương bên ngoài
   - Format: JSON/CSV
   - Bao gồm: Thông tin NV, ngạch/bậc, người phụ thuộc, hệ số phụ cấp
```

**Lỗi có thể xảy ra:**
| Bước | Lỗi | Error Code | Xử lý |
|------|-----|------------|-------|
| 1 | Chưa có ngạch/bậc lương | ERR_SD_001 | Chặn xuất dữ liệu |
| 2 | Chưa cấu hình lương cơ sở | ERR_CF_004 | Cảnh báo trong dữ liệu xuất |

### C.3 Kịch bản 3: Gia hạn Hợp đồng Hàng loạt

**Các module liên quan:** FR-CM → FR-PR → FR-CF

```
1. [FR-CM] Danh sách HĐ sắp hết hạn (30 ngày)
   - Lọc theo ngày hết hạn (VR-CM-015)
   ↓
2. [FR-PR] Kiểm tra kết quả đánh giá
   - Đánh giá phải ≥ "Hoàn thành" (VR-WF-015)
   - Không có kỷ luật trong kỳ (VR-WF-016)
   ↓
3. [FR-CM] Xác định loại HĐ mới
   - Nếu đã 2 lần có thời hạn → Không thời hạn (VR-CM-012)
   ↓
4. [FR-CF] Kiểm tra định biên (nếu đổi vị trí)
   ↓
5. [Workflow] Phê duyệt hàng loạt (VR-WF-013 to VR-WF-016)
```

### C.4 Kịch bản 4: Đánh giá Viên chức Cuối năm

**Các module liên quan:** FR-PR → FR-CF

```
1. [FR-CF] Mở kỳ đánh giá
   - Kiểm tra mẫu đánh giá có tiêu chí (VR-PR-010)
   - Kiểm tra có ngưỡng phân loại (VR-PR-011)
   ↓

2. [FR-PR] Tự đánh giá
   - Hoàn thành tất cả tiêu chí (VR-WF-022)
   ↓
3. [FR-PR] Đánh giá của Trưởng ĐV
   - Nhận xét đầy đủ (VR-WF-024)
   ↓
4. [FR-PR] Tổng hợp đơn vị
   - Kiểm tra tỷ lệ Xuất sắc ≤ 15% (VR-PR-006)
   ↓
5. [Workflow] Hội đồng + Hiệu trưởng phê duyệt
```

---

## Phụ lục D: Edge Cases và Xử lý Đặc biệt

### D.1 Dữ liệu Lịch sử (Historical Data)

| Tình huống | Xử lý | Ghi chú |
|------------|-------|---------|
| Nhập liệu hợp đồng quá khứ | Cho phép với quyền đặc biệt (Admin flag) | Bỏ qua VR-CM-011 |
| Import dữ liệu cũ từ hệ thống khác | Chế độ Import Mode | Bỏ qua một số validation, ghi log |
| Nhân viên đã nghỉ việc từ lâu | Chỉ cho xem, không sửa | VR-ER-024 vẫn áp dụng |

### D.2 Trường hợp Đặc biệt về Thời gian

| Tình huống | Xử lý | Ghi chú |
|------------|-------|---------|
| Hợp đồng bắt đầu ngày lễ | Cho phép | Ngày hiệu lực pháp lý |
| Nghỉ phép qua năm mới | Chia thành 2 đơn | Tách theo năm dương lịch |
| Giờ làm thêm qua đêm | Tính theo ngày bắt đầu | Ghi nhận cả 2 ngày trong log |
| Timezone khác nhau | Sử dụng timezone Việt Nam (UTC+7) | Lưu ở UTC, hiển thị theo local |

### D.3 Trường hợp Đặc biệt về Tính toán

| Tình huống | Công thức/Xử lý | Ghi chú |
|------------|-----------------|---------|
| Nhân viên vào giữa tháng | Lương = (Số ngày làm / Số ngày trong tháng) × Lương tháng | Prorate |
| Nâng lương giữa tháng | Tính theo 2 mức, trọng số theo ngày | Chia đoạn |
| Thay đổi phụ cấp chức vụ | Áp dụng từ ngày quyết định | Không hồi tố |
| Nghỉ không lương | Không tính ngày nghỉ vào balance | Ghi nhận riêng |
| Giảng viên thỉnh giảng | Không tính định mức, chỉ tính giờ thực tế | Flag riêng |

### D.4 Trường hợp Đặc biệt về Workflow

| Tình huống | Xử lý | Ghi chú |
|------------|-------|---------|
| Người phê duyệt nghỉ phép | Ủy quyền (Delegation) hoặc cấp trên xử lý | Theo VR-WF-004 |
| Trưởng ĐV tự đăng ký nghỉ | Phó/Người được ủy quyền duyệt, hoặc lên P.TCCB | Bỏ qua bước 1 |
| Hiệu trưởng đăng ký nghỉ | P.TCCB xác nhận + Ghi log | Quy trình riêng |
| Đơn bị reject, sửa và gửi lại | Tạo version mới, giữ lịch sử | Không xóa đơn cũ |
| Timeout chưa xử lý | Gửi reminder + Escalation (tùy cấu hình) | Theo VR-WF-004 |

### D.5 Xung đột Dữ liệu

| Tình huống | Xử lý | Ghi chú |
|------------|-------|---------|
| 2 người sửa cùng record | Optimistic locking, first-come-first-served | Thông báo conflict |
| Bulk import trùng email | Bỏ qua record trùng, ghi log | Báo cáo sau import |
| Xóa đơn vị cha còn đơn vị con | Không cho phép (VR-OS-007) | Xóa con trước |
| Thay đổi cấu hình ảnh hưởng dữ liệu cũ | Chỉ áp dụng cho dữ liệu mới | Versioning |

---

## Phụ lục E: Mapping với Database Constraints

### E.1 Unique Constraints

| Rule ID | Table | Column(s) | Constraint Name |
|---------|-------|-----------|-----------------|
| VR-ER-001 | employees | employee_code | uk_employee_code |
| VR-ER-011 | employees | citizen_id | uk_citizen_id |
| VR-ER-014 | employees | work_email | uk_work_email |
| VR-CM-001 | contracts | contract_number | uk_contract_number |
| VR-OS-001 | departments | dept_code | uk_dept_code |
| VR-CF-002 | master_data | category_id, code | uk_master_data_code |

### E.2 Foreign Key Constraints

| Rule ID | Table | Column | References | Constraint Name |
|---------|-------|--------|------------|-----------------|
| VR-ER-027 | employees | department_id | departments.id | fk_employee_department |
| VR-ER-028 | employees | academic_title_id | academic_titles.id | fk_employee_title |
| VR-CM-019 | contracts | contract_type_id | contract_types.id | fk_contract_type |
| VR-CM-020 | contracts | employee_id | employees.id | fk_contract_employee |

### E.3 Check Constraints

| Rule ID | Table | Column | Condition | Constraint Name |
|---------|-------|--------|-----------|-----------------|
| VR-ER-006 | employees | date_of_birth | age(date_of_birth) BETWEEN 18 AND 70 | chk_employee_age |
| VR-ER-022 | employees | dependent_count | dependent_count >= 0 | chk_dependent_count |
| VR-CM-008 | contracts | salary_coefficient | salary_coefficient BETWEEN 1.0 AND 10.0 | chk_salary_coefficient |
| VR-CF-003 | insurance_rates | rate | rate BETWEEN 0 AND 100 | chk_insurance_rate |

### E.4 Trigger-based Validations

| Rule ID | Table | Event | Trigger Logic |
|---------|-------|-------|---------------|
| VR-ER-023 | employees | BEFORE DELETE | RAISE EXCEPTION 'Cannot delete employee' |
| VR-ER-026 | employees | AFTER INSERT/UPDATE/DELETE | INSERT INTO audit_log(...) |
| VR-CM-009 | contracts | BEFORE INSERT/UPDATE | IF end_date <= start_date THEN RAISE |
| VR-CM-018 | contracts | BEFORE INSERT | Check overlapping contracts |
| VR-OS-010 | departments | BEFORE UPDATE | Check circular reference |
| VR-PR-006 | evaluations | BEFORE INSERT | Check excellent ratio in unit |

---

*Tài liệu được tạo: 28/01/2026*  
*Cập nhật lần cuối: 28/01/2026*  
*Phiên bản: 1.1*  
*Số lượng Validation Rules: 250 (219 module + 31 workflow)*
