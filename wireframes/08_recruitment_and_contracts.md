# Contract Management

## Screen Metadata

| Item       | Detail                                 |
| ---------- | -------------------------------------- |
| Screen ID  | CM-001                                 |
| Module     | Contract Management (FR-CM)            |
| Related FR | FR-CM-001 to FR-CM-013                 |

---

## 1. Contract Creation Wizard (Tao Hop Dong)

**Use Case:** Creating a new contract for a new employee or renewing existing.

**Scope:** FR-CM-001 to FR-CM-008

```
+------------------------------------------------------------------------+
|  TAO HOP DONG MOI (Buoc 2/3)                                           |
+------------------------------------------------------------------------+
|                                                                        |
|  Nhan su: Tran Van B                                                   |
|  Loai: Giang vien (Hoc thuat)                                          |
|                                                                        |
|  1. THONG TIN HOP DONG                                                 |
|  +------------------------------------------------------------------+  |
|  | Loai hop dong: [ Hop dong lam viec - Thu viec (12 thang)      v] |  |
|  | So hop dong:   [ HD-2026-156 ] [Auto Gen]                        |  |
|  | Chuc danh:     [ Giang vien (V.07.01.03)                      v] |  |
|  |                                                                  |  |
|  | Tu ngay:       [ 01/03/2026 ]                                    |  |
|  | Den ngay:      [ 28/02/2027 ] (Auto-calc based on type)          |  |
|  |                                                                  |  |
|  | Don vi:        [ Khoa CNTT - Bo mon Khoa hoc may tinh         v] |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  2. THONG TIN LUONG                                                    |
|  +------------------------------------------------------------------+  |
|  | Muc luong:     [ Theo he so luong Nha nuoc                    v] |  |
|  | He so:         [ 2.34 ] (Bac 1)                                  |  |
|  | Luong co ban:  2,340,000 x 2.34 = 5,475,600 VND                  |  |
|  |                                                                  |  |
|  | Phu cap:                                                        |  |
|  | - Uu dai nganh: 25% x 5,475,600 = 1,368,900 VND                  |  |
|  | - Chuc vu: 0 VND (chua co)                                       |  |
|  |                                                                  |  |
|  | TONG THU NHAP DU KIEN: 6,844,500 VND/thang                       |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  3. VAN BAN KEM THEO                                                   |
|  +------------------------------------------------------------------+  |
|  | Mau in: [ Mau HD Vien chuc 2026 v ]                              |  |
|  | [Xem truoc mau in]                                               |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  [< Quay lai]              [Luu nhap]       [Tao & Gui duyet >]        |
+------------------------------------------------------------------------+
```

---

## 2. Contract List & Search (Danh sach Hop dong)

**Scope:** FR-CM-001, FR-CM-005

```
+------------------------------------------------------------------------+
|  [Sidebar]  |  Hop dong > Danh sach                                    |
+-------------|----------------------------------------------------------+
|             |                                                          |
|  QUAN LY    |  DANH SACH HOP DONG                    [+ Tao hop dong]  |
|  HOP DONG   |                                                          |
|             |  Filter: [Trang thai v] [Loai HD v] [Don vi v] [Tim kiem]|
|  [Danh sach]|                                                          |
|  [Sap het]  |  +------------------------------------------------------+ |
|  [Mau in]   |  | Ma HD      | Nhan su    | Loai      | Tu ngay  | TT  | |
|  [Bao cao]  |  |------------|------------|-----------|----------|-----| |
|             |  | HD-2026-01 | Nguyen A   | KXDTH     | 01/2020  | [v] | |
|             |  | HD-2026-02 | Tran B     | 12 thang  | 03/2025  | [v] | |
|             |  | HD-2026-03 | Le C       | Thu viec  | 01/2026  | [!] | |
|             |  +------------------------------------------------------+ |
|             |                                                          |
|             |  [!] = Sap het han (trong 60 ngay)                        |
|             |  [v] = Dang hieu luc                                      |
+------------------------------------------------------------------------+
```

---

## 3. Contract Alerts & Mass Actions (Xu ly Hop dong)

**Scope:** FR-CM-005, FR-CM-012 (Alerts and Renewal)

```
+------------------------------------------------------------------------+
|  HOP DONG SAP HET HAN (Thang 03/2026)                                  |
+------------------------------------------------------------------------+
|                                                                        |
|  [Chon tat ca] [Gia han hang loat] [Thong bao hang loat]               |
|                                                                        |
|  | # | Nhan su    | Loai HD   | Ngay het han | De xuat HT      |
|  |---|------------|-----------|--------------|-----------------|
|  | 1 | Nguyen X   | HD 12T    | 01/03/2026   | [-> HD KXDTH]   |
|  |   | (Lan 2)    |           |              | (Da ky 2 lan)   |
|  |---|------------|-----------|--------------|-----------------|
|  | 2 | Tran Y     | Thu viec  | 15/03/2026   | [-> HD 12T]     |
|  |   |            |           |              |                 |
|  |---|------------|-----------|--------------|-----------------|
|  | 3 | Le Z       | Thinh g.  | 31/03/2026   | [Ket thuc]      |
|  |   |            |           |              |                 |
|                                                                        |
|  ACTION MODAL (Nguyen X):                                              |
|  +------------------------------------------------------------------+  |
|  | Chuyen doi loai hop dong:                                        |  |
|  | Tu: HD Xac dinh thoi han (12T)                                   |  |
|  | Sang: [ Hop dong Khong Xac dinh Thoi han                      v] |  |
|  |                                                                  |  |
|  | [Tao Phu luc HD]  [Ky HD Moi]                                    |  |
|  +------------------------------------------------------------------+  |
+------------------------------------------------------------------------+
```

---

## 4. Contract Type Transition Rules

**Scope:** FR-CM-007, FR-CM-012, FR-CM-013

```
+------------------------------------------------------------------------+
|  QUY TRINH CHUYEN DOI HOP DONG                                         |
+------------------------------------------------------------------------+
|                                                                        |
|  THU VIEC (6-12 thang)                                                 |
|       |                                                                |
|       v                                                                |
|  +-------------------+                                                 |
|  | Danh gia thu viec |                                                 |
|  +-------------------+                                                 |
|       |                                                                |
|       +-----> Dat -----> HD XAC DINH THOI HAN (12 thang) ----+        |
|       |                         |                             |        |
|       +-----> Khong dat ------> KET THUC                      |        |
|                                 |                             |        |
|                                 v (Lan 2)                     |        |
|                    +-----> HD KHONG XAC DINH THOI HAN         |        |
|                    |                                          |        |
|                    +------------------------------------------+        |
|                                                                        |
|  Luu y:                                                                |
|  - Toi da 2 lan ky HD xac dinh thoi han                                |
|  - Sau 2 lan phai chuyen KXDTH hoac ket thuc                           |
|  - Canh bao truoc 60 ngay khi HD sap het han                           |
|                                                                        |
+------------------------------------------------------------------------+
```

---

## 5. Contract Print Templates

**Scope:** FR-CM-008, FR-CM-009

```
+------------------------------------------------------------------------+
|  MAU IN HOP DONG                                                       |
+------------------------------------------------------------------------+
|                                                                        |
|  Chon mau:                                                             |
|  +------------------------------------------------------------------+  |
|  | ( ) Mau HD Vien chuc - Thu viec                                  |  |
|  | (x) Mau HD Vien chuc - Xac dinh thoi han                         |  |
|  | ( ) Mau HD Vien chuc - Khong xac dinh thoi han                   |  |
|  | ( ) Mau HD Thinh giang                                           |  |
|  | ( ) Mau Phu luc hop dong                                         |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  XEM TRUOC:                                                            |
|  +------------------------------------------------------------------+  |
|  |                                                                  |  |
|  |          CONG HOA XA HOI CHU NGHIA VIET NAM                      |  |
|  |            Doc lap - Tu do - Hanh phuc                           |  |
|  |                     ----o0o----                                  |  |
|  |                                                                  |  |
|  |              HOP DONG LAM VIEC                                   |  |
|  |              So: HD-2026-156                                     |  |
|  |                                                                  |  |
|  |  Can cu Luat Vien chuc so 58/2010/QH12...                        |  |
|  |  Can cu Nghi dinh 115/2020/ND-CP...                              |  |
|  |                                                                  |  |
|  |  Hom nay, ngay ... thang ... nam 2026                            |  |
|  |  Tai: Truong Dai hoc Thuy loi                                    |  |
|  |  Chung toi gom:                                                  |  |
|  |                                                                  |  |
|  |  BEN A: TRUONG DAI HOC THUY LOI                                  |  |
|  |  Dia chi: 175 Tay Son, Dong Da, Ha Noi                           |  |
|  |  Dai dien: [Ho ten Hieu truong]                                  |  |
|  |  Chuc vu: Hieu truong                                            |  |
|  |                                                                  |  |
|  |  BEN B: Ong/Ba [Ho ten nhan vien]                                |  |
|  |  Sinh ngay: [dd/mm/yyyy]                                         |  |
|  |  CCCD: [So CCCD]                                                 |  |
|  |  ...                                                             |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  [In hop dong]  [Xuat PDF]  [Gui email cho nhan vien]                  |
+------------------------------------------------------------------------+
```

---

## 6. Contract History (Lich su Hop dong)

**Scope:** FR-CM-010, FR-CM-011

```
+------------------------------------------------------------------------+
|  LICH SU HOP DONG - NGUYEN VAN A                                       |
+------------------------------------------------------------------------+
|                                                                        |
|  +------------------------------------------------------------------+  |
|  | # | Loai HD          | Tu        | Den       | Trang thai       |  |
|  |---|------------------|-----------|-----------|------------------|  |
|  | 1 | Thu viec         | 01/2020   | 12/2020   | Da ket thuc      |  |
|  | 2 | XDTH (Lan 1)     | 01/2021   | 12/2021   | Da ket thuc      |  |
|  | 3 | XDTH (Lan 2)     | 01/2022   | 12/2022   | Da ket thuc      |  |
|  | 4 | KXDTH            | 01/2023   | Vo thoi han| Dang hieu luc   |  |
|  +------------------------------------------------------------------+  |
|                                                                        |
|  TIMELINE:                                                             |
|  2020      2021      2022      2023      2024      2025      2026     |
|  |--Thu viec--|--XDTH 1--|--XDTH 2--|----------KXDTH----------|       |
|                                                                        |
|  [Xem chi tiet HD hien tai]  [In lich su HD]                          |
+------------------------------------------------------------------------+
```
