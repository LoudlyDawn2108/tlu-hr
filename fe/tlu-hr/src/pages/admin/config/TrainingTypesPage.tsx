import { useMemo, useState } from "react";
import trainingTypesData from "@/data/config/training-types.json";
import type { TrainingTypeConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus } from "lucide-react";

type FormState = {
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  order: number;
};

const createInitialFormState = (order: number): FormState => ({
  code: "",
  name: "",
  description: "",
  isActive: true,
  order,
});

export default function TrainingTypesPage() {
  const [trainingTypes, setTrainingTypes] = useState<TrainingTypeConfig[]>(
    trainingTypesData as TrainingTypeConfig[]
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingType, setEditingType] = useState<TrainingTypeConfig | null>(null);
  const [formData, setFormData] = useState<FormState>(() => createInitialFormState(1));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nextOrder = useMemo(() => {
    if (trainingTypes.length === 0) return 1;
    return Math.max(...trainingTypes.map((item) => item.order)) + 1;
  }, [trainingTypes]);

  const openAddDialog = () => {
    setEditingType(null);
    setFormData(createInitialFormState(nextOrder));
    setErrors({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (type: TrainingTypeConfig) => {
    setEditingType(type);
    setFormData({
      code: type.code,
      name: type.name,
      description: type.description ?? "",
      isActive: type.isActive,
      order: type.order,
    });
    setErrors({});
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingType(null);
    setErrors({});
  };

  const handleChange = (field: keyof FormState, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.code.trim()) nextErrors.code = "Mã loại đào tạo là bắt buộc";
    if (!formData.name.trim()) nextErrors.name = "Tên loại đào tạo là bắt buộc";
    if (!formData.order || Number.isNaN(formData.order)) {
      nextErrors.order = "Thứ tự hiển thị không hợp lệ";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (editingType) {
      setTrainingTypes((prev) =>
        prev.map((item) =>
          item.id === editingType.id
            ? {
                ...item,
                code: formData.code.trim(),
                name: formData.name.trim(),
                description: formData.description.trim() || undefined,
                isActive: formData.isActive,
                order: Number(formData.order),
              }
            : item
        )
      );
    } else {
      const newType: TrainingTypeConfig = {
        id: `tt-${Date.now()}`,
        code: formData.code.trim(),
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        isActive: formData.isActive,
        order: Number(formData.order),
      };
      setTrainingTypes((prev) => [...prev, newType]);
    }

    handleClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cấu hình loại đào tạo</h1>
          <p className="text-muted-foreground">Quản lý danh mục loại hình đào tạo</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm loại đào tạo
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Hoạt động</TableHead>
              <TableHead>Thứ tự</TableHead>
              <TableHead className="w-[80px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainingTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  Chưa có loại đào tạo nào
                </TableCell>
              </TableRow>
            ) : (
              trainingTypes
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((type) => (
                  <TableRow key={type.id}>
                    <TableCell className="font-medium">{type.code}</TableCell>
                    <TableCell>{type.name}</TableCell>
                    <TableCell>{type.description || "-"}</TableCell>
                    <TableCell>
                      <Switch
                        checked={type.isActive}
                        onCheckedChange={(checked) =>
                          setTrainingTypes((prev) =>
                            prev.map((item) =>
                              item.id === type.id ? { ...item, isActive: checked } : item
                            )
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>{type.order}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditDialog(type)}
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

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>{editingType ? "Chỉnh sửa loại đào tạo" : "Thêm loại đào tạo"}</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin loại đào tạo để sử dụng trong cấu hình khóa học.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="code">Mã loại đào tạo</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(event) => handleChange("code", event.target.value)}
              />
              {errors.code ? <p className="text-sm text-destructive">{errors.code}</p> : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Tên loại đào tạo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
              {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(event) => handleChange("description", event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="order">Thứ tự hiển thị</Label>
              <Input
                id="order"
                type="number"
                min={1}
                value={formData.order}
                onChange={(event) => handleChange("order", Number(event.target.value))}
              />
              {errors.order ? <p className="text-sm text-destructive">{errors.order}</p> : null}
            </div>

            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <div>
                <Label htmlFor="isActive">Trạng thái hoạt động</Label>
                <p className="text-sm text-muted-foreground">Bật để cho phép sử dụng</p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleChange("isActive", checked)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>{editingType ? "Lưu thay đổi" : "Thêm mới"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
