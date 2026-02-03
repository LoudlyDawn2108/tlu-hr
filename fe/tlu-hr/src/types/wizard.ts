export interface WizardData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  idCardNumber: string;
  placeOfBirth: string;
  hometown: string;
  ethnicity: string;
  religion: string;
  taxCode: string;
  socialInsuranceNumber: string;
  healthInsuranceNumber: string;
  permanentAddress: {
    country: string;
    province: string;
    district: string;
    ward: string;
    streetAddress: string;
  };
  temporaryAddress: {
    country: string;
    province: string;
    district: string;
    ward: string;
    streetAddress: string;
  } | null;
  phoneNumber: string;
  personalEmail: string;
  workEmail: string;
  maritalStatus: string;
  spouse: {
    fullName: string;
    dateOfBirth: string;
    relationship: string;
    occupation: string;
    phoneNumber: string;
  } | null;
  children: Array<{
    fullName: string;
    dateOfBirth: string;
    relationship: string;
  }>;
  education: Array<{
    level: string;
    degreeName: string;
    major: string;
    school: string;
    graduationYear: number;
    grade: string;
  }>;
  unitId: string;
  positionId: string;
  contractType: string;
  contractNumber: string;
  contractJobDescription?: string;
  contractSignDate: string;
  contractEffectiveDate: string;
  contractExpiryDate: string;
  salaryScaleId: string;
}
