import { useMemo, useState } from "react";
import allowanceData from "@/data/config/allowance-types.json";
import type { AllowanceConfig } from "@/types";
import { AllowanceCalculationType, AllowanceType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Pencil, Plus, Search } from "lucide-react";

const allowanceTypeLabels: Record<AllowanceType, string> = {
  [AllowanceType.POSITION]: "Chức vụ",
  [AllowanceType.SENIORITY]: "Thâm niên",
  [AllowanceType.INDUSTRY]: "Ưu đãi ngành",
  [AllowanceType.RESPONSIBILITY]: "Trách nhiệm",
  [AllowanceType.HAZARDOUS]: "Độc hại",
  [AllowanceType.REGIONAL]: "Khu vực",
};

const calculationTypeLabels: Record<AllowanceCalculationType, string> = {
  [AllowanceCalculationType.COEFFICIENT]: "Hệ số",
  [AllowanceCalculationType.FIXED_AMOUNT]: "Số tiền cố định",
};

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "active", label: "Đang áp dụng" },
  { value: "inactive", label: "Ngưng áp dụng" },
];

const getNextCode = (items: AllowanceConfig[]) => {
  const maxIndex = items.reduce((max, item) => {
    const match = item.code.match(/PHC-(\d+)/i);
    if (!match) return max;
    const value = Number.parseInt(match[1], 10);
    return Number.isNaN(value) ? max : Math.max(max, value);
  }, 0);

  return `PHC-${String(maxIndex + 1).padStart(3, "0")}`;
};

const getNextOrder = (items: AllowanceConfig[]) =>
  items.reduce((max, item) => Math.max(max, item.order), 0) + 1;

const buildNewAllowance = (items: AllowanceConfig[]): AllowanceConfig => ({
  id: `at-${Date.now()}`,
  code: getNextCode(items),
  name: "",
  type: AllowanceType.POSITION,
  calculationType: AllowanceCalculationType.COEFFICIENT,
  formula: "",
  isActive: true,
  order: getNextOrder(items),
});

export default function AllowanceConfigPage() {
  const [allowances, setAllowances] = useState<AllowanceConfig[]>(
    allowanceData as AllowanceConfig[]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [calculationFilter, setCalculationFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AllowanceConfig | null>(null);
  const [formState, setFormState] = useState<AllowanceConfig>(() =>
    buildNewAllowance(allowances)
  );

  const filteredAllowances = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allowances.filter((item) => {
      const matchesSearch =
        query.length === 0 ||
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        (item.formula ?? "").toLowerCase().includes(query);
      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesCalculation =
        calculationFilter === "all" ||
        item.calculationType === calculationFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? item.isActive : !item.isActive);
      return matchesSearch && matchesType && matchesCalculation && matchesStatus;
    });
  }, [allowances, searchQuery, typeFilter, calculationFilter, statusFilter]);

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormState(buildNewAllowance(allowances));
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: AllowanceConfig) => {
    setEditingItem(item);
    setFormState(item);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formState.name.trim()) return;

    setAllowances((prev) => {
      if (editingItem) {
        return prev.map((item) =>
          item.id === editingItem.id ? { ...formState, id: editingItem.id } : item
        );
      }
      return [...prev, formState];
    });

    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleToggleActive = (id: string) => {
    setAllowances((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cấu hình phụ cấp</h1>
          <p className="text-muted-foreground">
            Thiết lập loại phụ cấp và công thức tính
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm phụ cấp
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm theo mã, tên hoặc công thức..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Loại phụ cấp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại</SelectItem>
            {Object.values(AllowanceType).map((type) => (
              <SelectItem key={type} value={type}>
                {allowanceTypeLabels[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={calculationFilter} onValueChange={setCalculationFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Cách tính" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả cách tính</SelectItem>
            {Object.values(AllowanceCalculationType).map((type) => (
              <SelectItem key={type} value={type}>
                {calculationTypeLabels[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[110px]">Mã</TableHead>
              <TableHead>Tên phụ cấp</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Cách tính</TableHead>
              <TableHead>Công thức</TableHead>
              <TableHead className="text-center">Thứ tự</TableHead>
              <TableHead className="text-center">Kích hoạt</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAllowances.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-8 text-center text-muted-foreground"
                >
                  Không tìm thấy phụ cấp phù hợp
                </TableCell>
              </TableRow>
            ) : (
              filteredAllowances.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{allowanceTypeLabels[item.type]}</TableCell>
                  <TableCell>{calculationTypeLabels[item.calculationType]}</TableCell>
                  <TableCell className="max-w-[220px] truncate">
                    {item.formula || "-"}
                  </TableCell>
                  <TableCell className="text-center">{item.order}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Switch
                        size="sm"
                        checked={item.isActive}
                        onCheckedChange={() => handleToggleActive(item.id)}
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.isActive ? "Đang áp dụng" : "Ngưng"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openEditDialog(item)}
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

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Cập nhật phụ cấp" : "Thêm phụ cấp"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Mã phụ cấp</Label>
              <Input id="code" value={formState.code} disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Tên phụ cấp</Label>
              <Input
                id="name"
                value={formState.name}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Loại phụ cấp</Label>
              <Select
                value={formState.type}
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    type: value as AllowanceType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AllowanceType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {allowanceTypeLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Cách tính</Label>
              <Select
                value={formState.calculationType}
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    calculationType: value as AllowanceCalculationType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn cách tính" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AllowanceCalculationType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {calculationTypeLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="formula">Công thức</Label>
              <Input
                id="formula"
                value={formState.formula ?? ""}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    formula: event.target.value,
                  }))
                }
                placeholder="baseSalary * coefficient"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order">Thứ tự hiển thị</Label>
              <Input
                id="order"
                type="number"
                value={formState.order}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    order: Number(event.target.value || 0),
                  }))
                }
                min={1}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <div>
                <p className="text-sm font-medium">Trạng thái</p>
                <p className="text-xs text-muted-foreground">
                  Bật để áp dụng loại phụ cấp này
                </p>
              </div>
              <Switch
                checked={formState.isActive}
                onCheckedChange={(checked) =>
                  setFormState((prev) => ({ ...prev, isActive: checked }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave} disabled={!formState.name.trim()}>
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
