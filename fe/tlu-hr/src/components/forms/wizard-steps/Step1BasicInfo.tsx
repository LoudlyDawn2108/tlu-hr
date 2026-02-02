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

export function Step1BasicInfo({ data, updateData }: StepProps) {
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => updateData({ dateOfBirth: e.target.value })}
        />
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="idCardNumber">Số CCCD/CMND *</Label>
        <Input
          id="idCardNumber"
          value={data.idCardNumber}
          onChange={(e) => updateData({ idCardNumber: e.target.value })}
          placeholder="001085123456"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="placeOfBirth">Nơi sinh</Label>
        <Input
          id="placeOfBirth"
          value={data.placeOfBirth}
          onChange={(e) => updateData({ placeOfBirth: e.target.value })}
          placeholder="Hà Nội"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hometown">Quê quán</Label>
        <Input
          id="hometown"
          value={data.hometown}
          onChange={(e) => updateData({ hometown: e.target.value })}
          placeholder="Hà Nội"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ethnicity">Dân tộc</Label>
        <Input
          id="ethnicity"
          value={data.ethnicity}
          onChange={(e) => updateData({ ethnicity: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="religion">Tôn giáo</Label>
        <Input
          id="religion"
          value={data.religion}
          onChange={(e) => updateData({ religion: e.target.value })}
        />
      </div>
    </div>
  );
}
