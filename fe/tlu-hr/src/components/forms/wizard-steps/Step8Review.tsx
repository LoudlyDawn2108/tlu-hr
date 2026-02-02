import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import organizationData from "@/data/organizations.json";
import type { WizardData } from "@/types/wizard";

interface StepProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export function Step8Review({ data }: StepProps) {
  const getUnitName = (unitId: string) => {
    const unit = organizationData.find((u) => u.id === unitId);
    return unit?.name || "-";
  };

  const getPositionName = (positionId: string) => {
    const positions: Record<string, string> = {
      lecturer: "Giảng viên",
      senior_lecturer: "Giảng viên chính",
      department_head: "Trưởng bộ môn",
      dean: "Trưởng khoa",
      specialist: "Chuyên viên",
    };
    return positions[positionId] || "-";
  };

  const getContractTypeName = (type: string) => {
    const types: Record<string, string> = {
      indefinite: "Không xác định thời hạn",
      definite: "Xác định thời hạn",
      probation: "Thử việc",
      visiting: "Thỉnh giảng",
    };
    return types[type] || "-";
  };

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Xem lại thông tin</h3>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-muted-foreground">Họ tên:</span> {data.fullName}</div>
          <div><span className="text-muted-foreground">Ngày sinh:</span> {data.dateOfBirth}</div>
          <div><span className="text-muted-foreground">Giới tính:</span> {data.gender === "male" ? "Nam" : "Nữ"}</div>
          <div><span className="text-muted-foreground">CCCD:</span> {data.idCardNumber}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-muted-foreground">Điện thoại:</span> {data.phoneNumber}</div>
          <div><span className="text-muted-foreground">Email:</span> {data.workEmail || data.personalEmail}</div>
          <div className="col-span-2"><span className="text-muted-foreground">Địa chỉ:</span> {data.permanentAddress.streetAddress}, {data.permanentAddress.ward}, {data.permanentAddress.district}, {data.permanentAddress.province}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Công tác</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-muted-foreground">Đơn vị:</span> {getUnitName(data.unitId)}</div>
          <div><span className="text-muted-foreground">Chức vụ:</span> {getPositionName(data.positionId)}</div>
          <div><span className="text-muted-foreground">Hợp đồng:</span> {getContractTypeName(data.contractType)}</div>
          <div><span className="text-muted-foreground">Ngày hiệu lực:</span> {data.contractEffectiveDate}</div>
        </CardContent>
      </Card>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          Vui lòng kiểm tra kỹ thông tin trước khi lưu. Sau khi lưu, hồ sơ sẽ được thêm vào hệ thống.
        </p>
      </div>
    </div>
  );
}
