import type { 
  AllowanceConfig, 
  SalaryScaleConfig
} from "@/types";
import allowanceData from "@/data/config/allowance-types.json";
import salaryScaleData from "@/data/config/salary-scales.json";

const STORAGE_KEYS = {
  ALLOWANCES: "tlu_hr_config_allowances",
  SALARY_SCALES: "tlu_hr_config_salary_scales",
};

const DELAY_MS = 500;

const delay = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), DELAY_MS));
};

export const configService = {
  getAllowances: async (): Promise<AllowanceConfig[]> => {
    const stored = localStorage.getItem(STORAGE_KEYS.ALLOWANCES);
    if (stored) {
      return delay(JSON.parse(stored));
    }
    const initialData = allowanceData as AllowanceConfig[];
    localStorage.setItem(STORAGE_KEYS.ALLOWANCES, JSON.stringify(initialData));
    return delay(initialData);
  },

  saveAllowances: async (allowances: AllowanceConfig[]): Promise<AllowanceConfig[]> => {
    localStorage.setItem(STORAGE_KEYS.ALLOWANCES, JSON.stringify(allowances));
    return delay(allowances);
  },

  getSalaryScales: async (): Promise<SalaryScaleConfig[]> => {
    const stored = localStorage.getItem(STORAGE_KEYS.SALARY_SCALES);
    if (stored) {
      return delay(JSON.parse(stored));
    }
    const initialData = salaryScaleData as SalaryScaleConfig[];
    localStorage.setItem(STORAGE_KEYS.SALARY_SCALES, JSON.stringify(initialData));
    return delay(initialData);
  },

  saveSalaryScales: async (scales: SalaryScaleConfig[]): Promise<SalaryScaleConfig[]> => {
    localStorage.setItem(STORAGE_KEYS.SALARY_SCALES, JSON.stringify(scales));
    return delay(scales);
  },
};
