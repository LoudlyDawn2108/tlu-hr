import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WizardData } from "@/types/wizard";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export function Step7Salary({ data, updateData }: StepProps) {
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
            <SelectItem value="lecturer_1">Giảng viên - Bậc 1</SelectItem>
            <SelectItem value="lecturer_2">Giảng viên - Bậc 2</SelectItem>
            <SelectItem value="lecturer_3">Giảng viên - Bậc 3</SelectItem>
            <SelectItem value="specialist_1">Chuyên viên - Bậc 1</SelectItem>
            <SelectItem value="specialist_2">Chuyên viên - Bậc 2</SelectItem>
            <SelectItem value="specialist_3">Chuyên viên - Bậc 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Phụ cấp sẽ được tính tự động dựa trên ngạch lương và chức vụ.
        </p>
      </div>
    </div>
  );
}
