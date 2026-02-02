import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WizardData } from "@/types/wizard";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export function Step2AddressContact({ data, updateData }: StepProps) {
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
          </div>
          <div className="space-y-2">
            <Label>Quận/Huyện</Label>
            <Input
              value={data.permanentAddress.district}
              onChange={(e) => updatePermanentAddress("district", e.target.value)}
              placeholder="Đống Đa"
            />
          </div>
          <div className="space-y-2">
            <Label>Phường/Xã</Label>
            <Input
              value={data.permanentAddress.ward}
              onChange={(e) => updatePermanentAddress("ward", e.target.value)}
              placeholder="Trung Liệt"
            />
          </div>
          <div className="space-y-2">
            <Label>Số nhà, đường</Label>
            <Input
              value={data.permanentAddress.streetAddress}
              onChange={(e) => updatePermanentAddress("streetAddress", e.target.value)}
              placeholder="123 Tây Sơn"
            />
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
          </div>
        </div>
      </div>
    </div>
  );
}
