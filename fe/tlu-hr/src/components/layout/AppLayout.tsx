import { useAuthStore } from "@/stores/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, LogOut, Users, Building2, FileText, GraduationCap, LayoutDashboard, UserPlus, Briefcase, Plus, DollarSign, Gift, Medal, FolderTree } from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";

const navigationGroups = [
  {
    title: "Thao tác nhanh",
    items: [
      { title: "Thêm nhân sự mới", url: "/tccb/personnel/new", icon: UserPlus },
      { title: "Tạo hợp đồng", url: "/tccb/contracts", icon: FileText },
      { title: "Đăng ký đào tạo", url: "/tccb/training", icon: GraduationCap },
    ],
  },
  {
    title: "Quản lý nhân sự",
    items: [
      { title: "Danh sách hồ sơ", url: "/tccb/personnel", icon: Users },
      { title: "Thêm hồ sơ mới", url: "/tccb/personnel/new", icon: UserPlus },
    ],
  },
  {
    title: "Cơ cấu tổ chức",
    items: [
      { title: "Sơ đồ tổ chức", url: "/tccb/organization", icon: Building2 },
      { title: "Quản lý đơn vị", url: "/tccb/organization", icon: Building2 },
    ],
  },
  {
    title: "Hợp đồng lao động",
    items: [
      { title: "Danh sách hợp đồng", url: "/tccb/contracts", icon: FileText },
    ],
  },
  {
    title: "Đào tạo & Phát triển",
    items: [
      { title: "Khóa đào tạo", url: "/tccb/training", icon: GraduationCap },
      { title: "Tạo khóa đào tạo", url: "/tccb/training/new", icon: Plus },
    ],
  },
  {
    title: "Báo cáo & Thống kê",
    items: [
      { title: "Dashboard", url: "/tccb/dashboard", icon: LayoutDashboard },
      { title: "Báo cáo nhân sự", url: "/tccb/personnel", icon: Briefcase },
    ],
  },
];

const adminNavigationGroup = {
  title: "Quản trị hệ thống",
  items: [
    { title: "Người dùng", url: "/admin/users", icon: Users },
    { title: "Cấu hình lương", url: "/admin/config/salary", icon: DollarSign },
    { title: "Phụ cấp", url: "/admin/config/allowances", icon: Gift },
    { title: "Hợp đồng", url: "/admin/config/contracts", icon: FileText },
    { title: "Đánh giá", url: "/admin/config/evaluations", icon: Medal },
    { title: "Loại đào tạo", url: "/admin/config/training-types", icon: GraduationCap },
    { title: "Danh mục nghiệp vụ", url: "/admin/config/catalogs", icon: FolderTree },
  ],
};

function NavItem({ item, isActive }: { item: typeof navigationGroups[0]["items"][0]; isActive: boolean }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to={item.url}>
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function NavGroup({ group, pathname }: { group: typeof navigationGroups[0]; pathname: string }) {
  const hasActiveItem = group.items.some((item) => pathname === item.url || pathname.startsWith(item.url + "/"));

  return (
    <Collapsible defaultOpen={hasActiveItem} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            {group.title}
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <NavItem
                  key={item.url + item.title}
                  item={item}
                  isActive={pathname === item.url || pathname.startsWith(item.url + "/")}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function AppSidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            TLU
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">HRMS</span>
            <span className="text-xs text-muted-foreground">Thủy lợi University</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationGroups.map((group) => (
          <NavGroup key={group.title} group={group} pathname={location.pathname} />
        ))}
        {user?.role === "system_admin" ? (
          <NavGroup group={adminNavigationGroup} pathname={location.pathname} />
        ) : null}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {user?.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-medium truncate">{user?.fullName || "Người dùng"}</span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.role === "tccb_officer" ? "Cán bộ TCCB" : user?.role === "system_admin" ? "Quản trị viên" : "Người dùng"}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={logout}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Đăng xuất</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <div className="flex-1" />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
