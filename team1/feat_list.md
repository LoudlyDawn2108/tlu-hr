# DANH SÁCH ĐẶC TRƯNG (FEAT) - HỆ THỐNG HRMS
## Đại học Thủy Lợi

> **Quy tắc**: Mỗi FEAT = 1 động từ hành động cụ thể (Xem, Thêm, Sửa, Xóa, Tìm, Xuất...)

---

### 2.2.1. Xác thực & Phân quyền (3 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-001 | Đăng nhập hệ thống | Hệ thống cho phép người dùng đăng nhập bằng tên đăng nhập và mật khẩu | STRQ-01, 33, 104, 109 | Kết hợp | High |
| FEAT-002 | Đăng xuất hệ thống | Hệ thống cho phép người dùng đăng xuất khỏi phiên làm việc | STRQ-04, 34, 105, 110 | Kết hợp | High |
| FEAT-003 | Gán quyền cho người dùng | Hệ thống cho phép gán quyền theo vai trò (TCCB, TCKT, GV) | STRQ-08 | Sao chép | High |

---

### 2.2.2. Quản lý tài khoản (6 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-004 | Xem danh sách tài khoản | Hệ thống hiển thị danh sách tài khoản với chức năng tìm kiếm | STRQ-05 | Phân tách | High |
| FEAT-005 | Thêm mới tài khoản | Hệ thống cho phép tạo tài khoản mới: tên, mật khẩu, họ tên, email, vai trò | STRQ-07 | Sao chép | High |
| FEAT-006 | Sửa thông tin tài khoản | Hệ thống cho phép chỉnh sửa thông tin tài khoản người dùng | STRQ-06 | Phân tách | High |
| FEAT-007 | Reset mật khẩu tài khoản | Hệ thống cho phép reset mật khẩu cho người dùng | STRQ-06 | Phân tách | High |
| FEAT-008 | Khóa tài khoản | Hệ thống cho phép khóa tài khoản người dùng | STRQ-05 | Phân tách | Medium |
| FEAT-009 | Mở khóa tài khoản | Hệ thống cho phép mở khóa tài khoản đã bị khóa | STRQ-05 | Phân tách | Medium |

---

### 2.2.3. Cấu hình lương cơ sở (3 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-010 | Xem danh sách lương cơ sở | Hệ thống hiển thị danh sách mức lương cơ sở theo ngày hiệu lực | STRQ-09 | Sao chép | High |
| FEAT-011 | Thêm mức lương cơ sở | Hệ thống cho phép thêm mức lương cơ sở mới với ngày hiệu lực | STRQ-10 | Phân tách | High |
| FEAT-012 | Sửa mức lương cơ sở | Hệ thống cho phép sửa mức lương cơ sở | STRQ-10 | Phân tách | Medium |

---

### 2.2.4. Cấu hình ngạch/bậc lương (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-013 | Xem bảng hệ số lương | Hệ thống hiển thị bảng hệ số lương theo ngạch (GV, GVC, GVCC, CV) | STRQ-11 | Sao chép | High |
| FEAT-014 | Thêm ngạch lương | Hệ thống cho phép thêm ngạch lương mới | STRQ-12 | Phân tách | High |
| FEAT-015 | Sửa ngạch lương | Hệ thống cho phép sửa thông tin ngạch lương | STRQ-12 | Phân tách | Medium |
| FEAT-016 | Xóa ngạch lương | Hệ thống cho phép xóa ngạch lương không sử dụng | STRQ-12 | Phân tách | Low |

---

### 2.2.5. Cấu hình phụ cấp (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-017 | Xem danh sách phụ cấp | Hệ thống hiển thị danh sách các loại phụ cấp | STRQ-15 | Sao chép | High |
| FEAT-018 | Thêm loại phụ cấp | Hệ thống cho phép thêm loại phụ cấp: mã, tên, loại tính, công thức | STRQ-16 | Sao chép | High |
| FEAT-019 | Sửa loại phụ cấp | Hệ thống cho phép sửa thông tin phụ cấp | STRQ-17 | Phân tách | Medium |
| FEAT-020 | Đánh dấu active/inactive phụ cấp | Hệ thống cho phép đánh dấu trạng thái phụ cấp | STRQ-17 | Phân tách | Medium |

---

### 2.2.6. Cấu hình hợp đồng (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-021 | Xem danh sách loại hợp đồng | Hệ thống hiển thị các loại HĐ: không XĐTH, XĐTH, thử việc, thỉnh giảng | STRQ-18 | Sao chép | High |
| FEAT-022 | Cấu hình thời hạn hợp đồng | Hệ thống cho phép cấu hình thời hạn min/max cho từng loại HĐ | STRQ-19 | Sao chép | High |
| FEAT-023 | Cấu hình số lần ký HĐ tối đa | Hệ thống cho phép cấu hình số lần ký tối đa trước chuyển đổi loại HĐ | STRQ-20, 21 | Kết hợp | High |
| FEAT-024 | Cấu hình thời gian chuyển đổi HĐ | Hệ thống cho phép cấu hình thời gian tối đa để ký tiếp/chuyển đổi HĐ | STRQ-22 | Sao chép | Medium |

---

### 2.2.7. Cấu hình đánh giá (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-025 | Xem danh mục đánh giá | Hệ thống hiển thị danh sách loại đánh giá khen thưởng/kỷ luật | STRQ-23 | Sao chép | Medium |
| FEAT-026 | Thêm loại đánh giá | Hệ thống cho phép thêm mục mới vào danh mục đánh giá | STRQ-24 | Phân tách | Medium |
| FEAT-027 | Sửa loại đánh giá | Hệ thống cho phép sửa mục trong danh mục đánh giá | STRQ-24 | Phân tách | Medium |
| FEAT-028 | Đánh dấu active/inactive đánh giá | Hệ thống cho phép đánh dấu trạng thái loại đánh giá | STRQ-24 | Phân tách | Low |

---

### 2.2.8. Cấu hình đào tạo (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-029 | Xem danh mục loại đào tạo | Hệ thống hiển thị danh sách các loại khóa đào tạo | STRQ-26 | Sao chép | Medium |
| FEAT-030 | Thêm loại đào tạo | Hệ thống cho phép thêm loại khóa đào tạo mới | STRQ-27 | Phân tách | Medium |
| FEAT-031 | Sửa loại đào tạo | Hệ thống cho phép sửa thông tin loại khóa đào tạo | STRQ-27 | Phân tách | Medium |
| FEAT-032 | Đánh dấu active/inactive loại đào tạo | Hệ thống cho phép đánh dấu trạng thái loại đào tạo | STRQ-27 | Phân tách | Low |

---

### 2.2.9. Danh mục dùng chung (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-033 | Xem danh mục dùng chung | Hệ thống hiển thị danh mục: trình độ, chức danh, ngạch, chức vụ, danh hiệu | STRQ-29 | Sao chép | Medium |
| FEAT-034 | Thêm mục danh mục | Hệ thống cho phép thêm mục mới vào danh mục | STRQ-30 | Phân tách | Medium |
| FEAT-035 | Sửa mục danh mục | Hệ thống cho phép sửa mục trong danh mục | STRQ-30 | Phân tách | Medium |
| FEAT-036 | Đánh dấu inactive mục danh mục | Hệ thống cho phép đánh dấu inactive (không cho xóa nếu đang sử dụng) | STRQ-31 | Sao chép | Low |

---

### 2.2.10. Lịch sử thay đổi cấu hình (1 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-037 | Xem lịch sử thay đổi cấu hình | Hệ thống lưu và hiển thị lịch sử thay đổi với lý do sửa | STRQ-14, 25, 28, 32 | Kết hợp | Low |

---

### 2.2.11. Hồ sơ nhân sự (9 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-038 | Xem danh sách hồ sơ | Hệ thống hiển thị danh sách hồ sơ với bộ lọc theo tiêu chí | STRQ-35 | Phân tách | High |
| FEAT-039 | Tìm kiếm hồ sơ | Hệ thống cho phép tìm kiếm theo họ tên, mã NV, đơn vị, chức vụ | STRQ-35 | Phân tách | High |
| FEAT-040 | Thêm mới hồ sơ nhân sự | Hệ thống cho phép tạo hồ sơ: cá nhân, CCCD, BHXH, địa chỉ, liên hệ | STRQ-36, 37, 38, 39, 40, 41, 42 | Kết hợp | High |
| FEAT-041 | Xem chi tiết hồ sơ | Hệ thống hiển thị toàn bộ chi tiết một hồ sơ nhân sự | STRQ-47 | Sao chép | High |
| FEAT-042 | Sửa thông tin hồ sơ | Hệ thống cho phép chỉnh sửa thông tin hồ sơ nhân sự | STRQ-44 | Sao chép | High |
| FEAT-043 | Xuất hồ sơ ra PDF | Hệ thống cho phép xuất hồ sơ ra định dạng PDF theo mẫu | STRQ-50 | Phân tách | Medium |
| FEAT-044 | Xuất hồ sơ ra Excel | Hệ thống cho phép xuất hồ sơ ra định dạng Excel | STRQ-50 | Phân tách | Medium |
| FEAT-045 | Đánh dấu thôi việc | Hệ thống cho phép đánh dấu nhân sự nghỉ việc với ngày và lý do | STRQ-45 | Sao chép | Medium |
| FEAT-046 | Xem lịch sử thay đổi hồ sơ | Hệ thống hiển thị lịch sử thay đổi với người sửa, thời gian | STRQ-46 | Sao chép | Low |

---

### 2.2.12. Trình độ học vấn (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-047 | Xem danh sách trình độ | Hệ thống hiển thị danh sách trình độ học vấn của nhân sự | STRQ-51 | Sao chép | Medium |
| FEAT-048 | Thêm trình độ học vấn | Hệ thống cho phép thêm: bằng cấp, chuyên ngành, cơ sở, năm TN | STRQ-52, 53, 54 | Kết hợp | Medium |
| FEAT-049 | Sửa trình độ học vấn | Hệ thống cho phép sửa thông tin trình độ đã có | STRQ-52 | Phân tách | Medium |
| FEAT-050 | Xóa trình độ học vấn | Hệ thống cho phép xóa trình độ không chính xác | STRQ-52 | Phân tách | Low |

---

### 2.2.13. Chứng chỉ (5 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-051 | Xem danh sách chứng chỉ | Hệ thống hiển thị danh sách chứng chỉ của nhân sự | STRQ-55 | Phân tách | Medium |
| FEAT-052 | Thêm chứng chỉ | Hệ thống cho phép thêm: ngoại ngữ, tin học, NVSP, bằng sáng chế | STRQ-55 | Phân tách | Medium |
| FEAT-053 | Sửa chứng chỉ | Hệ thống cho phép sửa thông tin chứng chỉ | STRQ-55 | Phân tách | Medium |
| FEAT-054 | Xóa chứng chỉ | Hệ thống cho phép xóa chứng chỉ không chính xác | STRQ-55 | Phân tách | Low |
| FEAT-055 | Cảnh báo chứng chỉ hết hạn | Hệ thống tự động cảnh báo chứng chỉ sắp hết hạn trước 30 ngày | STRQ-56 | Sao chép | Low |

---

### 2.2.14. Hợp đồng lao động (7 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-056 | Xem danh sách hợp đồng | Hệ thống hiển thị danh sách hợp đồng của nhân sự | STRQ-57 | Sao chép | High |
| FEAT-057 | Thêm mới hợp đồng | Hệ thống cho phép tạo HĐ: loại, ngày ký, thời hạn, nội dung công việc | STRQ-58 | Sao chép | High |
| FEAT-058 | Tạo phụ lục gia hạn HĐ | Hệ thống cho phép tạo phụ lục gia hạn cho hợp đồng hiện tại | STRQ-59 | Sao chép | High |
| FEAT-059 | Chấm dứt hợp đồng | Hệ thống cho phép chấm dứt HĐ với lý do và ngày hiệu lực | STRQ-60 | Sao chép | Medium |
| FEAT-060 | Cảnh báo HĐ sắp hết hạn | Hệ thống tự động cảnh báo HĐ sắp hết hạn (30/60/90 ngày) | STRQ-61, 62, 63, 64 | Kết hợp | Medium |
| FEAT-061 | In hợp đồng theo mẫu | Hệ thống sinh văn bản HĐ theo mẫu để in | STRQ-66 | Sao chép | Medium |
| FEAT-062 | In phụ lục hợp đồng | Hệ thống sinh phụ lục HĐ theo mẫu để in | STRQ-66 | Phân tách | Medium |

---

### 2.2.15. Lương & phụ cấp nhân sự (6 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-063 | Xem thông tin lương nhân sự | Hệ thống hiển thị ngạch, bậc, hệ số lương của nhân sự | STRQ-67 | Sao chép | High |
| FEAT-064 | Cập nhật ngạch/bậc lương | Hệ thống cho phép cập nhật ngạch, bậc, hệ số lương cho nhân sự | STRQ-68, 69, 70 | Kết hợp | High |
| FEAT-065 | Xem danh sách phụ cấp nhân sự | Hệ thống hiển thị các phụ cấp đang được gán cho nhân sự | STRQ-71 | Phân tách | High |
| FEAT-066 | Gán phụ cấp cho nhân sự | Hệ thống cho phép gán loại phụ cấp cho nhân sự theo quy định | STRQ-71 | Phân tách | High |
| FEAT-067 | Gỡ phụ cấp khỏi nhân sự | Hệ thống cho phép gỡ phụ cấp không còn áp dụng | STRQ-71 | Phân tách | Medium |
| FEAT-068 | Tính thâm niên tự động | Hệ thống tự động tính phụ cấp thâm niên từ ngày vào ngành | STRQ-72 | Sao chép | Medium |

---

### 2.2.16. Khen thưởng (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-069 | Xem danh sách khen thưởng | Hệ thống hiển thị lịch sử khen thưởng của nhân sự | STRQ-74 | Phân tách | Medium |
| FEAT-070 | Thêm khen thưởng | Hệ thống cho phép ghi nhận: hình thức, quyết định, ngày, nội dung | STRQ-74 | Phân tách | Medium |
| FEAT-071 | Sửa khen thưởng | Hệ thống cho phép sửa thông tin khen thưởng đã ghi nhận | STRQ-74 | Phân tách | Medium |
| FEAT-072 | Xóa khen thưởng | Hệ thống cho phép xóa khen thưởng nhập sai | STRQ-74 | Phân tách | Low |

---

### 2.2.17. Kỷ luật (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-073 | Xem danh sách kỷ luật | Hệ thống hiển thị lịch sử kỷ luật của nhân sự | STRQ-75 | Phân tách | Medium |
| FEAT-074 | Thêm kỷ luật | Hệ thống cho phép ghi nhận kỷ luật: hình thức, quyết định, ngày | STRQ-75 | Phân tách | Medium |
| FEAT-075 | Sửa kỷ luật | Hệ thống cho phép sửa thông tin kỷ luật đã ghi nhận | STRQ-75 | Phân tách | Medium |
| FEAT-076 | Xóa kỷ luật | Hệ thống cho phép xóa kỷ luật nhập sai | STRQ-75 | Phân tách | Low |

---

### 2.2.18. Cơ cấu tổ chức (8 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-077 | Xem sơ đồ tổ chức | Hệ thống hiển thị sơ đồ tổ chức dạng cây | STRQ-76 | Sao chép | Medium |
| FEAT-078 | Cập nhật sơ đồ tổ chức | Hệ thống cho phép cập nhật cấu trúc sơ đồ tổ chức | STRQ-77, 78 | Kết hợp | Medium |
| FEAT-079 | Thêm đơn vị | Hệ thống cho phép thêm đơn vị: tên, mã, loại, đơn vị cha | STRQ-79 | Sao chép | High |
| FEAT-080 | Sửa thông tin đơn vị | Hệ thống cho phép sửa thông tin đơn vị | STRQ-79, 80 | Kết hợp | High |
| FEAT-081 | Phân công nhân sự vào đơn vị | Hệ thống cho phép phân công nhân sự vào đơn vị | STRQ-82 | Sao chép | High |
| FEAT-082 | Điều chuyển nhân sự giữa đơn vị | Hệ thống cho phép điều chuyển nhân sự sang đơn vị khác | STRQ-82 | Phân tách | High |
| FEAT-083 | Gán chức vụ cho nhân sự | Hệ thống cho phép gán chức vụ với quyết định bổ nhiệm | STRQ-83, 84, 85, 86 | Kết hợp | Medium |
| FEAT-084 | Gỡ chức vụ khỏi nhân sự | Hệ thống cho phép gỡ chức vụ với quyết định miễn nhiệm | STRQ-84 | Phân tách | Medium |

---

### 2.2.19. Khóa đào tạo (6 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-085 | Xem danh sách khóa đào tạo | Hệ thống hiển thị danh sách các khóa đào tạo | STRQ-88, 89 | Kết hợp | Medium |
| FEAT-086 | Thêm khóa đào tạo | Hệ thống cho phép tạo khóa: tên, loại, thời gian, địa điểm | STRQ-91 | Sao chép | Medium |
| FEAT-087 | Sửa khóa đào tạo | Hệ thống cho phép sửa thông tin khóa đào tạo | STRQ-91 | Phân tách | Medium |
| FEAT-088 | Ghi nhận nhân sự tham gia đào tạo | Hệ thống cho phép ghi nhận danh sách nhân sự tham gia khóa | STRQ-92, 93 | Kết hợp | Medium |
| FEAT-089 | Cập nhật kết quả đào tạo | Hệ thống cho phép cập nhật: hoàn thành, chứng chỉ đạt được | STRQ-94, 95 | Kết hợp | Low |
| FEAT-090 | Xem lịch sử đào tạo nhân sự | Hệ thống hiển thị lịch sử các khóa đào tạo nhân sự đã tham gia | STRQ-97 | Sao chép | Low |

---

### 2.2.20. Báo cáo & Thống kê (5 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-091 | Xem Dashboard tổng quan | Hệ thống hiển thị: tổng nhân sự, theo đơn vị, giới tính, độ tuổi | STRQ-98, 99, 100 | Kết hợp | Medium |
| FEAT-092 | Xem báo cáo biến động nhân sự | Hệ thống hiển thị báo cáo biến động nhân sự theo thời gian | STRQ-101 | Sao chép | Medium |
| FEAT-093 | Xem báo cáo theo mẫu Bộ GD&ĐT | Hệ thống hiển thị các báo cáo theo quy định Bộ GD&ĐT | STRQ-102 | Sao chép | Medium |
| FEAT-094 | Xuất báo cáo ra Excel | Hệ thống cho phép xuất báo cáo ra định dạng Excel | STRQ-103 | Phân tách | Medium |
| FEAT-095 | Xuất báo cáo ra PDF | Hệ thống cho phép xuất báo cáo ra định dạng PDF | STRQ-103 | Phân tách | Medium |

---

### 2.2.21. Self-Service Portal (7 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-096 | Xem thông tin cá nhân | Hệ thống hiển thị thông tin cá nhân của CBGV | STRQ-111 | Sao chép | High |
| FEAT-097 | Gửi yêu cầu cập nhật thông tin | Hệ thống cho phép CBGV gửi yêu cầu cập nhật để TCCB xét duyệt | STRQ-112 | Sao chép | Medium |
| FEAT-098 | Xem trạng thái yêu cầu | Hệ thống hiển thị trạng thái yêu cầu đã gửi | STRQ-112 | Phân tách | Medium |
| FEAT-099 | Xem lịch sử hợp đồng cá nhân | Hệ thống hiển thị lịch sử hợp đồng của CBGV | STRQ-113 | Sao chép | Medium |
| FEAT-100 | Xem lịch sử khen thưởng cá nhân | Hệ thống hiển thị lịch sử khen thưởng của CBGV | STRQ-114 | Phân tách | Medium |
| FEAT-101 | Xem lịch sử kỷ luật cá nhân | Hệ thống hiển thị lịch sử kỷ luật của CBGV | STRQ-114 | Phân tách | Medium |
| FEAT-102 | Đăng ký tham gia khóa đào tạo | Hệ thống cho phép CBGV đăng ký tham gia các khóa đào tạo | STRQ-116 | Sao chép | Low |

---

### 2.2.22. Tích hợp Phòng TCKT (3 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-103 | Xem dữ liệu lương (TCKT) | Hệ thống hiển thị dữ liệu lương để TCKT đối chiếu | STRQ-106, 107 | Kết hợp | High |
| FEAT-104 | Xuất dữ liệu lương cho kế toán | Hệ thống cho phép xuất dữ liệu lương ra file cho hệ thống kế toán | STRQ-108 | Sao chép | Medium |
| FEAT-105 | Cung cấp API dữ liệu lương | Hệ thống cung cấp API để hệ thống kế toán truy xuất | STRQ-108, 134 | Kết hợp | Medium |

---

### 2.2.23. Yêu cầu phi chức năng (6 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-106 | Đảm bảo hiệu năng hệ thống | Hệ thống đảm bảo phản hồi <3s, hỗ trợ 50+ người dùng đồng thời | STRQ-117, 118 | Kết hợp | High |
| FEAT-107 | Đảm bảo bảo mật hệ thống | Hệ thống đảm bảo mã hóa BCrypt, auto logout 30p, ghi log | STRQ-119, 120, 121, 122, 123, 124 | Kết hợp | High |
| FEAT-108 | Đảm bảo khả năng sẵn sàng | Hệ thống đảm bảo 24/7, sao lưu hàng ngày, cơ chế phục hồi | STRQ-125, 126, 127, 128, 129 | Kết hợp | High |
| FEAT-109 | Đảm bảo giao diện dễ sử dụng | Hệ thống đảm bảo responsive, tiếng Việt, thao tác dễ dàng | STRQ-130, 131, 132, 133 | Kết hợp | Medium |
| FEAT-110 | Đảm bảo tích hợp hệ thống | Hệ thống đảm bảo tích hợp với hệ thống tài chính, kế toán | STRQ-134, 135 | Kết hợp | Medium |
| FEAT-111 | Đảm bảo tuân thủ pháp lý | Hệ thống đảm bảo tuân thủ BHXH, thuế TNCN, báo cáo Bộ GD&ĐT | STRQ-136, 137, 138, 139, 140 | Kết hợp | High |

---

## Tổng kết

| Thống kê | Số lượng |
|----------|----------|
| **Tổng FEAT** | 111 |
| **Tổng Module** | 23 |
| **High Priority** | 43 |
| **Medium Priority** | 54 |
| **Low Priority** | 14 |

---

## Chú thích Kỹ thuật chuyển đổi

| Kỹ thuật | Điều kiện | Ví dụ |
|----------|-----------|-------|
| **Sao chép** | 1 STRQ → 1 FEAT (1:1) | STRQ-08 → FEAT-003 |
| **Phân tách** | 1 STRQ → nhiều FEAT (1:N) | STRQ-05 → FEAT-004, 008, 009 |
| **Kết hợp** | nhiều STRQ → 1 FEAT (N:1) | STRQ-01, 33, 104, 109 → FEAT-001 |
