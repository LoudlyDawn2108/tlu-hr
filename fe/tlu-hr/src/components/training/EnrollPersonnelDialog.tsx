import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { canEnroll } from "@/utils/training-helpers";
import personnelData from "@/data/personnel.json";
import type { TrainingCourse, TrainingParticipation } from "@/types";
import { ParticipantStatus } from "@/types";

interface EnrollPersonnelDialogProps {
  course: TrainingCourse;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (participation: TrainingParticipation) => void;
}

export function EnrollPersonnelDialog({
  course,
  isOpen,
  onClose,
  onSuccess,
}: EnrollPersonnelDialogProps) {
  const [selectedPersonnelId, setSelectedPersonnelId] = useState<string>("");

  // Filter out personnel who are already enrolled in this course
  const availablePersonnel = useMemo(() => {
    const enrolledIds = course.participants.map((p) => p.personnelId);
    return personnelData.filter((p) => !enrolledIds.includes(p.id));
  }, [course.participants]);

  const handleEnroll = () => {
    if (!selectedPersonnelId) {
      toast.error("Vui lòng chọn nhân sự");
      return;
    }

    // Check if enrollment is allowed
    const validation = canEnroll(course, selectedPersonnelId, course.participants);
    
    if (!validation.allowed) {
      toast.error(validation.reason || "Không thể đăng ký tham gia khóa học");
      return;
    }

    // Create participation object
    const participation: TrainingParticipation = {
      id: `part-${Date.now()}`,
      personnelId: selectedPersonnelId,
      courseId: course.id,
      status: ParticipantStatus.REGISTERED,
      registrationDate: new Date().toISOString(),
    };

    onSuccess(participation);
    toast.success("Đăng ký nhân sự thành công");
    
    // Reset and close
    setSelectedPersonnelId("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đăng ký nhân sự</DialogTitle>
          <DialogDescription>
            Chọn nhân sự để đăng ký tham gia khóa học "{course.name}".
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="personnel" className="text-right">
              Nhân sự
            </Label>
            <div className="col-span-3">
              <Select value={selectedPersonnelId} onValueChange={setSelectedPersonnelId}>
                <SelectTrigger id="personnel">
                  <SelectValue placeholder="Chọn nhân sự..." />
                </SelectTrigger>
                <SelectContent>
                  {availablePersonnel.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      Không có nhân sự khả dụng
                    </div>
                  ) : (
                    availablePersonnel.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.fullName} ({p.employeeCode})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleEnroll} disabled={!selectedPersonnelId}>
            Đăng ký
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
