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
import {
  canExtend,
  getNextContractNumber,
  validateContractDates,
} from "@/utils/contract-helpers";

interface ContractExtensionDialogProps {
  contract: Contract;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ContractExtensionDialog({
  contract,
  isOpen,
  onClose,
  onSuccess,
}: ContractExtensionDialogProps) {
  const [newContractNumber, setNewContractNumber] = useState("");
  const [newSignDate, setNewSignDate] = useState("");
  const [newEffectiveDate, setNewEffectiveDate] = useState("");
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [appendixNumber, setAppendixNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && contract) {
      try {
        const nextNumber = getNextContractNumber(contract.contractNumber);
        setNewContractNumber(nextNumber);
      } catch {
        setNewContractNumber("");
      }

      const today = new Date().toISOString().split("T")[0];
      setNewSignDate(today);
      setNewEffectiveDate(contract.expiryDate || today);
      setNewExpiryDate("");
      setAppendixNumber("");
      setErrors({});
    }
  }, [isOpen, contract]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!newContractNumber.trim()) {
      newErrors.newContractNumber = "Vui lòng nhập số hợp đồng mới";
    }

    if (!newSignDate) {
      newErrors.newSignDate = "Vui lòng chọn ngày ký";
    }

    if (!newEffectiveDate) {
      newErrors.newEffectiveDate = "Vui lòng chọn ngày hiệu lực";
    }

    if (!newExpiryDate) {
      newErrors.newExpiryDate = "Vui lòng chọn ngày hết hạn";
    }

    if (!appendixNumber.trim()) {
      newErrors.appendixNumber = "Vui lòng nhập số phụ lục";
    }

    const dateError = validateContractDates(newEffectiveDate, newExpiryDate);
    if (dateError) {
      newErrors.dateRange = dateError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!canExtend(contract)) {
      toast.error("Không thể gia hạn hợp đồng này", {
        description:
          "Hợp đồng phải đang hoạt động, có thời hạn xác định và chưa đạt số lần gia hạn tối đa.",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Gia hạn hợp đồng thành công", {
      description: `Hợp đồng ${contract.contractNumber} đã được gia hạn thành ${newContractNumber}`,
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

  const isExtendable = canExtend(contract);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Gia hạn hợp đồng</DialogTitle>
          <DialogDescription>
            Gia hạn hợp đồng {contract.contractNumber} cho nhân sự.
          </DialogDescription>
        </DialogHeader>

        {!isExtendable && (
          <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 border border-yellow-200">
            <p className="font-medium">Không thể gia hạn</p>
            <p className="mt-1">
              Hợp đồng này không đủ điều kiện gia hạn. Chỉ hợp đồng có thời hạn
              xác định, đang hoạt động và chưa đạt số lần gia hạn tối đa mới có
              thể gia hạn.
            </p>
          </div>
        )}

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="newContractNumber">
              Số hợp đồng mới <span className="text-red-500">*</span>
            </Label>
            <Input
              id="newContractNumber"
              value={newContractNumber}
              onChange={(e) => setNewContractNumber(e.target.value)}
              placeholder="HĐXXX/YYYY"
              disabled={!isExtendable || isSubmitting}
            />
            {errors.newContractNumber && (
              <p className="text-sm text-red-500">{errors.newContractNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newSignDate">
                Ngày ký mới <span className="text-red-500">*</span>
              </Label>
              <Input
                id="newSignDate"
                type="date"
                value={newSignDate}
                onChange={(e) => setNewSignDate(e.target.value)}
                disabled={!isExtendable || isSubmitting}
              />
              {errors.newSignDate && (
                <p className="text-sm text-red-500">{errors.newSignDate}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newEffectiveDate">
                Ngày hiệu lực mới <span className="text-red-500">*</span>
              </Label>
              <Input
                id="newEffectiveDate"
                type="date"
                value={newEffectiveDate}
                onChange={(e) => setNewEffectiveDate(e.target.value)}
                disabled={!isExtendable || isSubmitting}
              />
              {errors.newEffectiveDate && (
                <p className="text-sm text-red-500">
                  {errors.newEffectiveDate}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newExpiryDate">
              Ngày hết hạn mới <span className="text-red-500">*</span>
            </Label>
            <Input
              id="newExpiryDate"
              type="date"
              value={newExpiryDate}
              onChange={(e) => setNewExpiryDate(e.target.value)}
              disabled={!isExtendable || isSubmitting}
            />
            {errors.newExpiryDate && (
              <p className="text-sm text-red-500">{errors.newExpiryDate}</p>
            )}
            {errors.dateRange && (
              <p className="text-sm text-red-500">{errors.dateRange}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="appendixNumber">
              Số phụ lục <span className="text-red-500">*</span>
            </Label>
            <Input
              id="appendixNumber"
              value={appendixNumber}
              onChange={(e) => setAppendixNumber(e.target.value)}
              placeholder="PL-XXX"
              disabled={!isExtendable || isSubmitting}
            />
            {errors.appendixNumber && (
              <p className="text-sm text-red-500">{errors.appendixNumber}</p>
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
          <Button
            onClick={handleSubmit}
            disabled={!isExtendable || isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Gia hạn"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
