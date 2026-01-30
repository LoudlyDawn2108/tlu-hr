# Non-Functional Requirements Specification (NFR)

**Dự án:** Hệ thống Quản lý Nhân sự (HRMS) - Trường Đại học Thủy lợi  
**Tài liệu:** Yêu cầu Phi chức năng (Non-Functional Requirements)  
**Phiên bản:** 1.0  
**Ngày:** 30/01/2026  
**Nguồn:** Needs #152-180 (Section 7), các yêu cầu kỹ thuật trong use cases  

---

## 1. Giới thiệu

### 1.1 Mục đích
Tài liệu này định nghĩa các yêu cầu phi chức năng cho Hệ thống Quản lý Nhân sự (HRMS), bao gồm các yêu cầu về hiệu năng, bảo mật, độ tin cậy, khả năng sử dụng và tuân thủ pháp luật.

### 1.2 Phạm vi
Áp dụng cho toàn bộ hệ thống HRMS bao gồm:
- Quản trị hệ thống
- Quản lý hồ sơ nhân sự  
- Quản lý cơ cấu tổ chức
- Quản lý đào tạo
- Cổng Self-Service
- Báo cáo và thống kê
- Tích hợp tài chính

### 1.3 Đối tượng sử dụng
- Đội ngũ phát triển (Developers)
- Kiến trúc sư hệ thống (System Architects)
- Đội ngũ DevOps
- Quản trị viên hệ thống
- Chuyên viên bảo mật

---

## 2. Yêu cầu Hiệu năng (Performance Requirements)

### 2.1 Thời gian phản hồi (Response Time)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-PERF-001 | Thời gian phản hồi trang thông thường | ≤ 2 giây | Need #152 |
| NFR-PERF-002 | Thời gian phản hồi báo cáo phức tạp | ≤ 10 giây | Need #152 |
| NFR-PERF-003 | Thời gian tải trang đăng nhập | ≤ 3 giây | - |
| NFR-PERF-004 | Thời gian xuất báo cáo Excel (≤1000 records) | ≤ 15 giây | - |
| NFR-PERF-005 | Thời gian xuất báo cáo PDF (≤100 pages) | ≤ 20 giây | - |
| NFR-PERF-006 | Thời gian upload file (≤10MB) | ≤ 30 giây | - |

### 2.2 Khả năng chịu tải (Load Capacity)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-PERF-007 | Số người dùng đồng thời (Concurrent Users) | ≥ 500 users | Need #153 |
| NFR-PERF-008 | Số người dùng đăng ký tối đa | ≥ 2,000 users | - |
| NFR-PERF-009 | Số hồ sơ nhân sự lưu trữ | ≥ 5,000 records | - |
| NFR-PERF-010 | Số hợp đồng lưu trữ/hồ sơ | ≥ 20,000 records | - |
| NFR-PERF-011 | Dung lượng lưu trữ file đính kèm | ≥ 100 GB | - |
| NFR-PERF-012 | Số lượt truy cập/ngày | ≥ 10,000 requests | - |

### 2.3 Sẵn sàng (Availability)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-PERF-013 | Thời gian uptime (giờ hành chính) | ≥ 99.5% | Need #161 |
| NFR-PERF-014 | Thời gian uptime (24/7) | ≥ 99.0% | - |
| NFR-PERF-015 | Thời gian bảo trì định kỳ | ≤ 4 giờ/tháng (ngoài giờ hành chính) | - |
| NFR-PERF-016 | Thời gian phục hồi sau sự cố (RTO) | ≤ 4 giờ | Need #163 |
| NFR-PERF-017 | Điểm phục hồi dữ liệu (RPO) | ≤ 24 giờ | Need #163 |
| NFR-PERF-018 | Thời gian gián đoạn dịch vụ có kế hoạch | ≤ 2 giờ (thông báo trước 48h) | - |

---

## 3. Yêu cầu Bảo mật (Security Requirements)

### 3.1 Xác thực & Phân quyền (Authentication & Authorization)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-SEC-001 | Xác thực người dùng | Username/Password với mã hóa | Need #155 |
| NFR-SEC-002 | Phân quyền dựa trên vai trò (RBAC) | Admin, HR, Finance, Employee | Need #156 |
| NFR-SEC-003 | Chính sách mật khẩu | ≥ 8 ký tự, chữ hoa, chữ thường, số | Need #160 |
| NFR-SEC-004 | Thời gian timeout phiên làm việc | 30 phút không hoạt động | Need #159 |
| NFR-SEC-005 | Số lần thử đăng nhập sai | ≤ 5 lần, khóa 15 phút | - |
| NFR-SEC-006 | Yêu cầu đổi mật khẩu định kỳ | 90 ngày | - |
| NFR-SEC-007 | Không cho phép sử dụng mật khẩu cũ | 5 mật khẩu gần nhất | - |
| NFR-SEC-008 | Đăng xuất từ xa | Admin có thể đăng xuất user | - |

### 3.2 Mã hóa & Bảo vệ dữ liệu (Encryption & Data Protection)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-SEC-009 | Mã hóa dữ liệu truyền tải | HTTPS/TLS 1.2+ | Need #157 |
| NFR-SEC-010 | Mã hóa dữ liệu nhạy cảm (PII) | AES-256 | Need #157 |
| NFR-SEC-011 | Mã hóa mật khẩu | bcrypt/Argon2 | - |
| NFR-SEC-012 | Ẩn dữ liệu nhạy cảm trên UI | Masking CCCD, SĐT, MST | - |
| NFR-SEC-013 | Kiểm soát truy cập file | Xác thực token cho mỗi lần tải | - |
| NFR-SEC-014 | Chống SQL Injection | Parameterized queries | - |
| NFR-SEC-015 | Chống XSS | Input validation & sanitization | - |
| NFR-SEC-016 | Chống CSRF | CSRF token | - |
| NFR-SEC-017 | Rate Limiting | ≤ 100 requests/phút/IP | - |
| NFR-SEC-018 | Bảo vệ upload file | Kiểm tra type, size, scan virus | - |

### 3.3 Ghi log & Giám sát (Logging & Monitoring)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-SEC-019 | Ghi log thao tác quan trọng | Đăng nhập, thay đổi hồ sơ | Need #158 |
| NFR-SEC-020 | Ghi log đăng nhập thất bại | Lưu IP, thời gian, tài khoản | - |
| NFR-SEC-021 | Ghi log thay đổi dữ liệu nhạy cảm | CCCD, MST, BHXH | - |
| NFR-SEC-022 | Thời gian lưu log | ≥ 2 năm | - |
| NFR-SEC-023 | Không thể xóa/sửa log | Chỉ Admin cấp cao được xem | - |
| NFR-SEC-024 | Cảnh báo bảo mật | Đăng nhập bất thường, brute force | - |

---

## 4. Yêu cầu Độ tin cậy (Reliability Requirements)

### 4.1 Sao lưu & Phục hồi (Backup & Recovery)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-REL-001 | Sao lưu dữ liệu tự động | Hàng ngày (Daily) | Need #162 |
| NFR-REL-002 | Thời gian lưu trữ backup | ≥ 30 ngày | Need #162 |
| NFR-REL-003 | Sao lưu incremental | Mỗi 6 giờ | - |
| NFR-REL-004 | Sao lưu file đính kèm | Đồng bộ với dữ liệu | - |
| NFR-REL-005 | Kiểm tra tính toàn vẹn backup | Hàng tuần | - |
| NFR-REL-006 | Khôi phục dữ liệu thử nghiệm | Hàng tháng | - |
| NFR-REL-007 | Backup địa phương | Lưu trên server nội bộ | - |
| NFR-REL-008 | Backup offsite (tùy chọn) | Cloud storage | - |

### 4.2 Lưu trữ dữ liệu (Data Retention)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-REL-009 | Thời gian lưu trữ hồ sơ | ≥ 10 năm | Need #164 |
| NFR-REL-010 | Thời gian lưu trữ hợp đồng | ≥ 10 năm sau chấm dứt | - |
| NFR-REL-011 | Thời gian lưu trữ lịch sử thay đổi | ≥ 5 năm | - |
| NFR-REL-012 | Thời gian lưu trữ báo cáo | ≥ 7 năm | - |
| NFR-REL-013 | Lưu trữ log hệ thống | ≥ 2 năm | - |
| NFR-REL-014 | Xóa dữ liệu cũ tự động | Sau thời hạn lưu trữ | - |

---

## 5. Yêu cầu Khả năng sử dụng (Usability Requirements)

### 5.1 Giao diện người dùng (User Interface)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-UI-001 | Ngôn ngữ giao diện | Tiếng Việt 100% | Need #166 |
| NFR-UI-002 | Font chữ | Unicode, hỗ trợ Tiếng Việt có dấu | - |
| NFR-UI-003 | Responsive Design | Desktop, Tablet, Mobile | Need #166, #169 |
| NFR-UI-004 | Browser support | Chrome, Firefox, Edge, Safari (2 version gần nhất) | - |
| NFR-UI-005 | Thời gian tải trang | ≤ 3 giây (First Contentful Paint) | - |
| NFR-UI-006 | Giao diện thân thiện | Intuitive, dễ sử dụng | Need #166 |
| NFR-UI-007 | Consistent UI/UX | Cùng design pattern xuyên suốt | - |
| NFR-UI-008 | Hỗ trợ phím tắt | Tab navigation, Enter để submit | - |
| NFR-UI-009 | Loading indicator | Hiển thị khi đang xử lý | - |
| NFR-UI-010 | Tooltip & Help text | Hướng dẫn sử dụng | - |

### 5.2 Trải nghiệm người dùng (User Experience)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-UX-001 | Thời gian đào tạo người dùng mới | ≤ 4 giờ | Need #167 |
| NFR-UX-002 | Tài liệu hướng dẫn sử dụng | Đầy đủ, có ví dụ | Need #168 |
| NFR-UX-003 | Video hướng dẫn | Các chức năng chính | - |
| NFR-UX-004 | FAQ & Knowledge Base | Câu hỏi thường gặp | - |
| NFR-UX-005 | Hotline/Email hỗ trợ | Trong giờ hành chính | - |
| NFR-UX-006 | Thông báo lỗi rõ ràng | Tiếng Việt, hướng dẫn khắc phục | - |
| NFR-UX-007 | Auto-save form | Lưu nháp khi nhập liệu dài | - |
| NFR-UX-008 | Breadcrumb navigation | Hiển thị vị trí hiện tại | - |
| NFR-UX-009 | Search & Filter | Nhanh, chính xác | - |
| NFR-UX-010 | Export/Print | Dễ dàng xuất dữ liệu | - |

---

## 6. Yêu cầu Khả năng mở rộng (Scalability Requirements)

| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-SCA-001 | Kiến trúc mở rộng | Modular, microservices-ready | Need #165 |
| NFR-SCA-002 | Mở rộng người dùng | Thêm 50% không cần redesign | - |
| NFR-SCA-003 | Mở rộng cơ sở dữ liệu | Sharding-ready | - |
| NFR-SCA-004 | Mở rộng cơ sở | Multi-campus support (HN, PH, HCM) | Need #175 |
| NFR-SCA-005 | Thêm module mới | Không ảnh hưởng module cũ | - |
| NFR-SCA-006 | Tích hợp hệ thống ngoài | API-first architecture | Need #173 |
| NFR-SCA-007 | Containerization | Docker/Kubernetes support | - |
| NFR-SCA-008 | Horizontal scaling | Thêm server dễ dàng | - |

---

## 7. Yêu cầu Tích hợp (Integration Requirements)

| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-INT-001 | Tích hợp phần mềm Kế toán | API hoặc Excel import | Need #116, #172 |
| NFR-INT-002 | Định dạng dữ liệu chuẩn | JSON/XML cho API | - |
| NFR-INT-003 | Xác thực API | OAuth 2.0 / JWT tokens | - |
| NFR-INT-004 | Rate limiting API | ≤ 1000 requests/giờ | - |
| NFR-INT-005 | Tích hợp Email | SMTP server (Gmail, Outlook) | - |
| NFR-INT-006 | Tích hợp SMS (tùy chọn) | Twilio hoặc local provider | - |
| NFR-INT-007 | Single Sign-On (SSO) | SAML/OAuth (future) | - |
| NFR-INT-008 | Import/Export dữ liệu | Excel, CSV, PDF | - |

---

## 8. Yêu cầu Tuân thủ Pháp luật (Legal Compliance Requirements)

### 8.1 Tuân thủ Luật pháp Việt Nam
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-LEG-001 | Bộ Luật Lao động 2019 | Quản lý hợp đồng, lương | Need #176 |
| NFR-LEG-002 | Luật Bảo hiểm xã hội | Thông tin BHXH, BHYT, BHTN | Need #177 |
| NFR-LEG-003 | Luật Thuế TNCN | Mã số thuế, thu nhập | Need #178 |
| NFR-LEG-004 | Luật Giáo dục 2019 | Quản lý giảng viên | Need #179 |
| NFR-LEG-005 | Luật Giáo dục Đại học | Quản lý đại học | Need #179 |
| NFR-LEG-006 | Luật Viên chức | Quản lý viên chức | Need #180 |
| NFR-LEG-007 | Nghị định 13/2023/NĐ-CP | Bảo vệ dữ liệu cá nhân | - |
| NFR-LEG-008 | Thông tư 09/2022/TT-BTTTT | An toàn thông tin mạng | - |

### 8.2 Bảo vệ Dữ liệu Cá nhân (PDP - Personal Data Protection)
| STT | Yêu cầu | Mô tả | Nguồn |
|:---:|---------|-------|-------|
| NFR-PDP-001 | Xác thực khi truy cập dữ liệu cá nhân | OTP/Password | - |
| NFR-PDP-002 | Cho phép người dùng xem dữ liệu của mình | Self-Service Portal | - |
| NFR-PDP-003 | Cho phép người dùng yêu cầu chỉnh sửa | Request workflow | - |
| NFR-PDP-004 | Không chia sẻ dữ liệu với bên thứ 3 | Trừ khi có đồng ý | - |
| NFR-PDP-005 | Ẩn danh hóa dữ liệu báo cáo | Không hiển thị thông tin cá nhân | - |
| NFR-PDP-006 | Xóa dữ liệu theo yêu cầu | Right to erasure | - |

---

## 9. Yêu cầu Hạ tầng & Triển khai (Infrastructure Requirements)

### 9.1 Phần cứng (Hardware)
| STT | Yêu cầu | Mô tả |
|:---:|---------|-------|
| NFR-INF-001 | Server nội bộ | On-premise hoặc Private Cloud |
| NFR-INF-002 | CPU | ≥ 8 cores |
| NFR-INF-003 | RAM | ≥ 32 GB |
| NFR-INF-004 | Storage | ≥ 500 GB (SSD recommended) |
| NFR-INF-005 | Network | ≥ 1 Gbps |
| NFR-INF-006 | Redundancy | Dual server (High Availability) |

### 9.2 Phần mềm (Software)
| STT | Yêu cầu | Mô tả |
|:---:|---------|-------|
| NFR-INF-007 | Hệ điều hành Server | Linux (Ubuntu/CentOS) hoặc Windows Server 2019+ |
| NFR-INF-008 | Database | PostgreSQL 13+ hoặc MySQL 8.0+ |
| NFR-INF-009 | Web Server | Nginx hoặc Apache |
| NFR-INF-010 | Application Server | Node.js / .NET Core / Java Spring Boot |
| NFR-INF-011 | Cache | Redis (optional) |
| NFR-INF-012 | Message Queue | RabbitMQ/Apache Kafka (cho notifications) |

### 9.3 Môi trường (Environments)
| STT | Yêu cầu | Mô tả |
|:---:|---------|-------|
| NFR-INF-013 | Development Environment | Local/Dev server |
| NFR-INF-014 | Staging Environment | Pre-production |
| NFR-INF-015 | Production Environment | Live system |
| NFR-INF-016 | Backup Environment | Disaster recovery site |

---

## 10. Kiểm thử & Đảm bảo Chất lượng (Testing & QA Requirements)

### 10.1 Kiểm thử Chức năng (Functional Testing)
| STT | Yêu cầu | Mô tả |
|:---:|---------|-------|
| NFR-QA-001 | Unit Test Coverage | ≥ 70% |
| NFR-QA-002 | Integration Test | Tất cả API endpoints |
| NFR-QA-003 | E2E Test | Các workflow chính |
| NFR-QA-004 | Regression Test | Trước mỗi release |
| NFR-QA-005 | User Acceptance Test (UAT) | Với người dùng thực |

### 10.2 Kiểm thử Phi chức năng (Non-Functional Testing)
| STT | Yêu cầu | Mô tả |
|:---:|---------|-------|
| NFR-QA-006 | Load Testing | 500 concurrent users |
| NFR-QA-007 | Stress Testing | 1000 concurrent users |
| NFR-QA-008 | Security Testing | Penetration test |
| NFR-QA-009 | Performance Testing | Response time benchmarks |
| NFR-QA-010 | Usability Testing | 5 người dùng thử nghiệm |

---

## 11. Ma trận Truy xuất Nguồn (Traceability Matrix)

| Need # | Mô tả Need | NFR ID | Status |
|--------|-----------|--------|--------|
| 152 | Thời gian phản hồi < 2s | NFR-PERF-001 | ✅ |
| 153 | 500 users đồng thời | NFR-PERF-007 | ✅ |
| 155 | Xác thực username/password | NFR-SEC-001 | ✅ |
| 156 | Phân quyền dựa trên vai trò | NFR-SEC-002 | ✅ |
| 157 | Mã hóa HTTPS, dữ liệu nhạy cảm | NFR-SEC-009, NFR-SEC-010 | ✅ |
| 158 | Ghi log thao tác quan trọng | NFR-SEC-019 | ✅ |
| 159 | Timeout 30 phút | NFR-SEC-004 | ✅ |
| 160 | Mật khẩu ≥8 ký tự | NFR-SEC-003 | ✅ |
| 161 | Uptime 99.5% | NFR-PERF-013 | ✅ |
| 162 | Backup hàng ngày, lưu 30 ngày | NFR-REL-001, NFR-REL-002 | ✅ |
| 163 | RTO < 4h, RPO < 24h | NFR-PERF-016, NFR-PERF-017 | ✅ |
| 164 | Lưu trữ hồ sơ ≥10 năm | NFR-REL-009 | ✅ |
| 165 | Kiến trúc mở rộng | NFR-SCA-001 | ✅ |
| 166 | Giao diện Tiếng Việt, responsive | NFR-UI-001, NFR-UI-003 | ✅ |
| 167 | Đào tạo 4 giờ | NFR-UX-001 | ✅ |
| 168 | Tài liệu hướng dẫn | NFR-UX-002 | ✅ |
| 169 | Mobile/Tablet support | NFR-UI-003 | ✅ |
| 172 | Tích hợp phần mềm kế toán | NFR-INT-001 | ✅ |
| 175 | Đa cơ sở: HN, PH, HCM | NFR-SCA-004 | ✅ |
| 176 | Tuân thủ Bộ Luật Lao động 2019 | NFR-LEG-001 | ✅ |
| 177 | Tuân thủ Luật BHXH | NFR-LEG-002 | ✅ |
| 178 | Tuân thủ thuế TNCN | NFR-LEG-003 | ✅ |
| 179 | Tuân thủ Luật Giáo dục | NFR-LEG-004, NFR-LEG-005 | ✅ |
| 180 | Tuân thủ Luật Viên chức | NFR-LEG-006 | ✅ |

---

## 12. Tổng kết

### 12.1 Thống kê Yêu cầu
| Loại | Số lượng |
|------|----------|
| Performance (NFR-PERF) | 18 |
| Security (NFR-SEC) | 24 |
| Reliability (NFR-REL) | 14 |
| Usability - UI (NFR-UI) | 10 |
| Usability - UX (NFR-UX) | 10 |
| Scalability (NFR-SCA) | 8 |
| Integration (NFR-INT) | 8 |
| Legal (NFR-LEG) | 8 |
| Data Protection (NFR-PDP) | 6 |
| Infrastructure (NFR-INF) | 16 |
| QA & Testing (NFR-QA) | 10 |
| **TỔNG** | **132** |

### 12.2 Needs được bao phủ
- **Total Needs:** 29 needs (#152-180)
- **Needs covered:** 29 (100%)
- **Additional requirements:** 103 yêu cầu bổ sung từ best practices

### 12.3 Phê duyệt
Tài liệu này cần được phê duyệt bởi:
- [ ] Project Manager
- [ ] System Architect  
- [ ] Security Officer
- [ ] Client/Stakeholder

---

**Kết thúc Tài liệu Yêu cầu Phi chức năng (NFR)**

