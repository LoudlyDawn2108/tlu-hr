import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Step1BasicInfo } from "@/components/forms/wizard-steps/Step1BasicInfo";
import { Step2AddressContact } from "@/components/forms/wizard-steps/Step2AddressContact";
import { Step3Family } from "@/components/forms/wizard-steps/Step3Family";
import { Step4Education } from "@/components/forms/wizard-steps/Step4Education";
import { Step5UnitPosition } from "@/components/forms/wizard-steps/Step5UnitPosition";
import { Step6Contract } from "@/components/forms/wizard-steps/Step6Contract";
import { Step7Salary } from "@/components/forms/wizard-steps/Step7Salary";
import { Step8Review } from "@/components/forms/wizard-steps/Step8Review";
import type { WizardData } from "@/types/wizard";
import { personnelToWizardData } from "@/utils/personnel-mapper";
import personnelData from "@/data/personnel.json";
import type { Personnel } from "@/types";
import { fullWizardSchema } from "@/lib/schemas";

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

export default function PersonnelEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [data, setData] = useState<WizardData>(initialData);
  const [originalPersonnel, setOriginalPersonnel] = useState<Personnel | null>(null);
  const [errors, setErrors] = useState<Record<string, string | string[] | undefined>>({});

  useEffect(() => {
    if (id) {
      const found = personnelData.find((p) => p.id === id) as unknown as Personnel;
      
      if (found) {
        setOriginalPersonnel(found);
        const wizardData = personnelToWizardData(found);
        setData(wizardData);
      } else {
        toast({
          title: "Lỗi",
          description: "Không tìm thấy nhân sự",
        });
        navigate("/tccb/personnel");
      }
    }
  }, [id, navigate, toast]);

  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = () => {
    const result = fullWizardSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      toast({
        title: "Lỗi",
        description: "Vui lòng kiểm tra các trường báo đỏ",
      });
      return;
    }

    setErrors({});
    toast({
      title: "Thành công",
      description: "Cập nhật hồ sơ thành công",
    });
    navigate(`/tccb/personnel/${id}`);
  };

  if (!originalPersonnel) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-muted-foreground">Đang tải thông tin nhân sự...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-10 py-4 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Chỉnh sửa: {originalPersonnel.fullName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {originalPersonnel.employeeCode}
          </p>
        </div>
        <Button onClick={handleSubmit}>
          <Save className="mr-2 h-4 w-4" />
          Lưu hồ sơ
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
        {steps.map((step) => {
          const StepComponent = step.component;
          return (
            <AccordionItem key={step.id} value={`item-${step.id}`}>
              <AccordionTrigger className="text-lg font-semibold px-1">
                {step.title}
              </AccordionTrigger>
              <AccordionContent className="p-1">
                <div className="pt-2 pb-4">
                  <StepComponent 
                    data={data} 
                    updateData={updateData} 
                    errors={errors} 
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
