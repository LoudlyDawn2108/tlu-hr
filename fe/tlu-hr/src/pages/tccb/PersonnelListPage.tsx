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
import { Plus, Search } from "lucide-react";
import personnelData from "@/data/personnel.json";
import organizationData from "@/data/organizations.json";

const ITEMS_PER_PAGE = 10;

export default function PersonnelListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [unitFilter, setUnitFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

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
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
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
    </div>
  );
}
