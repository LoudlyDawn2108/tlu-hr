import type { Contract } from '@/types';
import { ContractStatus, ContractType } from '@/types';

export const DEFAULT_MAX_EXTENSIONS = 2;

export function canExtend(contract: Contract, maxExtensions: number = DEFAULT_MAX_EXTENSIONS): boolean {
  if (contract.status !== ContractStatus.ACTIVE) {
    return false;
  }

  if (contract.type !== ContractType.DEFINITE) {
    return false;
  }

  return contract.extensionCount < maxExtensions;
}

export function getNextContractNumber(currentNumber: string): string {
  const match = currentNumber.match(/HĐ(\d+)\/(\d{4})/);

  if (!match) {
    throw new Error(`Invalid contract number format: ${currentNumber}. Expected format: HĐXXX/YYYY`);
  }

  const [, currentSeq, year] = match;
  const nextSeq = (parseInt(currentSeq, 10) + 1).toString().padStart(3, '0');

  return `HĐ${nextSeq}/${year}`;
}

export function validateContractDates(startDate: string, endDate?: string | null): string | null {
  const start = new Date(startDate);

  if (isNaN(start.getTime())) {
    return 'Ngày bắt đầu hợp đồng không hợp lệ';
  }

  if (!endDate) {
    return null;
  }

  const end = new Date(endDate);

  if (isNaN(end.getTime())) {
    return 'Ngày kết thúc hợp đồng không hợp lệ';
  }

  if (end <= start) {
    return 'Ngày kết thúc phải sau ngày bắt đầu';
  }

  const maxDurationMs = 3 * 365 * 24 * 60 * 60 * 1000;
  const durationMs = end.getTime() - start.getTime();

  if (durationMs > maxDurationMs) {
    return 'Thời hạn hợp đồng không được vượt quá 3 năm';
  }

  return null;
}

export function getExtensionStatusText(extensionCount: number, maxExtensions: number = DEFAULT_MAX_EXTENSIONS): string {
  if (extensionCount === 0) {
    return 'Chưa gia hạn';
  }

  if (extensionCount >= maxExtensions) {
    return `Đã gia hạn tối đa (${extensionCount}/${maxExtensions})`;
  }

  return `Đã gia hạn ${extensionCount}/${maxExtensions} lần`;
}
