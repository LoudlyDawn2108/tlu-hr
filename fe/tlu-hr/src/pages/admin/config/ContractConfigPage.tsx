import { useMemo, useState } from "react";
import { Pencil } from "lucide-react";
import contractTypesData from "@/data/config/contract-types.json";
import type { ContractTypeConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type ContractFormState = {
  minDuration: string;
  maxDuration: string;
  maxExtensions: string;
  maxConversionTime: string;
  warningDays: string;
};

const emptyFormState: ContractFormState = {
  minDuration: "",
  maxDuration: "",
  maxExtensions: "",
  maxConversionTime: "",
  warningDays: "",
};

const formatValue = (value?: number) => (value === undefined ? "-" : value.toString());

const normalizeOptional = (value?: number | null) =>
  value === null || value === undefined ? undefined : value;

export default function ContractConfigPage() {
  const { toast } = useToast();
  const [contracts, setContracts] = useState<ContractTypeConfig[]>(() =>
    (contractTypesData as ContractTypeConfig[]).map((contract) => ({
      ...contract,
      minDuration: normalizeOptional(contract.minDuration),
      maxDuration: normalizeOptional(contract.maxDuration),
      maxExtensions: normalizeOptional(contract.maxExtensions),
      maxConversionTime: normalizeOptional(contract.maxConversionTime),
    }))
  );
  const [editingContract, setEditingContract] = useState<ContractTypeConfig | null>(null);
  const [formState, setFormState] = useState<ContractFormState>(emptyFormState);
  const [formError, setFormError] = useState<string | null>(null);

  const sortedContracts = useMemo(() => contracts, [contracts]);

  const openEditDialog = (contract: ContractTypeConfig) => {
    setEditingContract(contract);
    setFormState({
      minDuration: contract.minDuration?.toString() ?? "",
      maxDuration: contract.maxDuration?.toString() ?? "",
      maxExtensions: contract.maxExtensions?.toString() ?? "",
      maxConversionTime: contract.maxConversionTime?.toString() ?? "",
      warningDays: contract.warningDays.toString(),
    });
    setFormError(null);
  };

  const closeDialog = () => {
    setEditingContract(null);
    setFormState(emptyFormState);
    setFormError(null);
  };

  const updateFormValue = (field: keyof ContractFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const parseOptionalNumber = (value: string) => {
    if (value.trim() === "") return undefined;
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return "invalid";
    return numeric;
  };

  const handleSave = () => {
    if (!editingContract) return;

    const minDuration = parseOptionalNumber(formState.minDuration);
    const maxDuration = parseOptionalNumber(formState.maxDuration);
    const maxExtensions = parseOptionalNumber(formState.maxExtensions);
    const maxConversionTime = parseOptionalNumber(formState.maxConversionTime);
    const warningDays = parseOptionalNumber(formState.warningDays);

    const errors: string[] = [];

    if (warningDays === undefined) {
      errors.push("Vui lòng nhập số ngày cảnh báo");
    }

    const numericValues = [
      minDuration,
      maxDuration,
      maxExtensions,
      maxConversionTime,
      warningDays,
    ];

    if (numericValues.some((value) => value === "invalid")) {
      errors.push("Vui lòng nhập số hợp lệ");
    }

    numericValues
      .filter((value): value is number => typeof value === "number")
      .forEach((value) => {
        if (value < 0) {
          errors.push("Giá trị phải là số không âm");
        }
      });

    if (
      typeof minDuration === "number" &&
      typeof maxDuration === "number" &&
      minDuration >= maxDuration
    ) {
      errors.push("Thời hạn tối thiểu phải nhỏ hơn thời hạn tối đa");
    }

    if (errors.length > 0) {
      const message = errors[0];
      setFormError(message);
      toast({
        title: "Dữ liệu không hợp lệ",
        description: message,
      });
      return;
    }

    setContracts((prev) =>
      prev.map((contract) =>
        contract.id === editingContract.id
          ? {
              ...contract,
              minDuration:
                minDuration === "invalid" ? contract.minDuration : minDuration,
              maxDuration: maxDuration === "invalid" ? contract.maxDuration : maxDuration,
              maxExtensions:
                maxExtensions === "invalid" ? contract.maxExtensions : maxExtensions,
              maxConversionTime:
                maxConversionTime === "invalid"
                  ? contract.maxConversionTime
                  : maxConversionTime,
              warningDays:
                typeof warningDays === "number" ? warningDays : contract.warningDays,
            }
          : contract
      )
    );

    toast({
      title: "Cập nhật cấu hình",
      description: `Đã lưu cấu hình cho ${editingContract.name}.`,
    });

    closeDialog();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cấu hình hợp đồng</h1>
        <p className="text-muted-foreground">
          Thiết lập quy định thời hạn, gia hạn và cảnh báo cho từng loại hợp đồng
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loại hợp đồng</TableHead>
              <TableHead className="text-right">Tối thiểu (tháng)</TableHead>
              <TableHead className="text-right">Tối đa (tháng)</TableHead>
              <TableHead className="text-right">Số lần gia hạn</TableHead>
              <TableHead className="text-right">Thời gian chuyển đổi</TableHead>
              <TableHead className="text-right">Cảnh báo (ngày)</TableHead>
              <TableHead className="w-[90px] text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.name}</TableCell>
                <TableCell className="text-right">
                  {formatValue(contract.minDuration)}
                </TableCell>
                <TableCell className="text-right">
                  {formatValue(contract.maxDuration)}
                </TableCell>
                <TableCell className="text-right">
                  {formatValue(contract.maxExtensions)}
                </TableCell>
                <TableCell className="text-right">
                  {formatValue(contract.maxConversionTime)}
                </TableCell>
                <TableCell className="text-right">{contract.warningDays}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openEditDialog(contract)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Chỉnh sửa</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={Boolean(editingContract)} onOpenChange={(open) => (!open ? closeDialog() : null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa cấu hình hợp đồng</DialogTitle>
            <DialogDescription>
              Cập nhật thông số cho {editingContract?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="minDuration">Thời hạn tối thiểu (tháng)</Label>
              <Input
                id="minDuration"
                type="number"
                min={0}
                value={formState.minDuration}
                onChange={(event) => updateFormValue("minDuration", event.target.value)}
                placeholder="Không giới hạn"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxDuration">Thời hạn tối đa (tháng)</Label>
              <Input
                id="maxDuration"
                type="number"
                min={0}
                value={formState.maxDuration}
                onChange={(event) => updateFormValue("maxDuration", event.target.value)}
                placeholder="Không giới hạn"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxExtensions">Số lần gia hạn</Label>
              <Input
                id="maxExtensions"
                type="number"
                min={0}
                value={formState.maxExtensions}
                onChange={(event) => updateFormValue("maxExtensions", event.target.value)}
                placeholder="Không giới hạn"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxConversionTime">Thời gian chuyển đổi (tháng)</Label>
              <Input
                id="maxConversionTime"
                type="number"
                min={0}
                value={formState.maxConversionTime}
                onChange={(event) =>
                  updateFormValue("maxConversionTime", event.target.value)
                }
                placeholder="Không giới hạn"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="warningDays">Số ngày cảnh báo</Label>
              <Input
                id="warningDays"
                type="number"
                min={0}
                value={formState.warningDays}
                onChange={(event) => updateFormValue("warningDays", event.target.value)}
                placeholder="0"
              />
            </div>
            {formError && <p className="text-sm text-destructive">{formError}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>
              Hủy
            </Button>
            <Button onClick={handleSave}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
