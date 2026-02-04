import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import usersData from "@/data/users.json";
import type { User } from "@/types";
import { AccountStatus, UserRole } from "@/types";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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

const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
  .regex(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
  .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số");

const updateSchema = z.object({
  fullName: z.string().min(1, "Họ tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  role: z.nativeEnum(UserRole),
});

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

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const users = usersData as (User & { password?: string })[];
  const initialUser = users.find((user) => user.id === id);

  const [formData, setFormData] = useState({
    fullName: initialUser?.fullName ?? "",
    email: initialUser?.email ?? "",
    role: initialUser?.role ?? UserRole.TCCB_OFFICER,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<AccountStatus>(
    initialUser?.status ?? AccountStatus.ACTIVE
  );
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isLocked = status === AccountStatus.LOCKED;

  const title = useMemo(() => {
    return initialUser ? `Chỉnh sửa: ${initialUser.fullName}` : "Không tìm thấy người dùng";
  }, [initialUser]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = updateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const flattened = result.error.flatten().fieldErrors;
      Object.entries(flattened).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          fieldErrors[field] = messages[0];
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (!initialUser) return;
    initialUser.fullName = formData.fullName;
    initialUser.email = formData.email;
    initialUser.role = formData.role;
    initialUser.status = status;
    initialUser.updatedAt = new Date().toISOString();

    toast({
      title: "Đã lưu thay đổi",
      description: "Thông tin người dùng đã được cập nhật",
    });
    navigate("/admin/users");
  };

  const handleToggleStatus = () => {
    const nextStatus = isLocked ? AccountStatus.ACTIVE : AccountStatus.LOCKED;
    setStatus(nextStatus);
    toast({
      title: "Cập nhật trạng thái",
      description: isLocked ? "Đã mở khóa tài khoản" : "Đã khóa tài khoản",
    });
  };

  const handleResetPassword = () => {
    const result = passwordSchema.safeParse(newPassword);
    if (!result.success) {
      const message = result.error.flatten().formErrors[0] ?? "Mật khẩu không hợp lệ";
      setPasswordError(message);
      return;
    }

    if (initialUser) {
      (initialUser as User & { password?: string }).password = newPassword;
      initialUser.updatedAt = new Date().toISOString();
    }

    setPasswordError("");
    setNewPassword("");
    setIsResetOpen(false);
    toast({
      title: "Đặt lại mật khẩu thành công",
      description: "Mật khẩu mới đã được cập nhật",
    });
  };

  if (!initialUser) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Không tìm thấy người dùng</h1>
        <Button onClick={() => navigate("/admin/users")}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">Cập nhật thông tin tài khoản và bảo mật</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={statusBadgeVariant[status]}>{statusLabels[status]}</Badge>
        <Button variant={isLocked ? "outline" : "destructive"} onClick={handleToggleStatus}>
          {isLocked ? "Mở khóa tài khoản" : "Khóa tài khoản"}
        </Button>
        <Button variant="outline" onClick={() => setIsResetOpen(true)}>
          Đặt lại mật khẩu
        </Button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(event) => handleChange("fullName", event.target.value)}
            />
            {errors.fullName ? <p className="text-sm text-destructive">{errors.fullName}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
            />
            {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
          </div>
          <div className="space-y-2">
            <Label>Vai trò</Label>
            <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={UserRole.SYSTEM_ADMIN}>Quản trị viên</SelectItem>
                <SelectItem value={UserRole.TCCB_OFFICER}>Cán bộ TCCB</SelectItem>
                <SelectItem value={UserRole.TCKT_OFFICER}>Cán bộ TCKT</SelectItem>
                <SelectItem value={UserRole.EMPLOYEE}>Nhân viên</SelectItem>
              </SelectContent>
            </Select>
            {errors.role ? <p className="text-sm text-destructive">{errors.role}</p> : null}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit">Lưu thay đổi</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/users")}> 
            Hủy
          </Button>
        </div>
      </form>

      <AlertDialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đặt lại mật khẩu</AlertDialogTitle>
            <AlertDialogDescription>
              Mật khẩu mới cần tối thiểu 8 ký tự, gồm chữ hoa, chữ thường và số.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <Label htmlFor="reset-password">Mật khẩu mới</Label>
            <Input
              id="reset-password"
              type="password"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setPasswordError("");
              }}
            />
            {passwordError ? <p className="text-sm text-destructive">{passwordError}</p> : null}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPasswordError("")}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetPassword}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
