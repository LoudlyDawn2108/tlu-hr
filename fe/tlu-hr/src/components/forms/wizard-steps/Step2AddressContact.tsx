import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WizardData } from "@/types/wizard";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  errors?: Record<string, string | string[] | undefined>;
}

export function Step2AddressContact({ data, updateData, errors }: StepProps) {
  const getError = (field: string) => {
    if (!errors || !errors[field]) return null;
    const error = errors[field];
    return Array.isArray(error) ? error[0] : error;
  };

  const updatePermanentAddress = (field: string, value: string) => {
    updateData({
      permanentAddress: { ...data.permanentAddress, [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Địa chỉ thường trú</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tỉnh/Thành phố</Label>
            <Input
              value={data.permanentAddress.province}
              onChange={(e) => updatePermanentAddress("province", e.target.value)}
              placeholder="Hà Nội"
            />
            {getError("permanentAddress.province") && (
              <p className="text-red-500 text-sm mt-1">{getError("permanentAddress.province")}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Quận/Huyện</Label>
            <Input
              value={data.permanentAddress.district}
              onChange={(e) => updatePermanentAddress("district", e.target.value)}
              placeholder="Đống Đa"
            />
            {getError("permanentAddress.district") && (
              <p className="text-red-500 text-sm mt-1">{getError("permanentAddress.district")}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Phường/Xã</Label>
            <Input
              value={data.permanentAddress.ward}
              onChange={(e) => updatePermanentAddress("ward", e.target.value)}
              placeholder="Trung Liệt"
            />
            {getError("permanentAddress.ward") && (
              <p className="text-red-500 text-sm mt-1">{getError("permanentAddress.ward")}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Số nhà, đường</Label>
            <Input
              value={data.permanentAddress.streetAddress}
              onChange={(e) => updatePermanentAddress("streetAddress", e.target.value)}
              placeholder="123 Tây Sơn"
            />
            {getError("permanentAddress.streetAddress") && (
              <p className="text-red-500 text-sm mt-1">{getError("permanentAddress.streetAddress")}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Thông tin liên hệ</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Số điện thoại *</Label>
            <Input
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) => updateData({ phoneNumber: e.target.value })}
              placeholder="0912345678"
            />
            {getError("phoneNumber") && (
              <p className="text-red-500 text-sm mt-1">{getError("phoneNumber")}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalEmail">Email cá nhân</Label>
            <Input
              id="personalEmail"
              type="email"
              value={data.personalEmail}
              onChange={(e) => updateData({ personalEmail: e.target.value })}
              placeholder="example@gmail.com"
            />
            {getError("personalEmail") && (
              <p className="text-red-500 text-sm mt-1">{getError("personalEmail")}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="workEmail">Email công việc</Label>
            <Input
              id="workEmail"
              type="email"
              value={data.workEmail}
              onChange={(e) => updateData({ workEmail: e.target.value })}
              placeholder="name@tlu.edu.vn"
            />
            {getError("workEmail") && (
              <p className="text-red-500 text-sm mt-1">{getError("workEmail")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
