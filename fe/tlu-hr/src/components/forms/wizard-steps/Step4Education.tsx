import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { WizardData } from "@/types/wizard";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export function Step4Education({ data, updateData }: StepProps) {
  const addEducation = () => {
    updateData({
      education: [
        ...data.education,
        { level: "", degreeName: "", major: "", school: "", graduationYear: new Date().getFullYear(), grade: "" },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const newEducation = data.education.filter((_, i) => i !== index);
    updateData({ education: newEducation });
  };

  const updateEducation = (index: number, field: string, value: string | number) => {
    const newEducation = data.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    updateData({ education: newEducation });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Quá trình học vấn</h3>
        <Button type="button" variant="outline" size="sm" onClick={addEducation}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm bằng cấp
        </Button>
      </div>

      {data.education.map((edu, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 items-end p-4 border rounded-lg">
          <div className="space-y-2">
            <Label>Trình độ</Label>
            <Input
              value={edu.level}
              onChange={(e) => updateEducation(index, "level", e.target.value)}
              placeholder="Đại học"
            />
          </div>
          <div className="space-y-2">
            <Label>Tên bằng cấp</Label>
            <Input
              value={edu.degreeName}
              onChange={(e) => updateEducation(index, "degreeName", e.target.value)}
              placeholder="Kỹ sư CNTT"
            />
          </div>
          <div className="space-y-2">
            <Label>Chuyên ngành</Label>
            <Input
              value={edu.major}
              onChange={(e) => updateEducation(index, "major", e.target.value)}
              placeholder="Công nghệ phần mềm"
            />
          </div>
          <div className="space-y-2">
            <Label>Trường</Label>
            <Input
              value={edu.school}
              onChange={(e) => updateEducation(index, "school", e.target.value)}
              placeholder="ĐHBK Hà Nội"
            />
          </div>
          <div className="space-y-2">
            <Label>Năm tốt nghiệp</Label>
            <Input
              type="number"
              value={edu.graduationYear}
              onChange={(e) => updateEducation(index, "graduationYear", parseInt(e.target.value))}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeEducation(index)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
