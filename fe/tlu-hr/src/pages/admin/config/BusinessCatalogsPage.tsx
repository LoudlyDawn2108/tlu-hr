import { useMemo, useState } from "react";
import type { CommonCatalog } from "@/types";
import businessCatalogsData from "@/data/config/business-catalogs.json";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BusinessCatalogType =
  | "education_level"
  | "academic_title"
  | "civil_service_grade"
  | "position"
  | "honor"
  | "unit_type";

type CatalogItem = CommonCatalog & { description?: string };

type CatalogData = Record<BusinessCatalogType, CatalogItem[]>;

const tabs = [
  { value: "education_level", label: "Trình độ học vấn" },
  { value: "academic_title", label: "Chức danh khoa học" },
  { value: "civil_service_grade", label: "Ngạch viên chức" },
  { value: "position", label: "Chức vụ" },
  { value: "honor", label: "Danh hiệu" },
  { value: "unit_type", label: "Loại đơn vị" },
] as const;

type CatalogFormState = {
  id: string;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  order: number;
};

const emptyForm: CatalogFormState = {
  id: "",
  code: "",
  name: "",
  description: "",
  isActive: true,
  order: 1,
};

export default function BusinessCatalogsPage() {
  const [catalogs, setCatalogs] = useState<CatalogData>(
    businessCatalogsData as CatalogData
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BusinessCatalogType>("education_level");
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [formState, setFormState] = useState<CatalogFormState>(emptyForm);

  const activeData = useMemo(() => catalogs[activeTab] ?? [], [catalogs, activeTab]);

  const openAddDialog = (type: BusinessCatalogType) => {
    setEditingItem(null);
    setActiveTab(type);
    setFormState({ ...emptyForm, order: activeData.length + 1 });
    setDialogOpen(true);
  };

  const openEditDialog = (item: CatalogItem) => {
    setEditingItem(item);
    setFormState({
      id: item.id,
      code: item.code,
      name: item.name,
      description: item.description ?? "",
      isActive: item.isActive,
      order: item.order,
    });
    setDialogOpen(true);
  };

  const handleToggleActive = (type: BusinessCatalogType, id: string) => {
    setCatalogs((prev) => ({
      ...prev,
      [type]: prev[type].map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      ),
    }));
  };

  const handleSave = () => {
    setCatalogs((prev) => {
      const nextItems = editingItem
        ? prev[activeTab].map((item) =>
            item.id === editingItem.id
              ? {
                  ...item,
                  code: formState.code.trim(),
                  name: formState.name.trim(),
                  description: formState.description.trim(),
                  isActive: formState.isActive,
                  order: Number(formState.order) || 0,
                }
              : item
          )
        : [
            ...prev[activeTab],
            {
              id: `${activeTab}-${Date.now()}`,
              type: activeTab,
              code: formState.code.trim(),
              name: formState.name.trim(),
              description: formState.description.trim(),
              isActive: formState.isActive,
              order: Number(formState.order) || 0,
            },
          ];

      return {
        ...prev,
        [activeTab]: nextItems,
      };
    });

    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Danh mục nghiệp vụ</h1>
        <p className="text-muted-foreground">Quản lý các danh mục nghiệp vụ dùng trong hệ thống</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as BusinessCatalogType)}>
        <TabsList className="flex w-full flex-wrap justify-start">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{tab.label}</h2>
                <p className="text-sm text-muted-foreground">
                  Cấu hình danh mục {tab.label.toLowerCase()}
                </p>
              </div>
              <Button onClick={() => openAddDialog(tab.value)}>Thêm danh mục</Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Mã</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead className="w-[120px]">Kích hoạt</TableHead>
                    <TableHead className="w-[90px] text-right">Thứ tự</TableHead>
                    <TableHead className="w-[120px] text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {catalogs[tab.value].length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        Chưa có dữ liệu
                      </TableCell>
                    </TableRow>
                  ) : (
                    catalogs[tab.value].map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.code}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="max-w-[320px] truncate">
                          {item.description || "—"}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={item.isActive}
                            onCheckedChange={() => handleToggleActive(tab.value, item.id)}
                          />
                        </TableCell>
                        <TableCell className="text-right">{item.order}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(item)}
                          >
                            Chỉnh sửa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin danh mục nghiệp vụ
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="catalog-code">Mã</Label>
              <Input
                id="catalog-code"
                value={formState.code}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, code: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="catalog-name">Tên</Label>
              <Input
                id="catalog-name"
                value={formState.name}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="catalog-description">Mô tả</Label>
              <Textarea
                id="catalog-description"
                value={formState.description}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, description: event.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="catalog-order">Thứ tự</Label>
              <Input
                id="catalog-order"
                type="number"
                value={formState.order}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, order: Number(event.target.value) }))
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-md border px-4 py-3">
              <div>
                <p className="text-sm font-medium">Kích hoạt</p>
                <p className="text-xs text-muted-foreground">Cho phép sử dụng trong hệ thống</p>
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
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave}>{editingItem ? "Lưu" : "Thêm"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
