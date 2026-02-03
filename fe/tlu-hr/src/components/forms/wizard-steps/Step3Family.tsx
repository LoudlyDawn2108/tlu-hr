import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { WizardData } from "@/types/wizard";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  errors?: Record<string, string | string[] | undefined>;
}

export function Step3Family({ data, updateData, errors }: StepProps) {
  const getError = (field: string) => {
    if (!errors || !errors[field]) return null;
    const error = errors[field];
    return Array.isArray(error) ? error[0] : error;
  };

  const addChild = () => {
    updateData({
      children: [
        ...data.children,
        { fullName: "", dateOfBirth: "", relationship: "Con" },
      ],
    });
  };

  const removeChild = (index: number) => {
    const newChildren = data.children.filter((_, i) => i !== index);
    updateData({ children: newChildren });
  };

  const updateChild = (index: number, field: string, value: string) => {
    const newChildren = data.children.map((child, i) =>
      i === index ? { ...child, [field]: value } : child
    );
    updateData({ children: newChildren });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Tình trạng hôn nhân</h3>
        <Select
          value={data.maritalStatus}
          onValueChange={(value) => updateData({ maritalStatus: value })}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Chọn tình trạng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="single">Độc thân</SelectItem>
            <SelectItem value="married">Đã kết hôn</SelectItem>
            <SelectItem value="divorced">Ly hôn</SelectItem>
            <SelectItem value="widowed">Góa</SelectItem>
          </SelectContent>
        </Select>
        {getError("maritalStatus") && (
          <p className="text-red-500 text-sm mt-1">{getError("maritalStatus")}</p>
        )}
      </div>

      {data.maritalStatus === "married" && (
        <div className="space-y-4">
          <h3 className="font-medium">Thông tin vợ/chồng</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Họ và tên</Label>
              <Input
                value={data.spouse?.fullName || ""}
                onChange={(e) =>
                  updateData({
                    spouse: { 
                      fullName: e.target.value,
                      dateOfBirth: data.spouse?.dateOfBirth || "",
                      relationship: "Vợ",
                      occupation: data.spouse?.occupation || "",
                      phoneNumber: data.spouse?.phoneNumber || "",
                    },
                  })
                }
                placeholder="Trần Thị B"
              />
              {getError("spouse.fullName") && (
                <p className="text-red-500 text-sm mt-1">{getError("spouse.fullName")}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Ngày sinh</Label>
              <Input
                type="date"
                value={data.spouse?.dateOfBirth || ""}
                onChange={(e) =>
                  updateData({
                    spouse: { 
                      fullName: data.spouse?.fullName || "",
                      dateOfBirth: e.target.value,
                      relationship: "Vợ",
                      occupation: data.spouse?.occupation || "",
                      phoneNumber: data.spouse?.phoneNumber || "",
                    },
                  })
                }
              />
              {getError("spouse.dateOfBirth") && (
                <p className="text-red-500 text-sm mt-1">{getError("spouse.dateOfBirth")}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Nghề nghiệp</Label>
              <Input
                value={data.spouse?.occupation || ""}
                onChange={(e) =>
                  updateData({
                    spouse: { 
                      fullName: data.spouse?.fullName || "",
                      dateOfBirth: data.spouse?.dateOfBirth || "",
                      relationship: "Vợ",
                      occupation: e.target.value,
                      phoneNumber: data.spouse?.phoneNumber || "",
                    },
                  })
                }
              />
              {getError("spouse.occupation") && (
                <p className="text-red-500 text-sm mt-1">{getError("spouse.occupation")}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Số điện thoại</Label>
              <Input
                value={data.spouse?.phoneNumber || ""}
                onChange={(e) =>
                  updateData({
                    spouse: { 
                      fullName: data.spouse?.fullName || "",
                      dateOfBirth: data.spouse?.dateOfBirth || "",
                      relationship: "Vợ",
                      occupation: data.spouse?.occupation || "",
                      phoneNumber: e.target.value,
                    },
                  })
                }
              />
              {getError("spouse.phoneNumber") && (
                <p className="text-red-500 text-sm mt-1">{getError("spouse.phoneNumber")}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Thông tin con cái</h3>
          <Button type="button" variant="outline" size="sm" onClick={addChild}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm con
          </Button>
        </div>

        {data.children.map((child, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 items-end p-4 border rounded-lg">
            <div className="space-y-2">
              <Label>Họ và tên</Label>
              <Input
                value={child.fullName}
                onChange={(e) => updateChild(index, "fullName", e.target.value)}
                placeholder="Nguyễn Văn C"
              />
              {getError(`children.${index}.fullName`) && (
                <p className="text-red-500 text-sm mt-1">{getError(`children.${index}.fullName`)}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Ngày sinh</Label>
              <Input
                type="date"
                value={child.dateOfBirth}
                onChange={(e) => updateChild(index, "dateOfBirth", e.target.value)}
              />
              {getError(`children.${index}.dateOfBirth`) && (
                <p className="text-red-500 text-sm mt-1">{getError(`children.${index}.dateOfBirth`)}</p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeChild(index)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
