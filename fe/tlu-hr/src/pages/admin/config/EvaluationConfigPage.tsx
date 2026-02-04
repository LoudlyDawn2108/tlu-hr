import { useMemo, useState } from "react";
import evaluationTypesData from "@/data/config/evaluation-types.json";
import type { EvaluationTypeConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Plus } from "lucide-react";

type EvaluationCategory = "reward" | "discipline";

type EvaluationTypeState = {
  rewards: EvaluationTypeConfig[];
  disciplines: EvaluationTypeConfig[];
};

type EvaluationFormState = EvaluationTypeConfig;

const categoryLabels: Record<EvaluationCategory, string> = {
  reward: "Khen thưởng",
  discipline: "Kỷ luật",
};

const categoryColumnLabels: Record<EvaluationCategory, string> = {
  reward: "Reward",
  discipline: "Discipline",
};

const createDefaultFormState = (
  category: EvaluationCategory,
  nextOrder: number
): EvaluationFormState => ({
  id: `${category}-${Date.now()}`,
  code: "",
  name: "",
  category,
  description: "",
  isActive: true,
  order: nextOrder,
});

export default function EvaluationConfigPage() {
  const [evaluationTypes, setEvaluationTypes] = useState<EvaluationTypeState>({
    rewards: evaluationTypesData.rewards as EvaluationTypeConfig[],
    disciplines: evaluationTypesData.disciplines as EvaluationTypeConfig[],
  });
  const [activeTab, setActiveTab] = useState<EvaluationCategory>("reward");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<EvaluationCategory>("reward");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formState, setFormState] = useState<EvaluationFormState>(
    createDefaultFormState("reward", 1)
  );

  const rewards = useMemo(() => {
    return [...evaluationTypes.rewards].sort((a, b) => a.order - b.order);
  }, [evaluationTypes.rewards]);

  const disciplines = useMemo(() => {
    return [...evaluationTypes.disciplines].sort((a, b) => a.order - b.order);
  }, [evaluationTypes.disciplines]);

  const getNextOrder = (category: EvaluationCategory) => {
    const list = category === "reward" ? evaluationTypes.rewards : evaluationTypes.disciplines;
    const maxOrder = list.reduce((max, item) => Math.max(max, item.order), 0);
    return maxOrder + 1;
  };

  const openAddDialog = (category: EvaluationCategory) => {
    setEditingCategory(category);
    setEditingItemId(null);
    setFormState(createDefaultFormState(category, getNextOrder(category)));
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: EvaluationCategory, item: EvaluationTypeConfig) => {
    setEditingCategory(category);
    setEditingItemId(item.id);
    setFormState({ ...item });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    setEvaluationTypes((prev) => {
      const key = editingCategory === "reward" ? "rewards" : "disciplines";
      const list = prev[key];
      if (editingItemId) {
        return {
          ...prev,
          [key]: list.map((item) => (item.id === editingItemId ? formState : item)),
        };
      }
      return {
        ...prev,
        [key]: [...list, formState],
      };
    });
    setIsDialogOpen(false);
  };

  const handleToggleActive = (category: EvaluationCategory, itemId: string, nextValue: boolean) => {
    setEvaluationTypes((prev) => {
      const key = category === "reward" ? "rewards" : "disciplines";
      return {
        ...prev,
        [key]: prev[key].map((item) =>
          item.id === itemId ? { ...item, isActive: nextValue } : item
        ),
      };
    });
  };

  const renderTable = (category: EvaluationCategory, items: EvaluationTypeConfig[]) => {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">
              {category === "reward" ? "Loại khen thưởng" : "Loại kỷ luật"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {category === "reward"
                ? "Cấu hình các danh hiệu và hình thức khen thưởng"
                : "Cấu hình các hình thức kỷ luật"}
            </p>
          </div>
          <Button onClick={() => openAddDialog(category)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm mới
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Nhóm</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thứ tự</TableHead>
                <TableHead className="w-[90px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Không có dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{categoryColumnLabels[item.category]}</TableCell>
                    <TableCell className="max-w-[320px] whitespace-normal">
                      {item.description || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.isActive}
                          onCheckedChange={(value) =>
                            handleToggleActive(category, item.id, value)
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {item.isActive ? "Đang bật" : "Đã tắt"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{item.order}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEditDialog(category, item)}
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
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cấu hình đánh giá</h1>
        <p className="text-muted-foreground">
          Quản lý danh hiệu khen thưởng và hình thức kỷ luật
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as EvaluationCategory)}>
        <TabsList>
          <TabsTrigger value="reward">Khen thưởng</TabsTrigger>
          <TabsTrigger value="discipline">Kỷ luật</TabsTrigger>
        </TabsList>
        <TabsContent value="reward" className="pt-4">
          {renderTable("reward", rewards)}
        </TabsContent>
        <TabsContent value="discipline" className="pt-4">
          {renderTable("discipline", disciplines)}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItemId ? "Chỉnh sửa cấu hình" : "Thêm cấu hình mới"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Mã</Label>
                <Input
                  id="code"
                  value={formState.code}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, code: event.target.value }))
                  }
                  placeholder="VD: DH"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Tên</Label>
                <Input
                  id="name"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Tên danh mục"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Nhóm</Label>
                <Input
                  id="category"
                  value={categoryLabels[editingCategory]}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Thứ tự</Label>
                <Input
                  id="order"
                  type="number"
                  value={formState.order}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      order: Number(event.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formState.description || ""}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, description: event.target.value }))
                }
                placeholder="Mô tả chi tiết"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formState.isActive}
                onCheckedChange={(value) =>
                  setFormState((prev) => ({ ...prev, isActive: value }))
                }
              />
              <span className="text-sm text-muted-foreground">
                {formState.isActive ? "Đang bật" : "Đã tắt"}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave}>{editingItemId ? "Lưu" : "Tạo mới"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
