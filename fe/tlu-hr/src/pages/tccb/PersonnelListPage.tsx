import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, MoreHorizontal, Eye, Pencil, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import personnelData from "@/data/personnel.json";
import organizationData from "@/data/organizations.json";

const ITEMS_PER_PAGE = 10;

export default function PersonnelListPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [unitFilter, setUnitFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isTerminateDialogOpen, setIsTerminateDialogOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [terminationDate, setTerminationDate] = useState("");
  const [terminationReason, setTerminationReason] = useState("");

  const filteredData = useMemo(() => {
    return personnelData.filter((person) => {
      const matchesSearch =
        person.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.employeeCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || person.status === statusFilter;
      const matchesUnit =
        unitFilter === "all" || person.currentUnit?.unitId === unitFilter;
      return matchesSearch && matchesStatus && matchesUnit;
    });
  }, [searchQuery, statusFilter, unitFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Đang hoạt động</Badge>;
      case "inactive":
        return <Badge variant="secondary">Không hoạt động</Badge>;
      case "retired":
        return <Badge variant="outline">Đã nghỉ hưu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUnitName = (unitId: string | undefined) => {
    if (!unitId) return "-";
    const unit = organizationData.find((u) => u.id === unitId);
    return unit?.name || "-";
  };

  const handleTerminate = () => {
    if (!terminationDate) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ngày thôi việc",
      });
      return;
    }

    void selectedPersonId;

    toast({
      title: "Thành công",
      description: `Đã đánh dấu thôi việc ngày ${terminationDate}`,
    });

    setIsTerminateDialogOpen(false);
    setTerminationDate("");
    setTerminationReason("");
    setSelectedPersonId(null);
  };

  const openTerminateDialog = (personId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPersonId(personId);
    setIsTerminateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh sách nhân sự</h1>
          <p className="text-muted-foreground">
            Quản lý hồ sơ cán bộ, giảng viên
          </p>
        </div>
        <Button onClick={() => navigate("/tccb/personnel/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm nhân sự
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc mã CB..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="inactive">Không hoạt động</SelectItem>
            <SelectItem value="retired">Đã nghỉ hưu</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={unitFilter}
          onValueChange={(value) => {
            setUnitFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Đơn vị" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả đơn vị</SelectItem>
            {organizationData
              .filter((u) => u.type === "faculty" || u.type === "department")
              .map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã CB</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Đơn vị</TableHead>
              <TableHead>Chức vụ</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-[100px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Không tìm thấy nhân sự nào
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((person) => (
                <TableRow
                  key={person.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/tccb/personnel/${person.id}`)}
                >
                  <TableCell className="font-medium">{person.employeeCode}</TableCell>
                  <TableCell>{person.fullName}</TableCell>
                  <TableCell>{getUnitName(person.currentUnit?.unitId)}</TableCell>
                  <TableCell>{person.currentUnit?.positionName || "-"}</TableCell>
                  <TableCell>{getStatusBadge(person.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Thao tác</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tccb/personnel/${person.id}`);
                        }}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tccb/personnel/${person.id}/edit`);
                        }}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => openTerminateDialog(person.id, e)}
                          className="text-destructive focus:text-destructive"
                        >
                          <UserX className="mr-2 h-4 w-4" />
                          Đánh dấu thôi việc
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Hiển thị {paginatedData.length} / {filteredData.length} nhân sự
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            <span className="text-sm">
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Sau
            </Button>
          </div>
        </div>
      )}

      <AlertDialog open={isTerminateDialogOpen} onOpenChange={setIsTerminateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đánh dấu thôi việc</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn đánh dấu nhân sự này đã thôi việc?
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-sm font-medium">Ngày thôi việc *</label>
                  <Input
                    type="date"
                    value={terminationDate}
                    onChange={(e) => setTerminationDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Lý do</label>
                  <Input
                    value={terminationReason}
                    onChange={(e) => setTerminationReason(e.target.value)}
                    placeholder="Nhập lý do thôi việc"
                    className="mt-1"
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setTerminationDate("");
              setTerminationReason("");
              setSelectedPersonId(null);
            }}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleTerminate}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
