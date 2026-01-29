# Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi

Dự án **Phân tích và Thiết kế Hệ thống Quản lý Nhân sự (HRMS)** dành cho **Trường Đại học Thủy lợi (TLU)**. Hệ thống quản lý hơn 1,200 cán bộ, giảng viên, nhân viên tại 3 cơ sở: Hà Nội, Phố Hiến (Hưng Yên), TP.HCM.

---

## 📌 Tổng quan dự án

| Thông tin | Chi tiết |
|-----------|----------|
| **Tên dự án** | TLU-HRMS |
| **Phạm vi Phase 1** | MVP - 8 Modules cốt lõi |
| **Thời gian** | 2 tháng |
| **Nhân lực** | 14 thành viên (5 Team) |
| **Số yêu cầu** | 118 STRQ → 62 FEAT |
| **Số Use Case** | 10 UC |

---

## 🚀 Các Module Phase 1 (MVP)

| # | Module | Mã | Mô tả | Ưu tiên |
|---|--------|-----|-------|---------|
| 1 | Tài khoản & Phân quyền | AU | Đăng nhập, phân quyền theo vai trò | ⭐⭐⭐ |
| 2 | Hồ sơ Nhân sự | ER | Thông tin cá nhân, gia đình, Đảng viên | ⭐⭐⭐ |
| 3 | Trình độ, Chức danh | QM | Bằng cấp, học hàm, học vị, ngạch | ⭐⭐⭐ |
| 4 | Cơ cấu Tổ chức | OS | Cây đơn vị (Trường → Khoa → Bộ môn) | ⭐⭐⭐ |
| 5 | Hợp đồng Lao động | CM | 4 loại HĐ, gia hạn, chuyển đổi | ⭐⭐⭐ |
| 6 | Bậc lương | PB | Ngạch/bậc, 6 loại phụ cấp | ⭐⭐ |
| 7 | Báo cáo Thống kê | RP | Thống kê nhân sự, xuất PDF/Excel | ⭐⭐ |
| 8 | Self-Service Portal | SS | CBGV tra cứu thông tin cá nhân | ⭐ |

**Phase 2 (Mở rộng):** Tuyển dụng, Đào tạo, Chấm công, NCKH, Giờ giảng, Đánh giá viên chức, Tính lương tự động.

---

## 👥 Các tác nhân hệ thống (Actors)

| Actor | Mô tả |
|-------|-------|
| Quản trị viên (Admin) | Quản trị hệ thống, phân quyền |
| Cán bộ TCCB | Quản lý hồ sơ, hợp đồng |
| Cán bộ TCKT | Quản lý bậc lương, phụ cấp |
| Lãnh đạo | Xem báo cáo, phê duyệt |
| Trưởng đơn vị | Quản lý nhân sự đơn vị |
| CBGV/NV | Tra cứu thông tin cá nhân |

---

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| Frontend | React.js 18.x |
| Backend | Spring Boot 3.x |
| Database | PostgreSQL 15.x |
| Authentication | Spring Security + JWT |
| API Docs | Swagger/OpenAPI 3.0 |
| Version Control | Git + GitHub |

---

## 📂 Cấu trúc tài liệu

| File | Mô tả |
|------|-------|
| [BAO_CAO_CHUONG_1.md](BAO_CAO_CHUONG_1.md) | 📄 Báo cáo Chương 1 đầy đủ (~850 dòng) |
| [user_requirements_mvp.md](user_requirements_mvp.md) | 📋 Yêu cầu MVP: 119 STRQ → 62 FEAT |

---

## 📊 Thống kê dự án

| Tiêu chí | Giá trị |
|----------|---------|
| Tổng số STRQ | **118** |
| Tổng số FEAT | **62** |
| Số Module (MVP) | **8** |
| Số Use Case | **10** |
| Số Actor | **6** |

---

## ⚖️ Cơ sở pháp lý

- Bộ Luật Lao động 2019
- Luật Viên chức và các văn bản hướng dẫn
- Luật Giáo dục Đại học
- Quy chế chi tiêu nội bộ TLU

---

## 👥 Đội phát triển

| Team | Vai trò | Số lượng |
|------|---------|----------|
| Team 1 | BA/PM | 2 |
| Team 2 | SA/Design | 4 |
| Team 3 | Developer | 4 |
| Team 4 | Tester | 2 |
| Team 5 | DevOps | 2 |
| **Tổng** | | **14** |

---

*Dự án đang trong giai đoạn: **Phân tích & Lập kế hoạch (Phase 1 - MVP)***
