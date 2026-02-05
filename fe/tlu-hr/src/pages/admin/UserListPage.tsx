import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import usersData from "@/data/users.json";
import personnelData from "@/data/personnel.json";
import type { User } from "@/types";
import type { Personnel } from "@/types";
import { AccountStatus, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Plus, Search, Lock, Unlock, Pencil } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const roleLabels: Record<UserRole, string> = {
  [UserRole.SYSTEM_ADMIN]: "Quản trị viên",
  [UserRole.TCCB_OFFICER]: "Cán bộ TCCB",
  [UserRole.TCKT_OFFICER]: "Cán bộ TCKT",
  [UserRole.EMPLOYEE]: "Nhân viên",
};

const statusLabels: Record<AccountStatus, string> = {
  [AccountStatus.ACTIVE]: "Đang hoạt động",
  [AccountStatus.INACTIVE]: "Không hoạt động",
  [AccountStatus.LOCKED]: "Đã khóa",
};

const statusBadgeVariant: Record<AccountStatus, "default" | "secondary" | "destructive"> = {
  [AccountStatus.ACTIVE]: "default",
  [AccountStatus.INACTIVE]: "secondary",
  [AccountStatus.LOCKED]: "destructive",
};

export default function UserListPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>(usersData as User[]);

  const getPersonnelInfo = (personnelId: string | null | undefined) => {
    if (!personnelId) return null;
    return (personnelData as unknown as Personnel[]).find((p) => p.id === personnelId);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleToggleLock = (userId: string) => {
    let actionLabel = "";
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== userId) return user;
        const nextStatus =
          user.status === AccountStatus.LOCKED
            ? AccountStatus.ACTIVE
            : AccountStatus.LOCKED;
        actionLabel = nextStatus === AccountStatus.LOCKED ? "khóa" : "mở khóa";
        return { ...user, status: nextStatus, updatedAt: new Date().toISOString() };
      })
    );

    toast({
      title: "Cập nhật trạng thái",
      description: `Đã ${actionLabel} tài khoản người dùng.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
          <p className="text-muted-foreground">Quản trị tài khoản và phân quyền hệ thống</p>
        </div>
        <Button onClick={() => navigate("/admin/users/new")}> 
          <Plus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, email, tài khoản..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={roleFilter}
          onValueChange={(value) => {
            setRoleFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vai trò</SelectItem>
            <SelectItem value={UserRole.SYSTEM_ADMIN}>Quản trị viên</SelectItem>
            <SelectItem value={UserRole.TCCB_OFFICER}>Cán bộ TCCB</SelectItem>
            <SelectItem value={UserRole.TCKT_OFFICER}>Cán bộ TCKT</SelectItem>
            <SelectItem value={UserRole.EMPLOYEE}>Nhân viên</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value={AccountStatus.ACTIVE}>Đang hoạt động</SelectItem>
            <SelectItem value={AccountStatus.INACTIVE}>Không hoạt động</SelectItem>
            <SelectItem value={AccountStatus.LOCKED}>Đã khóa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tài khoản</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Cán bộ liên kết</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-[80px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                  Không tìm thấy người dùng phù hợp
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{roleLabels[user.role]}</TableCell>
                  <TableCell>
                    {(() => {
                      const personnel = getPersonnelInfo(user.personnelId);
                      return personnel ? (
                        `${personnel.employeeCode} - ${personnel.fullName}`
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[user.status]}>
                      {statusLabels[user.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Thao tác</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/admin/users/${user.id}/edit`)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleLock(user.id)}>
                          {user.status === AccountStatus.LOCKED ? (
                            <Unlock className="mr-2 h-4 w-4" />
                          ) : (
                            <Lock className="mr-2 h-4 w-4" />
                          )}
                          {user.status === AccountStatus.LOCKED ? "Mở khóa" : "Khóa"}
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
            Hiển thị {paginatedUsers.length} / {filteredUsers.length} người dùng
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
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
