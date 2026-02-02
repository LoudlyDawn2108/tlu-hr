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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import contractsData from "@/data/contracts.json";
import personnelData from "@/data/personnel.json";

const ITEMS_PER_PAGE = 10;

export default function ContractListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const getPersonName = (personnelId: string) => {
    const person = personnelData.find((p) => p.id === personnelId);
    return person?.fullName || "-";
  };

  const filteredData = useMemo(() => {
    return contractsData.filter((contract) => {
      const personName = getPersonName(contract.personnelId);
      const matchesSearch =
        contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        personName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || contract.status === statusFilter;
      const matchesType =
        typeFilter === "all" || contract.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Đang hiệu lực</Badge>;
      case "expired":
        return <Badge variant="secondary">Đã hết hạn</Badge>;
      case "terminated":
        return <Badge variant="destructive">Đã chấm dứt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "indefinite":
        return "Không xác định thời hạn";
      case "definite":
        return "Xác định thời hạn";
      case "probation":
        return "Thử việc";
      case "visiting":
        return "Thỉnh giảng";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Danh sách hợp đồng</h1>
        <p className="text-muted-foreground">
          Quản lý hợp đồng lao động của nhân sự
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo số HĐ hoặc tên nhân sự..."
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
            <SelectItem value="active">Đang hiệu lực</SelectItem>
            <SelectItem value="expired">Đã hết hạn</SelectItem>
            <SelectItem value="terminated">Đã chấm dứt</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={typeFilter}
          onValueChange={(value) => {
            setTypeFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Loại hợp đồng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại HĐ</SelectItem>
            <SelectItem value="indefinite">Không xác định thời hạn</SelectItem>
            <SelectItem value="definite">Xác định thời hạn</SelectItem>
            <SelectItem value="probation">Thử việc</SelectItem>
            <SelectItem value="visiting">Thỉnh giảng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Số HĐ</TableHead>
              <TableHead>Nhân sự</TableHead>
              <TableHead>Loại HĐ</TableHead>
              <TableHead>Ngày ký</TableHead>
              <TableHead>Ngày hết hạn</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Không tìm thấy hợp đồng nào
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((contract) => (
                <TableRow
                  key={contract.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/tccb/personnel/${contract.personnelId}`)}
                >
                  <TableCell className="font-medium">{contract.contractNumber}</TableCell>
                  <TableCell>{getPersonName(contract.personnelId)}</TableCell>
                  <TableCell>{getTypeLabel(contract.type)}</TableCell>
                  <TableCell>{contract.signDate}</TableCell>
                  <TableCell>{contract.expiryDate || "-"}</TableCell>
                  <TableCell>{getStatusBadge(contract.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Hiển thị {paginatedData.length} / {filteredData.length} hợp đồng
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded hover:bg-muted disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            <span className="text-sm">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded hover:bg-muted disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
