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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { canUpdateStatus, createCertificateFromCourse, formatParticipantStatus } from "@/utils/training-helpers";
import type { TrainingCourse, TrainingParticipation, Certificate } from "@/types";
import { ParticipantStatus } from "@/types";

interface UpdateProgressDialogProps {
  course: TrainingCourse;
  participation: TrainingParticipation;
  personnelName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedParticipation: TrainingParticipation, certificate?: Certificate) => void;
}

const statusLabels: Record<ParticipantStatus, string> = {
  [ParticipantStatus.REGISTERED]: "Đã đăng ký",
  [ParticipantStatus.STUDYING]: "Đang học",
  [ParticipantStatus.COMPLETED]: "Hoàn thành",
  [ParticipantStatus.DROPPED]: "Bỏ dở",
};

export function UpdateProgressDialog({
  course,
  participation,
  personnelName,
  isOpen,
  onClose,
  onSuccess,
}: UpdateProgressDialogProps) {
  const [newStatus, setNewStatus] = useState<ParticipantStatus | "">("");
  const [notes, setNotes] = useState("");

  // Get valid next statuses based on current status
  const validNextStatuses = useMemo(() => {
    switch (participation.status) {
      case ParticipantStatus.REGISTERED:
        return [ParticipantStatus.STUDYING, ParticipantStatus.DROPPED];
      case ParticipantStatus.STUDYING:
        return [ParticipantStatus.COMPLETED, ParticipantStatus.DROPPED];
      default:
        return [];
    }
  }, [participation.status]);

  const handleSubmit = () => {
    if (!newStatus) {
      toast.error("Vui lòng chọn trạng thái mới");
      return;
    }

    const validation = canUpdateStatus(participation.status, newStatus);
    if (!validation.allowed) {
      toast.error(validation.reason || "Không thể chuyển trạng thái");
      return;
    }

    const updatedParticipation: TrainingParticipation = {
      ...participation,
      status: newStatus,
      notes: notes || participation.notes,
      completionDate: newStatus === ParticipantStatus.COMPLETED 
        ? new Date().toISOString() 
        : participation.completionDate,
    };

    if (newStatus === ParticipantStatus.COMPLETED) {
      const certificate = createCertificateFromCourse(course, updatedParticipation);
      updatedParticipation.certificateId = certificate.id;
      onSuccess(updatedParticipation, certificate);
      toast.success("Cập nhật tiến trình thành công. Đã tạo chứng chỉ.");
    } else {
      onSuccess(updatedParticipation);
      toast.success("Cập nhật tiến trình thành công");
    }

    // Reset form
    setNewStatus("");
    setNotes("");
    onClose();
  };

  const handleClose = () => {
    setNewStatus("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật tiến trình</DialogTitle>
          <DialogDescription>
            Cập nhật trạng thái học tập cho {personnelName}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Label>Trạng thái hiện tại:</Label>
            <Badge variant="secondary">
              {formatParticipantStatus(participation.status)}
            </Badge>
          </div>

          {validNextStatuses.length > 0 ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="newStatus">Trạng thái mới</Label>
                <Select
                  value={newStatus}
                  onValueChange={(value) => setNewStatus(value as ParticipantStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái mới..." />
                  </SelectTrigger>
                  <SelectContent>
                    {validNextStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusLabels[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Nhập ghi chú..."
                  rows={3}
                />
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">
              Không thể thay đổi trạng thái từ "{formatParticipantStatus(participation.status)}"
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Hủy
          </Button>
          {validNextStatuses.length > 0 && (
            <Button onClick={handleSubmit}>Xác nhận</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}