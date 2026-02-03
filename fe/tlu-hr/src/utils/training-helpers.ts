import type { TrainingCourse, TrainingParticipation, Certificate } from '@/types';
import { TrainingType, TrainingStatus, ParticipantStatus } from '@/types';

export function canEnroll(
  course: TrainingCourse,
  personnelId: string,
  existingParticipants?: TrainingParticipation[]
): { allowed: boolean; reason?: string } {
  // Check course status
  if (course.status !== TrainingStatus.OPEN) {
    return { allowed: false, reason: 'Khóa học chưa mở đăng ký' };
  }

  // Check capacity if maxParticipants is set
  if (course.maxParticipants && existingParticipants) {
    if (existingParticipants.length >= course.maxParticipants) {
      return { allowed: false, reason: 'Khóa học đã đủ số lượng đăng ký' };
    }
  }

  // Check registration date window
  const now = new Date();
  if (course.registrationOpenDate) {
    const openDate = new Date(course.registrationOpenDate);
    if (now < openDate) {
      return { allowed: false, reason: 'Chưa đến thời gian mở đăng ký' };
    }
  }
  if (course.registrationCloseDate) {
    const closeDate = new Date(course.registrationCloseDate);
    if (now > closeDate) {
      return { allowed: false, reason: 'Đã quá thời hạn đăng ký' };
    }
  }

  // Check for duplicates
  if (existingParticipants?.some(p => p.personnelId === personnelId)) {
    return { allowed: false, reason: 'Bạn đã đăng ký khóa học này' };
  }

  return { allowed: true };
}

export function canUpdateStatus(
  currentStatus: ParticipantStatus,
  newStatus: ParticipantStatus
): { allowed: boolean; reason?: string } {
  const validTransitions: Record<ParticipantStatus, ParticipantStatus[]> = {
    [ParticipantStatus.REGISTERED]: [ParticipantStatus.STUDYING, ParticipantStatus.DROPPED],
    [ParticipantStatus.STUDYING]: [ParticipantStatus.COMPLETED, ParticipantStatus.DROPPED],
    [ParticipantStatus.COMPLETED]: [],
    [ParticipantStatus.DROPPED]: [],
  };

  if (!validTransitions[currentStatus].includes(newStatus)) {
    return { allowed: false, reason: 'Không thể chuyển trạng thái này' };
  }

  return { allowed: true };
}

export function getYearsFromCourses(courses: TrainingCourse[]): number[] {
  const years = courses.map(course => new Date(course.startDate).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
}

export function createCertificateFromCourse(
  course: TrainingCourse,
  participation: TrainingParticipation
): Certificate {
  return {
    id: `cert-${participation.id}`,
    type: 'training',
    name: `Chứng chỉ hoàn thành: ${course.name}`,
    issuingOrganization: 'Đại học Thủy lợi',
    issueDate: new Date().toISOString().split('T')[0],
    documents: [],
    status: 'valid' as const,
  };
}

export function formatTrainingType(type: TrainingType): string {
  const labels: Record<TrainingType, string> = {
    [TrainingType.DOMESTIC]: 'Trong nước',
    [TrainingType.INTERNATIONAL]: 'Quốc tế',
    [TrainingType.SHORT_TERM]: 'Ngắn hạn',
    [TrainingType.LONG_TERM]: 'Dài hạn',
  };

  return labels[type];
}

export function formatParticipantStatus(status: ParticipantStatus): string {
  const labels: Record<ParticipantStatus, string> = {
    [ParticipantStatus.REGISTERED]: 'Đã đăng ký',
    [ParticipantStatus.STUDYING]: 'Đang học',
    [ParticipantStatus.COMPLETED]: 'Hoàn thành',
    [ParticipantStatus.DROPPED]: 'Bỏ dở',
  };

  return labels[status];
}