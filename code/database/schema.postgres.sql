-- HRMS Database Schema (PostgreSQL) - Draft
-- Generated from project documents (UCS/STR/VIS)

-- Enable UUID generator
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================
-- Files (uploads)
-- =========================
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  original_name text NOT NULL,
  mime_type text,
  byte_size bigint CHECK (byte_size IS NULL OR byte_size >= 0),
  sha256 char(64),
  uploaded_by_user_id uuid,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

-- =========================
-- Campuses (đa cơ sở)
-- =========================
CREATE TABLE IF NOT EXISTS campuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campus_code varchar(50) NOT NULL UNIQUE,
  campus_name varchar(255) NOT NULL,
  address text,
  phone varchar(30),
  email varchar(255),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =========================
-- Organization Units (cây cơ cấu tổ chức)
-- =========================
CREATE TABLE IF NOT EXISTS org_units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campus_id uuid NOT NULL REFERENCES campuses(id) ON DELETE RESTRICT,
  parent_id uuid REFERENCES org_units(id) ON DELETE RESTRICT,

  unit_code varchar(50) NOT NULL UNIQUE,
  unit_name varchar(255) NOT NULL,
  unit_type varchar(30) NOT NULL,

  founded_on date,
  address text,
  office_address text,
  email varchar(255),
  phone varchar(30),
  website text,

  is_leaf_confirmed boolean NOT NULL DEFAULT false,

  status varchar(20) NOT NULL DEFAULT 'active',
  status_updated_at timestamptz,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT org_units_status_chk CHECK (status IN ('active','merged','dissolved')),
  CONSTRAINT org_units_type_chk CHECK (unit_type IN ('HOI_DONG','BAN','KHOA','PHONG','BO_MON','PHONG_THI_NGHIEM','TRUNG_TAM'))
);

CREATE INDEX IF NOT EXISTS idx_org_units_parent_id ON org_units(parent_id);
CREATE INDEX IF NOT EXISTS idx_org_units_campus_id ON org_units(campus_id);

-- History of status changes for org units (giải thể/sáp nhập)
CREATE TABLE IF NOT EXISTS org_unit_status_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_unit_id uuid NOT NULL REFERENCES org_units(id) ON DELETE CASCADE,

  event_type varchar(20) NOT NULL,
  effective_on date NOT NULL,

  decision_no varchar(50),
  decision_on date,
  decision_file_id uuid REFERENCES files(id) ON DELETE SET NULL,

  reason varchar(30) NOT NULL,
  note text,

  merged_into_org_unit_id uuid REFERENCES org_units(id) ON DELETE RESTRICT,

  created_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT org_unit_status_event_type_chk CHECK (event_type IN ('DISSOLVE','MERGE')),
  CONSTRAINT org_unit_status_event_reason_chk CHECK (reason IN ('GIAI_THE','SAP_NHAP','TAI_CO_CAU','KHAC')),
  CONSTRAINT org_unit_merge_target_chk CHECK (
    (event_type = 'MERGE' AND merged_into_org_unit_id IS NOT NULL)
    OR (event_type = 'DISSOLVE' AND merged_into_org_unit_id IS NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_org_unit_status_events_unit ON org_unit_status_events(org_unit_id);

-- =========================
-- Salary coefficient catalog
-- =========================
CREATE TABLE IF NOT EXISTS salary_coefficients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  grade_code varchar(50) NOT NULL,
  grade_name varchar(255),
  step_no int NOT NULL,
  coefficient numeric(8,3) NOT NULL,

  status varchar(20) NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT salary_step_positive_chk CHECK (step_no > 0),
  CONSTRAINT salary_coefficient_nonneg_chk CHECK (coefficient >= 0),
  CONSTRAINT salary_status_chk CHECK (status IN ('active','inactive')),
  CONSTRAINT salary_unique_grade_step UNIQUE (grade_code, step_no)
);

-- =========================
-- Allowance types
-- =========================
CREATE TABLE IF NOT EXISTS allowance_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  allowance_name varchar(200) NOT NULL,
  description text,
  calc_method text,
  status varchar(20) NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT allowance_status_chk CHECK (status IN ('active','inactive')),
  CONSTRAINT allowance_name_unique UNIQUE (allowance_name)
);

-- =========================
-- Employees (core dossier)
-- =========================
CREATE SEQUENCE IF NOT EXISTS employee_staff_code_seq;

CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  staff_code varchar(30) NOT NULL UNIQUE DEFAULT nextval('employee_staff_code_seq')::text,
  full_name varchar(255) NOT NULL,
  dob date NOT NULL,
  gender varchar(10) NOT NULL,

  national_id varchar(20) NOT NULL UNIQUE,
  hometown text,
  address text NOT NULL,

  tax_code varchar(30),
  social_insurance_no varchar(30),
  health_insurance_no varchar(30),

  email varchar(255) NOT NULL,
  phone varchar(30) NOT NULL,

  is_foreigner boolean NOT NULL DEFAULT false,

  work_status varchar(20) NOT NULL DEFAULT 'pending',
  contract_status varchar(20) NOT NULL DEFAULT 'none',

  current_org_unit_id uuid REFERENCES org_units(id) ON DELETE SET NULL,
  current_position_title varchar(255),

  salary_coefficient_id uuid REFERENCES salary_coefficients(id) ON DELETE SET NULL,
  portrait_file_id uuid REFERENCES files(id) ON DELETE SET NULL,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT employees_gender_chk CHECK (gender IN ('NAM','NU','KHAC')),
  CONSTRAINT employees_work_status_chk CHECK (work_status IN ('pending','working','terminated')),
  CONSTRAINT employees_contract_status_chk CHECK (contract_status IN ('none','valid','expired','renewal_wait'))
);

CREATE INDEX IF NOT EXISTS idx_employees_full_name ON employees(full_name);
CREATE INDEX IF NOT EXISTS idx_employees_staff_code ON employees(staff_code);
CREATE INDEX IF NOT EXISTS idx_employees_national_id ON employees(national_id);
CREATE INDEX IF NOT EXISTS idx_employees_current_org_unit ON employees(current_org_unit_id);

-- Employee termination events
CREATE TABLE IF NOT EXISTS employee_terminations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  terminated_on date NOT NULL,
  reason text NOT NULL,
  created_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Assignment history (bổ nhiệm/bãi nhiệm)
CREATE TABLE IF NOT EXISTS employee_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  org_unit_id uuid NOT NULL REFERENCES org_units(id) ON DELETE RESTRICT,
  position_title varchar(255),
  started_on date NOT NULL,
  ended_on date,
  created_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT assignment_date_order_chk CHECK (ended_on IS NULL OR ended_on >= started_on)
);

CREATE INDEX IF NOT EXISTS idx_employee_assignments_employee ON employee_assignments(employee_id);
CREATE INDEX IF NOT EXISTS idx_employee_assignments_org_unit ON employee_assignments(org_unit_id);

-- =========================
-- Employee sub-entities
-- =========================
CREATE TABLE IF NOT EXISTS employee_family_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  relation varchar(30) NOT NULL,
  full_name varchar(255) NOT NULL,
  dob date,
  phone varchar(30),
  note text,
  is_dependent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT family_relation_chk CHECK (relation IN ('CHA','ME','VO_CHONG','CON','NGUOI_PHU_THUOC','KHAC'))
);

CREATE TABLE IF NOT EXISTS employee_bank_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  bank_name varchar(255) NOT NULL,
  account_no varchar(50) NOT NULL,
  is_primary boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT employee_bank_unique UNIQUE (employee_id, account_no)
);

CREATE TABLE IF NOT EXISTS employee_previous_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  workplace varchar(255) NOT NULL,
  started_on date,
  ended_on date,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT prev_job_date_order_chk CHECK (ended_on IS NULL OR started_on IS NULL OR ended_on >= started_on)
);

CREATE TABLE IF NOT EXISTS employee_party_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  organization_type varchar(10) NOT NULL,
  joined_on date,
  details text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT party_org_type_chk CHECK (organization_type IN ('DOAN','DANG'))
);

CREATE TABLE IF NOT EXISTS employee_degrees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  degree_name varchar(255) NOT NULL,
  school varchar(255) NOT NULL,
  major varchar(255),
  graduation_year int,
  classification varchar(100),
  degree_file_id uuid REFERENCES files(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT graduation_year_chk CHECK (graduation_year IS NULL OR graduation_year >= 1900)
);

CREATE TABLE IF NOT EXISTS employee_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  cert_name varchar(255) NOT NULL,
  issued_by varchar(255),
  issued_on date,
  expires_on date,
  cert_file_id uuid REFERENCES files(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cert_date_order_chk CHECK (expires_on IS NULL OR issued_on IS NULL OR expires_on >= issued_on)
);

CREATE TABLE IF NOT EXISTS employee_foreign_work_permits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,

  visa_no varchar(50),
  visa_expires_on date,

  passport_no varchar(50),
  passport_expires_on date,

  work_permit_no varchar(50),
  work_permit_expires_on date,
  work_permit_file_id uuid REFERENCES files(id) ON DELETE SET NULL,

  created_at timestamptz NOT NULL DEFAULT now()
);

-- =========================
-- Employee allowances (assigned)
-- =========================
CREATE TABLE IF NOT EXISTS employee_allowances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  allowance_type_id uuid NOT NULL REFERENCES allowance_types(id) ON DELETE RESTRICT,
  amount numeric(14,2),
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT allowance_amount_nonneg_chk CHECK (amount IS NULL OR amount >= 0),
  CONSTRAINT employee_allowance_unique UNIQUE (employee_id, allowance_type_id)
);

-- =========================
-- Contract types
-- =========================
CREATE TABLE IF NOT EXISTS contract_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_type_name varchar(255) NOT NULL UNIQUE,
  min_months int NOT NULL,
  max_months int NOT NULL,
  max_renewals int NOT NULL,
  renewal_grace_days int NOT NULL,
  status varchar(20) NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT contract_months_chk CHECK (min_months > 0 AND max_months >= min_months),
  CONSTRAINT contract_renewals_chk CHECK (max_renewals >= 0 AND renewal_grace_days >= 0),
  CONSTRAINT contract_type_status_chk CHECK (status IN ('active','inactive'))
);

-- Employment contracts
CREATE TABLE IF NOT EXISTS employment_contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  contract_type_id uuid NOT NULL REFERENCES contract_types(id) ON DELETE RESTRICT,

  contract_no varchar(50) NOT NULL,
  signed_on date NOT NULL,
  effective_from date NOT NULL,
  effective_to date NOT NULL,

  org_unit_id uuid NOT NULL REFERENCES org_units(id) ON DELETE RESTRICT,

  status varchar(20) NOT NULL DEFAULT 'valid',
  content_html text,
  contract_file_id uuid REFERENCES files(id) ON DELETE SET NULL,

  created_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT contract_status_chk CHECK (status IN ('draft','valid','expired','terminated')),
  CONSTRAINT contract_dates_chk CHECK (effective_to >= effective_from),
  CONSTRAINT contract_no_unique UNIQUE (contract_no)
);

CREATE INDEX IF NOT EXISTS idx_employment_contracts_employee ON employment_contracts(employee_id);
CREATE INDEX IF NOT EXISTS idx_employment_contracts_type ON employment_contracts(contract_type_id);
CREATE INDEX IF NOT EXISTS idx_employment_contracts_org_unit ON employment_contracts(org_unit_id);

-- Contract appendices
CREATE TABLE IF NOT EXISTS contract_appendices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id uuid NOT NULL REFERENCES employment_contracts(id) ON DELETE CASCADE,
  effective_on date NOT NULL,
  terms text NOT NULL,
  notes text,
  created_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =========================
-- Evaluations (reward/discipline)
-- =========================
CREATE TABLE IF NOT EXISTS employee_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,

  eval_type varchar(20) NOT NULL,

  reward_type varchar(255),
  reward_name varchar(255),
  decision_on date,
  decision_no varchar(50),
  content text,
  reward_amount numeric(14,2),

  discipline_type varchar(255),
  discipline_name varchar(255),
  reason text,
  action_form varchar(255),

  is_active boolean NOT NULL DEFAULT true,
  created_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT eval_type_chk CHECK (eval_type IN ('REWARD','DISCIPLINE')),
  CONSTRAINT eval_reward_amount_chk CHECK (reward_amount IS NULL OR reward_amount >= 0)
);

CREATE INDEX IF NOT EXISTS idx_employee_evaluations_employee ON employee_evaluations(employee_id);

-- =========================
-- Training
-- =========================
CREATE TABLE IF NOT EXISTS training_course_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type_name varchar(255) NOT NULL UNIQUE,
  status varchar(20) NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT training_type_status_chk CHECK (status IN ('active','inactive'))
);

CREATE TABLE IF NOT EXISTS training_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name varchar(255) NOT NULL,
  course_type_id uuid NOT NULL REFERENCES training_course_types(id) ON DELETE RESTRICT,

  training_from date NOT NULL,
  training_to date NOT NULL,
  location varchar(255),
  cost numeric(14,2),
  commitment text,

  certificate_name varchar(255),
  certificate_type varchar(255),

  registration_from date,
  registration_to date,
  registration_limit int,

  status varchar(20) NOT NULL DEFAULT 'open',

  created_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT training_dates_chk CHECK (training_to >= training_from),
  CONSTRAINT registration_dates_chk CHECK (registration_to IS NULL OR registration_from IS NULL OR registration_to >= registration_from),
  CONSTRAINT registration_limit_chk CHECK (registration_limit IS NULL OR registration_limit > 0),
  CONSTRAINT training_cost_chk CHECK (cost IS NULL OR cost >= 0),
  CONSTRAINT training_status_chk CHECK (status IN ('draft','open_registration','in_progress','completed','closed'))
);

CREATE INDEX IF NOT EXISTS idx_training_courses_type ON training_courses(course_type_id);

CREATE TABLE IF NOT EXISTS training_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES training_courses(id) ON DELETE CASCADE,
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,

  registered_at timestamptz NOT NULL DEFAULT now(),
  participation_status varchar(20) NOT NULL DEFAULT 'registered',

  CONSTRAINT training_participation_status_chk CHECK (participation_status IN ('registered','learning','completed','failed')),
  CONSTRAINT training_reg_unique UNIQUE (course_id, employee_id)
);

CREATE INDEX IF NOT EXISTS idx_training_registrations_employee ON training_registrations(employee_id);

CREATE TABLE IF NOT EXISTS training_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid NOT NULL UNIQUE REFERENCES training_registrations(id) ON DELETE CASCADE,
  result_status varchar(20) NOT NULL,
  completed_on date,
  certificate_file_id uuid REFERENCES files(id) ON DELETE SET NULL,
  created_by_user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT training_result_status_chk CHECK (result_status IN ('completed','failed'))
);

-- =========================
-- Auth: users/roles/sessions
-- =========================
CREATE TABLE IF NOT EXISTS auth_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username varchar(50) NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name varchar(255) NOT NULL,
  email varchar(255) UNIQUE,

  employee_id uuid UNIQUE REFERENCES employees(id) ON DELETE SET NULL,

  status varchar(20) NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz,

  CONSTRAINT auth_user_status_chk CHECK (status IN ('active','locked'))
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'files_uploaded_by_user_fk'
  ) THEN
    ALTER TABLE files
      ADD CONSTRAINT files_uploaded_by_user_fk
      FOREIGN KEY (uploaded_by_user_id) REFERENCES auth_users(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS auth_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_code varchar(30) NOT NULL UNIQUE,
  role_name varchar(255) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT auth_role_code_chk CHECK (role_code IN ('ADMIN','TCCB','TCKT','EMPLOYEE'))
);

CREATE TABLE IF NOT EXISTS auth_user_roles (
  user_id uuid NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES auth_roles(id) ON DELETE CASCADE,
  granted_at timestamptz NOT NULL DEFAULT now(),
  granted_by_user_id uuid,
  PRIMARY KEY (user_id, role_id)
);

-- =========================
-- better-auth managed tables
-- =========================
-- These tables are managed by the better-auth package.
-- Schema follows better-auth's required structure.
-- See: https://www.better-auth.com/docs/concepts/database

-- Session table (better-auth managed)
-- Stores server-side sessions in the DB. Delivered to the client
-- via a secure, HTTP-only cookie (no JWT).
-- Sliding expiration: expiresAt is reset to now()+30min on every
-- authenticated request (configured via session.updateAge=0 and
-- session.expiresIn=1800 in better-auth config). If the user is
-- idle for 30 minutes the session row is expired and they must
-- re-authenticate.
CREATE TABLE IF NOT EXISTS "session" (
  id text PRIMARY KEY,
  "expiresAt" timestamptz NOT NULL,
  token text NOT NULL UNIQUE,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" uuid NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_session_user ON "session"("userId");
CREATE INDEX IF NOT EXISTS idx_session_token ON "session"(token);

-- Account table (better-auth managed)
-- Links authentication providers (credential, OAuth, etc.) to users.
CREATE TABLE IF NOT EXISTS "account" (
  id text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" uuid NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  scope text,
  password text,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_account_user ON "account"("userId");

-- Verification table (better-auth managed)
-- Stores email/phone verification and password-reset tokens.
CREATE TABLE IF NOT EXISTS "verification" (
  id text PRIMARY KEY,
  identifier text NOT NULL,
  value text NOT NULL,
  "expiresAt" timestamptz NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);

-- =========================
-- Audit log
-- =========================
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES auth_users(id) ON DELETE SET NULL,
  action varchar(100) NOT NULL,
  entity_type varchar(100),
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_auth_users_employee_id ON auth_users(employee_id);
