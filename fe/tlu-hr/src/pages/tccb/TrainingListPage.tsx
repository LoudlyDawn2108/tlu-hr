import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
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
import { Search, Plus, MoreHorizontal, Eye, Pencil, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getYearsFromCourses } from "@/utils/training-helpers";
import trainingData from "@/data/training.json";
import { TrainingStatus, type TrainingCourse } from "@/types";

const ITEMS_PER_PAGE = 10;

export default function TrainingListPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Local state for courses to support in-memory updates (cancellation)
  const [courses, setCourses] = useState<TrainingCourse[]>(trainingData as unknown as TrainingCourse[]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract years for filter
  const years = useMemo(() => getYearsFromCourses(courses), [courses]);

  const filteredData = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;
      const matchesType =
        typeFilter === "all" || course.type === typeFilter;
      
      const courseYear = new Date(course.startDate).getFullYear();
      const matchesYear = yearFilter === "all" || courseYear.toString() === yearFilter;

      return matchesSearch && matchesStatus && matchesType && matchesYear;
    });
  }, [courses, searchQuery, statusFilter, typeFilter, yearFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCancel = (courseId: string) => {
    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, status: TrainingStatus.CANCELLED } : c
    ));
    toast({ 
      title: "Đã hủy khóa học",
      description: "Trạng thái khóa học đã được chuyển sang Đã hủy" 
    });
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Danh sách khóa đào tạo</h1>
          <p className="text-muted-foreground">
            Quản lý các khóa đào tạo và bồi dưỡng
          </p>
        </div>
        <Button onClick={() => navigate("/tccb/training/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo khóa đào tạo
        </Button>
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
          value={yearFilter}
          onValueChange={(value) => {
            setYearFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Năm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả năm</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            <SelectItem value="cancelled">Đã hủy</SelectItem>
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
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Không tìm thấy khóa đào tạo nào
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/tccb/training/${course.id}`}
                      className="hover:underline hover:text-primary transition-colors"
                    >
                      {course.name}
                    </Link>
                  </TableCell>
                  <TableCell>{getTypeLabel(course.type)}</TableCell>
                  <TableCell>
                    {course.startDate} - {course.endDate}
                  </TableCell>
                  <TableCell>{course.location}</TableCell>
                  <TableCell>{course.participants?.length || 0}</TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/tccb/training/${course.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/tccb/training/${course.id}/edit`)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleCancel(course.id)} 
                          className="text-destructive focus:text-destructive"
                          disabled={course.status === "cancelled" || course.status === "completed"}
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Hủy khóa học
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
            Hiển thị {paginatedData.length} / {filteredData.length} khóa đào tạo
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
