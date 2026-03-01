import { create } from "zustand";
import { configService } from "@/services/config.service";
import type { AllowanceConfig, SalaryScaleConfig } from "@/types";

interface ConfigState {
  allowances: AllowanceConfig[];
  salaryScales: SalaryScaleConfig[];
  isLoading: boolean;
  error: string | null;

  fetchAllowances: () => Promise<void>;
  updateAllowances: (allowances: AllowanceConfig[]) => Promise<void>;
  
  fetchSalaryScales: () => Promise<void>;
  updateSalaryScales: (scales: SalaryScaleConfig[]) => Promise<void>;
}

export const useConfigStore = create<ConfigState>((set) => ({
  allowances: [],
  salaryScales: [],
  isLoading: false,
  error: null,

  fetchAllowances: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await configService.getAllowances();
      set({ allowances: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch allowances", isLoading: false });
    }
  },

  updateAllowances: async (allowances: AllowanceConfig[]) => {
    set({ isLoading: true, error: null });
    try {
      const data = await configService.saveAllowances(allowances);
      set({ allowances: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to update allowances", isLoading: false });
    }
  },

  fetchSalaryScales: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await configService.getSalaryScales();
      set({ salaryScales: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch salary scales", isLoading: false });
    }
  },

  updateSalaryScales: async (scales: SalaryScaleConfig[]) => {
    set({ isLoading: true, error: null });
    try {
      const data = await configService.saveSalaryScales(scales);
      set({ salaryScales: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to update salary scales", isLoading: false });
    }
  },
}));
