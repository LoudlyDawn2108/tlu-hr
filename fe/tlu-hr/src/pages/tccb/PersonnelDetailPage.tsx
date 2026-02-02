import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Building2, GraduationCap, FileText, Wallet, Award, BookOpen, Users } from "lucide-react";
import personnelData from "@/data/personnel.json";
import organizationData from "@/data/organizations.json";

export default function PersonnelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const person = personnelData.find((p) => p.id === id);
  
  if (!person) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy nhân sự</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/tccb/personnel")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </div>
    );
  }

  const getUnitName = (unitId: string | undefined) => {
    if (!unitId) return "-";
    const unit = organizationData.find((u) => u.id === unitId);
    return unit?.name || "-";
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/tccb/personnel")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{person.fullName}</h1>
          <p className="text-muted-foreground">{person.employeeCode} • {getUnitName(person.currentUnit?.unitId)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-lg">{person.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          {getStatusBadge(person.status)}
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="personal">
            <Building2 className="mr-2 h-4 w-4" />
            Cá nhân
          </TabsTrigger>
          <TabsTrigger value="education">
            <GraduationCap className="mr-2 h-4 w-4" />
            Học vấn
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <FileText className="mr-2 h-4 w-4" />
            Hợp đồng
          </TabsTrigger>
          <TabsTrigger value="salary">
            <Wallet className="mr-2 h-4 w-4" />
            Lương
          </TabsTrigger>
          <TabsTrigger value="rewards">
            <Award className="mr-2 h-4 w-4" />
            Khen thưởng
          </TabsTrigger>
          <TabsTrigger value="training">
            <BookOpen className="mr-2 h-4 w-4" />
            Đào tạo
          </TabsTrigger>
          <TabsTrigger value="party">
            <Users className="mr-2 h-4 w-4" />
            Đảng/Đoàn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div><span className="text-muted-foreground">Họ tên:</span> {person.fullName}</div>
              <div><span className="text-muted-foreground">Ngày sinh:</span> {person.dateOfBirth}</div>
              <div><span className="text-muted-foreground">Giới tính:</span> {person.gender === "male" ? "Nam" : "Nữ"}</div>
              <div><span className="text-muted-foreground">CCCD:</span> {person.idCardNumber}</div>
              <div><span className="text-muted-foreground">Nơi sinh:</span> {person.placeOfBirth}</div>
              <div><span className="text-muted-foreground">Quê quán:</span> {person.hometown}</div>
              <div><span className="text-muted-foreground">Dân tộc:</span> {person.ethnicity}</div>
              <div><span className="text-muted-foreground">Tôn giáo:</span> {person.religion}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div><span className="text-muted-foreground">Điện thoại:</span> {person.phoneNumber}</div>
              <div><span className="text-muted-foreground">Email cá nhân:</span> {person.personalEmail}</div>
              <div><span className="text-muted-foreground">Email công việc:</span> {person.workEmail}</div>
              <div className="col-span-2"><span className="text-muted-foreground">Địa chỉ:</span> {person.permanentAddress?.streetAddress}, {person.permanentAddress?.ward}, {person.permanentAddress?.district}, {person.permanentAddress?.province}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Quá trình học vấn</CardTitle>
            </CardHeader>
            <CardContent>
              {person.education?.length > 0 ? (
                <div className="space-y-4">
                  {person.education.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{edu.degreeName}</div>
                      <div className="text-sm text-muted-foreground">{edu.school}</div>
                      <div className="text-sm">Chuyên ngành: {edu.major} • Năm tốt nghiệp: {edu.graduationYear} • Xếp loại: {edu.grade}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa có thông tin học vấn</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Hợp đồng lao động</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Thông tin hợp đồng sẽ được hiển thị tại đây</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>Lương & Phụ cấp</CardTitle>
            </CardHeader>
            <CardContent>
              {person.salaryScale ? (
                <div className="space-y-2">
                  <div><span className="text-muted-foreground">Ngạch lương:</span> {person.salaryScale.scaleType}</div>
                  <div><span className="text-muted-foreground">Bậc:</span> {person.salaryScale.grade}</div>
                  <div><span className="text-muted-foreground">Hệ số:</span> {person.salaryScale.coefficient}</div>
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa có thông tin lương</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Khen thưởng & Kỷ luật</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Chưa có thông tin khen thưởng hoặc kỷ luật</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Đào tạo & Phát triển</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Chưa có thông tin đào tạo</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="party">
          <Card>
            <CardHeader>
              <CardTitle>Đảng viên & Đoàn viên</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {person.partyInfo ? (
                <div>
                  <h4 className="font-medium mb-2">Thông tin Đảng viên</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Ngày vào Đảng:</span> {person.partyInfo.joinDate}</div>
                    <div><span className="text-muted-foreground">Ngày chính thức:</span> {person.partyInfo.officialDate}</div>
                    <div className="col-span-2"><span className="text-muted-foreground">Chi bộ:</span> {person.partyInfo.branch}</div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Không phải Đảng viên</p>
              )}
              
              {person.unionInfo && (
                <div>
                  <h4 className="font-medium mb-2">Thông tin Công đoàn</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Ngày gia nhập:</span> {person.unionInfo.joinDate}</div>
                    <div><span className="text-muted-foreground">Số thẻ:</span> {person.unionInfo.cardNumber}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
