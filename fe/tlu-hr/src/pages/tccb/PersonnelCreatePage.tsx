import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Step1BasicInfo } from "@/components/forms/wizard-steps/Step1BasicInfo";
import { Step2AddressContact } from "@/components/forms/wizard-steps/Step2AddressContact";
import { Step3Family } from "@/components/forms/wizard-steps/Step3Family";
import { Step4Education } from "@/components/forms/wizard-steps/Step4Education";
import { Step5UnitPosition } from "@/components/forms/wizard-steps/Step5UnitPosition";
import { Step6Contract } from "@/components/forms/wizard-steps/Step6Contract";
import { Step7Salary } from "@/components/forms/wizard-steps/Step7Salary";
import { Step8Review } from "@/components/forms/wizard-steps/Step8Review";
import type { WizardData } from "@/types/wizard";

const initialData: WizardData = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  idCardNumber: "",
  placeOfBirth: "",
  hometown: "",
  ethnicity: "Kinh",
  religion: "Không",
  taxCode: "",
  socialInsuranceNumber: "",
  healthInsuranceNumber: "",
  permanentAddress: {
    country: "Việt Nam",
    province: "",
    district: "",
    ward: "",
    streetAddress: "",
  },
  temporaryAddress: null,
  phoneNumber: "",
  personalEmail: "",
  workEmail: "",
  maritalStatus: "single",
  spouse: null,
  children: [],
  education: [],
  unitId: "",
  positionId: "",
  contractType: "definite",
  contractSignDate: "",
  contractEffectiveDate: "",
  contractExpiryDate: "",
  salaryScaleId: "",
};

const steps = [
  { id: 1, title: "Thông tin cơ bản", component: Step1BasicInfo },
  { id: 2, title: "Địa chỉ & Liên hệ", component: Step2AddressContact },
  { id: 3, title: "Gia đình", component: Step3Family },
  { id: 4, title: "Học vấn", component: Step4Education },
  { id: 5, title: "Đơn vị & Chức vụ", component: Step5UnitPosition },
  { id: 6, title: "Hợp đồng", component: Step6Contract },
  { id: 7, title: "Lương & Phụ cấp", component: Step7Salary },
  { id: 8, title: "Xem lại", component: Step8Review },
];

export default function PersonnelCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);

  const progress = (currentStep / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep - 1].component;

  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Thành công",
      description: "Đã lưu hồ sơ nhân sự mới",
    });
    navigate("/tccb/personnel");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thêm nhân sự mới</h1>
        <p className="text-muted-foreground">
          Bước {currentStep} / {steps.length}: {steps[currentStep - 1].title}
        </p>
      </div>

      <Progress value={progress} className="h-2" />

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CurrentStepComponent data={data} updateData={updateData} />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        {currentStep === steps.length ? (
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Lưu hồ sơ
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Tiếp theo
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
