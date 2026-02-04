import { useMemo, useState } from "react";
import baseSalariesData from "@/data/config/base-salaries.json";
import salaryScalesData from "@/data/config/salary-scales.json";
import type {
  BaseSalaryConfig,
  ConfigChangeHistory,
  GradeConfig,
  SalaryScaleConfig,
} from "@/types";
import { SalaryScaleType } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus } from "lucide-react";

type BaseSalaryFormState = {
  amount: string;
  effectiveDate: string;
  isActive: boolean;
};

type GradeFormState = {
  grade: string;
  coefficient: string;
  reason: string;
};

const scaleOrder: SalaryScaleType[] = [
  SalaryScaleType.LECTURER,
  SalaryScaleType.SENIOR_LECTURER,
  SalaryScaleType.PRINCIPAL_LECTURER,
  SalaryScaleType.SPECIALIST,
];

const getStatusBadgeVariant = (isActive: boolean): "default" | "secondary" =>
  isActive ? "default" : "secondary";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

const formatDate = (dateString?: string) =>
  dateString ? new Date(dateString).toLocaleDateString("vi-VN") : "-";

const createBaseSalaryFormState = (baseSalary?: BaseSalaryConfig): BaseSalaryFormState => ({
  amount: baseSalary ? baseSalary.amount.toString() : "",
  effectiveDate: baseSalary?.effectiveDate ?? "",
  isActive: baseSalary?.isActive ?? true,
});

const createGradeFormState = (grade?: GradeConfig, nextGrade?: number): GradeFormState => ({
  grade: grade ? grade.grade.toString() : nextGrade?.toString() ?? "",
  coefficient: grade ? grade.coefficient.toString() : "",
  reason: "",
});

const buildHistoryEntry = (
  scaleId: string,
  action: "create" | "update",
  reason: string,
  oldValue?: GradeConfig,
  newValue?: GradeConfig
): ConfigChangeHistory => ({
  id: `ch-${Date.now()}`,
  configType: "salary_scale",
  entityType: "salary_scale",
  entityId: scaleId,
  action,
  fieldName: "grades",
  oldValue,
  newValue,
  reason,
  performedBy: "System Admin",
  performedAt: new Date().toISOString(),
});

export default function SalaryConfigPage() {
  const [baseSalaries, setBaseSalaries] = useState<BaseSalaryConfig[]>(
    baseSalariesData as BaseSalaryConfig[]
  );
  const [salaryScales, setSalaryScales] = useState<SalaryScaleConfig[]>(
    salaryScalesData as SalaryScaleConfig[]
  );
  const [isBaseDialogOpen, setIsBaseDialogOpen] = useState(false);
  const [editingBaseSalary, setEditingBaseSalary] = useState<BaseSalaryConfig | null>(null);
  const [baseFormState, setBaseFormState] = useState<BaseSalaryFormState>(() =>
    createBaseSalaryFormState()
  );
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [activeScaleId, setActiveScaleId] = useState<string | null>(null);
  const [editingGrade, setEditingGrade] = useState<GradeConfig | null>(null);
  const [gradeFormState, setGradeFormState] = useState<GradeFormState>(() =>
    createGradeFormState()
  );

  const orderedScales = useMemo(() => {
    const orderIndex = new Map(scaleOrder.map((type, index) => [type, index]));
    return [...salaryScales].sort((a, b) => {
      const aIndex = orderIndex.get(a.type) ?? 0;
      const bIndex = orderIndex.get(b.type) ?? 0;
      return aIndex - bIndex;
    });
  }, [salaryScales]);

  const openCreateBaseDialog = () => {
    setEditingBaseSalary(null);
    setBaseFormState(createBaseSalaryFormState());
    setIsBaseDialogOpen(true);
  };

  const openEditBaseDialog = (baseSalary: BaseSalaryConfig) => {
    setEditingBaseSalary(baseSalary);
    setBaseFormState(createBaseSalaryFormState(baseSalary));
    setIsBaseDialogOpen(true);
  };

  const handleSaveBaseSalary = () => {
    const amount = Number(baseFormState.amount);
    if (!Number.isFinite(amount) || amount <= 0 || !baseFormState.effectiveDate) return;

    setBaseSalaries((prev) => {
      if (editingBaseSalary) {
        return prev.map((item) =>
          item.id === editingBaseSalary.id
            ? {
                ...item,
                amount,
                effectiveDate: baseFormState.effectiveDate,
                isActive: baseFormState.isActive,
              }
            : item
        );
      }

      const newItem: BaseSalaryConfig = {
        id: `bs-${Date.now()}`,
        amount,
        effectiveDate: baseFormState.effectiveDate,
        isActive: baseFormState.isActive,
        createdAt: new Date().toISOString(),
      };
      return [...prev, newItem];
    });

    setIsBaseDialogOpen(false);
  };

  const openAddGradeDialog = (scale: SalaryScaleConfig) => {
    const nextGrade =
      scale.grades.length === 0
        ? 1
        : Math.max(...scale.grades.map((grade) => grade.grade)) + 1;
    setActiveScaleId(scale.id);
    setEditingGrade(null);
    setGradeFormState(createGradeFormState(undefined, nextGrade));
    setIsGradeDialogOpen(true);
  };

  const openEditGradeDialog = (scale: SalaryScaleConfig, grade: GradeConfig) => {
    setActiveScaleId(scale.id);
    setEditingGrade(grade);
    setGradeFormState(createGradeFormState(grade));
    setIsGradeDialogOpen(true);
  };

  const handleSaveGrade = () => {
    if (!activeScaleId) return;

    const gradeNumber = Number(gradeFormState.grade);
    const coefficient = Number(gradeFormState.coefficient);
    const reason = gradeFormState.reason.trim();

    if (!Number.isFinite(gradeNumber) || gradeNumber <= 0) return;
    if (!Number.isFinite(coefficient) || coefficient <= 0) return;
    if (!reason) return;

    setSalaryScales((prev) =>
      prev.map((scale) => {
        if (scale.id !== activeScaleId) return scale;
        const updatedGrade: GradeConfig = {
          grade: gradeNumber,
          coefficient,
        };
        const nextGrades = editingGrade
          ? scale.grades.map((item) =>
              item.grade === editingGrade.grade ? updatedGrade : item
            )
          : [...scale.grades, updatedGrade];

        const historyEntry = buildHistoryEntry(
          scale.id,
          editingGrade ? "update" : "create",
          reason,
          editingGrade ?? undefined,
          updatedGrade
        );

        return {
          ...scale,
          grades: nextGrades.sort((a, b) => a.grade - b.grade),
          history: [...(scale.history ?? []), historyEntry],
        };
      })
    );

    setIsGradeDialogOpen(false);
    setActiveScaleId(null);
    setEditingGrade(null);
    setGradeFormState(createGradeFormState());
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cấu hình lương</h1>
        <p className="text-muted-foreground">
          Thiết lập mức lương cơ sở và thang bảng lương cho hệ thống
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Lương cơ sở</h2>
            <p className="text-sm text-muted-foreground">
              Quản lý mức lương cơ sở theo thời gian hiệu lực
            </p>
          </div>
          <Button onClick={openCreateBaseDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm mức lương
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Số tiền</TableHead>
                <TableHead>Ngày hiệu lực</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="w-[90px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {baseSalaries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    Chưa có mức lương cơ sở
                  </TableCell>
                </TableRow>
              ) : (
                baseSalaries.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {formatCurrency(item.amount)}
                    </TableCell>
                    <TableCell>{formatDate(item.effectiveDate)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(item.isActive)}>
                        {item.isActive ? "Đang áp dụng" : "Ngưng áp dụng"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditBaseDialog(item)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Chỉnh sửa</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Thang bảng lương</h2>
          <p className="text-sm text-muted-foreground">
            Quản lý hệ số theo ngạch và bậc lương
          </p>
        </div>

        <Accordion type="multiple" className="space-y-2">
          {orderedScales.map((scale) => (
            <AccordionItem key={scale.id} value={scale.id}>
              <AccordionTrigger>
                <div className="flex flex-1 items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold">{scale.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {scale.type.replace("_", " ")}
                    </p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(scale.isActive)}>
                    {scale.isActive ? "Đang áp dụng" : "Ngưng áp dụng"}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Tổng số bậc: {scale.grades.length}
                    </p>
                    <Button size="sm" onClick={() => openAddGradeDialog(scale)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm bậc lương
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[120px]">Bậc</TableHead>
                          <TableHead>Hệ số</TableHead>
                          <TableHead className="w-[90px]">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {scale.grades.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={3}
                              className="py-8 text-center text-muted-foreground"
                            >
                              Chưa có bậc lương
                            </TableCell>
                          </TableRow>
                        ) : (
                          scale.grades
                            .slice()
                            .sort((a, b) => a.grade - b.grade)
                            .map((grade) => (
                              <TableRow key={`${scale.id}-${grade.grade}`}>
                                <TableCell className="font-medium">Bậc {grade.grade}</TableCell>
                                <TableCell>{grade.coefficient}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => openEditGradeDialog(scale, grade)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Chỉnh sửa</span>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Dialog
        open={isBaseDialogOpen}
        onOpenChange={(open) => {
          setIsBaseDialogOpen(open);
          if (!open) {
            setEditingBaseSalary(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingBaseSalary ? "Chỉnh sửa mức lương" : "Thêm mức lương cơ sở"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="base-salary-amount">Số tiền (VND)</Label>
              <Input
                id="base-salary-amount"
                type="number"
                min={0}
                value={baseFormState.amount}
                onChange={(event) =>
                  setBaseFormState((prev) => ({ ...prev, amount: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="base-salary-date">Ngày hiệu lực</Label>
              <Input
                id="base-salary-date"
                type="date"
                value={baseFormState.effectiveDate}
                onChange={(event) =>
                  setBaseFormState((prev) => ({ ...prev, effectiveDate: event.target.value }))
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <div>
                <p className="text-sm font-medium">Trạng thái áp dụng</p>
                <p className="text-xs text-muted-foreground">Kích hoạt mức lương cơ sở</p>
              </div>
              <Switch
                checked={baseFormState.isActive}
                onCheckedChange={(checked) =>
                  setBaseFormState((prev) => ({ ...prev, isActive: checked }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBaseDialogOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleSaveBaseSalary}
              disabled={!baseFormState.amount || !baseFormState.effectiveDate}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isGradeDialogOpen}
        onOpenChange={(open) => {
          setIsGradeDialogOpen(open);
          if (!open) {
            setActiveScaleId(null);
            setEditingGrade(null);
            setGradeFormState(createGradeFormState());
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGrade ? "Chỉnh sửa bậc lương" : "Thêm bậc lương"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="grade-level">Bậc</Label>
              <Input
                id="grade-level"
                type="number"
                min={1}
                value={gradeFormState.grade}
                onChange={(event) =>
                  setGradeFormState((prev) => ({ ...prev, grade: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="grade-coefficient">Hệ số</Label>
              <Input
                id="grade-coefficient"
                type="number"
                step="0.01"
                min={0}
                value={gradeFormState.coefficient}
                onChange={(event) =>
                  setGradeFormState((prev) => ({ ...prev, coefficient: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="grade-reason">Lý do điều chỉnh</Label>
              <Textarea
                id="grade-reason"
                value={gradeFormState.reason}
                onChange={(event) =>
                  setGradeFormState((prev) => ({ ...prev, reason: event.target.value }))
                }
                placeholder="Nhập lý do cập nhật hệ số"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
              Hủy
            </Button>
            <Button
              onClick={handleSaveGrade}
              disabled={
                !gradeFormState.grade ||
                !gradeFormState.coefficient ||
                !gradeFormState.reason.trim()
              }
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
