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
import { Textarea } from "@/components/ui/textarea";
import type { Contract, ContractAppendix } from "@/types";

interface AddAppendixDialogProps {
  contract: Contract;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (appendix: ContractAppendix) => void;
}

export function AddAppendixDialog({
  contract,
  isOpen,
  onClose,
  onSuccess,
}: AddAppendixDialogProps) {
  const [appendixNumber, setAppendixNumber] = useState("");
  const [signDate, setSignDate] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAppendixNumber("");
      const today = new Date().toISOString().split("T")[0];
      setSignDate(today);
      setContent("");
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!appendixNumber.trim()) {
      newErrors.appendixNumber = "Vui lòng nhập số phụ lục";
    }

    if (!signDate) {
      newErrors.signDate = "Vui lòng chọn ngày ký";
    } else {
      const contractSignDate = new Date(contract.signDate);
      const appendixSignDate = new Date(signDate);

      contractSignDate.setHours(0, 0, 0, 0);
      appendixSignDate.setHours(0, 0, 0, 0);

      if (appendixSignDate < contractSignDate) {
        newErrors.signDate = "Ngày ký phụ lục phải sau ngày ký hợp đồng";
      }
    }

    if (!content.trim()) {
      newErrors.content = "Vui lòng nhập nội dung phụ lục";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newAppendix: ContractAppendix = {
      id: "apx-" + Date.now(),
      appendixNumber,
      signDate,
      content,
    };

    toast.success("Thêm phụ lục hợp đồng thành công", {
      description: `Phụ lục ${appendixNumber} đã được thêm vào hợp đồng ${contract.contractNumber}`,
    });

    setIsSubmitting(false);
    onSuccess?.(newAppendix);
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
          <DialogTitle>Thêm phụ lục hợp đồng</DialogTitle>
          <DialogDescription>
            Thêm phụ lục mới cho hợp đồng {contract.contractNumber}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="appendixNumber">
              Số phụ lục <span className="text-red-500">*</span>
            </Label>
            <Input
              id="appendixNumber"
              value={appendixNumber}
              onChange={(e) => setAppendixNumber(e.target.value)}
              placeholder="PL-XXX"
              disabled={isSubmitting}
            />
            {errors.appendixNumber && (
              <p className="text-sm text-red-500">{errors.appendixNumber}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signDate">
              Ngày ký <span className="text-red-500">*</span>
            </Label>
            <Input
              id="signDate"
              type="date"
              value={signDate}
              onChange={(e) => setSignDate(e.target.value)}
              disabled={isSubmitting}
            />
            {errors.signDate && (
              <p className="text-sm text-red-500">{errors.signDate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">
              Nội dung <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nội dung chi tiết của phụ lục..."
              className="min-h-[100px]"
              disabled={isSubmitting}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content}</p>
            )}
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
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Thêm phụ lục"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
