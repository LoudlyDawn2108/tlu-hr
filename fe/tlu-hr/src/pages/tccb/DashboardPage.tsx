import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Clock, Bell } from "lucide-react";
import personnelData from "@/data/personnel.json";
import contractsData from "@/data/contracts.json";

export default function DashboardPage() {
  const totalPersonnel = personnelData.length;
  const activePersonnel = personnelData.filter((p) => p.status === "active").length;
  
  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expiringContracts = contractsData.filter((c) => {
    if (!c.expiryDate || c.status !== "active") return false;
    const expiry = new Date(c.expiryDate);
    return expiry <= thirtyDaysFromNow && expiry >= today;
  }).length;

  const pendingRequests = 0;

  const stats = [
    {
      title: "Tổng số nhân sự",
      value: totalPersonnel,
      icon: Users,
      description: "Tổng số cán bộ, giảng viên",
    },
    {
      title: "Đang hoạt động",
      value: activePersonnel,
      icon: Users,
      description: "Nhân sự đang công tác",
    },
    {
      title: "HĐ sắp hết hạn",
      value: expiringContracts,
      icon: FileText,
      description: "Trong vòng 30 ngày tới",
    },
    {
      title: "Yêu cầu chờ duyệt",
      value: pendingRequests,
      icon: Bell,
      description: "Yêu cầu chỉnh sửa thông tin",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Tổng quan hệ thống quản lý nhân sự
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Chưa có hoạt động nào được ghi nhận.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông báo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>Hệ thống đang hoạt động bình thường</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
