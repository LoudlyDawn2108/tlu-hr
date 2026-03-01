# Database Schema Review & Revision — HRMS

## 1. FEAT → Schema Coverage Matrix

Below is a complete mapping of every FEAT to the schema tables that support it. **Gaps found in the original schema are marked with ⚠️.**

| FEAT | Description | Original Schema | Gap? | Revised Schema |
|------|-------------|-----------------|------|----------------|
| **1.1** Login | `auth_users` + `session` | ✅ | — | ✅ |
| **1.2** Logout | `session` (delete row) | ✅ | — | ✅ |
| **1.3** Auto-logout 30min | `session.expiresAt` sliding | ✅ | — | ✅ Added `idx_session_expires` |
| **1.4** Change password | `auth_users.password_hash` | ✅ | — | ✅ |
| **2.1** Search users | `auth_users` + join `employees`, `auth_user_roles` | ⚠️ Missing index on `auth_users.status` | ✅ Added index |
| **2.2** Add user | `auth_users`, `auth_user_roles` | ✅ | — | ✅ |
| **2.3** Edit user | `auth_users`, `auth_user_roles` | ✅ | — | ✅ |
| **2.4** Lock/Unlock user | `auth_users.status` | ✅ | — | ✅ |
| **2.5** Auto-lock terminated | `auth_users.status` ← `employees.work_status` | ✅ (app logic) | — | ✅ |
| **3.1** Org tree | `campuses` + `org_units` (parent_id) | ✅ | — | ✅ |
| **3.2** Add org unit | `org_units` | ✅ | — | ✅ |
| **3.3** Edit org unit | `org_units` | ✅ | — | ✅ |
| **3.4** Dissolve/Merge | `org_units.status` + `org_unit_status_events` | ✅ | — | ✅ |
| **3.5** Appoint to unit | `employee_assignments` | ⚠️ No `event_type` column to distinguish appoint vs dismiss | ✅ Added `event_type` column |
| **3.6** Dismiss from unit | `employee_assignments` | ⚠️ Same as above | ✅ Fixed |
| **3.7** View org detail | Read-only query | ✅ | — | ✅ |
| **4.1** Create contract | `employment_contracts` + `contract_types` | ⚠️ No `renewal_count` or `previous_contract_id` for renewal tracking (UC 5.22 step 5) | ✅ Added both columns |
| **5.1** Record evaluation | `employee_evaluations` | ⚠️ No visibility control (UC 5.26 step 3.2: hide from EMPLOYEE/TCKT roles) | ✅ Added `visible_to_employee`, `visible_to_tckt` |
| **6.1** Search employees | `employees` (full-text) | ⚠️ No trigram index for Vietnamese name search | ✅ Added `gin_trgm_ops` index |
| **6.2** Filter employees | `employees` columns | ⚠️ Missing `academic_title`, `academic_rank` columns needed by UC 5.24 filter dropdowns ("Chức danh khoa học: GS, PGS") | ✅ Added 4 academic columns |
| **6.3** Add employee | `employees` + all sub-entity tables | ⚠️ Missing `education_level`, `training_level` (UC 5.25: "Trình độ văn hóa, Trình độ đào tạo") | ✅ Added |
| **6.4** Edit employee | Same tables | ✅ | — | ✅ |
| **6.5** Mark terminated | `employee_terminations` | ⚠️ No `is_auto` flag to distinguish manual vs auto termination (FEAT 6.6) | ✅ Added |
| **6.6** Auto-terminate | App job + `employee_terminations` | ⚠️ Same as above | ✅ Fixed |
| **6.7** View employee detail | Read-only query | ✅ | — | ✅ |
| **6.8** Print/Export | App logic (PDF/Excel gen) | ✅ (no schema needed) | — | ✅ |
| **7.1** Create training | `training_courses` | ✅ | — | ✅ |
| **7.2** Edit training | `training_courses` | ✅ | — | ✅ |
| **7.3** View training detail | Read-only query | ✅ | — | ✅ |
| **7.4** Record results | `training_results` | ✅ | — | ✅ |
| **8.1–8.4** Salary config | `salary_coefficients` | ✅ | — | ✅ |
| **8.5–8.7** Allowance config | `allowance_types` | ✅ | — | ✅ |
| **8.8–8.10** Contract type config | `contract_types` | ✅ | — | ✅ |
| **9.1** Statistics/Reports | Queries across all tables | ⚠️ No materialized views, no `old_values`/`new_values` in audit_logs for history | ✅ Added 3 materialized views + audit snapshots |
| **10.1** View own profile | `employees` + sub-entity tables via `auth_users.employee_id` | ✅ | — | ✅ |
| **10.2** View own org unit | `org_units` via `employees.current_org_unit_id` | ✅ | — | ✅ |
| **11.1** Register for training | `training_registrations` | ✅ | — | ✅ |
| **11.2** View registered courses | `training_registrations` + `training_courses` | ✅ | — | ✅ |

## 2. Issues Found in Original Schema

### 2.1 Hard-coded CHECK Enums (not data-driven)

The original schema uses `CHECK (column IN ('val1','val2',...))` for all enumerated values. This means:

- Adding a new org_unit_type (e.g., `'VIEN'`) requires `ALTER TABLE ... DROP CONSTRAINT ... ADD CONSTRAINT`.
- Adding a new role requires DDL changes.
- Gender, work_status, contract_status — all hard-coded.

**Fix:** Introduced `catalog_categories` + `catalog_items` tables. The application validates against these lookups at runtime. CHECK constraints are removed so new values can be inserted via the admin UI.

### 2.2 Missing Columns for Use Cases

| Table | Missing Column(s) | Required By |
|-------|-------------------|-------------|
| `employees` | `education_level`, `training_level`, `academic_title`, `academic_rank` | UC 5.24 (filter by "Chức danh khoa học"), UC 5.25 (create profile) |
| `employee_assignments` | `event_type` | UC 5.30 (appoint) vs UC 5.31 (dismiss) — need to distinguish |
| `employee_evaluations` | `visible_to_employee`, `visible_to_tckt` | UC 5.26 step 3.2: TCCB can hide evaluations per role |
| `employee_terminations` | `is_auto` | FEAT 6.6: auto-terminate vs manual |
| `employment_contracts` | `renewal_count`, `previous_contract_id` | UC 5.22 step 5: check max renewals per type |
| `contract_appendices` | `appendix_no`, `appendix_file_id` | UC 5.26: appendix management with file upload |
| `audit_logs` | `old_values`, `new_values`, `ip_address`, `user_agent` | FEAT 9.1 reporting, NFR item 8 |

### 2.3 Missing Indexes for Performance

| Table | Missing Index | Required By |
|-------|--------------|-------------|
| `employees` | `work_status`, `contract_status`, `gender` | UC 5.24 filter dropdowns |
| `employment_contracts` | `status`, `(effective_from, effective_to)` | UC 5.22 contract overlap check, FEAT 6.6 auto-expire |
| `training_courses` | `status`, `(registration_from, registration_to)` | UC 5.40 — list open courses |
| `session` | `expiresAt` | FEAT 1.3 — cleanup expired sessions |
| `auth_users` | `status` | FEAT 2.1 search/filter by status |
| `audit_logs` | `created_at`, `action` | FEAT 9.1 reporting queries |

### 2.4 Missing Field-Level Permissions Table

VIS 3.4.2 requires "Phân quyền chi tiết đến mức trường dữ liệu (Field-level security)". The original schema only has role-based access. 

**Fix:** Added `auth_permissions` table with `(role_id, resource, field, action, is_allowed)`.

### 2.5 No Reporting Support

FEAT 9.1 requires 7 types of reports (UC 5.37). With the original schema, all reports are computed on-the-fly which won't meet the <2s response NFR.

**Fix:** Added 3 materialized views:
- `mv_headcount_by_org_unit` — headcount by department
- `mv_employee_turnover` — monthly termination counts
- `mv_contract_summary` — contract distribution by type/status

### 2.6 No `updated_at` on Some Tables

Several sub-entity tables (`employee_family_members`, `employee_party_memberships`, `employee_certifications`, etc.) were missing `updated_at` timestamps needed for edit tracking (UC 5.26).

## 3. Data-Driven Design Principles Applied

### 3.1 Catalog Pattern

```
┌──────────────────────┐      ┌──────────────────────┐
│ catalog_categories   │      │ catalog_items         │
├──────────────────────┤      ├──────────────────────┤
│ id (PK)              │──1:N─│ id (PK)              │
│ category_code (UQ)   │      │ category_id (FK)     │
│ category_name        │      │ code                 │
│ is_system            │      │ label                │
└──────────────────────┘      │ sort_order           │
                              │ is_active            │
                              │ is_default           │
                              └──────────────────────┘
```

**Categories to seed:**

| category_code | Example items |
|---------------|---------------|
| `GENDER` | NAM, NU, KHAC |
| `WORK_STATUS` | pending, working, terminated |
| `CONTRACT_STATUS` | none, valid, expired, renewal_wait |
| `ORG_UNIT_TYPE` | HOI_DONG, BAN, KHOA, PHONG, BO_MON, PHONG_THI_NGHIEM, TRUNG_TAM |
| `ORG_UNIT_STATUS` | active, merged, dissolved |
| `ORG_EVENT_TYPE` | DISSOLVE, MERGE |
| `ORG_EVENT_REASON` | GIAI_THE, SAP_NHAP, TAI_CO_CAU, KHAC |
| `FAMILY_RELATION` | CHA, ME, VO_CHONG, CON, NGUOI_PHU_THUOC, KHAC |
| `PARTY_ORG_TYPE` | DOAN, DANG |
| `EVAL_TYPE` | REWARD, DISCIPLINE |
| `CATALOG_STATUS` | active, inactive |
| `CONTRACT_DOC_STATUS` | draft, valid, expired, terminated |
| `TRAINING_STATUS` | draft, open_registration, in_progress, completed, closed |
| `PARTICIPATION_STATUS` | registered, learning, completed, failed |
| `RESULT_STATUS` | completed, failed |
| `AUTH_USER_STATUS` | active, locked |
| `ASSIGNMENT_EVENT_TYPE` | APPOINT, DISMISS |
| `ACADEMIC_TITLE` | (domain-specific values) |
| `ACADEMIC_RANK` | GS, PGS |
| `EDUCATION_LEVEL` | (domain-specific values) |
| `TRAINING_LEVEL` | (domain-specific values) |

### 3.2 Benefits

1. **No DDL changes** when business adds new organization types, contract statuses, etc.
2. **Admin UI** can manage all catalog values (add/rename/deactivate items).
3. **Audit-friendly** — changes to catalog items are logged like any other data change.
4. **Localization-ready** — `label` field stores the display text, `code` is the machine key.

### 3.3 Validation Strategy

- Application loads active catalog items on startup and caches them.
- API layer validates incoming values against the cached catalog (reject if `code` not found or `is_active = false`).
- Database does NOT enforce via CHECK constraints — this is intentional for flexibility.

## 4. Summary of All Changes

| # | Change | Reason |
|---|--------|--------|
| 1 | Added `catalog_categories` + `catalog_items` | Data-driven enum replacement |
| 2 | Removed all `CHECK (col IN (...))` enum constraints | Replaced by catalog lookup |
| 3 | Added `employees.education_level, training_level, academic_title, academic_rank` | UC 5.24 filter + UC 5.25 create |
| 4 | Added `employee_assignments.event_type` | Distinguish appoint (UC 5.30) vs dismiss (UC 5.31) |
| 5 | Added `employee_evaluations.visible_to_employee, visible_to_tckt` | UC 5.26 visibility control |
| 6 | Added `employee_terminations.is_auto` | FEAT 6.6 auto-termination flag |
| 7 | Added `employment_contracts.renewal_count, previous_contract_id` | UC 5.22 renewal tracking |
| 8 | Added `contract_appendices.appendix_no, appendix_file_id` | UC 5.26 appendix management |
| 9 | Added `auth_permissions` table | VIS field-level security requirement |
| 10 | Added `audit_logs.old_values, new_values, ip_address, user_agent` | FEAT 9.1 + NFR logging |
| 11 | Added 15+ indexes | Performance for filters, search, reporting |
| 12 | Added 3 materialized views | FEAT 9.1 reporting under 2s |
| 13 | Added `updated_at` to sub-entity tables | Edit tracking |
| 14 | Added `training_course_types.description` | Better catalog management |
| 15 | Added `training_results.note` | Result annotation |
| 16 | Added `auth_roles.description, is_system` | Self-documenting roles |
| 17 | Added `campuses.is_active, updated_at` | Campus lifecycle management |

## 5. Files

- Original schema: [database/schema.postgres.sql](database/schema.postgres.sql)
- **Revised schema: [database/schema.revised.postgres.sql](database/schema.revised.postgres.sql)**
- Schema documentation: [database/schema.md](database/schema.md) (unchanged, for reference)
