import { useEffect, useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WizardData } from "@/types/wizard";
import { useConfigStore } from "@/stores/config.store";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  errors?: Record<string, string | string[] | undefined>;
}

export function Step7Salary({ data, updateData, errors }: StepProps) {
  const { salaryScales, fetchSalaryScales } = useConfigStore();

  useEffect(() => {
    fetchSalaryScales();
  }, [fetchSalaryScales]);

  const salaryOptions = useMemo(() => {
    return salaryScales.flatMap((scale) =>
      scale.grades.map((grade) => ({
        value: `${scale.type}_${grade.grade}`,
        label: `${scale.name} - Bậc ${grade.grade} (Hệ số: ${grade.coefficient})`,
      }))
    );
  }, [salaryScales]);

  const getError = (field: string) => {
    if (!errors || !errors[field]) return null;
    const error = errors[field];
    return Array.isArray(error) ? error[0] : error;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Ngạch lương *</Label>
        <Select
          value={data.salaryScaleId}
          onValueChange={(value) => updateData({ salaryScaleId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn ngạch lương" />
          </SelectTrigger>
          <SelectContent>
            {salaryOptions.length === 0 ? (
              <SelectItem value="loading" disabled>
                Đang tải dữ liệu...
              </SelectItem>
            ) : (
              salaryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        {getError("salaryScaleId") && (
          <p className="text-red-500 text-sm mt-1">{getError("salaryScaleId")}</p>
        )}
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Phụ cấp sẽ được tính tự động dựa trên ngạch lương và chức vụ.
        </p>
      </div>
    </div>
  );
}
