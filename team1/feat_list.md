# DANH SÁCH ĐẶC TRƯNG (FEAT) - HỆ THỐNG HRMS
## Đại học Thủy Lợi

> **Quy tắc**: Mỗi FEAT = 1 động từ hành động cụ thể (Xem, Thêm, Sửa, Xóa, Tìm, Xuất...)

---

## Module 1: Xác thực & Phân quyền (3 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-001 | Đăng nhập hệ thống | Người dùng đăng nhập bằng tên đăng nhập và mật khẩu | STRQ-01, 33, 104, 109 | Kết hợp | High |
| FEAT-002 | Đăng xuất hệ thống | Người dùng đăng xuất khỏi hệ thống | STRQ-04, 34, 105, 110 | Kết hợp | High |
| FEAT-003 | Gán quyền cho người dùng | Admin gán quyền theo vai trò (TCCB, TCKT, GV) | STRQ-08 | Sửa chữa | High |

---

## Module 2: Quản lý tài khoản (6 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-004 | Xem danh sách tài khoản | Admin xem danh sách tài khoản với tìm kiếm | STRQ-05 | Phân tách | High |
| FEAT-005 | Thêm mới tài khoản | Admin tạo tài khoản: tên, mật khẩu, họ tên, email, vai trò | STRQ-07 | Sao chép | High |
| FEAT-006 | Sửa thông tin tài khoản | Admin chỉnh sửa thông tin tài khoản | STRQ-06 | Phân tách | High |
| FEAT-007 | Reset mật khẩu tài khoản | Admin reset mật khẩu cho người dùng | STRQ-06 | Phân tách | High |
| FEAT-008 | Khóa tài khoản | Admin khóa tài khoản người dùng | STRQ-05 | Phân tách | Medium |
| FEAT-009 | Mở khóa tài khoản | Admin mở khóa tài khoản đã bị khóa | STRQ-05 | Phân tách | Medium |

---

## Module 3: Cấu hình lương cơ sở (3 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-010 | Xem danh sách lương cơ sở | TCCB xem danh sách mức lương cơ sở theo ngày hiệu lực | STRQ-09 | Phân tách | High |
| FEAT-011 | Thêm mức lương cơ sở | TCCB thêm mức lương cơ sở mới với ngày hiệu lực | STRQ-10 | Sao chép | High |
| FEAT-012 | Sửa mức lương cơ sở | TCCB sửa mức lương cơ sở | STRQ-10 | Phân tách | Medium |

---

## Module 4: Cấu hình ngạch/bậc lương (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-013 | Xem bảng hệ số lương | TCCB xem bảng hệ số lương theo ngạch (GV, GVC, GVCC, CV) | STRQ-11 | Phân tách | High |
| FEAT-014 | Thêm ngạch lương | TCCB thêm ngạch lương mới | STRQ-12 | Phân tách | High |
| FEAT-015 | Sửa ngạch lương | TCCB sửa thông tin ngạch lương | STRQ-12 | Phân tách | Medium |
| FEAT-016 | Xóa ngạch lương | TCCB xóa ngạch lương không sử dụng | STRQ-12 | Phân tách | Low |

---

## Module 5: Cấu hình phụ cấp (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-017 | Xem danh sách phụ cấp | TCCB xem danh sách các loại phụ cấp | STRQ-15 | Phân tách | High |
| FEAT-018 | Thêm loại phụ cấp | TCCB thêm loại phụ cấp: mã, tên, loại tính, công thức | STRQ-16 | Sao chép | High |
| FEAT-019 | Sửa loại phụ cấp | TCCB sửa thông tin phụ cấp | STRQ-17 | Phân tách | Medium |
| FEAT-020 | Đánh dấu active/inactive phụ cấp | TCCB đánh dấu trạng thái phụ cấp | STRQ-17 | Phân tách | Medium |

---

## Module 6: Cấu hình hợp đồng (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-021 | Xem danh sách loại hợp đồng | Admin xem các loại HĐ: không XĐTH, XĐTH, thử việc, thỉnh giảng | STRQ-18 | Phân tách | High |
| FEAT-022 | Cấu hình thời hạn hợp đồng | Admin cấu hình thời hạn min/max cho từng loại HĐ | STRQ-19 | Sao chép | High |
| FEAT-023 | Cấu hình số lần ký HĐ tối đa | Admin cấu hình số lần ký tối đa trước chuyển đổi loại HĐ | STRQ-20, 21 | Kết hợp | High |
| FEAT-024 | Cấu hình thời gian chuyển đổi HĐ | Admin cấu hình thời gian tối đa để ký tiếp/chuyển đổi HĐ | STRQ-22 | Sao chép | Medium |

---

## Module 7: Cấu hình đánh giá (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-025 | Xem danh mục đánh giá | Admin xem danh sách loại đánh giá khen thưởng/kỷ luật | STRQ-23 | Phân tách | Medium |
| FEAT-026 | Thêm loại đánh giá | Admin thêm mục mới vào danh mục đánh giá | STRQ-24 | Phân tách | Medium |
| FEAT-027 | Sửa loại đánh giá | Admin sửa mục trong danh mục đánh giá | STRQ-24 | Phân tách | Medium |
| FEAT-028 | Đánh dấu active/inactive đánh giá | Admin đánh dấu trạng thái loại đánh giá | STRQ-24 | Phân tách | Low |

---

## Module 8: Cấu hình đào tạo (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-029 | Xem danh mục loại đào tạo | Admin xem danh sách các loại khóa đào tạo | STRQ-26 | Phân tách | Medium |
| FEAT-030 | Thêm loại đào tạo | Admin thêm loại khóa đào tạo mới | STRQ-27 | Phân tách | Medium |
| FEAT-031 | Sửa loại đào tạo | Admin sửa thông tin loại khóa đào tạo | STRQ-27 | Phân tách | Medium |
| FEAT-032 | Đánh dấu active/inactive loại đào tạo | Admin đánh dấu trạng thái loại đào tạo | STRQ-27 | Phân tách | Low |

---

## Module 9: Danh mục dùng chung (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-033 | Xem danh mục dùng chung | Admin xem: trình độ, chức danh, ngạch, chức vụ, danh hiệu | STRQ-29 | Phân tách | Medium |
| FEAT-034 | Thêm mục danh mục | Admin thêm mục mới vào danh mục | STRQ-30 | Phân tách | Medium |
| FEAT-035 | Sửa mục danh mục | Admin sửa mục trong danh mục | STRQ-30 | Phân tách | Medium |
| FEAT-036 | Đánh dấu inactive mục danh mục | Admin đánh dấu inactive (không cho xóa nếu đang sử dụng) | STRQ-31 | Sao chép | Low |

---

## Module 10: Lịch sử thay đổi cấu hình (1 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-037 | Xem lịch sử thay đổi cấu hình | Hệ thống lưu/hiển thị lịch sử thay đổi với lý do sửa | STRQ-14, 25, 28, 32 | Kết hợp | Low |

---

## Module 11: Hồ sơ nhân sự (9 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-038 | Xem danh sách hồ sơ | TCCB xem danh sách hồ sơ với lọc theo tiêu chí | STRQ-35 | Phân tách | High |
| FEAT-039 | Tìm kiếm hồ sơ | Tìm kiếm theo họ tên, mã NV, đơn vị, chức vụ | STRQ-35 | Phân tách | High |
| FEAT-040 | Thêm mới hồ sơ nhân sự | TCCB tạo hồ sơ: cá nhân, CCCD, BHXH, địa chỉ, liên hệ | STRQ-36, 37, 38 | Kết hợp | High |
| FEAT-041 | Xem chi tiết hồ sơ | Xem toàn bộ chi tiết một hồ sơ nhân sự | STRQ-40 | Sao chép | High |
| FEAT-042 | Sửa thông tin hồ sơ | TCCB chỉnh sửa thông tin hồ sơ nhân sự | STRQ-39 | Sao chép | High |
| FEAT-043 | Xuất hồ sơ ra PDF | TCCB xuất hồ sơ ra định dạng PDF theo mẫu | STRQ-41 | Phân tách | Medium |
| FEAT-044 | Xuất hồ sơ ra Excel | TCCB xuất hồ sơ ra định dạng Excel | STRQ-41 | Phân tách | Medium |
| FEAT-045 | Đánh dấu thôi việc | TCCB đánh dấu nhân sự nghỉ việc với ngày và lý do | STRQ-42 | Sao chép | Medium |
| FEAT-046 | Xem lịch sử thay đổi hồ sơ | Hệ thống hiển thị lịch sử với người sửa, thời gian | STRQ-43 | Sao chép | Low |

---

## Module 12: Trình độ học vấn (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-047 | Xem danh sách trình độ | TCCB xem danh sách trình độ học vấn của nhân sự | STRQ-44 | Phân tách | Medium |
| FEAT-048 | Thêm trình độ học vấn | TCCB thêm: bằng cấp, chuyên ngành, cơ sở, năm TN | STRQ-45 | Phân tách | Medium |
| FEAT-049 | Sửa trình độ học vấn | TCCB sửa thông tin trình độ đã có | STRQ-45 | Phân tách | Medium |
| FEAT-050 | Xóa trình độ học vấn | TCCB xóa trình độ không chính xác | STRQ-46 | Phân tách | Low |

---

## Module 13: Chứng chỉ (5 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-051 | Xem danh sách chứng chỉ | TCCB xem danh sách chứng chỉ của nhân sự | STRQ-47 | Phân tách | Medium |
| FEAT-052 | Thêm chứng chỉ | TCCB thêm: ngoại ngữ, tin học, NVSP, bằng sáng chế | STRQ-48 | Phân tách | Medium |
| FEAT-053 | Sửa chứng chỉ | TCCB sửa thông tin chứng chỉ | STRQ-49 | Phân tách | Medium |
| FEAT-054 | Xóa chứng chỉ | TCCB xóa chứng chỉ không chính xác | STRQ-50 | Phân tách | Low |
| FEAT-055 | Cảnh báo chứng chỉ hết hạn | Hệ thống cảnh báo chứng chỉ sắp hết hạn trước 30 ngày | STRQ-51, 52 | Kết hợp | Low |

---

## Module 14: Hợp đồng lao động (7 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-056 | Xem danh sách hợp đồng | TCCB xem danh sách hợp đồng của nhân sự | STRQ-57 | Phân tách | High |
| FEAT-057 | Thêm mới hợp đồng | TCCB tạo HĐ: loại, ngày ký, thời hạn, nội dung công việc | STRQ-58 | Sao chép | High |
| FEAT-058 | Tạo phụ lục gia hạn HĐ | TCCB tạo phụ lục gia hạn cho hợp đồng hiện tại | STRQ-59, 60 | Kết hợp | High |
| FEAT-059 | Chấm dứt hợp đồng | TCCB chấm dứt HĐ với lý do và ngày hiệu lực | STRQ-61 | Sao chép | Medium |
| FEAT-060 | Cảnh báo HĐ sắp hết hạn | Hệ thống cảnh báo HĐ sắp hết hạn (30/60/90 ngày) | STRQ-62, 63 | Kết hợp | Medium |
| FEAT-061 | In hợp đồng theo mẫu | Hệ thống sinh văn bản HĐ theo mẫu để in | STRQ-64 | Sao chép | Medium |
| FEAT-062 | In phụ lục hợp đồng | Hệ thống sinh phụ lục HĐ theo mẫu để in | STRQ-65 | Sao chép | Medium |

---

## Module 15: Lương & phụ cấp nhân sự (6 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-063 | Xem thông tin lương nhân sự | TCCB xem ngạch, bậc, hệ số lương của nhân sự | STRQ-67 | Phân tách | High |
| FEAT-064 | Cập nhật ngạch/bậc lương | TCCB cập nhật ngạch, bậc, hệ số lương cho nhân sự | STRQ-68 | Sao chép | High |
| FEAT-065 | Xem danh sách phụ cấp nhân sự | TCCB xem các phụ cấp đang được gán cho nhân sự | STRQ-69 | Phân tách | High |
| FEAT-066 | Gán phụ cấp cho nhân sự | TCCB gán loại phụ cấp cho nhân sự theo quy định | STRQ-70 | Phân tách | High |
| FEAT-067 | Gỡ phụ cấp khỏi nhân sự | TCCB gỡ phụ cấp không còn áp dụng | STRQ-71 | Phân tách | Medium |
| FEAT-068 | Tính thâm niên tự động | Hệ thống tự động tính phụ cấp thâm niên từ ngày vào ngành | STRQ-72 | Sao chép | Medium |

---

## Module 16: Khen thưởng (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-069 | Xem danh sách khen thưởng | TCCB xem lịch sử khen thưởng của nhân sự | STRQ-73 | Phân tách | Medium |
| FEAT-070 | Thêm khen thưởng | TCCB ghi nhận: hình thức, quyết định, ngày, nội dung | STRQ-73 | Phân tách | Medium |
| FEAT-071 | Sửa khen thưởng | TCCB sửa thông tin khen thưởng đã ghi nhận | STRQ-73 | Phân tách | Medium |
| FEAT-072 | Xóa khen thưởng | TCCB xóa khen thưởng nhập sai | STRQ-73 | Phân tách | Low |

---

## Module 17: Kỷ luật (4 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-073 | Xem danh sách kỷ luật | TCCB xem lịch sử kỷ luật của nhân sự | STRQ-74 | Phân tách | Medium |
| FEAT-074 | Thêm kỷ luật | TCCB ghi nhận kỷ luật: hình thức, quyết định, ngày | STRQ-74 | Phân tách | Medium |
| FEAT-075 | Sửa kỷ luật | TCCB sửa thông tin kỷ luật đã ghi nhận | STRQ-75 | Phân tách | Medium |
| FEAT-076 | Xóa kỷ luật | TCCB xóa kỷ luật nhập sai | STRQ-75 | Phân tách | Low |

---

## Module 18: Cơ cấu tổ chức (8 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-077 | Xem sơ đồ tổ chức | TCCB xem sơ đồ tổ chức dạng cây | STRQ-76 | Phân tách | Medium |
| FEAT-078 | Cập nhật sơ đồ tổ chức | TCCB cập nhật cấu trúc sơ đồ tổ chức | STRQ-77 | Phân tách | Medium |
| FEAT-079 | Thêm đơn vị | TCCB thêm đơn vị: tên, mã, loại, đơn vị cha | STRQ-78, 79 | Kết hợp | High |
| FEAT-080 | Sửa thông tin đơn vị | TCCB sửa thông tin đơn vị | STRQ-80 | Sao chép | High |
| FEAT-081 | Phân công nhân sự vào đơn vị | TCCB phân công nhân sự vào đơn vị | STRQ-81 | Phân tách | High |
| FEAT-082 | Điều chuyển nhân sự giữa đơn vị | TCCB điều chuyển nhân sự sang đơn vị khác | STRQ-82 | Phân tách | High |
| FEAT-083 | Gán chức vụ cho nhân sự | TCCB gán chức vụ với quyết định bổ nhiệm | STRQ-83, 84, 85 | Kết hợp | Medium |
| FEAT-084 | Gỡ chức vụ khỏi nhân sự | TCCB gỡ chức vụ với quyết định miễn nhiệm | STRQ-86, 87 | Kết hợp | Medium |

---

## Module 19: Khóa đào tạo (6 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-085 | Xem danh sách khóa đào tạo | TCCB xem danh sách các khóa đào tạo | STRQ-88 | Phân tách | Medium |
| FEAT-086 | Thêm khóa đào tạo | TCCB tạo khóa: tên, loại, thời gian, địa điểm | STRQ-89 | Phân tách | Medium |
| FEAT-087 | Sửa khóa đào tạo | TCCB sửa thông tin khóa đào tạo | STRQ-90 | Phân tách | Medium |
| FEAT-088 | Ghi nhận nhân sự tham gia đào tạo | TCCB ghi nhận danh sách nhân sự tham gia khóa | STRQ-91, 92 | Kết hợp | Medium |
| FEAT-089 | Cập nhật kết quả đào tạo | TCCB cập nhật: hoàn thành, chứng chỉ đạt được | STRQ-93, 94 | Kết hợp | Low |
| FEAT-090 | Xem lịch sử đào tạo nhân sự | TCCB xem lịch sử các khóa đào tạo nhân sự đã tham gia | STRQ-95 | Sao chép | Low |

---

## Module 20: Báo cáo & Thống kê (5 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-091 | Xem Dashboard tổng quan | Hiển thị: tổng nhân sự, theo đơn vị, giới tính, độ tuổi | STRQ-96, 97 | Kết hợp | Medium |
| FEAT-092 | Xem báo cáo biến động nhân sự | Báo cáo biến động nhân sự theo thời gian | STRQ-98, 99 | Kết hợp | Medium |
| FEAT-093 | Xem báo cáo theo mẫu Bộ GD&ĐT | Các báo cáo theo quy định Bộ GD&ĐT | STRQ-100, 101 | Kết hợp | Medium |
| FEAT-094 | Xuất báo cáo ra Excel | Xuất báo cáo ra định dạng Excel | STRQ-102 | Phân tách | Medium |
| FEAT-095 | Xuất báo cáo ra PDF | Xuất báo cáo ra định dạng PDF | STRQ-103 | Phân tách | Medium |

---

## Module 21: Self-Service Portal (7 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-096 | Xem thông tin cá nhân | CBGV xem thông tin cá nhân của mình | STRQ-106, 111, 112 | Kết hợp | High |
| FEAT-097 | Gửi yêu cầu cập nhật thông tin | CBGV gửi yêu cầu cập nhật để TCCB xét duyệt | STRQ-113 | Sao chép | Medium |
| FEAT-098 | Xem trạng thái yêu cầu | CBGV xem trạng thái yêu cầu đã gửi | STRQ-114 | Sao chép | Medium |
| FEAT-099 | Xem lịch sử hợp đồng cá nhân | CBGV xem lịch sử hợp đồng của mình | STRQ-107, 115 | Kết hợp | Medium |
| FEAT-100 | Xem lịch sử khen thưởng cá nhân | CBGV xem lịch sử khen thưởng của mình | STRQ-115 | Phân tách | Medium |
| FEAT-101 | Xem lịch sử kỷ luật cá nhân | CBGV xem lịch sử kỷ luật của mình | STRQ-115 | Phân tách | Medium |
| FEAT-102 | Đăng ký tham gia khóa đào tạo | CBGV đăng ký tham gia các khóa đào tạo | STRQ-116 | Sao chép | Low |

---

## Module 22: Tích hợp Phòng TCKT (3 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-103 | Xem dữ liệu lương (TCKT) | TCKT xem dữ liệu lương để đối chiếu | STRQ-106, 107 | Kết hợp | High |
| FEAT-104 | Xuất dữ liệu lương cho kế toán | Xuất dữ liệu lương ra file cho hệ thống kế toán | STRQ-108 | Sao chép | Medium |
| FEAT-105 | Cung cấp API dữ liệu lương | Cung cấp API để hệ thống kế toán truy xuất | STRQ-132, 133 | Kết hợp | Medium |

---

## Module 23: Yêu cầu phi chức năng (6 FEAT)

| ID | Tên FEAT | Mô tả | STRQ gốc | Kỹ thuật | Độ ưu tiên |
|:---|:---------|:------|:---------|:---------|:-----------|
| FEAT-106 | Đảm bảo hiệu năng hệ thống | Phản hồi <3s, hỗ trợ 50+ người dùng đồng thời | STRQ-117, 118 | Kết hợp | High |
| FEAT-107 | Đảm bảo bảo mật hệ thống | Mã hóa BCrypt, auto logout 30p, ghi log | STRQ-02, 03, 119-124 | Kết hợp | High |
| FEAT-108 | Đảm bảo khả năng sẵn sàng | 24/7, sao lưu hàng ngày, cơ chế phục hồi | STRQ-125, 126, 127 | Kết hợp | High |
| FEAT-109 | Đảm bảo giao diện dễ sử dụng | Responsive, tiếng Việt, thao tác dễ dàng | STRQ-128, 129, 130, 131 | Kết hợp | Medium |
| FEAT-110 | Đảm bảo tích hợp hệ thống | Tích hợp với hệ thống tài chính, kế toán | STRQ-132, 133 | Kết hợp | Medium |
| FEAT-111 | Đảm bảo tuân thủ pháp lý | Tuân thủ BHXH, thuế TNCN, báo cáo Bộ GD&ĐT | STRQ-134-140 | Kết hợp | High |

---

## Tổng kết

| Thống kê | Số lượng |
|----------|----------|
| **Tổng FEAT** | 111 |
| **Tổng Module** | 23 |
| **High Priority** | 43 |
| **Medium Priority** | 54 |
| **Low Priority** | 14 |
