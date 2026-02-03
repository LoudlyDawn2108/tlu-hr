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
  errors?: Record<string, string | string[] | undefined>;
}

export function Step6Contract({ data, updateData, errors }: StepProps) {
  const getError = (field: string) => {
    if (!errors || !errors[field]) return null;
    const error = errors[field];
    return Array.isArray(error) ? error[0] : error;
  };

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
        {getError("contractType") && (
          <p className="text-red-500 text-sm mt-1">{getError("contractType")}</p>
        )}
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
          {getError("contractSignDate") && (
            <p className="text-red-500 text-sm mt-1">{getError("contractSignDate")}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contractEffectiveDate">Ngày hiệu lực *</Label>
          <Input
            id="contractEffectiveDate"
            type="date"
            value={data.contractEffectiveDate}
            onChange={(e) => updateData({ contractEffectiveDate: e.target.value })}
          />
          {getError("contractEffectiveDate") && (
            <p className="text-red-500 text-sm mt-1">{getError("contractEffectiveDate")}</p>
          )}
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
          {getError("contractExpiryDate") && (
            <p className="text-red-500 text-sm mt-1">{getError("contractExpiryDate")}</p>
          )}
        </div>
      )}
    </div>
  );
}
