import { useState, useMemo } from "react";
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
import trainingData from "@/data/training.json";

const ITEMS_PER_PAGE = 10;

export default function TrainingListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return trainingData.filter((course) => {
      const matchesSearch = course.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;
      const matchesType =
        typeFilter === "all" || course.type === typeFilter;
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
      case "planned":
        return <Badge variant="secondary">Đã lên kế hoạch</Badge>;
      case "open":
        return <Badge variant="default">Đang mở đăng ký</Badge>;
      case "in_progress":
        return <Badge variant="default">Đang diễn ra</Badge>;
      case "completed":
        return <Badge variant="outline">Đã kết thúc</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "domestic":
        return "Trong nước";
      case "international":
        return "Quốc tế";
      case "short_term":
        return "Ngắn hạn";
      case "long_term":
        return "Dài hạn";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Danh sách khóa đào tạo</h1>
        <p className="text-muted-foreground">
          Quản lý các khóa đào tạo và bồi dưỡng
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên khóa học..."
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
            <SelectItem value="planned">Đã lên kế hoạch</SelectItem>
            <SelectItem value="open">Đang mở đăng ký</SelectItem>
            <SelectItem value="in_progress">Đang diễn ra</SelectItem>
            <SelectItem value="completed">Đã kết thúc</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={typeFilter}
          onValueChange={(value) => {
            setTypeFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Loại đào tạo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại</SelectItem>
            <SelectItem value="domestic">Trong nước</SelectItem>
            <SelectItem value="international">Quốc tế</SelectItem>
            <SelectItem value="short_term">Ngắn hạn</SelectItem>
            <SelectItem value="long_term">Dài hạn</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên khóa học</TableHead>
              <TableHead>Loại</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Địa điểm</TableHead>
              <TableHead>Số học viên</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Không tìm thấy khóa đào tạo nào
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{getTypeLabel(course.type)}</TableCell>
                  <TableCell>
                    {course.startDate} - {course.endDate}
                  </TableCell>
                  <TableCell>{course.location}</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Hiển thị {paginatedData.length} / {filteredData.length} khóa đào tạo
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
