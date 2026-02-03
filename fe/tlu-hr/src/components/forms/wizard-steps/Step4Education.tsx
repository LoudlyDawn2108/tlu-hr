import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { WizardData } from "@/types/wizard";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  errors?: Record<string, string | string[] | undefined>;
}

export function Step4Education({ data, updateData, errors }: StepProps) {
  const getError = (field: string) => {
    if (!errors || !errors[field]) return null;
    const error = errors[field];
    return Array.isArray(error) ? error[0] : error;
  };

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
            {getError(`education.${index}.level`) && (
              <p className="text-red-500 text-sm mt-1">{getError(`education.${index}.level`)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Tên bằng cấp</Label>
            <Input
              value={edu.degreeName}
              onChange={(e) => updateEducation(index, "degreeName", e.target.value)}
              placeholder="Kỹ sư CNTT"
            />
            {getError(`education.${index}.degreeName`) && (
              <p className="text-red-500 text-sm mt-1">{getError(`education.${index}.degreeName`)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Chuyên ngành</Label>
            <Input
              value={edu.major}
              onChange={(e) => updateEducation(index, "major", e.target.value)}
              placeholder="Công nghệ phần mềm"
            />
            {getError(`education.${index}.major`) && (
              <p className="text-red-500 text-sm mt-1">{getError(`education.${index}.major`)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Trường</Label>
            <Input
              value={edu.school}
              onChange={(e) => updateEducation(index, "school", e.target.value)}
              placeholder="ĐHBK Hà Nội"
            />
            {getError(`education.${index}.school`) && (
              <p className="text-red-500 text-sm mt-1">{getError(`education.${index}.school`)}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Năm tốt nghiệp</Label>
            <Input
              type="number"
              value={edu.graduationYear}
              onChange={(e) => updateEducation(index, "graduationYear", parseInt(e.target.value))}
            />
            {getError(`education.${index}.graduationYear`) && (
              <p className="text-red-500 text-sm mt-1">{getError(`education.${index}.graduationYear`)}</p>
            )}
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
