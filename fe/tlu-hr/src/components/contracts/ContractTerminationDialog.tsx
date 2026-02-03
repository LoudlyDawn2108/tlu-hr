"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Contract } from "@/types";
import { ContractStatus } from "@/types";

interface ContractTerminationDialogProps {
  contract: Contract;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ContractTerminationDialog({
  contract,
  isOpen,
  onClose,
  onSuccess,
}: ContractTerminationDialogProps) {
  const [terminationDate, setTerminationDate] = useState("");
  const [reason, setReason] = useState("");
  const [settlementAmount, setSettlementAmount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && contract) {
      const today = new Date().toISOString().split("T")[0];
      setTerminationDate(today);
      setReason("");
      setSettlementAmount("");
      setErrors({});
    }
  }, [isOpen, contract]);

  const canTerminate =
    contract.status === ContractStatus.ACTIVE ||
    contract.status === ContractStatus.EXTENDED;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!terminationDate) {
      newErrors.terminationDate = "Vui lòng chọn ngày chấm dứt";
    } else {
      const selectedDate = new Date(terminationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        newErrors.terminationDate =
          "Ngày chấm dứt không được sau ngày hiện tại";
      }

      const effectiveDate = new Date(contract.effectiveDate);
      if (selectedDate < effectiveDate) {
        newErrors.terminationDate =
          "Ngày chấm dứt phải sau ngày hiệu lực của hợp đồng";
      }
    }

    if (!reason.trim()) {
      newErrors.reason = "Vui lòng nhập lý do chấm dứt";
    }

    if (settlementAmount) {
      const amount = parseFloat(settlementAmount);
      if (isNaN(amount) || amount < 0) {
        newErrors.settlementAmount = "Số tiền thanh lý không hợp lệ";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!canTerminate) {
      toast.error("Không thể chấm dứt hợp đồng này", {
        description: "Chỉ hợp đồng đang hoạt động mới có thể chấm dứt.",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Chấm dứt hợp đồng thành công", {
      description: `Hợp đồng ${contract.contractNumber} đã được chấm dứt từ ngày ${terminationDate}`,
    });

    setIsSubmitting(false);
    onSuccess?.();
    onClose();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Chấm dứt hợp đồng</DialogTitle>
          <DialogDescription>
            Chấm dứt hợp đồng {contract.contractNumber}.
          </DialogDescription>
        </DialogHeader>

        {!canTerminate && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
            <p className="font-medium">Không thể chấm dứt</p>
            <p className="mt-1">
              Chỉ hợp đồng đang hoạt động hoặc đã gia hạn mới có thể chấm dứt.
              Hợp đồng này hiện đang ở trạng thái: {contract.status}.
            </p>
          </div>
        )}

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="terminationDate">
              Ngày chấm dứt <span className="text-red-500">*</span>
            </Label>
            <Input
              id="terminationDate"
              type="date"
              value={terminationDate}
              onChange={(e) => setTerminationDate(e.target.value)}
              disabled={!canTerminate || isSubmitting}
            />
            {errors.terminationDate && (
              <p className="text-sm text-red-500">{errors.terminationDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">
              Lý do chấm dứt <span className="text-red-500">*</span>
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do chấm dứt hợp đồng"
              disabled={!canTerminate || isSubmitting}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="settlementAmount">Số tiền thanh lý (VNĐ)</Label>
            <Input
              id="settlementAmount"
              type="number"
              value={settlementAmount}
              onChange={(e) => setSettlementAmount(e.target.value)}
              placeholder="0"
              disabled={!canTerminate || isSubmitting}
            />
            {errors.settlementAmount && (
              <p className="text-sm text-red-500">{errors.settlementAmount}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Nhập số tiền thanh lý hợp đồng nếu có (theo quy định của pháp luật
              lao động).
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={!canTerminate || isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Chấm dứt"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
