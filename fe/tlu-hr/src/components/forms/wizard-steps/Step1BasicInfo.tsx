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

export function Step1BasicInfo({ data, updateData, errors }: StepProps) {
  const getError = (field: string) => {
    if (!errors || !errors[field]) return null;
    const error = errors[field];
    return Array.isArray(error) ? error[0] : error;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Họ và tên *</Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => updateData({ fullName: e.target.value })}
          placeholder="Nguyễn Văn A"
        />
        {getError("fullName") && (
          <p className="text-red-500 text-sm mt-1">{getError("fullName")}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => updateData({ dateOfBirth: e.target.value })}
        />
        {getError("dateOfBirth") && (
          <p className="text-red-500 text-sm mt-1">{getError("dateOfBirth")}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Giới tính *</Label>
        <Select
          value={data.gender}
          onValueChange={(value) => updateData({ gender: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn giới tính" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Nam</SelectItem>
            <SelectItem value="female">Nữ</SelectItem>
          </SelectContent>
        </Select>
        {getError("gender") && (
          <p className="text-red-500 text-sm mt-1">{getError("gender")}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="idCardNumber">Số CCCD/CMND *</Label>
        <Input
          id="idCardNumber"
          value={data.idCardNumber}
          onChange={(e) => updateData({ idCardNumber: e.target.value })}
          placeholder="001085123456"
        />
        {getError("idCardNumber") && (
          <p className="text-red-500 text-sm mt-1">{getError("idCardNumber")}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="placeOfBirth">Nơi sinh</Label>
        <Input
          id="placeOfBirth"
          value={data.placeOfBirth}
          onChange={(e) => updateData({ placeOfBirth: e.target.value })}
          placeholder="Hà Nội"
        />
        {getError("placeOfBirth") && (
          <p className="text-red-500 text-sm mt-1">{getError("placeOfBirth")}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="hometown">Quê quán</Label>
        <Input
          id="hometown"
          value={data.hometown}
          onChange={(e) => updateData({ hometown: e.target.value })}
          placeholder="Hà Nội"
        />
        {getError("hometown") && (
          <p className="text-red-500 text-sm mt-1">{getError("hometown")}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="ethnicity">Dân tộc</Label>
        <Input
          id="ethnicity"
          value={data.ethnicity}
          onChange={(e) => updateData({ ethnicity: e.target.value })}
        />
        {getError("ethnicity") && (
          <p className="text-red-500 text-sm mt-1">{getError("ethnicity")}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="religion">Tôn giáo</Label>
        <Input
          id="religion"
          value={data.religion}
          onChange={(e) => updateData({ religion: e.target.value })}
        />
        {getError("religion") && (
          <p className="text-red-500 text-sm mt-1">{getError("religion")}</p>
        )}
      </div>
    </div>
  );
}
