# QUY TẮC CHUYỂN ĐỔI STRQ SANG FEAT

## Nguồn: Bài giảng "Thu thập, phân tích, làm rõ yêu cầu" - Slide 3

---

## 1. FEAT là gì?

- **FEAT (Feature)** = Đặc trưng, là một dịch vụ được cung cấp bởi hệ thống
- Mục tiêu của FEAT là **đáp ứng yêu cầu của Stakeholder** (STRQ)
- Quan hệ: **n STRQ → m FEAT** (nhiều-nhiều)
- FEAT được bắt nguồn từ yêu cầu của các bên liên quan (STRQ)
- **Quan trọng**: Phải truy vết được FEAT nào từ STRQ nào

---

## 2. Đặc tính của một FEAT tốt

| Đặc tính | Mô tả |
|----------|-------|
| **Có thể hiểu** | Ngắn gọn, rõ ràng, dễ đọc |
| **Nguyên tử** | Mỗi FEAT chỉ mô tả **MỘT** chức năng duy nhất |
| **Có thể kiểm thử** | Có thể verify bằng test case cụ thể |
| **Không mập mờ** | Không có nhiều cách hiểu khác nhau |
| **Có thể truy vết** | Biết FEAT này được tạo từ STRQ nào |
| **Khả thi** | Có thể thực hiện được với nguồn lực hiện có |
| **Cần thiết** | Phải có giá trị cho người dùng hoặc hệ thống |

---

## 2.1 Hướng dẫn về tính nguyên tử

> ⚠️ **QUAN TRỌNG**: FEAT phải đủ nhỏ để mô tả **MỘT hành động cụ thể** (CRUD: Create, Read, Update, Delete hoặc tương đương).

### ❌ SAI - FEAT quá rộng (không nguyên tử):

| ID | Tên FEAT |
|----|----------|
| FEAT-08 | Quản lý hồ sơ nhân sự |

→ Chứa nhiều hành động: thêm, sửa, xóa, tìm kiếm, xuất file...

### ✅ ĐÚNG - FEAT nguyên tử:

| ID | Tên FEAT |
|----|----------|
| FEAT-08a | Thêm mới hồ sơ nhân sự |
| FEAT-08b | Sửa thông tin hồ sơ |
| FEAT-08c | Tìm kiếm hồ sơ |
| FEAT-08d | Xuất hồ sơ ra file |
| FEAT-08e | Đánh dấu thôi việc |

### Quy tắc kiểm tra:

1. **1 FEAT = 1 động từ hành động** (Thêm, Sửa, Xóa, Xem, Tìm, Xuất, Nhập...)
2. **Có thể viết 1 test case** cho FEAT đó
3. **Không chứa từ "và"** trong mô tả (nếu có → tách ra)

---

## 3. Các kỹ thuật chuyển đổi STRQ → FEAT

### 3.1 Sao chép (Copy)
- **Khi nào dùng**: STRQ đã có các thuộc tính của yêu cầu tốt
- **Cách làm**: Copy nguyên văn STRQ thành FEAT
- **Ví dụ**:
  - STRQ: "Người dùng có thể mua vé trực tuyến mà không cần gọi cho đại lý du lịch"
  - FEAT: Giữ nguyên

### 3.2 Phân tách (Split)
- **Khi nào dùng**: STRQ không nguyên tử (chứa nhiều chức năng)
- **Cách làm**: Tách thành 2+ FEAT riêng biệt
- **Ví dụ**:
  - STRQ: "Hệ thống cung cấp đặt chuyến bay, mua vé, đặt phòng khách sạn, đặt xe"
  - FEAT1: Đặt chuyến bay
  - FEAT2: Mua vé
  - FEAT3: Đặt phòng khách sạn
  - FEAT4: Đặt xe

### 3.3 Làm rõ ràng (Clarify)
- **Khi nào dùng**: STRQ mập mờ, không rõ ràng
- **Cách làm**: Giải thích, làm rõ nghĩa
- **Ví dụ**:
  - STRQ: "Người dùng có thể nhập mã sân bay hoặc thành phố"
  - FEAT: "Hệ thống chấp nhận cả mã sân bay (VD: HAN) hoặc tên thành phố (VD: Hà Nội) khi tìm kiếm chuyến bay"

### 3.4 Kết hợp (Combine)
- **Khi nào dùng**: Nhiều STRQ dư thừa, chồng chéo
- **Cách làm**: Gộp thành 1 FEAT duy nhất
- **Ví dụ**:
  - STRQ4: "Người dùng có thể so sánh giá chuyến bay từ các sân bay lân cận"
  - STRQ11: "Đối với chuyến bay đi và đến, người dùng có thể so sánh giá từ sân bay lân cận"
  - FEAT: "Hệ thống cho phép so sánh giá chuyến bay từ các sân bay lân cận cho cả chuyến đi và về"

### 3.5 Loại bỏ (Delete)
- **Khi nào dùng**: STRQ không khả thi, không cần thiết, hoặc mâu thuẫn
- **Cách làm**: Xóa STRQ, không tạo FEAT
- **Lưu ý**: Ghi chú lý do loại bỏ để truy vết

### 3.6 Sửa chữa (Correct)
- **Khi nào dùng**: STRQ có lỗi chính tả, ngữ pháp, dấu câu
- **Cách làm**: Sửa lại cho đúng
- **Ví dụ**:
  - STRQ: "Khả năng hủy mua vé sẽ có sẵn"
  - FEAT: "Người dùng có thể hủy vé đã mua"

### 3.7 Thêm chi tiết (Add Details)
- **Khi nào dùng**: STRQ không đủ chính xác để kiểm thử
- **Cách làm**: Bổ sung chi tiết cụ thể (số liệu, điều kiện, giá trị)
- **Ví dụ**:
  - STRQ: "Hệ thống phải có điều hướng rõ ràng"
  - FEAT: "Người dùng có thể truy cập bất kỳ chức năng chính nào trong tối đa 3 click từ trang chủ"

### 3.8 Thống nhất (Unify)
- **Khi nào dùng**: Nhiều STRQ dùng từ vựng/định dạng khác nhau
- **Cách làm**: Thống nhất về một chuẩn
- **Ví dụ**:
  - STRQ8: "Ngày hiển thị ở định dạng dd/mm/yyyy" (Pháp)
  - STRQ16: "Ngày hiển thị ở định dạng mm/dd/yyyy" (Mỹ)
  - FEAT: "Ngày được hiển thị theo cấu hình locale của người dùng (dd/mm/yyyy hoặc mm/dd/yyyy)"

### 3.9 Làm đầy đủ (Complete)
- **Khi nào dùng**: Tập STRQ chưa đầy đủ, thiếu yêu cầu quan trọng
- **Cách làm**: Bổ sung FEAT mới khi phát hiện thiếu
- **Lưu ý**: Ghi chú rằng FEAT này được bổ sung (không có STRQ gốc)

### 3.10 Khái quát hóa (Generalize)
- **Khi nào dùng**: STRQ quá chi tiết, chứa thông tin implementation không cần thiết
- **Cách làm**: Bỏ bớt chi tiết, giữ lại bản chất
- **Ví dụ**:
  - STRQ: "Lưu trữ dữ liệu khách hàng trong SQL Server với bảng Customer gồm 20 cột"
  - FEAT: "Hệ thống lưu trữ thông tin khách hàng"

---

## 4. Quy trình áp dụng

1. **Đọc từng STRQ** một cách cẩn thận
2. **Đánh giá** xem STRQ có thuộc tính của yêu cầu tốt không
3. **Chọn kỹ thuật** phù hợp từ 10 kỹ thuật trên
4. **Tạo FEAT** với ID, mô tả, và truy vết đến STRQ gốc
5. **Kiểm tra** FEAT có đủ 7 đặc tính tốt không
6. **Lặp lại** cho tất cả STRQ

---

## 5. Thuộc tính FEAT (theo RMP - Slide 2)

> Nguồn: Bài giảng "Lập kế hoạch quản lý yêu cầu" - Slide 2, Page 39-42

### 5.1 Các thuộc tính bắt buộc

| Thuộc tính | Mô tả | Giá trị |
|------------|-------|---------|
| **ID** | Mã định danh duy nhất | FEAT-01, FEAT-02, ... |
| **Tên FEAT** | Tên ngắn gọn | VD: "Thêm mới hồ sơ nhân sự" |
| **Mô tả** | Mô tả chi tiết chức năng | Câu hoàn chỉnh |
| **Priority** | Độ ưu tiên | High / Medium / Low |
| **Status** | Trạng thái | Proposed → Approved → Incorporated |

### 5.2 Các thuộc tính tùy chọn (khuyến nghị)

| Thuộc tính | Mô tả | Giá trị |
|------------|-------|---------|
| **Risk** | Mức độ rủi ro | High / Medium / Low |
| **Stability** | Mức độ ổn định (khả năng thay đổi) | High / Medium / Low |
| **Target Release** | Phiên bản dự kiến | VD: v1.0, Phase 1 |
| **Assigned To** | Người/nhóm phụ trách | Tên hoặc nhóm |
| **STRQ gốc** | ID các STRQ liên quan | VD: STRQ-01, STRQ-33 |
| **Kỹ thuật áp dụng** | Kỹ thuật chuyển đổi đã dùng | Copy/Split/Combine... |

### 5.3 Nơi lưu trữ FEAT

Theo Slide 2 (Page 22):
- **FEAT được lưu trong Tài liệu Trực quan (Vision Document)**
- Có thể lưu trong CSDL quản lý yêu cầu hoặc file Markdown

### 5.4 Cấu trúc bảng FEAT đề xuất (Phương án 2)

**File 1: `feat_list.md`** (Bảng chính - 4 cột)

| ID | Tên FEAT | Mô tả | Độ ưu tiên |
|----|----------|-------|------------|

**File 2: `strq_feat_traceability.md`** (Ma trận truy vết)

| STRQ | FEAT | Kỹ thuật |
|------|------|----------|

---

## 6. Lưu ý quan trọng

> ⚠️ **QUAN TRỌNG**: Việc lấy các FEAT từ các STRQ tạo cơ hội để:
> - Loại bỏ/sửa chữa các yêu cầu chưa tốt
> - Phát hiện yêu cầu bị thiếu
> - Giải quyết mâu thuẫn giữa các yêu cầu
> - Chuẩn hóa cách diễn đạt

> ⚠️ **TRUY VẾT**: Điều quan trọng là phải truy vết FEAT nào được bắt nguồn từ STRQ nào để:
> - Đảm bảo mọi STRQ đều được xử lý
> - Phân tích ảnh hưởng khi thay đổi yêu cầu
> - Thẩm tra hệ thống thỏa mãn đầy đủ mọi yêu cầu
