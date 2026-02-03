import { z } from "zod";

// Step 1: Basic Information
export const step1Schema = z.object({
  fullName: z.string().min(1, "Họ và tên là bắt buộc"),
  dateOfBirth: z.string().min(1, "Ngày sinh là bắt buộc"),
  gender: z.string().min(1, "Giới tính là bắt buộc"),
  idCardNumber: z.string().min(1, "Số CCCD/CMND là bắt buộc"),
  placeOfBirth: z.string().optional(),
  hometown: z.string().optional(),
  ethnicity: z.string().optional(),
  religion: z.string().optional(),
});

// Step 2: Address and Contact Information
const addressSchema = z.object({
  country: z.string().default(""),
  province: z.string().default(""),
  district: z.string().default(""),
  ward: z.string().default(""),
  streetAddress: z.string().default(""),
});

export const step2Schema = z.object({
  permanentAddress: addressSchema,
  temporaryAddress: addressSchema.nullable().optional(),
  phoneNumber: z.string().min(1, "Số điện thoại là bắt buộc"),
  personalEmail: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  workEmail: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
});

// Step 3: Family Information
const spouseSchema = z.object({
  fullName: z.string().default(""),
  dateOfBirth: z.string().default(""),
  relationship: z.string().default(""),
  occupation: z.string().default(""),
  phoneNumber: z.string().default(""),
});

const childSchema = z.object({
  fullName: z.string().default(""),
  dateOfBirth: z.string().default(""),
  relationship: z.string().default("Con"),
});

export const step3Schema = z.object({
  maritalStatus: z.string().default(""),
  spouse: spouseSchema.nullable().optional(),
  children: z.array(childSchema).default([]),
});

// Step 4: Education Information
const educationSchema = z.object({
  level: z.string().default(""),
  degreeName: z.string().default(""),
  major: z.string().default(""),
  school: z.string().default(""),
  graduationYear: z.number().int().default(new Date().getFullYear()),
  grade: z.string().default(""),
});

export const step4Schema = z.object({
  education: z.array(educationSchema).default([]),
});

// Step 5: Unit and Position Information
export const step5Schema = z.object({
  unitId: z.string().min(1, "Đơn vị công tác là bắt buộc"),
  positionId: z.string().min(1, "Chức vụ là bắt buộc"),
});

// Step 6: Contract Information
export const step6Schema = z.object({
  contractType: z.string().min(1, "Loại hợp đồng là bắt buộc"),
  contractNumber: z.string().min(1, "Vui lòng nhập số hợp đồng"),
  contractJobDescription: z.string().optional(),
  contractSignDate: z.string().min(1, "Ngày ký là bắt buộc"),
  contractEffectiveDate: z.string().min(1, "Ngày hiệu lực là bắt buộc"),
  contractExpiryDate: z.string().optional(),
});

// Step 7: Salary Information
export const step7Schema = z.object({
  salaryScaleId: z.string().min(1, "Ngạch lương là bắt buộc"),
});

// Step 8: Review (no additional validation needed)
export const step8Schema = z.object({
  taxCode: z.string().optional(),
  socialInsuranceNumber: z.string().optional(),
  healthInsuranceNumber: z.string().optional(),
});

// Full wizard schema combining all steps
export const fullWizardSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema);

// Export type for the full wizard data
export type WizardFormData = z.infer<typeof fullWizardSchema>;
