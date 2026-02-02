import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import organizationData from "@/data/organizations.json";
import type { WizardData } from "@/types/wizard";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export function Step5UnitPosition({ data, updateData }: StepProps) {
  const units = organizationData.filter(
    (u) => u.type === "faculty" || u.type === "department" || u.type === "office"
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Đơn vị công tác *</Label>
        <Select
          value={data.unitId}
          onValueChange={(value) => updateData({ unitId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn đơn vị" />
          </SelectTrigger>
          <SelectContent>
            {units.map((unit) => (
              <SelectItem key={unit.id} value={unit.id}>
                {unit.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Chức vụ *</Label>
        <Select
          value={data.positionId}
          onValueChange={(value) => updateData({ positionId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn chức vụ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lecturer">Giảng viên</SelectItem>
            <SelectItem value="senior_lecturer">Giảng viên chính</SelectItem>
            <SelectItem value="department_head">Trưởng bộ môn</SelectItem>
            <SelectItem value="dean">Trưởng khoa</SelectItem>
            <SelectItem value="specialist">Chuyên viên</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
