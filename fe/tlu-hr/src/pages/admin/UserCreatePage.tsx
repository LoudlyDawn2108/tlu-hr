import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
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
import { useToast } from "@/hooks/use-toast";
import usersData from "@/data/users.json";
import { UserRole, AccountStatus } from "@/types";
import type { User } from "@/types";

const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .regex(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ hoa")
  .regex(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
  .regex(/[0-9]/, "Mật khẩu phải có ít nhất 1 chữ số");

const userSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  password: passwordSchema,
  fullName: z.string().min(1, "Họ tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  role: z.nativeEnum(UserRole),
});

export default function UserCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    role: UserRole.TCCB_OFFICER,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const hasDuplicateUsername = useMemo(() => {
    return (usersData as User[]).some((user) => user.username === formData.username);
  }, [formData.username]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const result = userSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      const flattenedErrors = result.error.flatten().fieldErrors;
      Object.entries(flattenedErrors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          fieldErrors[field] = messages[0];
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (hasDuplicateUsername) {
      setErrors((prev) => ({ ...prev, username: "Tên đăng nhập đã tồn tại" }));
      return;
    }

    const now = new Date().toISOString();
    const newUser = {
      id: `user-${Date.now()}`,
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      status: AccountStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    } as User & { password: string };

    (usersData as (User & { password: string })[]).push(newUser);

    toast({
      title: "Thành công",
      description: "Đã tạo người dùng mới",
    });
    navigate("/admin/users");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thêm người dùng</h1>
        <p className="text-muted-foreground">Tạo tài khoản và phân quyền người dùng mới</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={(event) => handleChange("username", event.target.value)}
              placeholder="Nhập tên đăng nhập"
            />
            {errors.username ? (
              <p className="text-sm text-destructive">{errors.username}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(event) => handleChange("password", event.target.value)}
              placeholder="Mật khẩu mạnh"
            />
            {errors.password ? (
              <p className="text-sm text-destructive">{errors.password}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Họ và tên</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(event) => handleChange("fullName", event.target.value)}
              placeholder="Nhập họ và tên"
            />
            {errors.fullName ? (
              <p className="text-sm text-destructive">{errors.fullName}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="email@tlu.edu.vn"
            />
            {errors.email ? (
              <p className="text-sm text-destructive">{errors.email}</p>
            ) : null}
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

        {hasDuplicateUsername ? (
          <p className="text-sm text-destructive">Tên đăng nhập đã tồn tại</p>
        ) : null}

        <div className="flex items-center gap-3">
          <Button type="submit">Tạo người dùng</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/users")}>
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}
