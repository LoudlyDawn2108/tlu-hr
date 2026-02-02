import { Input } from "@/components/ui/input";
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

export function Step6Contract({ data, updateData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Loại hợp đồng *</Label>
        <Select
          value={data.contractType}
          onValueChange={(value) => updateData({ contractType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn loại hợp đồng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="indefinite">Không xác định thời hạn</SelectItem>
            <SelectItem value="definite">Xác định thời hạn</SelectItem>
            <SelectItem value="probation">Thử việc</SelectItem>
            <SelectItem value="visiting">Thỉnh giảng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contractSignDate">Ngày ký *</Label>
          <Input
            id="contractSignDate"
            type="date"
            value={data.contractSignDate}
            onChange={(e) => updateData({ contractSignDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contractEffectiveDate">Ngày hiệu lực *</Label>
          <Input
            id="contractEffectiveDate"
            type="date"
            value={data.contractEffectiveDate}
            onChange={(e) => updateData({ contractEffectiveDate: e.target.value })}
          />
        </div>
      </div>

      {data.contractType !== "indefinite" && (
        <div className="space-y-2">
          <Label htmlFor="contractExpiryDate">Ngày hết hạn</Label>
          <Input
            id="contractExpiryDate"
            type="date"
            value={data.contractExpiryDate}
            onChange={(e) => updateData({ contractExpiryDate: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
