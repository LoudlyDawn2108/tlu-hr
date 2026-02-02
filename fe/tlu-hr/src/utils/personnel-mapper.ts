import { PersonnelStatus } from '@/types';
import type { Personnel, FamilyMember, Education } from '@/types';
import type { WizardData } from '@/types/wizard';

/**
 * Converts a nested Personnel object to a flat WizardData structure.
 * Used when editing an existing personnel record in the wizard form.
 *
 * @param personnel - The Personnel object with nested structure
 * @returns WizardData - Flat structure suitable for form handling
 *
 * @example
 * const wizardData = personnelToWizardData(personnel);
 * // Use wizardData to populate form fields
 */
export function personnelToWizardData(personnel: Personnel): WizardData {
  // Extract unit and position IDs from currentUnit or first unitAssignment
  const unitId =
    personnel.currentUnit?.unitId || personnel.unitAssignments[0]?.unitId || '';
  const positionId =
    personnel.currentUnit?.positionId ||
    personnel.unitAssignments[0]?.positionId ||
    '';

  // Extract contract fields from currentContract
  const contractType = personnel.currentContract?.type || '';
  const contractSignDate = personnel.currentContract?.signDate || '';
  const contractEffectiveDate = personnel.currentContract?.effectiveDate || '';
  const contractExpiryDate = personnel.currentContract?.expiryDate || '';

  // Extract salary scale ID
  const salaryScaleId = personnel.salaryScale?.id || '';

  // Map spouse - only include fields present in WizardData
  const spouse: WizardData['spouse'] = personnel.spouse
    ? {
        fullName: personnel.spouse.fullName,
        dateOfBirth: personnel.spouse.dateOfBirth || '',
        relationship: personnel.spouse.relationship,
        occupation: personnel.spouse.occupation || '',
        phoneNumber: personnel.spouse.phoneNumber || '',
      }
    : null;

  // Map children - only include fields present in WizardData
  const children: WizardData['children'] = personnel.children.map(
    (child: FamilyMember) => ({
      fullName: child.fullName,
      dateOfBirth: child.dateOfBirth || '',
      relationship: child.relationship,
    })
  );

  // Map education - only include fields present in WizardData
  const education: WizardData['education'] = personnel.education.map(
    (edu: Education) => ({
      level: edu.level,
      degreeName: edu.degreeName,
      major: edu.major,
      school: edu.school,
      graduationYear: edu.graduationYear,
      grade: edu.grade || '',
    })
  );

  return {
    // Direct flat field mappings
    fullName: personnel.fullName,
    dateOfBirth: personnel.dateOfBirth,
    gender: personnel.gender,
    idCardNumber: personnel.idCardNumber,
    placeOfBirth: personnel.placeOfBirth,
    hometown: personnel.hometown,
    ethnicity: personnel.ethnicity,
    religion: personnel.religion,
    taxCode: personnel.taxCode,
    socialInsuranceNumber: personnel.socialInsuranceNumber,
    healthInsuranceNumber: personnel.healthInsuranceNumber,

    // Address mappings
    permanentAddress: personnel.permanentAddress,
    temporaryAddress: personnel.temporaryAddress || null,

    // Contact information
    phoneNumber: personnel.phoneNumber,
    personalEmail: personnel.personalEmail,
    workEmail: personnel.workEmail,

    // Family information
    maritalStatus: personnel.maritalStatus,
    spouse,
    children,

    // Education
    education,

    // Work information
    unitId,
    positionId,
    contractType,
    contractSignDate,
    contractEffectiveDate,
    contractExpiryDate,
    salaryScaleId,
  };
}

/**
 * Converts a flat WizardData structure to a Partial<Personnel> object.
 * Used when creating or updating a personnel record from wizard form data.
 *
 * @param data - The WizardData from form submission
 * @param originalId - Optional ID of the personnel being edited (for edit mode)
 * @returns Partial<Personnel> - Partial Personnel object for create/update operations
 *
 * @example
 * // Create mode
 * const newPersonnel = wizardDataToPersonnel(wizardData);
 *
 * @example
 * // Edit mode
 * const updatedPersonnel = wizardDataToPersonnel(wizardData, existingPersonnel.id);
 */
export function wizardDataToPersonnel(
  data: WizardData,
  originalId?: string
): Partial<Personnel> {
  const today = new Date().toISOString().split('T')[0];

  // Build base result
  const result: Partial<Personnel> = {
    // Direct flat field mappings
    fullName: data.fullName,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender as Personnel['gender'],
    idCardNumber: data.idCardNumber,
    placeOfBirth: data.placeOfBirth,
    hometown: data.hometown,
    ethnicity: data.ethnicity,
    religion: data.religion,
    taxCode: data.taxCode,
    socialInsuranceNumber: data.socialInsuranceNumber,
    healthInsuranceNumber: data.healthInsuranceNumber,

    // Address mappings
    permanentAddress: data.permanentAddress,
    temporaryAddress: data.temporaryAddress || undefined,

    // Contact information
    phoneNumber: data.phoneNumber,
    personalEmail: data.personalEmail,
    workEmail: data.workEmail,

    // Family information
    maritalStatus: data.maritalStatus as Personnel['maritalStatus'],
    spouse: data.spouse
      ? {
          id: '',
          fullName: data.spouse.fullName,
          dateOfBirth: data.spouse.dateOfBirth,
          relationship: data.spouse.relationship,
          occupation: data.spouse.occupation,
          phoneNumber: data.spouse.phoneNumber,
        }
      : undefined,
    children: data.children.map((child) => ({
      id: '',
      fullName: child.fullName,
      dateOfBirth: child.dateOfBirth,
      relationship: child.relationship,
    })),

    // Education
    education: data.education.map((edu) => ({
      id: '',
      level: edu.level,
      degreeName: edu.degreeName,
      major: edu.major,
      school: edu.school,
      graduationYear: edu.graduationYear,
      grade: edu.grade,
      documents: [],
    })),

    // Initialize required arrays with defaults
    dependents: [],
    previousWorkExperience: [],
    certificates: [],
    allowances: [],
    contracts: [],
    rewards: [],
    disciplines: [],
    trainingHistory: [],
    unitAssignments: [],
    changeHistory: [],
  };

  // If editing, include the original ID
  if (originalId) {
    result.id = originalId;
  } else {
    // Create mode: set defaults for new personnel
    result.status = PersonnelStatus.ACTIVE;
    result.joinDate = today;
  }

  return result;
}
