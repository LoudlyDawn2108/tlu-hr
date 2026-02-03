import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import personnelData from "@/data/personnel.json";
import { validateContractDates } from "@/utils/contract-helpers";

export default function ContractCreatePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const personnelId = searchParams.get("personnelId");

  const [personnel, setPersonnel] = useState<{ id: string; fullName: string; employeeCode: string } | null>(null);
  
  const [contractNumber, setContractNumber] = useState("");
  const [contractType, setContractType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [isForeignExpert, setIsForeignExpert] = useState(false);
  
  const [nationality, setNationality] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [workPermitNumber, setWorkPermitNumber] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (personnelId) {
      const found = personnelData.find((p) => p.id === personnelId);
      if (found) {
        setPersonnel(found);
      } else {
        toast.error("Không tìm thấy nhân sự");
        navigate("/tccb/contracts");
      }
    }
  }, [personnelId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!contractNumber) newErrors.contractNumber = "Vui lòng nhập số hợp đồng";
    if (!contractType) newErrors.contractType = "Vui lòng chọn loại hợp đồng";
    if (!startDate) newErrors.startDate = "Vui lòng nhập ngày bắt đầu";
    
    const dateError = validateContractDates(startDate, endDate);
    if (dateError) {
      newErrors.dates = dateError;
    }

    if (isForeignExpert) {
      if (!nationality) newErrors.nationality = "Vui lòng nhập quốc tịch";
      if (!passportNumber) newErrors.passportNumber = "Vui lòng nhập số hộ chiếu";
      if (!workPermitNumber) newErrors.workPermitNumber = "Vui lòng nhập giấy phép lao động";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast.success("Tạo hợp đồng thành công");
      navigate(`/tccb/personnel/${personnelId}`);
    } else {
      toast.error("Vui lòng kiểm tra lại thông tin");
    }
  };

  if (!personnel) {
    return <div className="p-8 text-center">Đang tải thông tin nhân sự...</div>;
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 hover:bg-transparent hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Tạo Hợp Đồng Mới</CardTitle>
          <CardDescription>
            Tạo hợp đồng cho nhân sự: <span className="font-semibold text-foreground">{personnel.fullName}</span> ({personnel.employeeCode})
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contractNumber">Số hợp đồng <span className="text-red-500">*</span></Label>
                  <Input 
                    id="contractNumber" 
                    placeholder="HĐ123/2024" 
                    value={contractNumber}
                    onChange={(e) => setContractNumber(e.target.value)}
                    className={errors.contractNumber ? "border-red-500" : ""}
                  />
                  {errors.contractNumber && <p className="text-sm text-red-500">{errors.contractNumber}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contractType">Loại hợp đồng <span className="text-red-500">*</span></Label>
                  <Select onValueChange={setContractType} value={contractType}>
                    <SelectTrigger className={errors.contractType ? "border-red-500" : ""}>
                      <SelectValue placeholder="Chọn loại hợp đồng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="definite">Có thời hạn</SelectItem>
                      <SelectItem value="indefinite">Không thời hạn</SelectItem>
                      <SelectItem value="probation">Thử việc</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.contractType && <p className="text-sm text-red-500">{errors.contractType}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Ngày bắt đầu <span className="text-red-500">*</span></Label>
                  <Input 
                    id="startDate" 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={errors.startDate ? "border-red-500" : ""}
                  />
                  {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Ngày kết thúc</Label>
                  <Input 
                    id="endDate" 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              
              {errors.dates && (
                <div className="flex items-center text-red-500 text-sm bg-red-50 p-2 rounded">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errors.dates}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả / Ghi chú</Label>
                <Textarea 
                  id="description" 
                  placeholder="Nhập ghi chú thêm..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 border-t pt-4">
              <Switch 
                id="foreign-expert" 
                checked={isForeignExpert}
                onCheckedChange={setIsForeignExpert}
              />
              <Label htmlFor="foreign-expert">Đây là chuyên gia nước ngoài</Label>
            </div>

            {isForeignExpert && (
              <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
                <div className="space-y-2">
                  <Label htmlFor="nationality">Quốc tịch <span className="text-red-500">*</span></Label>
                  <Input 
                    id="nationality" 
                    placeholder="Ví dụ: Anh, Mỹ..." 
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className={errors.nationality ? "border-red-500" : ""}
                  />
                  {errors.nationality && <p className="text-sm text-red-500">{errors.nationality}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passportNumber">Số hộ chiếu <span className="text-red-500">*</span></Label>
                    <Input 
                      id="passportNumber" 
                      placeholder="P12345678" 
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      className={errors.passportNumber ? "border-red-500" : ""}
                    />
                    {errors.passportNumber && <p className="text-sm text-red-500">{errors.passportNumber}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="workPermitNumber">Giấy phép lao động <span className="text-red-500">*</span></Label>
                    <Input 
                      id="workPermitNumber" 
                      placeholder="WP-2024-001" 
                      value={workPermitNumber}
                      onChange={(e) => setWorkPermitNumber(e.target.value)}
                      className={errors.workPermitNumber ? "border-red-500" : ""}
                    />
                    {errors.workPermitNumber && <p className="text-sm text-red-500">{errors.workPermitNumber}</p>}
                  </div>
                </div>
              </div>
            )}

          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t pt-6">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>Hủy</Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Lưu hợp đồng
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
