// ============================================
// TLU HRMS - Core Type Definitions
// Based on needs_list.md requirements
// ============================================

// ============================================
// 1. ENUMERATIONS & CONSTANTS
// ============================================

export enum UserRole {
  SYSTEM_ADMIN = 'system_admin',
  TCCB_OFFICER = 'tccb_officer',
  TCKT_OFFICER = 'tckt_officer',
  EMPLOYEE = 'employee',
}

export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LOCKED = 'locked',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

export enum ContractType {
  INDEFINITE = 'indefinite',
  DEFINITE = 'definite',
  PROBATION = 'probation',
  VISITING = 'visiting',
}

export enum ContractStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  TERMINATED = 'terminated',
  EXTENDED = 'extended',
}

export enum PersonnelStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  RETIRED = 'retired',
}

export enum TrainingStatus {
  PLANNED = 'planned',
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TrainingType {
  DOMESTIC = 'domestic',
  INTERNATIONAL = 'international',
  SHORT_TERM = 'short_term',
  LONG_TERM = 'long_term',
}

export enum ParticipantStatus {
  REGISTERED = 'registered',
  STUDYING = 'studying',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
}

export enum AcademicTitle {
  NONE = 'none',
  GS = 'gs',
  PGS = 'pgs',
}

export enum Degree {
  NONE = 'none',
  TS = 'ts',
  THS = 'ths',
  KS = 'ks',
  CN = 'cn',
}

export enum RewardType {
  TITLE = 'title',
  CERTIFICATE = 'certificate',
  LETTER = 'letter',
}

export enum DisciplineType {
  WARNING = 'warning',
  REPRIMAND = 'reprimand',
  DEMOTION = 'demotion',
  DISMISSAL = 'dismissal',
}

export enum SalaryScaleType {
  LECTURER = 'lecturer',
  SENIOR_LECTURER = 'senior_lecturer',
  PRINCIPAL_LECTURER = 'principal_lecturer',
  SPECIALIST = 'specialist',
}

export enum AllowanceType {
  POSITION = 'position',
  SENIORITY = 'seniority',
  INDUSTRY = 'industry',
  RESPONSIBILITY = 'responsibility',
  HAZARDOUS = 'hazardous',
  REGIONAL = 'regional',
}

export enum AllowanceCalculationType {
  COEFFICIENT = 'coefficient',
  FIXED_AMOUNT = 'fixed_amount',
}

export enum UnitType {
  FACULTY = 'faculty',
  INSTITUTE = 'institute',
  CENTER = 'center',
  DEPARTMENT = 'department',
  OFFICE = 'office',
  BOARD = 'board',
  PARTY_COMMITTEE = 'party_committee',
}

// ============================================
// 2. USER & AUTHENTICATION
// ============================================

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  personnelId?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

// ============================================
// 3. PERSONNEL RECORDS
// ============================================

export interface Address {
  country: string;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
}

export interface FamilyMember {
  id: string;
  fullName: string;
  dateOfBirth?: string;
  relationship: string;
  occupation?: string;
  phoneNumber?: string;
}

export interface Dependent extends FamilyMember {
  isEligibleForDeduction: boolean;
}

export interface BankInfo {
  bankName: string;
  accountNumber: string;
  branch: string;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface PartyInfo {
  joinDate: string;
  officialDate?: string;
  branch: string;
}

export interface UnionInfo {
  joinDate: string;
  cardNumber?: string;
  branch?: string;
}

export interface Education {
  id: string;
  level: string;
  degreeName: string;
  major: string;
  school: string;
  graduationYear: number;
  grade?: string;
  documents: string[];
}

export interface Certificate {
  id: string;
  type: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  documents: string[];
  status: 'valid' | 'expired';
}

export interface SalaryScaleInfo {
  id: string;
  scaleType: SalaryScaleType;
  grade: number;
  coefficient: number;
  effectiveDate: string;
  history: SalaryHistory[];
}

export interface SalaryHistory {
  id: string;
  scaleType: SalaryScaleType;
  grade: number;
  coefficient: number;
  effectiveDate: string;
  reason?: string;
}

export interface PersonnelAllowance {
  id: string;
  typeId: string;
  type: AllowanceType;
  name: string;
  calculationType: AllowanceCalculationType;
  value: number;
  effectiveDate: string;
  isActive: boolean;
}

export interface Contract {
  id: string;
  contractNumber: string;
  type: ContractType;
  signDate: string;
  effectiveDate: string;
  expiryDate?: string;
  jobDescription: string;
  attachments?: string[];
  documents: string[];
  status: ContractStatus;
  extensionCount: number;
  previousContractId?: string;
  terminationDate?: string;
  terminationReason?: string;
  settlementAmount?: number;
  isForeignExpert?: boolean;
  nationality?: string;
  passportNumber?: string;
  workPermitNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reward {
  id: string;
  type: RewardType;
  title: string;
  description?: string;
  date: string;
  decisionNumber?: string;
  issuingAuthority?: string;
  documents: string[];
}

export interface Discipline {
  id: string;
  type: DisciplineType;
  reason: string;
  date: string;
  decisionNumber: string;
  effectiveDate: string;
  endDate?: string;
  notes?: string;
}

export interface UnitAssignment {
  unitId: string;
  unitName: string;
  positionId: string;
  positionName: string;
  startDate: string;
  endDate?: string;
  isPrimary: boolean;
  isConcurrent: boolean;
}

export interface ChangeHistory {
  id: string;
  entityType: string;
  entityId: string;
  action: 'create' | 'update' | 'delete' | 'status_change';
  fieldName?: string;
  oldValue?: unknown;
  newValue?: unknown;
  reason?: string;
  performedBy: string;
  performedAt: string;
}

export interface UpdateRequest {
  id: string;
  personnelId: string;
  requestType: 'info_update' | 'contract_view' | 'training_register';
  requestedChanges: Partial<Personnel>;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface Personnel {
  id: string;
  employeeCode: string;
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  idCardNumber: string;
  placeOfBirth: string;
  hometown: string;
  ethnicity: string;
  religion: string;
  taxCode: string;
  socialInsuranceNumber: string;
  healthInsuranceNumber: string;
  permanentAddress: Address;
  temporaryAddress?: Address;
  phoneNumber: string;
  personalEmail: string;
  workEmail: string;
  portraitPhoto?: string;
  maritalStatus: MaritalStatus;
  spouse?: FamilyMember;
  children: FamilyMember[];
  dependents: Dependent[];
  bankInfo?: BankInfo;
  previousWorkExperience: WorkExperience[];
  partyInfo?: PartyInfo;
  unionInfo?: UnionInfo;
  education: Education[];
  academicTitle: AcademicTitle;
  degree: Degree;
  civilServiceGrade?: string;
  title?: string;
  honors?: string;
  certificates: Certificate[];
  salaryScale?: SalaryScaleInfo;
  allowances: PersonnelAllowance[];
  contracts: Contract[];
  currentContract?: Contract;
  rewards: Reward[];
  disciplines: Discipline[];
  trainingHistory: TrainingParticipation[];
  unitAssignments: UnitAssignment[];
  currentUnit?: UnitAssignment;
  status: PersonnelStatus;
  joinDate: string;
  leaveDate?: string;
  leaveReason?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  changeHistory: ChangeHistory[];
  pendingUpdateRequest?: UpdateRequest;
}

// ============================================
// 4. TRAINING & DEVELOPMENT
// ============================================

export interface TrainingParticipation {
  id: string;
  personnelId: string;
  courseId: string;
  status: ParticipantStatus;
  registrationDate: string;
  completionDate?: string;
  certificateId?: string;
  notes?: string;
}

export interface TrainingCourse {
  id: string;
  planId?: string;
  type: TrainingType;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  location: string;
  budget?: number;
  commitmentPeriod?: number;
  registrationOpenDate?: string;
  registrationCloseDate?: string;
  maxParticipants?: number;
  certificateType?: string;
  certificateTemplate?: string;
  participants: TrainingParticipation[];
  status: TrainingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingPlan {
  id: string;
  year: number;
  name: string;
  description?: string;
  budget: number;
  courses: TrainingCourse[];
  status: TrainingStatus;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// 5. ORGANIZATIONAL STRUCTURE
// ============================================

export interface UnitHistory {
  id: string;
  eventType: 'establishment' | 'merge' | 'dissolution' | 'reorganization';
  date: string;
  description: string;
  relatedUnitIds?: string[];
}

export interface UnitMember {
  id: string;
  personnelId: string;
  positionId: string;
  startDate: string;
  endDate?: string;
  isConcurrent: boolean;
}

export interface Appointment {
  id: string;
  personnelId: string;
  type: 'appointment' | 'dismissal';
  decisionNumber: string;
  date: string;
  effectiveDate: string;
  notes?: string;
}

export interface Position {
  id: string;
  code: string;
  name: string;
  unitId: string;
  level: number;
  appointments: Appointment[];
  currentHolder?: string;
  isVacant: boolean;
  description?: string;
  requirements?: string;
}

export interface OrganizationUnit {
  id: string;
  code: string;
  name: string;
  type: UnitType;
  parentId?: string;
  children: OrganizationUnit[];
  level: number;
  officeAddress?: string;
  email?: string;
  phone?: string;
  website?: string;
  establishmentDate?: string;
  history: UnitHistory[];
  isActive: boolean;
  dissolutionDate?: string;
  dissolutionReason?: string;
  members: UnitMember[];
  positions: Position[];
}

// ============================================
// 6. SYSTEM CONFIGURATION
// ============================================

export interface ConfigChangeHistory extends ChangeHistory {
  configType: string;
}

export interface BaseSalaryConfig {
  id: string;
  amount: number;
  effectiveDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface GradeConfig {
  grade: number;
  coefficient: number;
}

export interface SalaryScaleConfig {
  id: string;
  type: SalaryScaleType;
  name: string;
  grades: GradeConfig[];
  isActive: boolean;
  history: ConfigChangeHistory[];
}

export interface AllowanceConfig {
  id: string;
  code: string;
  name: string;
  type: AllowanceType;
  calculationType: AllowanceCalculationType;
  formula?: string;
  isActive: boolean;
  order: number;
}

export interface ContractTypeConfig {
  id: string;
  type: ContractType;
  name: string;
  minDuration?: number;
  maxDuration?: number;
  maxExtensions?: number;
  maxConversionTime?: number;
  warningDays: number;
  isActive: boolean;
}

export interface EvaluationTypeConfig {
  id: string;
  code: string;
  name: string;
  category: 'reward' | 'discipline';
  description?: string;
  isActive: boolean;
  order: number;
}

export interface TrainingTypeConfig {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  order: number;
}

export interface CommonCatalog {
  id: string;
  type: 'ethnicity' | 'religion' | 'education_level' | 'academic_title' | 
        'civil_service_grade' | 'position' | 'honor' | 'unit_type' | 'country' | 
        'province' | 'district' | 'ward';
  code: string;
  name: string;
  parentId?: string;
  level?: number;
  isActive: boolean;
  order: number;
}

// ============================================
// 7. REPORTS & DASHBOARD
// ============================================

export interface DashboardStats {
  totalPersonnel: number;
  activePersonnel: number;
  newHiresThisMonth: number;
  terminationsThisMonth: number;
  contractsExpiringSoon: number;
  pendingUpdateRequests: number;
}

export interface PersonnelStatistics {
  byUnit: { unitId: string; unitName: string; count: number }[];
  byEducation: { level: string; count: number }[];
  byAge: { range: string; count: number }[];
  byGender: { gender: Gender; count: number }[];
}

export interface PersonnelMovement {
  period: string;
  newHires: number;
  terminations: number;
  transfers: number;
  netChange: number;
}

export interface TrainingStatistics {
  byUnit: { unitId: string; unitName: string; participants: number }[];
  byCourse: { courseId: string; courseName: string; participants: number; completed: number }[];
  byType: { type: TrainingType; count: number }[];
}

// ============================================
// 8. API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: unknown;
}
