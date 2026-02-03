import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Save, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { wizardDataToPersonnel } from "@/utils/personnel-mapper";
import personnelData from "@/data/personnel.json";
import contractsData from "@/data/contracts.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  step8Schema,
  fullWizardSchema,
} from "@/lib/schemas";
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
  contractNumber: "",
  contractSignDate: "",
  contractEffectiveDate: "",
  contractExpiryDate: "",
  salaryScaleId: "",
};

const steps = [
  { id: "step-1", title: "Thông tin cơ bản", component: Step1BasicInfo, schema: step1Schema },
  { id: "step-2", title: "Địa chỉ & Liên hệ", component: Step2AddressContact, schema: step2Schema },
  { id: "step-3", title: "Gia đình", component: Step3Family, schema: step3Schema },
  { id: "step-4", title: "Học vấn", component: Step4Education, schema: step4Schema },
  { id: "step-5", title: "Đơn vị & Chức vụ", component: Step5UnitPosition, schema: step5Schema },
  { id: "step-6", title: "Hợp đồng", component: Step6Contract, schema: step6Schema },
  { id: "step-7", title: "Lương & Phụ cấp", component: Step7Salary, schema: step7Schema },
  { id: "step-8", title: "Xem lại", component: Step8Review, schema: step8Schema },
];

export default function PersonnelCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [data, setData] = useState<WizardData>(initialData);
  const [errors, setErrors] = useState<Record<string, Record<string, string[]>>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeSteps, setActiveSteps] = useState<string[]>(["step-1"]);

  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = (stepId: string, schema: z.ZodSchema) => {
    const result = schema.safeParse(data);
    
    if (result.success) {
      setCompletedSteps((prev) => {
        const newSet = new Set(prev);
        newSet.add(stepId);
        return newSet;
      });

      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[stepId];
        return newErrors;
      });

      const currentIndex = steps.findIndex((s) => s.id === stepId);
      if (currentIndex < steps.length - 1) {
        const nextStepId = steps[currentIndex + 1].id;
        setActiveSteps((prev) => {
          if (!prev.includes(nextStepId)) {
            return [...prev, nextStepId];
          }
          return prev;
        });
      }
    } else {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors((prev) => ({
        ...prev,
        [stepId]: fieldErrors as Record<string, string[]>,
      }));
      
      toast({
        title: "Thông tin chưa hợp lệ",
        description: "Vui lòng kiểm tra lại các trường báo đỏ.",
      });
    }
  };

  const handleSubmit = () => {
    const result = fullWizardSchema.safeParse(data);
    if (!result.success) {
      const newErrors: Record<string, Record<string, string[]>> = {};
      const newCompleted = new Set(completedSteps);
      
      steps.forEach((step) => {
        const stepResult = step.schema.safeParse(data);
        if (!stepResult.success) {
          newErrors[step.id] = stepResult.error.flatten().fieldErrors as Record<string, string[]>;
          newCompleted.delete(step.id);
        }
      });
      
      setErrors(newErrors);
      setCompletedSteps(newCompleted);

      toast({
        title: "Lỗi",
        description: "Vui lòng kiểm tra lại thông tin.",
      });
      return;
    }

    const personnelPartial = wizardDataToPersonnel(data);
    const newId = `pers-${Date.now()}`;
    const newPersonnel = {
      ...personnelPartial,
      id: newId,
      employeeCode: `CB${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'system',
      updatedBy: 'system',
      temporaryAddress: personnelPartial.temporaryAddress || null,
    } as unknown as typeof personnelData[0];

    personnelData.push(newPersonnel);

    if (newPersonnel.contracts && newPersonnel.contracts.length > 0) {
      const contract = newPersonnel.contracts[0];
      (contract as unknown as Record<string, string>).personnelId = newId;
      contractsData.push(contract as unknown as typeof contractsData[0]);
    }

    toast({
      title: "Thành công",
      description: "Đã lưu hồ sơ nhân sự mới",
    });
    navigate("/tccb/personnel");
  };

  const allStepsCompleted = steps.every((step) => completedSteps.has(step.id));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thêm nhân sự mới</h1>
        <p className="text-muted-foreground">
          Hoàn thành các bước dưới đây để tạo hồ sơ nhân sự mới.
        </p>
      </div>

      <Accordion 
        type="multiple" 
        value={activeSteps} 
        onValueChange={setActiveSteps}
        className="w-full space-y-4"
      >
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const StepComponent = step.component;
          const isDisabled = index > 0 && !completedSteps.has(steps[index - 1].id);

          return (
            <AccordionItem 
              key={step.id} 
              value={step.id} 
              disabled={isDisabled}
              className="border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border transition-colors",
                      isCompleted
                        ? "bg-primary text-primary-foreground border-primary"
                        : isDisabled
                        ? "bg-muted text-muted-foreground border-muted-foreground/30"
                        : "bg-background border-muted-foreground/50"
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={cn(
                    "text-lg font-medium",
                    isDisabled && "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6 px-1">
                <div className="space-y-6">
                  <StepComponent
                    data={data}
                    updateData={updateData}
                    errors={errors[step.id]}
                  />
                  
                  {!isCompleted && (
                    <div className="flex justify-end pt-2">
                      <Button onClick={() => handleNext(step.id, step.schema)}>
                        Tiếp theo
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="flex justify-end pt-6 border-t sticky bottom-0 bg-background/95 backdrop-blur py-4 z-10">
        <Button 
          onClick={handleSubmit} 
          disabled={!allStepsCompleted}
          size="lg"
          className="min-w-[150px]"
        >
          <Save className="mr-2 h-4 w-4" />
          Lưu hồ sơ
        </Button>
      </div>
    </div>
  );
}
